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

        button {
            width: fit-content;
            margin: 3px 5px;
        }

        button a {
            font-size: 13px;
            border-radius: 4px;
        }

        .container {
            width: auto;
            padding: 30px;
        }

        .source-code {
            width: 200px;
            font-size: 20px;
        }

        @media (max-width: 768px) {
            button a {
                font-size: 20px;
            }

            .container {
                width: fit-content;
            }

            .source-code {
                width: 100%;
            }    

            button {
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
            <li><kbd>GET Search or Filter for Comments</kbd> => <samp>This endpoint uses req.query, filter using id, postId, body, name, or email</samp> [method: <em>GET</em>] => 
                <button><a target="_blank" href="/filtered-comments?postId=1">/filtered-comments?postId=1</a></button>
                <button><a target="_blank" href="/filtered-comments?id=1">/filtered-comments?id=1</a></button>
                <button><a target="_blank" href="/filtered-comments?name=lorem">/filtered-comments?name=lorem</a></button>
                <button><a target="_blank" href="/filtered-comments?email=Nikita">/filtered-comments?email=Nikita</a></button>
                <button><a target="_blank" href="/filtered-comments?body=ipsum">/filtered-comments?body=ipsum</a></button>
            </li>
            <br/>
            <li><kbd>GET All Comments</kbd> => <samp>[method: <em>GET</em>]</samp> => <button><a target="_blank" href="/comments">/comments<a></button></li>
            <br/>
            <li><kbd>GET All Posts</kbd> => <samp>[method: <em>GET</em>]</samp> => <button><a target="_blank" href="/posts">/posts<a></button></li>
            <br/>
            <li><kbd>GET Post with Specific ID</kbd> => <samp>where :id type is int</samp> [method: <em>GET</em>] => <button><a target="_blank" href="/posts">/posts/:id<a></button></li>
        </ul>
        <br/>
        <button class="source-code"><a target="_blank" href="https://github.com/rubanero14/node-practice-rest-api">Source Code<a></button>
    </div>
`;

module.exports = homeView;
