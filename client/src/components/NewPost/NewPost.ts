import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import { svgIcons } from '@/src/assets/svgIcons';
import historyBack from '@/src/assets/utils/historyBack';
import ImagesHolder from './ImagesHolder';
import PostTitle from './PostTitle';
import ItemPrice from './ItemPrice';
import PostConent from './PostContent';
import SaleLocation from './SaleLocation';

interface IpostStandardStatus {
  image: boolean;
  title: boolean;
  content: boolean;
}

export default class NewPost extends Component {
  postStandardStatus: IpostStandardStatus = {
    image: false,
    title: false,
    content: false,
  };

  template() {
    return `
    <header data-component="header"></header>
    <div class="content" id="new-post">
      <div data-component="images-holder"></div>
      <div class="line"></div>
      <div data-component="post-title"></div>
      <div class="line"></div>
      <div data-component="item-price"></div>
      <div class="line"></div>
      <div data-component="post-content"></div>
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

  setEvent() {
    this.addEvent('ableImage', '#new-post', (e: any) => {
      this.postStandardStatus.image = true;
      if (this.isAbleToButtonActive()) this.ableToButton();
    });
    this.addEvent('disableImage', '#new-post', (e: any) => {
      this.postStandardStatus.image = false;
      this.disableToButton();
    });
    this.addEvent('ableContent', '#new-post', (e: any) => {
      this.postStandardStatus.content = true;
      if (this.isAbleToButtonActive()) this.ableToButton();
    });
    this.addEvent('disableContent', '#new-post', (e: any) => {
      this.postStandardStatus.content = false;
      this.disableToButton();
    });
    this.addEvent('ableTitle', '#new-post', (e: any) => {
      this.postStandardStatus.title = true;
      if (this.isAbleToButtonActive()) this.ableToButton();
    });
    this.addEvent('disableTitle', '#new-post', (e: any) => {
      this.postStandardStatus.title = false;
      this.disableToButton();
    });
  }

  isAbleToButtonActive() {
    return this.postStandardStatus.image && this.postStandardStatus.title && this.postStandardStatus.content;
  }

  ableToButton() {
    const $postButton = this.$target.querySelector('[data-btn="right-btn"]>svg');
    $postButton?.setAttribute('color', 'primary1');
  }

  disableToButton() {
    const $postButton = this.$target.querySelector('[data-btn="right-btn"]>svg');
    $postButton?.setAttribute('color', 'gray1');
  }

  handlePostingButton() {
    console.log('post');
  }
}
