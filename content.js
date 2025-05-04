// Function to get the username from the page
function getUsername() {
  const metaTag = document.querySelector('meta[name="user-login"]');
  return metaTag ? metaTag.content : null;
}

// Function to create repository element
function createRepoElement(repo) {
  const repoDiv = document.createElement("div");
  repoDiv.className = "repository-card";

  repoDiv.innerHTML = `
        <h3>
            <a href="${repo.html_url}" class="repo-name">${repo.name}</a>
            ${repo.private ? '<span class="private-badge">Private</span>' : ""}
        </h3>
        <p class="repo-description">${repo.description || ""}</p>
        <div class="repo-stats">
            <span class="language">
                ${
                  repo.language
                    ? `<span class="repo-language-color" style="background-color: ${getLanguageColor(
                        repo.language
                      )}"></span> ${repo.language}`
                    : ""
                }
            </span>
            <span class="stars">⭐ ${repo.stargazers_count}</span>
            <span class="forks">🍴 ${repo.forks_count}</span>
            <span class="updated">Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
    `;

  return repoDiv;
}

// Function to get language color (simplified version)
function getLanguageColor(language) {
  const colors = {
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    TypeScript: "#2b7489",
    Ruby: "#701516",
    // Add more languages as needed
  };
  return colors[language] || "#858585";
}

// Function to fetch repositories
async function fetchRepositories(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

// Main function to modify the homepage
async function modifyHomepage() {
  const username = getUsername();
  if (!username) return;

  // Get the main content area
  const mainContent = document.querySelector("main");
  if (!mainContent) return;

  // Clear existing content
  mainContent.innerHTML = "";

  // Create repositories container
  const reposContainer = document.createElement("div");
  reposContainer.className = "repositories-container";
  mainContent.appendChild(reposContainer);

  // Add loading state
  reposContainer.innerHTML = '<div class="loading">Loading repositories...</div>';

  // Fetch and display repositories
  const repos = await fetchRepositories(username);
  reposContainer.innerHTML = "";

  if (repos.length === 0) {
    reposContainer.innerHTML = '<div class="no-repos">No repositories found</div>';
    return;
  }

  repos.forEach((repo) => {
    reposContainer.appendChild(createRepoElement(repo));
  });
}

// Run the modification when the page loads
if (window.location.pathname === "/") {
  modifyHomepage();
}
