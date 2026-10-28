// =========================================
// AICHA MOHAMMED — PORTFOLIO INTERACTIONS
// =========================================

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const navigationLinks = document.querySelectorAll(".nav-link");
const pageSections = document.querySelectorAll("main section[id]");

// Open the mobile sidebar
function openSidebar() {
  sidebar.classList.add("is-open");
  sidebarOverlay.classList.add("is-visible");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

// Close the mobile sidebar
function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebarOverlay.classList.remove("is-visible");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

// Connect the menu buttons
menuToggle.addEventListener("click", openSidebar);
menuClose.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// Close the sidebar after selecting a navigation link
navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeSidebar();
  });
});

// Close the sidebar with the Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSidebar();
  }
});

// Highlight the navigation link for the visible section
function updateActiveLink() {
  let currentSection = "home";

  pageSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop <= 180) {
      currentSection = section.id;
    }
  });

  navigationLinks.forEach((link) => {
    const sectionId = link.getAttribute("href").slice(1);
    const isActive = sectionId === currentSection;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveLink, {
  passive: true
});

// Set the current year in the footer
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Reset the mobile menu when the screen becomes wider
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeSidebar();
  }
});

// Set the correct active link on initial page load
updateActiveLink();