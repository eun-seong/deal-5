import Component from '@/src/interfaces/Component';
import e from 'express';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  href: string;
}

export default class Button extends Component {
  template() {
    let { text, disabled, href }: ButtonProps = this.$props;

    return `
    <a class="btn" ${!!disabled ? 'disabled' : ''} href='${href}'>${text}</a>
    `;
  }
}
