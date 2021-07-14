import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

class CommonHeader extends Component {
  template() {
    return `
        <nav class="common-header">
          <ul>
            <li data-btn="left-arrow">${svgIcons.chevronLeft}</li>
            <li><span class="link medium">${this.$props.title}</span></li>
          </ul>
        </nav>
      `;
  }
  setEvent() {
    const { leftArrowEvent } = this.$props;
    this.addEvent('click', '[data-btn="left-arrow"]', leftArrowEvent);
  }
}

export default CommonHeader;
