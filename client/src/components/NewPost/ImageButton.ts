import Component from '@/src/interfaces/Component';
import textImg1 from '@/src/assets/imgs/test_img_1.png';
import { svgIcons } from '@/src/assets/svgIcons';

export default class ImageButton extends Component {
  template() {
    const { img_src } = this.$props;

    return `
    <div class="image-button">
      <img src=${img_src || textImg1}></img>
    </div>
    `;
  }
}

export class ImageAddButton extends Component {
  template() {
    const { imageNum } = this.$props;

    return `
    <label for="img-select">
    <div class="image-button" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <input type="file" id="img-select" accept="image/*" style="display:none">
      ${svgIcons.image}
      <div style="margin-top: 5px;">${imageNum}/10</div>
    </div>
    </label>
    `;
  }

  setEvent() {
    const { selectedImage } = this.$props;

    this.addEvent('input', '#img-select', selectedImage);
  }
}
