import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import LocationList from './LocationList';
import InputPopup from '../Share/InputPopup';
import historyBack from '@/src/assets/utils/historyBack';
import { api_setLocation, api_getLocation } from '@/src/apis/user';

class Location extends Component {
  setup() {
    this.$state = {
      locations: [],
    };
    api_getLocation({})
      .then((res: any) => {
        const { location_1, location_2 } = res.data;
        this.setState({
          locations: [location_1, location_2].filter((location: string) => !!location),
        });
      })
      .catch(e => console.log(e));
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

    new CommonHeader($header as HTMLElement, { title: '내 동네 설정하기', leftArrowEvent: historyBack });
    new LocationList($LocationButtons as HTMLElement, {
      locations: this.$state.locations.filter((location: string) => !!location),
      removeLocation: this.removeLocation.bind(this),
      clickAddLocation: this.clickAddLocation.bind(this),
    });
  }

  removeLocation(location: string) {
    const { locations } = this.$state;
    const lastLocation = locations.filter((l: string) => location !== l)[0];
    api_setLocation({ data: { location_1: lastLocation ? lastLocation : '', location_2: '' } })
      .then((res: any) => {
        if (res.ok)
          this.setState({
            locations: [lastLocation].filter((location: string) => !!location),
          });
        else console.log(res.message);
      })
      .catch(e => console.log(e));
  }

  clickAddLocation() {
    const $content = this.$target.querySelector('.content');
    const $div = document.createElement('div');
    $content?.appendChild($div);
    new InputPopup($div as HTMLElement, { text: '현재 위치를 입력하세요.', getLocation: this.getLocation.bind(this) });
  }

  getLocation(location: string) {
    const { locations } = this.$state;
    const data = [...locations, location].filter((location: string) => !!location);
    api_setLocation({ data: { location_1: data[0], location_2: data[1] ? data[1] : '' } })
      .then((res: any) => {
        if (res.ok)
          this.setState({
            locations: data,
          });
        else console.log(res.message);
      })
      .catch(e => console.log(e));
  }
}

export default Location;
