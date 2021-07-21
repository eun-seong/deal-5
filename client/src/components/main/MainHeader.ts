import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';
import DropDown from '../Share/DropDown';
import { ChangeLocation, GetUserLocation } from '@/src/apis/main';
import { api_isLogined } from '@/src/apis/user';
import Snackbar from '../Share/Snackbar';
import { $router } from '../core/Router';

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
    const target = this.$target;
    const input = this.$target.querySelector('[data-btn="user-set-location"] input') as HTMLInputElement;
    const dropdown = this.dropdown.bind(this);
    GetUserLocation().then(
      function (this: any, res: any) {
        if (!res.ok) {
          input.value = '쥄실';
          return;
        }

        this.$props.location_1 = res.data.location_1;
        this.$props.location_2 = res.data.location_2;
        input.value = res.data.location_1;
        input.dispatchEvent(new Event('change'));
        target.querySelector('[data-btn="user-set-location"]')?.addEventListener('click', dropdown);
      }.bind(this)
    );
  }

  dropdown(e: any) {
    const $dropdownTarget = e.target.closest('.main-header');
    const $dropDownDiv = document.createElement('div');
    $dropDownDiv.className = 'dropdown-container';
    $dropdownTarget.appendChild($dropDownDiv);
    new DropDown($dropDownDiv, {
      labels: [this.$props.location_1, this.$props.location_2],
      onClickItem: this.clickUserLocation.bind(this),
      specialItems: [{ name: '내 지역 설정하기', type: 'setting-location' }],
    });
  }

  setEvent() {
    const { toggleCategory, toggleMenu } = this.$props;

    this.addEvent('click', '[data-btn="catagory-toggle"]', toggleCategory);
    this.addEvent('click', '[data-btn="menu-toggle"]', toggleMenu);
  }

  clickUserLocation(e: any) {
    const clickedItem = e.target.closest('.dropdown-item');
    const type = clickedItem.getAttribute('type');
    if (type === 'setting-location') {
      api_isLogined({}).then((res: any) => {
        if (res.user) $router.push('/location');
        else $router.push('/login');
      });
      return;
    }
    let current = document.querySelector('[data-btn="user-set-location"] input') as HTMLInputElement;
    if (current.value == clickedItem.innerText) return;

    ChangeLocation({ location: clickedItem.innerText }).then(
      function (this: any, res: any) {
        if (res.ok) {
          this.$props.location_1 = res.location.location_1;
          this.$props.location_2 = res.location.location_2;
          current.value = this.$props.location_1;
          current.dispatchEvent(new Event('change'));
        }
        new Snackbar(document.body, { text: res.message });
      }.bind(this)
    );
  }
}
