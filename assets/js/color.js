jQuery(document).ready(function($) {
	
	// Color Changer
	$("#preset1" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/orange.css" );
		return false;
	});
	$("#preset2" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/purple.css" );
		return false;
	});
	$("#preset3" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/red.css" );
		return false;
	});
	$("#preset4" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/violet.css" );
		return false;
	});
	$("#preset5" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/blue.css" );
		return false;
	});
	$("#preset6" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/golden.css" );
		return false;
	});
	$("#preset7" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/magenta.css" );
		return false;
	});
	$("#preset8" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/yellowgreen.css" );
		return false;
	});
	$("#preset9" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/green.css" );
		return false;
	});
	$("#preset10" ).click(function(){
		$("#style-switch").attr("href", "assets/css/colors/yellow.css" );
		return false;
	});

});

/* ----------------------------------------------------------- */
  /*  Style Switcher
  /* ----------------------------------------------------------- */
  $(document).ready(function () {
	$('.style-switch-button').click(function () {
	  $('.style-switch-wrapper').toggleClass('active');
	});
	$('a.close-styler').click(function () {
	  $('.style-switch-wrapper').removeClass('active');
	});
  });
