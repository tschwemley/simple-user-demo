$(document).ready(function(){
  // Override default form submission
  $('form').submit(function(event) {
    // Initialize form data
    var formData = {
      'firstName': $('#inputFirstName').val(),
      'lastName':  $('#inputLastName').val(),
      'address1':  $('#inputAddress1').val(),
      'address2':  $('#inputAddress2').val(),
      'city':      $('#inputCity').val(),
      'state':     $('#inputState').val(),
      'zip':       $('#inputZip').val(),
      'country':   $('#inputCountry').val()
    };

    // Check for valid input.
    if (formValidation(formData)) {
      // process the form
      $.ajax({
        type        : 'POST',
        url         : '/register.php',
        dataType    : 'json',
        data        : formData
      })

      // Handle the returned data
      .done(function(data) {
        confirmUser(data);
      });
    }

    event.preventDefault();
  });
});

/** Validate the user form input **/
function formValidation(formData) {
  var warnings = '';

  // First name cannot be blank or contain non alpha chars
  if (isAlpha(formData.firstName) === false) {
    if (typeof formData.firstName == 'undefined' || formData.firstName == '') {
      warnings = warnings + generateWarning('First Name', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('First Name', 'may only contain alphabetic characters.');
    }
  }

  // Last name cannot be blank or contain non alpha chars
  if (isAlpha(formData.lastName) === false) {
    if (typeof formData.lastName == 'undefined' || formData.lastName == '') {
      warnings = warnings + generateWarning('Last Name', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('Last Name', 'may only contain alphabetic characters.');
    }
  }

  // Address 1 cannot be blank
  if (typeof formData.address1 == 'undefined' || formData.address1 == '') {
    warnings = warnings + generateWarning('Address 1', 'cannot be left blank.');
  }

  // City cannot be blank or contain non alpha chars
  if (isAlpha(formData.city) === false) {
    if (typeof formData.lastName == 'undefined' || formData.lastName == '') {
      warnings = warnings + generateWarning('City', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('City', 'may only contain alphabetic characters.');
    }
  }

  // Zip cannot be blank, may only contain numeric characters, and must be 5 or 9 digits long.
  if (isNumeric(formData.zip) === false) {
    if (typeof formData.lastName == 'undefined' || formData.lastName == '') {
      warnings = warnings + generateWarning('Zip Code', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('City', 'may only contain numeric characters.');
    }
  } else if (formData.zip.length != 5 && formData.zip.length != 9) {
    warnings = warnings + generateWarning('Zip Code', 'must be either 5 or 9 digits long.');
  }

  // Add warnings, if any found.
  if (warnings != '') {
    addWarnings(warnings);
    return false;
  } else {
    return true;
  }
}

/** Checks if string contains only alphabetic characters **/
function isAlpha(str) {
  return /^[a-zA-Z\s()]+$/.test(str);
}

/** Checks if string only contains numeric characters **/
function isNumeric(str) {
  return /^[0-9()]+$/.test(str);
}

/** Generates a warning message **/
function generateWarning(label, warning) {
  return '<li>' + label + ' ' + warning + '</li>';
}

/** Adds warning messages to top of user register page **/
function addWarnings(str) {
  var warningHtml = '<div class="alert alert-dismissible alert-danger">'
    + '<button type="button" class="close" data-dismiss="alert" onclick="closeAlert()">x</button>'
    + 'You must fix the following before continuing registration:<ul>'
    + str
    + '</ul></div>';

  $('#warning-container').html(warningHtml);
}

/** Close alert box **/
function closeAlert() {
  $('#warning-container').html('');
}

/** Ajax callback for confirming user registration **/
function confirmUser(json) {
  var confirmUserHtml = "<legend>Registration Successful</legend>"
    + json.first_name + " " + json.last_name + " was successfully registered!"
    + "<p><a href='/'>Click here</a> to register another user.</p>";

  $('.well').html(confirmUserHtml);
}
