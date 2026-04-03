// TallyCCU Pro - Presets & Utility Actions
// Preset management, camera selection, vMix integration, and connection

module.exports = function (self, actions) {
	actions['load_preset'] = {
		name: 'Load Preset',
		description: 'Load a preset from TallyCCU Pro SD card',
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
				label: 'Preset ID (0-4)',
				id: 'presetId',
				default: 0,
				min: 0,
				max: 4,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const presetId = event.options.presetId
			const url = 'http://' + self.config.host + '/?loadPreset=' + cameraId + ',' + presetId
			self.log('info', 'Loading preset ' + presetId + ' for camera ' + cameraId)

			try {
				const response = await fetch(url, { signal: AbortSignal.timeout(10000) })
				const responseText = await response.text()

				let success = false
				let data = null

				// Arduino may respond with "OK" (plain text) or JSON with success
				if (responseText.trim() === 'OK' || responseText.includes('OK')) {
					success = true
				} else {
					const jsonMatch = responseText.match(/\{.*\}/s)
					if (jsonMatch) {
						try {
							data = JSON.parse(jsonMatch[0])
							success = data.success === true
						} catch (e) {
							// JSON parse failed
						}
					}
				}

				if (success) {
					self.log('info', 'Preset loaded successfully')
					const presetName =
						self.presetNames[cameraId] && self.presetNames[cameraId][presetId]
							? self.presetNames[cameraId][presetId]
							: `Preset ${presetId}`

					const variables = {}
					variables[`cam${cameraId}_active_preset_name`] = presetName
					variables[`cam${cameraId}_active_preset_id`] = presetId.toString()
					if (cameraId == self.config.defaultCameraId) {
						variables['current_preset_name'] = presetName
						variables['current_preset_id'] = presetId.toString()
					}
					self.setVariableValues(variables)

					if (data && data.parameters) {
						self.updateParameterValues(cameraId, data.parameters)
					}
				} else {
					self.log('warn', 'Preset did not load correctly')
				}
			} catch (error) {
				self.log('error', 'Error loading preset: ' + error.message)
			}
		},
	}

	actions['list_presets'] = {
		name: 'List Presets',
		description: 'List all presets saved on SD card',
		options: [],
		callback: async () => {
			const url = 'http://' + self.config.host + '/?listPresets'
			self.log('info', 'Listing presets...')

			try {
				const response = await fetch(url, { signal: AbortSignal.timeout(5000) })
				const responseText = await response.text()

				let data
				const jsonMatch = responseText.match(/\{.*\}/s)
				if (jsonMatch) {
					try {
						data = JSON.parse(jsonMatch[0])
					} catch (e) {
						// JSON parse failed
					}
				}

				if (data && data.presets && Array.isArray(data.presets)) {
					self.log('info', 'Presets found: ' + data.presets.length)
					data.presets.forEach((p) => {
						if (p.cameraId !== undefined && p.presetId !== undefined) {
							self.log('info', `Camera ${p.cameraId}, Preset ${p.presetId}: "${p.name || 'No name'}"`)
						}
					})
					self.updatePresetNames(data.presets)
				} else {
					self.log('warn', 'No presets found')
				}
			} catch (error) {
				self.log('error', 'Error listing presets: ' + error.message)
			}
		},
	}

	actions['retry_connection'] = {
		name: 'Retry Connection',
		description: 'Force a new connection attempt with TallyCCU Pro',
		options: [],
		callback: async () => {
			self.log('info', 'Retrying connection manually...')
			self.reconnectAttempts = 0
			const connected = await self.checkConnection()
			if (connected) {
				self.log('info', 'Connection restored successfully')
			} else {
				self.log('warn', 'Could not establish connection')
			}
		},
	}

	actions['change_camera'] = {
		name: 'Change Active Camera',
		description: 'Change the camera that will receive the following commands',
		options: [
			{
				type: 'number',
				label: 'Camera ID',
				id: 'cameraId',
				default: 1,
				min: 1,
				max: 8,
			},
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			await self.sendParam(cameraId, 'cameraId', cameraId)
		},
	}

	// SAVE PRESET - Single POST request with all data
	actions['save_current_as_preset'] = {
		name: 'Save Current Configuration as Preset',
		description: 'Saves current camera configuration as preset (via POST)',
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
				label: 'Preset Number (0-4)',
				id: 'presetId',
				default: 0,
				min: 0,
				max: 4,
			},
			{
				type: 'textinput',
				label: 'Preset Name',
				id: 'presetName',
				default: 'My Preset',
			},
			{ type: 'checkbox', label: 'Include: Audio', id: 'includeGroupAudio', default: false },
			{ type: 'checkbox', label: 'Include: Color Correction', id: 'includeGroupColorCorrection', default: true },
			{ type: 'checkbox', label: 'Include: Display', id: 'includeGroupDisplay', default: false },
			{ type: 'checkbox', label: 'Include: Lens', id: 'includeGroupLens', default: true },
			{ type: 'checkbox', label: 'Include: Output', id: 'includeGroupOutput', default: false },
			{ type: 'checkbox', label: 'Include: PTZ Control', id: 'includeGroupPtzControl', default: false },
			{ type: 'checkbox', label: 'Include: Reference', id: 'includeGroupReference', default: false },
			{ type: 'checkbox', label: 'Include: Tally', id: 'includeGroupTally', default: false },
			{ type: 'checkbox', label: 'Include: Video', id: 'includeGroupVideo', default: true },
		],
		callback: async (event) => {
			const cameraId = event.options.cameraId
			const presetId = event.options.presetId
			const presetName = event.options.presetName
			const fullState = self.captureCurrentState(cameraId)

			const includedGroups = []
			if (event.options.includeGroupAudio) includedGroups.push('audio')
			if (event.options.includeGroupColorCorrection) includedGroups.push('color_correction')
			if (event.options.includeGroupDisplay) includedGroups.push('display')
			if (event.options.includeGroupLens) includedGroups.push('lens')
			if (event.options.includeGroupOutput) includedGroups.push('output')
			if (event.options.includeGroupPtzControl) includedGroups.push('ptz_control')
			if (event.options.includeGroupReference) includedGroups.push('reference')
			if (event.options.includeGroupTally) includedGroups.push('tally')
			if (event.options.includeGroupVideo) includedGroups.push('video')

			self.log('info', `Saving preset ${presetId} for camera ${cameraId} with groups: ${includedGroups.join(', ')}`)

			const filteredData = {}
			for (const [key, value] of Object.entries(fullState)) {
				if (key === 'cameraId') continue
				const paramGroup = self.paramGroupMap[key]
				if (paramGroup && includedGroups.includes(paramGroup)) {
					filteredData[key] = value
				}
			}

			const paramKeys = Object.keys(filteredData)
			const totalParams = paramKeys.length
			if (totalParams === 0) {
				self.log('warn', 'No parameters to save with selected groups')
				return
			}

			self.log('info', `Preparing ${totalParams} parameters to send...`)

			try {
				let dataString = ''
				for (const key of paramKeys) {
					const value = filteredData[key]
					const valueStr = Array.isArray(value) ? value.join(',') : String(value)
					dataString += `${key}:${valueStr};`
				}
				const bodyData = `cameraId=${cameraId}&presetId=${presetId}&name=${encodeURIComponent(presetName)}&data=${encodeURIComponent(dataString)}`
				self.log('debug', `Body length: ${bodyData.length} bytes`)

				const url = 'http://' + self.config.host + '/savePreset'
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: bodyData,
					signal: AbortSignal.timeout(15000),
				})
				const responseText = await response.text()

				let result
				const jsonMatch = responseText.match(/\{.*\}/s)
				if (jsonMatch) {
					try {
						result = JSON.parse(jsonMatch[0])
					} catch (e) {
						// JSON parse failed
					}
				}

				if (result && result.success) {
					self.log('info', `Preset saved successfully: ${result.params || totalParams} parameters`)
					if (!self.presetNames[cameraId]) self.presetNames[cameraId] = {}
					self.presetNames[cameraId][presetId] = presetName
					const variables = {}
					variables[`cam${cameraId}_preset${presetId}_name`] = presetName
					if (cameraId == self.config.defaultCameraId) {
						variables[`preset${presetId}_name`] = presetName
					}
					self.setVariableValues(variables)
				} else {
					const errorMsg = result?.error || 'Invalid server response'
					self.log('error', `Error saving preset: ${errorMsg}`)
				}
			} catch (error) {
				self.log('error', `Error saving preset: ${error.message}`)
			}
		},
	}

	// VMIX ACTIONS
	actions['set_vmix_connect'] = {
		name: 'vMix Connect - Toggle State',
		description: 'Enable or disable automatic vMix connection',
		options: [
			{
				type: 'dropdown',
				label: 'State',
				id: 'enabled',
				default: 'true',
				choices: [
					{ id: 'true', label: 'Enable' },
					{ id: 'false', label: 'Disable' },
				],
			},
		],
		callback: async (event) => {
			const enabled = event.options.enabled === 'true' ? 1 : 0
			const url = `http://${self.config.host}/?vmixConnect=${enabled}`
			try {
				await fetch(url, { signal: AbortSignal.timeout(3000) })
				self.log('info', `vMix connection ${enabled ? 'enabled' : 'disabled'}`)
			} catch (err) {
				self.log('error', `Error changing vMix Connect state: ${err.message}`)
			}
		},
	}
}
