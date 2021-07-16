import Component from '@/src/interfaces/Component';

export interface UserInputProps {
  type: string;
  placeholder: string;
  name?: string;
  label?: string;
}

export default class UserInput extends Component {
  template() {
    const { type, placeholder, name, label }: UserInputProps = this.$props;

    if (!!label)
      return `
      <label for="${name}">${label}</label>
      <input type="${type}" placeholder="${placeholder}" name="${name}">
    `;
    else
      return `
    <input type="${type}" placeholder="${placeholder}"">
    `;
  }
}
