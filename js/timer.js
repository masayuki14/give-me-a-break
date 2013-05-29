// タイマー設定関数
// arg1: タイマーの設定時間 mm:ss 形式
// arg2: タイマー終了時のcallback 関数
function setTimer() {
    var time = (arguments.length > 0) ? arguments[0] : '25:00';
    var func = (arguments.length > 1) ? arguments[1] : function(){};
    $('#counter').html('');
    $('#counter').countdown({
        image: 'img/digits.png',
        startTime: time,
        timerEnd: func,
        format: 'mm:ss',
    });
}

// Worktime と Resttime のカウントダウンを繰り返す
var _work = function() {
    hideContent();
    setTimer('25:00', _rest);
}
var _rest = function() {
    showContent();
    setTimer('05:00', _work);
}

$(document).ready(function(){
    _work();
});

function showContent() {
  /* http通信でYouTube動画のIDを取得する */
  $.get('movie.php', function(youtubeId) {
    // 動画の表示
    html = '<h1>Have a break! </h1>'
         + '<iframe width="640" height="360" src="http://www.youtube.com/embed/' + youtubeId + '?&autoplay=1" frameborder="0" allowfullscreen></iframe>';
    $('#rest-contents').html(html);
  });
}

function hideContent() {
    $('#rest-contents').html('');
}

