$(function() {
  // $('#new-user-birthday').mask('99.99.9999', { placeholder: 'ДД.ММ.ГГГГ' });
  $('#new-user-birthday').inputmask({
    'mask': '99.99.9999', 
    'placeholder': 'ДД.ММ.ГГГГ'
  });
});