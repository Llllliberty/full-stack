// 定义 Post 接口，id/userId 可选，title/body 必填。
type Post = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

// 读取postsUl
const postsUl = document.getElementById("posts");
// 若不存在立即抛错
if (!postsUl) throw new Error("#posts element not found");
// <span id="count">
const countEl = document.getElementById("count");
if (!countEl) throw new Error("#count element not found");
const statusEl = document.querySelector("#status") as HTMLUListElement;
const btnLoad = document.getElementById("btn-load") as HTMLButtonElement;
const form = document.querySelector("#create-form") as HTMLFormElement;
const inputTitle = document.querySelector("#title") as HTMLInputElement;
const inputBody = document.querySelector("#body") as HTMLTextAreaElement;
const createStatusEl = document.querySelector("#create-status") as HTMLElement;

const fetchData = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`http ${res.status}`);
  return res.json();
};

const postData = async <T>(url: string, data: Post): Promise<T> => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`http ${res.status}`);
  return res.json();
};

// 给 <form> 添加 submit 监听
form.addEventListener("submit", async (e) => {
  // 阻止浏览器默认提交
  e.preventDefault();
  // 读取、去首尾空格后的标题和正文
  const title = inputTitle.value.trim();
  const body = inputBody.value.trim();
  // 任何一项为空就直接退出
  if (!title || !body) return;
  // 按 Post 类型包装
  const newItem: Post = { title, body };
  // 将newItem插入postsState开头
  postsState = [newItem, ...postsState];
  // 用最新的 postsState 重新渲染列表
  renderPosts(postsState);
  createStatusEl.textContent = "Submiting...";
  try {
    const created = await postData<Post>(
      "https://jsonplaceholder.typicode.com/posts",
      newItem
    );
    console.log("created", created);
    renderPosts(postsState);
    createStatusEl.textContent = "submit successfully";
    createStatusEl.className = "status ok";
    // 清空输入框并把焦点回到标题，方便继续输入。
    inputTitle.value = "";
    inputBody.value = "";
    inputTitle.focus();
  } catch (error) {
    postsState = postsState.filter((p) => p !== newItem);
    createStatusEl.textContent = "Submit failed";
    createStatusEl.className = "status error";
  }
});

const renderPosts = (posts: Post[]) => {
  postsUl.innerHTML = posts
    .map(
      (p) => `
    <li>
        <b>${p.title}</b> (#${p.id ?? "new"})<br/>
        ${p.body}
    </li>
    `
    )
    .join("");
  countEl.textContent = String(posts.length);
};
let postsState: Post[] = [];

btnLoad?.addEventListener("click", async () => {
  statusEl.textContent = "Loading...";
  statusEl.className = "status";
  try {
    const all = await fetchData<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // 只保留前 5 条作为展示。
    postsState = all.slice(0, 5);
    renderPosts(postsState);
    statusEl.textContent = "Load successfully";
    statusEl.className = "status ok";
  } catch (error: any) {
    statusEl.textContent = `error: ${error.message}`;
    statusEl.className = `statue error`;
  }
});
