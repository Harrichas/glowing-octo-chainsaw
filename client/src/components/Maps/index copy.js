import React, { Fragment } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import Marker from '../Marker';


const AnyReactComponent = ({ text }) => <div>{text}</div>;
const GOOGLE_MAPS_API_KEY = "AIzaSyAX5jbsLY_jCzc3r7ljL-b62ISJ0Er1MM0"
// const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const Maps = ({ center, place, journals, zoom }) => {

    console.log(journals);
    console.log(journals[0].center.lat);

    return (
        <div style={{ height: '600px', width: '100%', padding: "10px" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                // defaultCenter={this.props.center}
                defaultZoom={zoom}
                center={center}
            >

                {/* 
                <Marker
                    lat={center.lat}
                    lng={center.lng}
                /> */}

                            {/* <Marker
                                lat={30.278206994685647}
                                lng={-97.73990583712728}
                            />   */}

                if (journals.length) {

                    <Marker
                    lat={journals[0].center.lat}
                    lng={journals[0].center.lng}
                    />
                    
                } else {
                    
                    <Marker
                    lat={30.278206994685647}
                    lng={-97.73990583712728}
                    />
                }
             

                {/* <Marker
                    lat={journals[1].center.lat}
                    lng={journals[1].center.lng}
                /> */}


                {/* {journals.length ? (
                    <Fragment>
                    {journals.map(journal => (

                        <Fragment key={journal._id}>

                            <AnyReactComponent
                                text={journal.center.lat + ", " + journal.center.lng}
                            />

                            <Marker
                                // lat={journal.center.lat}
                                // lng={journal.center.lng}
                                lat={30.278206994685647}
                                lng={-97.73990583712728}
                            />
                            
                         
                            

                        </Fragment>
                        
                    ))}
                    </Fragment>
                ) : (
                            <Marker
                                // lat={journal.center.lat}
                                // lng={journal.center.lng}
                                lat={30.278206994685647}
                                lng={-97.73990583712728}
                            />               
                )} */}



            </GoogleMapReact>
        </div>
    );
}

Maps.defaultProps = {
    center: {
        lat: 30.267153,
        lng: -97.743060
    },
    zoom: 10,
    // mapTypeId: 'satellite',
    place: 'Austin'
};

Maps.propTypes = {
    place: PropTypes.string.isRequired,
    center: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    journals: PropTypes.array,

}

export default Maps;
