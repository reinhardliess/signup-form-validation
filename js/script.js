"use strict";

// description of project

const OTHER_TITLE = 2;
const CC_NUM = 3;
const DEFAULT_PRICE = 100;

// Activity checkboxes:
// - Price is set if != DEFAULT_PRICE
// - Potentially conflicting activities have the same timeslot id
const aActivity= [
  { name: 'all', price: 200 },
  { name: 'js-frameworks', timeslot: 1 },
  { name: 'js-libs', timeslot: 2 },
  { name: 'express', timeslot: 1 },
  { name: 'node',    timeslot: 2 }
];

// control data structure for all input edit/email fields
// id: input field id
// validate: array of regular expressions for validation; sorted by less to more specific
// mode: position in the DOM where the validation message
// specialCond: optional pre-condition for validation
const aInput = [
  {
    id: 'name',
    validate: [ 
      {
        regex: /^.{3,}$/,
        msg: 'Please enter your name' 
      },
      {
        regex: /^([^0-9;,"':.!@#$%^&*\/\\()\-+<>{}\[\]]{3,})$/,
        msg: 'Please enter your name. Sorry, no numbers or symbols' 
      }
    ],
    mode: 'label'
  },
  {
    id: 'mail',
    validate: [
      {
        regex: /^.{3,}$/,
        msg: 'Please enter a valid email address: e.g. alexdoe@domain.com'
      },
      {
        regex: /^([^@]+)@([^@]*)$/,
        msg: 'It looks like your email is missing an @ sign'
      },
      {
        regex: /^([^@]+)@([^@]+)\.([a-z\.]{2,})$/,
        msg: 'It looks like your email is missing a domain e.g. .com'
      }
    ],
    mode: 'label'
  },
  {
    id: 'other-title',
    validate: [
      {
        regex: /^[a-zA-Z]{3,}$/,
        msg: `Please enter an 'other' job role` 
      },
    ],
    mode: 'input',
    specialCond: () => $('#title option:selected').val() === 'other'
  },
  {
    id: 'cc-num',
    validate: [
      {
        regex: /^\d{13,16}$/,
        msg: `Please enter a 13-16 digit credit card number` 
      },
    ],
    mode: 'input',
    specialCond: () => isPaymentCreditCard()
  },  
  {
    id: 'zip',
    validate: [
      {
        regex: /^\d{5}$/,
        msg: `Please enter a five-digit zip code` 
      },
    ],
    mode: 'input',
    specialCond: () => isPaymentCreditCard()
  },  
  {
    id: 'cvv',
    validate: [
      {
        regex: /^\d{3}$/,
        msg: `Please enter a three-digit CVV` 
      },
    ],
    mode: 'input',
    specialCond: () => isPaymentCreditCard()
  }
];

const $jobrole   = $(`#${aInput[2].id}`);
const $ccSection = $('#credit-card');
const $paypalSection = $ccSection.next('div');
const $bitcoinSection = $paypalSection.next('div');

// functions
const formatErrorMessage = msg => `&starf; ${msg} &starf;`;

const isPaymentCreditCard = () => $('#payment option:selected').val() === 'credit card';

$('#title').on('change', function() {
  
  // const $jobrole = $(`#${aInput[2].id}`);
  
  if ( $(this).val() === 'other') {
    $jobrole.fadeIn('fast');
    $jobrole.focus();
  } else {
    $jobrole.next().hide();
    $jobrole.fadeOut('fast');
  }
  
});

// shows/hides the relevant payment section(s) depending on user choice
// ccFocus: flag used to only set focus to cc-num field when activated from select
const updatePayment = (ccFocus = '') => {
  
  switch ( $('#payment option:selected').val() ) {
  
    case 'credit card':
      $ccSection.show();
      $paypalSection.hide();
      $bitcoinSection.hide();
      if (ccFocus === 'ccnumFocus') {
        $(`#${aInput[CC_NUM].id}`).focus();
      }
      break;
    case 'paypal':
      $paypalSection.show();
      $ccSection.hide();
      $bitcoinSection.hide();
      break;
    case 'bitcoin':
      $bitcoinSection.show();
      $ccSection.hide();
      $paypalSection.hide();
  }
  
}

$('#payment').on('change', function() {
  
  updatePayment('ccnumFocus');
  
});


// Validates text/email input with inputId
const validateRegex = inputId => {

  const oInput = aInput.find( obj => obj.id === inputId);
  
  // If special condition is set, it must be true for validation to be executed
  if (oInput.specialCond && !oInput.specialCond() ) {
    return true;
  }

  const $elem = $(`#${inputId}`);
  const inputValue = $elem.val();

  let msg = '';

  for (let i = 0; i < oInput.validate.length; i++) {
    let regex = oInput.validate[i].regex;
    if ( !regex.test(inputValue) ) {
      msg = oInput.validate[i].msg;
      break;
    }
  }

  if (msg) {
    msg = formatErrorMessage(msg);
    $elem.removeClass('val-ok val-ok-input');
    if (oInput.mode === 'label') {
      $(`label[for=${inputId}] span`).html(msg).show();
    } else {
      $(`#${inputId}`).next().html(msg).show();
    }

  } else {
    // Hide error message, show ok icon
    $elem.addClass('val-ok val-ok-input');
    if (oInput.mode === 'label') {
      $(`label[for=${inputId}] span`).hide();
    } else {
      $(`#${inputId}`).next().hide();
    }
  }

  return !msg;
}


$('input[type=text], input[type=email]').on("focus input", function() {

  validateRegex( $(this).attr('id') );

});

const validateActivities = () => {
  
  const checked = $('input[type=checkbox]:checked').length > 0;
  const $legend = $('.activities legend');
  
  if (checked) {
    $legend.addClass('val-ok val-ok-legend');
    $legend.children(0).html('');
  } else {
    $legend.removeClass('val-ok val-ok-legend');
    $legend.children(0).html( formatErrorMessage('Please choose at least one activity') );
  }
  return checked;
}


$('input[type=checkbox]').on("change", function() {
  
  const $checkboxes = $('input[type=checkbox]');
  const $self       = $(this);
  let   priceTotal  = 0;
  let   objSelf     = aActivity.find( obj => obj.name === $(this).attr('name') ) || {};

  $checkboxes.each( function() {
    let checkbox = aActivity.find( obj => obj.name === $(this).attr('name') ) || {};
    if( $(this).is(':checked') ) {
      priceTotal += checkbox.price ? checkbox.price : DEFAULT_PRICE;
    }
  
    if ( checkbox.timeslot && objSelf.timeslot &&
         checkbox.name !== $self.attr('name') && 
         checkbox.timeslot === objSelf.timeslot ) {
           if ( $self.is(':checked') ) {
             $(this).attr('disabled', true);
             $(this).parent().addClass('isDisabled');
           } else {
             $(this).attr('disabled', false);
             $(this).parent().removeClass('isDisabled');
           }
    } 
    
    validateActivities();
  
  });
  
  $('.price').text(`Total: $${priceTotal}`);
});


$('form').submit(function(event) {
  
  let valOk = true;
  for(let i = 0; i < aInput.length; i++) {
    valOk = validateRegex( aInput[i].id ) && valOk;
  }
  
  valOk = validateActivities() && valOk;
  
  if (!valOk) {
    event.preventDefault();
  }
});

// creates all necessary validation messages in the DOM
const createMessages = () => {

  for(let i = 0; i < aInput.length; i++) {
    if (aInput[i].mode === 'label') {
      $(`label[for=${aInput[i].id}]`).append('<span class="err-inline err-styles"></span>');
    } else {
      $(`#${aInput[i].id}`).after('<span class="err-newline err-styles"></span>');
    }
  }
  
  $('.activities legend').append('<span class="err-styles err-inline"></span>');

}




// Create all validation messages in the DOM
createMessages();

$jobrole.hide();

// set defaults for the payment section
$('#payment option[value="select_method"]').attr('hidden', true);
$('#payment option[value="credit card"]').attr('selected', true);
updatePayment();

// make sure 'expiration date select' is on its own row if validation messages are displayed 
$('label[for="exp-month"]').prepend('<div class="clearfix"></div>');

$('.activities').after('<div class="price">Total: $0</price></div>');

$('#name').focus();




