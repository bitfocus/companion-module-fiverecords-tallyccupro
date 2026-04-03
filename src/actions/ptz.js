// TallyCCU Pro - PTZ Control Actions
// Pan, tilt, and memory preset controls

module.exports = function (self, actions) {
	actions['set_pan_tilt'] = {
		name: 'Pan/Tilt - Mover',
		description: 'Controls pan/tilt movement of the camera',
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
				default: 'stop',
				choices: [
					{ id: 'stop', label: 'Detener' },
					{ id: 'left', label: 'Left' },
					{ id: 'right', label: 'Right' },
					{ id: 'up', label: 'Up' },
					{ id: 'down', label: 'Down' },
					{ id: 'up_left', label: 'Up-Left' },
					{ id: 'up_right', label: 'Up-Right' },
					{ id: 'down_left', label: 'Down-Left' },
					{ id: 'down_right', label: 'Down-Right' },
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
			const speed = event.options.speed

			// Calculate pan/tilt values based on direction
			let panValue = 0
			let tiltValue = 0

			switch (direction) {
				case 'left':
					panValue = -speed
					break
				case 'right':
					panValue = speed
					break
				case 'up':
					tiltValue = speed
					break
				case 'down':
					tiltValue = -speed
					break
				case 'up_left':
					panValue = -speed
					tiltValue = speed
					break
				case 'up_right':
					panValue = speed
					tiltValue = speed
					break
				case 'down_left':
					panValue = -speed
					tiltValue = -speed
					break
				case 'down_right':
					panValue = speed
					tiltValue = -speed
					break
				case 'stop':
				default:
				// Do not change values, they are 0
			}

			await self.sendParam(cameraId, 'pan_tilt_velocity', `${panValue},${tiltValue}`)
		},
	}

	// Action for detener Pan/Tilt

	actions['stop_pan_tilt'] = {
		name: 'Pan/Tilt - Detener',
		description: 'Stop any pan/tilt movement',
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
			await self.sendParam(cameraId, 'pan_tilt_velocity', '0,0')
		},
	}
	// Special action for Memory Preset - Store location

	actions['store_memory_preset'] = {
		name: 'Memory Preset - Store',
		description: 'Store current position in a memory slot',
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
				label: 'Slot (1-5)',
				id: 'slot',
				default: 1,
				min: 1,
				max: 5,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const slot = event.options.slot - 1 // Adjust to 0-based index
			await self.sendParam(cameraId, 'memory_preset', `1,${slot}`)
		},
	}

	// Special action for Memory Preset - Recall location

	actions['recall_memory_preset'] = {
		name: 'Memory Preset - Recall',
		description: 'Recall a stored position',
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
				label: 'Slot (1-5)',
				id: 'slot',
				default: 1,
				min: 1,
				max: 5,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const slot = event.options.slot - 1 // Adjust to 0-based index
			await self.sendParam(cameraId, 'memory_preset', `2,${slot}`)
		},
	}
	// ====================================================================
	// MEMORY PRESET ACTIONS
	// ====================================================================
}
