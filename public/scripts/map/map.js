var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('../../components/header.js');
var PlacesList = require('../../components/places_list.js');

var map;
var markers = [];

var nightClubs = [];
var allPosts = [];
var currentPost;
var isCurrentPlaceOpen;
var content;

function initMap(){
  $.get('/position', function(position){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: parseFloat(position.lat), lng:parseFloat(position.lng)},
      zoom: 12
    });
    // parseFloat(position.lat) parseFloat(position.lng)
    var infoWindow = new google.maps.InfoWindow({map: map});

    infoWindow.setPosition({lat: parseFloat(position.lat), lng: parseFloat(position.lng)});
    infoWindow.setContent('You are here');
  });
}

function populateMap() {
  nightClubs = [];
  allPosts = [];
  var allClubs = [];
  markers = [];
  var currentPlace;
  var errorPlaces = 0;
  var i = 0;

  $.get('/getyelpdata', function(places){
    nightClubs = places.jsonBody.businesses;
    nightClubs.forEach(function(place, index){
      $.ajax({
        method: 'POST',
        url: '/findorcreate',
        data: {id: place.id},
        dataType: 'json',
        async: true,
        success: function(club){
          if(club!={}){
            isCurrentPlaceOpen = club.place.is_open_now;
            currentPost = club.post;
            allClubs.push(club.place);
            allPosts.push(currentPost);


            content = '<div class="row info-marker"><div class="col-md-9"><h4> '+place.name+'</h4>' +
            "Tonight's rating: <strong>" + currentPost.rating + "</strong> | <strong>" + currentPost.votes.length +"</strong> votes<br>" +
            place.location.display_address[0] + ", " + place.location.display_address[1] +
            '</div>' +
            '<div class="col-md-3">' + '<div>' +(place.distance/1000).toFixed(2)+ 'km</div>' +
            '<div>' + place.price +'</div>';
            if(isCurrentPlaceOpen){
              content += '<span class="isOpen green-text"><strong>Open<strong></span>'+'</div>' + '</div>';
            }
            else{
              content += '<span class="isOpen red-text"><strong>Closed</strong></span>'+'</div>' + '</div>';
            }

            var marker = new google.maps.Marker({
                     position: new google.maps.LatLng(place.coordinates.latitude, place.coordinates.longitude),
                     map: map
              });


            var infoWindow = new google.maps.InfoWindow({content: content});

            marker.addListener('click', function(){
              infoWindow.open(map, marker);
              window.scrollTo(0, index*116);
              $('.place-info').css('border', '1px solid #DCDCDC');
              $('#'+place.id).css('border', '3px solid #00AF33');
            });


            markers.push(marker);
            console.log("----");
            console.log(errorPlaces);
            console.log(nightClubs.length);
            console.log(allPosts.length);
            if((nightClubs.length-errorPlaces)===allPosts.length){
              ReactDOM.render(<PlacesList places={nightClubs} markers={markers} allPosts={allPosts}/>, document.getElementById('places-list'));
            }
        }
      }
      });

    });
  });
}



initMap();
ReactDOM.render(<Header />, document.getElementById('header'));
populateMap();

// function populateMap() {
//   nightClubs = [];
//   allPosts = [];
//   markers = [];
//   var currentPlace;
//   var i = 0;
//
//   $.get('/getyelpdata', function(places){
//     nightClubs = places.jsonBody.businesses;
//     nightClubs.forEach(function(place, index){
//       $.ajax({
//         method: 'POST',
//         url: '/findorcreate',
//         data: {id: place.id},
//         dataType: 'json',
//         async: true,
//         success: function(club){
//           isCurrentPlaceOpen = club.place.is_open_now;
//           currentPost = club.post;
//           allPosts.push(currentPost);
//
//
//           content = '<div class="row info-marker"><div class="col-md-9"><h4> '+place.name+'</h4>' +
//           "Tonight's rating: <strong>" + currentPost.rating + "</strong> | <strong>" + currentPost.votes.length +"</strong> votes<br>" +
//           place.location.display_address[0] + ", " + place.location.display_address[1] +
//           '</div>' +
//           '<div class="col-md-3">' + '<div>' +(place.distance/1000).toFixed(2)+ 'km</div>' +
//           '<div>' + place.price +'</div>';
//           if(isCurrentPlaceOpen){
//             content += '<span class="isOpen green-text"><strong>Open<strong></span>'+'</div>' + '</div>';
//           }
//           else{
//             content += '<span class="isOpen red-text"><strong>Closed</strong></span>'+'</div>' + '</div>';
//           }
//
//           var marker = new google.maps.Marker({
//                    position: new google.maps.LatLng(place.coordinates.latitude, place.coordinates.longitude),
//                    map: map
//             });
//
//
//           var infoWindow = new google.maps.InfoWindow({content: content});
//
//           marker.addListener('click', function(){
//             infoWindow.open(map, marker);
//             window.scrollTo(0, index*116);
//             $('.place-info').css('border', '1px solid #DCDCDC');
//             $('#'+place.id).css('border', '3px solid #00AF33');
//           });
//
//
//           markers.push(marker);
//
//           if(nightClubs.length===allPosts.length){
//             ReactDOM.render(<PlacesList places={nightClubs} markers={markers} allPosts={allPosts}/>, document.getElementById('places-list'));
//           }
//         }
//       });
//
//     });
//   });
// }
