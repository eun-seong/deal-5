import Component from '@/src/interfaces/Component';

export default class ItemPrice extends Component {
  template() {
    return `
      <span>₩ </span>
      <textarea rows="1" placeholder="가격(선택사항)"></textarea>
    `;
  }

  mounted() {}
}
