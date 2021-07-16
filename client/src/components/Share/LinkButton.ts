import Component from '@/src/interfaces/Component';

interface LinkButtonProps {
  text: string;
  href: string;
}

export default class LinkButton extends Component {
  template() {
    const { text, href }: LinkButtonProps = this.$props;

    return `
    <a href="${href}" class="link-btn">${text}</a>
    `;
  }
}
