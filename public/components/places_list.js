var React = require('react');

let PlacesList = React.createClass({
  render(){
    var places = this.props.places;
    var divPlaces = places.map(function(place, index){
      return (
        <div key={place.id} id={place.id} className="place-info">
          <img src={place.image_url} className="club-img"/>
          <span>{place.name}</span>
        </div>)
    });
    return <div>{divPlaces}</div>
  }
});

module.exports = PlacesList;
