$(() => {
  console.log('hello!');
  const items = document.querySelectorAll('.header__nav-item--expandable');
  items.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      event.target.closest('.header__nav-item').classList.toggle('header__nav-item--open');
    });
  })
});