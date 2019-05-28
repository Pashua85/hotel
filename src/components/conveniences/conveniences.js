$(function() {
  const conveniencesInput = $('#conveniences-input');
  const conveniencesBox = $('#conveniences-dropdown-box');
  const inputToggle = $('#conveniences .input-dropdown__toggle');

  const addBedroomsButton = $('#bedrooms-add');
  const bedroomsAmount = $('#bedrooms-amount');
  const discreteBedroomsButton = $('#bedrooms-discrete');

  const addBedsButton = $('#beds-add');
  const bedsAmount = $('#beds-amount');
  const discreteBedsButton = $('#beds-discrete');


  const addBathroomsButton = $('#bathrooms-add');
  const bathroomsAmount = $('#bathrooms-amount');
  const discreteBathroomsButton = $('#bathrooms-discrete');

  const addBedrooms = () => {
    let bedroomsAmountNumber = Number(bedroomsAmount.text());
    bedroomsAmountNumber++;
    bedroomsAmount.text(bedroomsAmountNumber.toString(10));
  };

  const discreteBedrooms = () => {
    let bedroomsAmountNumber = Number(bedroomsAmount.text());
    if(bedroomsAmountNumber === 0) return;
    bedroomsAmountNumber--;
    bedroomsAmount.text(bedroomsAmountNumber.toString(10));
  };

  const addBeds = () => {
    let bedsAmountNumber = Number(bedsAmount.text());
    bedsAmountNumber++;
    bedsAmount.text(bedsAmountNumber.toString(10));
  };

  const discreteBeds = () => {
    let bedsAmountNumber = Number(bedsAmount.text());
    if(bedsAmountNumber === 0) return;
    bedsAmountNumber--;
    bedsAmount.text(bedsAmountNumber.toString(10));
  };

  const addBathrooms = () => {
    let bathroomsAmountNumber = Number(bathroomsAmount.text());
    bathroomsAmountNumber++;
    bathroomsAmount.text(bathroomsAmountNumber.toString(10));
  };

  const discreteBathrooms = () => {
    let bathroomsAmountNumber = Number(bathroomsAmount.text());
    if(bathroomsAmountNumber === 0) return;
    bathroomsAmountNumber--;
    bathroomsAmount.text(bathroomsAmountNumber.toString(10));
  };

  const getBedroomsString = number => {
    const numberSting = number.toString(10);
    const lastDigit = number % 10;
    let bedroomsSting = '';

    if(number >= 11 && number <= 14) {
      bedroomsSting = 'спален';
    } else if (lastDigit === 1) {
      bedroomsSting = 'спальня';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      bedroomsSting = 'спальни';
    } else {
      bedroomsSting = 'спален';
    }

    return `${numberSting} ${bedroomsSting}`;
  };

  const getBedsString = number => {
    const numberSting = number.toString(10);
    const lastDigit = number % 10;
    let bedsSting = '';

    if(number >= 11 && number <= 14) {
      bedsSting = 'кроватей';
    } else if (lastDigit === 1) {
      bedsSting = 'кровать';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      bedsSting = 'кровати';
    } else {
      bedsSting = 'кроватей';
    }

    return `${numberSting} ${bedsSting}`;
  };

  const getBathroomsString = number => {
    const numberSting = number.toString(10);
    const lastDigit = number % 10;
    let bathroomsSting = '';

    if(number >= 11 && number <= 14) {
      bathroomsSting = 'ванных комнат';
    } else if (lastDigit === 1) {
      bathroomsSting = 'ванная комната';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      bathroomsSting = 'ванные комнаты';
    } else {
      bathroomsSting = 'ванных комнат';
    }

    return `${numberSting} ${bathroomsSting}`;
  };

  setConveniencesAmount = () => {
    const bedroomsAmountNumber = Number(bedroomsAmount.text());
    const bedsAmountNumber = Number(bedsAmount.text());
    const bathroomsAmountNumber = Number(bathroomsAmount.text());

    let string = '';
    
    if(bedroomsAmountNumber > 0) {
      string += getBedroomsString(bedroomsAmountNumber);
    };

    if(bedroomsAmountNumber > 0 && bedsAmountNumber > 0) {
      string += ', ' + getBedsString(bedsAmountNumber);
    };

    if(bedroomsAmountNumber == 0 && bedsAmountNumber > 0) {
      string += getBedsString(bedsAmountNumber);
    };

    if(string.length > 0 && bathroomsAmountNumber > 0) {
      string += ', ' + getBathroomsString(bathroomsAmountNumber);
    };

    if(string.length == 0 && bathroomsAmountNumber > 0) {
      string += getBathroomsString(bathroomsAmountNumber);
    }

    conveniencesInput.val(string);
  };

  conveniencesInput.focus(() => {
    conveniencesBox.addClass('dropdown__box--visible');
    $('#conveniences .input-dropdown').addClass('input-dropdown--open');
  });

  inputToggle.click(() => {
    console.log('click');
    if(conveniencesBox.hasClass('dropdown__box--visible')) {
      setConveniencesAmount();
    };
    conveniencesBox.toggleClass('dropdown__box--visible');
    $('#conveniences .input-dropdown').toggleClass('input-dropdown--open');
  });

  addBedroomsButton.click(e => {
    e.preventDefault();
    addBedrooms();
  });

  discreteBedroomsButton.click(e => {
    e.preventDefault();
    discreteBedrooms();
  });

  addBedsButton.click(e => {
    e.preventDefault();
    addBeds();
  });

  discreteBedsButton.click(e => {
    e.preventDefault();
    discreteBeds();
  });

  addBathroomsButton.click(e => {
    e.preventDefault();
    addBathrooms();
  });

  discreteBathroomsButton.click(e => {
    e.preventDefault();
    discreteBathrooms();
  });

  $(document).click(e => {
    if($(event.target).closest('.dropdown__group').length) return;
    setConveniencesAmount();
    conveniencesBox.removeClass('dropdown__box--visible');
    $('#conveniences .input-dropdown').removeClass('input-dropdown--open');
    event.stopPropagation();
  });

  setConveniencesAmount();
});