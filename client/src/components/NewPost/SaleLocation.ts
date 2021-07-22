import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';
import { api_getLocation } from '@/src/apis/user';

export default class SaleLocation extends Component {
  setup() {
    this.$state = {
      location: '',
    };
    api_getLocation({})
      .then((res: any) => {
        const { location_1 } = res.data;
        this.setState({
          location: location_1,
        });
      })
      .catch(e => console.log(e));
  }

  template() {
    const { location } = this.$state;

    return `
    <span>${svgIcons.mapPin}</span>
    <span>${location || ''}</span>
    `;
  }

  mounted() {}
}
