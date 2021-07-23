import Component from '@/src/interfaces/Component';
import ImageButton, { ImageAddButton } from './ImageButton';

export default class ImagesHolder extends Component {
  template() {
    return `
    <ul data-component="images"></ul>
    `;
  }

  mounted() {
    const { images, selectImage, removeImage } = this.$props;

    const $images = this.$target.querySelector('[data-component="images"]');
    /* 사진 추가 버튼 */
    const $li = document.createElement('li');
    new ImageAddButton($li, {
      imageNum: images.length,
      selectedImage: selectImage.bind(this),
    });
    $images?.appendChild($li);

    images.forEach((img: any, i: number) => {
      const $li = document.createElement('li');
      $li.setAttribute('img-id', String(i));
      new ImageButton($li, {
        img_src: `http://${location.hostname}:81/${img.path}`,
        removeImage: removeImage.bind(this),
      });
      $images?.appendChild($li);
    });
  }
}
