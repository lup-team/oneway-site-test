"use strict";

/* ========================================
   One Way – Main JavaScript
======================================== */

/* ========================================
   Header / Language Switcher
======================================== */

window.oneWayLanguage = "ar";

window.applyOneWayLanguage = function (language) {
  const isArabic = language === "ar";

  window.oneWayLanguage = language;
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  
  if (window.destinationsSwiper) {
  window.destinationsSwiper.changeLanguageDirection(
    isArabic ? "rtl" : "ltr"
  );

  window.destinationsSwiper.update();
}
  document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
    element.textContent = isArabic ? element.dataset.ar : element.dataset.en;
  });

  document.querySelectorAll("[data-aria-ar][data-aria-en]").forEach((element) => {
    element.setAttribute(
      "aria-label",
      isArabic ? element.dataset.ariaAr : element.dataset.ariaEn
    );
  });

  document.querySelectorAll("[data-title-ar][data-title-en]").forEach((element) => {
    element.setAttribute(
      "title",
      isArabic ? element.dataset.titleAr : element.dataset.titleEn
    );
  });

  const languageButton = document.querySelector("#language-toggle");
  if (languageButton) {
    languageButton.textContent = isArabic ? "English" : "العربية";
  }

  document.querySelectorAll("[data-footer-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.footerLang === language);
  });

};

window.initializeOneWayHeader = function () {
  const languageButton = document.querySelector("#language-toggle");
  const menuButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#main-navigation");

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      const nextLanguage = window.oneWayLanguage === "ar" ? "en" : "ar";
      window.applyOneWayLanguage(nextLanguage);
    });
  }

  if (menuButton && navigation) {
    const closeMenu = () => {
      navigation.classList.remove("is-open");
      menuButton.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      menuButton.classList.toggle("is-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  window.applyOneWayLanguage(window.oneWayLanguage);
};

/* ========================================
   Footer
======================================== */

window.initializeOneWayFooter = function () {
  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  document.querySelectorAll("[data-footer-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      if (typeof window.applyOneWayLanguage === "function") {
        window.applyOneWayLanguage(button.dataset.footerLang);
      }
    });
  });

  document.querySelectorAll("[data-copy-phone]").forEach((button) => {
    button.addEventListener("click", async () => {
      const phoneNumber = button.dataset.copyPhone;
      const feedback = button.querySelector(".copy-feedback");
      const copiedText = (window.oneWayLanguage || "ar") === "ar" ? "تم النسخ" : "Copied";

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(phoneNumber);
        } else {
          const temporaryInput = document.createElement("textarea");
          temporaryInput.value = phoneNumber;
          temporaryInput.setAttribute("readonly", "");
          temporaryInput.style.position = "fixed";
          temporaryInput.style.opacity = "0";
          document.body.appendChild(temporaryInput);
          temporaryInput.select();
          document.execCommand("copy");
          temporaryInput.remove();
        }

        if (feedback) {
          feedback.textContent = copiedText;
          feedback.classList.add("show");

          window.setTimeout(() => {
            feedback.classList.remove("show");
            feedback.textContent = "";
          }, 1600);
        }
      } catch (error) {
        console.error("Could not copy phone number:", error);
      }
    });
  });

  if (typeof window.applyOneWayLanguage === "function") {
    window.applyOneWayLanguage(window.oneWayLanguage || "ar");
  }
};

document.addEventListener("DOMContentLoaded", async () => {

  console.log("One Way website is ready.");


  if (
    typeof window.initializeOneWayHeader === "function"
  ) {
    window.initializeOneWayHeader();
  }


  if (
    typeof window.initializeOneWayFooter === "function"
  ) {
    window.initializeOneWayFooter();
  }


  const siteHeader = document.querySelector("#site-header");

function updateHeaderOnScroll() {
  if (!siteHeader) return;

  siteHeader.classList.toggle(
    "is-scrolled",
    window.scrollY > 30
  );
}

updateHeaderOnScroll();

window.addEventListener(
  "scroll",
  updateHeaderOnScroll,
  { passive: true }
);


  /* ========================================
     AOS animations
  ======================================== */

if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 450,
    easing: "ease-out",
    once: true,
    offset: 30,
    delay: 0
  });
}



  /* ========================================
     Testimonials slider
  ======================================== */

  const testimonialsElement =
    document.querySelector(
      ".testimonials-swiper"
    );


  if (
    testimonialsElement &&
    typeof Swiper !== "undefined"
  ) {

    new Swiper(
      ".testimonials-swiper",
      {

        slidesPerView: 1,

        spaceBetween: 20,

        loop: true,

        grabCursor: true,


        autoplay: {

          delay: 4500,

          disableOnInteraction: false

        },


        pagination: {

          el: ".swiper-pagination",

          clickable: true

        },


        navigation: {

          nextEl: ".swiper-button-next",

          prevEl: ".swiper-button-prev"

        },


        breakpoints: {

          768: {

            slidesPerView: 2

          },


          1200: {

            slidesPerView: 3

          }

        }

      }
    );

  }

/* ========================================
   Destinations slider
======================================== */

const destinationsElement =
  document.querySelector(".ow-destinations__swiper");

const destinationsShell =
  document.querySelector(".ow-destinations__shell");

const destinationsPagination =
  document.querySelector(".ow-destinations__pagination");

