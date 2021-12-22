
function create_new_vocalist() {
    var vlname = document.getElementById("vocalist_name").value;
    $('.id').append( document.getElementById("vocalist_name").value);

    // $.ajax({
    //     // url: "http://182.227.118.59:8080/voca_list/new",
    //     url: "http://182.227.118.59:8080/postapicheck",
    //     type: "POST",
    //     header:{
    //         "Content-Type":"application/json",	//Content-Type 설정
    //         "X-HTTP-Method-Override":"POST"},
    //     dataType:"text",
    //     data:JSON.stringify({
    //         name: vlname

    //     }),
    //     contentType: "application/json"
    // });


    $.ajax({
        url: "http://182.227.118.59:8080/voca_list/new",
        type: "POST",
        header:{
            "Content-Type":"application/json",	//Content-Type 설정
            "X-HTTP-Method-Override":"POST"},
        dataType:"text",
        data:JSON.stringify({
            name: vlname

        }),
        contentType: "application/json"
    });

    app_state_transit_modify();
    document.getElementById("newVoca_vocaListName").value = vlname;
}

function get_vocalist_from_vocalistid(){
    var p_vocaListName = document.getElementById("vocaApi_getVocaList").value;
    console.log(p_vocaListName);
    $.ajax({
        url: "http://182.227.118.59:8080/voca/list",
        type: "get", //send it through get method
        data: { 
          vocaListName : p_vocaListName
        },
        success: function(response) {
            console.log(response);
        },
        error: function(xhr) {
            console.log(xhr);
          //Do Something to handle error
        }
    });

}

function get_vocalist_list(){
    $.ajax({
        url: "http://182.227.118.59:8080/voca_list",
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

function add_voca_to_vocalist() {
    // var vlname = document.getElementById("vocalist_name").value;
    var p_vocaListName = document.getElementById("newVoca_vocaListName").value;
    var p_foreignVoca = document.getElementById("newVoca_FVoca").value;
    var p_nativeVoca = document.getElementById("newVoca_NVoca").value;

    $('.id').append( document.getElementById("vocalist_name").value);
    $.ajax({
        // url: "http://182.227.118.59:8080/voca_list/new",
        url: "http://182.227.118.59:8080/postapicheck",
        type: "POST",
        header:{
            "Content-Type":"application/json",	//Content-Type 설정
            "X-HTTP-Method-Override":"POST"},
        dataType:"text",
        data:JSON.stringify({
            foreignVoca: p_foreignVoca,
            nativeVoca : p_nativeVoca,
            vocaListname : p_vocaListName
        }),
        contentType: "application/json"
    });

    $.ajax({
        url: "http://182.227.118.59:8080/voca/new",
        type: "POST",
        header:{
            "Content-Type":"application/json",	//Content-Type 설정
            "X-HTTP-Method-Override":"POST"},
        dataType:"text",
        data:JSON.stringify({
            foreignVoca: p_foreignVoca,
            nativeVoca : p_nativeVoca,
            vocaListname : p_vocaListName
        }),
        contentType: "application/json"
    });


    document.getElementById("add_voca_state").innerHTML = "Flashcard [" + p_foreignVoca + ":"+ p_nativeVoca +"] successfully added to " + p_vocaListName;
    document.getElementById("newVoca_FVoca").value = "";
    document.getElementById("newVoca_NVoca").value = "";
}


