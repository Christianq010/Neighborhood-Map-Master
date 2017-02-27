var map;
var infowindow;

    function initMap() {
        //Scripts executed only after Google Maps API Loaded
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
                zoom: 8,
                styles: styles,
                center: new google.maps.LatLng(6.911652, 79.849640),
                mapTypeControl: false
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            infowindow = new google.maps.InfoWindow();
        }
        else {
            // if no google object found, display error div
            viewModel.mapUnavailable(true);
        }

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

            // Style the markers a bit. This will be our listing marker icon.
            var defaultIcon = makeMarkerIcon('0091ff');

            // Create a "highlighted location" marker color for when the user
            // mouses over the marker.
            var highlightedIcon = makeMarkerIcon('FFFF24');

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

            // Opens the info window for the location marker.
            function openInfowindow (marker) {

                console.log(marker);

                map.panTo(marker.getPosition());
                infowindow.setContent(marker.title);
                infowindow.open(map,marker);


                var sourceURL = 'https://en.wikipedia.org/wiki/' + marker.wikiID;
                // variable for source link
                var urls = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + marker.wikiID;
                // url variable for wikipedia api returning only extract, is fed into ajax call

                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {},
                    url: urls
                }).done(function(response) {
                    console.log(marker);
                    var extract = response.query.pages[Object.keys(response.query.pages)[0]].extract;

                    infowindow.setContent(marker.title + '<br>' + extract);
                    // self.content.setContent('<div>' + self.title + '</div>');
                    // document.getElementById('clicked-content').innerHTML = ('<div>' + response.query.pages[self.pageID].extract + '  <br>(Source: ' + '<a href=' + sourceURL + ' target="_blank">Wikipedia)</a>' + '</div>');
                    // // sets infowindow content on marker click

                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    // self.content.setContent('<div>' + 'Service Currently Unavailable (Try again later)' + '</div>');
                });
            }

            // Assigns a click event listener to the marker to open the info window.
            this.addListener = google.maps.event.addListener(self.marker,'click', function() {
                openInfowindow(this);
            });
        }


    }



