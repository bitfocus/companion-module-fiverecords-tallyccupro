// TallyCCU Pro - Video Actions
// Shutter, gain, white balance, ND filter, video mode, and display LUT

module.exports = function (self, actions) {
	actions['set_nd_filter_stop'] = {
		name: 'Set ND Filter Stop',
		description: 'Set values for ND Filter Stop',
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
				label: 'Filter power as f-stop',
				id: 'value0',
				default: 0.0,
				min: 0.0,
				max: 15.0,
				step: 0.1,
			},
			{
				type: 'number',
				label: '0 = Stop, 1 = Density, 2 = Transmitance',
				id: 'value1',
				default: 0.0,
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
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('nd_filter_stop_0', event.options.value0, cameraId)
			self.storeParamValue('nd_filter_stop_1', event.options.value1, cameraId)
		},
	}
	// Action to set only ND Filter Stop: Filter power as f-stop

	actions['set_nd_filter_stop_0'] = {
		name: 'Set ND Filter Stop: Filter power as f-stop',
		description: 'Set value for ND Filter Stop: Filter power as f-stop (0, 2, 4, 6)',
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
				label: 'ND Stop',
				id: 'value',
				default: 0,
				choices: [
					{ id: 0, label: 'Clear (0)' },
					{ id: 2, label: 'ND 0.6 (2 stops)' },
					{ id: 4, label: 'ND 1.2 (4 stops)' },
					{ id: 6, label: 'ND 1.8 (6 stops)' },
				],
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = parseInt(event.options.value)

			// Get current values or use SPECIFIC defaults
			const values = []
			values[0] = newValue
			values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('nd_filter_stop_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action to increment ND Filter Stop: Filter power as f-stop (steps of 2)

	actions['set_nd_filter_stop_0_increment'] = {
		name: '⬆️ Increase ND Filter Stop: Filter power as f-stop',
		description: 'Increase ND filter by 2 stops (0 → 2 → 4 → 6)',
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

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('nd_filter_stop_0', 0, cameraId)

			// Increment by 2, max 6
			let newValue = Math.min(6, currentValue + 2)

			// Get current values for other subindexes
			const values = []
			values[0] = newValue
			values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId)

			self.log('info', `ND Filter: ${currentValue} → ${newValue} stops`)

			// Store new value specifically for this camera
			self.storeParamValue('nd_filter_stop_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action to decrement ND Filter Stop: Filter power as f-stop (steps of 2)

	actions['set_nd_filter_stop_0_decrement'] = {
		name: '⬇️ Decrease ND Filter Stop: Filter power as f-stop',
		description: 'Decrease ND filter by 2 stops (6 → 4 → 2 → 0)',
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

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('nd_filter_stop_0', 0, cameraId)

			// Decrement by 2, min 0
			let newValue = Math.max(0, currentValue - 2)

			// Get current values for other subindexes
			const values = []
			values[0] = newValue
			values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId)

			self.log('info', `ND Filter: ${currentValue} → ${newValue} stops`)

			// Store new value specifically for this camera
			self.storeParamValue('nd_filter_stop_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action to reset ND Filter Stop: Filter power as f-stop (Clear)

	actions['set_nd_filter_stop_0_reset'] = {
		name: '🔄 Reset ND Filter Stop: Filter power as f-stop',
		description: 'Reset to Clear (0 stops)',
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
			const resetValue = 0

			// Get current values for other subindexes
			const values = []
			values[0] = resetValue
			values[1] = self.getParamValue('nd_filter_stop_1', 0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('nd_filter_stop_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action to set only ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance

	actions['set_nd_filter_stop_1'] = {
		name: 'Set ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
		description: 'Set value for ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
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
				step: 0.1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('nd_filter_stop_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action to increment ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance

	actions['set_nd_filter_stop_1_increment'] = {
		name: '⬆️ Increase ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
		description: 'Increase the value of ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
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
			let currentValue = self.getParamValue('nd_filter_stop_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('nd_filter_stop_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action to decrement ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance

	actions['set_nd_filter_stop_1_decrement'] = {
		name: '⬇️ Decrease ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
		description: 'Decrease the value of ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
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
			let currentValue = self.getParamValue('nd_filter_stop_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('nd_filter_stop_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action to reset ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance al default value

	actions['set_nd_filter_stop_1_reset'] = {
		name: '🔄 Reset ND Filter Stop: 0 = Stop, 1 = Density, 2 = Transmitance',
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
			const resetValue = 0.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('nd_filter_stop_0', 0.0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('nd_filter_stop_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'nd_filter_stop', valuesString)
		},
	}
	// Action for Shutter speed (numeric)

	actions['set_shutter_speed'] = {
		name: 'Set Shutter speed',
		description:
			'Group: Video | Param: Shutter speed | Note: Shutter speed value as a fraction of 1, so 50 for 1/50th of a second',
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
				default: 24.0,
				min: 24.0,
				max: 2000.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'shutter_speed', event.options.value)
		},
	}
	// Helper function to get current frame rate for a camera
	function getFrameRateForCamera(cameraId) {
		const videoModeKey = `cam${cameraId}_video_mode_0`
		let fps = self.paramValues[videoModeKey]
		if (!fps || fps <= 0) {
			fps = 60 // Default fallback
		}
		return parseInt(fps)
	}
	// Action to increment Shutter speed (by frame rate multiples)

	actions['set_shutter_speed_increment'] = {
		name: '⬆️ Increase Shutter speed',
		description: 'Increase shutter to next frame rate multiple (1x → 2x → 4x → 8x fps)',
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
			const fps = getFrameRateForCamera(cameraId)

			// Get current shutter value
			let currentValue = self.getParamValue('shutter_speed', fps, cameraId)

			// Calculate current multiplier and go to next
			let currentMultiplier = Math.round(currentValue / fps)
			if (currentMultiplier < 1) currentMultiplier = 1

			// Next multiplier: 1 → 2 → 4 → 8 → 16 → 32
			let nextMultiplier
			if (currentMultiplier < 2) nextMultiplier = 2
			else if (currentMultiplier < 4) nextMultiplier = 4
			else if (currentMultiplier < 8) nextMultiplier = 8
			else if (currentMultiplier < 16) nextMultiplier = 16
			else if (currentMultiplier < 32) nextMultiplier = 32
			else nextMultiplier = currentMultiplier // Max reached

			let newValue = Math.min(2000, fps * nextMultiplier)

			self.log('info', `Shutter: ${currentValue} → ${newValue} (${nextMultiplier}x ${fps}fps)`)

			await self.sendParam(cameraId, 'shutter_speed', newValue)
			self.storeParamValue('shutter_speed', newValue, cameraId)
		},
	}
	// Action to decrement Shutter speed (by frame rate multiples)

	actions['set_shutter_speed_decrement'] = {
		name: '⬇️ Decrease Shutter speed',
		description: 'Decrease shutter to previous frame rate multiple (32x → 16x → 8x → 4x → 2x → 1x fps)',
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
			const fps = getFrameRateForCamera(cameraId)

			// Get current shutter value
			let currentValue = self.getParamValue('shutter_speed', fps, cameraId)

			// Calculate current multiplier and go to previous
			let currentMultiplier = Math.round(currentValue / fps)

			// Previous multiplier: 32 → 16 → 8 → 4 → 2 → 1
			let prevMultiplier
			if (currentMultiplier > 16) prevMultiplier = 16
			else if (currentMultiplier > 8) prevMultiplier = 8
			else if (currentMultiplier > 4) prevMultiplier = 4
			else if (currentMultiplier > 2) prevMultiplier = 2
			else prevMultiplier = 1 // Min is 1x fps

			let newValue = fps * prevMultiplier

			self.log('info', `Shutter: ${currentValue} → ${newValue} (${prevMultiplier}x ${fps}fps)`)

			await self.sendParam(cameraId, 'shutter_speed', newValue)
			self.storeParamValue('shutter_speed', newValue, cameraId)
		},
	}
	// Action to reset Shutter speed to frame rate (1x fps = 180° shutter)

	actions['set_shutter_speed_reset'] = {
		name: '🔄 Reset Shutter speed',
		description: 'Reset to frame rate (1/fps = 180° shutter angle)',
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
			const fps = getFrameRateForCamera(cameraId)

			self.log('info', `Shutter reset to 1/${fps} (frame rate) for camera ${cameraId}`)

			await self.sendParam(cameraId, 'shutter_speed', fps)
			self.storeParamValue('shutter_speed', fps, cameraId)
		},
	}
	// Action for Gain(db) (numeric)

	actions['set_gain_db'] = {
		name: 'Set Gain(db)',
		description: 'Group: Video | Param: Gain(db) | Note: Gain in decibel (dB)',
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
				min: -12.0,
				max: 36.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'gain_db', event.options.value)
		},
	}
	// Action to increment Gain(db)

	actions['set_gain_db_increment'] = {
		name: '⬆️ Increase Gain(db)',
		description: 'Increase the value of Gain(db)',
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
				max: 48.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_db', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(36.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'gain_db', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('gain_db', newValue, cameraId)
		},
	}
	// Action to decrement Gain(db)

	actions['set_gain_db_decrement'] = {
		name: '⬇️ Decrease Gain(db)',
		description: 'Decrease the value of Gain(db)',
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
				max: 48.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('gain_db', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-12.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'gain_db', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('gain_db', newValue, cameraId)
		},
	}
	// Action to reset Gain(db) al default value

	actions['set_gain_db_reset'] = {
		name: '🔄 Reset Gain(db)',
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
			await self.sendParam(cameraId, 'gain_db', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('gain_db', 0.0, cameraId)
		},
	}
	// Action for Manual White Balance (multiple subindexes)

	actions['set_manual_white_balance'] = {
		name: 'Set Manual White Balance',
		description: 'Set values for Manual White Balance',
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
				label: 'Color temp (2500-10000 K)',
				id: 'value0',
				default: 5600.0,
				min: 2500.0,
				max: 10000.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'Tint (-50 to 50)',
				id: 'value1',
				default: 10.0,
				min: -50.0,
				max: 50.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('manual_white_balance_0', event.options.value0, cameraId)
			self.storeParamValue('manual_white_balance_1', event.options.value1, cameraId)
		},
	}
	// Action to set onlyr temp (2500-10000 K)

	actions['set_manual_white_balance_0'] = {
		name: 'Set Manual White Balance: Color temp (2500-10000 K)',
		description: 'Set value for Manual White Balance: Color temp (2500-10000 K)',
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
				default: 5600.0,
				min: 2500.0,
				max: 10000.0,
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
			values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('manual_white_balance_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action to increment Manual White Balance: Color temp (2500-10000 K)

	actions['set_manual_white_balance_0_increment'] = {
		name: '⬆️ Increase Manual White Balance: Color temp (2500-10000 K)',
		description: 'Increase the value of Manual White Balance: Color temp (2500-10000 K)',
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
				max: 7500.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('manual_white_balance_0', 5600.0, cameraId)

			// Calculate new value
			let newValue = Math.min(10000.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('manual_white_balance_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action to decrement Manual White Balance: Color temp (2500-10000 K)

	actions['set_manual_white_balance_0_decrement'] = {
		name: '⬇️ Decrease Manual White Balance: Color temp (2500-10000 K)',
		description: 'Decrease the value of Manual White Balance: Color temp (2500-10000 K)',
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
				max: 7500.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('manual_white_balance_0', 5600.0, cameraId)

			// Calculate new value
			let newValue = Math.max(2500.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('manual_white_balance_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action to reset Manual White Balance: Color temp (2500-10000 K) al default value

	actions['set_manual_white_balance_0_reset'] = {
		name: '🔄 Reset Manual White Balance: Color temp (2500-10000 K)',
		description: 'Reset to default value (5600)',
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
			const resetValue = 5600.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('manual_white_balance_1', 10.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('manual_white_balance_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action to set only Manual White Balance: Tint (-50 to 50)

	actions['set_manual_white_balance_1'] = {
		name: 'Set Manual White Balance: Tint (-50 to 50)',
		description: 'Set value for Manual White Balance: Tint (-50 to 50)',
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
				default: 10.0,
				min: -50.0,
				max: 50.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('manual_white_balance_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action to increment Manual White Balance: Tint (-50 to 50)

	actions['set_manual_white_balance_1_increment'] = {
		name: '⬆️ Increase Manual White Balance: Tint (-50 to 50)',
		description: 'Increase the value of Manual White Balance: Tint (-50 to 50)',
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
			let currentValue = self.getParamValue('manual_white_balance_1', 10.0, cameraId)

			// Calculate new value
			let newValue = Math.min(50.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('manual_white_balance_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action to decrement Manual White Balance: Tint (-50 to 50)

	actions['set_manual_white_balance_1_decrement'] = {
		name: '⬇️ Decrease Manual White Balance: Tint (-50 to 50)',
		description: 'Decrease the value of Manual White Balance: Tint (-50 to 50)',
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
			let currentValue = self.getParamValue('manual_white_balance_1', 10.0, cameraId)

			// Calculate new value
			let newValue = Math.max(-50.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('manual_white_balance_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action to reset Manual White Balance: Tint (-50 to 50) al default value

	actions['set_manual_white_balance_1_reset'] = {
		name: '🔄 Reset Manual White Balance: Tint (-50 to 50)',
		description: 'Reset to default value (10)',
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
			const resetValue = 10.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('manual_white_balance_0', 5600.0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('manual_white_balance_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'manual_white_balance', valuesString)
		},
	}
	// Action for Set auto WB (void)

	actions['set_set_auto_wb'] = {
		name: 'Trigger Set auto WB',
		description: 'Group: Video | Param: Set auto WB | Note: Calculate and set auto white balance',
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
			await self.sendParam(cameraId, 'set_auto_wb', '1')
		},
	}
	// Action for Restore auto WB (void)

	actions['set_restore_auto_wb'] = {
		name: 'Trigger Restore auto WB',
		description: 'Group: Video | Param: Restore auto WB | Note: Use latest auto white balance setting',
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
			await self.sendParam(cameraId, 'restore_auto_wb', '1')
		},
	}
	// Action for Dynamic Range Mode (numeric)

	actions['set_dynamic_range_mode'] = {
		name: 'Set Dynamic Range Mode',
		description: 'Group: Video | Param: Dynamic Range Mode | Note: 0 = Film, 1 = Video, 2 = Extended Video',
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
				default: 2.0,
				min: 0.0,
				max: 2.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'dynamic_range_mode', event.options.value)
		},
	}
	// Action to increment Dynamic Range Mode

	actions['set_dynamic_range_mode_increment'] = {
		name: '⬆️ Increase Dynamic Range Mode',
		description: 'Increase the value of Dynamic Range Mode',
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
			let currentValue = self.getParamValue('dynamic_range_mode', 2.0, cameraId)

			// Calculate new value
			let newValue = Math.min(2.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'dynamic_range_mode', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('dynamic_range_mode', newValue, cameraId)
		},
	}
	// Action to decrement Dynamic Range Mode

	actions['set_dynamic_range_mode_decrement'] = {
		name: '⬇️ Decrease Dynamic Range Mode',
		description: 'Decrease the value of Dynamic Range Mode',
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
			let currentValue = self.getParamValue('dynamic_range_mode', 2.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'dynamic_range_mode', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('dynamic_range_mode', newValue, cameraId)
		},
	}
	// Action to reset Dynamic Range Mode al default value

	actions['set_dynamic_range_mode_reset'] = {
		name: '🔄 Reset Dynamic Range Mode',
		description: 'Reset to default value (2)',
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
			await self.sendParam(cameraId, 'dynamic_range_mode', 2.0)

			// Store default value for this specific camera
			self.storeParamValue('dynamic_range_mode', 2.0, cameraId)
		},
	}
	// Action for Video sharpening level (numeric)

	actions['set_video_sharpening_level'] = {
		name: 'Set Video sharpening level',
		description: 'Group: Video | Param: Video sharpening level | Note: 0 = Off, 1 = Low, 2 = Medium, 3 = High',
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
			await self.sendParam(cameraId, 'video_sharpening_level', event.options.value)
		},
	}
	// Action to increment Video sharpening level

	actions['set_video_sharpening_level_increment'] = {
		name: '⬆️ Increase Video sharpening level',
		description: 'Increase the value of Video sharpening level',
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
			let currentValue = self.getParamValue('video_sharpening_level', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(3.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'video_sharpening_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('video_sharpening_level', newValue, cameraId)
		},
	}
	// Action to decrement Video sharpening level

	actions['set_video_sharpening_level_decrement'] = {
		name: '⬇️ Decrease Video sharpening level',
		description: 'Decrease the value of Video sharpening level',
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
			let currentValue = self.getParamValue('video_sharpening_level', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'video_sharpening_level', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('video_sharpening_level', newValue, cameraId)
		},
	}
	// Action to reset Video sharpening level al default value

	actions['set_video_sharpening_level_reset'] = {
		name: '🔄 Reset Video sharpening level',
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
			await self.sendParam(cameraId, 'video_sharpening_level', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('video_sharpening_level', 0.0, cameraId)
		},
	}
	// Action for Set auto exposure mode (numeric)

	actions['set_set_auto_exposure_mode'] = {
		name: 'Set Set auto exposure mode',
		description:
			'Group: Video | Param: Set auto exposure mode | Note: 0 = Manual Trigger, 1 = Iris, 2 = Shutter, 3 = Iris + Shutter, 4 = Shutter + Iris',
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
			await self.sendParam(cameraId, 'set_auto_exposure_mode', event.options.value)
		},
	}
	// Action to increment Set auto exposure mode

	actions['set_set_auto_exposure_mode_increment'] = {
		name: '⬆️ Increase Set auto exposure mode',
		description: 'Increase the value of Set auto exposure mode',
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
			let currentValue = self.getParamValue('set_auto_exposure_mode', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(4.0, currentValue + increment)

			// Send new value
			await self.sendParam(cameraId, 'set_auto_exposure_mode', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('set_auto_exposure_mode', newValue, cameraId)
		},
	}
	// Action to decrement Set auto exposure mode

	actions['set_set_auto_exposure_mode_decrement'] = {
		name: '⬇️ Decrease Set auto exposure mode',
		description: 'Decrease the value of Set auto exposure mode',
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
			let currentValue = self.getParamValue('set_auto_exposure_mode', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Send new value
			await self.sendParam(cameraId, 'set_auto_exposure_mode', newValue)

			// Store new value specifically for this camera
			self.storeParamValue('set_auto_exposure_mode', newValue, cameraId)
		},
	}
	// Action to reset Set auto exposure mode al default value

	actions['set_set_auto_exposure_mode_reset'] = {
		name: '🔄 Reset Set auto exposure mode',
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
			await self.sendParam(cameraId, 'set_auto_exposure_mode', 0.0)

			// Store default value for this specific camera
			self.storeParamValue('set_auto_exposure_mode', 0.0, cameraId)
		},
	}
	// Action for Video multiple subindexes)

	actions['set_video_mode'] = {
		name: 'Set Video mode',
		description: 'Set values for Video mode',
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
				label: 'Frame rate (24, 25, 30, 50, 60)',
				id: 'value0',
				default: 60.0,
				min: 24.0,
				max: 60.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'M-rate (0 = regular, 1 = M-rate)',
				id: 'value1',
				default: 0.0,
				min: 0.0,
				max: 1.0,
				step: 1,
			},
			{
				type: 'number',
				label:
					'Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
				id: 'value2',
				default: 6.0,
				min: 0.0,
				max: 11.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'Interlaced (0 = progressive, 1 = interlaced)',
				id: 'value3',
				default: 0.0,
				min: 0.0,
				max: 1.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'Color space (0 = YUV)',
				id: 'value4',
				default: 0.0,
				min: 0.0,
				max: 1.0,
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
			values[4] = event.options.value4
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('video_mode_0', event.options.value0, cameraId)
			self.storeParamValue('video_mode_1', event.options.value1, cameraId)
			self.storeParamValue('video_mode_2', event.options.value2, cameraId)
			self.storeParamValue('video_mode_3', event.options.value3, cameraId)
			self.storeParamValue('video_mode_4', event.options.value4, cameraId)
		},
	}
	// Action to set only Video mode: Frame rate (24, 25, 30, 50, 60)

	actions['set_video_mode_0'] = {
		name: 'Set Video mode: Frame rate (24, 25, 30, 50, 60)',
		description: 'Set value for Video mode: Frame rate (24, 25, 30, 50, 60)',
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
				default: 60.0,
				min: 24.0,
				max: 60.0,
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
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to increment Video mode: Frame rate (24, 25, 30, 50, 60)

	actions['set_video_mode_0_increment'] = {
		name: '⬆️ Increase Video mode: Frame rate (24, 25, 30, 50, 60)',
		description: 'Increase the value of Video mode: Frame rate (24, 25, 30, 50, 60)',
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
				max: 36.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('video_mode_0', 60.0, cameraId)

			// Calculate new value
			let newValue = Math.min(60.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to decrement Video mode: Frame rate (24, 25, 30, 50, 60)

	actions['set_video_mode_0_decrement'] = {
		name: '⬇️ Decrease Video mode: Frame rate (24, 25, 30, 50, 60)',
		description: 'Decrease the value of Video mode: Frame rate (24, 25, 30, 50, 60)',
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
				max: 36.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('video_mode_0', 60.0, cameraId)

			// Calculate new value
			let newValue = Math.max(24.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to reset Video mode: Frame rate (24, 25, 30, 50, 60) al default value

	actions['set_video_mode_0_reset'] = {
		name: '🔄 Reset Video mode: Frame rate (24, 25, 30, 50, 60)',
		description: 'Reset to default value (60)',
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
			const resetValue = 60.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('video_mode_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to set only Video mode: M-rate (0 = regular, 1 = M-rate)

	actions['set_video_mode_1'] = {
		name: 'Set Video mode: M-rate (0 = regular, 1 = M-rate)',
		description: 'Set value for Video mode: M-rate (0 = regular, 1 = M-rate)',
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
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to increment Video mode: M-rate (0 = regular, 1 = M-rate)

	actions['set_video_mode_1_increment'] = {
		name: '⬆️ Increase Video mode: M-rate (0 = regular, 1 = M-rate)',
		description: 'Increase the value of Video mode: M-rate (0 = regular, 1 = M-rate)',
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
			let currentValue = self.getParamValue('video_mode_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to decrement Video mode: M-rate (0 = regular, 1 = M-rate)

	actions['set_video_mode_1_decrement'] = {
		name: '⬇️ Decrease Video mode: M-rate (0 = regular, 1 = M-rate)',
		description: 'Decrease the value of Video mode: M-rate (0 = regular, 1 = M-rate)',
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
			let currentValue = self.getParamValue('video_mode_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to reset Video mode: M-rate (0 = regular, 1 = M-rate) al default value

	actions['set_video_mode_1_reset'] = {
		name: '🔄 Reset Video mode: M-rate (0 = regular, 1 = M-rate)',
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
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('video_mode_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to set only Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)

	actions['set_video_mode_2'] = {
		name: 'Set Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
		description:
			'Set value for Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
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
				default: 6.0,
				min: 0.0,
				max: 11.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For the subindex being modified, use the new value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to increment Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)

	actions['set_video_mode_2_increment'] = {
		name: '⬆️ Increase Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
		description:
			'Increase the value of Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
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
				max: 11.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const increment = event.options.increment

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('video_mode_2', 6.0, cameraId)

			// Calculate new value
			let newValue = Math.min(11.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to decrement Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)

	actions['set_video_mode_2_decrement'] = {
		name: '⬇️ Decrease Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
		description:
			'Decrease the value of Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
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
				max: 11.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const decrement = event.options.decrement

			// Get current value or use default for this camera
			let currentValue = self.getParamValue('video_mode_2', 6.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[2] = newValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_2', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to reset Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k) al default value

	actions['set_video_mode_2_reset'] = {
		name: '🔄 Reset Video mode: Dimensions (0 = NTSC, 1 = PAL, 2 = 720, 3 = 1080, 4 = 2kDCI, 5 = 2k16:9, 6 = UHD, 7 = 3k Anamorphic, 8 = 4k DCI, 9 = 4k 16:9, 10 = 4.6k 2.4:1, 11 = 4.6k)',
		description: 'Reset to default value (6)',
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
			const resetValue = 6.0

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For the subindex being reset, use its default value
			values[2] = resetValue
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('video_mode_2', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to set only Video mode: Interlaced (0 = progressive, 1 = interlaced)

	actions['set_video_mode_3'] = {
		name: 'Set Video mode: Interlaced (0 = progressive, 1 = interlaced)',
		description: 'Set value for Video mode: Interlaced (0 = progressive, 1 = interlaced)',
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
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For the subindex being modified, use the new value
			values[3] = newValue
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to increment Video mode: Interlaced (0 = progressive, 1 = interlaced)

	actions['set_video_mode_3_increment'] = {
		name: '⬆️ Increase Video mode: Interlaced (0 = progressive, 1 = interlaced)',
		description: 'Increase the value of Video mode: Interlaced (0 = progressive, 1 = interlaced)',
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
			let currentValue = self.getParamValue('video_mode_3', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[3] = newValue
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to decrement Video mode: Interlaced (0 = progressive, 1 = interlaced)

	actions['set_video_mode_3_decrement'] = {
		name: '⬇️ Decrease Video mode: Interlaced (0 = progressive, 1 = interlaced)',
		description: 'Decrease the value of Video mode: Interlaced (0 = progressive, 1 = interlaced)',
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
			let currentValue = self.getParamValue('video_mode_3', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[3] = newValue
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_3', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to reset Video mode: Interlaced (0 = progressive, 1 = interlaced) al default value

	actions['set_video_mode_3_reset'] = {
		name: '🔄 Reset Video mode: Interlaced (0 = progressive, 1 = interlaced)',
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
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For the subindex being reset, use its default value
			values[3] = resetValue
			// For other subindexes, get current value or use their specific default
			values[4] = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('video_mode_3', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to set onlyr space (0 = YUV)

	actions['set_video_mode_4'] = {
		name: 'Set Video mode: Color space (0 = YUV)',
		description: 'Set value for Video mode: Color space (0 = YUV)',
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
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For the subindex being modified, use the new value
			values[4] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_4', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to increment Video mode: Color space (0 = YUV)

	actions['set_video_mode_4_increment'] = {
		name: '⬆️ Increase Video mode: Color space (0 = YUV)',
		description: 'Increase the value of Video mode: Color space (0 = YUV)',
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
			let currentValue = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[4] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_4', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to decrement Video mode: Color space (0 = YUV)

	actions['set_video_mode_4_decrement'] = {
		name: '⬇️ Decrease Video mode: Color space (0 = YUV)',
		description: 'Decrease the value of Video mode: Color space (0 = YUV)',
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
			let currentValue = self.getParamValue('video_mode_4', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[4] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('video_mode_4', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action to reset Video mode: Color space (0 = YUV) al default value

	actions['set_video_mode_4_reset'] = {
		name: '🔄 Reset Video mode: Color space (0 = YUV)',
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
			values[0] = self.getParamValue('video_mode_0', 60.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('video_mode_1', 0.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[2] = self.getParamValue('video_mode_2', 6.0, cameraId)
			// For other subindexes, get current value or use their specific default
			values[3] = self.getParamValue('video_mode_3', 0.0, cameraId)
			// For the subindex being reset, use its default value
			values[4] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('video_mode_4', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'video_mode', valuesString)
		},
	}
	// Action for Display LUT (multiple subindexes)

	actions['set_display_lut'] = {
		name: 'Set Display LUT',
		description: 'Set values for Display LUT',
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
				label: 'Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
				id: 'value0',
				default: 0.0,
				min: 0.0,
				max: 3.0,
				step: 1,
			},
			{
				type: 'number',
				label: 'LUT Enabled (0 = Not enabled, 1 = Enabled)',
				id: 'value1',
				default: 0.0,
				min: 0.0,
				max: 1.0,
				step: 1,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const values = []
			values[0] = event.options.value0
			values[1] = event.options.value1
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)

			// Store individual values for each subindex

			self.storeParamValue('display_lut_0', event.options.value0, cameraId)
			self.storeParamValue('display_lut_1', event.options.value1, cameraId)
		},
	}
	// Action to set only Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)

	actions['set_display_lut_0'] = {
		name: 'Set Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
		description:
			'Set value for Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
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
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For the subindex being modified, use the new value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('display_lut_1', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('display_lut_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action to increment Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)

	actions['set_display_lut_0_increment'] = {
		name: '⬆️ Increase Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
		description:
			'Increase the value of Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
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
			let currentValue = self.getParamValue('display_lut_0', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(3.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the incremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('display_lut_1', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('display_lut_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action to decrement Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)

	actions['set_display_lut_0_decrement'] = {
		name: '⬇️ Decrease Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
		description:
			'Decrease the value of Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
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
			let currentValue = self.getParamValue('display_lut_0', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For the subindex being modified, use the decremented value
			values[0] = newValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('display_lut_1', 0.0, cameraId)

			// Store new value specifically for this camera
			self.storeParamValue('display_lut_0', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action to reset Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video) al default value

	actions['set_display_lut_0_reset'] = {
		name: '🔄 Reset Display LUT: Selected LUT (0 = None, 1 = Custom, 2 = Film to Video, 3 = Film to Extended Video)',
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
			// For the subindex being reset, use its default value
			values[0] = resetValue
			// For other subindexes, get current value or use their specific default
			values[1] = self.getParamValue('display_lut_1', 0.0, cameraId)

			// Store default value specifically for this camera
			self.storeParamValue('display_lut_0', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action to set only Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)

	actions['set_display_lut_1'] = {
		name: 'Set Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
		description: 'Set value for Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
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
			const newValue = event.options.value

			// Get current values or use SPECIFIC defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('display_lut_0', 0.0, cameraId)
			// For the subindex being modified, use the new value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('display_lut_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action to increment Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)

	actions['set_display_lut_1_increment'] = {
		name: '⬆️ Increase Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
		description: 'Increase the value of Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
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
			let currentValue = self.getParamValue('display_lut_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.min(1.0, currentValue + increment)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('display_lut_0', 0.0, cameraId)
			// For the subindex being modified, use the incremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('display_lut_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action to decrement Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)

	actions['set_display_lut_1_decrement'] = {
		name: '⬇️ Decrease Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
		description: 'Decrease the value of Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
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
			let currentValue = self.getParamValue('display_lut_1', 0.0, cameraId)

			// Calculate new value
			let newValue = Math.max(0.0, currentValue - decrement)

			// Get current values for other subindexes with their specific defaults
			const values = []
			// For other subindexes, get current value or use their specific default
			values[0] = self.getParamValue('display_lut_0', 0.0, cameraId)
			// For the subindex being modified, use the decremented value
			values[1] = newValue

			// Store new value specifically for this camera
			self.storeParamValue('display_lut_1', newValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action to reset Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled) al default value

	actions['set_display_lut_1_reset'] = {
		name: '🔄 Reset Display LUT: LUT Enabled (0 = Not enabled, 1 = Enabled)',
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
			values[0] = self.getParamValue('display_lut_0', 0.0, cameraId)
			// For the subindex being reset, use its default value
			values[1] = resetValue

			// Store default value specifically for this camera
			self.storeParamValue('display_lut_1', resetValue, cameraId)

			// Send all values
			const valuesString = values.join(',')
			await self.sendParam(cameraId, 'display_lut', valuesString)
		},
	}
	// Action for Mic level (numeric)
}
