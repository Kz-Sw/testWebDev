// ─── Kanji digit helper ───────────────────────────────────────────────────────
// Inlined from ../scripts/utils.ts  →  export function toKanjiDigits(num)
// Keep in sync with the TypeScript source; only the type annotation is removed.
function toKanjiDigits(num) {
  const map = "〇一二三四五六七八九";
  return num.toString().replace(/\d/g, (d) => map[parseInt(d)]);
}

// Converts raw seconds → kanji string, e.g. 83 → "一分二三秒"
// Hours are included only when the audio is ≥ 1 hour long.
function toKanjiTime(totalSeconds, showHours = false) {
  const s = Math.floor(totalSeconds);
  const hours   = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  let result = "";
  if (showHours || hours > 0) {
    result += toKanjiDigits(hours) + "時";
  }
  result += toKanjiDigits(minutes) + "分";
  result += toKanjiDigits(seconds) + "秒";
  return result;
}
// ─────────────────────────────────────────────────────────────────────────────

class TateAudio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: "Noto Serif JP", "Yu Mincho", serif;
        }

        /* ── Outer grid: title | slider+timer | buttons ── */
        .player {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1.2rem;
          inline-size: 100%;
          writing-mode: vertical-rl;
          height: 100%;
        }

        /* ── Title ───────────────────────────────────── */
        .title-section {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          display: flex;
          align-items: center;
        }

        .title-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          display: grid;
          grid-auto-rows: 1fr;
          align-items: end;
          gap: 0.6em;
        }

        .title-main {
          display: flex;
          font-size: 1.05em;
          font-weight: 600;
        }

        .title-author {
          display: flex;
          font-size: 0.85em;
          font-weight: 400;
          opacity: 0.9;
          transform: translateY(var(--author-shift, 5em));
        }

        /* ── Slider + timer side by side ─────────────── */
        .slider-section {

          display: flex;
          flex-direction: column;   /* horizontal in physical space = side-by-side columns */
          align-items: flex-end;
          justify-content: center;
          align-self;
          gap: 0.6rem;
        }

        /* ── Kanji timer ─────────────────────────────── */
        .kanji-timer {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-size: 1.1em;
          letter-spacing: 0.05em;
          opacity: 0.95;
          user-select: none;
          white-space: nowrap;
          /* top-align so the text tracks alongside the top of the slider */
          
          align-self: flex-center;
        }

        /* ─────────────────────────────────────────────
           SEEK SLIDER
           • writing-mode: vertical-lr  → renders vertically
           • direction: ltr             → thumb travels TOP → BOTTOM  (value 0 at top)
           ───────────────────────────────────────────── */
        .seek {
          -webkit-appearance: none;
          appearance: none;
          writing-mode: vertical-lr;
          direction: ltr;          /* TOP = 0 (start), BOTTOM = 100 (end) */
          width: 40px;
          height: 300px;
          background: transparent;
          cursor: pointer;
          outline: none;
          border: none;
          padding: 0;
        }

        /* ── Track ───────────────────────────────────
           Replace the url() with your own image path.
           Ideal size: 40 × 300 px (SVG / PNG / WebP).
           Placeholder: bamboo-stalk SVG stripe.
           Swap with e.g.: url('images/track-scroll.png')
        ─────────────────────────────────────────────── */
        .seek::-webkit-slider-runnable-track {
          width: 40px;
          border-radius: 4px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='300'%3E%3Crect x='17' y='0' width='6' height='300' rx='3' fill='%23c8a96e' opacity='0.4'/%3E%3Crect x='15' y='60' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3Crect x='15' y='120' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3Crect x='15' y='180' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3Crect x='15' y='240' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3C/svg%3E");
          background-size: 40px 100%;
          background-repeat: no-repeat;
          background-position: center;
        }

        .seek::-moz-range-track {
          width: 40px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='300'%3E%3Crect x='17' y='0' width='6' height='300' rx='3' fill='%23c8a96e' opacity='0.4'/%3E%3Crect x='15' y='60' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3Crect x='15' y='120' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3Crect x='15' y='180' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3Crect x='15' y='240' width='10' height='3' rx='1.5' fill='%238f6316' opacity='0.6'/%3E%3C/svg%3E");
          background-size: 40px 100%;
          background-repeat: no-repeat;
          background-position: center;
          border: none;
        }

        /* ── Thumb (playhead) ────────────────────────
           Replace the url() with your own image path.
           Ideal size: ~40 × 40 px square.
           Placeholder: concentric-circle gold seal SVG.
           Swap with e.g.: url('images/playhead-brush.png')
        ─────────────────────────────────────────────── */
        .seek::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 40px;
          height: 40px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%238f6316'/%3E%3Ccircle cx='20' cy='20' r='13' fill='none' stroke='%23f4ed27' stroke-width='1.5'/%3E%3Ccircle cx='20' cy='20' r='4' fill='%23f4ed27'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-color: transparent;
          border: none;
          cursor: grab;
        }

        .seek::-webkit-slider-thumb:active {
          cursor: grabbing;
        }

        .seek::-moz-range-thumb {
          width: 40px;
          height: 40px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%238f6316'/%3E%3Ccircle cx='20' cy='20' r='13' fill='none' stroke='%23f4ed27' stroke-width='1.5'/%3E%3Ccircle cx='20' cy='20' r='4' fill='%23f4ed27'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          background-color: transparent;
          border: none;
          border-radius: 50%;
          cursor: grab;
        }

        /* ── Buttons ─────────────────────────────────── */
        .buttons-section {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          align-items: center;
          justify-content: center;
          margin-top: 2rem;
        }

        button {
          width: 3em;
          height: 3em;
          font-size: 1.3em;
          cursor: pointer;
          color: rgba(255, 255, 255, 1);
          background: linear-gradient(
            180deg,
             rgba(143, 99, 22, 1),
             rgba(105, 68, 4, 1)
          );
          border: none;
          font-family: inherit;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        }

        button:hover {
          color: rgba(6, 1, 46, 1);
          background: rgba(244, 237, 39, 1);
        }

        button:active {
          transform: translateY(1px);
          box-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .play {
          background: linear-gradient(
            180deg,
            rgba(60, 50, 40, 1),
            rgba(30, 20, 10, 1)
          );
          color: rgba(240, 220, 160, 1);
        }

        .play.playing {
          background: linear-gradient(
            180deg,
            rgba(240, 220, 120, 1),
            rgba(200, 160, 60, 1)
          );
          color: black;
          box-shadow: 0 0 12px rgba(244, 237, 39, 0.6),
                      0 0 24px rgba(244, 237, 39, 0.3);
        }

        /* Push volume away from timer */
        .volume-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 2rem;


          margin-right: 3rem; /* ← THIS creates space to the right */

        }

        /* Label styling */
        .volume-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          font-size: 0.95em;
          opacity: 0.9;
          user-select: none;
        }

        .volume {
          -webkit-appearance: none;
          appearance: none;
          writing-mode: vertical-lr;
          direction: rtl;
          background: rgba(21, 21, 21, 0.3);
          width: 8px;
          height: 120px;
          cursor: pointer;
        }

        /* Track */
        .volume::-webkit-slider-runnable-track {
          background: rgba(200, 200, 200, 0.3);
          border-radius: 8px;
          
        }

        .volume::-moz-range-track {
          background: rgba(200, 200, 200, 0.3);
        }

        /* Thumb */
        .volume::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          background: rgba(77, 77, 77, 1);
          border-radius: 50%;
        }

        .volume::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: rgba(143, 99, 22, 1);
          border-radius: 50%;
        }

        audio {
          display: none;
        }
      </style>

      <div class="player">
        <!-- Title column -->
        <div class="title-section">
          <div class="title-text"></div>
        </div>

        <!-- Slider + kanji timer column -->
        <div class="slider-section">
          <input
            type="range"
            class="seek"
            min="0"
            max="100"
            value="0"
            step="0.1"
            aria-label="再生位置"
          />
          <!-- Kanji timer sits right next to the slider bar -->
          <div class="kanji-timer" aria-live="polite" aria-label="経過時間">〇分〇秒</div>

          <!-- Volume slider -->
          <div class="volume-section">
            <div class="volume-label">音量</div>
            <input
              type="range"
              class="volume"
              min="0"
              max="1"
              step="0.01"
              value="1"
              aria-label="音量"
            />
          </div>
        </div>

        <!-- Buttons column -->
        <div class="buttons-section">
          <button class="play" aria-label="再生">再</button>
          <button class="rewind" aria-label="巻戻">戻</button>
        </div>

        <audio></audio>
      </div>
    `;
  }

  connectedCallback() {
    const shadow = this.shadowRoot;
    const audio     = shadow.querySelector("audio");
    const playBtn   = shadow.querySelector(".play");
    const rewindBtn = shadow.querySelector(".rewind");
    const slider    = shadow.querySelector(".seek");
    const titleEl   = shadow.querySelector(".title-text");
    const timerEl   = shadow.querySelector(".kanji-timer");
    const volumeSlider = shadow.querySelector(".volume");

    // ── Audio source ──────────────────────────────────
    audio.src = this.getAttribute("src") || "";

    // ── Title ─────────────────────────────────────────
    const attrTitle = this.getAttribute("title");
    if (attrTitle) {
      titleEl.innerHTML = attrTitle;
    } else if (audio.title) {
      titleEl.textContent = audio.title;
    } else {
      titleEl.textContent = "音声再生";
    }

    // ── Timer helpers ─────────────────────────────────
    // Show hours column only when total duration is ≥ 1 hour
    const needsHours = () => audio.duration >= 3600;

    const updateTimer = (current, duration) => {
      if (!duration) {
        timerEl.textContent = "〇分〇秒";
        return;
      }

      const currentStr  = toKanjiTime(current, needsHours());
      const durationStr = toKanjiTime(duration, needsHours());

      timerEl.textContent = `${currentStr}/${durationStr}`;
    };

    // ── Play / Pause ──────────────────────────────────
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = "止";
        playBtn.classList.add("playing");
      } else {
        audio.pause();
        playBtn.textContent = "再";
        playBtn.classList.remove("playing");
      }
    });

    // ── Rewind 10 s ───────────────────────────────────
    rewindBtn.addEventListener("click", () => {
      audio.currentTime = Math.max(0, audio.currentTime - 10);
    });

    // ── Sync slider & timer during playback ───────────
    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      slider.value = (audio.currentTime / audio.duration) * 100;
      updateTimer(audio.currentTime, audio.duration);
    });

    // ── Seek & update timer when user drags slider ────
    slider.addEventListener("input", () => {
      if (!audio.duration) return;
      const newTime = (slider.value / 100) * audio.duration;
      audio.currentTime = newTime;
      updateTimer(newTime, audio.duration);
    });

    // ── Reset on end ──────────────────────────────────
    audio.addEventListener("ended", () => {
      playBtn.textContent = "再";
      playBtn.classList.remove("playing"); 
      slider.value = 0;
      updateTimer(0, audio.duration);
    });

    // ── Volume Slider ──────────────────────────────────
    volumeSlider.addEventListener("input", () => {
      audio.volume = volumeSlider.value;
    });

    audio.addEventListener("volumechange", () => {
      volumeSlider.value = audio.volume;
    });

    audio.addEventListener("loadeddata", () => {
       if (audio.duration) { updateTimer(0, audio.duration); }
    });
  }
}

customElements.define("tate-audio", TateAudio);