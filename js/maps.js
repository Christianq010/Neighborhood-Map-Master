var map;
var infowindow;
var openInfowindow;
var lastSelected;

    function initMap() {
        //Scripts executed only after Google Maps API Loaded
        //Solution found at https://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
        if (typeof window.google === 'object' && typeof window.google.maps === 'object') {

            // Create a styles array to use with the map.
            var styles = [
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
            ];

            // Creates a new map - Location is Colombo, Sri Lanka.
            var mapOptions = {
                zoom: 7,
                styles: styles,
                center: new google.maps.LatLng(6.911652, 79.849640),
                mapTypeControl: false
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            infowindow = new google.maps.InfoWindow();
        }
        else {
            // Load error div using knockout if Google Map does not successfully load
            viewModel.mapUnavailable(true);
        }

        //Marker and functions drawn from Sample Code on Google Maps API Course on Udacity
        //https://www.udacity.com/course/google-maps-apis--ud864
        for (var i = 0; i < viewModel.locations.length; i++) {
            var self = viewModel.locations[i];
            // This function takes in a COLOR, and then creates a new marker
            // icon of that color. The icon will be 21 px wide by 34 high, have an origin
            // of 0, 0 and be anchored at 10, 34).
            function makeMarkerIcon(markerColor) {
                var markerImage = new google.maps.MarkerImage(
                    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
                    '|40|_|%E2%80%A2',
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(10, 34),
                    new google.maps.Size(21,34));
                return markerImage;
            }

            // Custom Style applied to markers. This will be our listing marker icon.
            var defaultIcon = makeMarkerIcon('395634');

            // "Highlighted location" marker color for when the user
            // mouses over the marker.
            var highlightedIcon = makeMarkerIcon('dd5f63');

            viewModel.locations[i].marker = new google.maps.Marker({
                position: new google.maps.LatLng(self.lng, self.lat),
                map: map,
                title: self.title,
                icon: defaultIcon,
                wikiID: self.wikiID
            });

            // Two event listeners - one for mouseover, one for mouseout,
            // to change the colors back and forth.
            viewModel.locations[i].marker.addListener('mouseover', function () {
                this.setIcon(highlightedIcon);
            });

            viewModel.locations[i].marker.addListener('mouseout', function () {
                this.setIcon(defaultIcon);
            });


            // Opens a infowindow for a marker when clicked upon.
            //Also animates(bounces) and highlights marker when clicked
            openInfowindow = function (marker) {

                //Last Selected Variable used to select only latest marker
                if (lastSelected != null) {
                    lastSelected.setIcon(defaultIcon);
                }
                lastSelected = marker;

                console.log(marker);

                marker.setIcon(highlightedIcon);
                map.panTo(marker.getPosition());
                marker.setAnimation(google.maps.Animation.BOUNCE);
                infowindow.setContent(marker.title);
                infowindow.open(map,marker);

                // URL of Wikipedia Article for Source Reference
                var wikiSource = 'https://en.wikipedia.org/wiki/' + marker.wikiID;

                // Extract taken from Wikipedia API
                var wikiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + marker.wikiID;

                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {},
                    url: wikiURL
                }).done(function(response) {
                    console.log(marker);
                    var extract = response.query.pages[Object.keys(response.query.pages)[0]].extract;

                    infowindow.setContent('<div>' + '<h4 class="marker-title">' + marker.title + '</h4>' + extract + '<br>(Source: ' + '<a href=' + wikiSource + '>Wikipedia)</a>' +'</div>');

                //Set Content if failure of AJAX request
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    infowindow.setContent('<div>' + 'No Service/ Connection Detected (Please try again later)' + '</div>');
                });
            };

            // Event listener opens infowindow upon being clicked.
            this.addListener = google.maps.event.addListener(self.marker,'click', function() {
                openInfowindow(this);
                console.log(this);
            });
        }

    }

    // Fallback error handling method for Google Maps
    mapError = function () {
        viewModel.mapUnavailable(true);
    };



