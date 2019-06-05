$(function() {
  $('.room-card').each(function(i) {
    console.log($(this).data('number'));
    console.log($(this).find('.room-card__image-box'));
  })
});