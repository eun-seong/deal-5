import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

interface CommonHeaderProps {
  leftArrowEvent: () => {};
  rightButton?: {
    svg: SVGSVGElement;
    colorType: string;
    handleClick: () => {};
  };
}

export default class CommonHeader extends Component {
  template() {
    const { rightButton } = this.$props;

    return `
        <nav class="common-header">
          <ul>
            <li data-btn="left-arrow">${svgIcons.chevronLeft}</li>
            <li><span class="type-link medium">${this.$props.title}</span></li>
            <li data-btn="right-btn">${rightButton ? rightButton.svg : ''}</li>
          </ul>
        </nav>
      `;
  }

  mounted() {
    if (this.$props.rightButton) {
      const $rightButton = this.$target.querySelector('[data-btn="right-btn"]>svg') as SVGSVGElement;
      $rightButton.setAttribute('color', this.$props.rightButton.colorType);
    }
  }
  setEvent() {
    const { leftArrowEvent, rightButton } = this.$props;
    this.addEvent('click', '[data-btn="left-arrow"]', leftArrowEvent);
    if (rightButton) this.addEvent('click', '[data-btn="right-btn"]', (e: any) => rightButton.handleClick(e));
  }
}
