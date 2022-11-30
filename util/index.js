class Constants {
  static BASE_URL = "https://jsonplaceholder.typicode.com/";

  static PROD_ORIGIN = "https://rubanero14.github.io";

  static DEV_ORIGIN = "http://localhost:3000";

  static headerJsonConfig = {
    "Accept-Encoding": "application/json",
  };

  static htmlMarkup(title, styles, contents) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <style>${styles}</style>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${title}</title>
      </head>
      <body>
          ${contents}
      </body>
      </html>
    `;
  }
}

module.exports = Constants;
