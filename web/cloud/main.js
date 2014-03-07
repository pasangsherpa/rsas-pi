require('cloud/app');

Parse.Cloud.afterSave("Activity", function(request, response) {
    var query = new Parse.Query(Parse.Installation);
    Parse.Push.send({
        where: query,
        data: {
            action: "com.rsaspi.UPDATE_STATUS",
            customdata: "Someone is in the room. Do you wanna see the face?"
        }
    }, {
        success: function() {
            console.log("push sent");
        },
        error: function(error) {
            console.log(error);
        }
    });
});
