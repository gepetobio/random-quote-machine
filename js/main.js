!function(t){"use strict";function n(){t.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",function(n){t("blockquote").html(n[0].content+"<p>— "+n[0].title+"</p>")})}n(),t(".js-new-quote").on("click",function(){n()})}(jQuery);