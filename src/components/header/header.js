$(() => {
  const items = document.querySelectorAll('.header__nav-toggle');
  items.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      event.target.closest('.header__nav-item').classList.toggle('header__nav-item--open');
    });
  })
});