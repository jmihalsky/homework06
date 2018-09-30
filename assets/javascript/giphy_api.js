// api key
var api_key = "5bca9XZR2OVrz32NOhg3qRrVN2d6pOND";
// start of API url
var url_host = "https://api.giphy.com";
// api options for gif or stickers.
var api_path_opt = {
    search_end: "/v1/gifs/search",
    trending: "/v1/gifs/tranding",
    sticker_search: "/v1/stickers/search",
    sticker_trending: "/v1/stickers/trending"
};

// global variables for apiurl and buttons
var apiurl = "";
var btn_data = "";

// starting button array
var btn_arry = ["Office Space","The Big Lebowski","Clerks","Space Balls","Otters","Rams"];

var gif_animate = [];

// create buttons dynamically
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
// initial button load
function on_load(){
    btn_add();
}

on_load();

// check for spaces in the search button items and replace it with a + for use in the API
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

// search button click event to perform AJX call and get data which is formated for the DOM.
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
            var api_img_src  = response.data[i].images.fixed_width_still.url;
            var animate_api = response.data[i].images.original.url;

            var api_rating = response.data[i].rating;

            var gif_cont = $("<div>");
            gif_cont.addClass("giffy");
            gif_cont.attr("id",i);
            $("#gif-area").append(gif_cont);

            var rst_img = $("<img>");
            rst_img.attr("src",api_img_src);
            rst_img.attr("animate", animate_api);
            rst_img.attr("org",api_img_src);
            rst_img.attr("state","still");
            rst_img.addClass("gifimg");
            gif_cont.append(rst_img);

            var gif_rating = $("<div>");
            gif_rating.addClass("rating");
            gif_rating.text("Rating: " + api_rating);
            gif_cont.append(gif_rating);
        }
    });
});

// API URL assembly based on what options are selected
function api_assmblr(btn_id,rtn){
    var api_path = "";

    if (isNaN(rtn))
    {
        rtn = 10;
    }

    if ($("input[name=srchtype]:checked").attr("id") == "gif")
    {
        api_path = api_path_opt.search_end;
    }
    else if ($("input[name=srchtype]:checked").attr("id") == "sticker")
    {
        api_path = api_path_opt.sticker_search;
    }
    else
    {
        api_path = api_path_opt.search_end;
    }
    apiurl = url_host + api_path + "?q=" + btn_id + "&api_key=" + api_key + "&limit=" + rtn;
    // apiurl = "https://api.giphy.com/v1/gifs/search?q=Office+Space&api_key=5bca9XZR2OVrz32NOhg3qRrVN2d6pOND&limit=5"
    // console.log(apiurl);
}

// Add mew search buttons
$("#submit").on("click", function(e) {
    e.preventDefault();
    var usr_entry = $("#btn-frm").val().trim();
    btn_arry.push($("#btn-frm").val().trim());
    // console.log(usr_entry);
    btn_add();
    $("#btn-frm").val("");
});

// change returned gifs or stickers to animated or back to a small still.
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