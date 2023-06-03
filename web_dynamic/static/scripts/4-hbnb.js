/* global $ */
'use strict';

$(document).ready(function () {
  apiStatus();
  getPlacesList();
  getPlacesByAmenity();
  const selectedAmenities = [];
  $('ul li input[type=checkbox]').change(function () {
    const chkdAm = $(this).attr('data-id');
    const amName = $(this).attr('data-name');
    if (this.checked && $.inArray(chkdAm, selectedAmenities) === -1) {
      selectedAmenities.push(amName);
    } else {
      selectedAmenities.splice(selectedAmenities.indexOf(amName), 1);
    }
    updateSelectedAmenities();
  });
  function updateSelectedAmenities () {
    const selectedAmenitiesElement = document.getElementById('am_h4');
    if (selectedAmenities.join(', ').length > 37) {
      const displayedAmenities = selectedAmenities.join(', ').substring(0, 37);
      selectedAmenitiesElement.textContent = displayedAmenities + '...';
    } else {
      selectedAmenitiesElement.textContent = selectedAmenities.join(', ');
    }
  }
});

function apiStatus () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

const settings = {
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  data: JSON.stringify({}),
  headers: { 'Content-Type': 'application/json' },
  type: 'POST'
};

function getPlacesList () {
  let place;
  $.ajax(settings).done(function (data) {
    for (place of data) {
      $('.places').append(
        '<article>' + '<div class="title_box">' + '<h2>' + place.name + '</h2>' + '<div class="price_by_night">$' + place.price_by_night + '</div>' +
      '</div>' + '<div class="information">' + '<div class="max_guest">' + place.max_guest + 'Guests' + '</div>' + '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + '</div>' + '<div class="number_bathrooms">' + place.number_bathrooms + 'Bathroom' + '</div>' + '</div>' + '<div class="description">' + place.description + '</div>' + '</article>'
      );
    }
  });
}

function getPlacesByAmenity () {
  $('.searchBtn').click(function () {
    const chkdAm = [];

    $('li :checkbox:checked').each(function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');

      chkdAm.push({
        id: amenityId,
        name: amenityName
      });
    });

    console.log(chkdAm);

    const settings2 = {
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ states: [], cities: [], amenities: chkdAm.map(obj => obj.id) }),
      headers: { 'Content-Type': 'application/json' },
      type: 'POST'
    };
    let place;
    $.ajax(settings2).done(function (data) {
      console.log(data);
      $('section.places').empty();
      for (place of data) {
        $('.places').append(
          '<article>' + '<div class="title_box">' + '<h2>' + place.name + '</h2>' + '<div class="price_by_night">$' + place.price_by_night + '</div>' +
      '</div>' + '<div class="information">' + '<div class="max_guest">' + place.max_guest + 'Guests' + '</div>' + '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + '</div>' + '<div class="number_bathrooms">' + place.number_bathrooms + 'Bathroom' + '</div>' + '</div>' + '<div class="description">' + place.description + '</div>' + '</article>'
        );
      }
    });
  });
}
