
var params = (new URL(document.location)).searchParams;
var report_type = params.get("report_type");
var report_name = params.get("report_name");
var report_notes = params.get("report_notes");
var report_object = params.get("report_object");

if (report_type !== null){
    console.log("report submitted");
    sendcoord();
} else{
    console.log("no report to submit")
}

function sendcoord() {
    console.log(report_type);
    $.ajax({
        url: 'RunQuery.jsp',
        type: 'POST',
        dataType: 'text',
        data: { "tab_id": "0", "report_type": report_type, "report_name": report_name,  "report_notes": report_notes,
            "report_object": report_object},
            //, "longitude":
               // placeLng.toString(), "latitude": placeLat.toString()},
        success: function(data){
/*            alert("report successfully submitted");
            $.each(data, function(i, name) {
                alert("report successfully submitted");

            });
            document.getElementById("create_report_form").reset();
            onPlaceChanged();*/
        },
        error: function(xhr, status, error) {
            alert("An AJAX error occured: " + status + "\nError: " + error);
            console.log(error);
        }
    });
}