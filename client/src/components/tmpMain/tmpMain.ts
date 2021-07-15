import Component from '@/src/interfaces/Component';
import InputPopup from '../Share/InputPopup';
import InfoProduct from '../ChatDetail/InfoProduct';

class tmpMain extends Component {
  template() {
    return `
    <header data-component="header"></header>
    <div class="content">
      <div data-component="test"></div>
    </div>
    `;
  }

  mounted() {
    const $test = this.$target.querySelector('[data-component="test"]');

    new InfoProduct($test as HTMLElement, {
      title: '타이틀',
      price: 16000,
      status: 0,
      productId: 23,
    });
  }
}

export default tmpMain;
