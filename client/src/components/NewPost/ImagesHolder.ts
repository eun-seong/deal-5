import Component from '@/src/interfaces/Component';
import ImageButton, { ImageAddButton } from './ImageButton';
// import testimg from '@/src/assets/tmpimgs/test_img_8.png';

interface Image {
  id: number;
  path: string;
}

export default class ImagesHolder extends Component {
  images: Array<Image> = [];
  setup() {
    this.images = new Array();
  }

  template() {
    return `
    <ul data-component="images"></ul>
    `;
  }

  mounted() {
    const $images = this.$target.querySelector('[data-component="images"]');
    /* 사진 추가 버튼 */
    const $li = document.createElement('li');
    new ImageAddButton($li, {
      imageNum: this.images.length,
      selectedImage: this.selectImage.bind(this),
    });
    $images?.appendChild($li);

    this.images.forEach((img: Image, i: number) => {
      const $li = document.createElement('li');
      $li.setAttribute('img-id', String(i));
      new ImageButton($li, { img_src: img, removeImage: this.removeImage.bind(this) });
      $images?.appendChild($li);
    });
  }

  readFile = (file: File) => {
    const $images = this.$target.querySelector('[data-component="images"]');
    const reader = new FileReader();
    reader.addEventListener('load', (e: any) => {
      // 사진 추가
      const lastID = this.images.length === 0 ? 0 : this.images[this.images.length - 1].id + 1;
      this.images = [...this.images, { id: lastID, path: e.target.result }];
      const $li = document.createElement('li');
      $li.setAttribute('img-id', String(lastID));
      new ImageButton($li, { img_src: e.target.result, removeImage: this.removeImage.bind(this) });
      $images?.appendChild($li);

      // 사진 개수 update
      this.updateNumOfImages();
    });
    reader.readAsDataURL(file);
  };

  selectImage() {
    if (this.images.length > 10) {
      // TODO Alert 처리
      return;
    }

    const $imageInput = this.$target.querySelector('#img-select') as HTMLInputElement;
    const selectedFiles = $imageInput.files;

    if (selectedFiles) [].forEach.call(selectedFiles, this.readFile);
  }

  removeImage(e: any) {
    // 사진 삭제
    const imgId = parseInt(e.target.closest('li').getAttribute('img-id'));
    this.images = this.images.filter(img => img.id !== imgId);
    e.target.closest('li').remove();

    // 사진 개수 update
    this.updateNumOfImages();
  }

  updateNumOfImages() {
    const $numOfImages = this.$target.querySelector('ul>li:first-child #images-num') as HTMLElement;
    $numOfImages.innerText = String(this.images.length);

    // 이미지 최소 1개 기준 충족 event
    if (this.images.length === 0) {
      this.$target.dispatchEvent(new Event('disableImage', { bubbles: true }));
    } else if (this.images.length === 1) {
      this.$target.dispatchEvent(new Event('ableImage', { bubbles: true }));
    }
  }
}
