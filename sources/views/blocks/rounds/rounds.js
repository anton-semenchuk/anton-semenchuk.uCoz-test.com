function addPrefixedEvent(el, eventType, prefixes, handler, useCapture) {
    if (prefixes.indexOf("") == -1) {
      el.addEventListener(eventType, handler, useCapture);
    }
    prefixes.forEach( prefix => {
      el.addEventListener(prefix.toLowerCase() + eventType, handler, useCapture);
    });
  }

var circles = document.querySelectorAll('.round');

[].forEach.call(circles, function(item, i) {
  item.setAttribute('data-num', i);
  item.addEventListener('click', function(e) {
    this.classList.add('round_animate');
    addPrefixedEvent(this, 'animationend', ["webkit", "moz", "MS", "o"], function(e) {
      var self = e.target;
      var idx = e.target.getAttribute('data-num');
      var rCircles = [].filter.call(circles, function(v, i) {
        return i > idx ;
      });
      console.log(rCircles);
      [].forEach.call(rCircles, function(v) {
        v.classList.add('round_move-left');
      });
      setTimeout(function() {
        self.classList.add('round_hidden');
        self.classList.remove('round_animate');
        [].forEach.call(circles, function(item) {
          item.classList.remove('round_move-left');
        });
      }, 150);
      
    })
  });
});