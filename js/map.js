function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(42.725618 , -84.479944),
    zoom: 15,
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
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

$(".option").click(function () {
  $(this).toggleClass("disabled");
});