const fetch = require("node-fetch");

async function request(subreddit) {
    return await new Promise(
        async function(resolve, reject) {
            async function ExtractRedditUrl(body, tries) {
                if (tries >= 20) return reject({reason: "retry limit exceeded", message: "Failed to find a suitable post"});
                tries++;
                let post = body[Math.floor(Math.random() *body.length)].data;
                if ((/(\.jpg|\.png|\.gif|\.jpeg|\.mp4)$/ig).test(post.url)) {
                    resolve(post.url);
                } else await ExtractRedditUrl(body, tries);
            }

            let sortBy = ["best", "new", "top", "hot"], filter = sortBy[Math.floor(Math.random() *sortBy.length)];
            let url = `https://reddit.com/r/${subreddit}/${filter}.json?limit=50`;

            try {
                const response = await fetch(url);
                const body = await response.json();
                if (response.status !== 200) reject(body);
                await ExtractRedditUrl(body.data.children, 0);
            } catch (error) {
                reject(error);
            }
        }
    );
}

module.exports = request;