 $.extend($.datepicker, {

    // Reference the orignal function so we can override it and call it later
    _inlineDatepicker2: $.datepicker._inlineDatepicker,

    // Override the _inlineDatepicker method
    _inlineDatepicker: function (target, inst) {

        // Call the original
        this._inlineDatepicker2(target, inst);

        var beforeShow = $.datepicker._get(inst, 'beforeShow');

        if (beforeShow) {
            beforeShow.apply(target, [target, inst]);
        }
    }
});

( function( factory ) {
  if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( [ "../widgets/datepicker" ], factory );
  } else {

    // Browser globals
    factory( jQuery.datepicker );
  }
}( function( datepicker ) {

datepicker.regional.ru = {
  closeText: "Закрыть",
  prevText: "&#x3C;Пред",
  nextText: "След&#x3E;",
  currentText: "Сегодня",
  monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
  monthNamesShort: [ "янв","фев","мар","апр","май","июн",
  "июл","авг","сен","окт","ноя","дек" ],
  dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
  dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
  dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
  weekHeader: "Нед",
  dateFormat: "d M",
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: "" };
datepicker.setDefaults( datepicker.regional.ru );

return datepicker.regional.ru;

} ) );

$.datepicker.setDefaults($.datepicker.regional["ru"]);

$(function() {
  var eventObject = {
    focus: function () {
      $('#datepicker-single-calendar').addClass('datepicker-single__calendar--visible');
    }
  };

  $('#dates-input').bind(eventObject);

  const datepickerCalendar = $('#datepicker-single-calendar');

  const dateObject = {
    startDate: null,
    endDate: null,
    startDateString: '',
    endDateString: ''
  };
  
  datepickerCalendar.datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    showButtonPanel: true,
    beforeShow: function(calendar, inst) {
      addButtons(calendar);
    },
    onChangeMonthYear: function (yy, mm, inst) { 
      addButtons(inst.input); 
    },
    beforeShowDay: function(date) {
      var { startDate, endDate } = dateObject;
      if(startDate && !endDate && date.getTime() == startDate.getTime()) {
        return [true, 'dp-startdate-alone'];
      } else if(startDate && endDate && date.getTime() == startDate.getTime()) {
        return [true, 'dp-startdate'];
      } else if(endDate && date.getTime() == endDate.getTime()) {
        return [true, 'dp-enddate'];
      } else {
        return [true, startDate && ((date.getTime() == startDate.getTime()) || (endDate && date > startDate && date < endDate)) ? "dp-highlight" : ""];
      }
    },
    onSelect: function(dateText, inst) {
      var newDatesString;
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);
  
      addButtons(inst.input);

      if(!dateObject.startDate || dateObject.endDate) {

        dateObject.startDate = selectedDate;
        dateObject.startDateString = dateText;
        dateObject.endDate = null;
        dateObject.endDateString = '';
        newDatesString = dateText;
      
      } else if (selectedDate < dateObject.startDate) {

        dateObject.endDate = dateObject.startDate;
        dateObject.startDate = selectedDate;
        dateObject.endDateString = dateObject.startDateString;
        dateObject.startDateString = dateText;
        newDatesString = dateObject.startDateString + ' - ' + dateObject.endDateString;

      } else {

        dateObject.endDate = selectedDate;
        dateObject.endDateString = dateText;
        newDatesString = dateObject.startDateString + ' - ' + dateObject.endDateString;

      }
        
      $('#dates-input').val(newDatesString);
      $(this).datepicker();
    }
  });

  function addButtons( calendar ) {
    setTimeout(function() {
      var buttonPane = $(calendar).find( ".ui-datepicker-buttonpane" );

      $("<button>", {
          text: "Очистить",
          click: function(event) {
            removeDates(event, calendar);
          }
      }).appendTo(buttonPane).addClass("ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all");

      $("<button>", {
          text: "Применить",
          click: function(event) { removeCalendar(event) }
      }).appendTo(buttonPane).addClass("ui-datepicker-done ui-state-default ui-priority-primary ui-corner-all");
    }, 1);
  };

  function removeDates(event, calendar) {
    event.preventDefault();
    $('#dates-input').val('');
    $(calendar).find('.dp-highlight').removeClass('dp-highlight');
    $(calendar).find('.dp-startdate').removeClass('dp-startdate');
    $(calendar).find('.dp-startdate-alone').removeClass('dp-startdate-alone');
    $(calendar).find('.dp-enddate').removeClass('dp-enddate');
  }

  function removeCalendar(event) {
    event.preventDefault();
    $('#datepicker-single-calendar').removeClass('datepicker-single__calendar--visible');
    document.getElementById('dates-input').blur(); 
  }
});