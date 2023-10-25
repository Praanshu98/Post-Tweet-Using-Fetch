document.addEventListener("DOMContentLoaded", function () {
    const tweetForm = document.getElementById("tweetForm");
    const tweetText = document.getElementById("tweetText");
    const responseDiv = document.getElementById("response");

    tweetForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const tweet = tweetText.value;

        // Make an HTTP POST request to the backend
        fetch("https://one00x-data-analysis.onrender.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ post: { content: tweet } }),
        })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json(); // Parse response as JSON
                } else {
                    console.log();
                    throw new Error(`status ${response.status}`); // Handle failure
                }
            })
            .then((data) => {
                // Handle successful tweet post
                console.log(data);
                responseDiv.innerText = `Tweet posted successfully! Tweet ID: ${data.id}`;
            })
            .catch((error) => {
                // Handle error
                console.log(error);
                responseDiv.innerText = `Error while posting tweet: ${error.message}`;
            });
    });
});
