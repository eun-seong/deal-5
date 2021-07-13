import './scss/index.scss';
import MainHeader from './pages/main/MainHeader';

function app() {
  const element = document.createElement('div');
  element.innerText = 'Hello world!';

  fetch('/', { method: 'get' }).then(res => console.log(res));
  const a = new (MainHeader as any)();
  a.render();
  return element;
}

const $root = document.querySelector('#root');
console.log($root);
$root?.appendChild(app());