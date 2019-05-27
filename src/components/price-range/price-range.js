$(function () {
  $('#price-range-slider').slider({
    range: true,
    min: 1000,
    max: 15400,
    values: [5000, 10000],
    slide: function(event, ui) {
      new Intl.NumberFormat('ru-RU').format($('#price-range-slider').slider('values', 0))
      $('#price-range-input').val(
        new Intl.NumberFormat('ru-RU').format(ui.values[0]) + 
          '₽ - ' + new Intl.NumberFormat('ru-RU').format(ui.values[1]) + '₽'
      );
    }
  });
  $('#price-range-input').val(
    new Intl.NumberFormat('ru-RU').format($('#price-range-slider').slider('values', 0)) + '₽ - ' + 
    new Intl.NumberFormat('ru-RU').format($('#price-range-slider').slider('values', 1)) + '₽'
  );
});