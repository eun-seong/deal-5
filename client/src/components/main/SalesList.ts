import Component from '@/src/interfaces/Component';
import testimg from '@/src/assets/imgs/item.jpeg';
import { svgIcons } from '@/src/assets/svgIcons';

interface SalesItem {
  img: string;
  name: string;
  location: string;
  price: string;
  createtime: string;
  comments: Number;
  bookmarks: Number;
}

export default class SalesList extends Component {
  setup() {
    this.$state = {
      list: [],
      list2: [
        {
          img: '',
          name: '다용도 캐비넷',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-15 11:00:00',
          comments: 3,
          bookmarks: 1,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: '다용도 캐비넷2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
        {
          img: '',
          name: 'last2',
          location: 'Earth',
          price: '5432',
          createtime: '2021-07-14 11:00:00',
          comments: 0,
          bookmarks: 0,
        },
      ],
    };
  }

  template() {
    return `<ul class="sales-list items-wrap">
      ${this.$state.list2.length ? this.$state.list2.map(
          (list: SalesItem) => `
        <li class="sales-item content">
          <div class="item-img-wrap">
            <img src="${testimg}" />
          </div>
          <div class='item-info'>
            <div class='type-link medium item-name'>${list.name}</div>
            <div class='typo small item-location'>${list.location} • ${list.createtime}</div>
            <div class='type-link small item-price'>${list.price}</div>
          </div>
          <div class='item-icons'>
            <div class='more-item-info'>${svgIcons.moreVertical}</div>
            <div class='item-status'>
            ${
              list.comments
                ? `<div class='comments'>${svgIcons.messageSqare}<span class='comments-count'>&nbsp;${list.comments}</span></div>`
                : ''
            }
            ${
              list.bookmarks
                ? `<div class='bookmarks'>${svgIcons.heart}<span class='bookmarks-count'>&nbsp;${list.bookmarks}</span></div>`
                : ''
            }
            </div>
          </div>
        </li>
      `
        )
        .join(''): `<div class='empty-content'>상품을 등록하여 판매를시작하세요 :)</div>`}
    </ul>`;
  }
}
