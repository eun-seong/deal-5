import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import Button from '../Share/Button';
import { $router } from '../core/Router';

export default class MyAccount extends Component {
  template() {
    const { nickname } = this.$props.parsingData;
    return `
    <header data-component="header"></header>
    <div class="content">
    <div class="user-nickname" style="text-align:center; margin: 1rem 0 2rem 0;">
      ${nickname}
    </div>
    <div data-component="logout-btn"></div>
    </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $logoutBtn = this.$target.querySelector('[data-component="logout-btn"]');

    new CommonHeader($header as HTMLElement, { title: '내 계정' });
    new Button($logoutBtn as HTMLElement, { text: '로그아웃' });
  }

  setEvent() {
    this.addEvent('click', '[data-component="logout-btn"]>a', (e: any) => {
      e.preventDefault();
      // TODO 쿠키 파쇄
      $router.push('/');
    });
  }
}
