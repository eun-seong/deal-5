import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import UserInput, { UserInputProps } from '../Share/UserInput';
import Button from '../Share/Button';
import SignIn from '../SignIn';

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
  {
    type: 'text',
    placeholder: '닉네임',
    label: '닉네임',
    name: 'nickname',
  },
  {
    type: 'text',
    placeholder: '시∙구 제외, 동만 입력',
    label: '우리 동네',
    name: 'location',
  },
];

class Register extends Component {
  template() {
    return `
    <header data-component="header"></header>
    <div class="content">
        <div id="register-input"></div>
        <div id="register-button"></div>
    </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $registerInput = this.$target.querySelector('#register-input');
    const $registerButton = this.$target.querySelector('#register-button');

    new CommonHeader($header as HTMLElement, { title: '회원가입' });

    inputList.forEach(input => {
      const $input = document.createElement('div');
      $registerInput?.appendChild($input);
      new UserInput($input, input);
    });

    new (Button as any)($registerButton, { text: '회원가입' });
  }

  setEvent() {
    this.addEvent('click', '.btn', () => {
      location.href = '/';
    });
  }
}

export default Register;
