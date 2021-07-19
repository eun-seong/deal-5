import Component from '@/src/interfaces/Component';

export default class ItemCategory extends Component {
  template() {
    const { name, id } = this.$props;

    return `
    <div category-id="${id}">${name}</div>
    `;
  }
}
