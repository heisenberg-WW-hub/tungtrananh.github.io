# Why I Built My Own Blog From Scratch

Hello world! Welcome to my new personal website and blog. 

As a Software Engineer and Researcher, I spend a lot of time working with complex systems, machine learning models, and heavy frameworks. However, when it came to building my own personal space on the internet, I wanted something different.

## The Choice of Vanilla Technologies

Instead of jumping to Next.js, React, or Astro, I decided to build this site using pure **Vanilla HTML, CSS, and JavaScript**.

Here's why:
1. **Simplicity:** No `npm install`, no build steps, no complex configuration files.
2. **Performance:** Vanilla JS and CSS are incredibly fast. The browser parses them natively without any overhead.
3. **Control:** I have 100% control over every pixel and behavior.

### How it Works

The blog system is actually very simple. I have a `posts.json` file that acts as my database:

```json
[
  {
    "id": "hello-world",
    "title": "Welcome to my new personal blog",
    "date": "May 02, 2026"
  }
]
```

When you click on a post, the JavaScript simply fetches the corresponding Markdown file from the `content/` folder and renders it using `marked.js`!

```javascript
// Fetching and rendering markdown
const contentResponse = await fetch(\`content/\${postId}.md\`);
const markdownContent = await contentResponse.text();
document.getElementById("markdown-body").innerHTML = marked.parse(markdownContent);
```

## What's Next?

I will be using this space to write about:
- Natural Language Processing (NLP)
- My research on Continual Learning
- Software Engineering best practices
- Side projects

Thanks for visiting! Feel free to connect with me on GitHub or LinkedIn.
