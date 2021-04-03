googleMap = new window.google.maps.Geocoder().geocode({ 'address': formObject.place }, function (results, status) {


    if (status === window.google.maps.GeocoderStatus.OK) {

        
        console.log(`results[0].geometry.location ${results[0].geometry.location}`);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        // console.log(lat);
        // console.log(lng);

        createGoogleMap(results[0].geometry.location);
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        new window.google.maps.Marker({
            position: { lat, lng },
            map: googleMap,
            animation: window.google.maps.Animation.DROP,
        });


    }

}
