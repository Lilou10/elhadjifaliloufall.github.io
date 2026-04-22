const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];
const revealItems = document.querySelectorAll(".reveal");
const toggle = document.querySelector(".theme-toggle");
const form = document.querySelector(".contact-form");
const storedTheme = localStorage.getItem("portfolio-theme");

if (storedTheme) {
  document.body.dataset.theme = storedTheme;
}

const updateActiveLink = () => {
  const offset = window.scrollY + window.innerHeight * 0.25;

  let currentSection = sections[0]?.id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${currentSection}`;
    link.classList.toggle("is-active", isCurrent);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

toggle?.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
});

form?.addEventListener("submit", (event) => {
  const button = form.querySelector("button");

  if (!button) {
    return;
  }

  const initialText = button.textContent;
  button.textContent = "Ouverture de votre messagerie...";
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = initialText;
    button.disabled = false;
  }, 1800);
});

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("load", updateActiveLink);
