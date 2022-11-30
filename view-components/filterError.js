const Constants = require("../util");

const styles = `
    h1, h3 {
        display: flow-root;
    }
    span {
        color: red;
    }
`;

const contents = `
    <h1><span>Attention</span>&nbsp;: req.query such as '<span>?body=ipsum</span>' or '<span>?postId=3</span>' required on the url to filter or search comments</h1>
    <h3>Please refer documentation for more details on <a href="/">here<a>!</h3>
`;

const filterError = Constants.htmlMarkup("Filter Error", styles, contents);

module.exports = filterError;
