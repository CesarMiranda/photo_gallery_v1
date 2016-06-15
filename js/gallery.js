	
var $gallery_modal = $("#gallery_modal");
var $close_modal = $("#close_modal");
var $gallery_img = $("#modal_img");
var $gallery_caption = $("#caption_img");
var $video_caption = $("#caption_video");

$("#gallery_container a").on("click", function(evt) {

	evt.preventDefault();

	var $img_path = $(this).attr("href");
	var $string = "youtube";
	// console.log($img_path);
	// console.log($img_path.indexOf($string));
	if($img_path.indexOf($string) > -1) {
		var $video_caption_text = $(this).children("img").attr("alt");
		$("#video_caption").show();
		$(".responsive-embed").show();
		$video_caption.text($video_caption_text);
		$gallery_img.hide();
		$("#caption_container").hide();
		var $video_name = $img_path.slice(30, 50);
		$("#video_modal").attr("src", $img_path);
		$("#video_val").val($video_name);
		console.log($video_name);
	} else {
		$gallery_img.show();
		$("#caption_container").show();
		var $caption_text = $(this).children("img").attr("alt");
		$gallery_img.attr("src", $img_path);
		$gallery_img.attr("alt", $caption_text);
		var $img_name_ext = $img_path.substr(($img_path.lastIndexOf("e")) +  1);
		var $img_name = Number($img_name_ext.slice(0, 2));
		$gallery_caption.text($caption_text);
		$("#video_caption").hide();
		$(".responsive-embed").hide();
		$("#gallery_val").val($img_name);

	}

	// console.log($img_name);

	$("#gallery_modal").fadeIn().show();
});

$($close_modal).on("click", function() {

	$gallery_modal.fadeOut();
});

$(".fa-angle-double-left").on("click", function() {

	prev();
	
});

$(".fa-angle-double-right").on("click", function() {

	next();
	
});

$(document).on("keydown", function(e) {
	switch(e.which) {
		
		case 27:
			$gallery_modal.fadeOut();
			break;
		case 37:
			prev();
			break;
		case 39:
			next();
			break;

		default: return; 
	}
	e.preventDefault();
});


var $caption = [
	"",
	"I love hay bales. Took this snap on a drive through the countryside past some straw fields.",
	"The lake was so calm today. We had a great view of the snow on the mountains from here.",
	"I hiked to the top of the mountain and got this picture of the canyon and trees below.",
	"It was amazing to see an iceberg up close, it was so cold but didn’t snow today.",
	"The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons.",
	"Fall is coming, I love when the leaves on the trees start to change color.",
	"I drove past this plantation yesterday, everything is so green!",
	"My summer vacation to the Oregon Coast. I love the sandy dunes!",
	"We enjoyed a quiet stroll down this countryside lane. ",
	"Sunset at the coast! The sky turned a lovely shade of orange.",
	"I did a tour of a cave today and the view of the landscape below was breathtaking.",
	"I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
];

$('#gallery_container img').each(function(){
	$(this).attr('data-search-term', $(this).attr("alt").toLowerCase());
});

$('#search').on('keyup', function(){

	var $searchTerm = $(this).val().toLowerCase();

    $('#gallery_container img').each(function(){

        if ($(this).filter('[data-search-term *= ' + $searchTerm + ']').length > 0 || $searchTerm.length < 1){
            $(this).fadeIn().show();

        } else {
            $(this).fadeOut();
        }

    });

});

function prev() {

	$("#modal_img_container").fadeOut(500, function() {

		var $prev_val = $("#gallery_val").val();
		$prev_val = Number($prev_val) - 1;
		console.log($prev_val);
		if($prev_val === 0) {

			$prev_val = 12;
			console.log($prev_val);
		}
		$gallery_img.attr("src", "Photos/image" + $prev_val + ".jpg");
		$gallery_img.attr("alt", $caption[$prev_val]);
		$gallery_caption.text($caption[$prev_val]);
		$("#gallery_val").val($prev_val);
	});
	$("#modal_img_container").fadeIn(500);
}

function next() {

	$("#modal_img_container").fadeOut(500, function() {

		var $next_val = $("#gallery_val").val();
		$next_val = Number($next_val) + 1;
		console.log($next_val);
		if($next_val == 13) {

			$next_val = 1;
			console.log($next_val);
		}
		$gallery_img.attr("src", "Photos/image" + $next_val + ".jpg");
		$gallery_img.attr("alt", $caption[$next_val]);
		$gallery_caption.text($caption[$next_val]);
		$("#gallery_val").val($next_val);
	});
	$("#modal_img_container").fadeIn(500);
}
