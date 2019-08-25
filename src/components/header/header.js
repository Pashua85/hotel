$(() => {
  const items = document.querySelectorAll('.header__nav-toggle');
  items.forEach(item => {
    item.addEventListener('click', event => {
      if(!event.target.closest('.header__expand-link')) {
        event.preventDefault();
      }
      event.target.closest('.header__nav-item').classList.toggle('header__nav-item--open');
    });
  })
});