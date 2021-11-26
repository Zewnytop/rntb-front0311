(function () {
  var script = document.createElement('script');
  script.src = 'https://my.zadarma.com/callmewidget/v2.0.8/loader.js';
  document.getElementById('zadarmaScripts').appendChild(script);
}());

var myZadarmaCallmeWidget10822;
var myZadarmaCallmeWidgetFn10822 = function () {
  myZadarmaCallmeWidget10822 = new ZadarmaCallmeWidget("myZadarmaCallmeWidget10822");
  myZadarmaCallmeWidget10822.create({
    "widgetId": "89Hexp1Z45n6sMUgm4FmMnabuanBa1Dr8zfyykf338axgLCaa8uDLjrn7FCTP8PrUu5z11rffBYYjyG4jmeZ2mj58a4stJ4p91c8b7b16ff73897253f0550f858fa00",
    "sipId": "598905",
    "domElement": "myZadarmaCallmeWidget10822"
  }, {
    "shape": "square",
    "language": "ru",
    "width": "0",
    "dtmf": false,
    "font": "'Trebuchet MS','Helvetica CY',sans-serif",
    "color_call": "rgb(255, 255, 255)",
    "color_bg_call": "rgb(1,76,122)",
    "color_border_call": "rgb(83,164,214)",
    "color_connection": "rgb(255, 255, 255)",
    "color_bg_connection": "rgb(33, 211, 166)",
    "color_border_connection": "rgb(144, 233, 211)",
    "color_calling": "rgb(255, 255, 255)",
    "color_border_calling": "rgb(255, 218, 128)",
    "color_bg_calling": "rgb(255, 181, 0)",
    "color_ended": "rgb(255, 255, 255)",
    "color_bg_ended": "rgb(164,164,164)",
    "color_border_ended": "rgb(210, 210, 210)"
  });
}

if (window.addEventListener) {
  window.addEventListener('load', myZadarmaCallmeWidgetFn10822, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', myZadarmaCallmeWidgetFn10822);
}
