import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

export default class SaleLocation extends Component {
  template() {
    const { location } = this.$props;

    return `
    <span>${svgIcons.mapPin}</span>
    <span>${location || '역삼동'}</span>
    `;
  }

  mounted() {}
}
