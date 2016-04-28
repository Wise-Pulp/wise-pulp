import $ from 'jquery'

$(document).ajaxSend((event, jqxhr, settings) => {
  settings.url = 'http://0.0.0.0' + settings.url;
})