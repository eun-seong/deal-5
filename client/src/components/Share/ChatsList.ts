import { GetChatList } from '@/src/apis/chat';
import Component from '@/src/interfaces/Component';
import ChatsListItem from './ChatsListItem';

export default class ChatsList extends Component {
  template() {
    return `<ul class="chats-list items-wrap" data-component="chats-list"></ul>`;
  }

  mounted() {
    const $chatList = this.$target.querySelector('[data-component="chats-list"]') as HTMLElement;

    GetChatList().then((res: any) => {
      if (!!!res.data.length) {
        return ($chatList.innerHTML = `<div class='empty-content'>${res.message}</div>`);
      }
      res.data.forEach((chatState: HTMLElement) => {
        const li = document.createElement('li');
        li.classList.add('chat-item');
        new ChatsListItem(li, { state: { ...chatState } });
        $chatList.appendChild(li);
      });
    });
  }
}
