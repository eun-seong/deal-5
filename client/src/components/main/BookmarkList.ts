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
    this.addEvent('click', '[data-component=bookmarks-wrap]', this.bookmarkToggle);
  }

  mounted() {
    const $ul = this.$target.querySelector('[data-component=bookmarks-wrap]') as HTMLElement;

    this.items.forEach((state: any) => {
      const li = document.createElement('li');
      li.className = 'sales-item content';
      new ItemComponent(li, { state });
      $ul.appendChild(li);
    });
  }

  bookmarkToggle(e: any) {
    e.target.closest('.bookmark')?.classList.toggle('check');
  }
}
