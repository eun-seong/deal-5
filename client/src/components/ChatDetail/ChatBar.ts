import Component from '@/src/interfaces/Component';
import autoHeightTextarea from '@/src/assets/utils/autoHeightTextarea';
import { svgIcons } from '@/src/assets/svgIcons';

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
      <div class="send-svg">${svgIcons.send}</div>
    `;
  }

  mounted() {
    const $sendBtn = this.$target.querySelector('.send-svg>svg') as HTMLElement;
    $sendBtn.setAttribute('color', 'gray1');
  }

  setEvent() {
    this.addEvent('input', '#chatBar-input', (e: any) => {
      if (e.target.value !== '') {
        const $sendButton = this.$target.querySelector('.send-svg>svg');
        $sendButton?.setAttribute('color', 'primary1');
      }

      autoHeightTextarea(this.$target, '#chatBar-input');
    });

    this.addEvent('click', '.send-svg>svg', (e: any) => {
      const $sendButton = e.target.closest('svg');
      $sendButton.setAttribute('color', 'gray1');
      this.resetInputValue();
    });
  }

  resetInputValue() {
    const $messageInput = this.$target.querySelector('#chatBar-input') as HTMLTextAreaElement;
    $messageInput.value = '';
    autoHeightTextarea(this.$target, '#chatBar-input');
  }
}
