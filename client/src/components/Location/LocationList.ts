import Component from '@/src/interfaces/Component';
import LocationButton from './LocationButton';

class LocationList extends Component {
  mounted() {
    this.$props.locations.forEach((location: string) => {
      const $div = document.createElement('div');
      this.$target.appendChild($div);
      new LocationButton($div, { locationType: 'active', locationText: location });
    });
    const $div = document.createElement('div');
    this.$target.appendChild($div);
    new LocationButton($div, { locationType: 'add' });
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
