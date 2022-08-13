import Swither from './swither.js';

import { Overlay } from './overlays/overlay.js';
import * as overlays from './overlays/index.js';

/**
 * @typedef {{url: string, alt?: string, overlays?: Overlay[]}}
 */
const Slide = null;

/**
 * @typedef {Slide[]}
 */
const Slides = null;

export default class Player {
  /**
   *  Контейнер для плеера
   * @type{Element}
   */
  target;

  /**
   * Список слайдов плеера
   * @type{Slides}
   */
  slides;

  /**
   * Время показа одного слайда
   * @type {number}
   */
  delay = 5;

  /**
   * Экземпляр Swither
   * @protected
   */
  sw;

  /**
   * Создает объект плеера
   *
   * @param {{
   * target: string,
   * delay?: number
   * slides: Slides,
   * }} params - параметры инициализации:
   *
   * 1. target - место инициализации плеера, CSS селектор
   * 2. delay - время показа слайда в сек
   * 3. slides - список слайдеров плeера
   *

   */
  constructor(params) {
    this.target = document.querySelector(params?.target);

    if (this.target === null) {
      throw new ReferenceError('A target to mount the player is not specified');
    }

    this.slides = params?.slides;

    if (!Array.isArray(this.slides)) {
      throw new TypeError('Slides to render is not specified');
    }

    this.delay = params?.delay ?? this.delay;
    this.sw = new Swither(this.target);

    this.mount();
  }

  /**
   * Монтирует элементы плеера к target
   *
   */
  mount() {
    this.target.appendChild(this.generatePlayerLayout());

    this.target
      .querySelector('.player-chunk-prev')
      .addEventListener('click', this.sw.swithToPrevChunk.bind(this.sw));
    this.target
      .querySelector('.player-chunk-next')
      .addEventListener('click', this.sw.swithToNextChunk.bind(this.sw));
    this.sw.runChunkSwitching(this.delay, 1);
  }

  /**
   * Генерирует елементы временной шкалы
   * @returns {DocumentFragment}
   */
  generateTimelineChunks() {
    const wrapper = document.createDocumentFragment();

    for (const i of this.slides.keys()) {
      const el = document.createElement('div');
      el.innerHTML = `
        <div class="timeline-chunk ${i === 0 ? 'timeline-chunk-active' : ''}">
          <div class="timeline-chunk-inner"></div>
        </div>`;
      wrapper.append(el.children[0]);
    }
    return wrapper;
  }

  /**
   * Генерирует элементы слайдов
   * @returns {DocumentFragment}
   */
  generatePlayerChunk() {
    const wrapper = document.createDocumentFragment();
    for (const [i, slide] of this.slides.entries()) {
      const style = [];
      if (slide.filter) {
        style.push(`filter: ${slide.filter.join(' ')}`);
      }

      const el = document.createElement('div');

      el.innerHTML = `
        <div class="player-chunk ${i === 0 ? 'player-chunk-active' : ''}">
          <img src="${slide.url}" alt="${slide.alt ?? ''}" style="${style.join(';')}" />
        </div>`;

      const chunk = el.children[0];
      chunk.appendChild(this.generateOverlays(slide));

      wrapper.append(chunk);
    }
    return wrapper;
  }

  /**
   * Генерирует элементы наложения на слайд
   * @param {Slide} slide - объект слайда
   * @returns {DocumentFragment}
   */
  generateOverlays(slide) {
    const wrapper = document.createDocumentFragment();

    if (slide.overlays == null) {
      return wrapper;
    }

    for (const params of slide.overlays) {
      const overlay = new overlays[params.type](params);

      if (!(params.type in overlays)) {
        throw new TypeError(`The specified type of overlay (${params.type}) is not defined`);
      }

      wrapper.appendChild(overlay.render());
    }
    return wrapper;
  }

  /**
   * Генерирует элементы плеера
   * @returns {Element}
   */
  generatePlayerLayout() {
    const timeline = document.createElement('div');
    timeline.setAttribute('class', 'timeline');
    timeline.appendChild(this.generateTimelineChunks());

    const playerContent = document.createElement('div');
    playerContent.setAttribute('class', 'player-content');
    playerContent.appendChild(this.generatePlayerChunk());

    const contentWrapper = document.createElement('div');
    contentWrapper.setAttribute('class', 'player-content-wrapper');
    contentWrapper.innerHTML = `
      <div class="player-chunk-swither player-chunk-prev"></div>
      <div class="player-chunk-swither player-chunk-next"></div>
    `;

    contentWrapper.appendChild(playerContent);

    const player = document.createElement('div');
    player.setAttribute('class', 'player');
    player.appendChild(timeline);
    player.appendChild(contentWrapper);

    return player;
  }
}
