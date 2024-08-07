

$(document).ready(function () {

    $("#pwd").keyup(function() {
        let pw=$("#pwd").val();
        if (pw=="") {
            $("#signpwderr").html("");
            return;
        }
    
        var rgx = [
            /.{6,}/,
            /[A-Z]/,
            /[a-z]/,
            /[0-9]/, 
            /[@#$&*^%!+=\/\\[\]|?.,<>)(;:'"~`]/
        ];
    
        for (var i = 0; i < rgx.length; i++) {
            if (rgx[i].test(pw) === false) {
                $("#signpwderr").html("pls fill strong password");
                return;
            }
        }

        $("#signpwderr").html("*");
                
    })

    $("#signup").click(function () {

        if($("#txtemail").val()=="" ||  $("#pwd").val()=="" || $("#type").find('option:selected').text()==""){
            $("#erronsignup").html("  please fill all the boxes");
            return;
        }

        let obj = {
            type: "get",
            url: "/signup-process",
            data: {
                txtemail: $("#txtemail").val(),
                pwd: $("#pwd").val(),
                type: $("#type").find('option:selected').text(),
            }
        }
        $.ajax(obj).done(function (resp) {
            $("#erronsignup").html(" "+resp);
            // alert(resp);

        }).fail(function (err) {
            alert(err.statusText);
        })
    })
    $("#login").click(function () {

        if($("#loginemail").val()==""||$("#loginpwd").val()==""){
            $("#loginerr").html("pls fill the email id and password")
            return;
        }

        let obj = {
            type: "get",
            url: "/login-process",
            data: {
                loginemail: $("#loginemail").val(),
                loginpwd: $("#loginpwd").val(),
            }
        }
        $.ajax(obj).done(function (resp) {
            // alert(resp);
            if(resp=="Influencer"){
                localStorage.setItem("activeuser",$("#loginemail").val());
                location.href="infl-desh.html";
            }
            else if(resp=="Collaborator"){
                
                localStorage.setItem("activeuser",$("#loginemail").val());
                location.href="client-dash.html";
            }
            else{
                alert(resp);
            }
            $("#loginerr").html("")

        }).fail(function (err) {
            alert(err.statusText);
        })
    })

})
