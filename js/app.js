
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


var ViewModel = {

    self:this,
    //Observable taken from Search Box value for search
    searchBoxVal: ko.observable(""),

    //Observeable Array from locations in Model Object
    locationsVM: ko.observableArray(Model.locations),

    searchAddress: function(searchBoxVal) {
        // Use the DOM search input as a value to pass it in the ViewModel.searchBoxVal observable
    },

    updateMap: function () {
    //    uses the input to search for location and gathers data from foursquare
    },

    //Loads the titles from the array of hard coded locations when user initially opens the page
    defaultLocations: function (title) {
        Model.locations.title = title;
    }


};

ko.applyBindings(ViewModel);


// **** Menu | Navigation Bar Toggle Script ****** ////
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
