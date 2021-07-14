import Component, { addEvent } from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

const MainHeader = function (this: Component, $target: HTMLElement, props: any) {
  const setup = () => {
    this.$target = $target;
    this.$props = props;
    this.render();
    this.setEvent();
  };

  this.template = () => {
    return `
        <nav>
          <ul>
            <li data-btn='catagory-toggle'>${svgIcons.categoty}</li>
            <li>${svgIcons.mapPin}<span class='link medium'>&nbsp;${this.$props.title}</span></li>
            <li>
              <a class="userBtn" href="#user">${svgIcons.user}</a>
              <a class="menuBtn" >${svgIcons.menu}</a>
            </li>
          </ul>
        </nav>
      `;
  };

  this.render = () => {
    this.$target.innerHTML = this.template();
    this.mounted();
  };

  this.setEvent = () => {
    const { toggleCategory } = this.$props;
    this.addEvent('click', '[data-btn="catagory-toggle"]', toggleCategory);
  };

  this.mounted = () => {};

  this.addEvent = addEvent;

  setup();
} as any;

export default MainHeader;
