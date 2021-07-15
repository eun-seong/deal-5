import Component from '@/src/interfaces/Component';
import sibling from '@/src/assets/utils/sibling';
import SalesList from './SalesList';
import ChatsList from '../Share/ChatsList';

export default class MenuBody extends Component {
  template() {
    return `
    <div>
      <ul class="menu-tabs-list">
        <li data-menu-tab='sales-tab' class='type-link small active'>판매목록</li>
        <li data-menu-tab='chats-tab' class='type-link small'>채팅목록</li>
        <li data-menu-tab='bookmarks-tab' class='type-link small'>관심목록</li>
        <hr id="menu-tabs-underline" class="underline sales-tab" />
      </ul>
      <div class="tabpanal" data-component="tabpanal"></div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent('click', 'ul.menu-tabs-list', (e: any) => {
      const pos = e.target.getAttribute('data-menu-tab');
      if (!!!pos) return;

      sibling(e.target).forEach((el: Element) => el.classList.remove('active'));
      e.target.classList.add('active');

      const underline = document.getElementById('menu-tabs-underline') as HTMLElement;
      underline.className = underline.className.replace(/(sales-tab)|(chats-tab)|(bookmarks-tab)/g, pos);

      this.changeTabPanal(pos);
    });
  }

  mounted() {
    const $tabpanal = this.$target.querySelector('[data-component="tabpanal"]') as HTMLElement;
    new SalesList($tabpanal);
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
        new SalesList($tabpanal);
        break;
    }
  }
}
