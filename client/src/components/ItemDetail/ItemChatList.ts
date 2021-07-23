import { GetItemChatList } from '@/src/apis/chat';
import Component from '@/src/interfaces/Component';
import ChatsListItem from '../Share/ChatsListItem';
import CommonHeader from '../Share/CommonHeader';

export default class extends Component {
  setup() {
    this.$state = this.$props.state;
  }
  template() {
    return `
    <div class="item-chat-list"> 
      <header data-component="header"></header>
      <ul class="chats-list items-wrap"></ul>
    </div>
    `;
  }

  mounted() {
    const { item_id } = this.$state;
    const wrapper = this.$target.querySelector('.item-detail-chats') as HTMLElement;
    const $header = this.$target.querySelector('[data-component="header"]') as HTMLElement;
    const $chatList = this.$target.querySelector('.chats-list.items-wrap') as HTMLElement;

    const toggleSideBar = () => {
      document.querySelector('.item-detail-chats')?.classList.toggle('show');
    };
    new CommonHeader($header as HTMLElement, { title: '채팅목록', leftArrowEvent: toggleSideBar });

    GetItemChatList({ itemId: item_id }).then((res: any) => {
      if (!!!res.data?.length) {
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
