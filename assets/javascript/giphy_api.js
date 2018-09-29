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

var btn_arry = ["Office Space"];

function btn_add(){
    for (var i = 0; i < btn_arry.length; i++)
    {
        var btn_add = $("<button>");
        btn_add.addClass("btn btn-primary");
        btn_add.attr("id","srch-btn");
        srch_valid(btn_arry[i]);
        btn_add.attr("data",btn_data);
        btn_add.text(btn_arry[i]);
        $("#btn-row").append(btn_add);
    }
}

btn_add();

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

$("#srch-btn").on("click", function() {
    var srch_item = $(this).attr("data");
    $("#gif-area").empty();
    api_assmblr(srch_item);

    $.ajax({
        url: apiurl,
        method: "GET"
    })

    .then(function(response){
        console.log(response.data[1].images.original.url);
        console.log(response.data.length);

        for (var i=0; i < response.data.length; i++){
            var api_img_src  = response.data[i].images.original.url;

            var rst_img = $("<img>");
            rst_img.attr("src",api_img_src);
            $("#gif-area").append(rst_img);
        }
    });
});

function api_assmblr(btn_id){
    apiurl = url_host + api_path_opt.search_end + "?q=" + btn_id + "&api_key=" + api_key + "&limit=5";
    console.log(apiurl);
}