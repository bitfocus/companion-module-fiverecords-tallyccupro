// TallyCCU Pro - Lens Actions
// Focus, aperture, zoom, and optical stabilization

module.exports = function (self, actions) {
	actions['set_aperture_normalised'] = {
		name: 'Set Aperture (normalised)',
		description: 'Group: Lens | Param: Aperture (normalised) | Note: 0.0 = Smallest, 1.0 = Largest',
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
			await self.sendParam(cameraId, 'aperture_normalised', event.options.value)
		},
	}
	// Action to increment Aperture (normalised)

	actions['set_aperture_normalised_increment'] = {
		name: '⬆️ Increase Aperture (normalised)',
		description: 'Increase the value of Aperture (normalised)',
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
			let currentValue = self.getParamValue('aperture_normalised', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'aperture_normalised', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('aperture_normalised', newValue, cameraId)
		},
	}
	// Action to decrement Aperture (normalised)

	actions['set_aperture_normalised_decrement'] = {
		name: '⬇️ Decrease Aperture (normalised)',
		description: 'Decrease the value of Aperture (normalised)',
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
			let currentValue = self.getParamValue('aperture_normalised', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'aperture_normalised', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('aperture_normalised', newValue, cameraId)
		},
	}
	// Action to reset Aperture (normalised) al default value

	actions['set_aperture_normalised_reset'] = {
		name: '🔄 Reset Aperture (normalised)',
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
			await self.sendParam(cameraId, 'aperture_normalised', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('aperture_normalised', 0.0, cameraId)
		},
	}
	// Action for Instantaneous auto aperture (void)

	actions['set_instantaneous_auto_aperture'] = {
		name: 'Trigger Instantaneous auto aperture',
		description: 'Group: Lens | Param: Instantaneous auto aperture | Note: Trigger Instantaneous Auto Aperture',
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
			await self.sendParam(cameraId, 'instantaneous_auto_aperture', '1')
		},
	}
	// Action for Optical image stabilisation (boolean)

	actions['set_optical_image_stabilisation'] = {
		name: 'Set Optical image stabilisation',
		description: 'Group: Lens | Param: Optical image stabilisation | Note: True = Enabled, False = Disabled',
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
				default: true,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const value = event.options.value ? 1 : 0
			await self.sendParam(cameraId, 'optical_image_stabilisation', value)
		},
	}
	// Action for Focus (numeric)

	actions['set_focus'] = {
		name: 'Set Focus',
		description: 'Group: Lens | Param: Focus | Note: 0.0 = Near, 1.0 = Far',
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
			await self.sendParam(cameraId, 'focus', event.options.value)
		},
	}
	// Action to increment Focus

	actions['set_focus_increment'] = {
		name: '⬆️ Increase Focus',
		description: 'Increase the value of Focus',
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
			let currentValue = self.getParamValue('focus', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'focus', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('focus', newValue, cameraId)
		},
	}
	// Action to decrement Focus

	actions['set_focus_decrement'] = {
		name: '⬇️ Decrease Focus',
		description: 'Decrease the value of Focus',
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
			let currentValue = self.getParamValue('focus', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'focus', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('focus', newValue, cameraId)
		},
	}
	// Action to reset Focus al default value

	actions['set_focus_reset'] = {
		name: '🔄 Reset Focus',
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
			await self.sendParam(cameraId, 'focus', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('focus', 0.0, cameraId)
		},
	}
	// Action for Instantaneous autofocus (void)

	actions['set_instantaneous_autofocus'] = {
		name: 'Trigger Instantaneous autofocus',
		description: 'Group: Lens | Param: Instantaneous autofocus | Note: Trigger Instantaneous Autofocus',
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
			await self.sendParam(cameraId, 'instantaneous_autofocus', '1')
		},
	}
	// Action for Set absolute zoom (normalised) (numeric)

	actions['set_set_absolute_zoom_normalised'] = {
		name: 'Set Set absolute zoom (normalised)',
		description:
			'Group: Lens | Param: Set absolute zoom (normalised) | Note: Move to specified focal length: 0.0 = wide, 1.0 = tele',
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
			await self.sendParam(cameraId, 'set_absolute_zoom_normalised', event.options.value)
		},
	}
	// Action to increment Set absolute zoom (normalised)

	actions['set_set_absolute_zoom_normalised_increment'] = {
		name: '⬆️ Increase Set absolute zoom (normalised)',
		description: 'Increase the value of Set absolute zoom (normalised)',
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
			let currentValue = self.getParamValue('set_absolute_zoom_normalised', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'set_absolute_zoom_normalised', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('set_absolute_zoom_normalised', newValue, cameraId)
		},
	}
	// Action to decrement Set absolute zoom (normalised)

	actions['set_set_absolute_zoom_normalised_decrement'] = {
		name: '⬇️ Decrease Set absolute zoom (normalised)',
		description: 'Decrease the value of Set absolute zoom (normalised)',
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
			let currentValue = self.getParamValue('set_absolute_zoom_normalised', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'set_absolute_zoom_normalised', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('set_absolute_zoom_normalised', newValue, cameraId)
		},
	}
	// Action to reset Set absolute zoom (normalised) al default value

	actions['set_set_absolute_zoom_normalised_reset'] = {
		name: '🔄 Reset Set absolute zoom (normalised)',
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
			await self.sendParam(cameraId, 'set_absolute_zoom_normalised', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('set_absolute_zoom_normalised', 0.0, cameraId)
		},
	}
	// Action for Zoom continuo - Inicio

	actions['zoom_start'] = {
		name: 'Zoom - Iniciar',
		description: 'Start zoom in a direction',
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
				type: 'dropdown',
				label: 'Direction',
				id: 'direction',
				default: 'in',
				choices: [
					{ id: 'in', label: 'Zoom In (Tele)' },
					{ id: 'out', label: 'Zoom Out (Wide)' },
				],
			},
			{
				type: 'number',
				label: 'Speed (0-1)',
				id: 'speed',
				default: 0.5,
				min: 0,
				max: 1,
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const direction = event.options.direction
			const speed = parseFloat(event.options.speed)
			const value = direction === 'in' ? speed : -speed
			await self.sendParam(cameraId, 'set_continuous_zoom_speed', value)
		},
	}

	// Action for Zoom continuo - Detener

	actions['zoom_stop'] = {
		name: 'Zoom - Detener',
		description: 'Stop any zoom movement',
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
			await self.sendParam(cameraId, 'set_continuous_zoom_speed', 0)
		},
	}
	// Action for ND Filter Stop (multiple subindexes)

	actions['set_focus_assist_0'] = {
		name: 'Set Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
		description: 'Set value for Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
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
			values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('focus_assist_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action to increment Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)

	actions['set_focus_assist_0_increment'] = {
		name: '⬆️ Increase Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
		description: 'Increase the value of Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
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
			let currentValue = self.getParamValue('focus_assist_0', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('focus_assist_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action to decrement Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)

	actions['set_focus_assist_0_decrement'] = {
		name: '⬇️ Decrease Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
		description: 'Decrease the value of Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
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
			let currentValue = self.getParamValue('focus_assist_0', 1.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('focus_assist_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action to reset Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines) al default value

	actions['set_focus_assist_0_reset'] = {
		name: '🔄 Reset Focus Assist: Focus Assist Method (0 = Peak, 1 = Colored lines)',
		description: 'Reset to default value (1)',
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
			values[1] = self.getParamValue('focus_assist_1', 0.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('focus_assist_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action to set onlyr (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)

	actions['set_focus_assist_1'] = {
		name: 'Set Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
		description: 'Set value for Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
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
				max: 4.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('focus_assist_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action to increment Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)

	actions['set_focus_assist_1_increment'] = {
		name: '⬆️ Increase Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
		description:
			'Increase the value of Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
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
				max: 4.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('focus_assist_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(4.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('focus_assist_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action to decrement Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)

	actions['set_focus_assist_1_decrement'] = {
		name: '⬇️ Decrease Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
		description:
			'Decrease the value of Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
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
				max: 4.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('focus_assist_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('focus_assist_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action to reset Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black) al default value

	actions['set_focus_assist_1_reset'] = {
		name: '🔄 Reset Focus Assist: Focus Line Color (0 = Red, 1 = Green, 2 = Blue, 3 = White, 4 = Black)',
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
			values[0] = self.getParamValue('focus_assist_0', 1.0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('focus_assist_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'focus_assist', valuesString)
		},
	}
	// Action for Program return feed enable (numeric)
}
