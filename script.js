// script.js - Fetching GitHub repositories
document.addEventListener("DOMContentLoaded", () => {
  const repoList = document.getElementById("repo-list");
  
  if (!repoList) return; // Only run on pages that have the repo-list element

  // Lấy danh sách repo GitHub của bạn
  // Thay 'tungtran' bằng username thật của bạn
  const githubUsername = "tungtran";
  
  fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      repoList.innerHTML = "";
      
      if (data.length === 0) {
        repoList.innerHTML = "<p>No public repositories found.</p>";
        return;
      }
      
      data.forEach(repo => {
        // Skip forks if you only want to show original projects
        if(repo.fork) return;
        
        const card = document.createElement("div");
        card.className = "card";
        
        // Define language color roughly
        const langColor = repo.language === 'JavaScript' ? '#f1e05a' : 
                          repo.language === 'Python' ? '#3572A5' : 
                          repo.language === 'TypeScript' ? '#3178c6' : 
                          repo.language === 'HTML' ? '#e34c26' : '#8b949e';
                          
        card.innerHTML = `
          <div class="card-title">
            <i class="fas fa-book"></i>
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </div>
          <p class="card-desc">${repo.description || "No description provided."}</p>
          <div class="card-footer">
            <div class="card-stats">
              ${repo.language ? `<span class="stat"><span style="width: 10px; height: 10px; border-radius: 50%; background-color: ${langColor}; display: inline-block;"></span> ${repo.language}</span>` : ''}
              <span class="stat"><i class="far fa-star"></i> ${repo.stargazers_count}</span>
              <span class="stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            </div>
          </div>
        `;
        repoList.appendChild(card);
      });
    })
    .catch(error => {
      repoList.innerHTML = `<p style="color: #ff7b72;">Lỗi khi tải dữ liệu từ GitHub: ${error.message}</p>`;
      console.error("Lỗi:", error);
    });
});
