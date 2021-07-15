import Component from '@/src/interfaces/Component';
import LocationButton from './LocationButton';

class LocationList extends Component {
  mounted() {
    const { locations, appendAddButton } = this.$props;
    locations.forEach((location: string) => {
      const $div = document.createElement('div');
      this.$target.appendChild($div);
      new LocationButton($div, { locationType: 'active', locationText: location });
    });

    // 지역이 2개일 경우 +버튼 추가 안함
    if (locations.length < 2) appendAddButton();
  }

  setEvent() {
    const { removeLocation, addLocation } = this.$props;
    this.addEvent('click', '.location-btn>svg', (e: any) => {
      removeLocation(e.target.parentNode.dataset.location);
    });

    this.addEvent('click', '.location-btn[data-type="add"]', (e: any) => {
      addLocation();
    });
  }
}

export default LocationList;
