// TallyCCU Pro - Connection Monitoring
// HTTP connection monitoring and status management

const { InstanceStatus } = require('@companion-module/base')

module.exports = {
	async checkConnection(self) {
		if (!self.config.host) {
			self.connectionStatus = 'error'
			self.updateStatus(InstanceStatus.BadConfig, 'No IP configured')
			return false
		}

		// If TCP is connected, use it as connection indicator
		if (self.tcpConnected) {
			self.connectionStatus = 'ok'
			self.updateStatus(InstanceStatus.Ok, 'Connected via TCP')
			return true
		}

		self.log('debug', 'Checking connection to TallyCCU Pro at ' + self.config.host)

		try {
			const url = 'http://' + self.config.host + '/?listPresets'
			const response = await fetch(url, { signal: AbortSignal.timeout(3000) })
			const responseText = await response.text()

			let validResponse = false
			let presetsData = null

			if (
				responseText.includes('presets') ||
				responseText.includes('TallyCCU') ||
				(responseText.includes('{') && responseText.includes('}'))
			) {
				validResponse = true
				const jsonMatch = responseText.match(/\{.*\}/s)
				if (jsonMatch) {
					try {
						presetsData = JSON.parse(jsonMatch[0])
						if (presetsData.presets === undefined) {
							validResponse = false
						}
					} catch (e) {
						// JSON parse failed, but response was valid text
					}
				}
			}

			if (validResponse) {
				self.connectionStatus = 'ok'
				self.reconnectAttempts = 0
				self.updateStatus(InstanceStatus.Ok, 'Connected to TallyCCU Pro')
				self.log('debug', 'Connection verified successfully')
				self.checkFeedbacks()

				// Load preset names if available
				if (presetsData && presetsData.presets && Array.isArray(presetsData.presets)) {
					self.log('info', 'Loading preset names from SD')
					self.updatePresetNames(presetsData.presets)
				}

				return true
			} else {
				self.connectionStatus = 'error'
				self.reconnectAttempts++
				self.updateStatus(InstanceStatus.ConnectionFailure, 'Invalid response - Not a TallyCCU Pro')
				self.log('warn', 'Response received but does not appear to be from a TallyCCU Pro')
				return false
			}
		} catch (error) {
			self.connectionStatus = 'error'
			self.reconnectAttempts++

			let errorMsg = 'Connection error'
			if (error.cause && error.cause.code === 'ECONNREFUSED') {
				errorMsg = 'Connection refused'
			} else if (error.name === 'TimeoutError' || error.name === 'AbortError') {
				errorMsg = 'Connection timeout'
			} else if (error.cause && error.cause.code === 'EHOSTUNREACH') {
				errorMsg = 'Host unreachable'
			}

			self.updateStatus(
				InstanceStatus.ConnectionFailure,
				errorMsg + ' (' + self.reconnectAttempts + '/' + self.maxReconnectAttempts + ')',
			)
			self.log('error', 'Error checking connection: ' + error.message)
			return false
		}
	},

	startConnectionMonitor(self) {
		self.log('info', 'Starting connection monitoring...')

		if (self.connectionTimer) {
			clearInterval(self.connectionTimer)
		}

		// Initial check with proper error handling
		this.checkConnection(self).then(
			(connected) => {
				if (connected) {
					self.log('info', 'Initial connection established successfully')
				} else {
					self.log('warn', 'Could not establish initial connection')
				}
			},
			(err) => {
				self.log('error', 'Unexpected error during initial connection check: ' + err.message)
			},
		)

		// Periodic check
		self.connectionTimer = setInterval(async () => {
			try {
				const connected = await this.checkConnection(self)

				if (!connected && self.reconnectAttempts >= self.maxReconnectAttempts) {
					clearInterval(self.connectionTimer)
					self.log('warn', 'Multiple connection failures, increasing check interval')
					self.pingInterval = 60000
					self.connectionTimer = setInterval(() => {
						this.checkConnection(self).catch((err) => {
							self.log('error', 'Connection check error: ' + err.message)
						})
					}, self.pingInterval)
				}
			} catch (err) {
				self.log('error', 'Connection monitor error: ' + err.message)
			}
		}, self.pingInterval)
	},

	stopConnectionMonitor(self) {
		if (self.connectionTimer) {
			clearInterval(self.connectionTimer)
			self.connectionTimer = null
		}
		self.log('debug', 'Connection monitoring stopped')
	},
}
