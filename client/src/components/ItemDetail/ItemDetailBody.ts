import { svgIcons } from '@/src/assets/svgIcons';
import Component from '@/src/interfaces/Component';
import DropDown from '../Share/DropDown';

export default class ItemDetail extends Component {
  setup() {
    this.$state = { ...this.$props.state };
  }

  template() {
    const { sellType, discription, itemName, category, counts, location, createtime, sellerName, isSeller } =
      this.$state;

    return `<div>
    ${
      isSeller
        ? `<div class="selectbox-wrapper">
        <div class="current-selected">
          <div class="selectbox">${sellType}</div> 
          <span class="selectbox-icon">${svgIcons.chevronDown}</span>
        </div>
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

  mounted() {
    if (this.$state.isSeller) {
      const dropdownTarget = document.querySelector('body') as HTMLElement;
      const selectBox = dropdownTarget.querySelector('.selectbox-wrapper') as HTMLElement;

      selectBox.addEventListener('click', (e: any) => {
        const $dropDownDiv = document.createElement('div');
        $dropDownDiv.className = 'dropdown-container';
        this.$target.appendChild($dropDownDiv);

        const currentState = this.$target.querySelector('.current-selected .selectbox') as HTMLElement;
        const type = currentState.innerText;

        const itemsType = ['예약중', '판매중', '판매완료'];
        const specialItems = itemsType
          .filter(a => type !== a)
          .map(type => {
            return {
              name: type.length == 3 ? type + '으로 변경' : type + '로 변경',
              type,
            };
          });

        new DropDown($dropDownDiv, {
          onClickItem: this.dropdownClickEvent.bind(this),
          specialItems,
          pos: {
            left: e.clientX,
            top: e.clientY,
          },
        });
      });
    }
  }

  dropdownClickEvent(e: any) {
    const currentState = this.$target.querySelector('.current-selected .selectbox') as HTMLElement;
    const type = e.target!.getAttribute('type');

    currentState.innerText = type;
  }
}
