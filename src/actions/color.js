// TallyCCU Pro - Color Correction Actions
// Lift, gamma, gain, offset, contrast, and color adjustments

module.exports = function (self, actions) {
	actions['set_contrast_adjust'] = {
		name: 'Set Contrast Adjust',
		description: 'Set values for Contrast Adjust',
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
				label: 'Pivot',
				id: 'value0',
				default: 0.5,
				min: 0.0,
				max: 1.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Adjust',
				id: 'value1',
				default: 1.0,
				min: 0.0,
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('contrast_adjust_0', event.options.value0, cameraId)
			self.storeParamValue('contrast_adjust_1', event.options.value1, cameraId)
		},
	}
	// Action to set only Contrast Adjust: Pivot

	actions['set_contrast_adjust_0'] = {
		name: 'Set Contrast Adjust: Pivot',
		description: 'Set value for Contrast Adjust: Pivot',
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
			values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('contrast_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action to increment Contrast Adjust: Pivot

	actions['set_contrast_adjust_0_increment'] = {
		name: '⬆️ Increase Contrast Adjust: Pivot',
		description: 'Increase the value of Contrast Adjust: Pivot',
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
			let currentValue = self.getParamValue('contrast_adjust_0', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('contrast_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action to decrement Contrast Adjust: Pivot

	actions['set_contrast_adjust_0_decrement'] = {
		name: '⬇️ Decrease Contrast Adjust: Pivot',
		description: 'Decrease the value of Contrast Adjust: Pivot',
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
			let currentValue = self.getParamValue('contrast_adjust_0', 0.5, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('contrast_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action to reset Contrast Adjust: Pivot al default value

	actions['set_contrast_adjust_0_reset'] = {
		name: '🔄 Reset Contrast Adjust: Pivot',
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
			values[1] = self.getParamValue('contrast_adjust_1', 1.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('contrast_adjust_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action to set only Contrast Adjust: Adjust

	actions['set_contrast_adjust_1'] = {
		name: 'Set Contrast Adjust: Adjust',
		description: 'Set value for Contrast Adjust: Adjust',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('contrast_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action to increment Contrast Adjust: Adjust

	actions['set_contrast_adjust_1_increment'] = {
		name: '⬆️ Increase Contrast Adjust: Adjust',
		description: 'Increase the value of Contrast Adjust: Adjust',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('contrast_adjust_1', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('contrast_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action to decrement Contrast Adjust: Adjust

	actions['set_contrast_adjust_1_decrement'] = {
		name: '⬇️ Decrease Contrast Adjust: Adjust',
		description: 'Decrease the value of Contrast Adjust: Adjust',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('contrast_adjust_1', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('contrast_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action to reset Contrast Adjust: Adjust al default value

	actions['set_contrast_adjust_1_reset'] = {
		name: '🔄 Reset Contrast Adjust: Adjust',
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
			const resetValue = 1.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('contrast_adjust_0', 0.5, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('contrast_adjust_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'contrast_adjust', valuesString)
		},
	}
	// Action for Color Adjust (multiple subindexes)

	actions['set_color_adjust'] = {
		name: 'Set Color Adjust',
		description: 'Set values for Color Adjust',
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
				label: 'Hue',
				id: 'value0',
				default: -1.0,
				min: -1.0,
				max: 1.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Saturation',
				id: 'value1',
				default: 1.0,
				min: 0.0,
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('color_adjust_0', event.options.value0, cameraId)
			self.storeParamValue('color_adjust_1', event.options.value1, cameraId)
		},
	}
	// Action to set onlyr Adjust: Hue

	actions['set_color_adjust_0'] = {
		name: 'Set Color Adjust: Hue',
		description: 'Set value for Color Adjust: Hue',
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
				default: -1.0,
				min: -1.0,
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
			values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('color_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action to increment Color Adjust: Hue

	actions['set_color_adjust_0_increment'] = {
		name: '⬆️ Increase Color Adjust: Hue',
		description: 'Increase the value of Color Adjust: Hue',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('color_adjust_0', -1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('color_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action to decrement Color Adjust: Hue

	actions['set_color_adjust_0_decrement'] = {
		name: '⬇️ Decrease Color Adjust: Hue',
		description: 'Decrease the value of Color Adjust: Hue',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('color_adjust_0', -1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-1.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('color_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action to reset Color Adjust: Hue al default value

	actions['set_color_adjust_0_reset'] = {
		name: '🔄 Reset Color Adjust: Hue',
		description: 'Reset to default value (-1.00)',
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
			const resetValue = -1.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('color_adjust_1', 1.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('color_adjust_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action to set onlyr Adjust: Saturation

	actions['set_color_adjust_1'] = {
		name: 'Set Color Adjust: Saturation',
		description: 'Set value for Color Adjust: Saturation',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('color_adjust_0', 0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('color_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action to increment Color Adjust: Saturation

	actions['set_color_adjust_1_increment'] = {
		name: '⬆️ Increase Color Adjust: Saturation',
		description: 'Increase the value of Color Adjust: Saturation',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('color_adjust_1', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('color_adjust_0', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('color_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action to decrement Color Adjust: Saturation

	actions['set_color_adjust_1_decrement'] = {
		name: '⬇️ Decrease Color Adjust: Saturation',
		description: 'Decrease the value of Color Adjust: Saturation',
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
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('color_adjust_1', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('color_adjust_0', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('color_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action to reset Color Adjust: Saturation al default value

	actions['set_color_adjust_1_reset'] = {
		name: '🔄 Reset Color Adjust: Saturation',
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
			const resetValue = 1.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('color_adjust_0', 0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('color_adjust_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'color_adjust', valuesString)
		},
	}
	// Action for Lift Adjust (multiple subindexes)

	actions['set_lift_adjust'] = {
		name: 'Set Lift Adjust',
		description: 'Set values for Lift Adjust',
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
				label: 'Red',
				id: 'value0',
				default: -2.0,
				min: -2.0,
				max: 2.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Green',
				id: 'value1',
				default: -2.0,
				min: -2.0,
				max: 2.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Blue',
				id: 'value2',
				default: -2.0,
				min: -2.0,
				max: 2.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Luma',
				id: 'value3',
				default: -2.0,
				min: -2.0,
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			values[2] = event.options.value2
			values[3] = event.options.value3
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('lift_adjust_0', event.options.value0, cameraId)
			self.storeParamValue('lift_adjust_1', event.options.value1, cameraId)
			self.storeParamValue('lift_adjust_2', event.options.value2, cameraId)
			self.storeParamValue('lift_adjust_3', event.options.value3, cameraId)
		},
	}
	// Action to set only Lift Adjust: Red

	actions['set_lift_adjust_0'] = {
		name: 'Set Lift Adjust: Red',
		description: 'Set value for Lift Adjust: Red',
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
				default: -2.0,
				min: -2.0,
				max: 2.0,
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
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to increment Lift Adjust: Red

	actions['set_lift_adjust_0_increment'] = {
		name: '⬆️ Increase Lift Adjust: Red',
		description: 'Increase the value of Lift Adjust: Red',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_0', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to decrement Lift Adjust: Red

	actions['set_lift_adjust_0_decrement'] = {
		name: '⬇️ Decrease Lift Adjust: Red',
		description: 'Decrease the value of Lift Adjust: Red',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_0', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-2.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to reset Lift Adjust: Red al default value

	actions['set_lift_adjust_0_reset'] = {
		name: '🔄 Reset Lift Adjust: Red',
		description: 'Reset to default value (-2.00)',
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
			const resetValue = -2.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('lift_adjust_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to set only Lift Adjust: Green

	actions['set_lift_adjust_1'] = {
		name: 'Set Lift Adjust: Green',
		description: 'Set value for Lift Adjust: Green',
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
				default: -2.0,
				min: -2.0,
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to increment Lift Adjust: Green

	actions['set_lift_adjust_1_increment'] = {
		name: '⬆️ Increase Lift Adjust: Green',
		description: 'Increase the value of Lift Adjust: Green',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_1', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to decrement Lift Adjust: Green

	actions['set_lift_adjust_1_decrement'] = {
		name: '⬇️ Decrease Lift Adjust: Green',
		description: 'Decrease the value of Lift Adjust: Green',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_1', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-2.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to reset Lift Adjust: Green al default value

	actions['set_lift_adjust_1_reset'] = {
		name: '🔄 Reset Lift Adjust: Green',
		description: 'Reset to default value (-2.00)',
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
			const resetValue = -2.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('lift_adjust_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to set only Lift Adjust: Blue

	actions['set_lift_adjust_2'] = {
		name: 'Set Lift Adjust: Blue',
		description: 'Set value for Lift Adjust: Blue',
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
				default: -2.0,
				min: -2.0,
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For the subindex being modified, use the new value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to increment Lift Adjust: Blue

	actions['set_lift_adjust_2_increment'] = {
		name: '⬆️ Increase Lift Adjust: Blue',
		description: 'Increase the value of Lift Adjust: Blue',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_2', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to decrement Lift Adjust: Blue

	actions['set_lift_adjust_2_decrement'] = {
		name: '⬇️ Decrease Lift Adjust: Blue',
		description: 'Decrease the value of Lift Adjust: Blue',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_2', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-2.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to reset Lift Adjust: Blue al default value

	actions['set_lift_adjust_2_reset'] = {
		name: '🔄 Reset Lift Adjust: Blue',
		description: 'Reset to default value (-2.00)',
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
			const resetValue = -2.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For the subindex being reset, use its default value
			values[2] = resetValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('lift_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('lift_adjust_2', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to set only Lift Adjust: Luma

	actions['set_lift_adjust_3'] = {
		name: 'Set Lift Adjust: Luma',
		description: 'Set value for Lift Adjust: Luma',
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
				default: -2.0,
				min: -2.0,
				max: 2.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For the subindex being modified, use the new value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to increment Lift Adjust: Luma

	actions['set_lift_adjust_3_increment'] = {
		name: '⬆️ Increase Lift Adjust: Luma',
		description: 'Increase the value of Lift Adjust: Luma',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_3', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to decrement Lift Adjust: Luma

	actions['set_lift_adjust_3_decrement'] = {
		name: '⬇️ Decrease Lift Adjust: Luma',
		description: 'Decrease the value of Lift Adjust: Luma',
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
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('lift_adjust_3', -2.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-2.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('lift_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action to reset Lift Adjust: Luma al default value

	actions['set_lift_adjust_3_reset'] = {
		name: '🔄 Reset Lift Adjust: Luma',
		description: 'Reset to default value (-2.00)',
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
			const resetValue = -2.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('lift_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('lift_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('lift_adjust_2', 0, cameraId)
			// For the subindex being reset, use its default value
			values[3] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('lift_adjust_3', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'lift_adjust', valuesString)
		},
	}
	// Action for Gamultiple subindexes)

	actions['set_gamma_adjust'] = {
		name: 'Set Gamma Adjust',
		description: 'Set values for Gamma Adjust',
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
				label: 'Red',
				id: 'value0',
				default: -4.0,
				min: -4.0,
				max: 4.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Green',
				id: 'value1',
				default: -4.0,
				min: -4.0,
				max: 4.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Blue',
				id: 'value2',
				default: -4.0,
				min: -4.0,
				max: 4.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Luma',
				id: 'value3',
				default: -4.0,
				min: -4.0,
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			values[2] = event.options.value2
			values[3] = event.options.value3
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('gamma_adjust_0', event.options.value0, cameraId)
			self.storeParamValue('gamma_adjust_1', event.options.value1, cameraId)
			self.storeParamValue('gamma_adjust_2', event.options.value2, cameraId)
			self.storeParamValue('gamma_adjust_3', event.options.value3, cameraId)
		},
	}
	// Action to set only Gamma Adjust: Red

	actions['set_gamma_adjust_0'] = {
		name: 'Set Gamma Adjust: Red',
		description: 'Set value for Gamma Adjust: Red',
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
				default: -4.0,
				min: -4.0,
				max: 4.0,
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
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to increment Gamma Adjust: Red

	actions['set_gamma_adjust_0_increment'] = {
		name: '⬆️ Increase Gamma Adjust: Red',
		description: 'Increase the value of Gamma Adjust: Red',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_0', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.min(4.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to decrement Gamma Adjust: Red

	actions['set_gamma_adjust_0_decrement'] = {
		name: '⬇️ Decrease Gamma Adjust: Red',
		description: 'Decrease the value of Gamma Adjust: Red',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_0', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-4.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to reset Gamma Adjust: Red al default value

	actions['set_gamma_adjust_0_reset'] = {
		name: '🔄 Reset Gamma Adjust: Red',
		description: 'Reset to default value (-4.00)',
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
			const resetValue = -4.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('gamma_adjust_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to set only Gamma Adjust: Green

	actions['set_gamma_adjust_1'] = {
		name: 'Set Gamma Adjust: Green',
		description: 'Set value for Gamma Adjust: Green',
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
				default: -4.0,
				min: -4.0,
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to increment Gamma Adjust: Green

	actions['set_gamma_adjust_1_increment'] = {
		name: '⬆️ Increase Gamma Adjust: Green',
		description: 'Increase the value of Gamma Adjust: Green',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_1', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.min(4.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to decrement Gamma Adjust: Green

	actions['set_gamma_adjust_1_decrement'] = {
		name: '⬇️ Decrease Gamma Adjust: Green',
		description: 'Decrease the value of Gamma Adjust: Green',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_1', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-4.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to reset Gamma Adjust: Green al default value

	actions['set_gamma_adjust_1_reset'] = {
		name: '🔄 Reset Gamma Adjust: Green',
		description: 'Reset to default value (-4.00)',
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
			const resetValue = -4.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('gamma_adjust_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to set only Gamma Adjust: Blue

	actions['set_gamma_adjust_2'] = {
		name: 'Set Gamma Adjust: Blue',
		description: 'Set value for Gamma Adjust: Blue',
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
				default: -4.0,
				min: -4.0,
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For the subindex being modified, use the new value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to increment Gamma Adjust: Blue

	actions['set_gamma_adjust_2_increment'] = {
		name: '⬆️ Increase Gamma Adjust: Blue',
		description: 'Increase the value of Gamma Adjust: Blue',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_2', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.min(4.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to decrement Gamma Adjust: Blue

	actions['set_gamma_adjust_2_decrement'] = {
		name: '⬇️ Decrease Gamma Adjust: Blue',
		description: 'Decrease the value of Gamma Adjust: Blue',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_2', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-4.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to reset Gamma Adjust: Blue al default value

	actions['set_gamma_adjust_2_reset'] = {
		name: '🔄 Reset Gamma Adjust: Blue',
		description: 'Reset to default value (-4.00)',
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
			const resetValue = -4.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For the subindex being reset, use its default value
			values[2] = resetValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gamma_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('gamma_adjust_2', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to set only Gamma Adjust: Luma

	actions['set_gamma_adjust_3'] = {
		name: 'Set Gamma Adjust: Luma',
		description: 'Set value for Gamma Adjust: Luma',
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
				default: -4.0,
				min: -4.0,
				max: 4.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For the subindex being modified, use the new value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to increment Gamma Adjust: Luma

	actions['set_gamma_adjust_3_increment'] = {
		name: '⬆️ Increase Gamma Adjust: Luma',
		description: 'Increase the value of Gamma Adjust: Luma',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_3', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.min(4.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to decrement Gamma Adjust: Luma

	actions['set_gamma_adjust_3_decrement'] = {
		name: '⬇️ Decrease Gamma Adjust: Luma',
		description: 'Decrease the value of Gamma Adjust: Luma',
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
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gamma_adjust_3', -4.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-4.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('gamma_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action to reset Gamma Adjust: Luma al default value

	actions['set_gamma_adjust_3_reset'] = {
		name: '🔄 Reset Gamma Adjust: Luma',
		description: 'Reset to default value (-4.00)',
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
			const resetValue = -4.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gamma_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gamma_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gamma_adjust_2', 0, cameraId)
			// For the subindex being reset, use its default value
			values[3] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('gamma_adjust_3', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gamma_adjust', valuesString)
		},
	}
	// Action for Gain Adjust (multiple subindexes)

	actions['set_gain_adjust'] = {
		name: 'Set Gain Adjust',
		description: 'Set values for Gain Adjust',
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
				label: 'Red',
				id: 'value0',
				default: 1.0,
				min: 0.0,
				max: 16.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Green',
				id: 'value1',
				default: 1.0,
				min: 0.0,
				max: 16.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Blue',
				id: 'value2',
				default: 1.0,
				min: 0.0,
				max: 16.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Luma',
				id: 'value3',
				default: 1.0,
				min: 0.0,
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			values[2] = event.options.value2
			values[3] = event.options.value3
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('gain_adjust_0', event.options.value0, cameraId)
			self.storeParamValue('gain_adjust_1', event.options.value1, cameraId)
			self.storeParamValue('gain_adjust_2', event.options.value2, cameraId)
			self.storeParamValue('gain_adjust_3', event.options.value3, cameraId)
		},
	}
	// Action to set only Gain Adjust: Red

	actions['set_gain_adjust_0'] = {
		name: 'Set Gain Adjust: Red',
		description: 'Set value for Gain Adjust: Red',
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
				max: 16.0,
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
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to increment Gain Adjust: Red

	actions['set_gain_adjust_0_increment'] = {
		name: '⬆️ Increase Gain Adjust: Red',
		description: 'Increase the value of Gain Adjust: Red',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_0', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(16.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to decrement Gain Adjust: Red

	actions['set_gain_adjust_0_decrement'] = {
		name: '⬇️ Decrease Gain Adjust: Red',
		description: 'Decrease the value of Gain Adjust: Red',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_0', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to reset Gain Adjust: Red al default value

	actions['set_gain_adjust_0_reset'] = {
		name: '🔄 Reset Gain Adjust: Red',
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
			const resetValue = 1.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('gain_adjust_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to set only Gain Adjust: Green

	actions['set_gain_adjust_1'] = {
		name: 'Set Gain Adjust: Green',
		description: 'Set value for Gain Adjust: Green',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to increment Gain Adjust: Green

	actions['set_gain_adjust_1_increment'] = {
		name: '⬆️ Increase Gain Adjust: Green',
		description: 'Increase the value of Gain Adjust: Green',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_1', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(16.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to decrement Gain Adjust: Green

	actions['set_gain_adjust_1_decrement'] = {
		name: '⬇️ Decrease Gain Adjust: Green',
		description: 'Decrease the value of Gain Adjust: Green',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_1', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to reset Gain Adjust: Green al default value

	actions['set_gain_adjust_1_reset'] = {
		name: '🔄 Reset Gain Adjust: Green',
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
			const resetValue = 1.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('gain_adjust_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to set only Gain Adjust: Blue

	actions['set_gain_adjust_2'] = {
		name: 'Set Gain Adjust: Blue',
		description: 'Set value for Gain Adjust: Blue',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For the subindex being modified, use the new value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to increment Gain Adjust: Blue

	actions['set_gain_adjust_2_increment'] = {
		name: '⬆️ Increase Gain Adjust: Blue',
		description: 'Increase the value of Gain Adjust: Blue',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_2', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(16.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to decrement Gain Adjust: Blue

	actions['set_gain_adjust_2_decrement'] = {
		name: '⬇️ Decrease Gain Adjust: Blue',
		description: 'Decrease the value of Gain Adjust: Blue',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_2', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to reset Gain Adjust: Blue al default value

	actions['set_gain_adjust_2_reset'] = {
		name: '🔄 Reset Gain Adjust: Blue',
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
			const resetValue = 1.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For the subindex being reset, use its default value
			values[2] = resetValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('gain_adjust_2', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to set only Gain Adjust: Luma

	actions['set_gain_adjust_3'] = {
		name: 'Set Gain Adjust: Luma',
		description: 'Set value for Gain Adjust: Luma',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For the subindex being modified, use the new value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to increment Gain Adjust: Luma

	actions['set_gain_adjust_3_increment'] = {
		name: '⬆️ Increase Gain Adjust: Luma',
		description: 'Increase the value of Gain Adjust: Luma',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(16.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to decrement Gain Adjust: Luma

	actions['set_gain_adjust_3_decrement'] = {
		name: '⬇️ Decrease Gain Adjust: Luma',
		description: 'Decrease the value of Gain Adjust: Luma',
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
				max: 16.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_adjust_3', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('gain_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action to reset Gain Adjust: Luma al default value

	actions['set_gain_adjust_3_reset'] = {
		name: '🔄 Reset Gain Adjust: Luma',
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
			const resetValue = 1.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('gain_adjust_0', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('gain_adjust_1', 1.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('gain_adjust_2', 1.0, cameraId)
			// For the subindex being reset, use its default value
			values[3] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('gain_adjust_3', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'gain_adjust', valuesString)
		},
	}
	// Action for Offset Adjust (multiple subindexes)

	actions['set_offset_adjust'] = {
		name: 'Set Offset Adjust',
		description: 'Set values for Offset Adjust',
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
				label: 'Red',
				id: 'value0',
				default: -8.0,
				min: -8.0,
				max: 8.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Green',
				id: 'value1',
				default: -8.0,
				min: -8.0,
				max: 8.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Blue',
				id: 'value2',
				default: -8.0,
				min: -8.0,
				max: 8.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: 'Luma',
				id: 'value3',
				default: -8.0,
				min: -8.0,
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			values[2] = event.options.value2
			values[3] = event.options.value3
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('offset_adjust_0', event.options.value0, cameraId)
			self.storeParamValue('offset_adjust_1', event.options.value1, cameraId)
			self.storeParamValue('offset_adjust_2', event.options.value2, cameraId)
			self.storeParamValue('offset_adjust_3', event.options.value3, cameraId)
		},
	}
	// Action to set only Offset Adjust: Red

	actions['set_luma_mix'] = {
		name: 'Set Luma mix',
		description: 'Group: Color Correction | Param: Luma mix | Note: -',
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
			await self.sendParam(cameraId, 'luma_mix', event.options.value)
		},
	}
	// Action to increment Luma mix

	actions['set_luma_mix_increment'] = {
		name: '⬆️ Increase Luma mix',
		description: 'Increase the value of Luma mix',
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
			let currentValue = self.getParamValue('luma_mix', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'luma_mix', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('luma_mix', newValue, cameraId)
		},
	}
	// Action to decrement Luma mix

	actions['set_luma_mix_decrement'] = {
		name: '⬇️ Decrease Luma mix',
		description: 'Decrease the value of Luma mix',
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
			let currentValue = self.getParamValue('luma_mix', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'luma_mix', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('luma_mix', newValue, cameraId)
		},
	}
	// Action to reset Luma mix al default value

	actions['set_luma_mix_reset'] = {
		name: '🔄 Reset Luma mix',
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
			await self.sendParam(cameraId, 'luma_mix', 1.0)

			// Store default value for this specific camera
			self.storeParamValue('luma_mix', 1.0, cameraId)
		},
	}
	// Action for Correction Reset Default (void)

	actions['set_correction_reset_default'] = {
		name: 'Trigger Correction Reset Default',
		description: 'Group: Color Correction | Param: Correction Reset Default | Note: Reset to defaults',
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
			await self.sendParam(cameraId, 'correction_reset_default', '1')
		},
	}
	// Special action for Pan/Tilt Velocity
}
