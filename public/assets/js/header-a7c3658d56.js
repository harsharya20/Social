$(window).scroll((function(o){var e=$(document).height()-$(window).height(),i=$(document).scrollTop()/(e/100);$("#page--scrolling").width(i+"%"),$("#page--scrolling-perc").text(i.toFixed(0)+"%")}));