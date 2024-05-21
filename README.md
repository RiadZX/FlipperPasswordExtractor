# FlipperPasswordExtractor
Extract saved browser passwords to a discord webhook.<br/>
Currently supports:
- Chrome Browser
- Edge Browser
  
The extractor is written in `Golang`, the current build is compiled to windows. The 
flipperzero javascript script downloads the binary and runs it, and sends to the webhook defined in the js file.
## setup
- add your webhook url to the .js file
- add chrome/edge javascript to your flipper

## optimizing build size
add these flags when building
```-ldflags="-w -s" -gcflags=all=-l```