var api_url = "https://codeforces.com/api/";
var tags = {};
google.charts.load('current', { 'packages': ['corechart', 'calendar'] });
//google.load("visualization", "1", { packages: ["corechart"] });
//google.setOnLoadCallback(drawVisualization);
handle = 'prathamarora25.6';
var titleTextStyle = {
   fontSize: 18,
   color: '#393939',
   bold: false
};
var colors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#2196F3', '#009688',
   '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722', '#795548', '#607D8B', '#E65100',
   '#827717', '#004D40', '#1A237E', '#6200EA', '#3F51B5', '#F50057', '#304FFE', '#b71c1c'];
req1 = $.get(api_url + "user.status", { "handle": 'prathamarora25.6' }, function (data, status) {
   console.log(data);

   //  $(".sharethis").removeClass("hidden");

   if (data.result.length < 1) {
      err_message("handleDiv", "No submissions");
      return;
   }
   var elem1 = document.getElementById("demo");
   // parsing all the submission and saving useful data. Don't remember why from the back
   for (var i = data.result.length - 1; i >= 0; i--) {
      var sub = data.result[i];
      var problemId = sub.problem.contestId + '-' + sub.problem.index;

      if (sub.verdict == 'OK') {
         // This is probably no entirely correct. because for multiple ac tag count will increase every time
         sub.problem.tags.forEach(function (t) {
            if (tags[t] === undefined) tags[t] = 1;
            else tags[t]++;
         });
      }
   }
   for (var tag in tags) {
      // elem1.innerHTML += tag + "<br/>";
      console.log(tags[tag]);
   }

});
// With this request we get all the rating changes of the user
var req2 = $.get(api_url + "user.rating", { 'handle': 'prathamarora25.6' }, function (data, status) {
   console.log(data.status);
   console.log(data.result);

   var elem = document.getElementById("demo");
   for (var i = 0; i < 5; i++) {
      // elem.innerHTML +=data.result[i].contestName+" -> "+data.result[i].rank+"<br/>";
   }
});
if (typeof google.visualization === 'undefined') {
   google.charts.setOnLoadCallback(drawCharts);
} else {
   drawCharts();
}
function drawCharts() {


   $('#tags').removeClass('hidden');
   var tagTable = [];
   for (var tag in tags) {
      tagTable.push([tag + ": " + tags[tag], tags[tag]]);
   }
   tagTable.sort(function (a, b) {
      return b[1] - a[1];
   });
   tags = new google.visualization.DataTable();
   tags.addColumn('string', 'Tag');
   tags.addColumn('number', 'solved');
   tags.addRows(tagTable);
   var tagOptions = {
      width: Math.max(600, $('#tags').width()),
      height: Math.max(600, $('#tags').width()) * 0.75,
      chartArea: { width: '80%', height: '100%' },
      title: 'Tags of ' + handle,
      pieSliceText: 'none',
      legend: {
         position: 'right',
         alignment: 'center',
         textStyle: {
            fontSize: 12,
            fontName: 'Roboto',
         }
      },
      pieHole: 0.5,
      tooltip: {
         text: 'percentage'
      },
      fontName: 'Roboto',
      titleTextStyle: titleTextStyle,
      colors: colors.slice(0, Math.min(colors.length, tags.getNumberOfRows())),
   };
   var tagChart = new google.visualization.PieChart(document.getElementById('tags'));
   tagChart.draw(tags, tagOptions);

}


