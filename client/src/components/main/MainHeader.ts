import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';
import DropDown from '../Share/DropDown';
import { GetUserLocation } from '@/src/apis/main';

export default class MainHeader extends Component {
  template() {
    return `
        <nav>
          <ul>
            <li data-btn='catagory-toggle'>${svgIcons.categoty}</li>
            <li data-btn="user-set-location">${svgIcons.mapPin}<input class='header-location type-link medium' readonly></li>
            <li>
              <a class="userBtn" href="#/checkaccount">${svgIcons.user}</a>
              <a class="menuBtn" data-btn='menu-toggle' >${svgIcons.menu}</a>
            </li>
          </ul>
        </nav>
      `;
  }

  mounted() {
    const input = this.$target.querySelector('[data-btn="user-set-location"] input') as HTMLInputElement;
    GetUserLocation().then(res => {
      if (!res.ok) {
        input.value = '쥄실';
        return;
      }
      input.value = res.location_1;
      this.$props.label = [res.location_1, res.location_2];
    });
  }

  setEvent() {
    const { toggleCategory, labels, toggleMenu, onClickItem, onClickSettingLocation } = this.$props;
    this.addEvent('click', '[data-btn="catagory-toggle"]', toggleCategory);
    this.addEvent('click', '[data-btn="menu-toggle"]', toggleMenu);
    this.addEvent('click', '[data-btn="user-set-location"]', (e: any) => {
      const $dropdownTarget = e.target.closest('.main-header');
      const $dropDownDiv = document.createElement('div');
      $dropDownDiv.className = 'dropdown-container';
      $dropdownTarget.appendChild($dropDownDiv);
      new DropDown($dropDownDiv, {
        labels,
        onClickItem,
        specialItems: [{ name: '내 지역 설정하기', type: 'setting-location', onClickSettingLocation }],
      });
    });
  }
}
