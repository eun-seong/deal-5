import Component from '@/src/interfaces/Component';
import ItemDetailFooter from './ItemDetailFooter';
import ItemDetailBody from './ItemDetailBody';
import ItemDetailSlider from './Slider';
import { GetItem, UpdateViewCnt } from '@/src/apis/itemdetail';
import Snackbar from '../Share/Snackbar';
import historyBack from '@/src/assets/utils/historyBack';

export default class ItemDetail extends Component {
  //상태 변경시 변경된 ui 적용
  setup() {
    let params = new URLSearchParams(document.location.href.split('?')[1]);
    this.$state = {
      item_id: Number(params.get('id')),
    };

    UpdateViewCnt({ item_id: this.$state.item_id });
  }
  template() {
    return `
      <section class="item-detail-slider" data-component="item-detail-slider"></section>
      <section class="item-detail-body" data-component="item-detail-body">test</section>
      <section class="item-detail-footer type-link small" data-component="item-detail-footerer"></section>
    `;
  }

  mounted() {
    const { item_id } = this.$state;
    const $slider = document.querySelector('[data-component="item-detail-slider"]') as HTMLElement;
    const $body = document.querySelector('[data-component="item-detail-body"]') as HTMLElement;
    const $footer = document.querySelector('[data-component="item-detail-footerer"]') as HTMLElement;

    GetItem({ item_id }).then(
      function (this: any, res: any) {
        if (!res.ok) {
          new Snackbar(document.body, { text: res.message });
          historyBack();
        }

        const data = res.data;

        this.$state = {
          ...this.$state,
          sellType: data.sales_type,
          sellerName: data.nick_name,
          itemName: data.title,
          category: data.category,
          isSeller: data.isSeller || false,
          price: data.price,
          createtime: data.created,
          discription: data.discription,
          bookmarked: data.boookmarked || 0,
          location: data.location_1,
          counts: {
            chats: data.comments,
            bookmarks: data.bookmarks,
            views: data.view_cnt,
          },
          imgList: data.img_list,
        };

        new ItemDetailSlider($slider, { state: this.$state });
        new ItemDetailBody($body, { state: this.$state });
        new ItemDetailFooter($footer, { state: this.$state });
      }.bind(this)
    );
  }
}
