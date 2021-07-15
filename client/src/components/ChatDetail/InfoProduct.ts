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
        <div class="img" style="background-image: url('${thumbnailUrl || '../main/item.jpeg'}')"></div>
        <div class="product-desc">
          <div id="title">${title}</div>
          <div id="price">${price}원</div>
        </div>
      </a>
      <div class="product-status">${status === 0 ? '판매중' : '판매완료'}</div>
    </div>
    `;
  }
}
