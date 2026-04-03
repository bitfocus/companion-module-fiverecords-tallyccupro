// TallyCCU Pro - Audio Actions
// Microphone, headphone, speaker levels, and input settings

module.exports = function (self, actions) {
	actions['set_mic_level'] = {
		name: 'Set Mic level',
		description: 'Group: Audio | Param: Mic level | Note: 0.0 = Minimum, 1.0 = Maximum',
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
				default: 0.7,
				min: 0.0,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'mic_level', event.options.value)
		},
	}
	// Action to increment Mic level

	actions['set_mic_level_increment'] = {
		name: '⬆️ Increase Mic level',
		description: 'Increase the value of Mic level',
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
			let currentValue = self.getParamValue('mic_level', 0.7, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'mic_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('mic_level', newValue, cameraId)
		},
	}
	// Action to decrement Mic level

	actions['set_mic_level_decrement'] = {
		name: '⬇️ Decrease Mic level',
		description: 'Decrease the value of Mic level',
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
			let currentValue = self.getParamValue('mic_level', 0.7, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'mic_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('mic_level', newValue, cameraId)
		},
	}
	// Action to reset Mic level al default value

	actions['set_mic_level_reset'] = {
		name: '🔄 Reset Mic level',
		description: 'Reset to default value (0.70)',
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
			await self.sendParam(cameraId, 'mic_level', 0.7)

			// Store default value for this specific camera
			self.storeParamValue('mic_level', 0.7, cameraId)
		},
	}
	// Action for Headphone level (numeric)

	actions['set_headphone_level'] = {
		name: 'Set Headphone level',
		description: 'Group: Audio | Param: Headphone level | Note: 0.0 = Minimum, 1.0 = Maximum',
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
			await self.sendParam(cameraId, 'headphone_level', event.options.value)
		},
	}
	// Action to increment Headphone level

	actions['set_headphone_level_increment'] = {
		name: '⬆️ Increase Headphone level',
		description: 'Increase the value of Headphone level',
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
			let currentValue = self.getParamValue('headphone_level', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'headphone_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('headphone_level', newValue, cameraId)
		},
	}
	// Action to decrement Headphone level

	actions['set_headphone_level_decrement'] = {
		name: '⬇️ Decrease Headphone level',
		description: 'Decrease the value of Headphone level',
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
			let currentValue = self.getParamValue('headphone_level', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'headphone_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('headphone_level', newValue, cameraId)
		},
	}
	// Action to reset Headphone level al default value

	actions['set_headphone_level_reset'] = {
		name: '🔄 Reset Headphone level',
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
			await self.sendParam(cameraId, 'headphone_level', 1.0)

			// Store default value for this specific camera
			self.storeParamValue('headphone_level', 1.0, cameraId)
		},
	}
	// Action for Headphone program mix (numeric)

	actions['set_headphone_program_mix'] = {
		name: 'Set Headphone program mix',
		description: 'Group: Audio | Param: Headphone program mix | Note: 0.0 = Minimum, 1.0 = Maximum',
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
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'headphone_program_mix', event.options.value)
		},
	}
	// Action to increment Headphone program mix

	actions['set_headphone_program_mix_increment'] = {
		name: '⬆️ Increase Headphone program mix',
		description: 'Increase the value of Headphone program mix',
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
			let currentValue = self.getParamValue('headphone_program_mix', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'headphone_program_mix', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('headphone_program_mix', newValue, cameraId)
		},
	}
	// Action to decrement Headphone program mix

	actions['set_headphone_program_mix_decrement'] = {
		name: '⬇️ Decrease Headphone program mix',
		description: 'Decrease the value of Headphone program mix',
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
			let currentValue = self.getParamValue('headphone_program_mix', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'headphone_program_mix', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('headphone_program_mix', newValue, cameraId)
		},
	}
	// Action to reset Headphone program mix al default value

	actions['set_headphone_program_mix_reset'] = {
		name: '🔄 Reset Headphone program mix',
		description: 'Reset to default value (0.00)',
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
			await self.sendParam(cameraId, 'headphone_program_mix', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('headphone_program_mix', 0.0, cameraId)
		},
	}
	// Action for Speaker level (numeric)

	actions['set_speaker_level'] = {
		name: 'Set Speaker level',
		description: 'Group: Audio | Param: Speaker level | Note: 0.0 = Minimum, 1.0 = Maximum',
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
			await self.sendParam(cameraId, 'speaker_level', event.options.value)
		},
	}
	// Action to increment Speaker level

	actions['set_speaker_level_increment'] = {
		name: '⬆️ Increase Speaker level',
		description: 'Increase the value of Speaker level',
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
			let currentValue = self.getParamValue('speaker_level', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'speaker_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('speaker_level', newValue, cameraId)
		},
	}
	// Action to decrement Speaker level

	actions['set_speaker_level_decrement'] = {
		name: '⬇️ Decrease Speaker level',
		description: 'Decrease the value of Speaker level',
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
			let currentValue = self.getParamValue('speaker_level', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'speaker_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('speaker_level', newValue, cameraId)
		},
	}
	// Action to reset Speaker level al default value

	actions['set_speaker_level_reset'] = {
		name: '🔄 Reset Speaker level',
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
			await self.sendParam(cameraId, 'speaker_level', 1.0)

			// Store default value for this specific camera
			self.storeParamValue('speaker_level', 1.0, cameraId)
		},
	}
	// Action for Input type (numeric)

	actions['set_input_type'] = {
		name: 'Set Input type',
		description:
			'Group: Audio | Param: Input type | Note: 0 = Internal Mic, 1 = Line Level Input, 2 = Low Mic Level Input, 3 = High Mic Level Input',
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
				max: 3.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'input_type', event.options.value)
		},
	}
	// Action to increment Input type

	actions['set_input_type_increment'] = {
		name: '⬆️ Increase Input type',
		description: 'Increase the value of Input type',
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
				max: 3.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('input_type', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(3.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'input_type', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('input_type', newValue, cameraId)
		},
	}
	// Action to decrement Input type

	actions['set_input_type_decrement'] = {
		name: '⬇️ Decrease Input type',
		description: 'Decrease the value of Input type',
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
				max: 3.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('input_type', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'input_type', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('input_type', newValue, cameraId)
		},
	}
	// Action to reset Input type al default value

	actions['set_input_type_reset'] = {
		name: '🔄 Reset Input type',
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
			await self.sendParam(cameraId, 'input_type', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('input_type', 0.0, cameraId)
		},
	}
	// Action for Input levels (multiple subindexes)

	actions['set_input_levels'] = {
		name: 'Set Input levels',
		description: 'Set values for Input levels',
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
				label: 'Ch1 = 0.0 Minimum, 1.0 Maximum',
				id: 'value0',
				default: 0.5,
				min: 0.0,
				max: 1.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Ch2 = 0.0 Minimum, 1.0 Maximum',
				id: 'value1',
				default: 0.5,
				min: 0.0,
				max: 1.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('input_levels_0', event.options.value0, cameraId)
			self.storeParamValue('input_levels_1', event.options.value1, cameraId)
		},
	}
	// Action to set only Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum

	actions['set_input_levels_0'] = {
		name: 'Set Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
		description: 'Set value for Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
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
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For the subindex being modified, use the new value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('input_levels_1', 0.5, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('input_levels_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action to increment Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum

	actions['set_input_levels_0_increment'] = {
		name: '⬆️ Increase Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
		description: 'Increase the value of Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
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
			let currentValue = self.getParamValue('input_levels_0', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('input_levels_1', 0.5, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('input_levels_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action to decrement Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum

	actions['set_input_levels_0_decrement'] = {
		name: '⬇️ Decrease Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
		description: 'Decrease the value of Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
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
			let currentValue = self.getParamValue('input_levels_0', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('input_levels_1', 0.5, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('input_levels_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action to reset Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum al default value

	actions['set_input_levels_0_reset'] = {
		name: '🔄 Reset Input levels: Ch1 = 0.0 Minimum, 1.0 Maximum',
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
			const resetValue = 0.5

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('input_levels_1', 0.5, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('input_levels_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action to set only Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum

	actions['set_input_levels_1'] = {
		name: 'Set Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
		description: 'Set value for Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
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
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('input_levels_0', 0.5, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('input_levels_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action to increment Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum

	actions['set_input_levels_1_increment'] = {
		name: '⬆️ Increase Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
		description: 'Increase the value of Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
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
			let currentValue = self.getParamValue('input_levels_1', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('input_levels_0', 0.5, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('input_levels_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action to decrement Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum

	actions['set_input_levels_1_decrement'] = {
		name: '⬇️ Decrease Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
		description: 'Decrease the value of Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
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
			let currentValue = self.getParamValue('input_levels_1', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('input_levels_0', 0.5, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('input_levels_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action to reset Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum al default value

	actions['set_input_levels_1_reset'] = {
		name: '🔄 Reset Input levels: Ch2 = 0.0 Minimum, 1.0 Maximum',
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
			const resetValue = 0.5

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('input_levels_0', 0.5, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('input_levels_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'input_levels', valuesString)
		},
	}
	// Action for Phantom power (boolean)

	actions['set_phantom_power'] = {
		name: 'Set Phantom power',
		description: 'Group: Audio | Param: Phantom power | Note: True = Powered, False = Not powered',
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
				type: 'checkbox',
				label: 'Value',
				id: 'value',
				default: false,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const value = event.options.value ? 1 : 0
			await self.sendParam(cameraId, 'phantom_power', value)
		},
	}
	// Action for Overlays (multiple subindexes)
}
