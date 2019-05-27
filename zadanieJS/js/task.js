const dataUrl = "https://www.reddit.com/r/funny.json";
const target = document.querySelector(".task__container");
let data = [];

const getDataPromise = () =>
  fetch(dataUrl)
    .then(response => response.json())
    .then(
      posts => {
        data = {
          posts: posts.data.children.map(post => ({
            title: post.data.title,
            upvotes: post.data.ups,
            score: post.data.score,
            num_comments: post.data.num_comments,
            created: post.data.created
          })),
          count() {
            return this.posts.length;
          }
        };
        displayDatainTable(data);
      },
      error => console.log(error)
    );

getDataPromise();

const displayDatainTable = (data, type) => {
  const dataToSort = data.posts.slice();
  const rowNode = createNode("row");
  ["Title", "Upvotes", "Score", "Comments", "Created"].forEach(element => {
    const cellNode = createNode("cell");
    cellNode.classList.add("head");
    const text = document.createTextNode(element);
    cellNode.appendChild(text);
    rowNode.appendChild(cellNode);
  });
  target.appendChild(rowNode);

  if (type==="cr") {
    dataToSort.sort((a, b) => (new Date(a[type])) > (new Date(b[type])));
  } else {
    dataToSort.sort((a, b) => a[type] - b[type]);
  }
  const sortedData = dataToSort.map(post=>({
    ...post,
    created:changeNumberToDate(post.created)
  }));

  sortedData.map(post => {
    const rowNode = createNode("row");
    Object.values(post).forEach(element => {
      const cellNode = createNode("cell");
      const text = document.createTextNode(element);
      cellNode.appendChild(text);
      rowNode.appendChild(cellNode);
    });
    target.appendChild(rowNode);
  });
};

const createNode = className => {
  const node = document.createElement("div");
  node.classList.add(className);
  return node;
};

const changeNumberToDate = x => {
  const newDate = new Date(x);
  const day = newDate.getDate();
  const month =
    newDate.getMonth() + 1 <= 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours() <= 10 ? "0" + (newDate.getHours() ): newDate.getHours();
  const minutes = newDate.getMinutes()<= 10 ? "0" + (newDate.getMinutes() ): newDate.getMinutes();;
  const formatDate = `${day}-${month}-${year}
  ${hours}:${minutes}`;
  return formatDate;
};

const handleSort = () => {
  document.addEventListener("click", clickedFilter);
};

const clickedFilter = () => {
  target.innerHTML = '';
  const type = event.target.name;
  displayDatainTable(data, type);
}