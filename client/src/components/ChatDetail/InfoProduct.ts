import Component from '@/src/interfaces/Component';

interface InfoProductProps {
  thumbnailUrl: string;
  title: string;
  price: number;
  status: number;
  productId: number;
}

export default class InfoProduct extends Component {
  template() {
    const { thumbnailUrl, title, price, status, productId }: InfoProductProps = this.$props;

    return `
    <div class="infoProduct">
      <a class="product" href="/#/saleproductdetail/${productId}">
        <div class="img" style="background-image: url('http://${location.hostname}:81/${thumbnailUrl}')"></div>
        <div class="product-desc">
          <div id="title">${title}</div>
          <div id="price">${price}원</div>
        </div>
      </a>
      <div class="product-status">${status === 1 ? '판매중' : status === 2 ? '판매완료' : '예약중'}</div>
    </div>
    `;
  }
}
