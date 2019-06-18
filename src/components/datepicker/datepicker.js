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

  // у данного компонента есть ограничение на использование - его нельзя использовать 
  // на одной странице одновременно и в booking-form, и в не его. Это связано с реализацией
  // посчёта стоимости номера автоматически при выборе дат. При необходимости можно создать 
  // два варианта datepicker с разным поведением.


  function daysBetween(dateOne, dateTwo) {
    var diff = dateTwo.getTime() - dateOne.getTime();
    var day = 1000*60*60*24;
    var days = Math.floor(diff/day);
    if(days == 0) {
      // в случае выезда в день заезда гость платит за 1 сутки полностью
      setDaysPeriod(1);
      setDaysCost(1);
      setTotalCost(1);
    } else {
      setDaysPeriod(days);
      setDaysCost(days);
      setTotalCost(days);
    }
  }

  function setDaysPeriod(days) {
    var bookingForm = $('#booking-form');
    if(bookingForm) {
      var daysText;
      var lastDigit = days % 10;
      if(days === 1) {
        daysText = 'сутки';
      } else if (lastDigit === 1 && days !== 11) {
        daysText = 'сутки';
      } else {
        daysText = 'суток';
      }
      $('#booking-form #booking-form-days').text(`${days} ${daysText}`);
    }
  }

  function setTotalCost(days) {
    var bookingForm = $('#booking-form');
    if(bookingForm) {
      var total = 9990 * days + 300;
      var totalString = total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '); 
      $('#booking-form #booking-form-total-cost').text(`${totalString}₽`);
    }
  }

  function setDaysCost(days) {
    var bookingForm = $('#booking-form');
    if(bookingForm) {
      // здесь захардкодена цена
      var cost = 9990 * days;
      $('#booking-form #booking-form-days-cost').text(`${cost}₽`);
    }
  }

  var eventObject = {
    focus: function () {
      $('#datepicker-calendar').addClass('datepicker__calendar--visible');
      $('#datepicker .input-dropdown').addClass('input-dropdown--open');
    }
  };

  $('#start-date-input').bind(eventObject);
  $('#end-date-input').bind(eventObject);

  $('#datepicker .input-dropdown__toggle').click(() => {
    $('#datepicker-calendar').toggleClass('datepicker__calendar--visible');
    $('#datepicker .input-dropdown').toggleClass('input-dropdown--open');
  });


  $("#datepicker-calendar").datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    showButtonPanel: true,
    minDate: 0,
    beforeShow: function(calendar, inst) {
      addButtons(calendar);
    },
    onChangeMonthYear: function (yy, mm, inst) { 
      addButtons(inst.input); 
    },
    beforeShowDay: function(date) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#start-date-input").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#end-date-input").val());
      if(date1 && !date2 && date.getTime() == date1.getTime()) {
        return [true, 'dp-startdate-alone'];
      } else if(date1 && date2 && date1.getTime() == date.getTime() && date2.getTime() == date.getTime()) {
        return [true, 'dp-startdate-alone'];
      } else if(date1 && date2 && date.getTime() == date1.getTime()) {
        return [true, 'dp-startdate'];
      } else if(date2 && date.getTime() == date2.getTime()){
        return [true, 'dp-enddate'];
      }
      return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date > date1 && date < date2)) ? "dp-highlight" : ""];
    },
    onSelect: function(dateText, inst) {
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#start-date-input").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#end-date-input").val());
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);
      
      addButtons(inst.input);

      if (!date1 || date2) {
          $("#start-date-input").val(dateText);
          $("#end-date-input").val("");
          $(this).datepicker();
      } else if( selectedDate < date1 ) {
          $("#end-date-input").val( $("#start-date-input").val() );
          $("#start-date-input").val( dateText );
          daysBetween(selectedDate, date1);
          $(this).datepicker();
      } else {
          $("#end-date-input").val(dateText);
          daysBetween(date1, selectedDate);         
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

  function removeCalendar(event) {
    event.preventDefault();
    $('#datepicker-calendar').removeClass('datepicker__calendar--visible');
    $('#datepicker .input-dropdown').removeClass('input-dropdown--open');
    document.getElementById("start-date-input").blur();
    document.getElementById("end-date-input").blur();
  }

  function removeDates(event, calendar) {
    event.preventDefault();
    $('#start-date-input').add('#end-date-input').val('');
    $(calendar).find('.dp-highlight').removeClass('dp-highlight');
    $(calendar).find('.dp-startdate').removeClass('dp-startdate');
    $(calendar).find('.dp-enddate').removeClass('dp-enddate');
  }
});