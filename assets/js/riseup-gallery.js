// RiseUp Gallery
// by Robert Talavera

(function($) {

    $.riseupGallery = function(element, options) {

        var defaults = {
            foo: 'bar',
            onFoo: function() {}
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element,
             elementData = $element.data();

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            // code goes here

            initializeGallery(plugin.settings);
        }

        // plugin.foo_public_method = function() {
        //     // code goes here
        // }

        var initializeGallery = function(settings) {
            $(settings.modalClass).on("click","#close-modal",function(e){
                e.preventDefault();
                    var $el = $(this);                    
                    
                    $(".wprig-dynamic-modal").removeClass("open")                    
            
                    setTimeout(function(){  
                        $(".wprig-dynamic-modal")
                        .removeClass("wprig-block-"+elementData.modal.id)
                        .removeClass(elementData.modal.overlayEffect)
                        .removeClass(elementData.modal.modalLayout)
                        .removeData("id")
                        .removeData("overlayEffect") 
                        $("body").removeClass("has-perspective")        
                        
                    },700)
            
                })

            $element.on("click",settings.toggleClass,function(e){  
                e.preventDefault();
                var $el = $(this);
        
                var $gallery = $el.closest($element);
                var galleryData =  $gallery.data();               
        
                if(galleryData.modal.overlayEffect=="let-me-in"){
                    $("body").addClass("has-perspective")
                }
                    
                $(settings.modalClass).addClass("wprig-block-"+galleryData.modal.id+" "+galleryData.modal.overlayEffect);
                $(settings.modalClass).addClass("wprig-block-"+galleryData.modal.id)
                $(settings.modalClass).data({ "id": galleryData.modal.id ,"overlayEffect": galleryData.modal.overlayEffect});
                $(settings.modalClass).addClass(elementData.modal.modalLayout)

                var id = $(this).data("id")
                console.log(elementData.modal);
                
                $(".components-modal__content").find("figure").remove();
                $.getJSON(location.origin+"/wp-json/riseup/get_media?item="+id,function(data){
                    if(elementData.modal.modalLayout=="modal-layout-1"){

                        $("#components-modal-header-1").html(data.post_title)
                        $(".components-modal__content").append($("<figure>").html(
                            $("<img>",{
                                id:"slick-img",
                                src:data.guid
                            })
                            ).append(
                                $("<figcaption>").html(
                                    $("<p>").html(data.post_content)
                                    )
                        ))          
                    }else{
                        $("#components-modal-header-1").html("")
                        $(".components-modal__content").append($("<figure>").html(
                            $("<img>",{
                                id:"slick-img",
                                src:data.guid
                            })
                            ).append(
                                $("<figcaption>").html(
                                    $("<h3>").html(data.post_title)
                                   
                                ).append( $("<p>").html(data.post_content))
                            ))  
                    }
                })
        
                setTimeout(function(){
                    $(settings.modalClass).addClass("open")
                },400)
            })
        }
        plugin.init();

    }

    $.fn.riseupGallery = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('pluginName')) {
                var plugin = new $.riseupGallery(this, options);
                $(this).data('pluginName', plugin);
            }
        });

    }

})(jQuery);