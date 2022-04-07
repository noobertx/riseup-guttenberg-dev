import Select from './select'
import Toggle from './toggle'

const { __ } = wp.i18n
const { InspectorAdvancedControls } = wp.blockEditor
const { Fragment } = wp.element
const { TextareaControl, PanelBody, SelectControl } = wp.components

export const globalCustomAttributes = {
    hoverEffects:{
        type:'object',
        default:{}
    }
}

export function HoverEXSettings(uniqueId,enableHoverFx, hoverEffect, hoverEffectDirection, setAttributes) {
    return (        
        <PanelBody title={__('Hover Overlay Effects')} initialOpen={false}>
                <Toggle
                    label={__('Enable Hover Effects')}
                    value={enableHoverFx}
                    onChange={() => setAttributes({ enableHoverFx: !enableHoverFx })}
                />
            {enableHoverFx &&
                <Fragment>
                <Select
				label={__('Hover Effects')}
				options={[
					['wprig-box-effect-1', 'Effect 1'], 
					['wprig-box-effect-2', 'Effect 2'], 
					['wprig-box-effect-3', 'Effect 3'], 
					['wprig-box-effect-4', 'Effect 4'],
					['wprig-box-effect-5', 'Effect 5'],
					['wprig-box-effect-6', 'Effect 6'],
					['wprig-box-effect-7', 'Effect 7'],
					['wprig-box-effect-8', 'Effect 8'],
					['wprig-box-effect-9', 'Effect 9'],
					['wprig-box-effect-10','Effect 10'],
				]}
				value={hoverEffect}
				onChange={(value) => setAttributes({ hoverEffect: value })} />

                <Select
					label={__('Direction')}
					options={[
						['right-to-left', 'Right To Left'], 
						['left-to-right', 'Left to Right'], 
						['top-to-bottom', 'Top to Bottom'], 
						['bottom-to-top', 'Bottom to Top']
					]}
					value={hoverEffectDirection}
                    onChange={(value) => setAttributes({ hoverEffectDirection: value })}
                />
                </Fragment>
            }
        </PanelBody>
    )
}