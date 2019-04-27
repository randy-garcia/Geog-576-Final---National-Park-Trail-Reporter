//used to add item to map
let lineSymbol;
let polylineGraphic;

function initialization() {
    showAllReports();
    initAutocomplete();
}

function showAllReports() {
    $.ajax({
        url: 'HttpServlet',
        type: 'POST',
        data: { "tab_id": "1"},
        success: function(reports) {
            //mapInitialization(reports);
            console.log("this worked");
        },
        error: function(xhr, status, error) {
            alert("An AJAX error occured: " + status + "\nError: " + error);
        }
    });
}

function mapInitialization(reports) {

    $.each(reports, function(i, e) {
        var polyline = new Polyline({
            paths: "[" +
                bracektscoord +
            "]"
        });



        if (e['report_type'] == 'class1'){
            lineSymbol = new SimpleLineSymbol({
                color: [0, 153, 76],
                width: 4
            });
            polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            });

            // Add the graphic to the view
            view.graphics.add(polylineGraphic);

        } else if (e['report_type'] == 'class2'){
            lineSymbol = new SimpleLineSymbol({
                color: [76, 153, 0],
                width: 4
            });
            polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            });

            // Add the graphic to the view
            view.graphics.add(polylineGraphic);

        } else if (e['report_type'] == 'class3'){
            lineSymbol = new SimpleLineSymbol({
                color: [204, 204, 0],
                width: 4
            });
            polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            });

            // Add the graphic to the view
            view.graphics.add(polylineGraphic);

        } else if (e['report_type'] == 'class4'){
            lineSymbol = new SimpleLineSymbol({
                color: [255, 128, 0],
                width: 4
            });
            polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            });

            // Add the graphic to the view
            view.graphics.add(polylineGraphic);

        } else if (e['report_type'] == 'class5'){
            lineSymbol = new SimpleLineSymbol({
                color: [255, 0, 0],
                width: 4
            });
            polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            });

            // Add the graphic to the view
            view.graphics.add(polylineGraphic);

        } else{
            lineSymbol = new SimpleLineSymbol({
                color: [64, 64, 64],
                width: 4
            });
            polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol
            });
            view.graphics.add(polylineGraphic);

        }

    });

    map.fitBounds (bounds);

}
//Execute our 'initialization' function once the page has loaded.
google.maps.event.addDomListener(window, 'load', initialization);