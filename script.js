const WHATSAPP_CONFIG = {
  number: "2349085911166",
  defaultMessage:
    "Hello OJARUNz, I would like to make a shopping request. Here is my list:",
};

const openWhatsApp = (message = WHATSAPP_CONFIG.defaultMessage) => {
  const url = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const whatsappLinks = document.querySelectorAll(".whatsapp-link");

whatsappLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const customMessage = link.dataset.message || WHATSAPP_CONFIG.defaultMessage;
    openWhatsApp(customMessage);
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  sectionObserver.observe(element);
});

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("formSuccess");

if (contactForm && successMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const needs = formData.get("needs");
    const location = formData.get("location");
    const message = formData.get("message") || "No additional message.";

    const requestMessage = `Hello OJARUNz, my name is ${name}. Phone number: ${phone}. I need: ${needs}. Preferred delivery location: ${location}. Additional message: ${message}`;

    successMessage.textContent = "Your request has been prepared successfully. We will contact you soon.";
    openWhatsApp(requestMessage);
    contactForm.reset();
  });
}

const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.getElementById("mainNav");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
  });

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}
