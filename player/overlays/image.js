import { Overlay } from './overlay.js';

export class Image extends Overlay {
  /**
   * Путь к изображению
   * @type {string}
   */
  src;
  /**
   * Альтернативный текст изображения
   * @type {string}
   *
   */
  alt = '';

  /** @override */
  constructor(params) {
    super(params);
    this.src = params?.src;

    if (typeof this.src !== 'string') {
      throw new ReferenceError('URL to the created image overlay is not specified');
    }

    this.alt = params?.alt ?? this.alt;

    if (typeof this.text !== 'string') {
      throw new ReferenceError('A text to the created overlay is not specified');
    }
  }

  /** @override */
  render() {
    const el = super.render();
    el.innerHTML = `<img src = "${this.src}" alt="${this.alt}" />`;
    return el;
  }
}
