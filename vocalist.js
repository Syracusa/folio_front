// var oFileIn;

// $(function() {
//     oFileIn = document.getElementById('my_file_input');
//     console.log(oFileIn);
//     if(oFileIn.addEventListener) {
//         oFileIn.addEventListener('click', filePicked, false);
//     }
// });


// function filePicked(oEvent) {
//     console.log(oEvent);
//     // Get The File From The Input
//     var oFile = oEvent.target.files[0];
//     var sFilename = oFile.name;
//     // Create A File Reader HTML5
//     var reader = new FileReader();

//     // Ready The Event For When A File Gets Selected
//     reader.onload = function(e) {
//         var data = e.target.result;
//         var cfb = XLS.CFB.read(data, {type: 'binary'});
//         var wb = XLS.parse_xlscfb(cfb);
//         // Loop Over Each Sheet
//         wb.SheetNames.forEach(function(sheetName) {
//             // Obtain The Current Row As CSV
//             var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);   
//             var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);   

//             $("#my_file_output").html(sCSV);
//             console.log(oJS)
//         });
//     };

//     // Tell JS To Start Reading The File.. You could delay this if desired
//     reader.readAsBinaryString(oFile);
// }

function parse_vocalist_from_file(){
    var reader = new FileReader();
    reader.onload = (function(reader){
        return function(){
            var contents = reader.result;
            console.log(contents);
        }
    })(reader);

    oFileIn = document.getElementById('my_file_input').files[0];
    console.log(reader.readAsText(oFileIn));
}

function update_vocalist(p_vocaListId) {

    $.ajax({
        url: "http://182.227.118.59:8080/voca/list/id",
        type: "get", //send it through get method
        data: {
            vocaListId: p_vocaListId
        },
        success: function (response) {

            current_voca_list = JSON.parse(JSON.stringify(response));
            current_voca_idx = -1;
            current_vocalist_id = p_vocaListId;
            show_next_voca();

            // const studylist = document.getElementById("sub_study");
            // while (studylist.firstChild) {
            //     studylist.removeChild(studylist.lastChild);
            //   }

            //   for (voca in response){
            //       var para = document.createElement("h5");
            //       para.id = "vocaid" + response[voca]["vocaId"];
            //       var node = document.createTextNode(response[voca]["nativeVoca"] + "     " + response[voca]["foreignVoca"]);
            //       para.appendChild(node);

            //       studylist.appendChild(para);
            //   }

        },
        error: function (xhr) {
            console.log(xhr);
            //Do Something to handle error
        }
    });
}

function delete_vocalist_by_id(p_vocaListId) {
    console.log("delete_vocalist_by_id" + p_vocaListId);
    $.ajax({
        url: "http://182.227.118.59:8080/voca_list/id",
        type: "delete", //send it through delete method
        header: {
            "Content-Type": "application/json",	//Content-Type 설정
            "X-HTTP-Method-Override": "DELETE"
        },
        data: JSON.stringify({
            vocaListId: p_vocaListId
        }),
        contentType: "application/json"

    });
}


function update_vocalist_list() {
    $.ajax({
        url: "http://182.227.118.59:8080/voca_list",
        type: "get",
        success: function (response) {
            console.log(response);
            const parent = document.getElementById("sub_select_vocalist");

            /* Get Parent Elemnet and delete old child */
            while (parent.firstChild) {
                parent.removeChild(parent.lastChild);
            }

            for (vocalist in response) {

                var one_vocalist = document.createElement("div");
                one_vocalist.className = "card vocalist_div"

                var one_vocalist_cardbody = document.createElement("div");
                one_vocalist_cardbody.className = "card-body card-body-vli";
                one_vocalist.appendChild(one_vocalist_cardbody);

                /* Create p element with textnode that has vocalist name */
                var vl_name = document.createElement("h5");
                vl_name.className = "card-title card-title-lowmargin"
                vl_name.id = "listid" + response[vocalist]["vocaListId"];
                var node = document.createTextNode(response[vocalist]["vocaListName"]);
                vl_name.appendChild(node);

                var vocalist_info = document.createElement("p");
                var vocalist_info_textnode = document.createTextNode(
                    "" + response[vocalist]["vocaNum"]
                    + " Voca, " + response[vocalist]["studyNum"] + " Studied");
                vocalist_info.appendChild(vocalist_info_textnode);
                vocalist_info.className = "card-text card-text-lowmargin"

                /* Create Button Vocalist Study Start */
                var buttonpara = document.createElement("a");
                var buttonnode = document.createTextNode("Study now");
                buttonpara.appendChild(buttonnode);
                buttonpara.id = "listbuttonid" + response[vocalist]["vocaListId"];
                buttonpara.className = "class_dynamicbutton_study_vocalist btn btn-outline-danger d-grid gap-2";
                buttonpara.setAttribute('vocaListId', response[vocalist]["vocaListId"]);

                /* Create Button Vocalist Modify */
                var modify_vocalist_button = document.createElement("a");
                var modify_vocalist_button_node = document.createTextNode("Modify this");
                modify_vocalist_button.appendChild(modify_vocalist_button_node);
                modify_vocalist_button.id = "listmodifyid" + response[vocalist]["vocaListId"];
                modify_vocalist_button.className = "class_dynamicbutton_modify_vocalist card-link cl-btn-vli";
                modify_vocalist_button.setAttribute('vocaListId', response[vocalist]["vocaListId"]);

                /* Create Button Vocalist delete */
                var delete_vocalist_button = document.createElement("a");
                var delete_vocalist_button_node = document.createTextNode("Delete this");

                delete_vocalist_button.appendChild(delete_vocalist_button_node);
                delete_vocalist_button.id = "listdeleteid" + response[vocalist]["vocaListId"];
                delete_vocalist_button.className = "class_dynamicbutton_delete_vocalist card-link cl-btn-vli";
                delete_vocalist_button.setAttribute('vocaListId', response[vocalist]["vocaListId"]);

                var vocalist_card_footer = document.createElement("div");
                vocalist_card_footer.className = "card-footer text-muted vli-card-footer";
                vocalist_card_footer.appendChild(modify_vocalist_button);
                vocalist_card_footer.appendChild(delete_vocalist_button);

                /* div element to add elements */
                one_vocalist_cardbody.appendChild(vl_name);
                one_vocalist_cardbody.appendChild(vocalist_info);
                // one_vocalist_cardbody.appendChild(modify_vocalist_button);
                // one_vocalist_cardbody.appendChild(delete_vocalist_button);
                one_vocalist_cardbody.appendChild(buttonpara);
                one_vocalist.appendChild(vocalist_card_footer);


                /* add to parent element */
                parent.appendChild(one_vocalist);

            }



        },
        error: function (xhr) {
            console.log(xhr);
            //Do Something to handle error
        }
    });
}