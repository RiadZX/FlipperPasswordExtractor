# FlipperPasswordExtractor
Extract saved browser passwords to a Discord webhook or save them locally on the Flipper Zero.<br/>
Currently supports:
- Chrome Browser
- Edge Browser
  
The extractor is written in `Golang`,and the current build is compiled for Windows. The Flipper Zero JavaScript script downloads the binary, runs it, and either sends the output to the defined Discord webhook or saves it locally to the Flipper Zero, depending on which JavaScript script is used.

## Features
- Extract saved passwords from Chrome and Edge browsers.
- Send extracted passwords to a Discord webhook.
- Save extracted passwords locally on the Flipper Zero as a mass storage image.

## setup
### Webhook Script
- Add your webhook url to the .js file
- Add chrome/edge javascript to your flipper

### Flipper Storage Script
- Add the new Chrome/Edge JavaScript scripts to your Flipper.
- These scripts will create mass storage images (chrome_loot.img and edge_loot.img) on the Flipper Zero.
- The output from the Chrome and Edge executables will be saved to their respective mass storage images.
- Each image will contain a folder named with the date the script is run.
- Inside the date folder, the extracted passwords will be saved as a .txt file in the format {computername}_{Time}.txt.

## optimizing build size
add these flags when building
```-ldflags="-w -s" -gcflags=all=-l```
