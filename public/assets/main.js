// Mobile menu toggle
document.getElementById("mobileMenuBtn")?.addEventListener("click", function () {
  document.getElementById("mobileMenu").classList.toggle("hidden");
});

// Smooth scroll + close mobile menu on nav link click
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      document.getElementById("mobileMenu")?.classList.add("hidden");
    }
  });
});

// Expand/collapse service text (called from onclick attributes)
function toggleExpand(id, btn) {
  const el = document.getElementById(id);
  const expanded = el.classList.toggle("expanded");
  btn.classList.toggle("expanded", expanded);
  btn.querySelector("span").textContent = expanded ? "Read less" : "Read more";
}

// Testimonial carousel (no-ops safely if no testimonial elements on page)
(function () {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".testimonial-dot");
  if (!testimonials.length) return;

  let current = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => t.classList.toggle("active", i === index));
    dots.forEach((d, i) => {
      d.style.backgroundColor = i === index ? "#32829b" : "#d1d5db";
    });
  }

  let interval = setInterval(() => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  }, 5000);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      current = parseInt(dot.dataset.index);
      showTestimonial(current);
      interval = setInterval(() => {
        current = (current + 1) % testimonials.length;
        showTestimonial(current);
      }, 5000);
    });
  });

  showTestimonial(0);
})();
