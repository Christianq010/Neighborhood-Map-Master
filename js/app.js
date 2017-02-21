
// Class completely builds everything needed for each location marker.
var MarkerInfo = function(title, lng, lat, wikiID, pageID, iconColor) {
    var self = this;
    this.title = title;
    this.lng = lng;
    this.lat = lat;
    this.wikiID = wikiID;
    this.pageID = pageID;
    this.iconColor = iconColor;

    this.getContent = function() {
        var sourceURL = 'https://en.wikipedia.org/wiki/' + self.wikiID;
        // variable for source link
        var urls = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + self.wikiID;
        // url variable for wikipedia api returning only extract, is fed into ajax call

            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                data: {},
                url: urls
            }).done(function(response) {
                self.content.setContent('<div>' + self.title + '</div>');
                document.getElementById('clicked-content').innerHTML = ('<div>' + response.query.pages[self.pageID].extract + '  <br>(Source: ' + '<a href=' + sourceURL + ' target="_blank">Wikipedia)</a>' + '</div>');
                // sets infowindow content on marker click

            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                self.content.setContent('<div>' + 'Service Currently Unavailable (Try again later)' + '</div>');
            });

    };

    this.infowindow = new google.maps.InfoWindow();

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

    this.iconColor = function () {
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        this.icon.addListener('mouseover', function () {
            this.setIcon(highlightedIcon);
        });

        this.icon.addListener('mouseout', function () {
            this.setIcon(defaultIcon);
        });
    };

    this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.lng, self.lat),
        map: map,
        title: self.title,
        icon: self.icon
    });

    // Opens the info window for the location marker.
    this.openInfowindow = function() {
        for (var i=0; i < viewModel.locations.length; i++) {
            viewModel.locations[i].infowindow.close();
        }
        map.panTo(self.marker.getPosition());
        self.infowindow.setContent(self.content);
        self.infowindow.open(map,self.marker);
    };

    // Assigns a click event listener to the marker to open the info window.
    this.addListener = google.maps.event.addListener(self.marker,'click', (this.openInfowindow));

};


var viewModel = {
    locations: [
        {
            title: 'Yala National Park',
            lat: 6.426934,
            lng: 81.308217,
            wikiID: 'Yala_National_Park',
            pageid: 560254
        },
        {
            title: 'Wilpattu National Park',
            lat: 8.455214,
            lng: 80.042180,
            wikiID: 'Wilpattu_National_Park',
            pageid: 15347986
        },
        {
            title: 'Gal Oya National Park',
            lat: 7.228529,
            lng: 81.471796,
            wikiID: 'Gal_Oya_National_Park',
            pageID: 23678456
        },
        {
            title: 'Uda Walawe National Park',
            lat: 6.473846,
            lng: 80.898525,
            wikiID: 'Udawalawe_National_Park',
            pageID: 579524
        },
        {
            title: 'Maduru Oya National Park',
            lat: 7.525384,
            lng: 81.256282,
            wikiID: 'Maduru_Oya_National_Park',
            padeID: 28595145
        },
        {
            title: 'Horton Plains National Park',
            lat: 6.802195,
            lng: 80.806464,
            wikiID: 'Horton_Plains_National_Park',
            pageID: 509982
        }
    ],
    searchBox: ko.observable('')

};

ko.applyBindings(viewModel);


// **** Menu | Navigation Bar Toggle Script ****** ////
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
