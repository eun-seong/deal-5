import Component from '@/src/interfaces/Component';
import ImageButton, { ImageAddButton } from './ImageButton';

export default class ImagesHolder extends Component {
  setup() {
    this.$state = {
      images: [],
    };
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

    const $images = this.$target.querySelector('[data-component="images"]');

    /* 사진 추가 버튼 */
    const $li = document.createElement('li');
    new ImageAddButton($li, { imageNum: this.$state.images.length, selectedImage: selectImage });
    $images?.appendChild($li);

    const { images } = this.$state;
    images.forEach((img: string) => {
      const $li = document.createElement('li');
      new ImageButton($li, { img_src: img });
      $images?.appendChild($li);
    });
  }
}
