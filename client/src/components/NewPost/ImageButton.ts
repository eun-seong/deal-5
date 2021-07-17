import Component from '@/src/interfaces/Component';
import { svgIcons } from '@/src/assets/svgIcons';

export default class ImageButton extends Component {
  template() {
    const { img_src } = this.$props;

    return `
    <div class="image-remove-button">${svgIcons.close}</div>
    <div class="image-button">
      <img src=${img_src}></img>
    </div>
    `;
  }

  setEvent() {
    const { removeImage } = this.$props;
    this.addEvent('click', '.image-remove-button', removeImage);
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
