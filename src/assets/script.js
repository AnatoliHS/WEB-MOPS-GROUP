document.addEventListener('DOMContentLoaded', () => {
  // Set up mobile image sources on initial load if screen is narrow
  if (window.innerWidth <= 900) {
    document.querySelectorAll('.hero-banner-img').forEach(img => {
      img.src = '/assets/water_damage_mobile.png';
    });
    const mainImg = document.getElementById('hero-main-img');
    if (mainImg) {
      mainImg.src = '/assets/water_damage_mobile.png';
    }
  }

  // Set up carousel clones for mobile
  const damagesRow = document.querySelector('.hero-damages-row');
  if (damagesRow && window.innerWidth <= 900) {
    const originalPills = Array.from(damagesRow.children);
    originalPills.forEach(pill => {
      const clone = pill.cloneNode(true);
      clone.classList.add('is-clone');
      damagesRow.appendChild(clone);
    });
    damagesRow.classList.add('is-carousel');
  }

  // --- Damage Types Showcase & Info Swapper (ZettaJoule style) ---
  const damageInfo = {
    water: {
      title: "Water Damage",
      subtitle: 'Rapid <span class="sub-accent">Extraction</span> & Structural Drying',
      img: "/assets/water_damage_panorama.png",
      imgMobile: "/assets/water_damage_mobile.png",
      desc: "Professional mitigation, extraction, and drying services for floods, pipe bursts, and sewage backups."
    },
    fire: {
      title: "Fire & Smoke",
      subtitle: 'Soot, Odor & Structural <span class="sub-accent">Restoration</span>',
      img: "/assets/fire_damage_panorama.png",
      imgMobile: "/assets/fire_damage_mobile.png",
      desc: "Comprehensive fire damage restoration, smoke odor removal, and structural soot cleaning."
    },
    mold: {
      title: "Mold Remediation",
      subtitle: 'Safe Containment & Spore <span class="sub-accent">Elimination</span>',
      img: "/assets/mold_remediation_panorama.png",
      imgMobile: "/assets/mold_remediation_mobile.png",
      desc: "Certified mold inspection, containment, and removal services conforming to IICRC S520 standards."
    },
    storm: {
      title: "Storm Damage",
      subtitle: 'Emergency Tarping & <span class="sub-accent">Board-Ups</span>',
      img: "/assets/storm_damage_panorama.png",
      imgMobile: "/assets/storm_damage_mobile.png",
      desc: "Rapid emergency tarping, board-ups, and structural stabilization following wind and storm events."
    },
    hazmat: {
      title: "Hazmat & Asbestos",
      subtitle: 'Certified Lead & Asbestos <span class="sub-accent">Abatement</span>',
      img: "/assets/hazmat_abatement_panorama.png",
      imgMobile: "/assets/hazmat_abatement_mobile.png",
      desc: "Certified containment and removal of asbestos, lead paint, and hazardous chemical residues."
    },
    trauma: {
      title: "Trauma Cleanup",
      subtitle: 'Compassionate Biohazard <span class="sub-accent">Sanitization</span>',
      img: "/assets/trauma_cleanup_panorama.png",
      imgMobile: "/assets/trauma_cleanup_mobile.png",
      desc: "Highly respectful, certified biohazard remediation for trauma, accident, and crime scene environments."
    },
    rebuild: {
      title: "Full Rebuild",
      subtitle: 'Complete Design-Build Contractor <span class="sub-accent">Services</span>',
      img: "/assets/full_rebuild_panorama.png",
      imgMobile: "/assets/full_rebuild_mobile.png",
      desc: "Complete start-to-finish design, general contracting, and reconstruction services."
    },
    janitorial: {
      title: "Janitorial Services",
      subtitle: 'Precision Commercial & Sanitation <span class="sub-accent">Services</span>',
      img: "/assets/mops-maid.jpg",
      imgMobile: "/assets/mops-maid-mobile.jpg",
      desc: "We deliver professional cleaning built on precision, accountability, and measurable quality."
    }
  };

  let activeDmgKey = "water";
  let bannersDismissed = false; // Flag to track if we've crossfaded from banners to single image

  let pageInitialized = false;

  function splitTextIntoSpans(text, initialOffset = 0) {
    return text.split('').map((char, idx) => {
      const delay = idx * 25 + initialOffset;
      if (char === ' ') {
        return `<span class="letter letter-space" style="transition-delay: ${delay}ms">&nbsp;</span>`;
      }
      return `<span class="letter" style="transition-delay: ${delay}ms">${char}</span>`;
    }).join('');
  }

  function setActiveService(key) {
    const info = damageInfo[key];
    if (!info) return;
    activeDmgKey = key;

    // Toggle class on the bottom panel for styling overrides (e.g. CTA buttons)
    const bottomPanel = document.querySelector('.hero-bottom-panel');
    if (bottomPanel) {
      bottomPanel.classList.toggle('is-janitorial', key === 'janitorial');
    }

    // Toggle class on the mobile dropdown container for gradient pill border styling
    const mobileDropdownContainer = document.querySelector('.hero-mobile-dropdown-container');
    if (mobileDropdownContainer) {
      mobileDropdownContainer.classList.toggle('is-janitorial', key === 'janitorial');
    }


    // Toggle hero header text wrappers dynamically
    const defaultHeadlines = document.querySelectorAll('.hero-headline-wrapper.default-hero-text');
    const janitorialHeadlines = document.querySelectorAll('.hero-headline-wrapper.janitorial-hero-text');
    const defaultIntros = document.querySelectorAll('.hero-intro-wrapper.default-hero-text');
    const janitorialIntros = document.querySelectorAll('.hero-intro-wrapper.janitorial-hero-text');

    if (key === 'janitorial') {
      defaultHeadlines.forEach(el => el.classList.remove('active'));
      defaultIntros.forEach(el => el.classList.remove('active'));

      janitorialHeadlines.forEach(el => {
        const wasActive = el.classList.contains('active');
        el.classList.add('active');
        if (!wasActive) {
          el.querySelectorAll('.reveal-up').forEach(rev => {
            rev.style.transition = 'none';
            rev.style.transitionDelay = '0s';
            rev.classList.remove('visible');
            void rev.offsetHeight; // Force reflow
            rev.style.transition = '';
            rev.style.transitionDelay = '';
            rev.classList.add('visible');
          });
        }
      });
      janitorialIntros.forEach(el => {
        const wasActive = el.classList.contains('active');
        el.classList.add('active');
        if (!wasActive) {
          el.querySelectorAll('.reveal-up').forEach(rev => {
            rev.style.transition = 'none';
            rev.style.transitionDelay = '0s';
            rev.classList.remove('visible');
            void rev.offsetHeight; // Force reflow
            rev.style.transition = '';
            rev.style.transitionDelay = '';
            rev.classList.add('visible');
          });
        }
      });
    } else {
      let wasJanitorial = false;
      janitorialHeadlines.forEach(el => {
        if (el.classList.contains('active')) wasJanitorial = true;
        el.classList.remove('active');
      });
      janitorialIntros.forEach(el => el.classList.remove('active'));

      defaultHeadlines.forEach(el => {
        const wasActive = el.classList.contains('active');
        el.classList.add('active');
        if (wasJanitorial || !wasActive) {
          el.querySelectorAll('.reveal-up').forEach(rev => {
            rev.style.transition = 'none';
            rev.style.transitionDelay = '0s';
            rev.classList.remove('visible');
            void rev.offsetHeight; // Force reflow
            rev.style.transition = '';
            rev.style.transitionDelay = '';
            rev.classList.add('visible');
          });
        }
      });
      defaultIntros.forEach(el => {
        const wasActive = el.classList.contains('active');
        el.classList.add('active');
        if (wasJanitorial || !wasActive) {
          el.querySelectorAll('.reveal-up').forEach(rev => {
            rev.style.transition = 'none';
            rev.style.transitionDelay = '0s';
            rev.classList.remove('visible');
            void rev.offsetHeight; // Force reflow
            rev.style.transition = '';
            rev.style.transitionDelay = '';
            rev.classList.add('visible');
          });
        }
      });
    }

    // Update dynamic title elements with letter-by-letter stagger reveal
    const titleEls = document.querySelectorAll('.hero-dynamic-title');
    titleEls.forEach(el => {
      el.classList.remove('active');
      const offset = pageInitialized ? 0 : 1000;
      el.innerHTML = splitTextIntoSpans(info.title, offset);
    });
    setTimeout(() => {
      titleEls.forEach(el => {
        el.classList.add('active');
      });
    }, 50);

    // Update dynamic description elements
    const descEls = document.querySelectorAll('.hero-dynamic-desc');
    descEls.forEach(el => {
      el.style.opacity = '0';
    });
    setTimeout(() => {
      descEls.forEach(el => {
        el.textContent = info.desc;
        el.style.opacity = '1';
      });
    }, 150);

    // Update dynamic subtitle elements
    const subEls = document.querySelectorAll('.hero-dynamic-sub');
    subEls.forEach(el => {
      el.style.opacity = '0';
    });
    setTimeout(() => {
      subEls.forEach(el => {
        el.innerHTML = info.subtitle;
        el.style.opacity = '1';
      });
    }, 150);

    // Update dynamic CTA actions
    const ctaEls = document.querySelectorAll('.hero-dynamic-cta');
    ctaEls.forEach(el => {
      el.textContent = `Request Help for ${info.title} \u2192`;
    });

    // Transition from banners to single image on first interaction, otherwise do normal image fade
    const bannersEl = document.querySelector('.hero-banners');
    const imgEl = document.getElementById('hero-main-img');

    if (bannersEl && imgEl) {
      const isMobile = window.innerWidth <= 900;
      const imageSrc = isMobile ? info.imgMobile : info.img;

      if (!bannersDismissed && key !== 'water') {
        bannersDismissed = true;
        // Cross-fade: fade out load banners, fade in main image
        bannersEl.style.opacity = '0';
        setTimeout(() => {
          bannersEl.style.display = 'none';
        }, 400);

        imgEl.src = imageSrc;
        imgEl.alt = info.title + " Restoration Services";
        imgEl.style.opacity = '1';
        imgEl.style.pointerEvents = 'auto';
      } else if (bannersDismissed) {
        // Normal hover transition on the main image
        imgEl.style.opacity = '0.3';
        imgEl.style.transform = 'scale(1.02)';
        setTimeout(() => {
          imgEl.src = imageSrc;
          imgEl.alt = info.title + " Restoration Services";
          imgEl.style.opacity = '1';
          imgEl.style.transform = 'scale(1)';
        }, 180);
      }
    }

    // Update active underline state on all matching pills (including clones)
    document.querySelectorAll('.hero-damage-pill').forEach(pill => {
      if (pill.dataset.dmg === key) {
        pill.classList.add('is-active');
      } else {
        pill.classList.remove('is-active');
      }
    });

    // Update dynamic mobile dropdown trigger label
    const labelEl = document.getElementById('dropdown-trigger-label');
    if (labelEl) {
      labelEl.textContent = info.title;
    }

    // Highlight active item inside the mobile dropdown menu
    document.querySelectorAll('.hero-mobile-dropdown-item').forEach(item => {
      if (item.dataset.dmg === key) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
    pageInitialized = true; // Set initialized flag after first run
    
    // Dispatch scroll event to force navbar logo & CTA color checks to run immediately
    window.dispatchEvent(new Event('scroll'));
  }

  // Bind mouse and click interactions to all pills (originals and clones)
  function setupPillInteractions() {
    const pills = document.querySelectorAll('.hero-damage-pill');
    pills.forEach(pill => {
      const key = pill.dataset.dmg;
      if (!key) return;

      // Mouse hover swap (desktop)
      pill.addEventListener('mouseenter', () => {
        setActiveService(key);
      });

      // Click / Tap swap (desktop & mobile)
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveService(key);
      });
    });
  }

  // Bind custom dropdown interactions on mobile
  function setupDropdownInteractions() {
    const container = document.querySelector('.hero-mobile-dropdown-container');
    const trigger = document.getElementById('hero-mobile-dropdown-trigger');
    const menu = document.getElementById('hero-mobile-dropdown-menu');
    const items = document.querySelectorAll('.hero-mobile-dropdown-item');

    if (!container || !trigger || !menu) return;

    // Toggle dropdown open/close on trigger click
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.classList.toggle('is-open');
    });

    // Option selection
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const key = item.dataset.dmg;
        if (key) {
          setActiveService(key);
        }
        container.classList.remove('is-open');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        container.classList.remove('is-open');
      }
    });
  }

  // Bind click action to the dynamic CTA to pre-select dropdown & scroll to form
  const dynamicCta = document.getElementById('hero-dynamic-cta');
  if (dynamicCta) {
    dynamicCta.addEventListener('click', (e) => {
      e.preventDefault();

      const select = document.getElementById('contact-service');
      if (select) {
        select.value = activeDmgKey;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initialize showcase and bind actions
  setActiveService("water");
  setupPillInteractions();
  setupDropdownInteractions();

  // Re-run setup after a brief timeout to ensure clones are bound
  setTimeout(setupPillInteractions, 100);



  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const emailInput = document.getElementById('contact-email');
  const emailError = document.getElementById('email-error-msg');
  const formStatus = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('form-submit');
  const formFields = contactForm.querySelectorAll('input, select, textarea');

  // Utility to show error on email field
  function showEmailError(msg) {
    emailInput.closest('.form-group').classList.add('has-error');
    emailError.textContent = msg;
    emailError.style.display = 'block';
  }

  // Utility to clear email error
  function clearEmailError() {
    emailInput.closest('.form-group').classList.remove('has-error');
    emailError.textContent = '';
    emailError.style.display = 'none';
  }

  // Utility to show form status (general success or error)
  function showFormStatus(msg, type = 'error') {
    formStatus.textContent = msg;
    formStatus.className = `form-status-msg ${type}`;
    formStatus.style.display = 'block';
  }

  // Utility to clear form status
  function clearFormStatus() {
    formStatus.textContent = '';
    formStatus.style.display = 'none';
  }

  // Dynamic clear on input/typing
  emailInput.addEventListener('input', () => {
    clearEmailError();
    clearFormStatus();
  });

  // Verify email format and domain MX record
  async function validateEmail(email) {
    // 1. Format Regex Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, message: 'Please enter a valid email format (e.g., name@domain.com).' };
    }

    // 2. Extract domain and check DNS MX Record
    const domain = email.split('@')[1];
    try {
      const dnsUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=MX`;
      const response = await fetch(dnsUrl, {
        headers: {
          'Accept': 'application/dns-json'
        }
      });

      if (!response.ok) {
        // If the DNS API fails, we skip this check and let the form submit to be safe
        console.warn('DNS API check failed to respond. Bypassing domain verification.');
        return { valid: true };
      }

      const dnsData = await response.json();

      // Status 0 is NOERROR in DNS. Answer should contain records.
      if (dnsData.Status !== 0 || !dnsData.Answer || dnsData.Answer.length === 0) {
        return { valid: false, message: `The domain "@${domain}" is not a valid email-receiving domain. Please double-check your spelling.` };
      }

      return { valid: true };
    } catch (error) {
      console.error('Error verifying email domain via DNS:', error);
      // Fallback: don't block user if network fails
      return { valid: true };
    }
  }

  // Handle Form Submit
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearEmailError();
    clearFormStatus();

    const email = emailInput.value.trim();
    if (!email) return;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verifying email...';
    formFields.forEach(field => field.disabled = true);

    // Validate email format and domain
    const validation = await validateEmail(email);
    if (!validation.valid) {
      showEmailError(validation.message);

      // Re-enable form fields
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      formFields.forEach(field => field.disabled = false);
      return;
    }

    // Prepare form data
    const formData = new FormData(contactForm);

    // Validate Cloudflare Turnstile token
    const turnstileContainer = contactForm.querySelector('.cf-turnstile');
    if (turnstileContainer) {
      const turnstileResponse = formData.get('cf-turnstile-response');
      if (!turnstileResponse) {
        showFormStatus('Please complete the security check.', 'error');

        // Re-enable form fields
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formFields.forEach(field => field.disabled = false);
        return;
      }
    }

    submitBtn.textContent = 'Sending message...';

    try {
      const submitResponse = await fetch(contactForm.action || '/api/submit', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json, text/html'
        }
      });

      if (submitResponse.ok) {
        // If redirected to thank you page, follow it
        if (submitResponse.redirected) {
          window.location.href = submitResponse.url;
        } else {
          // Fallback if no redirect header: redirect manually
          window.location.href = '/thanks';
        }
      } else {
        const errorText = await submitResponse.text();
        let errorMsg = 'An error occurred while sending your message. Please try again.';

        // Try parsing error message if it's simple text
        if (errorText && errorText.length < 200 && !errorText.includes('<html')) {
          errorMsg = errorText;
        }

        showFormStatus(errorMsg, 'error');

        // Re-enable form fields
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formFields.forEach(field => field.disabled = false);

        // Reset turnstile if it exists to allow re-submission
        if (window.turnstile) {
          window.turnstile.reset();
        }
      }
    } catch (err) {
      console.error('Submit connection error:', err);
      showFormStatus('Unable to connect to the server. Please check your internet connection.', 'error');

      // Re-enable form fields
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      formFields.forEach(field => field.disabled = false);

      if (window.turnstile) {
        window.turnstile.reset();
      }
    }
  });

  // Autoplay all videos programmatically on DOM load and user interaction
  const forceAutoplay = () => {
    document.querySelectorAll('video').forEach(video => {
      video.muted = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented, will play on interaction:", error);
        });
      }
    });
  };

  forceAutoplay();
  ['click', 'touchstart', 'scroll'].forEach(evt => {
    document.addEventListener(evt, forceAutoplay, { once: true, passive: true });
  });
});
