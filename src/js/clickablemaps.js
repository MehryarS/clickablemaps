(function($) {
    $.extend($.fn, {
        clickablemaps: function(param, options) {
            options = $.extend({
                
            }, options);

            $(".map").append("<div class='tooltip__wrapper'></div>");
            $(".tooltip__wrapper").prepend("<div class='tooltip__text'></div>");
            $("svg a").each(function(){

                //Tooltip
                $(this).mouseover(function(){
                    var tooltip__text = $(this).data("tooltip");

                    $(".tooltip__wrapper").show();
                    $(".tooltip__text").html(tooltip__text);
                });

                $(this).mouseout(function(){
                    $(".tooltip__wrapper").hide();
                });

                $(this).mousemove(function(event){
                    var x__position= (event.clientX) + 'px';
                    var y__position= (event.clientY - 45) + 'px';

                    $(".tooltip__text").css({"top": y__position, "left": x__position});
                });

                //Read Data
                $(this).click(function(event){
                    event.preventDefault();
                    var city__name = $(this).data("id");

                    $("svg a path").removeClass("this");
                    $(this).find("path").addClass("this");
                    $('.info__block__wrapp').html("");

                    $.ajax({
                        dataType: "json",
                        url: "http://www.abanegan.com/demo/json/agents.json",
                        success: function(response){
                            var agents__list = [];
                            response[city__name].agents.map(function (item, index){
                                agents__list.push(
                                    "<div class='block'><div class='block__image'><div class='block__image__wrapp'><img src='img/shop.jpg'></div></div><div class='block__information'><div class='block__information__wrapp'><ul><li><h3 class='block__information__title'>" + item.store + "</h3></li><li><p class='block__information__manager'>" + item.manager + "</p></li><li><p class='block__information__address'>" + item.address + "</p></li><li><p class='block__information__phone'>" + item.phone + "</p></li><li><a href='#' class='block__information__email'></a></li></ul></div></div></div>"
                                );
                            });
    
                            $('.info__block__wrapp').append(agents__list);
                
                        },
                        statusCode: {
                            404: function() {
                            alert('There was a problem with the server.  Try again soon!');
                            }
                        }
                    });
                });
            });
        
            return this;
        }
    });
})(jQuery);