// Map variables
var map;
var bounds;

// Marker variables
var music = [];
var food = [];
var art = [];
var events = [];
var festivals = [];
var parks = [];

// Function updates map with new center & markers
function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(42.732535, -84.555535),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
              {
                "stylers": [
                  { "saturation": -100 },
                  { "lightness": -17 }
                ]
              },{
                "featureType": "water",
                "stylers": [
                  { "hue": "#52C0AB" },
                  { "saturation": 50 }
                ]
              }
            ]
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  bounds = new google.maps.LatLngBounds();

  events.push(addMarkerToMap(42.736979, -84.483865, "events"));
  food.push(addMarkerToMap(42.732535, -84.555535, "food"));
  
};

function addMarkerToMap(latitude, longitude, type) {
  var image = "img/" + type + ".png";
  var marker = new google.maps.Marker({ map: map, position: new google.maps.LatLng(latitude, longitude), icon: image });

  //bounds.extend(location);
  //map.fitBounds(bounds);
  var infoWindow = new google.maps.InfoWindow({ content : "<h3>Event</h3><p>This is an event</p>"});
  google.maps.event.addListener(marker, "click", function(){
    infoWindow.open(map, marker);
  });

  return marker;
};

function updateMarkers(category, visible) {
  for (var i = 0; i < category.length; i++) {
      if( visible) category[i].setMap(map);
      else category[i].setMap(null);
  }
};

// Initialize the map to point at Lansing, MI
google.maps.event.addDomListener(window, 'load', initialize);




// Toggle colors for disabled even types
$(".option.event").click(function () {
  $(this).toggleClass("disabled");
  var visible = !$(this).hasClass("disabled");
  var category;

  if( $(this).hasClass("music") ) category = music;
  if( $(this).hasClass("art") ) category = art;
  if( $(this).hasClass("food") ) category = food;
  if( $(this).hasClass("events") ) category = events;
  if( $(this).hasClass("festivals") ) category = festivals;
  if( $(this).hasClass("parks") ) category = parks;

  updateMarkers(category, visible);
});





function changeLocation(selector, latitude, longitude) {
  // Toggle classes
  $(".location").addClass("disabled");
  $(selector).removeClass("disabled");
  // Set new center to map
  map.setCenter(new google.maps.LatLng(latitude, longitude));
};


// Move map to Lansing & disable other locations
$(".lansing").click(function () {
  changeLocation(".lansing", 42.732535, -84.555535);
});

// Move map to East Lansing & disable other locations
$(".east-lansing").click(function () {
  changeLocation(".east-lansing", 42.736979, -84.483865);
});