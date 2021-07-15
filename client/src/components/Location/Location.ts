import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import LocationList from './LocationList';
import LocationButton from './LocationButton';

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
      addLocation: this.addLocation.bind(this),
      appendAddButton: this.appendAddButton.bind(this),
    });
  }

  removeLocation(location: string) {
    const { locations } = this.$state;
    const idx = locations.indexOf(location);
    locations.splice(idx, 1);
    this.setState({
      locations: locations,
    });
  }

  addLocation(location: string) {
    const { locations } = this.$state;
    this.setState({
      locations: [...locations, '짜잔'],
    });
  }

  appendAddButton() {
    const $LocationButtons = this.$target.querySelector('[data-component="location-buttons"]');
    const $div = document.createElement('div');
    $LocationButtons?.appendChild($div);
    new LocationButton($div, { locationType: 'add' });
  }
}

export default Location;
