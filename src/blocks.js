/**
 * WPRIG Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './components/renderfield';


// import "./blocks/row/block";
// import './blocks/row/column';
// import './blocks/first-blocks/block';
// import './blocks/hero/block';

// import "./blocks/ct/block";

// import "./blocks/alert/block";
// import "./blocks/accordion/block";
// import "./blocks/advance-heading/block";
// import "./blocks/advance-list/block";
// import "./blocks/animated-headline/block";
// import "./blocks/button/block";
// import "./blocks/buttongroup/block";
// import "./blocks/contact-form/block";
// import "./blocks/counter/block";
// import "./blocks/divider/block";
// import "./blocks/icon/block";
// import "./blocks/iconlist/block";
// import "./blocks/iconlist-connector/block";
// import "./blocks/image/block";
// import "./blocks/image-comparison/block";
// import './blocks/info-box/block'; 
// import "./blocks/map/block";
// import "./blocks/pie-progress/block";
// import "./blocks/pricing/block";
// import "./blocks/post-grid/block";
// import "./blocks/product-grid/block";
// import "./blocks/product-carousel/block";
// import "./blocks/tm-product-carousel/block";
// import "./blocks/sb-product-carousel/block";

// import "./blocks/social-icons/block";
// import "./blocks/table-of-contents/block";
// import './blocks/tabs/block';
// import './blocks/tabs/tab/block';
// import "./blocks/team/block";
// import "./blocks/testimonial/block";
// import "./blocks/image-carousel/block";
// import "./blocks/image-grid/block";
// import "./blocks/mosaic-images/block";
// import "./blocks/masonry-image-grid/block";
// import "./blocks/text/block";
// import "./blocks/timeline/block";

// import "./blocks/progressbar/block";
// import "./blocks/modal/block";
// import "./blocks/video-popup/block";
// import "./blocks/panel/block";
// import "./blocks/wrapper/block";
// import "./blocks/flipbox/block";
// import "./blocks/flipbox/face/block";


// import "./blocks/highlight-box/block";
// import "./blocks/highlight-box/face/block";
// import "./blocks/ihover/block";
// import "./blocks/ihover/face/block";

// import "./blocks/post-carousel/block";
// import "./blocks/custom-block/block";
// import "./blocks/custom-carousel-2/block";
// import "./blocks/custom-carousel-2/carousel-item/block";

// import "./blocks/custom-carousel/block";
// import "./blocks/custom-carousel/item/block";

// import "./blocks/flexboxes/block";
// import "./blocks/flexboxes/flexbox/block";

// import "./blocks/grid-blocks/grid-block-cell/block";
// import "./blocks/grid-blocks/block";


// import "./simple-blocks/advance-heading/block";
// import "./blocks/ajax-search/block";
// import "./blocks/yani_buttons/block";
// import "./blocks/yani_countdown/block";
// import "./blocks/yani_divider/block";
// import "./blocks/yani_image/block";
// import "./blocks/yani_info-box/block";


// import "./blocks/interactive-banner/block";

import './plugins';


import './blocks/pagesettings'


window.wprigDevice = 'md'

window.bindCss = false

import ParseCss from './helpers/parse-css';

window.globalData = {
    settings: {
        colorPreset1: wprig_admin.palette[0],
        colorPreset2: wprig_admin.palette[1],
        colorPreset3: wprig_admin.palette[2],
        colorPreset4: wprig_admin.palette[3],
        colorPreset5: wprig_admin.palette[4],
        colorPreset6: wprig_admin.palette[5],
    }
};

wp.data.subscribe(() => {
    const {
        isPreviewingPost,
        isSavingPost,
        isAutosavingPost,
        isPublishingPost
    } = wp.data.select("core/editor");

    
    if (isPreviewingPost() || isPublishingPost() || (isSavingPost() && (!isAutosavingPost()))) {
        if (window.bindCss === false) {
            setTimeout(() => {
                ParseCss(isPreviewingPost() ? false : true);
            }, 600)

        }
    }
});
