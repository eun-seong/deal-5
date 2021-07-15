
window.addEventListener('hashchange', () => {
  window.location.hash.replace('#', '')
  history.pushState({ data: 'pushpush' }, 'title을 pushState로', '/pushpush')
})

const $root = document.querySelector('#root');
console.log($root);
$root?.appendChild(app());

