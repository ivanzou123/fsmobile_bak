$(document).ready(function($) {


	$(window).bind('orientationchange', function(e){
		resize_swiper();
	});
	$(window).resize(function(event) {
		resize_swiper();
	});

	//tabs
	$('.tabs > li').click(function(){
		
		if ($(this).find('a').attr('href').toString().indexOf('#') > -1) {
			var curr_aid = '#'+$(this).find('a').attr('href').split('#')[1];
			var aid;
			$('.tabs').find('a').each(function() {
				aid = '#' + this.href.split('#')[1];
				aid == curr_aid ? $(aid).show() : $(aid).hide();
			});
			$(this).addClass('active').siblings().removeClass('active');
			return false;
		}		
	});

	//anchor tabs
	$('.anch > li').click(function(){
		
		if ($(this).find('a').attr('href').toString().indexOf('#') > -1) {
			var curr_aid = '#'+$(this).find('a').attr('href').split('#')[1];
			var aid;
			$('.anch').find('a').each(function() {
				aid = '#' + this.href.split('#')[1];
				aid == curr_aid ? $(aid).show() : $(aid).hide();
			});
			$(this).addClass('active').find('.fa-circle-o').removeClass('fa-circle-o').addClass('fa-circle');
			$(this).siblings().removeClass('active').find('.fa-circle').removeClass('fa-circle').addClass('fa-circle-o');
			return false;
		}
	});


	//images preview
	$('.preview > a').click(function(event) {
		/* Act on the event */	
		window.location.href = 'images-preview.html?src='+$(this).attr('href');
		return false;	
	});
	

	$('nav').height($(window).height()-51);

	$('#show').click(function(e) {
		stopPropagation(e);
		if ($('nav').hasClass('sidebar-open')) $('nav').removeClass('sidebar-open').addClass('sidebar-close');
		else $('nav').removeClass('sidebar-close').addClass('sidebar-open');
	});

	$(document).click(function(e) {
		//alert('a');
		if ($('nav').hasClass('sidebar-open')) $('nav').removeClass('sidebar-open').addClass('sidebar-close');
	});
	$('nav').click(function(e) {
		/* Act on the event */
		stopPropagation(e);
	});

	$('.list-view-form').find('input, textarea').focus(function(event) {

		$(this).parent().addClass('focus');
	}).blur(function(event) {

		$(this).parent().removeClass('focus');
	});
	

	
});
function reminder(msg){

	var str = '<div id="reminder">' + msg + '</div>';
	if ($('#reminder').length <= 0) $('body').append(str);
	$('#reminder').css('margin-left',-($('#reminder').outerWidth()/2));
	$('#reminder').fadeIn('slow', function(){
		setTimeout(function(){
			$('#reminder').fadeOut('slow', function(){
				$('#reminder').remove();
			});
		}, 3000);
	});
}
window.onload = function() {
	/* Act on the event */
	resize_swiper();
};
function resize_swiper(){

	var sh = $('.swiper-container').find('img').height();
	$('.swiper-container').height(sh).parent().height(sh);
}
function stopPropagation(e) {
	if (e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;
}