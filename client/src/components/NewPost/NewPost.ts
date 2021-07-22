import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import { svgIcons } from '@/src/assets/svgIcons';
import historyBack from '@/src/assets/utils/historyBack';
import ImagesHolder from './ImagesHolder';
import PostTitle from './PostTitle';
import ItemPrice from './ItemPrice';
import PostConent from './PostContent';
import SaleLocation from './SaleLocation';
import ImageButton from './ImageButton';
import { apiEditPost, apiGetPost, apiImageUpload, apiNewPost } from '@/src/apis/newpost';
import { $router } from '../core/Router';
import addPriceComma from '@/src/assets/utils/addPriceComma';

interface IstatusOfPostingStandard {
  image: boolean;
  title: boolean;
  content: boolean;
}

interface Image {
  id: number;
  path: string;
  file?: File;
}

interface IPostingData {
  category: number;
  title: string;
  discription: string;
  price: number;
  img_list: string[];
}

interface IEditData {
  id: number;
  category: number;
  title: string;
  discription: string;
  price: number;
  img_list: string[];
  deletedList: string[];
}

export default class NewPost extends Component {
  statusOfPostingStandard: IstatusOfPostingStandard = {
    image: false,
    title: false,
    content: false,
  };
  images: Array<Image> = [];
  deletedExistingImages: Array<string> = [];

  setup() {
    this.images = new Array();
    this.deletedExistingImages = new Array();
    this.$state = {
      images: [],
      item_id: parseInt(this.$props.parsingData.id),
    };

    if (this.$state.item_id) {
      apiGetPost({ id: this.$state.item_id })
        .then(
          function (this: any, res: any) {
            console.log(res.data);
            this.setState({
              ...this.$state,
              postContents: res.data,
              images: res.data.img_list.map((img: string, idx: number) => {
                return { id: idx, path: img };
              }),
            });
            this.images = this.$state.images;
          }.bind(this)
        )
        .catch(err => console.log(err));
    }
  }

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
    const { item_id, postContents } = this.$state;
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
    new ImagesHolder($imagesHolder as HTMLElement, {
      images: this.$state.images,
      selectImage: this.selectImage.bind(this),
      removeImage: this.removeImage.bind(this),
    });
    new PostTitle($postTitle as HTMLElement);
    new ItemPrice($itemPrice as HTMLElement);
    new PostConent($postContent as HTMLElement);
    new SaleLocation($saleLocation as HTMLElement);

