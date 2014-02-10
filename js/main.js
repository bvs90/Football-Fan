// initialise stats

var initialise = function(teamName){
  getTopScorers(teamName);
  //checkJSON()
  getForm(teamName);
}

//utility to chekc team names are correct. 
// var checkJSON = function() {
//   $.ajax({
//     url: "http://api.statsfc.com/teams.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition&competition=premier-league&year=2013/2014", // teams
//     url: "http://api.statsfc.com/form.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&year=2013/2014", // form  
//     dataType: "jsonp",
//     success: function(data){
//       console.log(data);  
//     },
//     error: function(err){
//       throw err;
//     } 
//   })  
// }


// get top scorers 
var getTopScorers = function(teamName){
  $.ajax({
    url: "http://api.statsfc.com/top-scorers.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&team=" + teamName + "&year=2013/2014",    
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

// render top scores 


// get league table 


// render league table 


// get results 

// render results 


// get form 
var getForm = function(teamName){
  $.ajax({
    url: "http://api.statsfc.com/form.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&year=2013/2014",    
    dataType: "jsonp",
    success: function(data){
      $list = $('<ul></ul>');
      for(var i = 0; i < data.length; i++){
        if(teamName === data[i]['teampath']) {
          $form = $('<li>' + data[i].form + '</li>');
          $list.append([$form]);
          $('#form').append($list)
        }
      } 
    },
    error: function(err){
      throw err;
    } 
  })
};

// render form 


// get fixtures 


// render fixtures 





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

