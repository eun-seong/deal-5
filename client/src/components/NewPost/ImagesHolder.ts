import Component from '@/src/interfaces/Component';
import ImageButton, { ImageAddButton } from './ImageButton';
// import testimg from '@/src/assets/tmpimgs/test_img_8.png';

export default class ImagesHolder extends Component {
  // images: Array<string> = [];
  setup() {
    this.$state = {
      images: [],
    };
    // this.images = new Array();
  }

  template() {
    return `
    <ul data-component="images"></ul>
    `;
  }

  mounted() {
    const readFile = (file: File) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e: any) => {
        /*
        this.images = [...this.images, e.target.result];
        const $li = document.createElement('li');
        $li.setAttribute('img-id', String(this.images.length));
        new ImageButton($li, { img_src: e.target.result, removeImage: removeImage });
        $images?.appendChild($li);
        */
        this.setState({
          images: [...this.$state.images, e.target.result],
        });
      });
      reader.readAsDataURL(file);
    };

    const selectImage = () => {
      if (this.$state.images.length > 10) {
        // TODO Alert 처리
        return;
      }

      const $imageInput = this.$target.querySelector('#img-select') as HTMLInputElement;
      const selectedFiles = $imageInput.files;

      if (selectedFiles) [].forEach.call(selectedFiles, readFile);
    };

    const removeImage = (e: any) => {
      const imgId = parseInt(e.target.closest('li').getAttribute('img-id'));
      /*
      this.images = [...this.images.slice(0, imgId), ...this.images.slice(imgId + 1)];
      e.target.closest('li').remove();
      */
      const { images } = this.$state;
      this.setState({
        images: [...images.slice(0, imgId), ...images.slice(imgId + 1)],
      });
    };

    const $images = this.$target.querySelector('[data-component="images"]');
    /* 사진 추가 버튼 */
    const $li = document.createElement('li');
    new ImageAddButton($li, {
      imageNum: this.$state.images.length,
      selectedImage: selectImage,
    });
    $images?.appendChild($li);

    const { images } = this.$state;
    images.forEach((img: string, i: number) => {
      const $li = document.createElement('li');
      $li.setAttribute('img-id', String(i));
      new ImageButton($li, { img_src: img, removeImage: removeImage });
      $images?.appendChild($li);
    });
  }
}
