
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



};

ko.applyBindings(new ViewModel());


// **** Menu | Navigation Bar Toggle Script ****** ////
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
