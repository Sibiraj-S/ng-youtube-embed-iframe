# ng-youtube-embed-iframe [![Build Status](https://travis-ci.com/sibiraj-s/ng-youtube-embed-iframe.svg?branch=master)](https://travis-ci.com/sibiraj-s/ng-youtube-embed-iframe)

<p align="center">
  <a href="https://github.com/sibiraj-s/ng-youtube-embed-iframe">
   <img src="https://raw.githubusercontent.com/sibiraj-s/ng-youtube-embed-iframe/master/assets/images/youtube.png" alt="ng-youtube-embed-iframe" height="180">
  </a>
</p>

ng-youtube-embed-iframe lets you embed a YouTube video player on your website and control the player using AngularJs.

Using ng-youtube-embed-iframe functions, you can queue videos for playback; play, pause, or stop those videos, adjust the player volume, or retrieve information about the video being played. You can also add event listeners that will execute in response to certain player events, such as a player state change or a video playback quality change.

An AngularJS directive for [Youtube Iframe API][ApiReference]. All functions supported by Youtube Iframe API is supported.

## Getting started

### Installation

Installation can be done via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ng-youtube-embed-iframe --save
# or
yarn add ng-youtube-embed-iframe
```

or use cdn

##### Minified

```bash
//unpkg.com/ng-youtube-embed-iframe@latest/ng-youtube.min.js
```

##### Pretty Printed

```bash
//unpkg.com/ng-youtube-embed-iframe@latest/ng-youtube.js
```

### Usage

```js
<script src="../ng-youtube.min.js"></script>

var app = angular.module('myApp', ['ngYoutube'])

<youtube id="myYoutubePlayer"></youtube> // add in html
```

#### options

Options like `video-id, height, width` can be directly provided in the element which is considered as the main priority.

Other options can be provided in `player-options`

In HTML

```html
<youtube player-options="options" id="myYoutubePlayer"></youtube>
```

In Controller

```js
$scope.options = {
    videoId:'',
    height:'100%',
    width:'700px',
    playerVars:{} // all parameters supported by youtube-iframe-api
}
```

Refer [wiki][wiki] for documentation

[ApiReference]:https://developers.google.com/youtube/iframe_api_reference
[wiki]:https://github.com/sibiraj-s/ng-youtube-embed-iframe/wiki
[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
