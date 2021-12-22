// const INTERNAL_IP = "192.168.219.103"
// const EXTERNAL_IP = "182.227.118.59"
// const PORT = "3000"

// var IP = "182.227.118.59"

// $(document).ready(function() {
//     set_internal_ip();
// });

// function set_internal_ip(){
//     IP = INTERNAL_IP;
// }

// function set_external_ip(){
//     IP = INTERNAL_IP;
// }

var IP = '158.247.192.251';

function express_connection_test(){
    $.ajax({
        url: "http://" + IP + ":3000/test",
        type: "get", 
        success: function(response) {
            console.log(response);
        },
        error: function(xhr) {
            console.log(xhr);
          //Do Something to handle error
        }
    });
}


function express_db_connection_test(){
    $.ajax({
        url: "http://" + IP + ":3000/dbtest",
        type: "get", 
        success: function(response) {
            console.log(response);
        },
        error: function(xhr) {
            console.log(xhr);
          //Do Something to handle error
        }
    });
}