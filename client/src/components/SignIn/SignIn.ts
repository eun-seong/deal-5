import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import UserInput, { UserInputProps } from '../Share/UserInput';
import Button from '../Share/Button';
import LinkButton from '../Share/LinkButton';

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

    new CommonHeader($header as HTMLElement, { title: '회원가입' });
    new UserInput($signinInput as HTMLElement, {
      type: 'text',
      placeholder: '아이디를 입력하세요',
    });
    new Button($signinBtn as HTMLElement, { text: '로그인' });
    new LinkButton($registerLink as HTMLElement, { text: '회원가입', href: '/#/register' });
  }
}

export default SignIn;
