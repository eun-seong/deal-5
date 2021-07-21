import Component from '@/src/interfaces/Component';
import ItemComponent from './Item';
import { GetItemList, ChangeBookmark } from '@/src/apis/main';
import Snackbar from '../Share/Snackbar';

export default class MainBody extends Component {
  setup() {
    this.$state = {
      category: null,
    };
  }
  template() {
    return `<ul data-component="items-wrap" class="items-wrap"></ul>`;
  }

  setEvent() {
    this.addEvent('click', '[data-component=items-wrap]', this.itemEvent);
    const category = document.querySelector('[data-component="category"]');
    category?.addEventListener('click', this.categoryClick.bind(this));
  }

  initIntersectionObserver() {
    const $ul = this.$target.querySelector('[data-component=items-wrap]') as HTMLElement;
    const _state = this.$state;
    _state.limit = 0;

    const option = {
      root: null,
      rootMargin: '0%',
      threshold: 0.7,
    } as any;

    const io = new IntersectionObserver(([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        console.log(_state);
        GetItemList({ category: _state.category, limit: _state.limit }).then((response: any) => {
          response.forEach((state: any) => {
            const li = document.createElement('li');
            li.className = 'body-item content';
            li.setAttribute('data-href', '#/item-detail');
            li.setAttribute('data-item_id', state.id);

            new ItemComponent(li, { state });
            $ul.appendChild(li);
          });
          if (response.length > 10) {
            _state.limit += 15;
            observer.observe($ul.lastElementChild as HTMLElement);
          }
        });
      }
    }, option);

    io.observe($ul);
  }

  mounted() {
    this.initIntersectionObserver.bind(this)();
  }

  categoryClick(this: any, e: any) {
    const categortItem = e.target.closest('.category-item');
    if (categortItem) {
      this.setState({
        category: categortItem.getAttribute('data-id'),
        limit: 0,
      });
    }
  }

  itemEvent(e: any) {
    const bookmark = e.target.closest('.bookmark');
    const item = e.target.closest('li.body-item');
    if (!!bookmark) {
      ChangeBookmark({
        bookmarked: !!bookmark.classList.contains('check'),
        item_id: item.getAttribute('data-item_id'),
      }).then((response: any) => {
        new Snackbar(document.body, { text: response.message });
        if (response.ok) {
          bookmark.classList.toggle('check');
        }
      });
    } else {
      location.href = item.getAttribute('data-href');
    }
  }
}
