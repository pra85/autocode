autocode.resize.hint = function() {
  var hint = $('#hint');
  var hint_arrow = $('#hint-arrow');
  var hint_target = hint.data('target');
  if (typeof(hint_target) == 'function') {
    hint_target = hint_target();
  }
  
  if (!hint.length || !hint_target.length) {
    return;
  }
  
  var hint_minTop = hint.data('minTop') !== undefined ? hint.data('minTop') : ($('header').outerHeight() + 10);
  var hint_offsetTop = hint.data('offsetTop') || 0;
  var hint_text = hint.data('originalText');
  var hint_width = hint.outerWidth();

  var hint_left = hint_target.offset().left - ((hint.outerWidth() - hint_target.outerWidth()) / 2);
  if (hint_left < 10) {
    hint_left = 10;
  } else if (hint_left + hint_width > $(window).width()) {
    hint_left = $(window).width() - hint_width - 10;
  }
  
  var hint_top;
  if (hint.data('top')) {
    hint_top = hint.data('top');
  } else {
    hint_top = hint_target.offset().top + hint_target.outerHeight() + hint_offsetTop + $(window).scrollTop() + 10;
    if (hint_top < hint_minTop) {
      hint_top = hint_minTop;
      if (hint.data('scrollUp')) {
        hint_text = hint.data('scrollUp');
      }
    }
  }
  
  hint.css({
    left: hint_left,
    top: hint_top
  });
  hint.text(hint_text);
  
  hint_arrow.css({
    left: hint_target.offset().left + ((hint_target.outerWidth() - hint_arrow.outerWidth()) / 2),
    top: hint_top - 14
  });
};