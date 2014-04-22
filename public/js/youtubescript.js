function singleSong(songId) {
    $.getJSON('http://gdata.youtube.com/feeds/api/videos/' + songId + '?v=2&alt=jsonc',
            function(data, status) {
                if (data) {
                    var video_id = data.data.id;
                    var video_title = data.data.title;
                    var video_length = data.data.duration;
                    var video_frame = "<iframe width='340' height='200' src='http://www.youtube.com/embed/" + video_id + "' frameborder='0' type='text/html'></iframe>";
                    var final = "<div id='result'><div>" + video_frame + "</div><div id='title'>" + video_title + "<br>" + video_length + "</div></div>";
                    $("#video").append(final);
                } else {

                }

            });
}





//    
//    $.get(url, {dataType:'xml'}, function(data, status) {
//        if (data) {
//            console.log(data);
//            
////                var video_id = $('entry', xml).find('media:group').find('yt:videoid').text();
////                alert(video_id);
////                var video_title = $('entry', xml).find('media:group').find('media:title').text();
////                var video_length = $('entry', xml).find('media:group').find('yt:duration').text();
////                var video_frame = "<iframe width='340' height='200' src='http://www.youtube.com/embed/" + video_id + "' frameborder='0' type='text/html'></iframe>";
////                var final = "<div id='result'><div>" + video_frame + "</div><div id='title'>" + video_title + " " + video_length + "</div></div>";
////                $("#video").append(final);
//            
//        }
//        else {
//
//        }
//
//
//
//
//
//    }); //end ajax   




//    $.ajax({
//        type: "GET",
//        url: url,
//        dataType: "jsonp",
//        success: function(data, status) {
//            if (data) {
//                var vidID = $('entry', data).find('id').text();
//                alert(vidID);
//                var video_id = data.id;
//                var video_title = data.title;
//                var video_length = data.duration / 60;
//                var video_frame = "<iframe width='340' height='200' src='http://www.youtube.com/embed/" + video_id + "' frameborder='0' type='text/html'></iframe>";
//                var final = "<div id='result'><div>" + video_frame + "</div><div id='title'>" + video_title + " " + video_length + "</div></div>";
//                $("#video").append(final);
//            }
//            else
//            {
//                $("#video").html("<div id='no'>No Video</div>");
//            }
//        }
//
//    });
//}

//gnhJ4Ceor_M



function oncl() {
    $("#search_results").html('');
    var search_input = $('#searsh_tube').val();
    var keyword = encodeURIComponent(search_input);
    var yt_url = 'http://gdata.youtube.com/feeds/api/videos?q=' + keyword + '&format=5&max-results=6&v=2&alt=jsonc';
    $.ajax({
        type: "GET",
        url: yt_url,
        dataType: "jsonp",
        success: function(response) {
            if (response.data.items) {
                $.each(response.data.items, function(i, data) {
                    var video_id = data.id;
                    var video_title = data.title;
                    var video_length = data.duration / 60;
                    var video_frame = "<iframe width='340' height='200' src='http://www.youtube.com/embed/" + video_id + "' frameborder='0' type='text/html'></iframe>";
                    var final = "<div id='result'><div>" + video_frame + "</div><div id='title'>" + video_title + " " + video_length + "<br>" + video_id + "</div></div>";
                    $("#video").append(final);
                });
            }
            else
            {
                $("#video").html("<div id='no'>No Video</div>");
            }
        }

    });
//        });
//
//
//    });
}
