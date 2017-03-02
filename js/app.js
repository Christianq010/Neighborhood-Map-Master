// **** Menu | Navigation Bar Toggle Script ****** ////
$(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// Class completely builds everything needed for each location marker.
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
    // that: this,
    locations: [
        new MarkerInfo('Yala National Park', 6.426934, 81.308217, 'Yala_National_Park', 560254),
        new MarkerInfo('Wilpattu National Park', 8.455214, 80.042180, 'Wilpattu_National_Park', 15347986),
        new MarkerInfo('Gal Oya National Park', 7.228529, 81.471796, 'Gal_Oya_National_Park', 23678456),
        new MarkerInfo('Uda Walawe National Park', 6.473846, 80.898525, 'Udawalawe_National_Park', 579524),
        new MarkerInfo('Maduru Oya National Park', 7.525384, 81.256282, 'Maduru_Oya_National_Park', 28595145),
        new MarkerInfo('Horton Plains National Park', 6.802195, 80.806464, 'Horton_Plains_National_Park', 509982)
    ],
    //observable used for running a search against locations array
    searchBox: ko.observable(''),
    //observable to determine if error div should be shown
    mapUnavailable: ko.observable(false),
    //observable used for opening infowindow when li item clikced from search
    clickEventHandlerFunction: function() {
        openInfowindow(this.marker);
    }

};

// Search function for filtering through the list of locations based on the name of the location.
    viewModel.search = ko.dependentObservable(function() {
        var self = this;
        var search = this.searchBox().toLowerCase();
        return ko.utils.arrayFilter(self.locations, function(markerLocation) {
            return markerLocation.title.toLowerCase().indexOf(search) >= 0;
        });
    }, viewModel);


ko.applyBindings(viewModel);
