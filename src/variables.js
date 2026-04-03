// TallyCCU Pro - Variables
// Variable definitions and update functions

const Variables = {
	formatVariableValue(value) {
		if (value === null || value === undefined) {
			return 'N/A'
		}

		if (typeof value === 'number') {
			if (Number.isInteger(value) || Math.abs(value - Math.round(value)) < 0.001) {
				return Math.round(value).toString()
			} else {
				return value.toFixed(2)
			}
		}

		if (Array.isArray(value)) {
			return value.map((v) => Variables.formatVariableValue(v)).join(', ')
		}

		return String(value)
	},

	updateVariablesFromParams(self, cameraId, paramKey, value) {
		const variables = {}

		// Convert string with commas to array if needed
		let processedValue = value
		if (typeof value === 'string' && value.indexOf(',') >= 0) {
			processedValue = value.split(',').map((v) => {
				const num = parseFloat(v.trim())
				return isNaN(num) ? v.trim() : num
			})
		}

		// Main parameter variable
		variables[`cam${cameraId}_param_${paramKey}`] = Variables.formatVariableValue(processedValue)

		if (cameraId == self.config.defaultCameraId) {
			variables[`param_${paramKey}`] = Variables.formatVariableValue(processedValue)
		}

		// If array, also update each individual subindex
		if (Array.isArray(processedValue)) {
			for (let i = 0; i < processedValue.length; i++) {
				const subValue = processedValue[i]
				variables[`cam${cameraId}_param_${paramKey}_${i}`] = Variables.formatVariableValue(subValue)

				if (cameraId == self.config.defaultCameraId) {
					variables[`param_${paramKey}_${i}`] = Variables.formatVariableValue(subValue)
				}

				// Also update internal storage for subindexes
				const subKey = `cam${cameraId}_${paramKey}_${i}`
				self.paramValues[subKey] = subValue
			}

			// Store complete array too
			self.paramValues[`cam${cameraId}_${paramKey}`] = processedValue
		}

		self.setVariableValues(variables)
	},

	updatePresetNames(self, presets) {
		if (!Array.isArray(presets)) {
			self.log('warn', 'updatePresetNames: presets is not an array')
			return
		}

		const variables = {}

		for (const preset of presets) {
			if (preset && preset.cameraId !== undefined && preset.presetId !== undefined) {
				const cameraId = parseInt(preset.cameraId)
				const presetId = parseInt(preset.presetId)
				const presetName = preset.name || `Preset ${presetId}`

				variables[`cam${cameraId}_preset${presetId}_name`] = presetName

				if (cameraId == self.config.defaultCameraId) {
					variables[`preset${presetId}_name`] = presetName
				}

				if (!self.presetNames[cameraId]) self.presetNames[cameraId] = {}
				self.presetNames[cameraId][presetId] = presetName
			}
		}

		if (Object.keys(variables).length > 0) {
			self.setVariableValues(variables)
			self.log('info', `Updated ${Object.keys(variables).length} preset name variables`)
		}
	},
}

// Main export: called as updateVariableDefinitions(self)
module.exports = function (self) {
	self.log('info', 'Initializing variable definitions')

	const variableDefinitions = []

	// Variables for each camera
	for (let camId = 1; camId <= 8; camId++) {
		variableDefinitions.push({
			name: `Camera ${camId} - Active Preset Name`,
			variableId: `cam${camId}_active_preset_name`,
		})

		variableDefinitions.push({
			name: `Camera ${camId} - Active Preset ID`,
			variableId: `cam${camId}_active_preset_id`,
		})

		for (let presetId = 0; presetId <= 4; presetId++) {
			variableDefinitions.push({
				name: `Camera ${camId} - Preset ${presetId} Name`,
				variableId: `cam${camId}_preset${presetId}_name`,
			})
		}

		// Variables for parameters
		for (const paramKey in self.paramDefaults) {
			variableDefinitions.push({
				name: `Camera ${camId} - ${paramKey}`,
				variableId: `cam${camId}_param_${paramKey}`,
			})

			if (Array.isArray(self.paramDefaults[paramKey])) {
				for (let i = 0; i < self.paramDefaults[paramKey].length; i++) {
					variableDefinitions.push({
						name: `Camera ${camId} - ${paramKey} (${i})`,
						variableId: `cam${camId}_param_${paramKey}_${i}`,
					})
				}
			}
		}
	}

	// Compatibility variables (default camera shortcuts)
	variableDefinitions.push({
		name: 'Current Preset Name',
		variableId: 'current_preset_name',
	})

	variableDefinitions.push({
		name: 'Current Preset ID',
		variableId: 'current_preset_id',
	})

	for (let presetId = 0; presetId <= 4; presetId++) {
		variableDefinitions.push({
			name: `Preset ${presetId} Name`,
			variableId: `preset${presetId}_name`,
		})
	}

	self.setVariableDefinitions(variableDefinitions)

	// Set initial default values
	const variables = {}

	for (let camId = 1; camId <= 8; camId++) {
		variables[`cam${camId}_active_preset_name`] = 'None'
		variables[`cam${camId}_active_preset_id`] = '-'

		for (let presetId = 0; presetId <= 4; presetId++) {
			variables[`cam${camId}_preset${presetId}_name`] = `Preset ${presetId}`
		}

		for (const paramKey in self.paramDefaults) {
			const defaultValue = self.paramDefaults[paramKey]
			variables[`cam${camId}_param_${paramKey}`] = Variables.formatVariableValue(defaultValue)

			if (Array.isArray(defaultValue)) {
				for (let i = 0; i < defaultValue.length; i++) {
					variables[`cam${camId}_param_${paramKey}_${i}`] = Variables.formatVariableValue(defaultValue[i])
				}
			}
		}
	}

	variables['current_preset_name'] = 'None'
	variables['current_preset_id'] = '-'

	for (let presetId = 0; presetId <= 4; presetId++) {
		variables[`preset${presetId}_name`] = `Preset ${presetId}`
	}

	self.setVariableValues(variables)
}

// Also export helper functions for use by other modules
module.exports.updateVariablesFromParams = Variables.updateVariablesFromParams
module.exports.updatePresetNames = Variables.updatePresetNames
module.exports.formatVariableValue = Variables.formatVariableValue
