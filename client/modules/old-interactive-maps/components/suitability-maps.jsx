import React from 'react';
import googleMaps from 'google-maps';

class SuitabilityMapComponent extends React.Component {
  constructor() {
    super()
    this.auto = this.auto.bind(this);
    this.google = null;
    this.map = null;
  }
  auto() {
    let myWidth = 0;
    let myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' ) {
      //Non-IE
      myWidth = window.innerWidth;
      myHeight = window.innerHeight;
    } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
      //IE 6+ in 'standards compliant mode'
      myWidth = document.documentElement.clientWidth;
      myHeight = document.documentElement.clientHeight;
    } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
      //IE 4 compatible
      myWidth = document.body.clientWidth;
      myHeight = document.body.clientHeight;
    }
    console.log(this.map.style)
    this.map.style.height = (myHeight-60)+'px';
  }
  componentDidMount() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
    const auto = this.auto;
    window.addEventListener('resize', () => {
      auto();
    })
    this.auto();
  }
  componentDidUpdate() {
    if (componentHandler) {
      componentHandler.upgradeDom();
    }
  }
  render() {
    const {width, height} = this.props;
    const style = {
      width,
      height
    };
    const map = (c) => {
      this.map = c;
    };
    return (
      <div className="mdl-grid mdl-grid--no-spacing">
        <div className="mdl-cell mdl-cell--12-col old-suitability-map">
          <div
            ref={map}
            style={style}
          >
          </div>
        </div>
      </div>
    );
  }
}

SuitabilityMapComponent.propType = {
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  zoom: React.PropTypes.number
};

SuitabilityMapComponent.defaultProps = {
  height: 400,
  lat: 12.2969397,
  lng: 121.6576634,
  width: '100%',
  zoom: 6
};

export default SuitabilityMapComponent;
