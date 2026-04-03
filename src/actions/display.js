// TallyCCU Pro - Display Actions
// Brightness, zebra, peaking, focus assist, and color bars

module.exports = function (self, actions) {
	actions['set_brightness'] = {
		name: 'Set Brightness',
		description: 'Group: Display | Param: Brightness | Note: 0.0 = Minimum, 1.0 = Maximum',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Value',
				id: 'value',
				default: 1.0,
				min: 0.0,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'brightness', event.options.value)
		},
	}
	// Action to increment Brightness

	actions['set_brightness_increment'] = {
		name: '⬆️ Increase Brightness',
		description: 'Increase the value of Brightness',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Increment',
				id: 'increment',
				default: 0.1,
				min: 0.1,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('brightness', newValue, cameraId)
		},
	}
	// Action to decrement Brightness

	actions['set_brightness_decrement'] = {
		name: '⬇️ Decrease Brightness',
		description: 'Decrease the value of Brightness',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Decrement',
				id: 'decrement',
				default: 0.1,
				min: 0.1,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('brightness', newValue, cameraId)
		},
	}
	// Action to reset Brightness al default value

	actions['set_brightness_reset'] = {
		name: '🔄 Reset Brightness',
		description: 'Reset to default value (1.00)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId

			// Send default value
			await self.sendParam(cameraId, 'brightness', 1.0)

			// Store default value for this specific camera
			self.storeParamValue('brightness', 1.0, cameraId)
		},
	}
	// Action for Exposure and focus tools (multiple subindexes)

	actions['set_exposure_and_focus_tools'] = {
		name: 'Set Exposure and focus tools',
		description: 'Set values for Exposure and focus tools',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'textinput',
				label: 'Bit flags: 1 = Zebra, 2 = Focus Assist, 4 = False Color',
				id: 'value0',
				default: '',
			},
			{
				type: 'textinput',
				label: 'Target displays bit flags: 1 = LCD, 2 = HDMI, 4 = EVF, 8 = Main SDI, 16 = Front SDI',
				id: 'value1',
				default: '',
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'exposure_and_focus_tools', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('exposure_and_focus_tools_0', event.options.value0, cameraId)
			self.storeParamValue('exposure_and_focus_tools_1', event.options.value1, cameraId)
		},
	}
	// Action for Zebra level (numeric)

	actions['set_zebra_level'] = {
		name: 'Set Zebra level',
		description: 'Group: Display | Param: Zebra level | Note: 0.0 = Minimum, 1.0 = Maximum',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Value',
				id: 'value',
				default: 0.5,
				min: 0.0,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'zebra_level', event.options.value)
		},
	}
	// Action to increment Zebra level

	actions['set_zebra_level_increment'] = {
		name: '⬆️ Increase Zebra level',
		description: 'Increase the value of Zebra level',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Increment',
				id: 'increment',
				default: 0.1,
				min: 0.1,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('zebra_level', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'zebra_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('zebra_level', newValue, cameraId)
		},
	}
	// Action to decrement Zebra level

	actions['set_zebra_level_decrement'] = {
		name: '⬇️ Decrease Zebra level',
		description: 'Decrease the value of Zebra level',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Decrement',
				id: 'decrement',
				default: 0.1,
				min: 0.1,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('zebra_level', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'zebra_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('zebra_level', newValue, cameraId)
		},
	}
	// Action to reset Zebra level al default value

	actions['set_zebra_level_reset'] = {
		name: '🔄 Reset Zebra level',
		description: 'Reset to default value (0.50)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId

			// Send default value
			await self.sendParam(cameraId, 'zebra_level', 0.5)

			// Store default value for this specific camera
			self.storeParamValue('zebra_level', 0.5, cameraId)
		},
	}
	// Action for Peaking level (numeric)

	actions['set_peaking_level'] = {
		name: 'Set Peaking level',
		description: 'Group: Display | Param: Peaking level | Note: 0.0 = Minimum, 1.0 = Maximum',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Value',
				id: 'value',
				default: 0.9,
				min: 0.0,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'peaking_level', event.options.value)
		},
	}
	// Action to increment Peaking level

	actions['set_peaking_level_increment'] = {
		name: '⬆️ Increase Peaking level',
		description: 'Increase the value of Peaking level',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Increment',
				id: 'increment',
				default: 0.1,
				min: 0.1,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('peaking_level', 0.9, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'peaking_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('peaking_level', newValue, cameraId)
		},
	}
	// Action to decrement Peaking level

	actions['set_peaking_level_decrement'] = {
		name: '⬇️ Decrease Peaking level',
		description: 'Decrease the value of Peaking level',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Decrement',
				id: 'decrement',
				default: 0.1,
				min: 0.1,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('peaking_level', 0.9, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'peaking_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('peaking_level', newValue, cameraId)
		},
	}
	// Action to reset Peaking level al default value

	actions['set_peaking_level_reset'] = {
		name: '🔄 Reset Peaking level',
		description: 'Reset to default value (0.90)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId

			// Send default value
			await self.sendParam(cameraId, 'peaking_level', 0.9)

			// Store default value for this specific camera
			self.storeParamValue('peaking_level', 0.9, cameraId)
		},
	}
	// Action for Color bars display time (seconds) (numeric)

	actions['set_color_bars_display_time_seconds'] = {
		name: 'Set Color bars display time (seconds)',
		description:
			'Group: Display | Param: Color bars display time (seconds) | Note: 0 = Disable Bars, 1-30 = Enable Bars With Timeout (s)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Value',
				id: 'value',
				default: 0.0,
				min: 0.0,
				max: 30.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'color_bars_display_time_seconds', event.options.value)
		},
	}
	// Action to increment Color bars display time (seconds)

	actions['set_color_bars_display_time_seconds_increment'] = {
		name: '⬆️ Increase Color bars display time (seconds)',
		description: 'Increase the value of Color bars display time (seconds)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Increment',
				id: 'increment',
				default: 1,
				min: 1,
				max: 30.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('color_bars_display_time_seconds', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(30.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'color_bars_display_time_seconds', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('color_bars_display_time_seconds', newValue, cameraId)
		},
	}
	// Action to decrement Color bars display time (seconds)

	actions['set_color_bars_display_time_seconds_decrement'] = {
		name: '⬇️ Decrease Color bars display time (seconds)',
		description: 'Decrease the value of Color bars display time (seconds)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Decrement',
				id: 'decrement',
				default: 1,
				min: 1,
				max: 30.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('color_bars_display_time_seconds', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'color_bars_display_time_seconds', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('color_bars_display_time_seconds', newValue, cameraId)
		},
	}
	// Action to reset Color bars display time (seconds) al default value

	actions['set_color_bars_display_time_seconds_reset'] = {
		name: '🔄 Reset Color bars display time (seconds)',
		description: 'Reset to default value (0)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId

			// Send default value
			await self.sendParam(cameraId, 'color_bars_display_time_seconds', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('color_bars_display_time_seconds', 0.0, cameraId)
		},
	}
	// Action for Focus Assist (multiple subindexes)

	actions['set_focus_assist'] = {
		name: 'Set Focus Assist',
		description: 'Set values for Focus Assist',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Focus Assist Method (0 = Peak, 1 = Colored lines)',
				id: 'value0',
				default: 1.0,
				min: 0.0,
				max: 1.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
				id: 'value1',
				default: 0.0,
				min: 0.0,
				max: 4.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('focus_assist_0', event.options.value0, cameraId)
			self.storeParamValue('focus_assist_1', event.options.value1, cameraId)
		},
	}
	// Action to set onlyred lines)

	actions['set_program_return_feed_enable'] = {
		name: 'Set Program return feed enable',
		description:
			'Group: Display | Param: Program return feed enable | Note: 0 = Disable, 1-30 = Enable with timeout (seconds)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Value',
				id: 'value',
				default: 0.0,
				min: 0.0,
				max: 30.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'program_return_feed_enable', event.options.value)
		},
	}
	// Action to increment Program return feed enable

	actions['set_program_return_feed_enable_increment'] = {
		name: '⬆️ Increase Program return feed enable',
		description: 'Increase the value of Program return feed enable',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Increment',
				id: 'increment',
				default: 1,
				min: 1,
				max: 30.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('program_return_feed_enable', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(30.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'program_return_feed_enable', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('program_return_feed_enable', newValue, cameraId)
		},
	}
	// Action to decrement Program return feed enable

	actions['set_program_return_feed_enable_decrement'] = {
		name: '⬇️ Decrease Program return feed enable',
		description: 'Decrease the value of Program return feed enable',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Decrement',
				id: 'decrement',
				default: 1,
				min: 1,
				max: 30.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('program_return_feed_enable', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'program_return_feed_enable', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('program_return_feed_enable', newValue, cameraId)
		},
	}
	// Action to reset Program return feed enable al default value

	actions['set_program_return_feed_enable_reset'] = {
		name: '🔄 Reset Program return feed enable',
		description: 'Reset to default value (0)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId

			// Send default value
			await self.sendParam(cameraId, 'program_return_feed_enable', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('program_return_feed_enable', 0.0, cameraId)
		},
	}
	// Action for Timecode Source [0] (numeric)

	actions['set_timecode_source_0'] = {
		name: 'Set Timecode Source [0]',
		description: 'Group: Display | Param: Timecode Source | Note: Source (0 = Clip, 1 = Timecode)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Value',
				id: 'value',
				default: 0.0,
				min: 0.0,
				max: 1.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'timecode_source_0', event.options.value)
		},
	}
	// Action to increment Timecode Source [0]

	actions['set_timecode_source_0_increment'] = {
		name: '⬆️ Increase Timecode Source [0]',
		description: 'Increase the value of Timecode Source [0]',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Increment',
				id: 'increment',
				default: 1,
				min: 1,
				max: 1.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('timecode_source_0', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'timecode_source_0', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('timecode_source_0', newValue, cameraId)
		},
	}
	// Action to decrement Timecode Source [0]

	actions['set_timecode_source_0_decrement'] = {
		name: '⬇️ Decrease Timecode Source [0]',
		description: 'Decrease the value of Timecode Source [0]',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
			{
				type: 'number',
				label: 'Decrement',
				id: 'decrement',
				default: 1,
				min: 1,
				max: 1.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('timecode_source_0', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'timecode_source_0', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('timecode_source_0', newValue, cameraId)
		},
	}
	// Action to reset Timecode Source [0] al default value

	actions['set_timecode_source_0_reset'] = {
		name: '🔄 Reset Timecode Source [0]',
		description: 'Reset to default value (0)',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: self.config.defaultCameraId || 1,
				min: 1,
				max: 8,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId

			// Send default value
			await self.sendParam(cameraId, 'timecode_source_0', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('timecode_source_0', 0.0, cameraId)
		},
	}
	// Action for Tally brightness (numeric)
}
