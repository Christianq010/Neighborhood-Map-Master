
// Main Class that serves as Blueprint for each Location Marker
var MarkerInfo = function(title, lng, lat, wikiID, pageID, marker) {
    var self = this;
    this.title = title;
    this.lng = lng;
    this.lat = lat;
    this.wikiID = wikiID;
    this.pageID = pageID;
    this.marker = marker;

};


var viewModel = {
    locations: [
        new MarkerInfo('Yala National Park', 6.426934, 81.308217, 'Yala_National_Park', 560254),
        new MarkerInfo('Wilpattu National Park', 8.455214, 80.042180, 'Wilpattu_National_Park', 15347986),
        new MarkerInfo('Gal Oya National Park', 7.228529, 81.471796, 'Gal_Oya_National_Park', 23678456),
        new MarkerInfo('Uda Walawe National Park', 6.473846, 80.898525, 'Udawalawe_National_Park', 579524),
        new MarkerInfo('Maduru Oya National Park', 7.525384, 81.256282, 'Maduru_Oya_National_Park', 28595145),
        new MarkerInfo('Horton Plains National Park', 6.802195, 80.806464, 'Horton_Plains_National_Park', 509982),
        new MarkerInfo('Kaudulla National Park', 8.157000, 80.916800, 'Kaudulla_National_Park', 24761590)
    ],
    //Observable for Menu | Navigation Bar Toggle Button
    visibleMenu: ko.observable(false),
    //observable used for running a search against locations array
    searchBox: ko.observable(''),
    //observable to determine if error div should be shown
    mapUnavailable: ko.observable(false),
    //observable used for opening infowindow when <li> item clicked from search
    clickEventHandlerFunction: function() {
        openInfowindow(this.marker);
    }

};

//Toggle Button / Side Menu Function when Clicked
    viewModel.clickMe = function() {
        var self = this;
        this.visibleMenu(!this.visibleMenu());
    };

// Search function for filtering through the list of locations based on the name of the location.
    viewModel.search = ko.computed(function() {
        var self = this;
        var searchResult = this.searchBox().toLowerCase();
        return ko.utils.arrayFilter(self.locations, function(markerLocation) {
            return markerLocation.title.toLowerCase().indexOf(searchResult) >= 0;
        });
    }, viewModel);

// Show or hide the associated markers on the map when searched
    viewModel.search.subscribe(function() {
        var searchCompare = ko.utils.compareArrays(self.locations, self.search);
        return ko.utils.arrayForEach(searchCompare, function(markerLocation) {
            if (markerLocation.status === 'deleted') {
                markerLocation.marker.setVisible(false);
            } else {
                markerLocation.marker.setVisible(true);
            }
        });
    });


ko.applyBindings(viewModel);