if (
  destinationsElement &&
  destinationsShell &&
  typeof Swiper !== "undefined"
) {
  const nextButton =
    destinationsShell.querySelector(
      ".ow-destinations__button--next"
    );

  const previousButton =
    destinationsShell.querySelector(
      ".ow-destinations__button--prev"
    );
/**/ 
window.destinationsSwiper = new Swiper(destinationsElement, {    /*
     * Exactly one card on every phone.
     * Do not use 1.08 or 1.25 here.
     */
    slidesPerView: 1,
    spaceBetween: 12,

    centeredSlides: false,

    loop: true,
    speed: 650,

    grabCursor: true,
    watchOverflow: true,

    autoplay: {
      delay: 4200,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },

    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    navigation: {
      nextEl: nextButton,
      prevEl: previousButton
    },

    pagination: {
      el: destinationsPagination,
      clickable: true
    },

    breakpoints: {
      /* Phone: exactly one complete card */
      0: {
        slidesPerView: 1,
        spaceBetween: 12
      },

      /* iPad and tablets: two complete cards */
      640: {
        slidesPerView: 2,
        spaceBetween: 18
      },

      /* Laptop and desktop: three complete cards */
      992: {
        slidesPerView: 3,
        spaceBetween: 24
      }
    }
  });
}


/* ========================================
   Statistics counter animation
======================================== */

const statsSection = document.querySelector("#stats");
const counters = document.querySelectorAll("[data-counter]");

function showFinalCounterValue(counter) {
  const target = Number(counter.dataset.target || 0);
  const prefix = counter.dataset.prefix || "";
  const suffix = counter.dataset.suffix || "";

  counter.textContent = `${prefix}${target}${suffix}`;
}

function animateCounter(counter, delay = 0) {
  const target = Number(counter.dataset.target || 0);
  const prefix = counter.dataset.prefix || "";
  const suffix = counter.dataset.suffix || "";

  const duration = 1700;

  window.setTimeout(() => {
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;

      const progress = Math.min(
        elapsedTime / duration,
        1
      );

      /* Smooth ending */
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(
        target * easedProgress
      );

      counter.textContent =
        `${prefix}${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent =
          `${prefix}${target}${suffix}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }, delay);
}

function startStatisticsCounters() {
  counters.forEach((counter, index) => {
    animateCounter(counter, index * 120);
  });
}

if (statsSection && counters.length) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion) {
    counters.forEach(showFinalCounterValue);
  } else if ("IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          startStatisticsCounters();

          /* Run only once */
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    statsObserver.observe(statsSection);
  } else {
    startStatisticsCounters();
  }
}

  /* ========================================
     Back To Top Button
  ======================================== */

  const backToTopButton =
    document.querySelector(
      "#back-to-top"
    );


  if (backToTopButton) {

    /* Show / Hide button */

    function updateBackToTopButton() {

      if (window.scrollY > 400) {

        backToTopButton.classList.add(
          "show"
        );

      } else {

        backToTopButton.classList.remove(
          "show"
        );

      }

    }


    /* Check when page loads */

    updateBackToTopButton();


    /* Check while scrolling */

    window.addEventListener(
      "scroll",
      updateBackToTopButton,
      {
        passive: true
      }
    );


    /* Go to top */

    backToTopButton.addEventListener(
      "click",
      function () {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  }











 /* ========================================
   Process-line plane animation
======================================== */

const processSteps =
  document.querySelector(".process-steps");

if (processSteps) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    !reduceMotion &&
    "IntersectionObserver" in window
  ) {
    const processObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            processSteps.classList.toggle(
              "is-plane-active",
              entry.isIntersecting
            );
          });
        },
        {
          threshold: 0.25
        }
      );

    processObserver.observe(processSteps);
  }
}});

/* ========================================
   Mobile Hero → About divider plane
======================================== */

const mobileFlightDivider =
  document.querySelector(".mobile-flight-divider");

if (mobileFlightDivider) {

  const mobileFlightMedia =
    window.matchMedia("(max-width: 767px)");

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (
    mobileFlightMedia.matches &&
    !reduceMotion &&
    "IntersectionObserver" in window
  ) {

    const mobileFlightDividerObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            mobileFlightDivider.classList.toggle(
              "is-plane-active",
              entry.isIntersecting
            );

          });

        },
        {
          threshold: 0.25
        }
      );

    mobileFlightDividerObserver.observe(
      mobileFlightDivider
    );
  }
}

/* ========================================
   Contact phone copy interaction
   Phone numbers in the contact section copy only.
======================================== */
document.addEventListener("click", async (event) => {
  const copyButton = event.target.closest(".contact-copy-row[data-copy-value]");
  if (!copyButton) return;

  const value = copyButton.dataset.copyValue;
  if (!value) return;

  let copied = false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      copied = true;
    }
  } catch (error) {
    copied = false;
  }

  if (!copied) {
    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    helper.style.pointerEvents = "none";
    document.body.appendChild(helper);
    helper.select();

    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    helper.remove();
  }

  if (!copied) return;

  document.querySelectorAll(".contact-copy-row.is-copied").forEach((row) => {
    if (row !== copyButton) row.classList.remove("is-copied");
  });

  copyButton.classList.add("is-copied");

  window.clearTimeout(copyButton._copyFeedbackTimer);
  copyButton._copyFeedbackTimer = window.setTimeout(() => {
    copyButton.classList.remove("is-copied");
  }, 1800);
});

