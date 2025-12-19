// script.js

document.addEventListener("DOMContentLoaded", () => {
  const fadeSections = document.querySelectorAll(".fade-section");
  const navLinks = document.querySelectorAll(".navbar a");
  const sectionTitles = document.querySelectorAll(".section-title");
  const allSections = document.querySelectorAll("section");

  const navbarHeight = document.querySelector(".navbar").offsetHeight;

  /* ==================================================
     FADE-IN OBSERVER
  ================================================== */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeSections.forEach((section) => observer.observe(section));

  /* ==================================================
     FUNCTION: ACTIVATE SECTION
  ================================================== */
  const activateSection = (targetId) => {
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    // Hide all sections and remove active
    allSections.forEach((s) => s.classList.remove("active"));
    targetSection.classList.add("active");

    // Update navbar links
    navLinks.forEach((link) =>
      link.classList.toggle(
        "active",
        link.getAttribute("href").replace("#", "") === targetId
      )
    );

    // Update section titles
    sectionTitles.forEach((title) =>
      title.classList.toggle(
        "active",
        title.dataset.target === targetId
      )
    );

    // Smooth scroll to section (offset for navbar)
    const topPosition = targetSection.offsetTop - navbarHeight + 10;
    window.scrollTo({ top: topPosition, behavior: "smooth" });
  };

  /* ==================================================
     NAVBAR LINKS CLICK
  ================================================== */
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      activateSection(targetId);
    });
  });

  /* ==================================================
     SECTION TITLE CLICK
  ================================================== */
  sectionTitles.forEach((title) => {
    title.addEventListener("click", () => {
      const targetId = title.dataset.target;
      activateSection(targetId);
    });
  });

  /* ==================================================
     SCROLL SPY – UPDATE ACTIVE LINKS & TITLES
  ================================================== */
  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + navbarHeight + 20;

    allSections.forEach((section) => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        // Highlight navbar link
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href").replace("#", "") === section.id
          );
        });

        // Highlight section title
        sectionTitles.forEach((title) =>
          title.classList.toggle(
            "active",
            title.dataset.target === section.id
          )
        );
      }
    });
  });

  /* ==================================================
     OPTIONAL: RETURN HOME BUTTON
     If you have a "Home" button with id="home-link"
     It will scroll to the hero section without hiding others
  ================================================== */
  const homeButton = document.getElementById("home-link");
  if (homeButton) {
    homeButton.addEventListener("click", (e) => {
      e.preventDefault();
      const heroSection = document.querySelector(".hero");
      const topPosition = heroSection.offsetTop - navbarHeight + 10;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    });
  }
});
