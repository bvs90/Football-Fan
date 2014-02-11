// initialise stats

var initialise = function(teamName){
  var today = new Date();
  today = today.toISOString('YYYY-MM-DD');
  today = today.slice(0,10);

  var teamHash = {
    "arsenal": 'Arsenal',
    "aston-villa": 'Aston Villa',
    "cardiff-city": 'Cardiff City',
    "chelsea": 'Chelsea',
    "crystal-palace": 'Crystal Palace',
    "everton": 'Everton', 
    "fulham": 'Fulham',
    "hull-city": 'Hull City',
    "liverpool": 'Liverpool', 
    "manchester-city": 'Manchester City', 
    "manchester-united": 'Manchester United', 
    "newcastle-united": 'Newcastle United',
    "norwich-city": 'Norwich City', 
    "southampton": 'Southampton', 
    "stoke-city": 'Stoke City', 
    "sunderland": 'Sunderland', 
    "swansea-city": 'Swansea City', 
    "tottenham-hotspur": 'Tottenham Hotspur', 
    "west-bromwich-albion": 'West Bromwich Albion', 
    "west-ham-united": 'West Ham United'
  }

  $('.full-team-name').text(teamHash[teamName]);

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
    $('#form').find('svg').remove();
    $('#form').find('ul').remove();
  };

  $.ajax({
    url: "http://api.statsfc.com/form.json?key=SBCwkOLa9b8lmePuTjFIoFmFkdo9cvtAPrhxlA6k&competition=premier-league&year=2013/2014",    
    dataType: "jsonp",
    success: function(data){
      $list = $('<ul></ul>');
      for(var i = 0; i < data.length; i++){
        if(teamName === data[i]['teampath']) {
          renderForm(data[i].form);
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
var renderForm = function(data) {
  formArr = [
    { 'label': 'Won', 'value': 0},
    { 'label': 'Lost', 'value': 0},
    { 'label': 'Drawn', 'value': 0}
  ];
  
  var width = "100%";
  var height = "80%";
  var radius = 100;
  var color = d3.scale.category20c();

  for(var i = 0; i < data.length; i++) {
    if(data[i] === 'W') {
      formArr[0]['value']++;
    }else if(data[i] === 'D') {
      formArr[2]['value']++;
    }else {
      formArr[1]['value']++;
    }
  }

  var canvas = d3.select('#form')
    .append('svg:svg')
    .data([formArr])
      .attr("width", width)
      .attr("height", height)
    .append("svg:g")
      .attr("transform", "translate(" + radius + " , " + radius + ")");  

  var arc = d3.svg.arc()
    .outerRadius(radius);

  var pie = d3.layout.pie()
    .value(function(d) { return d.value; });

  var arcs = canvas.selectAll('g.slice')
    .data(pie)
    .enter()
      .append('svg:g')
        .attr("class", "slice");

    arcs.append("svg:path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc);    

    arcs.append("svg:text")
      .attr("transform", function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d, i) { 
        if(d.value !== 0) { // don't show label if value is 0 
          return formArr[i].label;  
        }
      });    

}




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
    $('#team-menu').fadeIn(400);
  });

  $('#team-menu a').on('click', function(e) {
    e.preventDefault();
    var team = $(this).data('team');
    $('#setup').remove();
    $('.stats-container').fadeIn(1);
    initialise(team);
  });

  $('#league-table').on('click', '.team-name', function() {
    initialise($(this).data('team'));
  });      

  $('#switch-team').on('mouseenter', function() {
    $('#team-menu-flyout').fadeIn(400);
  });

  $('.close-flyout').on('click', function() {
    $('#team-menu-flyout').fadeOut(400);
  });

  $('.team-list-flyout').find('a').on('click', function() {
    initialise($(this).data('team'));
  }) 

})

