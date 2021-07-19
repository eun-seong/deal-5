import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import UserInput, { UserInputProps } from '../Share/UserInput';
import Button from '../Share/Button';
import LinkButton from '../Share/LinkButton';
import { $router } from '../core/Router';
import { api_login } from '@/src/apis/user';

const inputList: UserInputProps[] = [
  {
    type: 'text',
    placeholder: '영문, 숫자 조합 20자 이하',
    label: '아이디',
    name: 'id',
  },
  {
    type: 'password',
    placeholder: '영문, 숫자 조합 10자 이상',
    label: '비밀번호',
    name: 'password',
  },
];

class SignIn extends Component {
  template() {
    return `
    <header data-component="header"></header>
    <div class="content">
      <div data-component="signin-input"></div>
      <div data-component="signin-btn"></div>
      <div data-component="register-link"></div>
    </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $signinInput = this.$target.querySelector('[data-component="signin-input"]');
    const $signinBtn = this.$target.querySelector('[data-component="signin-btn"]');
    const $registerLink = this.$target.querySelector('[data-component="register-link"]');

    new CommonHeader($header as HTMLElement, { title: '로그인' });
    inputList.forEach(input => {
      const $input = document.createElement('div');
      $signinInput?.appendChild($input);
      new UserInput($input, input);
    });
    new Button($signinBtn as HTMLElement, { text: '로그인' });
    new LinkButton($registerLink as HTMLElement, { text: '회원가입', href: '/#/register' });
  }

  setEvent() {
    this.addEvent('click', '[data-component="signin-btn"]>a', (e: any) => {
      e.preventDefault();
      const user_id: string = (this.$target.querySelector('input[name="id"]') as HTMLInputElement).value;
      const pw: string = (this.$target.querySelector('input[name="password"]') as HTMLInputElement).value;
      api_login({ user_id, pw })
        .then((res: any) => {
          if (res.code === 1) {
            // TODO 유저 정보 저장
            console.log(res);
            $router.push('/');
          } else console.log('로그인에 실패했습니다.');
        })
        .catch(err => console.log('error: ', err));
    });
  }
}

export default SignIn;