    if (!!item_id) {
      const $title = this.$target.querySelector('.post-title') as HTMLTextAreaElement;
      const $category = this.$target.querySelector('.category') as HTMLElement;
      $category.removeAttribute('hidden');
      const $selectedCategory = this.$target.querySelector(
        `#category-list>li[category-id="${postContents.category}"]`
      ) as HTMLElement;
      const $price = this.$target.querySelector('.post-price') as HTMLInputElement;
      const $content = this.$target.querySelector('.post-content') as HTMLTextAreaElement;

      $title.value = postContents.title;
      $price.value = addPriceComma(String(postContents.price));
      $content.value = postContents.discription;
      $selectedCategory.setAttribute('active', '');

      this.statusOfPostingStandard = {
        image: true,
        title: true,
        content: true,
      };
    }
  }

  setEvent() {
    const $newpost = this.$target.querySelector('#new-post');

    $newpost?.addEventListener(
      'ableContent',
      function (this: any, e: any) {
        console.log('ableContent');
        this.statusOfPostingStandard.content = true;
        if (this.isAbleToButtonActive.bind(this)) this.ableToButton();
      }.bind(this)
    );
    $newpost?.addEventListener(
      'disableContent',
      function (this: any, e: any) {
        console.log('disableContent');
        this.statusOfPostingStandard.content = false;
        this.disableToButton();
      }.bind(this)
    );
    $newpost?.addEventListener(
      'ableTitle',
      function (this: any, e: any) {
        console.log('ableTitle');
        this.statusOfPostingStandard.title = true;
        if (this.isAbleToButtonActive.bind(this)) this.ableToButton();
      }.bind(this)
    );
    $newpost?.addEventListener(
      'disableTitle',
      function (this: any, e: any) {
        console.log('disableTitle');
        this.statusOfPostingStandard.title = false;
        this.disableToButton();
      }.bind(this)
    );
  }

  isAbleToButtonActive() {
    return (
      this.statusOfPostingStandard.image && this.statusOfPostingStandard.title && this.statusOfPostingStandard.content
    );
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
    const isAbleToButtonActive = this.isAbleToButtonActive;
    if (!isAbleToButtonActive) return;

    const $title = this.$target.querySelector('.post-title') as HTMLTextAreaElement;
    const $category = this.$target.querySelector('#category-list>li[active]') as HTMLElement;
    const $price = this.$target.querySelector('.post-price') as HTMLInputElement;
    const $content = this.$target.querySelector('.post-content') as HTMLTextAreaElement;

    // 선택된 이미지를 formData에 넣습니다.
    // 삭제 기능도 있어서 선택될 때마다 넣지 않고 리스트로 관리한 후 완료될 때 수행합니다.
    const formData = new FormData();
    this.images
      .filter(img => !!img.file)
      .forEach(img => {
        formData.append('img', img.file as File);
      });

    // 이미지 업로드 API 호출
    apiImageUpload(formData)
      .then(
        function (this: any, res: any) {
          if (res.ok) {
            console.log(res.filePath);
            const item_id = this.$state.item_id;
            if (!item_id) {
              console.log('new');
              // 새로운 글
              const postingData: IPostingData = {
                category: parseInt($category.getAttribute('category-id') as string),
                title: $title.value,
                discription: $content.value,
                price: parseInt($price.value.replace(',', '')),
                img_list: res.filePath,
              };

              return apiNewPost(postingData);
            } else {
              console.log('edit');
              // 기존 글 수정하기
              const remainImg = this.$state.images.map((img: { path: string; id: number }) => img.path);
              const editData: IEditData = {
                id: item_id,
                category: parseInt($category.getAttribute('category-id') as string),
                title: $title.value,
                discription: $content.value,
                price: parseInt($price.value.replace(',', '')),
                img_list: [...res.filePath, ...remainImg],
                deletedList: this.deletedExistingImages,
              };
              return apiEditPost(editData);
            }
          } else {
            Error(res.message);
          }
        }.bind(this)
      )
      .then((res: any) => {
        $router.push(`/`); // TODO 작성한 글로 이동
      })
      .catch(err => console.log(err));
  }

  // image Holder
  readFile(file: File) {
    const $images = this.$target.querySelector('[data-component="images"]');
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function (this: any, e: any) {
        // 사진 추가
        const lastID = this.images.length === 0 ? 0 : this.images[this.images.length - 1].id + 1;
        this.images = [...this.images, { id: lastID, path: e.target.result, file: file }];
        const $li = document.createElement('li');
        $li.setAttribute('img-id', String(lastID));
        new ImageButton($li, { img_src: e.target.result, removeImage: this.removeImage.bind(this) });
        $images?.appendChild($li);

        // 사진 개수 update
        this.updateNumOfImages();
      }.bind(this)
    );
    reader.readAsDataURL(file);
  }

  selectImage(e: any) {
    if (this.images.length > 10) {
      // TODO Alert 처리
      return;
    }

    const selectedFiles = e.target.files;
    if (selectedFiles) [].forEach.call(selectedFiles, this.readFile.bind(this));
  }

  removeImage(e: any) {
    // 사진 삭제
    const imgId = parseInt(e.target.closest('li').getAttribute('img-id'));
    const deletedImage: Image = this.images.filter(img => img.id === imgId)[0];

    if (!deletedImage.file) {
      this.deletedExistingImages.push(deletedImage.path);
    }
    this.images = this.images.filter(img => img.id !== imgId);
    e.target.closest('li').remove();
    console.log(this.images, this.deletedExistingImages);

    // 사진 개수 update
    this.updateNumOfImages();
  }

  updateNumOfImages() {
    const $numOfImages = this.$target.querySelector('ul>li:first-child #images-num') as HTMLElement;
    $numOfImages.innerText = String(this.images.length);

    // 이미지 최소 1개 기준 충족 event
    if (this.images.length === 0) {
      this.statusOfPostingStandard.image = false;
      this.disableToButton();
    } else if (this.images.length === 1) {
      this.statusOfPostingStandard.image = true;
      if (this.isAbleToButtonActive()) this.ableToButton();
    }
  }
}
