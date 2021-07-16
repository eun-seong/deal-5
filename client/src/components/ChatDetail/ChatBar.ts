import Component from '@/src/interfaces/Component';
import ChatSendButton from './ChatSendButton';

export default class ChatBar extends Component {
  setup() {
    this.$state = {
      isSendButtonActive: false,
    };
  }

  template() {
    return `
    <div class="chat-inner" deactive>
      <textarea id="chatBar-input" rows="1" placeholder="메세지를 입력하세요"></textarea>
    </div>
      <div class="send-svg"></div>
    `;
  }

  mounted() {
    const $sendBtn = this.$target.querySelector('.send-svg') as HTMLElement;
    new ChatSendButton($sendBtn, {});
  }

  setEvent() {
    this.addEvent('input', '#chatBar-input', (e: any) => {
      const $chatBar = this.$target.querySelector('#chatBar-input') as HTMLElement;
      if (e.target.scrollHeight <= 70) {
        $chatBar.style.height = 'auto';
        $chatBar.style.height = e.target.scrollHeight + 'px';
      }
    });
  }
}
