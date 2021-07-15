import Component from '@/src/interfaces/Component';

export interface ChatBubbleProps {
  type: string;
  message: string;
}

export default class ChatBubble extends Component {
  template() {
    const { type, message } = this.$props;

    return `
    <div class="chatBubbleBox" data-type="${type}">
      <div class="chatBubble">${message}</div>
    </div>
    `;
  }
}
