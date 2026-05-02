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

// Ensure currentLang is available (it's defined in i18n.js)
if (typeof currentLang === 'undefined') {
  window.currentLang = localStorage.getItem('site_lang') || 'en';
}

// Handle dynamic re-rendering on language change
document.addEventListener('languageChanged', (e) => {
  window.currentLang = e.detail.lang;
  loadBlogList(); // Re-render the blog list if we're on blog.html
});

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
      blogList.innerHTML = `<p data-i18n="no_posts">${typeof translations !== 'undefined' ? translations['no_posts'][currentLang] : 'No posts available yet.'}</p>`;
      return;
    }

    posts.forEach(post => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.flexDirection = "row";
      card.style.justifyContent = "space-between";
      card.style.alignItems = "center";
      
      const title = post.title[currentLang] || post.title['en'] || post.title;
      const desc = post.description[currentLang] || post.description['en'] || post.description;
      const readText = typeof translations !== 'undefined' ? translations['read_btn'][currentLang] : 'Read';
      
      card.innerHTML = `
        <div style="flex: 1;">
          <div class="card-title" style="margin-bottom: 0.2rem;">
            <a href="post.html?id=${post.id}">${title}</a>
          </div>
          <p class="card-desc" style="margin-bottom: 0.5rem;">${desc}</p>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">
            <i class="far fa-calendar-alt"></i> ${post.date} &nbsp;|&nbsp; 
            <i class="fas fa-tags"></i> ${post.tags.join(', ')}
          </div>
        </div>
        <a href="post.html?id=${post.id}" style="padding: 0.5rem 1rem; background: var(--surface-hover); border-radius: 6px; border: 1px solid var(--border-color); color: var(--text-primary);">${readText} <i class="fas fa-arrow-right" style="font-size: 0.8rem; margin-left: 0.3rem;"></i></a>
      `;
      blogList.appendChild(card);
    });
  } catch (error) {
    blogList.innerHTML = `<p style="color: #ff7b72;">Error loading posts: ${error.message}</p>`;
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
    postHeader.innerHTML = `<h1 data-i18n="post_not_found">${typeof translations !== 'undefined' ? translations['post_not_found'][currentLang] : 'Post not found'}</h1>`;
    return;
  }

  try {
    // 1. Fetch metadata from posts.json to get title, date, etc.
    const metaResponse = await fetch('posts.json');
    const posts = await metaResponse.json();
    const postMeta = posts.find(p => p.id === postId);
    
    if (postMeta) {
      const title = postMeta.title[currentLang] || postMeta.title['en'] || postMeta.title;
      document.title = `${title} | Tung Tran`;
      postTitle.innerText = title;
      postTitle.removeAttribute("data-i18n"); // Remove loading i18n attribute
      document.getElementById("post-meta").innerHTML = `
        <i class="far fa-calendar-alt"></i> ${postMeta.date} &nbsp; | &nbsp; 
        <i class="fas fa-tags"></i> ${postMeta.tags.join(', ')}
      `;
    } else {
      postTitle.innerText = "Post Document";
    }

    // 2. Fetch markdown content based on language
    let contentResponse = await fetch(`content/${postId}.${currentLang}.md`);
    
    // Fallback to English if Vietnamese (or other) file is missing
    if (!contentResponse.ok && currentLang !== 'en') {
        contentResponse = await fetch(`content/${postId}.en.md`);
    }
    
    if (!contentResponse.ok) throw new Error('Markdown file not found');
    
    const markdownContent = await contentResponse.text();
    
    // 3. Render markdown
    const htmlContent = marked.parse(markdownContent);
    markdownBody.innerHTML = htmlContent;
    
  } catch (error) {
    postHeader.innerHTML = `<h1>${typeof translations !== 'undefined' ? translations['post_error'][currentLang] : 'Error Loading Post'}</h1>`;
    markdownBody.innerHTML = `<p style="color: #ff7b72;">${error.message}</p>`;
  }
}

// Initialize blog list if on blog.html
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("blog-list")) {
    loadBlogList();
  }
});
