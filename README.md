# Configduino

A bunch of mini-preact components for building arduino configuration websites

## Configuring Arduino Projects

I like building Arduino Projects. I like to use the ESP8266 for those projects. I don't like hardcoding my WIFI details in code. Thankfully, it is possible to run an ESP8266 in "AP" mode and create what is called a _Capitivate Portal_.

These components allow me to quickly throw together a lightweight UI for my projects.

![The Captivate portal in action](https://github.com/madpilot/configduino/blob/master/docs/images/example.jpg)

## Design

I had some design goals for this project:

### 1. Size

When in a captivate portal, the client won't have access to the internet, so everything has to be served from the Arduino. While many ESP8266 boards have 1MB of flash, tying up a lot of that for something that may only be used once is pretty crazy. The resultant website needs to have all the HTML, CSS and JavaScript it needs to function.

The very first iteration I did of this was [vanilla JavaScript](https://github.com/madpilot/GarageDoorOpenerWeb/tree/f0f2e098d6110f6d1257e852a3cff208988407af), and it actually come out pretty small - around 4.7k gzipped, but it wasn't particulary extendable, and it was hard to maintain.

### 2. Maintainable

I don't want to spend hours modifying a bunch of spaghetti JavaScript everytime I start a new project. While < 5kB is pretty impressive, I was willing forgo a **litle** bit of space if it meant I could actually reuse and maintain a library.

I looked into React, but it was WAY too big. React 16 is around 40kB gzipped just on it's own. I managed to find Preact, with claims to be 3kB which sounded much better. To push my luck, I also added CSS modules. After a rewrite, I ran a build, and it came in around double the size at 11kB. That is not a terrible trade of for code that is maintainble and testable.

### 3. Usable

The config app needed to be user friendly. Too many embedded configuration web apps are horrible. If you have ever configured your ADSL modem, you'll know what I'm talking about. Since I didn't want to mess about with multiple HTTP endpoints (the app is served up from a GET, and the config is updated using a POST) everything had to be a single page app. It also needed to do all of the validation heavy lifting. So much so, the browser actually builds the config object binary and just uploads that (There is some basic validation "server" side, but only enough to stop basic overflows).


## Installing

The widgets are exposed via a NPM package.

```
yarn add configduino
```



