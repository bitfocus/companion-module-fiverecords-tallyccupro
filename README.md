# companion-module-fiverecords-tallyccupro

Companion module for controlling Blackmagic Design cameras via [TallyCCU Pro](https://github.com/fiverecords/TallyCCUPro), an open-source Arduino-based CCU system with vMix tally integration.

## Features

- Full CCU control of up to 8 Blackmagic cameras (lens, video, audio, color correction, display, tally, PTZ)
- Real-time bidirectional sync via TCP
- Preset management (save/load camera configurations)
- vMix tally integration
- Feedbacks for button style changes based on camera state
- Variables for dynamic button text

## Getting Started

See [HELP](companion/HELP.md) for configuration and usage details.

## Development

```
yarn install
yarn build
```

## Hardware Project

- [TallyCCU Pro on GitHub](https://github.com/fiverecords/TallyCCUPro)
