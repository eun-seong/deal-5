import Component from '@/src/interfaces/Component';
import ItemDetailFooter from './ItemDetailFooter';
import ItemDetailBody from './ItemDetailBody';
import ItemDetailSlider from './Slider';

interface ItemDetailState {
  isSeller: boolean;
  chatsCnt: boolean;
  price: string;
  bookmarked: boolean;
}

export default class ItemDetail extends Component {
  //상태 변경시 변경된 ui 적용
  setup() {
    this.$state = {
      sellerName: '골목대장퉁퉁이',
      itemName: '골목대장퉁퉁이의 500년된 마이크',
      category: '기타 레전드 등급 중고물품',
      isSeller: true,
      price: '120000원',
      createtime: '21만년전',
      discription: `에.... 이건..... 파는 상품이...아닌데
<br>채팅 좀 그만 보내세요
<br>
<br>
<br>
<br>
<br>
<br>팔지도 않을꺼면서 왜 올렸냐구요??
<br>
<br>채팅얼마 없는데 왜 많은척 하냐구요???
<br>
<br>몰라요 시러시러.`,
      bookmarked: true,
      location: '불곰국',
      counts: {
        chats: 2,
        bookmarks: 9,
        views: 99999,
      },
    };
  }

  template() {
    return `
      <section class="item-detail-slider" data-component="item-detail-slider"></section>
      <section class="item-detail-body" data-component="item-detail-body">test</section>
      <section class="item-detail-footer type-link small" data-component="item-detail-footerer"></section>
    `;
  }

  mounted() {
    const $slider = document.querySelector('[data-component="item-detail-slider"]') as HTMLElement;
    const $body = document.querySelector('[data-component="item-detail-body"]') as HTMLElement;
    const $footer = document.querySelector('[data-component="item-detail-footerer"]') as HTMLElement;

    new ItemDetailSlider($slider);
    new ItemDetailBody($body, { state: this.$state });
    new ItemDetailFooter($footer, { state: this.$state });
  }
}
