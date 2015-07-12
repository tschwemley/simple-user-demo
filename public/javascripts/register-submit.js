$(document).ready(function(){
  $('form').submit(function(event) {
    var formData = {
      'firstName': $('#inputFirstName').val(),
      'lastName':  $('#inputLastName').val(),
      'address1':  $('#inputAddress1').val(),
      'address2':  $('#inputAddress2').val(),
      'city':      $('#inputCity').val(),
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
        console.log(data);
        alert('nyx');
      });
    }

    event.preventDefault();
  });
});

function formValidation(formData) {
  var warnings = '';

  if (isAlpha(formData.firstName) === false) {
    if (typeof formData.firstName == 'undefined' || formData.firstName == '') {
      warnings = warnings + generateWarning('First Name', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('First Name', 'may only contain alphabetic characters.');
    }
  }

  if (isAlpha(formData.lastName) === false) {
    if (typeof formData.lastName == 'undefined' || formData.lastName == '') {
      warnings = warnings + generateWarning('Last Name', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('Last Name', 'may only contain alphabetic characters.');
    }
  }

  if (typeof formData.address1 == 'undefined' || formData.address1 == '') {
    warnings = warnings + generateWarning('Address 1', 'cannot be left blank.');
  }

  if (isAlpha(formData.city) === false) {
    if (typeof formData.lastName == 'undefined' || formData.lastName == '') {
      warnings = warnings + generateWarning('City', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('City', 'may only contain alphabetic characters.');
    }
  }

  if (isNumeric(formData.zip) === false) {
    if (typeof formData.lastName == 'undefined' || formData.lastName == '') {
      warnings = warnings + generateWarning('Zip Code', 'cannot be left blank.');
    } else {
      warnings = warnings + generateWarning('City', 'may only contain numeric characters.');
    }
  } else if (formData.zip.length != 5 && formData.zip.length != 9) {
    warnings = warnings + generateWarning('Zip Code', 'must be either 5 or 9 digits long.');
  }

  if (warnings != '') {
    addWarnings(warnings);
    return false;
  } else {
    return true;
  }
}

function isAlpha(str) {
  return /^[a-zA-Z\s()]+$/.test(str);
}

function isNumeric(str) {
  return /^[0-9()]+$/.test(str);
}

function generateWarning(label, warning) {
  return '<li>' + label + ' ' + warning + '</li>';
}

function addWarnings(str) {
  var warningHtml = '<div class="alert alert-dismissible alert-danger">'
    + '<button type="button" class="close" data-dismiss="alert" onclick="closeAlert()">x</button>'
    + 'You must fix the following before continuing registration:<ul>'
    + str
    + '</ul></div>';

  $('#warning-container').html(warningHtml);
}

function closeAlert() {
  $('#warning-container').html('');
}
