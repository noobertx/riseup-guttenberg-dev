import Edit from './Edit';
import Save from './Save';
import attributes from './attributes';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
const { InnerBlocks } = wp.blockEditor
const {
    HelperFunction: {
        animationAttr,
        videoBackground

    },
} = wp.wprigComponents;


registerBlockType('wprig/many-carousel', {

    title: __('Many Carousel'),
    category: 'wprig-blocks',
    description: 'Include unique row and column layouts with wprig Row.',
    icon: 'universal-access-alt',
    supports: {
        align: ['wide', 'center', 'full'],
        html: false
    },
    keywords: [__('Row'), __('rw'), __('column'), __('Layout')],
    example: {
        attributes: {},
    },
    attributes,
    edit: Edit,
    save: Save,
    deprecated: [
        {
            attributes,

            save(props) {
                const { attributes: { uniqueId, animation, rowId, rowBg, shapeTop, shapeBottom, align, heightOptions, rowContainerWidth } } = props
                return (
                    <div className={`wprig-section wprig-block-${uniqueId} ${(rowBg.bgimgParallax && rowBg.bgimgParallax == 'animated') ? 'wprig-section-parallax' : ''}`} {...rowId ? { id: rowId } : ''} {...animationAttr(animation)}>

                        {(Object.entries(shapeTop).length > 1 && shapeTop.openShape == 1 && shapeTop.style) &&
                            <div className="wprig-shape-divider wprig-top-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeTop.style] }} />
                        }
                        {(Object.entries(rowBg).length > 0 && rowBg.openBg == 1 && rowBg.bgType == 'video') &&
                            videoBackground(rowBg, 'row')
                        }
                        {(Object.entries(shapeBottom).length > 1 && shapeBottom.openShape == 1 && shapeBottom.style) &&
                            <div className="wprig-shape-divider wprig-bottom-shape" dangerouslySetInnerHTML={{ __html: wprig_admin.shapes[shapeBottom.style] }} />
                        }
                        <div className="wprig-row-overlay"></div>
                        <div className={`${align == 'full' ? ((rowContainerWidth == 'boxed') ? 'wprig-container' : 'wprig-container-fluid') : 'wprig-container-fluid'}`}>
                            <div className={`wprig-row ${(heightOptions == 'window') ? 'wprig-row-height-window' : ''}`}>
                                <InnerBlocks.Content />
                            </div>
                        </div>
                    </div>
                )

            }
        }
    ]
});

