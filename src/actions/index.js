// TallyCCU Pro - Actions Index
// Combines all action categories

const lensActions = require('./lens')
const videoActions = require('./video')
const audioActions = require('./audio')
const outputActions = require('./output')
const displayActions = require('./display')
const tallyActions = require('./tally')
const referenceActions = require('./reference')
const colorActions = require('./color')
const ptzActions = require('./ptz')
const presetsActions = require('./presets')

module.exports = function (self) {
	const actions = {}

	lensActions(self, actions)
	videoActions(self, actions)
	audioActions(self, actions)
	outputActions(self, actions)
	displayActions(self, actions)
	tallyActions(self, actions)
	referenceActions(self, actions)
	colorActions(self, actions)
	ptzActions(self, actions)
	presetsActions(self, actions)

	self.setActionDefinitions(actions)
}
