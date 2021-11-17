(function () {
  var script = document.createElement('script');
  script.src = 'https://my.zadarma.com/callmewidget/v2.0.8/loader.js';
  document.getElementById('zadarmaScripts')?.appendChild(script);
}());



var myZadarmaCallmeWidget10726;
var myZadarmaCallmeWidgetFn10726 = function () {
  myZadarmaCallmeWidget10726 = new ZadarmaCallmeWidget("myZadarmaCallmeWidget10726");
  myZadarmaCallmeWidget10726.create({
    "widgetId": "bfZ9D2Y2jbSvbm52hx7H3pRb8pvu87yxb1NUmMxrfUBkrZ4d5prb7Tfuc2gB8Up66hzKjaRXayB3NKfkmj7r6uG5R9h6erVt47fad513cdcafc262acf5a56e0b3d53f",
    "sipId": "781277",
    "domElement": "myZadarmaCallmeWidget10726"
  }, {
    "shape": "square",
    "language": "ru",
    "width": "0",
    "dtmf": false,
    "font": "'Trebuchet MS','Helvetica CY',sans-serif",
    "color_call": "rgb(255, 255, 255)",
    "color_bg_call": "rgb(1,76,122)",
    "color_border_call": "rgb(150,191,217)",
    "color_connection": "rgb(255, 255, 255)",
    "color_bg_connection": "rgb(3,195,0)",
    "color_border_connection": "rgb(161,230,159)",
    "color_calling": "rgb(255, 255, 255)",
    "color_border_calling": "rgb(255, 218, 128)",
    "color_bg_calling": "rgb(255, 181, 0)",
    "color_ended": "rgb(255, 255, 255)",
    "color_bg_ended": "rgb(164,164,164)",
    "color_border_ended": "rgb(210, 210, 210)"
  });
}

if (window.addEventListener) {
  window.addEventListener('load', myZadarmaCallmeWidgetFn10726, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', myZadarmaCallmeWidgetFn10726);
}
