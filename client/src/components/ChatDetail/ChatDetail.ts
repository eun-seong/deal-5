import Component from '@/src/interfaces/Component';
import InfoProduct from './InfoProduct';
import CommonHeader from '../Share/CommonHeader';
import ChatBar from './ChatBar';
import Chatting from './Chatting';

class SignIn extends Component {
  template() {
    return `
    <div class="chat-top-fixed">
      <header data-component="header"></header>
      <div data-component="infoProduct"></div>
    </div>
    <div class="chat">
      <div data-component="chatting"></div>
      <div data-component="chatbar"></div>
    </div>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('[data-component="header"]');
    const $infoProduct = this.$target.querySelector('[data-component="infoProduct"]');
    const $chatting = this.$target.querySelector('[data-component="chatting"]');
    const $chatbar = this.$target.querySelector('[data-component="chatbar"]');

    new CommonHeader($header as HTMLElement, { title: 'UserID' });
    new InfoProduct($infoProduct as HTMLElement, {
      title: '타이틀',
      price: 16000,
      status: 0,
      productId: 23,
    });

    new Chatting($chatting as HTMLElement);
    new ChatBar($chatbar as HTMLElement);
  }
}

export default SignIn;
