(function($){
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    $(document).ready(function() {
        if($(".wprig-gallery").length){
            $(".wprig-gallery").slick()
        }

        if($(".wprig-product-carousel").length){
            $(".wprig-product-carousel").slick()
        }
        if($(".wprig-tm-product-carousel").length){
            $(".wprig-tm-product-carousel").slick()
        }
        if($(".wprig-sb-product-carousel").length){
            $(".wprig-sb-product-carousel").slick()
        }

        if($('.riseup-gallery').length){
            $('.riseup-gallery').riseupGallery({
                modalClass: '.wprig-dynamic-modal',
                toggleClass : 'button.wprig-gallery-item'
            });
        }

        if($(".wprig-mosaic-gallery").length){
            $(".wprig-mosaic-gallery").Mosaic();
        }

        if($(".wprig-masonry-gallery").imagesLoaded){
            $(".wprig-masonry-gallery").imagesLoaded(function() {
                $(".wprig-masonry-gallery").masonry({
                });
            });
        }


        if($(".wprig-block-accordion").length){
            $(".wprig-accordion-item").on("click",function(e){
                e.preventDefault();
                $parent = $(this).closest(".wprig-block-accordion")
                $(this).closest(".wprig-block-accordion")
                .find(".wprig-accordion-item.wprig-accordion-active")
                .removeClass("wprig-accordion-active")
                .find(".wprig-accordion-body").css({"display":"none"});
                $(this).addClass("wprig-accordion-active").find(".wprig-accordion-body").css({"display":"block"});
                
            })
        }
        if($(".wp-block-wprig-alert").length){
            $(".wp-block-wprig-alert").on("click",".wprig-alert__control",function(e){
                e.preventDefault();
                $(this).closest(".wp-block-wprig-alert").remove();
            })
        }

        if(true){
            $('.wprig-block-counter-number').each(function () {
                const currentElement = $(this)[0];
                let start = parseInt(currentElement.dataset.start),
                    limit = parseInt(currentElement.dataset.limit),
                    counterDuration = parseInt(currentElement.dataset.counterduration),
                    increment = Math.ceil((limit / counterDuration) * 10);
    
                const invokeCounter = () => {
                    if (isElementInViewport(currentElement)) {
                        if (start < limit) {
                            let intervalId = setInterval(function () {
                                let difference = limit - start;
                                difference >= increment ? start += increment : difference >= 50 ? start += 50 : start++;
                                currentElement.innerText = start;
                                if (start >= limit) {
                                    clearInterval(intervalId);
                                }
                            }, 10);
                        }
                        window.removeEventListener('scroll', invokeCounter, true);
                    }
                }
                invokeCounter();
                window.addEventListener('scroll', invokeCounter, true);
            });
        }
    });
})(jQuery)