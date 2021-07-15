import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

export default class MainHeader extends Component {
  template() {
    return `
        <nav>
          <ul>
            <li data-btn='catagory-toggle'>${svgIcons.categoty}</li>
            <li>${svgIcons.mapPin}<div class='type-link medium'>&nbsp;${this.$props.title}</div></li>
            <li>
              <a class="userBtn" href="#/signin">${svgIcons.user}</a>
              <a class="menuBtn" data-btn='menu-toggle' >${svgIcons.menu}</a>
            </li>
          </ul>
        </nav>
      `;
  }
  setEvent() {
    const { toggleCategory, toggleMenu } = this.$props;
    this.addEvent('click', '[data-btn="catagory-toggle"]', toggleCategory);
    this.addEvent('click', '[data-btn="menu-toggle"]', toggleMenu);
  }
}
