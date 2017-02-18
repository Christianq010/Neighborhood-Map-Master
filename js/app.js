
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
    ],
    mapStyle: [
        {
            "stylers": [
                {
                    "saturation": -45
                },
                {
                    "lightness": 13
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#8fa7b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#667780"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#333333"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#8fa7b3"
                },
                {
                    "gamma": 2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a3becc"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7a8f99"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#555555"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a3becc"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#7a8f99"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#555555"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bbd9e9"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#525f66"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#bbd9e9"
                },
                {
                    "gamma": 2
                }
            ]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a3aeb5"
                }
            ]
        }
    ],
    markerColor: [
        {
            defaultIcon: 'f2657a',  // Style the markers a bit. This will be our listing marker icon.
            highlightedIcon: 'db6a36'  // Create a "highlighted location" when user mouses over the marker.
        }
    ]
};


var ViewModel = {

    self:this,
    map: {},
    bounds: {},
    infowindow: {},


    locationsVM: ko.observableArray(Model.locations), //Observeable Array for locations in Model Object
    searchBoxVal: ko.observable(""),                  //Observable taken from Search Box value for search
    markers: [],                                     // Create a new blank array for all the listing markers.



    searchAddress: function(searchBoxVal) {
        // Use the DOM search input as a value to pass it in the ViewModel.searchBoxVal observable
    },

    updateMap: function() {
    //    uses the input to search for location and gathers data from foursquare
    },

    //Updates Map and loads the titles from the array of hard coded locations when user initially opens the page
    defaultLocations: function(title) {
        Model.locations.title = title;
    },

    initMap: function() {

        var mapDivID = document.getElementById('map');      //Create variable for Map on Div

        var map = new google.maps.Map(mapDivID, {       //Creates a new map - Location is Colombo, Sri Lanka.
            center: {lat: 6.911652, lng: 79.849640},
            zoom: 13,
            styles: Model.mapStyle,
            mapTypeControl: false
        });

        var geocoder = new google.maps.Geocoder();
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();

        // The following loop uses the lat and lng from the Model
        // create an array of markers on initialize.
        var locations = Model.locations;
        for (var i = 0; i < locations.length; i++) {
            // Get the position from the location array.
            var position = new google.maps.LatLng(
                locations[i].lat,
                locations[i].lng
            );
            var title = locations[i].title;
            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({
                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                icon: defaultIcon,
                id: i
            });

            // Push the marker to our array of markers.
            markers.push(ViewModel.markers);

            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', function() {
                populateInfoWindow(this, infowindow);
            });
            // Two event listeners - one for mouseover, one for mouseout,
            // to change the colors back and forth.
            marker.addListener('mouseover', function() {
                this.setIcon(Model.markerColor.highlightedIcon);
            });
            marker.addListener('mouseout', function() {
                this.setIcon(Model.markerColor.defaultIcon);
            });
        }
    },

    // This function will loop through the markers array and display them all.
    showListings: function showListings() {
            var bounds = new google.maps.LatLngBounds();
            // Extend the boundaries of the map for each marker and display the marker
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
                bounds.extend(markers[i].position);
            }
            map.fitBounds(bounds);
        },

    // This function will loop through the listings and hide them all.
    hideListings: function hideListings() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
        }





};

ko.applyBindings(ViewModel);


// **** Menu | Navigation Bar Toggle Script ****** ////
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
