"use strict";
const postsUl = document.getElementById("posts");
if (!postsUl)
    throw new Error("#posts element not found");
const countEl = document.getElementById("count");
if (!countEl)
    throw new Error("#count element not found");
const statusEl = document.querySelector("#status");
const btnLoad = document.getElementById("btn-load");
const form = document.querySelector("#create-form");
const inputTitle = document.querySelector("#title");
const inputBody = document.querySelector("#body");
const createStatusEl = document.querySelector("#create-status");
const fetchData = async (url) => {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error(`http ${res.status}`);
    return res.json();
};
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok)
        throw new Error(`http ${res.status}`);
    return res.json();
};
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = inputTitle.value.trim();
    const body = inputBody.value.trim();
    if (!title || !body)
        return;
    const newItem = { title, body };
    postsState = [newItem, ...postsState];
    renderPosts(postsState);
    createStatusEl.textContent = "Submiting...";
    try {
        const created = await postData("https://jsonplaceholder.typicode.com/posts", newItem);
        console.log("created", created);
        renderPosts(postsState);
        createStatusEl.textContent = "submit successfully";
        createStatusEl.className = "status ok";
        inputTitle.value = "";
        inputBody.value = "";
        inputTitle.focus();
    }
    catch (error) {
        postsState = postsState.filter((p) => p !== newItem);
        createStatusEl.textContent = "Submit failed";
        createStatusEl.className = "status error";
    }
});
const renderPosts = (posts) => {
    postsUl.innerHTML = posts
        .map((p) => {
        var _a;
        return `
    <li>
        <b>${p.title}</b> (#${(_a = p.id) !== null && _a !== void 0 ? _a : "new"})<br/>
        ${p.body}
    </li>
    `;
    })
        .join("");
    countEl.textContent = String(posts.length);
};
let postsState = [];
btnLoad === null || btnLoad === void 0 ? void 0 : btnLoad.addEventListener("click", async () => {
    statusEl.textContent = "Loading...";
    statusEl.className = "status";
    try {
        const all = await fetchData("https://jsonplaceholder.typicode.com/posts");
        postsState = all.slice(0, 5);
        renderPosts(postsState);
        statusEl.textContent = "Load successfully";
        statusEl.className = "status ok";
    }
    catch (error) {
        statusEl.textContent = `error: ${error.message}`;
        statusEl.className = `statue error`;
    }
});
