const translations = {
  // Navbar
  "nav_resume": { en: "Resume", vi: "Hồ sơ" },
  "nav_blog": { en: "Blog", vi: "Bài viết" },
  
  // Hero Section
  "hero_greeting": { en: "Hi, I'm Tung Tran", vi: "Xin chào, tôi là Tùng Trần" },
  "hero_role": { en: "Software Engineer | NLP & Continual Learning Researcher", vi: "Kỹ sư phần mềm | Nghiên cứu sinh NLP & Continual Learning" },
  
  // Section Titles
  "title_about": { en: "About Me", vi: "Về Bản Thân" },
  "title_skills": { en: "Skills", vi: "Kỹ Năng" },
  "title_experience": { en: "Experience", vi: "Kinh Nghiệm" },
  "title_projects": { en: "Open Source Projects", vi: "Dự Án Mã Nguồn Mở" },
  
  // About text
  "about_text": { 
    en: "I am a passionate software engineer and researcher with a strong focus on Natural Language Processing (NLP) and Continual Learning. I enjoy solving complex problems, building scalable systems, and writing about my journey in tech.", 
    vi: "Tôi là một kỹ sư phần mềm và nhà nghiên cứu đam mê AI, đặc biệt tập trung vào Xử lý Ngôn ngữ Tự nhiên (NLP) và Học liên tục (Continual Learning). Tôi thích giải quyết các bài toán khó, xây dựng hệ thống mở rộng và viết blog chia sẻ về hành trình công nghệ của mình." 
  },
  
  // Experience 1
  "exp1_date": { en: "2024 - Present", vi: "2024 - Hiện tại" },
  "exp1_title": { en: "AI Researcher", vi: "Nghiên cứu viên AI" },
  "exp1_desc": { en: "Researching and implementing state-of-the-art Continual Learning strategies and Large Language Models. Analyzing 'Learn or Recall' and 'Spurious Forgetting' papers to improve model performance without catastrophic forgetting.", vi: "Nghiên cứu và triển khai các chiến lược Học liên tục (Continual Learning) và Mô hình ngôn ngữ lớn (LLM). Phân tích các bài báo 'Learn or Recall' và 'Spurious Forgetting' để cải thiện mô hình mà không bị quên kiến thức cũ." },
  
  // Experience 2
  "exp2_date": { en: "2022 - 2024", vi: "2022 - 2024" },
  "exp2_title": { en: "Software Engineer", vi: "Kỹ sư phần mềm" },
  "exp2_desc": { en: "Developed and maintained full-stack web applications, built APIs, and optimized databases for high-traffic platforms.", vi: "Phát triển và bảo trì các ứng dụng web full-stack, xây dựng API và tối ưu hóa cơ sở dữ liệu cho các hệ thống có lượng truy cập cao." },
  
  // Projects text
  "loading_projects": { en: "Loading projects from GitHub...", vi: "Đang tải các dự án từ GitHub..." },
  "no_projects": { en: "No public repositories found.", vi: "Không tìm thấy kho lưu trữ công khai." },
  "error_projects": { en: "Error loading data from GitHub", vi: "Lỗi khi tải dữ liệu từ GitHub" },
  
  // Footer
  "footer_text": { en: "© 2025 Tung Tran. Built with pure HTML/CSS/JS.", vi: "© 2025 Tùng Trần. Được xây dựng thuần bằng HTML/CSS/JS." },
  
  // Blog List Page
  "blog_hero_title": { en: "Writing", vi: "Bài Viết" },
  "blog_hero_desc": { en: "Thoughts on AI, Software Engineering, and Continual Learning.", vi: "Ghi chép về AI, Kỹ thuật Phần mềm và Học liên tục." },
  "loading_posts": { en: "Loading posts...", vi: "Đang tải bài viết..." },
  "no_posts": { en: "No posts available yet.", vi: "Chưa có bài viết nào." },
  "read_btn": { en: "Read", vi: "Đọc" },
  
  // Post Page
  "back_blog": { en: "Back to Blog", vi: "Quay lại Blog" },
  "post_loading": { en: "Loading...", vi: "Đang tải..." },
  "post_not_found": { en: "Post not found", vi: "Không tìm thấy bài viết" },
  "post_error": { en: "Error Loading Post", vi: "Lỗi tải bài viết" }
};

// Default language
let currentLang = localStorage.getItem('site_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('site_lang', lang);
  updateDOM();
  
  // Update toggle button appearance
  const btnEn = document.getElementById('btn-en');
  const btnVi = document.getElementById('btn-vi');
  
  if (btnEn && btnVi) {
    if (lang === 'en') {
      btnEn.classList.add('active-lang');
      btnVi.classList.remove('active-lang');
    } else {
      btnVi.classList.add('active-lang');
      btnEn.classList.remove('active-lang');
    }
  }
  
  // Dispatch custom event for dynamic content (like JS fetching)
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function updateDOM() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][currentLang]) {
      // If it's HTML, we use innerHTML, but text is safer. 
      // We assume simple text for most, except footer which has &copy;
      if (key === 'footer_text') {
         el.innerHTML = translations[key][currentLang];
      } else {
         el.textContent = translations[key][currentLang];
      }
    }
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  
  const btnEn = document.getElementById('btn-en');
  const btnVi = document.getElementById('btn-vi');
  
  if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
  if (btnVi) btnVi.addEventListener('click', () => setLanguage('vi'));
});
