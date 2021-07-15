import testimg from '@/src/assets/imgs/item.jpeg';
import Component from '@/src/interfaces/Component';

export default class ChatsListItem extends Component {
  setup() {
    this.$state = { ...this.$props.state };
  }

  template() {
    return `
    <div class="chat-info-wrap">
      <div class="chat-last-check">
        <div class="type-link medium">${this.$state.user}</div>
        <div>${this.$state.lastTextTime}</div>
      </div>
      <div class="chat-last-talk">
        <div class="typo medium last-text">${this.$state.lastText}</div>
        ${this.$state.lastCheckout ? `<div class="chat-nosee-cnt"><div>${this.$state.textCnt}</div></div>` : ''}
      </div>
    </div>
    <div class="chat-item-img">
      <img src="${testimg}" style="width: 100%;" />
    </div>`;
  }
}
