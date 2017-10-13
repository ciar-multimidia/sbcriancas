jQuery(document).ready(function($) {
	$(".menu").click(function() {
	  $(".navegacao").toggleClass('mostra');
	  $(this).toggleClass('ativo');

	  if ($(".overlay").length > 0) {
  		$(".overlay").remove();
  		$('body,html').css('overflow-y', 'auto');
	  } else {
	  	$('body').append('<div class="overlay"></div>').css('overflow-y', 'hidden');
	  	$('html').css('overflow-y', 'hidden');
		$('.overlay').click(function() {
			$(".navegacao").removeClass('mostra');
			$(this).remove();
			$('.menu').removeClass('ativo');
			$('body,html').css('overflow-y', 'auto');
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
				$(".navegacao").removeClass('fixar');
			} else{
				menufixo.addClass('dn');
			}
		} else if (thisScroll < scrollAtual){
			if (thisScroll > menu_bottom - menufixoheight) {
				menufixo.addClass('visivel');
				$(".navegacao").addClass('fixar');
			} else{
				menufixo.removeClass('visivel').addClass('dn');
				$(".navegacao").removeClass('fixar');
			}
		}
		scrollAtual = thisScroll;
	});

});