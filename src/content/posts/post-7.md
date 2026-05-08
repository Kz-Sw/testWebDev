---
layout: ../../layouts/BaseTateBlogLayout.astro
pubDate: 2025-12-17
description: 'This is the first post of my new Astro blog.'

author: 'エズラ・パウンドdo'
enAuthor: 'Ezra Pound'
heroTitle: '第一座　キャントゥーズ　'
enTitle: 'Cantos'
heroImage: '../images/posts/post-2/post-2_hero.jpg'

audio:
  src: /audio/post-1.mp3
  title: 縦書きラジオ 第一回

tags: ["astro", "blogging", "learning in public"]
customCSS: |
  /* Custom CSS for this post only */
  .chapter {
    color: #ff6b6b;
  }
  .special-highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 0.5em;
    border-radius: 4px;
  }

  .note-1 {
    margin-block-start: 32em;
  }

  .note-2 {
    margin-block-start: 12em;
  }

  .note-3 {
    margin-block-start: 12em;
  }
---

  <!-- Spacer -->
  <div class="content-offset"></div> 
    
  <!-- Content section with top/bottom split -->
  <div class="content-section">
        <!-- TOP 3/4: MAIN TEXT -->
        <div class="top vertical">
            <div class="chapter">
                第一章 <br />
                縦書きという思想
            </div>

  <!-- Inserted Icon -->
  <div class="icon-center">
      <img src="/images/posts/post0006/icon0006.png"alt="Icon Center" />
  </div>

  <p class="indent">
      これは<span class="bold">縦書きレイアウト</span>の本文例である。
      横書きとは異なり、時間と空間の流れが
      <span class="bold">上から下、右から左</span>へと展開する。
  </p>

  <p class="indent">
      日本語の文章は、縦に並ぶことで
      <img src="/images/posts/post0006/icon0006.png" alt="" class="inline-icon" />
      意味の連なりが自然に読者の身体感覚へと
      流れ込む<span class="note">①</span>。
  </p>

  <!-- Inserted image -->
  <div class="inline-image">
      <img src="/images/posts/post0005/frog_v08.jpg"alt="Inline image" />
  </div>

  <p class="indent">
      ここに<span class="small">(小さな注釈テキスト)</span>
      を挿入することで、視線のリズムを
      意図的に崩すことも可能である。
  </p>

  <p>
      This gives you book-like continuous scrolling, exactly what you asked for.
  </p>

  <p class="indent">
      また、　　全角スペースを用いることで、
      文章の呼吸を調整することができる。
  </p>

  <p class="gothic">
      **2025年度**に期限を迎える赤字国債の発行に必要な特例法について、政府が26年度から5年間の延長を検討していることが24日、分かった。税収だけでは社会保障費などの政策経費を賄えず、財源不足を補うために借金である国債発行が欠かせないためだ。
  </p>

  <strong>2025年度に期限を迎える赤字国債の発行に必要な特例法について、政府が26年度から5年間の延長を検討していることが24日、分かった。</strong>税収だけでは社会保障費などの政策経費を賄えず、財源不足を補うために借金である国債発行が欠かせないためだ。

  2025年度に期限を迎える赤字国債の発行に必要な特例法について、政府が26年度から5年間の延長を検討していることが24日、分かった。税収だけでは社会保障費などの政策経費を賄えず、財源不足を補うために借金である国債発行が欠かせないためだ。

  <blockquote class="quote">
  来田は兵庫県出身の外野手で、2020年のドラフトでオリックスに入団。2021年には1軍初打席初球本塁打の快挙を達成した。今季は50試合出場で打率.234、2本塁打5打点をマークしている。

  　交際期間は約2年。両競技のオフにあたる月曜日しか会えない"遠距離恋愛"だったが、来田が球団寮を退寮するタイミングで同棲生活を開始。愛を育んでいる。

  　球界でも指折りのイケメンとして知られていた23歳。心温まる報告に「アスリート婚もいいわね」、「わああああ　すごい」、「来田くん結婚!?　おめでとう!!!」、「おめでとうすぎる」、「あでたいあでたい!」、「えええええ!?!?!　おめでたすぎる」、「うおおおおおおお」、「羨ましいなぁ」とファンも笑顔になっている。
  </blockquote>

  <div class="half-split">
    <div class="half-top">
      <figure>
        <img src="/images/posts/post-2/post-2_hero.jpg" alt="球体モデルA" />
        <figcaption>初期段階の球体モデル。陰影のみを確認。</figcaption>
      </figure>
    </div>
    <div class="half-bottom">
  ２０２５年度に期限を迎える赤字国債の発行に必要な特例法について、政府が26年度から5年間の延長を検討していることが24日、分かった。
  ２０２５年度に期限を迎える赤字国債の発行に必要な特例法について、政府が26年度から5年間の延長を検討していることが24日、分かった。
    </div>
  </div>
  <div class="chapter">
      第二章 <br />
      縦書きの未来
  </div>
  <p class="indent">
      ここに<span class="small">(小さな注釈テキスト)</span>
      を挿入することで、視線のリズムを意図的に崩すことも可能である。意図的に崩すことも可能である。意図的に崩すことも可能である。意図的に崩すことも可能である。意図的に崩すことも可能である。意図的に崩すことも可能である。
      
  </p>
  

  <div class="icon-center">
      <img src="/images/posts/post0006/icon0006.png"alt="Icon Center" />
  </div>

  <!-- Audio section -->
<div class="post-audio">
  <div class="audio-title">音声版</div>
  <tate-audio 
    src="/audio/test_post-1.mp3"
    style="--author-shift: 5em"
    title="
      <span class='title-main'>第一座　キャントゥーズ</span>
      <span class='title-author'>エズラ・パウンド</span>
    ">
  </tate-audio>

</div>


<!-- Spacer -->
<div class="content-offset2"></div> 

</div>

  <!-- BOTTOM 1/4: BIBLIOGRAPHY / NOTES -->
  <div class="bottom vertical">
      <p class="note-1">① 山田太郎『日本文化論』
          <span class="small">(二〇二三年)</span>
      </p>

  <p class="note-2">② 佐藤花子『縦書き組版』
  </p>
  </div>
</div>

