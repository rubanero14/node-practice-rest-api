const Constants = require("../util");

const styles = `
    a {
        text-decoration: none;
        display: block;
        margin: 0 5px;
    }

    h1 {
        display: flow-root;
    }

    h1 span {
        color: red;
    }

    button a {
        font-size: 13px;
        border-radius: 4px;
    }

    .docs-page {
        width: 200px;
        font-size: 20px;
    }

    @media (max-width: 768px) {
        button a {
            font-size: 20px;
        }

        .docs-page {
            width: 100%;
        }    
    }
`;

const contents = `
    <h1><span>404</span> &nbsp;: Page not found!</h1>
    <button class="docs-page"><a href="/">Back to Docs<a></button>
`;

const pageNotFoundView = Constants.htmlMarkup(
  "404: Page not found!",
  styles,
  contents
);

module.exports = pageNotFoundView;
