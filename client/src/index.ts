import './scss/index.scss';
import MainHeader from './pages/main/MainHeader';

function app() {
  fetch('/', { method: 'get' }).then(res => console.log(res));
  const a = new (MainHeader as any)();
  a.render();
}

const $root = document.querySelector('#root');
console.log($root);

app();
