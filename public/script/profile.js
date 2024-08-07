function doPrev(fileCtrl, imgPrev) {
    let [file] = fileCtrl.files
    if (file) {
        imgPrev.src = URL.createObjectURL(file)
    }
}
$(document).ready(function () {

    $("#btnlogout").click(function(){

        localStorage.removeItem("activeuser");
        location.href="index.html";
        
    })

    let active=localStorage.getItem("activeuser");
    $("#inputEmail").val(active).prop("readonly",true);
    
    $("#inputEmail").blur(function () {
        if ($(this).val() == "") {
            $("#errEmail").html("");
            return;
        }

        let obj = {
            type: "get",
            url: "/check-user-existance",
            data: {
                txtEmail: $("#inputEmail").val()
            }
        }
        $.ajax(obj).done(function (resp) {
            //alert(resp)
            $("#errEmail").html(resp);

        }).fail(function (err) {
            alert(err.statusText);
        })

    })


    $("#btnsearch").click(function () {
        let obj = {
            type: "get",
            url: "/search-process",
            data: {
                txtemail: $("#inputEmail").val(),
            }
        }
        $.ajax(obj).done(function (jsonAry) {


            if (jsonAry.length == 0) {
                alert("Invalid User Id");
                $("#update").prop("disabled",true);
                $("#save").prop("disabled",false);
                return;
            }
            else {
                $("#update").prop("disabled",false);
                $("#save").prop("disabled",true);
                // alert(JSON.stringify(jsonAry));
                $("#inputEmail").val(jsonAry[0].email);//table colu. wala
                $("#inputname").val(jsonAry[0].iname);//table colu. wala
                $("#prev").prop("src", "uploads/" + jsonAry[0].picpath);
                $("#gender").val(jsonAry[0].gender);
                $("#inputdob").val(jsonAry[0].dob.split('T')[0]);
                $("#inputAddress").val(jsonAry[0].address);
                $("#inputCity").val(jsonAry[0].city);
                $("#contactno").val(jsonAry[0].contact);
                $("#instaid").val(jsonAry[0].insta);
                $("#fbid").val(jsonAry[0].fb);
                $("#ytid").val(jsonAry[0].youtube);
                $("#otherinfo").val(jsonAry[0].others);
                $("#hdn").val(jsonAry[0].picpath);
                $("#field").val(jsonAry[0].field.split(','));


                // var items = ;
                //     var fieldSelect = document.getElementById("field");
                //     items.forEach(item => {
                //         for (let i = 0; i < fieldSelect.options.length; i++) {
                //             if (fieldSelect.options[i].value.trim() === item.trim()) {
                //                 fieldSelect.options[i].selected = true;
                //             }
                //         }
                //     });


            }

        }).fail(function (err) {
            alert(err.statusText);
        })
    })
})
