

// on ready functions 
$(function() {
  $('#setup button').on('mouseenter', function(e) {
    e.preventDefault();
    $('#team-menu').fadeIn(2000);
  });

  $('#team-menu a').on('click', function(e) {
    e.preventDefault();
    $('#setup').remove();
    $('.stats-container').fadeIn(2000);
  })  


})