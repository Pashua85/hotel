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
      $('#datepicker-calendar').addClass('datepicker__calendar--visible');
      console.log('focus');
    },
    blur: function() {
      console.log('blur')
    }
  };

  $('#input1').bind(eventObject);
  $('#input2').bind(eventObject);


  $("#datepicker-calendar").datepicker({
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
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
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
      var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
      var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
      var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);
      
      addButtons(inst.input);

      if (!date1 || date2) {
          $("#input1").val(dateText);
          $("#input2").val("");
          $(this).datepicker();
      } else if( selectedDate < date1 ) {
          $("#input2").val( $("#input1").val() );
          $("#input1").val( dateText );
          $(this).datepicker();
      } else {
          $("#input2").val(dateText);
          $(this).datepicker();
      }
    }
  });


  function addButtons( calendar ) {
    setTimeout(function() {
      var buttonPane = $(calendar).find( ".ui-datepicker-buttonpane" );
      // console.log(calendar);

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
    document.getElementById("input1").blur();
    document.getElementById("input2").blur();
  }

  function removeDates(event, calendar) {
    event.preventDefault();
     $('#input1').add('#input2').val('');
     $(calendar).find('.dp-highlight').removeClass('dp-highlight');
     $(calendar).find('.dp-startdate').removeClass('dp-startdate');
     $(calendar).find('.dp-enddate').removeClass('dp-enddate');
  }
});