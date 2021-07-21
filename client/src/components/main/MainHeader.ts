import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';
import DropDown from '../Share/DropDown';
import { api_getLocation } from '@/src/apis/user';

export default class MainHeader extends Component {
  setup() {
    this.$state = {
      locations: [],
    };
    api_getLocation({})
      .then((res: any) => {
        if (res.data) {
          const { location_1, location_2 } = res.data;
          this.setState({
            locations: [location_1, location_2].filter((location: string) => !!location),
          });
        }
      })
      .catch(e => console.log(e));
  }

  template() {
    return `
        <nav>
          <ul>
            <li data-btn='catagory-toggle'>${svgIcons.categoty}</li>
            <li data-btn="user-set-location">${svgIcons.mapPin}<div class='type-link medium'>&nbsp;${this.$props.title}</div></li>
            <li>
              <a class="userBtn" href="#/checkaccount">${svgIcons.user}</a>
              <a class="menuBtn" data-btn='menu-toggle' >${svgIcons.menu}</a>
            </li>
          </ul>
        </nav>
      `;
  }

  setEvent() {
    const { toggleCategory, toggleMenu, onClickItem, onClickSettingLocation } = this.$props;
    this.addEvent('click', '[data-btn="catagory-toggle"]', toggleCategory);
    this.addEvent('click', '[data-btn="menu-toggle"]', toggleMenu);
    this.addEvent('click', '[data-btn="user-set-location"]', (e: any) => {
      const $dropdownTarget = e.target.closest('.main-header');
      const $dropDownDiv = document.createElement('div');
      $dropDownDiv.className = 'dropdown-container';
      $dropdownTarget.appendChild($dropDownDiv);
      new DropDown($dropDownDiv, {
        labels: this.$state.locations,
        onClickItem,
        specialItems: [{ name: '내 지역 설정하기', type: 'setting-location', onClickSettingLocation }],
      });
    });
  }
}
