// TallyCCU Pro - Feedbacks
// Button style feedbacks based on camera parameter state

const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		// Connection status feedback
		connection_status: {
			name: 'Connection Status',
			type: 'boolean',
			label: 'Connected to TallyCCU Pro',
			description: 'Changes button style based on connection state',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => {
				return self.connectionStatus === 'ok' || self.tcpConnected
			},
		},

		// Active preset feedback
		active_preset: {
			name: 'Active Preset',
			type: 'boolean',
			label: 'Active Preset Match',
			description: 'Changes button style when the specified preset is active',
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 255),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Camera ID',
					id: 'cameraId',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'number',
					label: 'Preset ID',
					id: 'presetId',
					default: 0,
					min: 0,
					max: 4,
				},
			],
			callback: (feedback) => {
				const cameraId = feedback.options.cameraId
				const presetId = feedback.options.presetId
				const varKey = `cam${cameraId}_active_preset_id`
				const currentValue = self.getVariableValue(varKey)
				return currentValue === presetId.toString()
			},
		},

		// Optical image stabilisation feedback
		ois_enabled: {
			name: 'OIS Enabled',
			type: 'boolean',
			label: 'Optical Image Stabilisation State',
			description: 'Changes button style when OIS is enabled',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Camera ID',
					id: 'cameraId',
					default: 1,
					min: 1,
					max: 8,
				},
			],
			callback: (feedback) => {
				const cameraId = feedback.options.cameraId
				const key = 'cam' + cameraId + '_optical_image_stabilisation'
				const val = self.paramValues[key]
				return val === true || val === 1 || val === 'true'
			},
		},

		// Phantom power feedback
		phantom_power_enabled: {
			name: 'Phantom Power',
			type: 'boolean',
			label: 'Phantom Power State',
			description: 'Changes button style when phantom power is enabled',
			defaultStyle: {
				bgcolor: combineRgb(255, 100, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Camera ID',
					id: 'cameraId',
					default: 1,
					min: 1,
					max: 8,
				},
			],
			callback: (feedback) => {
				const cameraId = feedback.options.cameraId
				const key = 'cam' + cameraId + '_phantom_power'
				const val = self.paramValues[key]
				return val === true || val === 1 || val === 'true'
			},
		},

		// Dynamic range mode feedback
		dynamic_range_mode: {
			name: 'Dynamic Range Mode',
			type: 'boolean',
			label: 'Dynamic Range Mode Match',
			description: 'Changes button style when the specified dynamic range mode is active',
			defaultStyle: {
				bgcolor: combineRgb(150, 0, 200),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Camera ID',
					id: 'cameraId',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: '2',
					choices: [
						{ id: '0', label: 'Film' },
						{ id: '1', label: 'Video' },
						{ id: '2', label: 'Extended Video' },
					],
				},
			],
			callback: (feedback) => {
				const cameraId = feedback.options.cameraId
				const key = 'cam' + cameraId + '_dynamic_range_mode'
				const val = self.paramValues[key]
				return val !== undefined && val.toString() === feedback.options.mode
			},
		},

		// Parameter value comparison feedback
		param_value_compare: {
			name: 'Parameter Value Compare',
			type: 'boolean',
			label: 'Parameter Value Matches',
			description: 'Changes button style when a parameter matches the specified value',
			defaultStyle: {
				bgcolor: combineRgb(255, 255, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					type: 'number',
					label: 'Camera ID',
					id: 'cameraId',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'textinput',
					label: 'Parameter Key',
					id: 'paramKey',
					default: 'gain_db',
				},
				{
					type: 'textinput',
					label: 'Expected Value',
					id: 'expectedValue',
					default: '0',
				},
			],
			callback: (feedback) => {
				const cameraId = feedback.options.cameraId
				const key = 'cam' + cameraId + '_' + feedback.options.paramKey
				const val = self.paramValues[key]
				if (val === undefined) return false
				return val.toString() === feedback.options.expectedValue
			},
		},

		// Parameter value threshold (above) feedback
		param_above_threshold: {
			name: 'Parameter Above Threshold',
			type: 'boolean',
			label: 'Parameter Above Value',
			description: 'Changes button style when a numeric parameter exceeds the threshold',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [
				{
					type: 'number',
					label: 'Camera ID',
					id: 'cameraId',
					default: 1,
					min: 1,
					max: 8,
				},
				{
					type: 'textinput',
					label: 'Parameter Key',
					id: 'paramKey',
					default: 'gain_db',
				},
				{
					type: 'number',
					label: 'Threshold',
					id: 'threshold',
					default: 0,
					min: -128,
					max: 36000,
					step: 0.1,
				},
			],
			callback: (feedback) => {
				const cameraId = feedback.options.cameraId
				const key = 'cam' + cameraId + '_' + feedback.options.paramKey
				const val = self.paramValues[key]
				if (val === undefined || isNaN(parseFloat(val))) return false
				return parseFloat(val) > feedback.options.threshold
			},
		},
	})
}
