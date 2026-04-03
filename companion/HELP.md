# TallyCCU Pro - Companion Module

## What is TallyCCU Pro?

TallyCCU Pro is an open-source hardware/software solution that enables full CCU (Camera Control Unit) control of Blackmagic Design cameras via SDI, along with tally light integration with vMix.

This Companion module connects to the TallyCCU Pro Arduino device over your local network, allowing you to control up to 8 Blackmagic cameras directly from your Companion buttons.

## Requirements

- **TallyCCU Pro hardware**: Arduino Mega 2560 + Ethernet Shield + Blackmagic 3G-SDI Shield
- **Blackmagic cameras**: Any camera supporting the Blackmagic SDI Camera Control Protocol
- **Network**: Both Companion and TallyCCU Pro must be on the same network

## Configuration

| Setting            | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| **IP Address**     | The IP address of your TallyCCU Pro device (e.g., 192.168.1.100) |
| **Default Camera** | Camera ID (1-8) used when no specific camera is selected         |

## Available Actions

### Camera Parameters

Full control of all Blackmagic CCU parameters organized by category:

- **Lens**: Focus, Aperture, Zoom, OIS
- **Video**: ISO, Shutter, White Balance, Dynamic Range, ND Filter
- **Audio**: Mic Level, Headphone Level, Phantom Power
- **Color Correction**: Lift, Gamma, Gain, Offset, Contrast, Saturation, Hue
- **Display**: Brightness, Zebra, Peaking, Focus Assist
- **Tally**: Front/Rear tally brightness
- **PTZ**: Pan/Tilt velocity, Memory presets (for supported cameras)

Each parameter has actions for:

- **Set value**: Set to a specific value
- **Increase/Decrease**: Step up or down
- **Reset**: Return to default value

### Presets

- **Load Preset**: Apply a saved preset to a camera
- **Save Preset**: Save current camera settings as a preset
- **List Presets**: Log all available presets to the console

### Connection Management

- **Change Active Camera**: Switch which camera receives commands
- **Retry Connection**: Force reconnection to TallyCCU Pro
- **vMix Connect**: Enable/disable vMix tally integration

## Feedbacks

The module provides feedbacks for button style changes:

| Feedback                      | Description                               |
| ----------------------------- | ----------------------------------------- |
| **Connection Status**         | Green when connected to TallyCCU Pro      |
| **Active Preset**             | Highlights when specific preset is active |
| **OIS Enabled**               | Shows OIS state                           |
| **Phantom Power**             | Shows phantom power state                 |
| **Dynamic Range Mode**        | Matches specific dynamic range mode       |
| **Parameter Value Compare**   | Match any parameter to a specific value   |
| **Parameter Above Threshold** | Trigger when parameter exceeds threshold  |

## Variables

The module provides variables for use in button text:

| Variable                      | Description                        |
| ----------------------------- | ---------------------------------- |
| `cam[1-8]_active_preset_name` | Active preset name for each camera |
| `cam[1-8]_active_preset_id`   | Active preset ID for each camera   |
| `cam[1-8]_preset[0-4]_name`   | Name of each preset slot           |
| `cam[1-8]_param_[key]`        | Current value of any parameter     |

## Real-time Sync

The module maintains a persistent TCP connection (port 8098) with TallyCCU Pro for real-time bidirectional synchronization. Changes made via the web interface or other clients are automatically reflected in Companion variables and feedbacks.

## Troubleshooting

| Issue                   | Solution                                                  |
| ----------------------- | --------------------------------------------------------- |
| "Connection error"      | Check IP address and network connectivity                 |
| Parameters not updating | Verify TallyCCU Pro firmware is V3.0+                     |
| Tally not working       | Check vMix IP configuration in TallyCCU Pro web interface |

## More Information

- **GitHub**: https://github.com/fiverecords/TallyCCUPro
- **Support**: fiverecords@gmail.com
