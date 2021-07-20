import Component from '@/src/interfaces/Component';
import testimg from '@/src/assets/imgs/item.jpeg';
import { svgIcons } from '@/src/assets/svgIcons';
import DropDown from '../Share/DropDown';
import { GetItemListByUser } from '@/src/apis/main';

interface SalesItem {
  img: string;
  title: string;
  location_1: string;
  price: string;
  created: string;
  comments: Number;
  bookmarks: Number;
}

export default class SalesList extends Component {
  setup() {}

  template() {
    return `<ul class="sales-list items-wrap" data-component="sales-wrap"></ul>`;
  }

  mounted() {
    const salesList = document.querySelector('[data-component="sales-wrap"]') as HTMLElement;
    GetItemListByUser({ uid: 4 }).then(res => {
      const data = res;

      salesList.innerHTML = data.length
        ? data
            .map(
              (list: SalesItem) => `
      <li class="sales-item content" data-href='#/item-detail'>
        <div class="item-img-wrap">
          <img src="${testimg}" />
        </div>
        <div class='item-info'>
          <div class='type-link medium item-name'>${list.title}</div>
          <div class='typo small item-location'>${list.location_1} • ${list.created}</div>
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
            .join('')
        : `<div class='empty-content'>상품을 등록하여 판매를시작하세요 :)</div>`;
    });
  }
  setEvent() {
    const dropdown = this.$target.querySelector('[data-component="sales-wrap"]') as HTMLElement;

    dropdown.addEventListener('click', (e: any) => {
      if (e.target.closest('.more-item-info')) {
        const $dropDownDiv = document.createElement('div');
        $dropDownDiv.className = 'dropdown-container';
        this.$target.appendChild($dropDownDiv);
        new DropDown($dropDownDiv, {
          onClickItem: this.dropdownClickEvent,
          specialItems: [
            {
              name: '수정하기',
              type: 'edit',
            },
            {
              name: '삭제하기',
              type: 'delete',
            },
          ],
          pos: {
            left: e.clientX,
            top: e.clientY,
          },
        });
      } else {
        const closest = e.target.closest('.sales-item');
        const href = closest.getAttribute('data-href');
        location.href = href;
      }
    });
  }

  dropdownClickEvent(e: any) {
    const type = e.target!.getAttribute('type');

    console.log(type);
  }
}
