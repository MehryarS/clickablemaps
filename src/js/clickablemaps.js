(function ($) {
    $.extend($.fn, {
        clickablemaps: function (param, options) {
            options = $.extend({

            }, options);

            var map = $(this).html();
            $(this).html('');
            $(this).append('<div class="clickablemaps__map"></div>');
            $(this).append('<div class="info"><div class="info__block__wrapp"></div></div>');
            $('.clickablemaps__map').html(map);
            $('.clickablemaps__map').append('<div class="tooltip__wrapper"></div>');
            $('.tooltip__wrapper').prepend('<div class="tooltip__text"></div>');
            $('svg a').each(function () {
                $(this).mouseover(function () {
                    var tooltipText = $(this).data('tooltip');

                    $('.tooltip__wrapper').show();
                    $('.tooltip__text').html(tooltipText);
                });

                $(this).mouseout(function () {
                    $('.tooltip__wrapper').hide();
                });

                $(this).mousemove(function (event) {
                    var xPosition = (event.clientX) + 'px';
                    var yPosition = (event.clientY - 45) + 'px';

                    $('.tooltip__text').css({
                        'top': yPosition,
                        'left': xPosition
                    });
                });

                $(this).click(function (event) {
                    event.preventDefault();
                    var cityName = $(this).data('id');

                    $('svg a path').removeClass('this');
                    $(this).find('path').addClass('this');
                    $('.info__block__wrapp').html('');

                    $.ajax({
                        dataType: 'json',
                        url: 'http://www.abanegan.com/demo/json/agents.json',
                        success: function (response) {
                            var agentsList = [];
                            response[cityName].agents.map(function (item, index) {
                                agentsList.push(
                                    '<div class="block"><div class="block__image"><div class="block__image__wrapp"><img src="img/shop.jpg"></div></div><div class="block__information"><div class="block__information__wrapp"><ul><li><h3 class="block__information__title">' + item.store + '</h3></li><li><p class="block__information__manager">' + item.manager + '</p></li><li><p class="block__information__address">' + item.address + '</p></li><li><p class="block__information__phone">' + item.phone + '</p></li><li><a href="#" class="block__information__email"></a></li></ul></div></div></div>'
                                );
                            });
                            $('.info__block__wrapp').append(agentsList);
                            console.log('test');
                        },
                        statusCode: {
                            404: () => alert('There was a problem with the server.  Try again soon!')
                        }
                    });
                });
            });

            return this;
        }
    });
})(jQuery);