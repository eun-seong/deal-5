import { svgIcons } from '@/src/assets/svgIcons';
import Component from '@/src/interfaces/Component';

export default class ItemDetail extends Component {
  setup() {
    this.$state = { ...this.$props.state };
  }

  template() {
    const { discription, itemName, category, counts, location, createtime, sellerName, isSeller } = this.$state;

    return `<div>
    ${
      isSeller
        ? `<div class="selectbox-wrapper">
        <select class="selectbox">
        <option value='saleNow' selected>판매중</option>
        <option value='reserve'>예약중</option>
        <option value='soldout'>판매완료</option>
      </select> <span class="selectbox-icon">${svgIcons.chevronDown}</span>
      </div>`
        : ``
    }
      <div class="item-description">
      <div class="item-detail-name">${itemName}</div>
      <div class="item-detail-category">${category}•${createtime}</div>
      <div class="item-detail-description">
  <pre>${discription}</pre>
      </div>
      <div class="item-detail-counts">채팅 ${counts.chats}•관심 ${counts.bookmarks}•조회 ${counts.views}</div>
      <div class="item-detail-seller typo medium">
        <div>판매자 정보</div>
        <div> ${sellerName} <span class="location">${location}</span></div>
      </div>
    </div>
    
    
    </div>`;
  }
}
