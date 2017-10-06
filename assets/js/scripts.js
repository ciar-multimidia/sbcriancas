jQuery(document).ready(function($) {
	$(".menu").click(function() {
	  $("nav").toggleClass('mostra');
	  $(this).toggleClass('ativo');

	  if ($(".overlay").length > 0) {
  		$(".overlay").remove();
  		$('body').css('overflow', 'auto');
	  } else {
	  	$('body').append('<div class="overlay"></div>').css('overflow', 'hidden');
		$('.overlay').click(function() {
			$("nav").removeClass('mostra');
			$(this).remove();
			$('.menu').removeClass('ativo');
			$('body').css('overflow', 'auto');
		});
	  }
	});

	var menufixo = $('.wraptopo.fixo');
	var janela = $(window);
	var menufixoheight = menufixo.height();

	var menu = $('.wraptopo').eq(0);
	var menu_top = menu.offset().top;
	var menu_bottom = menu_top+menu.outerHeight();
	console.log(menu_bottom);

	var scrollAtual = janela.scrollTop();

	janela.on('scroll', function(event) {
		var thisScroll = $(this).scrollTop();
		if (thisScroll > scrollAtual) {
			if (thisScroll > menu_bottom - menufixoheight) {
				menufixo.removeClass('dn visivel');
				$("nav").removeClass('fixar');
			} else{
				menufixo.addClass('dn');
			}
		} else if (thisScroll < scrollAtual){
			if (thisScroll > menu_bottom - menufixoheight) {
				menufixo.addClass('visivel');
				$("nav").addClass('fixar');
			} else{
				menufixo.removeClass('visivel').addClass('dn');
				$("nav").removeClass('fixar');
			}
		}
		scrollAtual = thisScroll;
	});

});