angular.module('app', ['ngYoutube']);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000; // 10s

describe('ngYoutube', () => {
  beforeEach(module('app'));
  let $compile;
  let $rootScope;
  let $window;

  let ytPlayer;
  let youtubePlayerConfig;

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $window = $injector.get('$window');

    ytPlayer = $injector.get('ytPlayer');
    youtubePlayerConfig = $injector.get('youtubePlayerConfig');
  }));

  it('should have the correct default config', () => {
    expect(youtubePlayerConfig).toBeInstanceOf(Object);
    expect(youtubePlayerConfig.height).toEqual('100%');
    expect(youtubePlayerConfig.width).toEqual('100%');
    expect(youtubePlayerConfig.playerVars).toEqual({});
  });

  it('should create the player', (done) => {
    expect($window.YT).toBeFalsy();
    expect($window.onYouTubeIframeAPIReady).toBeFalsy();

    const youtubeVideoId = 'pRpeEdMmmQ0';

    $rootScope.videoId = youtubeVideoId;
    const template = '<youtube video-id={{videoId}} id="player"></youtube>';
    const element = $compile(template)($rootScope);
    $rootScope.$digest();

    expect(element.attr('video-id')).toBe(youtubeVideoId);
    expect(ytPlayer).toEqual({});

    expect($window.onYouTubeIframeAPIReady).toBeInstanceOf(Function);

    const originalIframeReadyFn = $window.onYouTubeIframeAPIReady;
    $window.onYouTubeIframeAPIReady = () => {
      originalIframeReadyFn();

      $rootScope.$apply();

      expect($window.YT).toBeTruthy();
      expect(Object.keys(ytPlayer)).toContain('player');
      done();
    };
  });
});
