import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import CategoryBody from './CategoryBody';

export default class CategoryContainer extends Component {
  template() {
    return `
        <header class='category-header' data-component='category-header'></header>
        <section class='category-body' data-component='category-body'></section>
        <footer class='category-footer'></footer>
      `;
  }
  mounted() {
    const $header = this.$target.querySelector('header[data-component="category-header"]') as HTMLElement;
    const $body = this.$target.querySelector('section[data-component="category-body"]') as HTMLElement;
    new CommonHeader($header, { title: '카테고리', leftArrowEvent: this.$props.toggleCategory });
    new CategoryBody($body);
  }
}
