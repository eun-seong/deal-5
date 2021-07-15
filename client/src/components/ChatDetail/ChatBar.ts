import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

interface ChatBarProps {}

export default class ChatBar extends Component {
  template() {
    return `
      <textarea id="chatBar-input" placeholder="메세지를 입력하세요." name="chatting"></textarea>
      ${svgIcons.send}
    `;
  }

  setEvent() {
    this.addEvent('keydown', '#chatBar-input', (e: any) => {
      const $chatBar = this.$target.querySelector('#chatBar-input') as HTMLElement;
      if (e.target.scrollHeight !== 52) {
        console.log('hi');

        $chatBar.style.height = 'auto';
        $chatBar.style.height = e.target.scrollHeight + 'px';
      }
    });
  }
}
