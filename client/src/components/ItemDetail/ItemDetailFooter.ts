import { MakeChatRoom } from '@/src/apis/chat';
import { ChangeBookmark } from '@/src/apis/main';
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
          <div class="svg-icon bookmark">${svgIcons.heart}</div>
          <div class="item-price">${price}</div>
        </div>
        <div class='contact-btn' data-component="contact-btn"></div>
    `;
  }
  mounted() {
    const btn = this.$target.querySelector('[data-component="contact-btn"]') as HTMLElement;
    const { counts, item_id, isSeller } = this.$state;

    if (isSeller) {
      new Button(btn, {
        text: `채팅 목록 보기${counts.chats ? `(${counts.chats})` : ``}`,
        disabled: !counts.chats,
      });
    } else {
      new Button(btn, { text: `문의하기` });
    }

    btn.addEventListener('click', () => {
      if (isSeller) {
        document.querySelector('.item-detail-chats')?.classList.toggle('show');
        return;
      }
      MakeChatRoom({ item_id }).then((res: any) => {
        if (!res.ok) new Snackbar(document.body, { text: res.message });

        location.href = `#/chat?room=${res.data}`;
      });
    });

    this.$target.querySelector('.bookmark')?.addEventListener('click', function (this: any, e: any) {
      const bookmark = e.target.closest('.bookmark');
      if (!!bookmark) {
        ChangeBookmark({
          bookmarked: !!bookmark.classList.contains('check'),
          item_id,
        }).then((response: any) => {
          new Snackbar(document.body, { text: response.message });
          if (response.ok) {
            bookmark.classList.toggle('check');
          }
        });
      }
    });
  }
}
