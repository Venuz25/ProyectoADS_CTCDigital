// Galería - Detectar imagen central
document.addEventListener("DOMContentLoaded", function () {
    const galeria = document.querySelector('.galeria-movimiento');
    const imagenes = document.querySelectorAll('.galeria-track img');
  
    function detectarImagenCentral() {
      const centroGaleria = galeria.getBoundingClientRect().left + galeria.clientWidth / 2;
      let imagenMasCentrada = null;
      let distanciaMinima = Infinity;
  
      imagenes.forEach(img => {
        const rect = img.getBoundingClientRect();
        const centroImagen = rect.left + rect.width / 2;
        const distancia = Math.abs(centroGaleria - centroImagen);
  
        if (distancia < distanciaMinima) {
          distanciaMinima = distancia;
          imagenMasCentrada = img;
        }
      });
  
      imagenes.forEach(img => img.classList.remove('en-centro'));
      if (imagenMasCentrada) {
        imagenMasCentrada.classList.add('en-centro');
      }
    }
  
    setInterval(detectarImagenCentral, 1000);
  });


//testimonios
(function($) {
  $.fn.foldscroll = function(options) {
    var PI = Math.PI;
    var HALF_PI = PI / 2;
    var opts = $.extend({}, $.fn.foldscroll.defaults, options);
    var rot = 'perspective(' + opts.perspective + 'px) rotateX(θrad)';

    return this.each(function() {
      var $this = $(this);
      var $kids = $this.children();
      var $item;
      var $shading;

      if (opts.shading) {
        $shading = $('<span class="shading"/>').css({
          background: opts.shading,
          position: 'absolute',
          opacity: 0.0,
          height: '100%',
          width: '100%',
          left: 0,
          top: 0
        });

        $kids.each(function() {
          $item = $(this);
          $item.css(prefix({
              'backface-visibility': 'hidden',
              'transform-style': 'preserve-3d' 
          }));

          if (!$item.data('_shading')) {
              $shading = $shading.clone();
             
              $item.css('position', 'relative');
              $item.data('_shading', $shading);
              $item.append($shading);
          }
        });
      }

      $this.css(prefix({ 'backface-visibility': 'hidden' }));
      $this.css({ overflowY: 'scroll' });

      $this.on('scroll', function() {
        var st = $this.scrollTop();
        var vt = $this.offset().top - st;
        var vh = $this.outerHeight();
        var vb = vt + vh;

        var m = parseFloat(opts.margin);
        m = m <= 1.0 ? Math.min(m, 0.5) : m / vh;

        $kids.each(function(index, el) {
            $item = $(this);
            $item.css(prefix({ transform: 'none' }));
            $shading = $item.find('.shading').hide();

            var et = $item.offset().top - st;
            var eh = Math.max(m * vh, $item.outerHeight());
            var eb = et + eh;
            var a = Math.max(vt, et);
            var b = Math.min(vb, eb);
            var show = a < b;

            if (show) {
              var o = b - a;
              var p = o / vh;

              if (p < m) {
                p = p / m;

                var d = et < vt ? 1 : -1;
                var t = (1 - p) * HALF_PI * d;
                
                if (Math.abs(t) <= HALF_PI) {
                  $item.css(prefix({
                      'transform-origin': '50% ' + (et < vt ? '100%' : '0%'),
                      'transform': rot.replace('θ', t)
                  }));

                  if (opts.shading)
                      $shading.css('opacity', 1.0 - p).show();
                } else {
                    show = false;
                }
              }
            }
            $item.css('visibility', show ? 'visible' : 'hidden');
        });
      });
      $this.trigger('scroll');
    });
  };

  function prefix(obj) {
    var key, val;
    for (key in obj) {
      val = obj[key];
      obj['-webkit-' + key] = val;
      obj['-moz-' + key] = val;
      obj['-ms-' + key] = val;
      obj['-o-' + key] = val;
    }
    return obj;
  }

  $.fn.foldscroll.defaults = {
    perspective: 600,
    shading: 'rgba(0,0,0,0.2)',
    margin: 0.2
  };
})(jQuery);

// Datos de las citas (quotes)
var quotes = [
    {
        "author": "Laura M.",
        "quote": "Adoptar a Bruno fue la mejor decisión que tomamos como familia. Nos trajo alegría, amor y muchas risas."
      },
      {
        "author": "Carlos G.",
        "quote": "Nunca imaginé que un perrito rescatado pudiera enseñarme tanto sobre lealtad y gratitud."
      },
      {
        "author": "Lucía y Tomás",
        "quote": "Nuestro hogar no estaba completo hasta que llegó Canela. Hoy, no podemos imaginar la vida sin ella."
      },
      {
        "author": "Andrea R.",
        "quote": "Adoptar es un acto de amor, pero también de justicia. Cada animal merece una segunda oportunidad."
      },
      {
        "author": "Jorge N.",
        "quote": "Desde que adoptamos a Max, salgo a caminar todos los días. Nos cambiamos la vida mutuamente."
      },
      {
        "author": "Mariana P.",
        "quote": "Llegó flaco, temeroso y triste. Hoy corre por el jardín como si siempre hubiera sido libre."
      },
      {
        "author": "Esteban F.",
        "quote": "No rescatamos a Luna... ella nos rescató a nosotros."
      },
      {
        "author": "Valeria C.",
        "quote": "Los animales no necesitan palabras para demostrarte que te aman incondicionalmente."
      },
      {
        "author": "Familia Soto",
        "quote": "Adoptar fue una experiencia transformadora para nuestros hijos. Aprendieron empatía, responsabilidad y amor puro."
      },
      {
        "author": "Rafael M.",
        "quote": "Cada día con nuestro nuevo amigo es una aventura. Gracias por acercarnos a él."
      },
      {
        "author": "Natalie S.",
        "quote": "Creí que estaba haciendo algo bueno al adoptar, pero al final fui yo quien ganó más."
      },
      {
        "author": "Emilia D.",
        "quote": "Nuestro gato rescatado nos recuerda todos los días que los milagros existen."
      },
      {
        "author": "Fabián H.",
        "quote": "Hay historias que comienzan con una caricia tímida. La nuestra comenzó en un refugio y sigue llena de amor."
      },
      {
        "author": "Ana B.",
        "quote": "Cuando adopté, descubrí que el amor no tiene raza, tamaño ni pedigree."
      },
      {
        "author": "Mauricio Q.",
        "quote": "Rescatar no es solo salvar una vida; es abrirle la puerta a un compañero fiel para siempre."
      }
]

// Código de inicialización
$(function() {
  var limit = 15;
  var $container = $('.quotes');

  for (var i = 0, n = Math.min(limit, quotes.length); i < n; i++) {
    $container.append(
        '<article>' +
            '<p>' + quotes[i].quote + '</p>' +
            '<em>' + quotes[i].author + '</em>' +
        '</article>');
  }

  $container.foldscroll({
    perspective: 900,
    margin: '220px'
  });
});