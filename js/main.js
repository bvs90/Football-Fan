// initialise stats

var initialise = function(teamName){
  getTopScorers(teamName);
}



// get top scorers 


var getTopScorers = function(teamName){
  $.ajax({
    url: "http://api.statsfc.com/top-scorers.json?key=free&competition=premier-league&team=" + teamName + "&year=2013/2014",    
    dataType: "jsonp",
    success: function(data){
      // renderScorers(data);
      $list = $('<ul></ul>');
      for(var i = 0; i < 10; i++){
        $player = $('<li>' + data[i].playershort + " " + data[i].goals + '</li>');
        $list.append([$player]);
        $('#top-scorers').append($list);
      }
    },
    error: function(err){
      throw err;
    } 
  })
};




// on ready functions 
$(function() {
  $('#setup button').on('mouseenter', function(e) {
    e.preventDefault();
    $('#team-menu').fadeIn(1);
  });

  $('#team-menu a').on('click', function(e) {
    e.preventDefault();
    var team = $(this).data('team');
    $('#setup').remove();
    $('.stats-container').fadeIn(1);
    initialise(team);
  })  
})

