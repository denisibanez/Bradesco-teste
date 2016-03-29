/**categorias**/
$(function() {
  /**
  * Atribui o evento click ao link #options a
  * Ao disparar o evento, é executado uma função anônima
  */
  $("#options a").click(function() {
    /**
    * Definimos uma variavel, que recebe
    * O valor do atributo rel
    */
    var type = $(this).attr('rel');
    /**
    * Verificamos se o valor do rel
    * é diferente de all
    */
    if(type !== 'all'){
      /**
      * Aqui selecionamos os itens que tem a classe
      * igual do atributo rel
      * Usamos o animate, para criar animação em atributos do CSS
      * que no caso é a largura, e opacidade.
      * No caso, se tiver oculto, definimos com largura com valor 150,
      * opacidade valor 1
      **/
      $("#items li."+type).animate({'width' : 219, 'opacity' : 1});
      /**
      * Aqui fazemos a mesma seleção, sendo usando :not,
      * assim vamos selecionar os itens, que forem direrente
      * do valor do atributo rel
      * Usamos o animate, para definir o valor de largura como 0, e opacidade 0
      */
      $("#items li:not(."+type+")").animate({'width' : 0, 'opacity' : 0});
    }else{
      /**
      * Caso o atributo rel do link clicado for all
      * ele vai exibir todos os itens novamente
      * definimos a largura, e a opacidade como 1
      */
      $("#items li").animate({'width' : 219, 'opacity' : 1});
    }
    /**
    * Retorna como false, anular a ação padrão do link
    */
    return false;
  });
});

