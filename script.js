/* =========================================
   RESUME SITE - script.js
   ========================================= */

// ==========================================
// Navigation
// ==========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Mobile nav toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when clicking a link
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// Scroll Animations
// ==========================================
const fadeElements = document.querySelectorAll(
  '.timeline-item, .about-card, .skill-card, .cert-card, .portfolio-card, .contact-methods, .contact-form-wrap'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ==========================================
// Skill Bar Animation
// ==========================================
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.style.getPropertyValue('--fill');
      entry.target.style.width = fill;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  bar.style.width = '0';
  skillObserver.observe(bar);
});

// ==========================================
// Contact Form
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    
    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate sending (in production, connect to a backend or email service)
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> 消息已发送！';
      btn.style.background = '#22c55e';
      contactForm.reset();
      
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

// ==========================================
// Image Placeholder Upload (for photo area)
// ==========================================
const photoWrap = document.getElementById('heroPhotoWrap');
if (photoWrap) {
  photoWrap.addEventListener('click', () => {
    // Create a file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const img = document.createElement('img');
          img.src = evt.target.result;
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:12px;';
          const placeholder = document.getElementById('photoPlaceholder');
          if (placeholder) placeholder.style.display = 'none';
          photoWrap.insertBefore(img, photoWrap.firstChild);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
}

// ==========================================
// Gallery placeholders upload
// ==========================================
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          item.innerHTML = `<img src="${evt.target.result}" alt="证书图片" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
});

// ==========================================
// Portfolio project images upload
// ==========================================
document.querySelectorAll('.portfolio-img').forEach(item => {
  item.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const placeholder = item.querySelector('.portfolio-placeholder');
          if (placeholder) {
            placeholder.innerHTML = `<img src="${evt.target.result}" alt="项目图片" style="width:100%;height:100%;object-fit:cover;">`;
            placeholder.style.border = 'none';
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });
});

// ==========================================
// Smooth scroll for anchor links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// Console Easter Egg
// ==========================================
console.log('%c申万山 - 个人求职网站', 'font-size:20px;color:#1a3a5c;font-weight:bold;');
console.log('%c交通工程 · 一级建造师（市政+建筑+机电）', 'font-size:14px;color:#e8a020;');
console.log('%c欢迎联系: 18209781355 | 774071052@qq.com', 'font-size:12px;color:#666;');
