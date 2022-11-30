const Constants = require("../util");

const styles = `
    span {
        display: flex;
    }
    pre {
        margin: 0 5px;
        color: red;
    }
`;

const contents = `
    <span>Hey send some req queries on the url, ie: <pre>?body=ipsum</pre> or <pre>?postId=3</pre> to filter or search comments with word ipsum or postId or other variables</span>
    <br />
    Please refer documentation for more details on <a href="/">here<a>
`;

const errorView = Constants.htmlMarkup("Error", styles, contents);

module.exports = errorView;
