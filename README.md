# Configduino

I like building Arduino Projects. I like to use the ESP8266 for those projects. I don't like hardcoding my WIFI details in code. Thankfully, it is possible to run an ESP8266 in "AP" mode and create what is called a _Capitivate Portal_.

These components allow me to quickly throw together a lightweight UI that con be delivered to a browser on a device connected to a captivate portal.

![The Captivate portal in action](https://github.com/madpilot/configduino/blob/master/docs/images/example.jpg)

## Design

I had some design goals for this library:

### 1. Size

When connected to a captivate portal, the client won't have access to the internet, so everything has to be served from the Arduino. While many ESP8266 boards have 1MB of flash, using it up on a configruation app that may only be used once is pretty crazy.

The very first iteration I did of this was [vanilla JavaScript](https://github.com/madpilot/GarageDoorOpenerWeb/tree/f0f2e098d6110f6d1257e852a3cff208988407af), and it actually come out pretty small - all the HTML, CSS and JavaScript compiled to around 4.7k gzipped, but it wasn't particulary extendable, and it was hard to maintain.

### 2. Maintainable

I don't want to spend hours modifying a bunch of spaghetti JavaScript everytime I start a new project. While < 5kB is impressive, I was willing to sacrifice a **little** bit of space if it meant I could easily reuse and maintain the library.

I looked into React, but it was WAY too big. React 16 is around 40kB gzipped just on it's own. I managed to find Preact, with claims to be 3kB. To push my luck, I also added CSS modules.

After a rewrite, I ran a build, and it came in around double the size at 11kB. I was happy with that trade off in exchange code that is maintainble and testable.

### 3. Usable

The config app needed to be user friendly. Too many embedded configuration web apps are horrible. If you have ever configured a ADSL modem, you'll know what I'm talking about.

### 4. Self contained

I didn't want to mess about with multiple HTTP endpoints (the less the Arduino does the better), so the config app needs to be a single page-app. This means moving as much logic to the browser as possible.

This includes input validation, and even building the config object binary.

## Installing

The widgets are exposed via a NPM package.

```
yarn add configduino
```

## An example app

Coming soon..

