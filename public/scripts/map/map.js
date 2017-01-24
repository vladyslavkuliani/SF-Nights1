var React = require('react');
var ReactDOM = require('react-dom');
var PlacesList = require('../../components/places_list.js');

var map;
var markers = [];

function initMap(){
  $.get('/position', function(position){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.773972, lng:-122.431297},
      zoom: 12
    });
    // parseFloat(position.lat) parseFloat(position.lng)
    var infoWindow = new google.maps.InfoWindow({map: map});

    infoWindow.setPosition({lat: 37.773972, lng: -122.431297});
    infoWindow.setContent('Location found.');
  });
}

function populateMap() {
  var nightClubs = [];
  var currentPost;
  var isCurrentPlaceOpen;

  $.get('/getyelpdata', function(places){
    console.log(places);
    nightClubs = places.jsonBody.businesses;
    nightClubs.forEach(function(place, index){
      $.ajax({
        method: 'POST',
        url: '/findorcreate',
        data: {id: place.id},
        dataType: 'json',
        async: false,
        success: function(club){
          isCurrentPlaceOpen = club.is_open_now;
        }
      });

      var marker = new google.maps.Marker({
               position: new google.maps.LatLng(place.coordinates.latitude, place.coordinates.longitude),
               map: map
        });

        $.ajax({
          method: 'GET',
          url: '/getpost',
          data: {clubId: place.id},
          dataType: 'json',
          async: false,
          success: function(post){
            currentPost = post;
          }
        });


        var content = '<div class="row info-marker"><div class="col-md-9"><h4> '+place.name+'</h4>' +
        "Tonight's rating: <strong>" + currentPost.rating + "</strong> | <strong>" + currentPost.votes.length +"</strong> votes<br>" +
        place.location.display_address[0] + ", " + place.location.display_address[1] +
        '</div>' +
        '<div class="col-md-3">' + '<div>' +(place.distance/1000).toFixed(2)+ 'km</div>' +
        '<div>' + place.price +'</div>' +
        '<span class="isOpen">'+isCurrentPlaceOpen+'</span>'+'</div>' +
        '</div>'

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
    ReactDOM.render(<PlacesList places={nightClubs} markers={markers}/>, document.getElementById('places-list'));
  });
}

initMap();
populateMap();
