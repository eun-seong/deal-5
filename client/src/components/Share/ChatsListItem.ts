import testimg from '@/src/assets/imgs/item.jpeg';
import Component from '@/src/interfaces/Component';

export default class ChatsListItem extends Component {
  setup() {
    this.$state = { ...this.$props.state };
    console.log(this.$state);
  }

  template() {
    return `
    <a href='#/chat?room=${this.$state.cid}'>
    <div class="chat-info-wrap">
      <div class="chat-last-check">
        <div class="type-link medium">${this.$state.nick_name}</div>
        <div>${this.$state.created || ''}</div>
      </div>
      <div class="chat-last-talk">
        <div class="typo medium last-text">${this.$state.message || ''}</div>
        ${this.$state.noReadCnt ? `<div class="chat-nosee-cnt"><div>${this.$state.noReadCnt}</div></div>` : ''}
      </div>
    </div>
    <div class="chat-item-img">
      <img src="${`http://${location.hostname}:81/${this.$state.img_list[0]}` || ''}" style="width: 100%;" />
    </div>
    </a>`;
  }
}
