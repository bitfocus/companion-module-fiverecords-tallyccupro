// TallyCCU Pro - Tally Actions
// Tally light brightness control

module.exports = function (self, actions) {
	actions['set_tally_brightness'] = {
		name: 'Set Tally brightness',
		description:
			'Group: Tally | Param: Tally brightness | Note: Sets the tally front and rear brightness. 0.0 = minimum, 1.0 = maximum',
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
			await self.sendParam(cameraId, 'tally_brightness', event.options.value)
		},
	}
	// Action to increment Tally brightness

	actions['set_tally_brightness_increment'] = {
		name: '⬆️ Increase Tally brightness',
		description: 'Increase the value of Tally brightness',
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
			let currentValue = self.getParamValue('tally_brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'tally_brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('tally_brightness', newValue, cameraId)
		},
	}
	// Action to decrement Tally brightness

	actions['set_tally_brightness_decrement'] = {
		name: '⬇️ Decrease Tally brightness',
		description: 'Decrease the value of Tally brightness',
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
			let currentValue = self.getParamValue('tally_brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'tally_brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('tally_brightness', newValue, cameraId)
		},
	}
	// Action to reset Tally brightness al default value

	actions['set_tally_brightness_reset'] = {
		name: '🔄 Reset Tally brightness',
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
			await self.sendParam(cameraId, 'tally_brightness', 1.0)

			// Store default value for this specific camera
			self.storeParamValue('tally_brightness', 1.0, cameraId)
		},
	}
	// Action for Front tally brightness (numeric)

	actions['set_front_tally_brightness'] = {
		name: 'Set Front tally brightness',
		description:
			'Group: Tally | Param: Front tally brightness | Note: Sets the tally front brightness. 0.0 = minimum, 1.0 = maximum',
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
			await self.sendParam(cameraId, 'front_tally_brightness', event.options.value)
		},
	}
	// Action to increment Front tally brightness

	actions['set_front_tally_brightness_increment'] = {
		name: '⬆️ Increase Front tally brightness',
		description: 'Increase the value of Front tally brightness',
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
			let currentValue = self.getParamValue('front_tally_brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'front_tally_brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('front_tally_brightness', newValue, cameraId)
		},
	}
	// Action to decrement Front tally brightness

	actions['set_front_tally_brightness_decrement'] = {
		name: '⬇️ Decrease Front tally brightness',
		description: 'Decrease the value of Front tally brightness',
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
			let currentValue = self.getParamValue('front_tally_brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'front_tally_brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('front_tally_brightness', newValue, cameraId)
		},
	}
	// Action to reset Front tally brightness al default value

	actions['set_front_tally_brightness_reset'] = {
		name: '🔄 Reset Front tally brightness',
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
			await self.sendParam(cameraId, 'front_tally_brightness', 1.0)

			// Store default value for this specific camera
			self.storeParamValue('front_tally_brightness', 1.0, cameraId)
		},
	}
	// Action for Rear tally brightness (numeric)

	actions['set_rear_tally_brightness'] = {
		name: 'Set Rear tally brightness',
		description:
			'Group: Tally | Param: Rear tally brightness | Note: Sets the tally rear brightness. 0.0 = minimum, 1.0 = maximum (cannot be turned off)',
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
			await self.sendParam(cameraId, 'rear_tally_brightness', event.options.value)
		},
	}
	// Action to increment Rear tally brightness

	actions['set_rear_tally_brightness_increment'] = {
		name: '⬆️ Increase Rear tally brightness',
		description: 'Increase the value of Rear tally brightness',
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
			let currentValue = self.getParamValue('rear_tally_brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'rear_tally_brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('rear_tally_brightness', newValue, cameraId)
		},
	}
	// Action to decrement Rear tally brightness

	actions['set_rear_tally_brightness_decrement'] = {
		name: '⬇️ Decrease Rear tally brightness',
		description: 'Decrease the value of Rear tally brightness',
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
			let currentValue = self.getParamValue('rear_tally_brightness', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'rear_tally_brightness', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('rear_tally_brightness', newValue, cameraId)
		},
	}
	// Action to reset Rear tally brightness al default value

	actions['set_rear_tally_brightness_reset'] = {
		name: '🔄 Reset Rear tally brightness',
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
			await self.sendParam(cameraId, 'rear_tally_brightness', 1.0)

			// Store default value for this specific camera
			self.storeParamValue('rear_tally_brightness', 1.0, cameraId)
		},
	}
	// Action for Source (numeric)
}
