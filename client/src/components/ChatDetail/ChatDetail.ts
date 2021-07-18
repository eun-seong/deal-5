import Component from '@/src/interfaces/Component';
import InfoProduct from './InfoProduct';
import CommonHeader from '../Share/CommonHeader';
import ChatBar from './ChatBar';
import Chatting from './Chatting';
import historyBack from '@/src/assets/utils/historyBack';
import { svgIcons } from '@/src/assets/svgIcons';
import Alert from '../Share/Alert';

export default class ChatDetail extends Component {
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

    new CommonHeader($header as HTMLElement, {
      title: 'UserID',
      leftArrowEvent: historyBack,
      rightButton: {
        svg: svgIcons.logOut,
        colorType: 'error',
        handleClick: this.handleLeaveRoomButton.bind(this),
      },
    });
    new InfoProduct($infoProduct as HTMLElement, {
      title: '타이틀',
      price: 16000,
      status: 0,
      productId: 23,
    });
    new Chatting($chatting as HTMLElement);
    new ChatBar($chatbar as HTMLElement);

    window.scrollTo(0, document.body.scrollHeight);
  }

  handleLeaveRoomButton(e: any) {
    const $content = this.$target.querySelector('.chat');
    const $div = document.createElement('div');
    $content?.appendChild($div);
    new Alert($div as HTMLElement, {
      text: '정말로 이 채팅방을 나가시겠습니까?',
      handleOkay: this.leaveRoom.bind(this),
    });
  }

  leaveRoom() {}
}