/**menu**/
(function ($) {

  "use strict";

  /**
  * Configurações
  */
  var button = '#slidx_button', //Elemento en el que pulsamos para abrir y cerrar el menÃº.
  menu = '#slidx_menu', //Elemento que contiene el menÃº responsive.
  mode = 'click', //Escribe 'click' o 'hover' si quieres que se abra en menÃº al pulsar el botÃ³n o al pasar por encima de Ã©l.
  side = 'right', //Indica de que lado estÃ¡ el menÃº ('right' o 'left')
  buttonMove = true, //Indica si quieres que tambiÃ©n se mueva el botÃ³n cuando abres el menÃº en modo 'click' (true o false)
  shadow = true, //Indica si se crea una sombra en el resto de la pÃ¡gina, cuando se abre el menÃº (true o false)
  opacity = 0.3, //Opacidad de la sombra que se crea en el resto de la pÃ¡gina con el menÃº abierto. (0=transparente 1=opaco)
  size = 250, //Ancho del menÃº.
  speed = 0.5, //Velocidad de apertura y cierre (en s.)
  normalTime = 0, //Tiempo que tarda el menÃº en abrirse/cerrarse cuando pulsamos el botÃ³n (en ms. recomendable dejar en 0).
  menuTime = 300, //Tiempo que tarda el menÃº en cerrarse cuando pulsamos un elemento dentro del menu (en ms.).
  marginTop = 0,
  menuTop = 0, //Espaciado entre la parte superior del menÃº y la parte superior de la pantalla (en px. por defecto = 0)
  menuBottom = 0, //Espaciado entre la parte inferior del menÃº y la parte inferior de la pantalla (en px. por defecto = 0)
  zIndexMenu = 98, //z-index del menÃº (el botÃ³n lleva 1 nÃºmero menos al nÃºmero que introduzcas, y la sombra, 2 menos.)
  height = 1827,
  overflow = false,
  //Otras variables. (No toques esto, si no sabes lo que haces)
  slidxOpen = "slidx_open",
  slidxShadow = "slidx_shadow",
  slidxShadowID = '#' + slidxShadow,
  zIndexButton = zIndexMenu - 1,
  zIndexShadow = zIndexMenu - 2,
  speedM = speed * 1000;

  //------------------------------  ESTILOS CSS  -------------------------------//
  //Estilo Padrão

  if (buttonMove == true) {
    $(button).css({
      'position': 'fixed',
      'top': 0,
      'transition': speed + 's',
      'z-index': zIndexButton,
    });

    if (side == 'right') {
      $(button).css({
        'right': 0,
      })
    }

    if (side !== 'right') {
      $(button).css({
        'left': 0,
      })
    }
  }

  //AÃ±adimos los  estilos bÃ¡sicos por defecto al menÃº.
  $(menu).css({
    'position': 'fixed',
    'top': menuTop + 'px',
    'bottom': menuBottom + 'px',
    'margin-top': marginTop,
    'width': size + 'px',
    'max-width': '100%',
    'overflow-y': 'auto',
    'transition': speed + 's',
    'z-index': zIndexMenu,
  });

  //Si es derecho
  if (side == 'right') {
    $(menu).css({
      'right': '-' + size + 'px',
    })
  }

  //Si es izquierdo
  if (side !== 'right') {
    $(menu).css({
      'left': '-' + size + 'px',
    })
  }

  //------------------------------  FUNCIONES  -------------------------------//
  //Ã‰sta es la funciÃ³n que abre el menÃº.
  function open() {

    if (side == 'right') {

      $(menu).animate({
        right: 0,
      }, normalTime);

      if (buttonMove == true) {
        $(button).animate({
          right: size,
        }, normalTime);
      }

    }

    if (side !== 'right') {

      $(menu).animate({
        left: 0,
      }, normalTime);

      if (buttonMove == true) {
        $(button).animate({
          left: size,
        }, normalTime);
      }
    }

    $(menu).addClass(slidxOpen);

    if (shadow == true) {
      $("<div>", {
        id: slidxShadow, //atributo directo, igual que si fuÃ©ramos con attr(â€œidâ€)
        css: //propiedad de jQuery
        {
          'position': 'fixed',
          'top': '0px',
          'width': '100%',
          'height': '100%',
          'background-color': '#000000',
          'opacity': '0',
          'z-index': zIndexShadow,
        },
      }).appendTo('html');

      $(slidxShadowID).fadeTo(speedM, opacity);
    }
  };

  //Ã‰sta es la funciÃ³n que cierra el menÃº. (Hay dos versiones en funciÃ³n del tiempo de cierre)
  function close(delayTime) {
    if (side == 'right') {
      $(menu).animate({
        right: '-' + size,
      }, delayTime)

      if (buttonMove == true) {
        $(button).animate({
          right: 0,
        }, delayTime);
      }
    }

    if (side !== 'right') {
      $(menu).animate({
        left: '-' + size,
      }, delayTime)

      if (buttonMove == true) {
        $(button).animate({
          left: 0,
        }, delayTime);
      }
    }

    $(menu).removeClass(slidxOpen);
    $(slidxShadowID).fadeOut(speedM);

    setTimeout(function () {
      $(slidxShadowID).remove();
    }, speedM);
  };

  //------------------------------  ACTIVADORES  -------------------------------//
  //--------------- Modo CLICK ---------------//
  if (mode == 'click') {
    // Al pulsar el button abrimos el menÃº si estÃ¡ cerrado, o lo cerramos si estÃ¡ abierto.
    $(button).on('click', function (e) {
      // No realiza la acciÃ³n por defecto del botÃ³n
      e.preventDefault();
      if (!$(menu).hasClass(slidxOpen)) {
        open();
      }
      else {
        close(normalTime);
      }
    });

    //Al pulsar en un elemento del menÃº, tambiÃ©n se cierra el menu.
    //FÃjate que el tiempo de cierre que introduzco es mayor que cuando lo cierro con el boton directamente, simplemente porque queda mejor visualmente
    $(menu).on('click', function () {
      close(menuTime);
    });
  }

  $(document).on('click', slidxShadowID, function () {
    close(normalTime);
  });


  //--------------- Modo HOVER ---------------//
  if (mode == 'hover') {
    // Al pasar el ratÃ³n por encima del botÃ³n abrimos el menÃº si estÃ¡ cerrado, o lo cerramos si estÃ¡ abierto.
    $(button).on('mouseover', function () {
      if (!$(menu).hasClass(slidxOpen)) {
        open();
      } else {
        close(normalTime);
      }
    });

    //Al sacar el ratÃ³n del menÃº, se cierra en menÃº.
    $(menu).on('mouseleave', function () {
      close(normalTime);
    });

    //Al pulsar en un elemento del menÃº, tambiÃ©n se cierra el menu.
    //fÃjate que el tiempo de cierre que introduzco es mayor que cuando lo cierro con el boton directamente, simplemente porque queda mejor visualmente
    $(document).on('click', menu, function () {
      close(menuTime);
    });
  };
}(jQuery));
