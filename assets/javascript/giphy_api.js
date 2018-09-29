var api_key = "5bca9XZR2OVrz32NOhg3qRrVN2d6pOND";

var url_host = "https://api.giphy.com";

var api_path_opt = {
    search_end: "/v1/gifs/search",
    trending: "/v1/gifs/tranding",
    sticker_search: "/v1/stickers/search",
    sticker_trending: "/v1/stickers/trending"
};

var apiurl = "";
var btn_data = "";

var btn_arry = ["Office Space","The Big Lebowski"];

var gif_animate = [];

function btn_add(){
    $("#btn-row").empty();
    for (var i = 0; i < btn_arry.length; i++)
    {
        var btn_add = $("<button>");
        btn_add.addClass("btn btn-primary srch-btn");
        btn_add.attr("id",btn_arry[i]);
        srch_valid(btn_arry[i]);
        btn_add.attr("data",btn_data);
        btn_add.text(btn_arry[i]);
        $("#btn-row").append(btn_add);
    }
}

function on_load(){
    btn_add();
}

on_load();

function srch_valid(btn_itm){
    btn_data = "";
    for(var i = 0; i < btn_itm.length; i++)
    {
        var btn_vld = btn_itm.substr(i,1);
        if(btn_vld == " ")
        {
            btn_data += "+";
        }
        else
        {
            btn_data += btn_vld;
        }
    }
    return btn_data;
}

$(document.body).on("click",".srch-btn", function(e) {
    console.log("response");
    // e.preventDefault();
    var srch_item = $(this).attr("data");
    var rtnnum = parseInt($("#rtn-num").val());
    console.log(rtnnum);
    $("#gif-area").empty();
    api_assmblr(srch_item, rtnnum);

    $.ajax({
        url: apiurl,
        method: "GET"
    })

    .then(function(response){
        console.log(response);
        console.log(response.data.length);

        for (var i=0; i < response.data.length; i++){
            var api_img_src  = response.data[i].images.downsized_still.url;
            var animate_api = response.data[i].images.downsized.url;

            var api_rating = response.data[i].rating;

            var gif_cont = $("<div>");
            gif_cont.addClass("giffy");
            gif_cont.attr("id",i);
            $("#gif-area").append(gif_cont);

            var gif_rating = $("<div>");
            gif_rating.addClass("rating");
            gif_rating.text("Rating: " + api_rating);
            gif_cont.append(gif_rating);

            var rst_img = $("<img>");
            rst_img.attr("src",api_img_src);
            rst_img.attr("animate", animate_api);
            rst_img.attr("org",api_img_src);
            rst_img.attr("state","still");
            rst_img.addClass("gifimg");
            gif_cont.append(rst_img);
        }
    });
});

function api_assmblr(btn_id,rtn){
    if (isNaN(rtn))
    {
        rtn = 5;
    }
    apiurl = url_host + api_path_opt.search_end + "?q=" + btn_id + "&api_key=" + api_key + "&limit=" + rtn;
    // apiurl = "https://api.giphy.com/v1/gifs/search?q=Office+Space&api_key=5bca9XZR2OVrz32NOhg3qRrVN2d6pOND&limit=5"
    console.log(apiurl);
}

$("#submit").on("click", function(e) {
    e.preventDefault();
    var usr_entry = $("#btn-frm").val().trim();
    btn_arry.push($("#btn-frm").val().trim());
    console.log(usr_entry);
    btn_add();
});

$(document.body).on("click",".gifimg", function() {
    var gif_state = $(this).attr("state");

    if(gif_state == "still")
    {
        $(this).attr("state","animate");
        $(this).attr("src",$(this).attr("animate"));
    }
    else if (gif_state == "animate")
    {
        $(this).attr("state","still");
        $(this).attr("src", $(this).attr("org"));
    }
});