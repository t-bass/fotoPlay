import Player from './player/lib.js';

new Player({
  target: '.my-player',
  delay: 5,
  slides: [
    {
      url: 'img/408CFB76.jpeg',
      alt: 'муссовый торт',
      filter: ['contrast(120%)'],
      overlays: [
        {
          type: 'Text',
          text: 'Chiffon-cake - это очень вкусно!',

          classes: ['softbrush'],
          styles: {
            // 'font-size': '20px',
            top: '85%',
            left: '20%',
          },
        },
      ],
    },
    {
      url: 'img/A27A4EF2.jpeg',
      alt: 'капкейк',
      filter: ['contrast(120%)'],

      overlays: [
        {
          type: 'Text',
          text: 'Chiffon-cake - это очень вкусно!',

          classes: ['softbrush'],
          styles: {
            // 'font-size': '20px',
            top: '85%',
            left: '20%',
          },
        },
      ],
    },
    {
      url: 'img/E5741D21.jpeg',
      alt: 'чизкейк',
      filter: ['contrast(120%)'],

      overlays: [
        {
          type: 'Text',
          text: 'Chiffon-cake - это очень вкусно!',

          classes: ['softbrush'],
          styles: {
            // 'font-size': '20px',
            top: '85%',
            left: '20%',
          },
        },
      ],
    },
    {
      url: 'img/FCB3FC18.jpeg',
      alt: 'большой торт',
      filter: ['contrast(120%)'],

      overlays: [
        {
          type: 'Text',
          text: 'Chiffon-cake - это очень вкусно!',

          classes: ['softbrush'],
          styles: {
            // 'font-size': '20px',
            top: '25%',
            left: '10%',
          },
        },
      ],
    },
  ],
});
