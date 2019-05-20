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
  monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
  "Июл","Авг","Сен","Окт","Ноя","Дек" ],
  dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
  dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
  dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
  weekHeader: "Нед",
  dateFormat: "dd.mm.yy",
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
      var datesString = $('#dates-input').val();
      var date1, date2, date1String, date2String;
      if(datesString.length === 0) {
        date1 = null;
        date2 = null;
      } else if (datesString.length === 10) {
        date1String = datesString;
        date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, datesString);
        date2 = null;
      } else {
        date1String = datesString.substring(0,datesString.indexOf(' - '));
        date2String = datesString.substring(datesString.indexOf(' - ') + 3);
        date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, date1String);
        date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, date2String);
      }

      if(date1 && !date2 && date.getTime() == date1.getTime()) {
        return [true, 'dp-startdate-alone'];
      } else if(date1 && date2 && date.getTime() == date1.getTime()) {
        return [true, 'dp-startdate'];
      } else if(date2 && date.getTime() == date2.getTime()){
        return [true, 'dp-enddate'];
      }
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date > date1 && date < date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(dateText, inst) {
      var datesString = $('#dates-input').val();
      var date1, date2, date1String, date2String, newDatesString;
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);
      
      addButtons(inst.input);

      if(datesString.length === 0) {
        date1 = null;
        date2 = null;
      } else if (datesString.length === 10) {
        date1String = datesString;
        date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, datesString);
        date2 = null;
      } else {
        date1String = datesString.substring(0,datesString.indexOf(' - '));
        date2String = datesString.substring(datesString.indexOf(' - ') + 3);
        date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, date1String);
        date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, date2String);
      }

      if(!date1 || date2) {
        $('#dates-input').val(dateText);
        $(this).datepicker();
      } else if (selectedDate < date1) {
        newDatesString = dateText + ' - ' + date1String;
        $('#dates-input').val(newDatesString);
        $(this).datepicker();
      } else {
        newDatesString = date1String + ' - ' + dateText;
        $('#dates-input').val(newDatesString);
        $(this).datepicker();
      }
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
    $(calendar).find('.dp-enddate').removeClass('dp-enddate');
  }

  function removeCalendar(event) {
    event.preventDefault();
    $('#datepicker-single-calendar').removeClass('datepicker-single__calendar--visible');
    document.getElementById('dates-input').blur(); 
  }
});