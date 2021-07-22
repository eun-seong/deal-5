import { ChangeBookmark, GetBookMarkList } from '@/src/apis/main';
import Component from '@/src/interfaces/Component';
import Snackbar from '../Share/Snackbar';
import ItemComponent from './Item';

export default class BookmarksList extends Component {
  template() {
    return `<ul data-component="bookmarks-wrap" class="sales-list items-wrap"></ul>`;
  }

  mounted() {
    const $ul = this.$target.querySelector('[data-component=bookmarks-wrap]') as HTMLElement;

    $ul.addEventListener('click', this.itemEvent);

    GetBookMarkList({ uid: 4 }).then((res: any) => {
      const data = res.data;
      if (data?.length) {
        data.forEach((state: any) => {
          const li = document.createElement('li');
          li.className = 'sales-item content';
          li.setAttribute('data-href', `#/item-detail?id=${state.id}`);
          li.setAttribute('data-item_id', state.id);

          new ItemComponent(li, { state, imgPath: state.img_list[0] });
          $ul.appendChild(li);
        });
      } else {
        $ul.innerHTML = `<div class="empty-content">${res.message}</div>`;
      }
    });
  }

  itemEvent(e: any) {
    const bookmark = e.target.closest('.bookmark');
    const item = e.target.closest('li.sales-item');
    if (!!bookmark) {
      ChangeBookmark({
        uid: 4,
        bookmarked: !!bookmark.classList.contains('check'),
        item_id: item.getAttribute('data-item_id'),
      }).then((response: any) => {
        new Snackbar(document.body, { text: response.message });
        bookmark.classList.toggle('check');
        (document.querySelector('[data-menu-tab="bookmarks-tab"]') as HTMLElement)?.click();
      });
    } else {
      location.href = item.getAttribute('data-href');
    }
  }
}
