import { GetMessage } from '@/src/apis/chat';
import Component from '@/src/interfaces/Component';
import ChatBubble, { ChatBubbleProps } from './ChatBubble';

export default class Chatting extends Component {
  socket: any;
  setup() {
    this.socket = this.$props.socket;
    this.$state = this.$props.roomInfo;
  }

  template() {
    return ``;
  }

  mounted() {
    const socket = this.socket;
    const target = this.$target;
    const roomId = this.$state.roomId;
    let lastId = 1000000;

    GetMessage({ chat_id: roomId, lastId }).then(res => {
      if (res.ok) {
        res.data.forEach((msg: any) => {
          const msgBox = {
            type: msg.type,
            message: msg.message,
          };
          const $div = document.createElement('div');
          target.appendChild($div);
          new ChatBubble($div, msgBox);
        });
        lastId = res.data[0]?.id || lastId;
        window.scroll({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }

      socket.onmessage = function (event: any) {
        const data = {
          type: event.data.slice(0, 2),
          message: event.data.slice(2),
        };
        const $div = document.createElement('div');
        target.appendChild($div);
        new ChatBubble($div, data);

        window.scroll({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      };
    });

    // tmpChatting.forEach((chat: ChatBubbleProps) => {
    //   const $div = document.createElement('div');
    //   this.$target.appendChild($div);
    //   new ChatBubble($div, chat);
    // });
  }
}
