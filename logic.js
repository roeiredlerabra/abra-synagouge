window.addEventListener('load', function() {
    var anchor = document.querySelector('a[href="#"]');
    anchor.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default behavior of the anchor tag
      showContent('home');    // Call the showContent function with the argument 'home'
    }, { once: true });
  
    anchor.click(); // Programmatically trigger the click event
  });
          function showContent(contentId) {
              var contents = document.getElementsByClassName("content");
              for (var i = 0; i < contents.length; i++) {
                  contents[i].style.display = "none";
              }
              document.getElementById(contentId).style.display = "block";
          }
          document.addEventListener('DOMContentLoaded', function () {
              var locationVideo = document.getElementById('location-video');
              locationVideo.play();
          });
          window.onload = function() {
              var currentDate = new Date().toISOString().split('T')[0];
              var url = "https://www.hebcal.com/zmanim?cfg=json&geonameid=294514&date=" + currentDate;
  
              fetch(url)
                  .then(response => response.json())
                  .then(data => populateTable(data.times))
                  .catch(error => console.log(error));
          }
  
         function populateTable(times) {
      var translation = {
          "chatzotNight": "חצות הלילה",
          "alotHaShachar": "עלות השחר",
          "misheyakir": "משיכיר",
          "misheyakirMachmir": "משיכיר - מחמיר",
          "dawn": "השמש נמצאת 6° מתחת לאופק בבוקר",
          "sunrise": "הקצה העליון של השמש מופיע מעל האופק המזרחי בבוקר",
          "sofZmanShma": "סוף זמן שמע",
          "sofZmanShmaMGA": "סוף זמן שמע מגן אברהם",
          "sofZmanShmaMGA16Point1": "Sof Zman Shma MGA 16.1",
          "sofZmanTfilla": "סוף זמן תפילת שחרית",
          "sofZmanTfillaMGA": "סוף זמן תפילת שחרית מגן אברהם",
          "sofZmanTfillaMGA16Point1": "Sof Zman Tfilla MGA 16.1",
          "chatzot": "חצות היום",
          "minchaGedola": "מנחה גדולה",
          "minchaKetana": "מנחה קטנה",
          "plagHaMincha": "פלג המנחה",
          "sunset": "שקיעה",
          "dusk": "השמש נמצאת 6° מתחת לאופק בערב",
          "tzeit7083deg": "כאשר 3 כוכבים בינוניים נראים בשמי הלילה",
          "tzeit85deg": "כאשר 3 כוכבים קטנים נראים בשמי הלילה°",
          "tzeit42min": "כאשר 3 כוכבים בינוניים נראים בשמי הלילה (קבוע 42 דקות לאחר השקיעה)",
          "tzeit50min": "כאשר 3 כוכבים קטנים נראים בשמי הלילה (קבוע 50 דקות לאחר השקיעה)",
          "tzeit72min": "כאשר 3 כוכבים קטנים נראים בשמי הלילה (קבוע 72 דקות לאחר השקיעה)"
      };
  
      var table = document.getElementById("timesTable");
  
      for (var key in times) {
          var row = table.insertRow();
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
  
          if (translation[key]) {
              cell1.innerHTML = translation[key];
          } else {
              cell1.innerHTML = key;
          }
  
          var dateTime = new Date(times[key]);
          var formattedDateTime = dateTime.toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
          });
  
          cell2.innerHTML = formattedDateTime;
      }
  }
  var currentDate = new Date().toISOString().split('T')[0];
  fetch('https://www.hebcal.com/converter?cfg=json&date='+ currentDate)
              .then(response => response.json())
              .then(data => {
                  // Display the Hebrew date
                  var hebrewDateElement = document.getElementById("hebrew-date");
                  hebrewDateElement.innerHTML = data.hebrew;
  
                  // Display the events in a table
                  var eventsTable = document.getElementById("events-table");
                  var eventsTableBody = eventsTable.getElementsByTagName('tbody')[0];
  
                  for (var i = 0; i < data.events.length; i++) {
                      var eventRow = eventsTableBody.insertRow(i);
                      var eventCell = eventRow.insertCell(0);
                      eventCell.innerHTML = data.events[i];
                  }
              })
              .catch(error => console.log(error));

              function getTzeit85deg() {
                return new Promise(function(resolve, reject) {
                  var xhr = new XMLHttpRequest();
                  var currentDate = new Date().toISOString().split('T')[0];
                  xhr.open('GET', 'https://www.hebcal.com/zmanim?cfg=json&geonameid=294514&date='+ currentDate, true);
                  xhr.onload = function() {
                    if (xhr.status === 200) {
                      try {
                        var data = JSON.parse(xhr.responseText);
                        var times = data.times;
                        var tzeit85deg = times.tzeit85deg;
                        var tzeit85degHHMM = tzeit85deg.split('T')[1].split('+')[0];
                        resolve(tzeit85degHHMM);
                      } catch (error) {
                        reject(error);
                      }
                    } else {
                      reject(new Error('Request failed. Status: ' + xhr.status));
                    }
                  };
                  xhr.onerror = function() {
                    reject(new Error('Request failed.'));
                  };
                  xhr.send();
                });
              }
          
              getTzeit85deg()
                .then(function(tzeit85deg) {
                  var outputElement = document.getElementById('output');
                  if (tzeit85deg > '18:00') {
                    outputElement.textContent = 'Out of work time';
                  } else {
                    outputElement.textContent = tzeit85deg;
                  }
                })
                .catch(function(error) {
                  console.error(error);
                });