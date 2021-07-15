import Component from '@/src/interfaces/Component';
import LocationButton from '../Share/LocationButton';

class LocationList extends Component {
  template() {
    return ``;
  }

  mounted() {
    this.$props.locations.forEach((location: string) => {
      const $div = document.createElement('div');
      this.$target?.appendChild($div);
      new LocationButton($div, { locationType: 'active', locationText: location });
    });
  }
}

export default LocationList;
