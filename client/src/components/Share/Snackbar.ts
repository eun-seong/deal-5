import Component from '@/src/interfaces/Component';

export default class Snackbar extends Component {
  mounted() {
    const snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    snackbar.innerText = this.$props.text;
    document.body.appendChild(snackbar);
    
    setTimeout(() => {
      snackbar?.classList.add('show');
    }, 10)

    setTimeout(() => {
      snackbar?.classList.remove('show');
      setTimeout(() => {
        snackbar?.remove();
      }, 1000);
    }, 2000);
  }
}
