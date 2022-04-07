
const { __ } = wp.i18n
const { select, dispatch } = wp.data
import '../css/contextmenu.scss'
const { Component } = wp.element

export function handleContextMenu(event, wprigContextMenu) {
    event.preventDefault()
    const clickX = event.clientX
    const clickY = event.clientY
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const rootW = wprigContextMenu.offsetWidth
    const rootH = wprigContextMenu.offsetHeight
    const right = (screenW - clickX) > rootW
    const left = !right
    const top = (screenH - clickY) > rootH
    const bottom = !top
    wprigContextMenu.style.display = `block`
    if (right) {
        wprigContextMenu.style.left = `${clickX + 5}px`
    }
    if (left) {
        wprigContextMenu.style.left = `${clickX - rootW - 5}px`
    }
    if (top) {
        wprigContextMenu.style.top = `${clickY + 5}px`
    }
    if (bottom) {
        wprigContextMenu.style.top = `${clickY - rootH - 5}px`
    }
}


export class ContextMenu extends Component {

    componentDidMount() {
        const { clientId, attributes: { sourceOfCopiedStyle } } = this.props
        document.addEventListener('mousedown', this.handleonClickOutside)
        let wprigCopiedStyles = JSON.parse(localStorage.getItem('wprigCopiedStyles'))
        if (sourceOfCopiedStyle && wprigCopiedStyles) {
            wprigCopiedStyles.copiedFrom = clientId
            localStorage.setItem('wprigCopiedStyles', JSON.stringify(wprigCopiedStyles))
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleonClickOutside);
    }

    handleonClickOutside = (event) => {
        const { wprigContextMenu } = this.props
        if (wprigContextMenu && !wprigContextMenu.contains(event.target)) {
            wprigContextMenu.style.display = `none`
        }
    }
    copyStyles = () => {
        const { setAttributes, clientId, name, wprigContextMenu } = this.props
        const { updateBlockAttributes } = dispatch('core/block-editor')
        let blockDefaultAttributes = JSON.parse(JSON.stringify(wp.blocks.getBlockType(name))).attributes
        let blockAttributes = select('core/block-editor').getBlockAttributes(clientId)
        let newStyles = { copiedStyles: {} }

        Object.keys(blockDefaultAttributes).forEach(key => {
            if (blockDefaultAttributes[key].hasOwnProperty('style')) {
                newStyles.copiedStyles[key] = JSON.parse(JSON.stringify(blockAttributes[key]))
            } else if (key.toLowerCase() == 'layout' ||key.toLowerCase() == 'style' || key.toLowerCase() == 'filltype' || key == 'iconStyle' || key.toLowerCase() == 'buttonfilltype') {
                newStyles.copiedStyles[key] = JSON.parse(JSON.stringify(blockAttributes[key]))
            }
        })
        newStyles['copiedFrom'] = clientId
        newStyles['blockName'] = name
        let previouslyCopiedStyle = JSON.parse(localStorage.getItem('wprigCopiedStyles'))

        if (previouslyCopiedStyle) {
            let previouslyCopiedFrom = previouslyCopiedStyle.copiedFrom
            select('core/block-editor').getBlock(`${previouslyCopiedFrom}`) && updateBlockAttributes(`${previouslyCopiedFrom}`, { sourceOfCopiedStyle: false })
        }

        setTimeout(() => localStorage.setItem('wprigCopiedStyles', JSON.stringify(newStyles)), 500)

        wprigContextMenu.style.display = `none`
        setAttributes({ sourceOfCopiedStyle: true })
    }
    pasteStyle = () => {
        const { setAttributes, wprigContextMenu } = this.props
        let wprigCopiedStyles = JSON.parse(localStorage.getItem('wprigCopiedStyles')).copiedStyles
        wprigContextMenu.style.display = `none`
        setAttributes(wprigCopiedStyles)
    }

    render() {
        const { name, clientId, attributes: { sourceOfCopiedStyle } } = this.props
        let previouslyCopiedStyle = JSON.parse(localStorage.getItem('wprigCopiedStyles'))
        return (
            <div className="wprig-context-menu">
                <div className="wprig-context-menu-group">
                    <div className="wprig-context-menu-item wprig-context-menu-item-copy" onClick={() => this.copyStyles()} >
                        <div className={`wprig-context-menu-item-icon`}> <i className="fas fa-copy"/></div>
                        <div className="wprig-context-menu-item-title">{__('Copy Style')}</div>
                    </div>
                    <div className={`wprig-context-menu-item wprig-context-menu-item-paste disable-${previouslyCopiedStyle && previouslyCopiedStyle.blockName == name ? sourceOfCopiedStyle : true}`} onClick={() => this.pasteStyle()} aria-disabled={sourceOfCopiedStyle} >
                        <div className="wprig-context-menu-item-icon"> <i className="fas fa-paste"/></div>
                        <div className="wprig-context-menu-item-title">{__('Paste Style')}</div>
                    </div>
                </div>
                <div className="wprig-context-menu-group">
                    <div className="wprig-context-menu-item wprig-context-menu-item-delete" onClick={() => dispatch('core/block-editor').removeBlock(clientId)} >
                        <div className="wprig-context-menu-item-icon"> <i className="fas fa-trash"/></div>
                        <div className="wprig-context-menu-item-title">{__('Delete')}</div>
                        <div className="wprig-context-menu-item-shortcut">⌦</div>
                    </div>
                </div>
            </div>
        )

    }
}
