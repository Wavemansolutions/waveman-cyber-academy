// Replace these placeholders with your actual Selar course links.
// For direct checkout, Selar supports:
// https://selar.com/product-code?add_to_cart=1&email=&fullname=&mobile=
const COURSE_LINKS = {
  ceh: "https://selar.com/REPLACE-WITH-CEH-LINK",
  soc: "https://selar.com/REPLACE-WITH-SOC-LINK",
  noc: "https://selar.com/REPLACE-WITH-NOC-LINK",
  ai:  "https://selar.com/REPLACE-WITH-AI-LINK"
};

const toast = document.querySelector(".toast");
function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

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
  menu.setAttribute("aria-expanded", open);
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
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll("video").forEach(video => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach(other => {
      if (other !== video) other.pause();
    });
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();