var React = require('react');

let PlacesList = React.createClass({
  triggerMarkerClick(index){
    google.maps.event.trigger(this.props.markers[index], 'click');
  },

  displayRating(rating){
    switch (rating) {
      // TODO: Host your own images. Don't use a 3rd party.
      case 0:
        return "http://i.imgur.com/5ktFDB2.png?1";
        break;
      case 1:
        return "http://i.imgur.com/HfXPE6h.png?1";
        break;
      case 1.5:
        return "http://i.imgur.com/BdPATR0.png?1";
        break;
      case 2:
        return "http://i.imgur.com/fhe4nBv.png?1";
        break;
      case 2.5:
        return "http://i.imgur.com/FK6dOTV.png?1";
        break;
      case 3:
        return "http://i.imgur.com/UdAhu3g.png?1";
        break;
      case 3.5:
        return "http://i.imgur.com/clsy5Lc.png?1";
        break;
      case 4:
        return "http://i.imgur.com/bAyZslg.png?1";
        break;
      case 4.5:
        return "http://i.imgur.com/aHjzjPu.png?1";
        break;
      case 5:
        return "http://i.imgur.com/P9Yp9Uv.png?1";
        break;
    }
  },

  goToPage(id){
    window.location.replace('/places/'+id);
  },

  render(){
    var places = this.props.places;
    var posts = this.props.allPosts;
    var thisComponent = this;

      var divPlaces = places.map(function(place, index){
        return (
          <div key={place.id} id={place.id} className="place-info row">
            <img src={place.image_url} className="club-img pull-left" onClick={()=>{thisComponent.triggerMarkerClick(index)}}/>
            <div className="col-md-6 club-name">
              <h4><a href="#" onClick={thisComponent.goToPage.bind(thisComponent, place.id)}>{place.name}</a></h4>
              <span className="text-rating">Rating tonight: <strong>{posts[index].rating}</strong> | <strong>{posts[index].votes.length}</strong> votes</span>
              <hr/>
              <div className="place-address"><span>{place.location.display_address[0]} </span><span>{place.location.display_address[1]}</span></div>
            </div>
            <div className="col-md-4 yelp-info">
              <div className="distance"><span className="distance-details">{(place.distance/1000).toFixed(2)} km</span></div>
              <div className="price">{place.price}</div>
              <div className="yelp-info-rating">
                <img src="http://i.imgur.com/dgw2qWS.png" className="yelp-img" />
                <img src={thisComponent.displayRating(place.rating)} className="yelp-rating" />
              </div>
            </div>
          </div>)
      });
    return (<div>{divPlaces}</div>);
  }
});

module.exports = PlacesList;
