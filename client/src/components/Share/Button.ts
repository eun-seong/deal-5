import Component from '@/src/interfaces/Component';

interface ButtonProps {
  text: string;
}

export default class Button extends Component {
  template() {
    const { text }: ButtonProps = this.$props;

    return `
    <button class="btn">${text}</button>
    `;
  }
}
