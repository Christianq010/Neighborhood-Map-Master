
var Model = {
    locations: [
        {
            title: 'Carnival',
            lat: 6.910468,
            lng: 79.850137
        },
        {
            title: 'Baskin Robbins',
            lat: 6.908018,
            lng: 79.850759
        },
        {
            title: 'Roots - Crescat',
            lat: 6.918126,
            lng: 79.848195
        },
        {
            title: 'Rio Ice cream',
            lat: 6.874687,
            lng: 79.857813
        },
        {
            title: 'Il Gelato - Odel',
            lat: 6.919013,
            lng: 79.865094
        }
    ]
};


var ViewModel = function () {

    var self = this;
    var map;
    var markers = [];

    self.locationArray = ko.observableArray();

    var initMap = function () {

        // Constructor creates a new map - Location is Colombo, Sri Lanka.
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 6.911652, lng: 79.849640},
            zoom: 13,
            styles: styles,
            mapTypeControl: false
        });

        // This autocomplete is for use in the geocoder entry box.
        var zoomAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('zoom-to-area-text'));
        //Bias the boundaries within the map for the zoom to area text.
        zoomAutocomplete.bindTo('bounds', map);

        var largeInfowindow = new google.maps.InfoWindow();


        // Locations/Listings that will be shown to the user pulled from Model.
        var markerLocations = Model.locations;

        // The following loop uses the lat and lng from the Model
        // create an array of markers on initialize.
        for (var i = 0; i < markerLocations.length; i++) {

        // Get the position from the location array.
            var position = new google.maps.LatLng(
                markerLocations[i].lat,
                markerLocations[i].lng
            );
            var title = markerLocations[i].title;
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                icon: defaultIcon,
                id: i
            });
            // Push the marker to our array of markers.
            markers.push(marker);
            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', function() {
                populateInfoWindow(this, largeInfowindow);
            });
            // Two event listeners - one for mouseover, one for mouseout,
            // to change the colors back and forth.
            marker.addListener('mouseover', function() {
                this.setIcon(highlightedIcon);
            });
            marker.addListener('mouseout', function() {
                this.setIcon(defaultIcon);
            });
        }

        document.getElementById('show-listings').addEventListener('click', showListings);
        document.getElementById('hide-listings').addEventListener('click', hideListings);

        document.getElementById('zoom-to-area').addEventListener('click', function() {
            zoomToArea();
        });

}




};

ko.applyBindings(new ViewModel());


// **** Menu | Navigation Bar Toggle Script ****** ////
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
