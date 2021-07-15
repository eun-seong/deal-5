export default (e: Element) => [...e.parentNode!.children].filter((child: Element) => child != e);
