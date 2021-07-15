import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

interface LocationProps {
  locationType: string;
  locationText: string;
}

export default class Location extends Component {
  template() {
    const { locationType, locationText }: LocationProps = this.$props;

    return `
    <div class="location-btn" data-type="${locationType}">
      ${locationType === 'add' ? svgIcons.add : `<div class="location-text">${locationText}</div>` + svgIcons.close}
    </div>
    `;
  }
}
