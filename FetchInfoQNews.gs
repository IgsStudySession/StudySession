function FetchInfoQNews() {
  var url = "https://www.infoq.com/feed?token=b74JK510uXQNsIJEb4qsSDjt6SQ1KpMA";
  var options = {
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() != 200) {
    Logger.log("Response failed!");
    return;
  }
  
  var xml = response.getContentText();
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');
  
  var attachments = [];
  var attachment = {
    fields: []
  };
  var range = getTimeRange(1);
  var entries = document.getRootElement().getChild('channel').getChildren('item');
  for (var i = 0; i < entries.length; i++) {
    var title = entries[i].getChild('title').getText();
    var link = entries[i].getChild('link').getText();
    var dateString = entries[i].getChild('pubDate').getText();
    var date = Date.parse(dateString) /1000;
    if ( date >= range.start && date < range.end) {
      attachment.fields.push(
        {
          title: title,
          value: "<"+link+"|LINK>",
          short: false,
        });
    }
  }
  
  attachments.push( attachment );
  SendToSlack( "InfoQ Daily News", attachments );
}

function SendToSlack(text, attachments) {
  var payload = {
    "text": text,
    "channel": "news",
    "attachments": attachments
  };
  
  var url = "https://hooks.slack.com/services/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";
  var options = {
    "method": "post",
    "muteHttpExceptions": true,
    "payload": JSON.stringify(payload)
  };

  var fetch = UrlFetchApp.fetch(url, options);
  if (fetch.getResponseCode() != 200) {
    Logger.log("Get file <" + url + "> failed. Code=" + fetch.getResponseCode());
    return;
  }

  return fetch.getResponseCode();
}

function getTimeRange( days ) {
  var parseDate = new Date(new Date().getTime() - 86400000 * days); // 86400000ms = 24hr * 60min * 60sec * 1000ms
  parseDate.setHours(0);
  parseDate.setMinutes(0);
  parseDate.setSeconds(0);
  parseDate.setMilliseconds(0);
  var startTime = parseDate.getTime() / 1000;
  var endTime = startTime + 86400;

  var monthString = (parseDate.getMonth()) > 9 ? (parseDate.getMonth() + 1) : "0" + (parseDate.getMonth() + 1);
  var dateString = (parseDate.getDate()) > 9 ? parseDate.getDate() : "0" + parseDate.getDate();
  var prefix = parseDate.getFullYear() + "-" + monthString + "-" + dateString;

  return {
    "start": startTime,
    "end": endTime,
    "date": prefix
  };
}

