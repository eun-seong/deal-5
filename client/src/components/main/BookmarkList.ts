import Component from '@/src/interfaces/Component';
import ItemComponent from './Item';

export default class BookmarksList extends Component {
  items: any;
  setup() {
    this.items = [
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: true,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: true,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      ,
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: true,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      ,
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: true,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      ,
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: true,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      ,
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: true,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      ,
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: false,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      ,
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: false,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
      ,
      {
        name: '메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다메잇모르겟다',
        location: 'ㄸㅁㄲ쏘',
        createtime: '1시간전',
        bookmarked: false,
        price: '0원',
        comments: 4,
        bookmarks: 4,
      },
    ];
  }
  template() {
    return `<ul data-component="bookmarks-wrap" class="sales-list items-wrap"></ul>`;
  }

  setEvent() {
    this.addEvent('click', '[data-component=bookmarks-wrap]', this.itemEvent);
  }

  mounted() {
    const $ul = this.$target.querySelector('[data-component=bookmarks-wrap]') as HTMLElement;

    this.items.forEach((state: any) => {
      const li = document.createElement('li');
      li.className = 'sales-item content';
      li.setAttribute('data-href', '#/item-detail');
      
      new ItemComponent(li, { state });
      $ul.appendChild(li);
    });
  }

  itemEvent(e: any) {
    const bookmark = e.target.closest('.bookmark');
    if (!!bookmark) {
      bookmark.classList.toggle('check');
    } else {
      const item = e.target.closest('li.sales-item');
      location.href = item.getAttribute('data-href');
    }
  }
}
