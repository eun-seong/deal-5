import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import Button from '../Share/Button';
import { $router } from '../core/Router';
import { api_isLogined, api_logout } from '@/src/apis/user';

export default class MyAccount extends Component {
  setup() {
    api_isLogined({}).then((res: any) => {
      if (!res.ok) {
        $router.push('/login');
      }
    });
  }

  template() {
    console.log(this.$props);
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
      api_logout({}).then((res: any) => {
        if (res.ok) {
          $router.push('/');
        } else console.log('로그아웃에 실패했습니다.');
      });
    });
  }
}
