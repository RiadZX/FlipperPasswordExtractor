# FlipperPasswordExtractor
Extract saved browser passwords to a webhook.<br/>
Currently supports:
- Chrome Browser
- Edge Browser
  
The extractor is written in `Golang`, the current build is compiled to windows. The 
flipperzero javascript script downloads the binary and runs it, and sends to the webhook defined in the js file.
## setup
- Add your webhook url to the .js file
- Adjust the `$webhookContent` to match the format of the webhook.
- add chrome/edge javascript to your flipper.