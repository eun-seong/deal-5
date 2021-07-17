import { svgIcons } from '@/src/assets/svgIcons';
import Component from '@/src/interfaces/Component';
import Button from '../Share/Button';

export default class ItemDetailFooterComponent extends Component {
  setup() {
    this.$state = { ...this.$props.state };
  }

  template() {
    const { price, bookmarked } = this.$state;
    return `
        <div class='itemprice-wrap'>
          <div class="svg-icon bookmark ${bookmarked ? 'check' : ''}">${svgIcons.heart}</div>
          <div class="item-price">${price}</div>
        </div>
        <div class='contact-btn' data-component="contact-btn"></div>
    `;
  }

  mounted() {
    const btn = this.$target.querySelector('[data-component="contact-btn"]') as HTMLElement;
    const { counts } = this.$state;

    if (this.$state.isSeller) {
      new Button(btn, {
        text: `채팅 목록 보기${counts.chats ? `(${counts.chats})` : ``}`,
        disabled: !counts.chats,
        href: '#/chat',
      });
    } else {
      new Button(btn, { text: `문의하기`, href: '#/chat' });
    }
  }
}
