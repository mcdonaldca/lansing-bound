// Map variables
var map;
// var bounds;
var test_me = "nope ):";

// Marker variables
var music = [];
var food = [];
var art = [];
var events = [];
var festivals = [];
var parks = [];

function showFeature(videoID) {
  $("#back-drop").show();
  $("#feature").show();

  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  }
  else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    $("#feature").html(xmlhttp.responseText);
    $(".x").click(function () {
      $("#back-drop").hide();
    });

    $("#video-frame").fitVids();
  };
  xmlhttp.open("GET","feature.php?q="+videoID,true);
  xmlhttp.send();
};

// Function that creates a marker on the map for a specific item
function addMarkerToMap(latitude, longitude, type, videoid) {
  var image = "img/" + type + ".png";
  var marker = new google.maps.Marker({ map: map, position: new google.maps.LatLng(latitude, longitude), icon: image });

  //bounds.extend(location);
  //map.fitBounds(bounds);
  google.maps.event.addListener(marker, "click", function(){
    showFeature(videoid);
  });

  return marker;
};

// Function updates map with new center & markers
function initialize() {
  // Create map options.
  //   Map starts centered on Lansing
  //   Map is black & white with blue bodies of water
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

  // Initiliaze map
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  // If more time, add feature where map bounds extend/shrink when locations are added/removed
  // bounds = new google.maps.LatLngBounds();
  

  food.push(addMarkerToMap(42.7371, -84.487098, "food", "24490703"));
  food.push(addMarkerToMap(42.752953, -84.54969, "food", "bcPqoj4X81g"));
  food.push(addMarkerToMap(42.742348, -84.57937, "food", "QX7_OMgona0"));
  festivals.push(addMarkerToMap(42.733759, -84.552716, "festivals", "73415149"));
  food.push(addMarkerToMap(42.736123, -84.547223, "food", "MBhD05pe2BU"));
};

// Function goes through and toggles visibility of categories of events
function updateMarkers(category, visible) {
  for (var i = 0; i < category.length; i++) {
      if( visible) category[i].setMap(map);
      else category[i].setMap(null);
  }
};

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

// Function shifts center of map
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

// Initialize the map to point at Lansing, MI
google.maps.event.addDomListener(window, 'load', initialize);

// Function to run when the document is loaded
$(function(){
  // Hide the javascript warning
  $("#back-drop").hide();
  $("#js-error-text").hide();
});

