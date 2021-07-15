import Component from '@/src/interfaces/Component';
import ChatBubble, { ChatBubbleProps } from './ChatBubble';

export default class Chatting extends Component {
  template() {
    return ``;
  }

  mounted() {
    tmpChatting.forEach((chat: ChatBubbleProps) => {
      const $div = document.createElement('div');
      this.$target.appendChild($div);
      new ChatBubble($div, chat);
    });
  }
}

const tmpChatting: ChatBubbleProps[] = [
  {
    type: 'A',
    message: '안녕하세요! 궁금한게 있는데요',
  },
  {
    type: 'B',
    message: '네 안녕하세요!',
  },
  {
    type: 'A',
    message: '혹시',
  },
  {
    type: 'A',
    message: '실제 착용 기간이 어떻게 되세요?',
  },
  {
    type: 'B',
    message: '거의 안탔습니다..!',
  },
  {
    type: 'B',
    message: '산 지는 2개월 정도 됐어요.',
  },
  {
    type: 'A',
    message:
      '그렇군요. 근데 제가 정말 스케이트를 너무 배워보곳 싶어서요. 혹시 괜찮으시다면 알려주실 수 있으신가요? 강의비는 어느정도 드리겠습니다. 부탁드려요. 너무 배우고 싶어요. 배 우 고 싶 어 요. 하하하하하하하하하하',
  },
  {
    type: 'B',
    message: '아니 거의 안탔다니까요;;;',
  },
  {
    type: 'B',
    message: '근데 하게 되면 얼마 주실건데요?',
  },
  {
    type: 'A',
    message: '시간 당 만원 어떠세요?',
  },
  {
    type: 'B',
    message: '어디 사세요?',
  },
  {
    type: 'A',
    message: '독도 살고 있습니다.',
  },
  {
    type: 'B',
    message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '독도요??ㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '장난치지 마세요ㅋㅋ',
  },
  {
    type: 'A',
    message: '독도 살고 있습니다.',
  },
  {
    type: 'B',
    message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '독도요??ㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '장난치지 마세요ㅋㅋ',
  },
  {
    type: 'A',
    message: '독도 살고 있습니다.',
  },
  {
    type: 'B',
    message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '독도요??ㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '장난치지 마세요ㅋㅋ',
  },
  {
    type: 'A',
    message: '독도 살고 있습니다.',
  },
  {
    type: 'B',
    message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '독도요??ㅋㅋㅋㅋ',
  },
  {
    type: 'B',
    message: '장난치지 마세요ㅋㅋ',
  },
];
