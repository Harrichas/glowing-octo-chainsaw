import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const GOOGLE_MAPS_API_KEY = "AIzaSyBM0ux2Wnirpt6RZCxflPosT91wK8hCVGc"


class Maps extends Component {

    static defaultProps = {
        center: {
            lat: 30.267153,
            lng: -97.743060
        },
        zoom: 5,
        mapTypeId: 'satellite',
        place: 'Austin'
    };

    static propTypes = {
        place: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>
            <Map
                google={this.props.google}
                zoom={4}
                style={{width: '100%', height: '100%', position: 'relative'}}

                // containerStyle={containerStyle}
                initialCenter={this.props.center}
                zoom={this.props.zoom}
            >
                <Marker position={this.props.center} />
            </Map>
            </div>

        );
    }
}

// export default Maps;
export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY
})(Maps);
