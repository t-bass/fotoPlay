initPlayer({
  target: '.my-player',
  slides: [
    {
      url: 'img/408CFB76.jpeg',
      alt: 'муссовый торт',
      overlays: [
        {
          type: 'text',
          value: 'привет торт',
          styles: {
            color: 'orange',
            'font-size': '30px',
            'text-shadow': '1px 1px black',

            top: '85%',
            left: '30%',

            transform: 'rotate(-30deg)',
            animation: 'scale 2s infinite ease-in-out',
          },
        },
        // {
        //   type: 'text',
        //   value: 'мир',
        //   styles: {
        //     color: 'orange',
        //     'font-size': '30px',
        //     'text-shadow': '1px 1px black',

        //     bottom: '10%',
        //     rigth: '30%',

        //     transform: 'rotate(90deg)',
        //   },
        // },
      ],
    },
    { url: 'img/A27A4EF2.jpeg', alt: 'капкейк' },
    { url: 'img/E5741D21.jpeg', alt: 'чизкейк' },
    { url: 'img/FCB3FC18.jpeg', alt: 'большой торт' },
  ],
  delay: 5,
});
