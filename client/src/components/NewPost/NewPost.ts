import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import { svgIcons } from '@/src/assets/svgIcons';
import historyBack from '@/src/assets/utils/historyBack';
import ImagesHolder from './ImagesHolder';
import PostTitle from './PostTitle';
import ItemPrice from './ItemPrice';
import PostConent from './PostContent';
import SaleLocation from './SaleLocation';

export default class NewPost extends Component {
  template() {
    return `
    <header data-component="header"></header>
    <div class="content">
      <div data-component="images-holder"></div>
      <div class="line"></div>
      <div data-component="post-title"></div>
      <div class="line"></div>
      <div data-component="item-price"></div>
      <div class="line"></div>
      <div data-component="post-content"></div>
      <div class="line"></div>
      <div data-component="sale-location"></div>
    </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $imagesHolder = this.$target.querySelector('[data-component="images-holder"]');
    const $postTitle = this.$target.querySelector('[data-component="post-title"]');
    const $itemPrice = this.$target.querySelector('[data-component="item-price"]');
    const $postContent = this.$target.querySelector('[data-component="post-content"]');
    const $saleLocation = this.$target.querySelector('[data-component="sale-location"]');

    new CommonHeader($header as HTMLElement, {
      leftArrowEvent: historyBack,
      title: '글쓰기',
      rightButton: {
        svg: svgIcons.check,
        colorType: 'gray1',
        handleClick: this.handlePostingButton.bind(this),
      },
    });
    new ImagesHolder($imagesHolder as HTMLElement);
    new PostTitle($postTitle as HTMLElement);
    new ItemPrice($itemPrice as HTMLElement);
    new PostConent($postContent as HTMLElement);
    new SaleLocation($saleLocation as HTMLElement);
  }

  handlePostingButton() {
    console.log('post');
  }
}
