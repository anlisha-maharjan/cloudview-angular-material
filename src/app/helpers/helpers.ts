export class Helpers {
  static parseMessage(message) {
    let text = "";
    text += "<ul class='default-listing'>";
    if (typeof message == "object") {
      for (const key in message) {
        if (Array.isArray(message[key])) {
          message[key].forEach(elem => {
            text += "<li>" + elem + "</li>";
          });
        } else if (typeof message[key] == "string") {
          text += "<li>" + message[key] + "</li>";
        } else {
          text = "<li>" + JSON.stringify(message[key]) + "</li>";
        }
      }
    }else if (typeof message == "string") {
      text += "<li>" + message + "</li>";
    } else {
      text += "<li>" + message + "</li>";
    }
    text += "</ul>";
    return text;
  }
}
