// TallyCCU Pro - Output Actions
// Overlay settings and frame guides

module.exports = function (self, actions) {
	actions['set_overlays'] = {
		name: 'Set Overlays',
		description: 'Set values for Overlays',
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
				label:
					'Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
				id: 'value0',
				default: 5.0,
				min: 0.0,
				max: 10.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
				id: 'value1',
				default: 100.0,
				min: 0.0,
				max: 100.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'Safe Area Percentage (0 means off)',
				id: 'value2',
				default: 0.0,
				min: 0.0,
				max: 100.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
				id: 'value3',
				default: 9.0,
				min: 0.0,
				max: 15.0,
				step: 1,
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
			await self.sendParam(cameraId, 'overlays', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('overlays_0', event.options.value0, cameraId)
			self.storeParamValue('overlays_1', event.options.value1, cameraId)
			self.storeParamValue('overlays_2', event.options.value2, cameraId)
			self.storeParamValue('overlays_3', event.options.value3, cameraId)
		},
	}
	// Action to set only Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)

	actions['set_overlays_0'] = {
		name: 'Set Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
		description:
			'Set value for Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
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
				default: 5.0,
				min: 0.0,
				max: 10.0,
				step: 1,
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
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to increment Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)

	actions['set_overlays_0_increment'] = {
		name: '⬆️ Increase Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
		description:
			'Increase the value of Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
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
				max: 10.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_0', 5.0, cameraId)

			// Calculate new value
			let newValue = Math.min(10.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to decrement Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)

	actions['set_overlays_0_decrement'] = {
		name: '⬇️ Decrease Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
		description:
			'Decrease the value of Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
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
				max: 10.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_0', 5.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to reset Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1) al default value

	actions['set_overlays_0_reset'] = {
		name: '🔄 Reset Overlays: Frame guides style (0 = Off, 1 = 2.4:1, 2 = 2.39:1, 3 = 2.35:1, 4 = 1.85:1, 5 = 16:9, 6 = 14:9, 7 = 4:3, 8 = 2:1, 9 = 4:5, 10 = 1:1)',
		description: 'Reset to default value (5)',
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
			const resetValue = 5.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('overlays_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to set only Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)

	actions['set_overlays_1'] = {
		name: 'Set Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
		description: 'Set value for Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
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
				default: 100.0,
				min: 0.0,
				max: 100.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to increment Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)

	actions['set_overlays_1_increment'] = {
		name: '⬆️ Increase Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
		description: 'Increase the value of Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
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
				max: 100.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_1', 100.0, cameraId)

			// Calculate new value
			let newValue = Math.min(100.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to decrement Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)

	actions['set_overlays_1_decrement'] = {
		name: '⬇️ Decrease Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
		description: 'Decrease the value of Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
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
				max: 100.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_1', 100.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to reset Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque) al default value

	actions['set_overlays_1_reset'] = {
		name: '🔄 Reset Overlays: Frame Guide Opacity (0 = Transparent, 100 = Opaque)',
		description: 'Reset to default value (100)',
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
			const resetValue = 100.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('overlays_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to set only Overlays: Safe Area Percentage (0 means off)

	actions['set_overlays_2'] = {
		name: 'Set Overlays: Safe Area Percentage (0 means off)',
		description: 'Set value for Overlays: Safe Area Percentage (0 means off)',
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
				max: 100.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For the subindex being modified, use the new value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to increment Overlays: Safe Area Percentage (0 means off)

	actions['set_overlays_2_increment'] = {
		name: '⬆️ Increase Overlays: Safe Area Percentage (0 means off)',
		description: 'Increase the value of Overlays: Safe Area Percentage (0 means off)',
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
				max: 100.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_2', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(100.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to decrement Overlays: Safe Area Percentage (0 means off)

	actions['set_overlays_2_decrement'] = {
		name: '⬇️ Decrease Overlays: Safe Area Percentage (0 means off)',
		description: 'Decrease the value of Overlays: Safe Area Percentage (0 means off)',
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
				max: 100.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_2', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('overlays_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to reset Overlays: Safe Area Percentage (0 means off) al default value

	actions['set_overlays_2_reset'] = {
		name: '🔄 Reset Overlays: Safe Area Percentage (0 means off)',
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
			const resetValue = 0.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For the subindex being reset, use its default value
			values[2] = resetValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('overlays_3', 9.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('overlays_2', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to set only Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)

	actions['set_overlays_3'] = {
		name: 'Set Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
		description:
			'Set value for Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
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
				default: 9.0,
				min: 0.0,
				max: 15.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For the subindex being modified, use the new value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('overlays_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to increment Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)

	actions['set_overlays_3_increment'] = {
		name: '⬆️ Increase Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
		description:
			'Increase the value of Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
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
				max: 15.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_3', 9.0, cameraId)

			// Calculate new value
			let newValue = Math.min(15.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('overlays_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to decrement Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)

	actions['set_overlays_3_decrement'] = {
		name: '⬇️ Decrease Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
		description:
			'Decrease the value of Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
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
				max: 15.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('overlays_3', 9.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[3] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('overlays_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action to reset Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon) al default value

	actions['set_overlays_3_reset'] = {
		name: '🔄 Reset Overlays: Grid style bit flags (1 = Thirds, 2 = Cross Hairs, 4 = Center Dot, 8 = Horizon)',
		description: 'Reset to default value (9)',
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
			const resetValue = 9.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('overlays_0', 5.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('overlays_1', 100.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('overlays_2', 0.0, cameraId)
			// For the subindex being reset, use its default value
			values[3] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('overlays_3', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'overlays', valuesString)
		},
	}
	// Action for Brightness (numeric)
}
