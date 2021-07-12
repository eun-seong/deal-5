function app() {
    const element = document.createElement('div');
    element.innerText = 'Hello world!';

    fetch('/', {method: 'get'})
        .then(res => console.log(res));
    
    return element;
}

console.log(app());

const $root = document.querySelector('#root');
console.log($root);
$root?.appendChild(app());
