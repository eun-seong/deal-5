import Component from '@/src/interfaces/Component';
import sibling from '@/src/assets/utils/sibling';
import SalesList from './SalesList';
import ChatsList from '../Share/ChatsList';
import BookmarksList from './BookmarkList';

export default class MenuBody extends Component {
  sales: string = '';
  chats: string = '';
  bookmarks: string = '';

  setup() {
    this.sales = 'sales-tab';
    this.chats = 'chats-tab';
    this.bookmarks = 'bookmarks-tab';
  }

  template() {
    return `
    <div>
      <ul class="menu-tabs-list">
        <li data-menu-tab='${this.sales}' class='type-link small active'>판매목록</li>
        <li data-menu-tab='${this.chats}' class='type-link small'>채팅목록</li>
        <li data-menu-tab='${this.bookmarks}' class='type-link small'>관심목록</li>
        <hr id="menu-tabs-underline" class="underline ${this.sales}" />
      </ul>
      <div class="tabpanal" data-component="tabpanal"></div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent('click', 'ul.menu-tabs-list', this.chageTab.bind(this));
  }

  mounted() {
    const $tabpanal = this.$target.querySelector('[data-component="tabpanal"]') as HTMLElement;
    new SalesList($tabpanal);
  }

  chageTab(this: any, e: any) {
    const pos = e.target.getAttribute('data-menu-tab');
    if (!!!pos) return;

    sibling(e.target).forEach((el: Element) => el.classList.remove('active'));
    e.target.classList.add('active');
    const underline = document.getElementById('menu-tabs-underline') as HTMLElement;

    underline.className = underline.className.replace(/(sales-tab)|(chats-tab)|(bookmarks-tab)/g, pos);

    this.changeTabPanal(pos);
  }

  changeTabPanal(tab: string) {
    const $tabpanal = this.$target.querySelector('[data-component="tabpanal"]') as HTMLElement;
    $tabpanal.innerHTML = '';

    switch (tab) {
      case 'sales-tab':
        new SalesList($tabpanal);
        break;
      case 'chats-tab':
        new ChatsList($tabpanal);
        break;
      case 'bookmarks-tab':
        new BookmarksList($tabpanal);
        break;
    }
  }
}
