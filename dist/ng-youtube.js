/*!
 * @module ng-youtube-embed-iframe
 * @description The AngularJS directive for youtube-iframe-player-api
 * @version v1.2.1
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

  $youtube = function($compile, ytFactory, ytPlayer, youtubePlayerConfig) {
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
        if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
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
        // create iframe and append video url to it
        createPlayer = function() {
          return new YT.Player(attrs.id, {
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
        // events emit by youtube iframe api
        onPlayerReady = function(event) {
          scope.$emit('ngYoutubePlayer:onPlayerReady', event, attrs.id);
        };
        onPlayerPlaybackQualityChange = function(event) {
          scope.$emit('ngYoutubePlayer:onPlayerPlaybackQualityChange', event, attrs.id);
        };
        onPlayerStateChange = function(event) {
          scope.$emit('ngYoutubePlayer:onPlayerStateChange', event, attrs.id);
          switch (event.data) {
            case YT.PlayerState.PLAYING:
              scope.$emit('ngYoutubePlayer:PLAYING', event);
              break;
            case YT.PlayerState.ENDED:
              scope.$emit('ngYoutubePlayer:ENDED', event);
              break;
            case YT.PlayerState.UNSTARTED:
              scope.$emit('ngYoutubePlayer:UNSTARTED', event);
              break;
            case YT.PlayerState.PAUSED:
              scope.$emit('ngYoutubePlayer:PAUSED', event);
              break;
            case YT.PlayerState.BUFFERING:
              scope.$emit('ngYoutubePlayer:BUFFERING', event);
              break;
            case YT.PlayerState.CUED:
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
        // watch for changes in videoId
        scope.$watch('videoId', function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          ytPlayer[attrs.id].cueVideoById(scope.videoId);
        });
        // watch for changes in plyerOptions videoId
        scope.$watch('playerOptions.videoId', function(newValue, oldValue) {
          if (!scope.videoId) { // considering videoId as priority
            if (newValue === oldValue) {
              return;
            }
            ytPlayer[attrs.id].cueVideoById(scope.playerOptions.videoId);
          }
        });
        // destroy elements when destroy is triggered
        scope.$on('$destroy', function() {
          var YT, i;
          YT = void 0;
          for (i in ytPlayer) {
            if (i && ytPlayer[i].a) {
              ytPlayer[i].destroy();
            }
          }
        });
      }
    };
  };

  // player service invokes when the player is ready
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

  // player constant
  $ytPlayer = {};

  /*
   * dependency injection
   */
  $youtube.$inject = ['$compile', 'ytFactory', 'ytPlayer', 'youtubePlayerConfig'];

  $ytFactory.$inject = ['$q', '$window'];

  /*
   * define angular application
   */
  angular.module('ngYoutube', []).directive('youtube', $youtube).constant('youtubePlayerConfig', $youtubePlayerConfig).factory('ytFactory', $ytFactory).constant('ytPlayer', $ytPlayer);

}).call(this);
