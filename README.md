# ng-youtube-embed-iframe [![Build Status](https://travis-ci.org/Sibiraj-S/ng-youtube-embed-iframe.svg?branch=master)](https://travis-ci.org/Sibiraj-S/ng-youtube-embed-iframe)
The ng-youtube-embed-iframe lets you embed a YouTube video player on your website and control the player using AngularJs.

Using the ng-youtube-embed-iframe functions, you can queue videos for playback; play, pause, or stop those videos, adjust the player volume, or retrieve information about the video being played. You can also add event listeners that will execute in response to certain player events, such as a player state change or a video playback quality change.

The AngularJS directive for [Youtube Iframe API][ApiReference]. All functions supported by Youtube Iframe API is supported.

## Getting started

#### Install Package
npm

```bash
npm install ng-youtube-embed-iframe --save
```

yarn

```bash
yarn add ng-youtube-embed-iframe
```

bower

```bash
bower install ng-youtube-embed-iframe --save
```
#### CDN

Minified
```
//unpkg.com/ng-youtube-embed-iframe@latest/dist/ng-youtube.min.js
```

Pretty Printed
```
//unpkg.com/ng-youtube-embed-iframe@latest/dist/ng-youtube.js
```

#### use package

```js
<script src="ng-youtube-embed-iframe/dist/ng-youtube.min.js"></script>

var app = angular.module('myApp', ['ngYoutube'])

<youtube id="myYoutubePlayer"></youtube> // add in html
```

#### options

options like `video-id, height, width` can be directly provided in the element which is considered as a main priority.

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

Check [wiki][wiki] for documentation

[ApiReference]:https://developers.google.com/youtube/iframe_api_reference
[wiki]:https://github.com/Sibiraj-S/ng-youtube-embed-iframe/wiki
