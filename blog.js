// blog.js - Logic for fetching and rendering blog posts

// Configure marked to use highlight.js
if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') {
  marked.setOptions({
    highlight: function(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  });
}

// Function to load the list of posts in blog.html
async function loadBlogList() {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return; // Only run on blog.html

  try {
    const response = await fetch('posts.json');
    if (!response.ok) throw new Error('Could not load posts.json');
    
    const posts = await response.json();
    blogList.innerHTML = "";
    
    if (posts.length === 0) {
      blogList.innerHTML = "<p>Chưa có bài viết nào.</p>";
      return;
    }

    posts.forEach(post => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.flexDirection = "row";
      card.style.justifyContent = "space-between";
      card.style.alignItems = "center";
      
      card.innerHTML = `
        <div style="flex: 1;">
          <div class="card-title" style="margin-bottom: 0.2rem;">
            <a href="post.html?id=${post.id}">${post.title}</a>
          </div>
          <p class="card-desc" style="margin-bottom: 0.5rem;">${post.description}</p>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">
            <i class="far fa-calendar-alt"></i> ${post.date} &nbsp;|&nbsp; 
            <i class="fas fa-tags"></i> ${post.tags.join(', ')}
          </div>
        </div>
        <a href="post.html?id=${post.id}" style="padding: 0.5rem 1rem; background: var(--surface-hover); border-radius: 6px; border: 1px solid var(--border-color); color: var(--text-primary);">Đọc <i class="fas fa-arrow-right" style="font-size: 0.8rem; margin-left: 0.3rem;"></i></a>
      `;
      blogList.appendChild(card);
    });
  } catch (error) {
    blogList.innerHTML = `<p style="color: #ff7b72;">Lỗi tải bài viết: ${error.message}</p>`;
  }
}

// Function to load a single post in post.html
async function loadSinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  
  const postHeader = document.getElementById("post-header");
  const postTitle = document.getElementById("post-title");
  const markdownBody = document.getElementById("markdown-body");
  
  if (!postHeader || !postTitle || !markdownBody) return;
  
  if (!postId) {
    postHeader.innerHTML = "<h1>Không tìm thấy bài viết</h1>";
    return;
  }

  try {
    // 1. Fetch metadata from posts.json to get title, date, etc.
    const metaResponse = await fetch('posts.json');
    const posts = await metaResponse.json();
    const postMeta = posts.find(p => p.id === postId);
    
    if (postMeta) {
      document.title = `${postMeta.title} | Tùng Trần`;
      postTitle.innerText = postMeta.title;
      document.getElementById("post-meta").innerHTML = `
        <i class="far fa-calendar-alt"></i> ${postMeta.date} &nbsp; | &nbsp; 
        <i class="fas fa-tags"></i> ${postMeta.tags.join(', ')}
      `;
    } else {
      postTitle.innerText = "Bài viết";
    }

    // 2. Fetch markdown content
    const contentResponse = await fetch(`content/${postId}.md`);
    
    if (!contentResponse.ok) throw new Error('Không tìm thấy file Markdown');
    
    const markdownContent = await contentResponse.text();
    
    // 3. Render markdown
    const htmlContent = marked.parse(markdownContent);
    markdownBody.innerHTML = htmlContent;
    
  } catch (error) {
    postHeader.innerHTML = `<h1>Lỗi tải bài viết</h1>`;
    markdownBody.innerHTML = `<p style="color: #ff7b72;">${error.message}</p>`;
  }
}

// Initialize blog list if on blog.html
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("blog-list")) {
    loadBlogList();
  }
});
