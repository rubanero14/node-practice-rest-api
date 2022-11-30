const homeView = `
    <style>
        a {
            text-decoration: none;
            display: block;
            margin: 0 5px;
        }
        samp, a {
            font-size: 13px;
        }
        button a {
            font-size: 13px;
            border-radius: 4px;
        }
        .container {
            width: auto;
        }
        @media (max-width: 768px) {
            button a {
                font-size: 20px;
            }
            .container {
                width: 100%;
            }
        }
    </style>
    <div class="container">
        <h1>API Documentation<h1>
        <h3>List of Endpoints</h3>
        <ul>
            <li><kbd>GET Top Post</kbd> => <samp>[method: <em>GET</em>]</samp> => <button><a target="_blank" href="/top-posts">/top-posts<a></button></li>
            <br/>
            <li><kbd>GET Search or Filter for Comments</kbd> => <samp>This endpoint uses req.query, filter using id, postId, body, name, or email</samp> [method: <em>GET</em>] => <button><a target="_blank" href="/filtered-comments?body=ipsum">/filtered-comments?body=ipsum<a></button></li>
            <br/>
            <li><kbd>GET All Comments</kbd> => [method: <em>GET</em>] => <button><a target="_blank" href="/comments">/comments<a></button></li>
            <br/>
            <li><kbd>GET All Posts</kbd> => [method: <em>GET</em>] => <button><a target="_blank" href="/posts">/posts<a></button></li>
            <br/>
            <li><kbd>GET Post with Specific ID</kbd> => <samp>where :id type is int</samp> [method: <em>GET</em>] => <button><a target="_blank" href="/posts">/posts/:id<a></button></li>
        </ul>
        <button><a target="_blank" href="https://github.com/rubanero14/node-practice-rest-api">Source Code<a></button>
    </div>>
`;

module.exports = homeView;
