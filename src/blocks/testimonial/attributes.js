const {
    globalSettings: {
        globalAttributes
    }
} = wp.wprigComponents;

const attributes = {
    uniqueId: { type: 'string', default: '' },
    // Global
    ...globalAttributes,
    spacer: { type: 'object', default: { spaceTop: { md: '10', unit: "px" }, spaceBottom: { md: '10', unit: "px" } }, style: [{ selector: '{{WPRIG}}' }] },
    alignment: { type: 'object', default: { md: 'center' }, style: [{ selector: '{{WPRIG}} .wprig-block-testimonial {text-align: {{alignment}};}' }] },
    layout: { type: 'number', default: 1 },

    //Name
    name: {
        type: 'string',
        source: 'html',
        selector: '.wprig-testimonial-author-name>span',
        default: 'JOHN DOE'
    },

    //Designation
    designation: {
        type: 'string',
        source: 'html',
        selector: '.wprig-testimonial-author-designation>span',
        default: 'WordPress Developer'
    },

    //Messsage
    message: {
        type: 'string',
        source: 'html',
        selector: '.wprig-testimonial-content>div',
        default: '“There’s no easier way to add innovative Gutenberg blocks than using wprig Gutenberg Blocks Toolkit. Instantly raise your website appearance with this stylish new plugin.”'
    },
    messagePosition: { type: 'string', default: 'top' },

    //Avatar
    showAvatar: { type: 'boolean', default: true },
    avatar: { type: 'object', default: {} },
    avatar2x: { type: 'object', default: {} },
    avatarLayout: { type: 'string', default: 'left' },
    avatarAlt: { type: 'string', default: '' },


    avatarBorder: { type: 'object', default: {}, style: [{ selector: '{{WPRIG}} .wprig-testimonial-avatar' }] },

    //Quote
    quoteIcon: { type: 'string', default: 'fas fa-quote-left' },
    quoteIconPosition: { type: 'string', default: 'top' },

    //Ratings
    showRatings: { type: 'boolean', default: true },
    ratings: { type: 'string', default: 4.5 },
    ratingsPosition: { type: 'string', default: 'bottom' },
    

    // Design
    sourceOfCopiedStyle: { type: 'boolean', default: false }

}

export default attributes;
