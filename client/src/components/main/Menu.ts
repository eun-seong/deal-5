import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import MenuBody from './MenuBody';

export default class MenuContainer extends Component {
  template() {
    return `
        <header class='menu-header' data-component='menu-header'></header>
        <section class='menu-body' data-component='menu-body'></section>
      `;
  }
  mounted() {
    const $header = this.$target.querySelector('[data-component="menu-header"]') as HTMLElement;
    const $body = this.$target.querySelector('[data-component="menu-body"]') as HTMLElement;
    const leftArrowEvent = this.$props.toggleMenu;

    new CommonHeader($header, { title: this.$props.title, leftArrowEvent });
    new MenuBody($body);
  }
}
