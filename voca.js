
function update_vocalist_to_modify(p_vocaListId){
    $.ajax({
        url: "http://182.227.118.59:8080/voca/list/id",
        type: "get", //send it through get method
        data: { 
            vocaListId : p_vocaListId
        },
        success: function(response) {

            var parent = document.getElementById("modify_vocalist");
            while (parent.firstChild) {
                parent.removeChild(parent.lastChild);
            }

            console.log(response);
            for (voca in response)
            {

                /* Create h element to show vocaid */
                var modify_voca_vocaid = document.createElement("h5");
                var modify_voca_vocaid_node = document.createTextNode(response[voca]["vocaId"]);
                modify_voca_vocaid.appendChild(modify_voca_vocaid_node);
                // modify_vocalist_button.classname = "class_dynamicbutton_modify_voca_id";
                
                /* Create Textarea to show foreign voca (question) */
                var modify_voca_foreign = document.createElement("textarea");
                var modify_voca_foreign_node = document.createTextNode(response[voca]["foreignVoca"]);
                modify_voca_foreign.id = "updatevoca_foreign" + response[voca]["vocaId"];
                modify_voca_foreign.appendChild(modify_voca_foreign_node);

                modify_voca_foreign.cols = 100;
                
                /* Create Textarea to show native voca (answer) */
                var modify_voca_native = document.createElement("textarea");
                var modify_voca_native_node = document.createTextNode(response[voca]["nativeVoca"]);
                modify_voca_native.id = "updatevoca_native" + response[voca]["vocaId"];
                modify_voca_native.appendChild(modify_voca_native_node);

                modify_voca_native.cols = 100;

                /* Create Update Button */
                var update_voca_button = document.createElement("button");
                var update_voca_button_node = document.createTextNode("UPDATE");
                update_voca_button.appendChild(update_voca_button_node);
                update_voca_button.id = "updatevoca" + response[voca]["vocaId"];
                update_voca_button.className += "btn btn-primary";
                update_voca_button.className += " class_dynamicbutton_update_voca";

                // update_voca_button.setAttribute('vocaInfo', response[voca]);
                update_voca_button.setAttribute('vocaId', response[voca]["vocaId"]);
                update_voca_button.setAttribute('vocaListId', response[voca]["vocaListId"]);
                update_voca_button.setAttribute('foreignVoca', response[voca]["foreignVoca"]);
                update_voca_button.setAttribute('nativeVoca', response[voca]["nativeVoca"]);

                /* Create Delete Button (Not implemented now) */
                var delete_voca_button = document.createElement("button");
                var delete_voca_button_node = document.createTextNode("DELETE");
                delete_voca_button.appendChild(delete_voca_button_node);
                delete_voca_button.id = "deletevoca" + response[voca]["vocaId"];
                delete_voca_button.className = "class_dynamicbutton_delete_voca";
                delete_voca_button.className = "btn btn-primary";


                /* Get Parent Elemnet and add child in parent */

                parent.appendChild(modify_voca_vocaid);
                parent.appendChild(modify_voca_foreign); parent.innerHTML += "<br>"
                parent.appendChild(modify_voca_native); parent.innerHTML += "<br>"
                parent.appendChild(update_voca_button);
                parent.appendChild(delete_voca_button);
            }
            
        },
        error: function(xhr) {
            console.log(xhr);
          //Do Something to handle error
        }
    });
}


function update_voca(p_vocaListId, p_vocaId, p_fVoca, p_nVoca){
    $.ajax({
        url: "http://182.227.118.59:8080/voca/update",
        type: "POST",
        header:{
            "Content-Type":"application/json",	//Content-Type 설정
            "X-HTTP-Method-Override":"POST"},
        dataType:"text",
        data:JSON.stringify({
            foreignVoca: p_fVoca,
            nativeVoca : p_nVoca,
            vocaListId : p_vocaListId,
            vocaId : p_vocaId
        }),
        contentType: "application/json"
    });
}
