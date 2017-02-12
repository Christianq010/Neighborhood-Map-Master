var ViewModel = function () {
    this.title = ko.observable('Park Ave Penthouse');
    this.lat = ko.observable(40.7713024);
    this.lng = ko.observable(-73.9632393);

}

ko.applyBindings(new ViewModel());


// **** Menu | Navigation Bar Toggle Script ****** ////
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});
