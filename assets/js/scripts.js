jQuery(document).ready(function($) {
	//////////////////////////// menu navegacao
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

	var posicaoFooter = $('.wraprodape').offset().top;
	var botaoImprimir = $('#salvarpagina');

	var scrollAtual = janela.scrollTop();

	janela.on('scroll', function(event) {
		var thisScroll = $(this).scrollTop();

		if (thisScroll > $('.wraprodape').offset().top - $(this).outerHeight()) {
			botaoImprimir.addClass('fimrolagem');
		} else {
			botaoImprimir.removeClass('fimrolagem');
		}

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
	
	//////////////////////////// FIGURAS
	var figuras = $('article figure');
	figuras.on('click', function(event) {
		$(this).toggleClass('maior');
	});

	//////////////////////////// TIMELINE
	var timeline = $('.timeline');

	if (timeline.length > 0) {

		var containerTextos = timeline.find('.textos');
		var scrollerTextos = containerTextos.find('.scroller');
		var tablesTextos = scrollerTextos.find('table.item');
		var containerBotoes = timeline.find('.tempos');
		var scrollerBotoes = containerBotoes.find('.scroller');
		var timelineBotoes = scrollerBotoes.find('button');

		var tempoAtual = 0;

		var crossBrowserTransform = function(valor){
			return {
				'-webkit-transform': valor,
				    '-ms-transform': valor,
				        'transform': valor
			};
		}
		
		var atualizarTempo = function(){
			var botaoAtual = timelineBotoes.eq(tempoAtual);
			timelineBotoes.removeClass('ativo traco-ativo');
			botaoAtual.addClass('ativo');
			var posScrollerBt = scrollerBotoes.width()/2 - botaoAtual.position().left - botaoAtual.outerWidth()/2 ;
			scrollerBotoes.css(crossBrowserTransform('translateX('+posScrollerBt+'px)'));

			for(i = 0; i < tempoAtual; i++){
				timelineBotoes.eq(i).addClass('traco-ativo');
			}

			var textoAtual = tablesTextos.eq(tempoAtual);
			tablesTextos.removeClass('ativo');
			textoAtual.addClass('ativo');
			var posScrollerTexto = scrollerTextos.width()/2 - textoAtual.position().left - textoAtual.outerWidth()/2 ;
			scrollerTextos.css(crossBrowserTransform('translateX('+posScrollerTexto+'px)'));
		}

		timelineBotoes.on('click', function(event) {
			tempoAtual = timelineBotoes.index($(this));
			atualizarTempo();
		});

		atualizarTempo();
	}

});