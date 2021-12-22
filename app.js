
var appstate;
var current_voca_list;
var current_voca_idx;
var dont_know_list;
var current_vocalist_id;

const AppStateEnum = Object.freeze({"main":1, "study":2, "modify":3, "select_vocalist":4, "modify_vocalist":5, "add_vocalist":6 });
const AppStateDivId = ["none", "display_appstate_main",
 "display_appstate_study", "display_appstate_modify",
"display_appstate_select_vocalist", "display_appstate_modify_vocalist", "display_appstate_add_vocalist"];

$(document).ready(function() {
    app_state_transit_main();
    dont_know_list = [];

    document.getElementById("sub_select_vocalist").addEventListener('click', function (e) {
        // console.log(e);
        if (hasClass(e.target, 'class_dynamicbutton_study_vocalist')) {
            // alert(e.target.getAttribute('vocaListId'));
            update_vocalist(e.target.getAttribute('vocaListId'));
            app_display_init(AppStateEnum.study);
        }
        else if (hasClass(e.target, "class_dynamicbutton_modify_vocalist")){
            update_vocalist_to_modify(e.target.getAttribute('vocaListId'));
            // alert(AppStateEnum.modify_vocalist);
            app_display_init(AppStateEnum.modify_vocalist);
        }
        else if (hasClass(e.target, "class_dynamicbutton_delete_vocalist")){
            console.log("deletebutton pressed" + e.target.getAttribute('vocaListId'));
            delete_vocalist_by_id(e.target.getAttribute('vocaListId'));
            update_vocalist_list();
        }
        else {
            // alert("who");
        }
    }, false);

    document.getElementById("modify_vocalist").addEventListener('click', function (e) {
        if (hasClass(e.target, "class_dynamicbutton_update_voca")){
             var modified_foreign_voca = document.getElementById('updatevoca_foreign' + e.target.getAttribute('vocaId') );
             var modified_native_voca = document.getElementById('updatevoca_native' + e.target.getAttribute('vocaId') );

            //  alert(
            //     e.target.getAttribute('vocaId') + " " + e.target.getAttribute('vocaListId') + " " 
            //     /* + e.target.getAttribute('foreignVoca') + " " + e.target.getAttribute('nativeVoca') */
            //     + modified_foreign_voca.value + " " + modified_native_voca.value
            //  );

             update_voca(e.target.getAttribute('vocaListId'), e.target.getAttribute('vocaId'), modified_foreign_voca.value, modified_native_voca.value);


        }
        else {
            // alert("who");
        }
    }, false);
});

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

function app_display_init(appStateTo){
    for (let appState in AppStateEnum){
        console.log("idOf \'" + AppStateDivId[AppStateEnum[appState]] + "\' display none");
        document.getElementById(AppStateDivId[AppStateEnum[appState]]).style.display = 'none';
    }

    console.log("appstate : " + AppStateDivId[appStateTo] + " tovisible");
    document.getElementById(AppStateDivId[appStateTo]).style.display = 'block';
}

function app_state_transit_main(){
    app_display_init(AppStateEnum.main);
    // appstate = AppStateEnum.main;
    // document.getElementById("display_appstate_main").style.display = 'block';

}
function app_state_transit_study(){
    app_display_init(AppStateEnum.study);
    // appstate = AppStateEnum.main;
    // document.getElementById("display_appstate_main").style.display = 'block';

}

function app_state_transit_modify(){
    app_display_init(AppStateEnum.modify);
    // appstate = AppStateEnum.main;
    // document.getElementById("display_appstate_main").style.display = 'block';
}

function app_state_transit_add_vocalist(){
    app_display_init(AppStateEnum.add_vocalist);
    
}

function app_state_transit_select_vocalist(){
    update_vocalist_list();
    app_display_init(AppStateEnum.select_vocalist);
}


function display_appstate_add_vocalist(){
    app_display_init(AppStateEnum.add_vocalist);
}


function toggle_visible_answer(){
    if (document.getElementById("native_voca").style.visibility == "hidden"){
        document.getElementById("toggle_visible_answer").innerHTML = "Hide answer";
        document.getElementById("native_voca").style.visibility = "visible";
    }
    else {
        document.getElementById("toggle_visible_answer").innerHTML = "Answer";
        document.getElementById("native_voca").style.visibility = "hidden";
    }
    
    // document.getElementById("native_voca").innerHTML = current_voca_list[current_voca_idx]["nativeVoca"];
}

function show_foreign(){

    // document.getElementById("foreign_voca").innerHTML = current_voca_list[p_voca_idx].stringify;
    document.getElementById("foreign_voca").innerHTML = current_voca_list[current_voca_idx]["foreignVoca"];

}

function show_next_voca_dont_know(){
    add_dont_know_list(current_voca_list[current_voca_idx]);
    show_next_voca();
}

function add_dont_know_list(dont_know_voca){
    console.log(dont_know_voca);
    dont_know_list.push(dont_know_voca);
    // Array.prototype.push.apply(dont_know_list, dont_know_voca);
    console.log(dont_know_list.length);
    console.log(dont_know_list);
}

function study_done(p_vocaListId){
    $.ajax({
        url: "http://182.227.118.59:8080/voca_list/id/studied",
        type: "PUT",
        header:{
            "Content-Type":"application/json",	//Content-Type 설정
            "X-HTTP-Method-Override":"PUT"},
        dataType:"text",
        data:JSON.stringify({
            vocaListId : p_vocaListId
        }),
        contentType: "application/json"
    });

}

function show_next_voca(){
    current_voca_idx++;
    document.getElementById("progress_view").innerHTML = "" + (current_voca_idx + 1) + "/" + current_voca_list.length + "";
    document.getElementById("toggle_visible_answer").innerHTML = "Answer";
    
    if (current_voca_idx < current_voca_list.length){
        document.getElementById("native_voca").innerHTML = current_voca_list[current_voca_idx]["nativeVoca"];
        document.getElementById("foreign_voca").innerHTML = current_voca_list[current_voca_idx]["foreignVoca"];
        document.getElementById("native_voca").style.visibility = "hidden";
    }
    else {
        
        if (dont_know_list.length > 0){
            alert("go dont know list");
            current_voca_idx = -1;
            current_voca_list = dont_know_list;
            dont_know_list = [];
            show_next_voca();
        }
        else {
            study_done(current_vocalist_id);
            alert("All Voca Visited");
            app_state_transit_select_vocalist();
        }

    }
    /* TODO : array length check */
}