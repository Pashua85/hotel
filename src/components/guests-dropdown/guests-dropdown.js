$(function () {
  const guestsInput = $('#guests-input');
  const guestsClear = $('#guests-clear');
  const guestsDone = $('#guests-done');
  const guestsBox = $('#guests-dropdown-box');
  const dropdownGroup = $('#dropdown-group');
  const inputToggle = $('#guests-dropdown .input-dropdown__toggle');

  const addAdultsButton = $('#adults-add');
  const adultsAmount = $('#adults-amount');
  const discreteAdultsButton = $('#adults-discrete');

  const addChildrenButton = $('#children-add');
  const childrenAmount = $('#children-amount');
  const discreteChildrenButton = $('#children-discrete');

  const addBabiesButton = $('#babies-add');
  const babiesAmount = $('#babies-amount');
  const discreteBabiesButton = $('#babies-discrete');
  
  const addAdults = () => {
    let adultsAmountNumber = Number(adultsAmount.text());
    adultsAmountNumber++;
    adultsAmount.text(adultsAmountNumber.toString(10));
  };

  const discreteAdults = () => {
    let adultsAmountNumber = Number(adultsAmount.text());
    if(adultsAmountNumber === 0) return;
    adultsAmountNumber--;
    adultsAmount.text(adultsAmountNumber.toString(10));
  };

  const addChildren = () => {
    let childrenAmountNumber = Number(childrenAmount.text());
    let adultsAmountNumber = Number(adultsAmount.text());
    if(adultsAmountNumber === 0) return;
    childrenAmountNumber++;
    childrenAmount.text(childrenAmountNumber.toString(10));
  };

  const discreteChildren = () => {
    let childrenAmountNumber = Number(childrenAmount.text());
    if(childrenAmountNumber === 0) return;
    childrenAmountNumber--;
    childrenAmount.text(childrenAmountNumber.toString(10));
  };

  const addBabies = () => {
    let babiesAmountNumber = Number(babiesAmount.text());
    let adultsAmountNumber = Number(adultsAmount.text());
    if(adultsAmountNumber === 0) return;
    babiesAmountNumber++;
    babiesAmount.text(babiesAmountNumber.toString(10));
  };

  const discreteBabies = () => {
    let babiesAmountNumber = Number(babiesAmount.text());
    if(babiesAmountNumber === 0) return;
    babiesAmountNumber--;
    babiesAmount.text(babiesAmountNumber.toString(10));
  };

  const checkAdultsAmount = () => {
    const adultsAmountNumber = Number(adultsAmount.text());
    if(adultsAmountNumber === 0) {
      childrenAmount.text('0');
      babiesAmount.text('0');
      guestsClear.addClass('dropdown-btn__btn--hidden');
      addChildrenButton.addClass('dropdown-btn__amount-btn--disabled');
      discreteChildrenButton.addClass('dropdown-btn__amount-btn--disabled');
      addBabiesButton.addClass('dropdown-btn__amount-btn--disabled');
      discreteBabiesButton.addClass('dropdown-btn__amount-btn--disabled');
      childrenAmount.addClass('dropdown-btn__amount--disabled');
      babiesAmount.addClass('dropdown-btn__amount--disabled');
    } else {
      guestsClear.removeClass('dropdown-btn__btn--hidden');
      addChildrenButton.removeClass('dropdown-btn__amount-btn--disabled');
      discreteChildrenButton.removeClass('dropdown-btn__amount-btn--disabled');
      addBabiesButton.removeClass('dropdown-btn__amount-btn--disabled');
      discreteBabiesButton.removeClass('dropdown-btn__amount-btn--disabled');
      childrenAmount.removeClass('dropdown-btn__amount--disabled');
      babiesAmount.removeClass('dropdown-btn__amount--disabled');
    }
  };

  const clearGuestsAmount = () => {
    adultsAmount.text('0');
    childrenAmount.text('0');
    babiesAmount.text('0');
    guestsInput.val('');
  };

  const setGuestsAmount = () => {
    const adultsAmountNumber = Number(adultsAmount.text());
    const childrenAmountNumber = Number(childrenAmount.text());
    const babiesAmountNumber = Number(babiesAmount.text());
    const guestsAmountNumber = adultsAmountNumber + childrenAmountNumber;
    let string;

    if(guestsAmountNumber === 0) return;
    
    if(guestsAmountNumber > 0 && babiesAmountNumber === 0) {
      string = getGuestsString(guestsAmountNumber);
    } else {
      string = getGuestsString(guestsAmountNumber) + ', ' + getBabiesString(babiesAmountNumber);
    };

    guestsInput.val(string);
  };

  const getGuestsString = number => {
    const numberSting = number.toString(10);
    const lastDigit = number % 10;
    let guestsSting = '';

    if(number >= 11 && number <= 14) {
      guestsSting = 'гостей';
    } else if (lastDigit === 1) {
      guestsSting = 'гость';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      guestsSting = 'гостя';
    } else {
      guestsSting = 'гостей';
    }

    return `${numberSting} ${guestsSting}`;
  }

  const getBabiesString = number => {
    const numberSting = number.toString(10);
    const lastDigit = number % 10;
    let babiesSting = '';

    if(number >= 11 && number <= 14) {
      babiesSting = 'младенцев';
    } else if (lastDigit === 1) {
      babiesSting = 'младенец';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      babiesSting = 'младенца';
    } else {
      babiesSting = 'младенцев';
    }

    return `${numberSting} ${babiesSting}`;
  }

  guestsInput.focus(() => {
    guestsBox.addClass('dropdown-btn__box--visible');
    $('#guests-dropdown .input-dropdown').addClass('input-dropdown--open');
  });

  inputToggle.click(() => {
    guestsBox.toggleClass('dropdown-btn__box--visible');
    $('#guests-dropdown .input-dropdown').toggleClass('input-dropdown--open');
  });

  addAdultsButton.click(e => {
    e.preventDefault();
    addAdults();
    checkAdultsAmount();
  });

  discreteAdultsButton.click(e => {
    e.preventDefault();
    discreteAdults();
    checkAdultsAmount();
  });

  addChildrenButton.click(e => {
    e.preventDefault();
    addChildren();
  });

  discreteChildrenButton.click(e => {
    e.preventDefault();
    discreteChildren();
  });

  addBabiesButton.click(e => {
    e.preventDefault();
    addBabies();
  });

  discreteBabiesButton.click(e => {
    e.preventDefault();
    discreteBabies();
  });

  guestsDone.click(e => {
    e.preventDefault();
    setGuestsAmount();
    guestsBox.removeClass('dropdown-btn__box--visible');
    $('#guests-dropdown .input-dropdown').removeClass('input-dropdown--open');
  });

  guestsClear.click(e => {
    e.preventDefault();
    clearGuestsAmount();
  });

  $(document).click(event => {
    if($(event.target).closest('.dropdown-btn__group').length) return;
    guestsBox.removeClass('dropdown-btn__box--visible');
    $('#guests-dropdown .input-dropdown').removeClass('input-dropdown--open');
    event.stopPropagation();
  });

  checkAdultsAmount();
  setGuestsAmount();
});