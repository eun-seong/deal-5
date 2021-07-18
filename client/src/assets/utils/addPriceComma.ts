export default (str: string) => str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
