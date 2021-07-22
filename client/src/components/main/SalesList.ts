import Component from '@/src/interfaces/Component';
import testimg from '@/src/assets/imgs/item.jpeg';
import { svgIcons } from '@/src/assets/svgIcons';
import DropDown from '../Share/DropDown';
import { DeleteItem, GetItemListByUser } from '@/src/apis/main';
import Snackbar from '../Share/Snackbar';
import { $router } from '../core/Router';

interface SalesItem {
  id: number;
  img: string;
  title: string;
  location_1: string;
  price: string;
  created: string;
  comments: Number;
  bookmarks: Number;
}

const baseURL = `http://${location.hostname}:81/`;

export default class SalesList extends Component {
  setup() {}

  template() {
    return `<ul class="sales-list items-wrap" data-component="sales-wrap"></ul>`;
  }

  mounted() {
    const salesList = document.querySelector('[data-component="sales-wrap"]') as HTMLElement;
    GetItemListByUser().then((res: any) => {
      const data = res.data;

      salesList.innerHTML = !!data?.length
        ? data
            .map(
              (list: SalesItem) => `
      <li class="sales-item content" data-href='#/item-detail?id=${list.id}'>
        <div class="item-img-wrap">
          <img src="${baseURL + data[0].img_list[0] || testimg}" />
        </div>
        <div class='item-info'>
          <div class='type-link medium item-name'>${list.title}</div>
          <div class='typo small item-location'>${list.location_1} • ${list.created}</div>
          <div class='type-link small item-price'>${list.price}</div>
        </div>
        <div class='item-icons'>
          <div class='more-item-info' data-item-id='${list.id}'>${svgIcons.moreVertical}</div>
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
        : `<div class='empty-content'>${res.message}</div>`;
    });
  }
  setEvent() {
    const dropdown = this.$target.querySelector('[data-component="sales-wrap"]') as HTMLElement;

    dropdown.addEventListener('click', (e: any) => {
      const moreItemInfo = e.target.closest('.more-item-info');
      if (moreItemInfo) {
        const $dropDownDiv = document.createElement('div');
        $dropDownDiv.className = 'dropdown-container';
        $dropDownDiv.setAttribute('data-target', moreItemInfo.getAttribute('data-item-id'));
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
    const dropdown = e.target!.closest('.dropdown-container');
    if (type === 'delete') {
      DeleteItem({ item_id: dropdown.getAttribute('data-target') }).then(res => {
        if (res.ok) (document.querySelector('.menu-tabs-list [data-menu-tab="sales-tab"]') as HTMLElement)?.click();
        new Snackbar(document.body, { text: res.message });
      });
    } else if (type === 'edit') {
      $router.push(`/newpost?id=${dropdown.getAttribute('data-target')}`);
    }
  }
}
