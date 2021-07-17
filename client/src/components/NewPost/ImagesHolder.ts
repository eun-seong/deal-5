import Component from '@/src/interfaces/Component';
import ImageButton from './ImageButton';

export default class ImagesHolder extends Component {
  template() {
    return `
    <ul data-component="images">
    <li><div class="image-button"></div></li>
    <li><div class="image-button"></div></li>
    <li><div class="image-button"></div></li>
    <li><div class="image-button"></div></li>
    <li><div class="image-button"></div></li>
    <li><div class="image-button"></div></li>
    <li><div class="image-button"></div></li>
    <li><div class="image-button"></div></li>

    </ul>
    `;
  }

  mounted() {
    const $images = this.$target.querySelector('[data-component="images"]');

    const $li = document.createElement('li');
    new ImageButton($li);
    $images?.appendChild($li);
  }
}
