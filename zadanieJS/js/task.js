const dataUrl = "https://www.reddit.com/r/funny.json";
const getDataPromise = () =>
  fetch(dataUrl)
    .then(response => response.json())
    .then(
      posts => {
        const data = {
          posts: posts.data.children.map(post => ({
            title: post.data.title,
            upvotes: post.data.ups,
            score:post.data.score,
            num_comments:post.data.num_comments,
            created:post.data.created
          })),
          count() { 
              return this.posts.length
          }
        };
        console.log(posts.data.children);
        console.log(data);
        console.log(data.count());

      },
      error => console.log(error)
    );

getDataPromise();
