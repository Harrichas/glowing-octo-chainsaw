import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';


const AnyReactComponent = ({ text }) => <div>{text}</div>;
// const GOOGLE_MAPS_API_KEY = "AIzaSyBM0ux2Wnirpt6RZCxflPosT91wK8hCVGc"
// const GOOGLE_MAPS_API_KEY = "AIzaSyD3KGpziXLUe7Z_oxsS-v-yhtiB-qlqT_I"
// const GOOGLE_MAPS_API_KEY = "AIzaSyAjdZWiXflLNuIrZlZKMT-l0M8Ji8St1aU"
const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"

class Maps extends Component {

    static defaultProps = {
        center: {
            lat: 30.267153,
            lng: -97.743060
        },
        zoom: 7,
        mapTypeId: 'satellite',
        place:'Austin'
    };
    
    static propTypes = {
        place: PropTypes.string.isRequired,
        center: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div style={{ height: '600px', width: '100%' , padding: "10px"}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: GOOGLE_MAPS_API_KEY}}
                    // defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    center={this.props.center}
                    onChildMouseEnter={this.onChildMouseEnter}
                    onChildMouseLeave={this.onChildMouseLeave}
                >
                    <AnyReactComponent
                        text={this.props.place}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default Maps;
