import Component from '@/src/interfaces/Component';
import InfoProduct from './InfoProduct';
import CommonHeader from '../Share/CommonHeader';
import ChatBar from './ChatBar';
import Chatting from './Chatting';
import historyBack from '@/src/assets/utils/historyBack';
import { svgIcons } from '@/src/assets/svgIcons';
import Alert from '../Share/Alert';
import { CheckChatUser, DeleteChat } from '@/src/apis/chat';
import Snackbar from '../Share/Snackbar';

export default class ChatDetail extends Component {
  roomInfo: any;
  setup() {
    let params = new URLSearchParams(document.location.href.split('?')[1]);
    this.roomInfo = {
      roomId: params.get('room'),
    };
  }

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
    const roomInfo = this.roomInfo;
    CheckChatUser({ chat_id: roomInfo.roomId }).then(
      function (this: any, res: any) {
        if (!res.ok) {
          new Snackbar(document.body, { text: res.message });
          historyBack();
        }
        this.roomInfo = {
          ...roomInfo,
          buyer_id: res.data.buyer_id,
          seller_id: res.data.seller_id,
          item_id: res.data.item_id,
          type: res.data.type,
        };
        for (let [key, value] of Object.entries(this.roomInfo)) {
          document.cookie = `${key}=${value};max-age=30`;
        }
        const socket = new WebSocket('ws://localhost:81');
        const $header = this.$target.querySelector('[data-component="header"]');
        const $infoProduct = this.$target.querySelector('[data-component="infoProduct"]');
        const $chatting = this.$target.querySelector('[data-component="chatting"]');
        const $chatbar = this.$target.querySelector('[data-component="chatbar"]');

        new CommonHeader($header as HTMLElement, {
          title: res.data.nic,
          leftArrowEvent: historyBack,
          rightButton: {
            svg: svgIcons.logOut,
            colorType: 'error',
            handleClick: this.handleLeaveRoomButton.bind(this),
          },
        });
        new InfoProduct($infoProduct as HTMLElement, {
          title: res.data.title,
          price: res.data.price,
          status: res.data.salse_states,
          productId: res.data.item_id,
          img: res.data.img_list.length ? res.data.img_list[0] : '',
        });
        new Chatting($chatting as HTMLElement, { socket, roomInfo });
        new ChatBar($chatbar as HTMLElement, { socket, roomInfo });

        window.scrollTo(0, document.body.scrollHeight);
      }.bind(this)
    );
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

  leaveRoom() {
    DeleteChat({ cid: this.roomInfo.roomId }).then(res => {
      new Snackbar(document.body, { text: res.message });
      historyBack();
    });
  }
}
