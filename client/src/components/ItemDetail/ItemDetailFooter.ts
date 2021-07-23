import { MakeChatRoom } from '@/src/apis/chat';
import { svgIcons } from '@/src/assets/svgIcons';
import Component from '@/src/interfaces/Component';
import Button from '../Share/Button';
import Snackbar from '../Share/Snackbar';

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
    const { counts, item_id, isSeller } = this.$state;

    console.log(this.$state);
    if (isSeller) {
      new Button(btn, {
        text: `채팅 목록 보기${counts.chats ? `(${counts.chats})` : ``}`,
        disabled: !counts.chats,
      });
    } else {
      new Button(btn, { text: `문의하기` });
    }

    btn.addEventListener('click', () => {
      if (isSeller) return;
      MakeChatRoom({ item_id }).then((res: any) => {
        if (!res.ok) new Snackbar(document.body, { text: res.message });

        location.href = `#/chat?room=${res.data}`;
      });
    });

    this.$target.querySelector('.bookmark')?.addEventListener('click', function (this: any, e: any) {
      this.classList.toggle('check');
    });
  }
}
