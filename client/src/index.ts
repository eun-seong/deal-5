import './scss/index.scss';
// import MainContainer from './components/main';

//라우팅 처리
export default function App(this: any, $target: HTMLElement) {
  // new (MainContainer as any)($target);
}

new (App as any)(document.querySelector('#root'));
