$(document).ready(init);

const HOST = '0.0.0.0';

function init () {
  const amenityObj = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).attr('data-name')];
    }
    const names = Object.keys(amenityObj);
    $('.amenities h4').text(names.sort().join(', '));
  });

  apiStatus();
  fetchPlaces();
}

function apiStatus () {
  const API_URL = `http://${HOST}:5001/api/v1/status/`;
  $.get(API_URL, (data, textStatus) => {
	  if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function fetchPlaces () {
  const PLACES_URL = `http://${HOST}:5001/api/v1/places_search/`;
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
	'</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
	      $('SECTION.places').append(article.join(''));
      }
    },
	  $('button').click(function () {
    // Retrieve the list of checked amenities
    var checkedAmenities = $('input[type=checkbox]:checked').map(function () {
        return $(this).val();
    }).get();

    // Create the data object to be sent in the POST request
    var requestData = {
        amenities: checkedAmenities
    };

    // Update the URL for the POST request to the correct endpoint
    var url = '/places_search';  // Replace with the appropriate route for places_search in your application

    // Send the POST request
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(requestData),
        contentType: 'application/json',
        success: function (response) {
            // Handle the response from the server
            console.log(response);
        },
        error: function (error) {
            // Handle any errors that occur during the request
            console.error(error);
        }
    });
});
    error: function (error) {
      console.log(error);
    }
  });
}
