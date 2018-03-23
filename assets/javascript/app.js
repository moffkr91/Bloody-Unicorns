$( document ).ready(function () {

    let corsProxy = "https://cors-anywhere.herokuapp.com/"
    let apiUrl = "https://accounts.spotify.com/api/token";
    let url = corsProxy + apiUrl;
    let client_secret = window.btoa("8656bed3d70344f2a82c8a2af92c98ba:17d848d816c242508e6b36ab7be1125d")
    let current_token
    let user_input
    
    $.ajax({
        type: 'POST',
        url: url,
        headers: { 'Authorization': 'Basic ' + client_secret },
        data: { grant_type: 'client_credentials' },
        dataType: 'json'
        }).then(function(request_auth) {
        //console.log('success', request_auth)
        current_token = request_auth.access_token
    });
    function success(request_auth){
    $("#test-display").text()
    }

    ///Call to search
    $("#submit").on("click", function(){
        event.preventDefault()
        $(".table_rows").remove()
        user_input = $("#search-form").val().trim()
        final_input = user_input
        //console.log(final_input)
    $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/search',
        headers: { 'Authorization': 'Bearer ' + current_token },
        data: {
            q: final_input,
            type: 'album',
        },
        dataType: 'json',
        limit: 1,
    }).then(function(search){
        console.log(search)
        console.log(search.albums)
for (i=0; i<5; i++) {
        let art_url = search.albums.items[i].images[2].url
        let artist = search.albums.items[i].artists["0"].name
        let album_name = search.albums.items[i].name
        let album_id = search.albums.items[i].id
        let new_row = `<tr class="table_rows" id="`+album_id+","+artist+`"> <td><img src="`+art_url+`"></td> <td>`+artist+`</td> <td>`+album_name+`</td> </tr>`
        $("#display-info").append(new_row)
        }
    }); 
    $("#search-form").val("")
})

$("#display-info").on("click", "tr", function(){
    $(".table_rows2").remove()
    let track_info = $(this).attr("id").split(",")
    let album_id = track_info[0]
    let artist_name = track_info[1]
    $.ajax({
        type: 'GET',
        url: "https://api.spotify.com/v1/albums/"+album_id+"/tracks",
        headers: { 'Authorization': 'Bearer ' + current_token },
        dataType: 'json',
        limit: 1,
    }).then(function(album_tracks){
        for (i=0; i<album_tracks.items.length; i++) {
        let new_row = `<tr class="table_rows2" id="`+artist_name+`"> <td>`+album_tracks.items[i].name+`</td> </tr>`
        $("#display-songs").append(new_row)
        }
    }); 
})

$("#display-songs").on("click", "tr", function(){
    console.log($(this).text().trim())
    console.log($(this).attr("id"))


})




//
 })