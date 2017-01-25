var React = require('react');

var PostInfo = React.createClass({
  render(){
    return (
      <div className="col-md-8 col-md-offset-2 post-info">
      <div>
        <a className="pull-left thumb-sm">
          <img src="img/a0.jpg" className="img-circle"/>
        </a>
        <div className="m-l-xxl m-b">
          <div>
            <a href><strong>John smith</strong></a>
            <label className="label bg-info m-l-xs">Editor</label>
            <span className="text-muted text-xs block m-t-xs">
              24 minutes ago
            </span>
          </div>
          <div className="m-t-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat. Vestibulum.</div>
        </div>
      </div>
      </div>
    );
  }
});

module.exports = PostInfo;
