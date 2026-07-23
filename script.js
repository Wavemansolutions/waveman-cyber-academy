// ============================================================
// 1) REPLACE THESE WITH YOUR REAL SELAR COURSE LINKS
// ============================================================
const COURSE_LINKS = {
  ceh: "https://selar.com/17t1043p18",
  soc: "https://selar.com/REPLACE-WITH-SOC-LINK",
  noc: "https://selar.com/REPLACE-WITH-NOC-LINK",
  ai:  "https://selar.com/REPLACE-WITH-AI-LINK"
};

// ============================================================
// 2) REPLACE THESE WITH GOOGLE DRIVE VIDEO SHARE LINKS OR FILE IDs
//
// Accepted examples:
// https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view?usp=sharing
// 1AbCdEfGhIjKlMnOp
//
// In Google Drive, set each video to: Anyone with the link → Viewer.
// ============================================================
const DRIVE_VIDEOS = {
  overview: "REPLACE-WITH-OVERVIEW-GOOGLE-DRIVE-LINK",
  ceh: "REPLACE-WITH-CEH-GOOGLE-DRIVE-LINK",
  soc: "REPLACE-WITH-SOC-GOOGLE-DRIVE-LINK",
  noc: "REPLACE-WITH-NOC-GOOGLE-DRIVE-LINK",
  ai: "REPLACE-WITH-AI-GOOGLE-DRIVE-LINK"
};

const toast = document.querySelector(".toast");
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 3600);
}

function getDriveFileId(value) {
  if (!value || value.includes("REPLACE-WITH")) return "";
  const trimmed = value.trim();

  // A raw Drive file ID.
  if (/^[a-zA-Z0-9_-]{15,}$/.test(trimmed)) return trimmed;

  // Common Google Drive sharing URL formats.
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  return "";
}

function stopOtherDriveVideos(current) {
  document.querySelectorAll(".drive-video.is-playing").forEach(container => {
    if (container === current) return;
    const poster = container.dataset.poster;
    const alt = container.querySelector("iframe")?.title || "Course introduction video";
    container.classList.remove("is-playing");
    container.innerHTML = `
      <img src="${poster}" alt="${alt}">
      <button class="video-play" type="button" aria-label="Play introduction video">
        <span>▶</span><b>Watch intro</b>
      </button>`;
  });
}

function loadDriveVideo(container) {
  const key = container.dataset.video;
  const fileId = getDriveFileId(DRIVE_VIDEOS[key]);

  if (!fileId) {
    container.classList.add("video-missing");
    notify(`Add the ${key.toUpperCase()} Google Drive video link inside script.js.`);
    return;
  }

  stopOtherDriveVideos(container);
  container.classList.remove("video-missing");
  container.classList.add("is-playing");

  const iframe = document.createElement("iframe");
  iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
  iframe.title = `${key.toUpperCase()} course introduction video`;
  iframe.allow = "autoplay; fullscreen";
  iframe.allowFullscreen = true;
  iframe.loading = "eager";
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  container.replaceChildren(iframe);
}

// Event delegation keeps the play buttons working when posters are rebuilt.
document.addEventListener("click", event => {
  const playButton = event.target.closest(".video-play");
  if (!playButton) return;
  const container = playButton.closest(".drive-video");
  if (container) loadDriveVideo(container);
});

document.querySelectorAll(".drive-video").forEach(container => {
  const key = container.dataset.video;
  if (!getDriveFileId(DRIVE_VIDEOS[key])) container.classList.add("video-missing");
});

document.querySelectorAll("[data-course]").forEach(button => {
  const key = button.dataset.course;
  const url = COURSE_LINKS[key];
  if (url && !url.includes("REPLACE-WITH")) {
    button.href = url;
    button.target = "_blank";
    button.rel = "noopener";
  } else {
    button.classList.add("missing");
    button.addEventListener("click", event => {
      event.preventDefault();
      notify(`Add your ${key.toUpperCase()} Selar link inside script.js.`);
    });
  }
});

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "✕" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menu.setAttribute("aria-expanded", "false");
  menu.textContent = "☰";
}));

const header = document.querySelector(".header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 10));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelector("#year").textContent = new Date().getFullYear();
