document.addEventListener('DOMContentLoaded', () => {
  // Set up carousel clones for mobile
  const damagesRow = document.querySelector('.hero-damages-row');
  if (damagesRow) {
    const originalPills = Array.from(damagesRow.children);
    originalPills.forEach(pill => {
      const clone = pill.cloneNode(true);
      clone.classList.add('is-clone');
      damagesRow.appendChild(clone);
    });
    damagesRow.classList.add('is-carousel');
  }

  // Handle damage pill clicks responsively
  document.querySelectorAll('.hero-damage-pill').forEach(function (pill) {
    pill.addEventListener('click', function (e) {
      var serviceVal = pill.dataset.dmg;
      if (!serviceVal) return;

      // If mobile layout or touch-only device
      if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 900) {
        e.preventDefault();
        e.stopPropagation();
        populateDrawer(serviceVal);
        showDrawer();
      } else {
        // Desktop click: pre-select service and smooth-scroll to contact
        var select = document.getElementById('contact-service');
        if (select) {
          select.value = serviceVal;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
        var contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --- Hero Info Drawer Slide-out Logic ---
  const damageInfo = {
    water: {
      title: "Water Damage Restoration",
      img: "/assets/water-mops.png",
      desc: "Professional mitigation, extraction, and drying services for floods, pipe bursts, and sewage backups.",
      bullets: [
        "24/7 emergency water extraction",
        "Rapid structural drying & dehumidification",
        "Thermal imaging leak detection",
        "Sewage cleanup & disinfection"
      ]
    },
    fire: {
      title: "Fire & Smoke Restoration",
      img: "/assets/emergency-mops.png",
      desc: "Comprehensive fire damage restoration, smoke odor removal, and structural soot cleaning.",
      bullets: [
        "Smoke odor neutralization",
        "Detailed soot & ash decontamination",
        "Structural containment & safety boarding",
        "Content cleanup & pack-out services"
      ]
    },
    mold: {
      title: "Mold Remediation",
      img: "/assets/mold-mops.png",
      desc: "Certified mold inspection, containment, and removal services conforming to IICRC S520 standards.",
      bullets: [
        "Air quality testing & diagnostics",
        "Negative pressure containment chambers",
        "HEPA vacuuming & antimicrobial treatments",
        "Absolute moisture source correction"
      ]
    },
    storm: {
      title: "Storm & Wind Damage",
      img: "/assets/damage-mops.avif",
      desc: "Rapid emergency tarping, board-ups, and structural stabilization following wind and storm events.",
      bullets: [
        "Emergency roof tarping & board-ups",
        "Fallen tree & debris removal",
        "Temporary power & lighting setup",
        "Complete wind & hail repair"
      ]
    },
    hazmat: {
      title: "Hazardous Material Abatement",
      img: "/assets/document-mops.png",
      desc: "Certified containment and removal of asbestos, lead paint, and hazardous chemical residues.",
      bullets: [
        "Ministry-compliant asbestos abatement",
        "Lead paint stabilization & removal",
        "Heavy chemical bio-cleanup",
        "Full hazard documentation & clearance"
      ]
    },
    trauma: {
      title: "Trauma & Crime Scene Cleanup",
      img: "/assets/rental-emergency-response.png",
      desc: "Highly respectful, certified biohazard remediation for trauma, accident, and crime scene environments.",
      bullets: [
        "Discreet, compassionate 24/7 service",
        "Biohazard and fluid decontamination",
        "Advanced sanitization & odor control",
        "Full compliance with local regulations"
      ]
    },
    rebuild: {
      title: "Full Property Rebuild",
      img: "/assets/rebuild-mops.png",
      desc: "Complete start-to-finish design, general contracting, and reconstruction services for residential and commercial spaces.",
      bullets: [
        "Full structural engineering & blueprints",
        "Permit acquisition & inspections",
        "Drywall, framing, paint & finishing",
        "IICRC-certified reconstruction protocols"
      ]
    }
  };

  const drawer = document.getElementById('hero-info-drawer');
  const dImg = document.getElementById('hid-img');
  const dTitle = document.getElementById('hid-title');
  const dDesc = document.getElementById('hid-desc');
  const dBullets = document.getElementById('hid-bullets');
  const dClose = document.getElementById('hid-close-btn');
  const dCta = document.getElementById('hid-cta-btn');

  function populateDrawer(key) {
    const info = damageInfo[key];
    if (!info) return;

    if (dImg && info.img) {
      dImg.src = info.img;
      dImg.alt = info.title;
    }

    dTitle.textContent = info.title;
    dDesc.textContent = info.desc;
    
    // Clear and build bullets
    dBullets.innerHTML = '';
    info.bullets.forEach(txt => {
      const li = document.createElement('li');
      li.textContent = txt;
      dBullets.appendChild(li);
    });

    if (dCta) {
      dCta.setAttribute('data-dmg', key);
    }
  }

  function showDrawer() {
    if (drawer) {
      drawer.classList.add('is-active');
      drawer.setAttribute('aria-hidden', 'false');
    }
  }

  function hideDrawer() {
    if (drawer) {
      drawer.classList.remove('is-active');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  // Bind mouse hover events to pills
  document.querySelectorAll('.hero-damage-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      const key = pill.dataset.dmg;
      if (!key) return;
      populateDrawer(key);
      showDrawer();
    });

    pill.addEventListener('mouseleave', () => {
      hideDrawer();
    });
  });

  if (dClose) {
    // Explicit close button click
    dClose.addEventListener('click', () => {
      hideDrawer();
    });
  }

  if (dCta) {
    // Drawer CTA click action
    dCta.addEventListener('click', () => {
      const key = dCta.getAttribute('data-dmg');
      if (key) {
        const select = document.getElementById('contact-service');
        if (select) {
          select.value = key;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      hideDrawer();
    });
  }



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
});
