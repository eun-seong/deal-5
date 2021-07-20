import Component from '@/src/interfaces/Component';
import ItemComponent from './Item';
import { GetItemList, ChangeBookmark } from '@/src/apis/main';
import Snackbar from '../Share/Snackbar';

export default class MainBody extends Component {
  setup() {}
  template() {
    return `<ul data-component="items-wrap" class="items-wrap"></ul>`;
  }

  setEvent() {
    this.addEvent('click', '[data-component=items-wrap]', this.itemEvent);
  }

  mounted() {
    const $ul = this.$target.querySelector('[data-component=items-wrap]') as HTMLElement;

    GetItemList({ location: '쥄실', uid: 4, limit: 0 })
      .catch(error => console.error('Error:', error))
      .then(response => {
        response.forEach((state: any) => {
          const li = document.createElement('li');
          li.className = 'body-item content';
          li.setAttribute('data-href', '#/item-detail');
          li.setAttribute('data-item_id', state.id);

          new ItemComponent(li, { state });
          $ul.appendChild(li);
        });
      });
  }

  itemEvent(e: any) {
    const bookmark = e.target.closest('.bookmark');
    const item = e.target.closest('li.body-item');
    if (!!bookmark) {
      ChangeBookmark({
        uid: 4,
        bookmarked: !!bookmark.classList.contains('check'),
        item_id: item.getAttribute('data-item_id'),
      }).then(response => {
        const snackbar_wrap = document.createElement('div');
        snackbar_wrap.classList.add('snackbar_wrap');
        new Snackbar(snackbar_wrap, { text: response.message });
        bookmark.classList.toggle('check');
      });
    } else {
      location.href = item.getAttribute('data-href');
    }
  }
}
