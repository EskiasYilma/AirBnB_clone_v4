/* global $ */
'use strict';

$(document).ready(function () {
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
