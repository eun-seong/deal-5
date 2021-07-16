import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

export default class ChatSendButton extends Component {
  color = {
    primary: '#2ac1bc',
    gray: '#888888',
  };

  template() {
    return `${svgIcons.send}`;
  }
}
