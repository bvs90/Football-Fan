// initialise stats

var initialise = function(teamName){
  var today = new Date();
  today = today.toISOString('YYYY-MM-DD');
  today = today.slice(0,10);

  // var teamHash = {

  // }

  getTopScorers(teamName);
  getForm(teamName);
  getFixtures(teamName, today);
  getResults(teamName, today);
  getTable();
}

// get top scorers 
var getTopScorers = function(teamName){
  if(('#top-scorers').length > 1) {
    $('#top-scorers').find('ul').remove();
  };

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
var getTable = function(teamName, today){
  if(('#league-table').length > 1) {
    $('#league-table').find('table').remove();
  };

  $.ajax({
    url: "http://api.statsfc.com/table.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&year=2013/2014",    
    dataType: "jsonp",
    success: function(data){
      var $table = $('<table></table>');
      var $headers = $('<tr><th>Team</th><th>Played</th><th>Won</th><th>Drawn</th><th>Lost</th><th>GF</th><th>GA</th><th>Diff</th><th>Points</th></tr>');
      $table.append($headers);
      $('#league-table').append($table);
      
      for(var i = 0; i < data.length; i++){
        var $row = $('<tr></tr>');
        var $team = $('<td class="team-name" data-team="' + data[i].teampath + '">' + data[i].team +'</td>');
        var $played = $('<td>' + data[i].played +'</td>');
        var $won = $('<td>' + data[i].won +'</td>');
        var $drawn = $('<td>' + data[i].drawn +'</td>');
        var $lost = $('<td>' + data[i].lost +'</td>');
        var $goalsFor = $('<td>' + data[i]['for'] +'</td>');
        var $goalsAgainst = $('<td>' + data[i].against +'</td>');
        var $goalDiff = $('<td>' + data[i].difference +'</td>');
        var $points = $('<td>' + data[i].points +'</td>');
        $row.append([$team, $played, $won, $drawn, $lost, $goalsFor, $goalsAgainst, $goalDiff, $points]);
        $table.append($row);
      }
       
    },
    error: function(err){
      throw err;
    } 
  })
};  


// render league table 


// get results
var getResults = function(teamName, today){
  if(('#results').length > 1) {
    $('#results').find('ul').remove();
  };

  $.ajax({
    url: "http://api.statsfc.com/results.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&team=" + teamName + "&year=2013/2014&from=2013-08-01&to=" + today + "&timezone=America/Los_Angeles&limit=10",    
    dataType: "jsonp",
    success: function(data){
      var $list = $('<ul></ul>');
      for(var i = 0; i < data.length; i++){
        if(data[i].homepath === teamName) {
          var opponent = data[i].away;
          var venue = 'Home';
        }else {
          var opponent = data[i].home;
          var venue = 'Away';
        }
        var $results = $('<li>' + data[i].date + " " + data[i].fulltime + " V " + opponent + " " + venue + '</li>');
        $list.append([$results]);
        $('#results').append($list)
      } 
    },
    error: function(err){
      throw err;
    } 
  })
}; 

// render results 


// get form 
var getForm = function(teamName){
  if(('#form').length > 1) {
    $('#form').find('ul').remove();
  };

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
var getFixtures = function(teamName, today){
  if(('#fixtures').length > 1) {
    $('#fixtures').find('ul').remove();
  };

  $.ajax({
    url: "http://api.statsfc.com/fixtures.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&team=" + teamName + "&from=" + today + "&to=2014-06-01&timezone=America/Los_Angeles&limit=10",    
    dataType: "jsonp",
    success: function(data){
      $list = $('<ul></ul>');
      for(var i = 0; i < data.length; i++){
        if(data[i].homepath === teamName) {
          var opponent = data[i].away;
          var venue = 'at Home';
        }else {
          var opponent = data[i].home;
          var venue = 'Away';
        }
        $fixtures = $('<li>' + data[i].date + " V " + opponent + " " + venue + '</li>');
        $list.append([$fixtures]);
        $('#fixtures').append($list)
      } 
    },
    error: function(err){
      throw err;
    } 
  })
};


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

  $('#league-table').on('click', '.team-name', function() {
    initialise($(this).data('team'));
  })  
    

  // $('#switch-team').on('mouseenter', function() {

  // })  

  })  
})

