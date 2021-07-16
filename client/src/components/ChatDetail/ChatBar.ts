import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

interface ChatBarProps {}

export default class ChatBar extends Component {
  template() {
    return `
    <div class="chat-inner">
      <textarea id="chatBar-input" rows="1" placeholder="메세지를 입력하세요"></textarea>
    </div>
      ${svgIcons.send}
    `;
  }

  setEvent() {
    this.addEvent('keydown', '#chatBar-input', (e: any) => {
      const $chatBar = this.$target.querySelector('#chatBar-input') as HTMLElement;
      if (e.target.scrollHeight <= 70) {
        $chatBar.style.height = 'auto';
        $chatBar.style.height = e.target.scrollHeight + 'px';
      }
    });
  }
}
