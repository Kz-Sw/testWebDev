// scripts/categories.ts
export const categoryConfig: Record<string, { 
  title: string; 
  suffix: string; 
  prefix?: string;
  decoration?: {
    corner?: string;
    stamp?: string;
    border?: string;
    background?: string;
  };
  layout?: {
    titleSection?: {
      marginTop?: string;
      marginRight?: string;
      alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
      flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    };
    overlay?: {
      padding?: string;
      justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
      alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
      flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    };
    title?: {
      top?: string;
      right?: string;
      marginTop?: string;
      marginRight?: string;
      marginBottom?: string;
      left?: string;
      marginLeft?: string;
      position?: string;
      alignItems?: string;
      fontSize?: string;
      writingMode?: 'vertical-rl' | 'vertical-lr' | 'horizontal-tb';
      textOrientation?: 'mixed' | 'upright' | 'sideways';
      transform?: string;
      opacity?: number;
      padding?: string;

      height?: string;
      display?: string;
      justifyContent?: string;
      flexDirection?: string;
      boxSizing?: string;

    };
    author?: {
      top?: string;
      marginTop?: string;
      right?: string;
      marginRight?: string;
      left?: string;
      fontSize?: string;
      writingMode?: 'vertical-rl' | 'vertical-lr' | 'horizontal-tb';
      textOrientation?: 'mixed' | 'upright' | 'sideways';
      opacity?: number;
      display?: string;
      flexDirection?: string;
      justifyContent?: string;
      alignSelf?: string;
    };
    decorations?: {
      corner?: { top?: string; right?: string; bottom?: string; left?: string; width?: string; height?: string; opacity?: number; zIndex?: number };
      stamp?: { top?: string; right?: string; bottom?: string; left?: string; width?: string; height?: string; opacity?: number; zIndex?: number };
      border?: { opacity?: number; zIndex?: number };
      background?: { opacity?: number; zIndex?: number; backgroundSize?: string; backgroundPosition?: string };
    };
  };
}> = {
  za: { 
    title: '座', 
    prefix: "第", 
    suffix: "座",
    decoration: {
      background: '/decorations/za-pattern.svg'
    },
    layout: {
      titleSection: {
        marginRight: '-3.5rem',
        alignItems: 'flex-start', 
        flexDirection: 'row-reverse',
      },
      overlay: {
        padding: '0rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'column'
      },

      title: {
        marginLeft: '3.2rem',
        fontSize: '4rem',
        opacity: 1,
        padding: '4rem 0 4rem 0',
        writingMode: 'vertical-rl',

      },
      author: {
        alignSelf: 'flex-end',
        fontSize: '1.5rem',
        opacity: 1,
      },
      decorations: {
        background: {
          opacity: 0.15,
          zIndex: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      },
    }
  },
  es: { 
    title: '詩誂', 
    prefix: "誂", 
    suffix: "夜",
    decoration: {
      corner: '/decorations/es-corner.svg',
      stamp: '/decorations/es-brush.png',
    },
    layout: {
      overlay: {
        padding: '0rem',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row'
      },
      title: {
        fontSize: '2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',

        padding: '3rem 0 4rem 0',
        marginLeft: '1rem',
        marginBottom: '2rem',
        boxSizing: 'border-box'
      },
      author: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-start'
      },

      decorations: {
        corner: {
          top: '0',
          right: '0',
          width: '100px',
          height: '100px',
          opacity: 0.9,
          zIndex: 3
        },
        stamp: {
          bottom: '1rem',
          left: '1rem',
          width: '70px',
          height: '70px',
          opacity: 0.75,
          zIndex: 3
        }
      },

    }
  },
  hs: { 
    title: '欒史道', 
    prefix: "", 
    suffix: "ノ欒",
    layout: {
      overlay: {
        padding: '5rem',

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      },
      title: {
        fontSize: '3rem'
      },
      author: {

        fontSize: '0.85rem',
      }
    }
  },
  bk: { 
    title: '書籍', 
    prefix: "", 
    suffix: "巻",
    decoration: {
      corner: '/decorations/bk-bookmark.svg',
    },
    layout: {
      title: {
        top: '1rem',
        left: '1rem',
        writingMode: 'vertical-lr', // Left-to-right vertical
        fontSize: '1.5rem'
      },
      author: {
        left: '1rem',
        fontSize: '0.9rem'
      },
      decorations: {
        corner: {
          top: '0',
          left: '0',
          width: '60px',
          height: '120px',
          zIndex: 4
        }
      }
    }
  },
};

export type CategoryKey = keyof typeof categoryConfig;