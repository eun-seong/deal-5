import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

interface LocationButtonProps {
  locationType: string;
  locationText: string;
}

export default class LocationButton extends Component {
  template() {
    const { locationType, locationText }: LocationButtonProps = this.$props;

    return `
    <div class="location-btn" data-type="${locationType}" data-location="${locationText}">
      ${locationType === 'add' ? svgIcons.add : `<div class="location-text">${locationText}</div>` + svgIcons.close}
    </div>
    `;
  }
}
