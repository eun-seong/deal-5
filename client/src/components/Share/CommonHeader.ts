import Component, { addEvent } from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

const CommonHeader = function (this: Component, $target: HTMLElement, props: any) {
  const setup = () => {
    this.$target = $target || null;
    this.$props = props;
    this.render();
    this.setEvent();
  };

  this.template = () => {
    return `
        <nav class="common-header">
          <ul>
            <li data-btn="left-arrow">${svgIcons.chevronLeft}</li>
            <li><span class="link medium">${this.$props.title}</span></li>
          </ul>
        </nav>
      `;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mounted();
  };

  this.mounted = () => {};

  this.setState = (nextState: object) => {
    this.$state = { ...this.$state, ...nextState };
    this.render();
  };

  this.setEvent = () => {
    const { leftArrowEvent } = this.$props;
    console.log(this.$props);
    this.addEvent('click', '[data-btn="left-arrow"]', leftArrowEvent);
  };

  this.addEvent = addEvent;

  setup();
} as any;

export default CommonHeader;
