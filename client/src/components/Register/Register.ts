import Component from '@/src/interfaces/Component';
import CommonHeader from '../Share/CommonHeader';
import UserInput, { UserInputProps } from '../Share/UserInput';
import Button from '../Share/Button';
import { api_register } from '@/src/apis/user';
import { $router } from '../core/Router';
import historyBack from '@/src/assets/utils/historyBack';

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

    new CommonHeader($header as HTMLElement, { title: '회원가입', leftArrowEvent: historyBack });

    inputList.forEach(input => {
      const $input = document.createElement('div');
      $registerInput?.appendChild($input);
      new UserInput($input, input);
    });

    new (Button as any)($registerButton, { text: '회원가입' });
  }

  setEvent() {
    this.addEvent('click', '.btn', (e: any) => {
      e.preventDefault();
      const user_id: string = (this.$target.querySelector('input[name="id"]') as HTMLInputElement).value;
      const pw: string = (this.$target.querySelector('input[name="password"]') as HTMLInputElement).value;
      const nickname: string = (this.$target.querySelector('input[name="nickname"]') as HTMLInputElement).value;
      const location: string = (this.$target.querySelector('input[name="location"]') as HTMLInputElement).value;
      api_register({ user_id, pw, nickname, location })
        .then((res: any) => {
          console.log('register');
          if (res.ok) $router.push('/login');
          else console.log('회원가입에 실패했습니다.');
        })
        .catch(err => console.log('error: ', err));
    });
  }
}

export default Register;
