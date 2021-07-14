export default interface Component {
  $target: HTMLElement;
  $props: any;
  $state: any;

  template: { (): string }; // html 템플릿
  setup: { (): void }; // new 생성시 초기화 Class의 constructor
  mounted: { (): void }; // 기본 render가 완료되고 실행될 함수 ed) 자식 node 추가 등.
  render: { (): void }; // html을 화면에 출력해줌
  setState: { (nextState: Object): void }; //현재 함수의 상태값
  setEvent: { (): void }; // 각 element에 필요한 EventListener 추가
  addEvent: { (eventType: string, selector: string, callback: Function): void };
  //상속받은 함수를 element에 쉽게 추가해주는 함수
}

// addEvent 함수
export function addEvent(this: any, eventType: string, selector: string, callback: Function) {
  const children = [...this.$target.querySelectorAll(selector)];
  const isTarget = (target: any) => children.includes(target) || target.closest(selector);
  this.$target.addEventListener(eventType, (event: Event) => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
}
