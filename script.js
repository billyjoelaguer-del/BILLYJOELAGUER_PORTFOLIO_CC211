// Small interactions for the portfolio page.
document.addEventListener("DOMContentLoaded", () => {
  // Keep the footer year current.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Highlight the navigation link for the section currently in view.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  const updateActiveLink = () => {
    let current = "home";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  // Bootstrap mobile menu closes after choosing a section.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainNav");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // No server is connected, so compose the visitor's message in their email app.
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nAddress: ${address || "Not provided"}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:Billyjoelaguer@gmail.com?subject=${subject}&body=${body}`;
    document.getElementById("formNotice").textContent =
      "Your email app should open with your message ready to send.";
  });
});
