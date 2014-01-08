// Map variables
var map;
var bounds;
var geocoder;

// Function updates map with new location
function updateMap(latitude, longitude) {
  var mapOptions = {
    center: new google.maps.LatLng(latitude, longitude),
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
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  geocoder = new google.maps.Geocoder();
  bounds = new google.maps.LatLngBounds();
};

// Initialize the map to point at Lansing, MI
var initialize = updateMap(42.732535, -84.555535);
google.maps.event.addDomListener(window, 'load', initialize);

// Toggle colors for disabled even types
$(".option.event").click(function () {
  $(this).toggleClass("disabled");
});

// Move map to Lansing & disable other locations
$(".lansing").click(function () {
  $(this).removeClass("disabled");
  $(".east-lansing").addClass("disabled");
  updateMap(42.732535, -84.555535);
});

// Move map to East Lansing & disable other locations
$(".east-lansing").click(function () {
  $(this).removeClass("disabled");
  $(".lansing").addClass("disabled");
  updateMap(42.736979, -84.483865);
});


function addMarkerToMap(latitude, longitude, type){
  var image = "img/" + type + ".png";
  console.log(image);
  var marker = new google.maps.Marker({map: map, position: new google.maps.LatLng(latitude, longitude), icon: image});
  bounds.extend(location);
  map.fitBounds(bounds);
  /*var infoWindow = new google.maps.InfoWindow({ content : address})
  google.maps.event.addListener(marker, "click", function(){
    infoWindow.open(map, marker);
  });*/
}


addMarkerToMap(42.736979, -84.483865, "event");
