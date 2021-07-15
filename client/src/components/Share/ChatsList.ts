import Component from '@/src/interfaces/Component';
import ChatsListItem from './ChatsListItem';

export default class ChatsList extends Component {
  setup() {
    this.$state = {
      list: [],
      list2: [
        {
          user: 'userA',
          item: {
            img: '',
          },
          lastTextTime: '1년전',
          lastText: '팔고싶은데 사셨나요??',
          lastCheckout: true,
          textCnt: 4,
        },
        {
          user: 'userB',
          item: {
            img: '',
          },
          lastTextTime: '1년전',
          lastText: '사고싶은데 팔렸나요?',
          lastCheckout: false,
        },
        {
          user: 'userC',
          item: {
            img: '',
          },
          lastTextTime: '1년전',
          lastText: '알고보니 중개매매 플랫폼',
          lastCheckout: false,
        },
      ],
    };
  }

  template() {
    return `<ul class="chats-list items-wrap" data-component="chats-list"></ul>`;
  }

  mounted() {
    const $chatList = this.$target.querySelector('[data-component="chats-list"]') as HTMLElement;

    //버튼 추가와 동일한 구조
    if (this.$state.list2.length) {
      this.$state.list2.forEach((chatState: HTMLElement) => {
        const li = document.createElement('li');
        li.classList.add('chat-item');
        new ChatsListItem(li, { state: { ...chatState } });
        $chatList.appendChild(li);
      });
    } else {
      $chatList.innerHTML = `<div class='empty-content'>채팅 기록이 없습니다.</div>`;
    }
  }
}
