import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import LocationList from './LocationList';
import InputPopup from '../Share/InputPopup';

class Location extends Component {
  setup() {
    this.$state = {
      locations: ['역삼동', '홍제동'],
    };
  }

  template() {
    const LocationText = '지역은 최소 1개 이상<br/>최대 2개까지 설정 가능해요.';

    return `
    <header id="location" data-component="header"></header>
    <div class="content">
      <div data-component="location-setting-text">${LocationText}</div>
      <div data-component="location-buttons"></div>
    </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $LocationButtons = this.$target.querySelector('[data-component="location-buttons"]');

    new CommonHeader($header as HTMLElement, { title: '내 동네 설정하기' });
    new LocationList($LocationButtons as HTMLElement, {
      locations: this.$state.locations,
      removeLocation: this.removeLocation.bind(this),
      clickAddLocation: this.clickAddLocation.bind(this),
    });
  }

  removeLocation(location: string) {
    const { locations } = this.$state;
    this.setState({
      locations: locations.filter((l: string) => location !== l),
    });
  }

  clickAddLocation() {
    const $content = this.$target.querySelector('.content');
    const $div = document.createElement('div');
    $content?.appendChild($div);
    new InputPopup($div as HTMLElement, { text: '현재 위치를 입력하세요.', getLocation: this.getLocation.bind(this) });
  }

  getLocation(location: string) {
    const { locations } = this.$state;
    this.setState({
      locations: [...locations, location],
    });
  }
}

export default Location;
