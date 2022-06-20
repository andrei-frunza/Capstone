# Design of an Initelligent Wireless Mobile Charger
This repository contains the React-Native Phone application developed over the course of the 2021-2022 school year to control a wireless phone charger through a ESP8266 Web Server.

The project was initiated using a basic React-Native boilerplate (react-native init) then built upon using VScode and JavaScript.

# Functionality of the Application
The phone application makes HTTP requests to an ESP8266 Web Server on the same local WiFi connection as itself. The requests access routes that have been programmed on the ESP8266 to perform different functions. These functions range from client authentication to turning an external charging circuit on and off.

The phone application detects the ESP8266 on the local network using Zeroconf, similar to how printers connect to devices on the same network. The ESP8266 outputs an mDNS (Multicast DNS) which is a static string. In this case, "esp8266.local". The phone application searches for this mDNS using an added zeroconf node, and once it finds it, obtains the IP address of the ESP8266. <br/>
![alt text](https://github.com/andrei-frunza/Capstone/blob/main/images/app.JPG?raw=true) <br/>
![alt text](https://github.com/andrei-frunza/Capstone/blob/main/images/display.JPG?raw=true)

Zeroconf will not work on emulators, only physical devices.

# Read More
For more information on the article, refer to the [the following linkedin article](https://www.linkedin.com/pulse/design-wireless-intelligent-mobile-charger-andrei-frunza/?trackingId=DQ4FO8p3S9mGnDV7%2BTI0sw%3D%3D)
