var React = require('react');
var ReactDOM = require('react-dom');
var PlacesList = require('../../components/places_list.js');

var map;
var markers = [];

function initMap(){
  $.get('/position', function(position){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: parseFloat(position.lat), lng: parseFloat(position.lng)},
      zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    infoWindow.setPosition({lat: parseFloat(position.lat), lng: parseFloat(position.lng)});
    infoWindow.setContent('Location found.');
  });
}

function populateMap() {
  var nightClubs = [];
  $.get('/getyelpdata', function(places){
    nightClubs = places.jsonBody.businesses;
    places.jsonBody.businesses.forEach(function(place, index){
      var marker = new google.maps.Marker({
               position: new google.maps.LatLng(place.coordinates.latitude, place.coordinates.longitude),
               map: map
        });

        var content = '<img src=' + place.image_url + ' class="club-img"/><h2>'+place.name+'</h2><br>Price: '+place.price;
        var infoWindow = new google.maps.InfoWindow({content: content});
        marker.addListener('click', function(){
          infoWindow.open(map, marker);
          window.scrollTo(0, index*112);
          document.getElementById(place.id);
          $('.place-info').css('border', '2px solid black');
          $('#'+place.id).css('border', '5px solid #00AF33');
        });
        markers.push(marker);
      });
      console.log(nightClubs);
    ReactDOM.render(<PlacesList places={nightClubs} markers={markers}/>,document.getElementById('places-list'));
  });
}

initMap();
populateMap();
