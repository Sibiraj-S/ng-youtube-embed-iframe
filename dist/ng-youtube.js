/*!
 * @module ng-youtube-embed-iframe
 * @description The AngularJS directive for youtube-iframe-player-api
 * @version v1.2.0
 * @link https://github.com/Sibiraj-S/ng-youtube-embed-iframe#readme
 * @licence MIT License, https://opensource.org/licenses/MIT
 */

(function() {
  'use strict';
  var $youtube, $youtubePlayerConfig, $ytFactory, $ytPlayer;

  $youtubePlayerConfig = function() {
    return {
      width: '100%',
      height: '100%',
      playerVars: {}
    };
  };

  $youtube = function($compile, ytFactory, ytPlayer, youtubePlayerConfig, $window) {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div id={{ngYoutubeId}}></div>',
      scope: {
        height: '@',
        width: '@',
        videoId: '@',
        playerOptions: '=?'
      },
      link: function(scope, element, attrs) {
        var createPlayer, firstScriptTag, onApiChange, onPlaybackRateChange, onPlayerError, onPlayerPlaybackQualityChange, onPlayerReady, onPlayerStateChange, playerHeight, playerVars, playerVideoId, playerWidth, tag, tempHeight, tempWidth;
        if (!attrs.id) {
          throw new Error('Provide id for element: ' + element[0].outerHTML);
        }

        /*
         * load the Youtube IFrame Player API code asynchronously
         * load page only once
         */
        if (typeof $window.YT === 'undefined' || typeof $window.YT.Player === 'undefined') {
          tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        ytFactory.onReady(function() {
          ytPlayer[attrs.id] = createPlayer();
        });

        /*
         * check for parameters assigned to the element
         * if assigned use the parameters
         * else if use parameters are defined in options
         * else use default parameters
         */
        scope.ngYoutubeId = attrs.id;
        scope.playerOptions = scope.playerOptions ? scope.playerOptions : {};
        playerVideoId = scope.videoId ? scope.videoId : scope.playerOptions.videoId;
        playerHeight = scope.height ? scope.height : (tempHeight = scope.playerOptions.height ? scope.playerOptions.height : youtubePlayerConfig.height);
        playerWidth = scope.width ? scope.width : (tempWidth = scope.playerOptions.width ? scope.playerOptions.width : youtubePlayerConfig.width);
        playerVars = scope.playerOptions.playerVars ? scope.playerOptions.playerVars : youtubePlayerConfig.playerVars;

        /*
         * create iframe and append video url to it
         */
        createPlayer = function() {
          return new $window.YT.Player(attrs.id, {
            videoId: playerVideoId,
            height: playerHeight,
            width: playerWidth,
            playerVars: playerVars,
            events: {
              onReady: onPlayerReady,
              onPlaybackQualityChange: onPlayerPlaybackQualityChange,
              onStateChange: onPlayerStateChange,
              onError: onPlayerError,
              onPlaybackRateChange: onPlaybackRateChange,
              onApiChange: onApiChange
            }
          });
        };

        /*
         * events emit by youtube iframe api
         */
        onPlayerReady = function(event) {
          scope.$emit('ngYoutubePlayer:onPlayerReady', event, attrs.id);
        };
        onPlayerPlaybackQualityChange = function(event) {
          scope.$emit('ngYoutubePlayer:onPlayerPlaybackQualityChange', event, attrs.id);
        };
        onPlayerStateChange = function(event) {
          scope.$emit('ngYoutubePlayer:onPlayerStateChange', event, attrs.id);
          switch (event.data) {
            case $window.YT.PlayerState.PLAYING:
              scope.$emit('ngYoutubePlayer:PLAYING', event);
              break;
            case $window.YT.PlayerState.ENDED:
              scope.$emit('ngYoutubePlayer:ENDED', event);
              break;
            case $window.YT.PlayerState.UNSTARTED:
              scope.$emit('ngYoutubePlayer:UNSTARTED', event);
              break;
            case $window.YT.PlayerState.PAUSED:
              scope.$emit('ngYoutubePlayer:PAUSED', event);
              break;
            case $window.YT.PlayerState.BUFFERING:
              scope.$emit('ngYoutubePlayer:BUFFERING', event);
              break;
            case $window.YT.PlayerState.CUED:
              scope.$emit('ngYoutubePlayer:CUED', event);
          }
        };
        onPlayerError = function(event) {
          scope.$emit('ngYoutubePlayer:onPlayerError', event, attrs.id);
        };
        onPlaybackRateChange = function(event) {
          scope.$emit('ngYoutubePlayer:onPlaybackRateChange', event, attrs.id);
        };
        onApiChange = function() {
          scope.$emit('ngYoutubePlayer:onApiChange', event, attrs.id);
        };
        scope.$watch('videoId', function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          ytPlayer[attrs.id].cueVideoById(scope.videoId);
        });
        scope.$watch('playerOptions.videoId', function(newValue, oldValue) {
          if (!scope.videoId) {
            if (newValue === oldValue) {
              return;
            }
            ytPlayer[attrs.id].cueVideoById(scope.playerOptions.videoId);
          }
        });
        scope.$on('$destroy', function() {
          var i;
          if ($window.ytPlayer) {
            $window.ytPlayer.destroy();
          }
          $window.YT = void 0;
          for (i in ytPlayer) {
            if (i) {
              ytPlayer[i].destroy();
            }
          }
        });
      }
    };
  };

  $ytFactory = function($q, $window) {
    var apiReady, deferred;
    deferred = $q.defer();
    apiReady = deferred.promise;
    $window.onYouTubeIframeAPIReady = function() {
      deferred.resolve();
    };
    return {
      onReady: function(cb) {
        apiReady.then(cb);
      }
    };
  };

  $ytPlayer = {};


  /*
   * dependency injection
   */

  $youtube.$inject = ['$compile', 'ytFactory', 'ytPlayer', 'youtubePlayerConfig', '$window'];

  $ytFactory.$inject = ['$q', '$window'];


  /*
   * define angular application
   */

  angular.module('ngYoutube', []).directive('youtube', $youtube).constant('youtubePlayerConfig', $youtubePlayerConfig).factory('ytFactory', $ytFactory).constant('ytPlayer', $ytPlayer);

}).call(this);
