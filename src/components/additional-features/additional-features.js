$(function() {
  const features = $('.additional-features');
  const featuresToggle = $('#features-toggle');
  const featuresTitle = $('.additional-features__title');

  featuresToggle.click(e => {
    e.preventDefault();
    features.toggleClass('additional-features--open');
  });

  featuresTitle.click(e => {
    e.preventDefault();
    features.toggleClass('additional-features--open');
  })
});