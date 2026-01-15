async function loadApps() {
  const res = await fetch("./apps.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load apps.json");
  const json = await res.json();
  return json.apps || [];
}

function setYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

function createAppTile(app) {
  const a = document.createElement("a");
  a.className = "app";
  a.href = `./detail.html?app=${encodeURIComponent(app.id)}`;
  a.setAttribute("aria-label", `Open ${app.name} support page`);

  a.innerHTML = `
    <div class="icon">
      <img src="${app.icon}" alt="${app.name} icon" />
    </div>
    <div class="meta">
      <p class="name">${app.name}</p>
      <p class="desc">${app.tagline || ""}</p>
    </div>
  `;

  return a;
}

(async function init() {
  setYear();

  const apps = await loadApps();
  const grid = document.getElementById("appsGrid");
  grid.innerHTML = "";

  apps.forEach(app => grid.appendChild(createAppTile(app)));
})();
