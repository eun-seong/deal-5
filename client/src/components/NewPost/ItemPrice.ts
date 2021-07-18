import Component from '@/src/interfaces/Component';
import addPriceComma from '@/src/assets/utils/addPriceComma';

export default class ItemPrice extends Component {
  template() {
    return `
      <span>₩ </span>
      <input type="text" placeholder="가격(선택사항)"></input>
    `;
  }

  setEvent() {
    this.addEvent('input', 'input', (e: any) => {
      const value = e.target.value;
      // 단위 활성화
      const $won = this.$target.querySelector('span');
      if (e.target.value) {
        $won?.setAttribute('active', '');
      } else {
        $won?.removeAttribute('active');
      }

      // 컴마(,) 넣기
      const price = value.replace(/[^0-9]/g, '').replace(/,/g, '');
      if (parseInt(price) > 99999999) e.target.value = addPriceComma('99999999');
      else e.target.value = addPriceComma(price);
    });
  }
}
