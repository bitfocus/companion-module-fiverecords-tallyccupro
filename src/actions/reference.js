// TallyCCU Pro - Reference Actions
// Reference source and offset settings

module.exports = function (self, actions) {
	actions['set_source'] = {
		name: 'Set Source',
		description: 'Group: Reference | Param: Source | Note: 0 = Internal, 1 = Program, 2 = External',
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
				max: 2.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'source', event.options.value)
		},
	}
	// Action to increment Source

	actions['set_source_increment'] = {
		name: '⬆️ Increase Source',
		description: 'Increase the value of Source',
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
				max: 2.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('source', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'source', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('source', newValue, cameraId)
		},
	}
	// Action to decrement Source

	actions['set_source_decrement'] = {
		name: '⬇️ Decrease Source',
		description: 'Decrease the value of Source',
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
				max: 2.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('source', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'source', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('source', newValue, cameraId)
		},
	}
	// Action to reset Source al default value

	actions['set_source_reset'] = {
		name: '🔄 Reset Source',
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
			await self.sendParam(cameraId, 'source', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('source', 0.0, cameraId)
		},
	}
	// Action for Offset (numeric)

	actions['set_offset'] = {
		name: 'Set Offset',
		description: 'Group: Reference | Param: Offset | Note: +/- offset in pixels',
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
				default: 0,
				min: 0,
				max: 1,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'offset', event.options.value)
		},
	}
	// Action to increment Offset

	actions['set_offset_increment'] = {
		name: '⬆️ Increase Offset',
		description: 'Increase the value of Offset',
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
				max: 1,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('offset', 0, cameraId)

			// Calculate new value
			let newValue = Math.min(1, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'offset', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('offset', newValue, cameraId)
		},
	}
	// Action to decrement Offset

	actions['set_offset_decrement'] = {
		name: '⬇️ Decrease Offset',
		description: 'Decrease the value of Offset',
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
				max: 1,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('offset', 0, cameraId)

			// Calculate new value
			let newValue = Math.max(0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'offset', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('offset', newValue, cameraId)
		},
	}
	// Action to reset Offset al default value

	actions['set_offset_reset'] = {
		name: '🔄 Reset Offset',
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
			await self.sendParam(cameraId, 'offset', 0)

			// Store default value for this specific camera
			self.storeParamValue('offset', 0, cameraId)
		},
	}
	// Action for Contrast Adjust (multiple subindexes)

	actions['set_offset_adjust_0'] = {
		name: 'Set Offset Adjust: Red',
		description: 'Set value for Offset Adjust: Red',
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
				default: -8.0,
				min: -8.0,
				max: 8.0,
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
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to increment Offset Adjust: Red

	actions['set_offset_adjust_0_increment'] = {
		name: '⬆️ Increase Offset Adjust: Red',
		description: 'Increase the value of Offset Adjust: Red',
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
			let currentValue = self.getParamValue('offset_adjust_0', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.min(8.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to decrement Offset Adjust: Red

	actions['set_offset_adjust_0_decrement'] = {
		name: '⬇️ Decrease Offset Adjust: Red',
		description: 'Decrease the value of Offset Adjust: Red',
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
			let currentValue = self.getParamValue('offset_adjust_0', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-8.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to reset Offset Adjust: Red al default value

	actions['set_offset_adjust_0_reset'] = {
		name: '🔄 Reset Offset Adjust: Red',
		description: 'Reset to default value (-8.00)',
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
			const resetValue = -8.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('offset_adjust_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to set only Offset Adjust: Green

	actions['set_offset_adjust_1'] = {
		name: 'Set Offset Adjust: Green',
		description: 'Set value for Offset Adjust: Green',
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
				default: -8.0,
				min: -8.0,
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to increment Offset Adjust: Green

	actions['set_offset_adjust_1_increment'] = {
		name: '⬆️ Increase Offset Adjust: Green',
		description: 'Increase the value of Offset Adjust: Green',
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
			let currentValue = self.getParamValue('offset_adjust_1', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.min(8.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to decrement Offset Adjust: Green

	actions['set_offset_adjust_1_decrement'] = {
		name: '⬇️ Decrease Offset Adjust: Green',
		description: 'Decrease the value of Offset Adjust: Green',
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
			let currentValue = self.getParamValue('offset_adjust_1', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-8.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to reset Offset Adjust: Green al default value

	actions['set_offset_adjust_1_reset'] = {
		name: '🔄 Reset Offset Adjust: Green',
		description: 'Reset to default value (-8.00)',
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
			const resetValue = -8.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('offset_adjust_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to set only Offset Adjust: Blue

	actions['set_offset_adjust_2'] = {
		name: 'Set Offset Adjust: Blue',
		description: 'Set value for Offset Adjust: Blue',
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
				default: -8.0,
				min: -8.0,
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For the subindex being modified, use the new value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to increment Offset Adjust: Blue

	actions['set_offset_adjust_2_increment'] = {
		name: '⬆️ Increase Offset Adjust: Blue',
		description: 'Increase the value of Offset Adjust: Blue',
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
			let currentValue = self.getParamValue('offset_adjust_2', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.min(8.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to decrement Offset Adjust: Blue

	actions['set_offset_adjust_2_decrement'] = {
		name: '⬇️ Decrease Offset Adjust: Blue',
		description: 'Decrease the value of Offset Adjust: Blue',
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
			let currentValue = self.getParamValue('offset_adjust_2', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-8.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to reset Offset Adjust: Blue al default value

	actions['set_offset_adjust_2_reset'] = {
		name: '🔄 Reset Offset Adjust: Blue',
		description: 'Reset to default value (-8.00)',
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
			const resetValue = -8.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For the subindex being reset, use its default value
			values[2] = resetValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('offset_adjust_3', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('offset_adjust_2', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to set only Offset Adjust: Luma

	actions['set_offset_adjust_3'] = {
		name: 'Set Offset Adjust: Luma',
		description: 'Set value for Offset Adjust: Luma',
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
				default: -8.0,
				min: -8.0,
				max: 8.0,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For the subindex being modified, use the new value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to increment Offset Adjust: Luma

	actions['set_offset_adjust_3_increment'] = {
		name: '⬆️ Increase Offset Adjust: Luma',
		description: 'Increase the value of Offset Adjust: Luma',
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
			let currentValue = self.getParamValue('offset_adjust_3', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.min(8.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For the subindex being modified, use the incremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to decrement Offset Adjust: Luma

	actions['set_offset_adjust_3_decrement'] = {
		name: '⬇️ Decrease Offset Adjust: Luma',
		description: 'Decrease the value of Offset Adjust: Luma',
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
			let currentValue = self.getParamValue('offset_adjust_3', -8.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-8.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For the subindex being modified, use the decremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('offset_adjust_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action to reset Offset Adjust: Luma al default value

	actions['set_offset_adjust_3_reset'] = {
		name: '🔄 Reset Offset Adjust: Luma',
		description: 'Reset to default value (-8.00)',
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
			const resetValue = -8.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('offset_adjust_0', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('offset_adjust_1', 0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('offset_adjust_2', 0, cameraId)
			// For the subindex being reset, use its default value
			values[3] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('offset_adjust_3', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'offset_adjust', valuesString)
		},
	}
	// Action for Luma mix (numeric)
}
