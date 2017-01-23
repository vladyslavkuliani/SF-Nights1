var React = require('react');

let PlacesList = React.createClass({
  triggerMarkerClick(index){
    google.maps.event.trigger(this.props.markers[index], 'click');
  },

  render(){
    var places = this.props.places;
    var thisComponent = this;

    var divPlaces = places.map(function(place, index){
      return (
        <div key={place.id} id={place.id} className="place-info">
          <img src={place.image_url} className="club-img" onClick={thisComponent.triggerMarkerClick.bind(thisComponent, index)}/>
          <span>{place.name}</span>
        </div>)
    });
    return <div>{divPlaces}</div>
  }
});

module.exports = PlacesList;
