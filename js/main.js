!function(t){"use strict";function e(){t.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",function(e){t("blockquote").html(e[0].content+"<p>— "+e[0].title+"</p>"),t(".js-tweet-btn").attr("href","https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="+encodeURIComponent(e[0].content))})}e(),t(".js-new-quote").on("click",function(){e()})}(jQuery);