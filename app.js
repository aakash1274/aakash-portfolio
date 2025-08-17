// Netflix-Inspired Portfolio JavaScript for Aakash Eti

// Global variables
let isLoading = true;
let particleSystem = null;
let typingInterval = null;
let achievements = {};

// Project data based on Aakash Eti's actual projects
const projects = [
  {
    id: 1,
    title: "Kisan Connect App",
    category: "Agricultural Technology",
    description: "Revolutionary agricultural platform connecting farmers with buyers using Flutter, Firebase, and Node.js. Features multilingual support, weather API integration, and voice assistance to revolutionize agricultural practices.",
    technologies: ["Flutter", "Firebase", "Node.js", "Machine Learning", "Voice AI", "Weather APIs"],
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800",
    github: "https://github.com/aakash1274/kisan-connect",
    status: "In Development",
    features: [
      "Multilingual Support",
      "Weather Integration", 
      "Voice Assistance",
      "Farmer-Buyer Connection",
      "Real-time Market Data",
      "AI-powered Recommendations"
    ],
    impact: "Empowering 500+ farmers across 5 regions"
  },
  {
    id: 2,
    title: "NLP-Based Chat Feature",
    category: "Natural Language Processing",
    description: "Developed an intelligent chat system using Python, Flask, and NLTK. Deployed using Firebase for real-time conversational functionality and seamless human-computer interaction.",
    technologies: ["Python", "Flask", "NLTK", "Firebase", "NLP", "Real-time Processing"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800",
    github: "https://github.com/aakash1274/nlp-chat",
    status: "Completed",
    features: [
      "Natural Language Processing",
      "Real-time Chat",
      "Firebase Integration", 
      "Conversational AI",
      "Multi-platform Support"
    ],
    impact: "Enabling seamless human-computer interaction"
  }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializePortfolio();
});

// Initialize Portfolio
function initializePortfolio() {
  showLoadingScreen();
  setupEventListeners();
  setupIntersectionObserver();
  setupParticleSystem();
  
  // Hide loading screen after 3 seconds
  setTimeout(() => {
    hideLoadingScreen();
    startTypingAnimation();
    animateCounters();
  }, 3000);
}

// Loading Screen
function showLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.classList.remove('hidden');
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.classList.add('hidden');
  isLoading = false;
  
  // Start other animations
  setTimeout(() => {
    animateHeroElements();
  }, 500);
}

// Typing Animation
function startTypingAnimation() {
  const typingText = document.getElementById('typingText');
  const texts = [
    'Tech Entrepreneur',
    'Founder & CEO',
    'Innovation Leader',
    'Agricultural Tech Pioneer',
    'B.Tech IT Student',
    'Hackathon Champion'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeText() {
    const currentText = texts[textIndex];
    
    if (!isDeleting) {
      typingText.textContent = currentText.slice(0, charIndex);
      charIndex++;
      
      if (charIndex > currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 2000);
        return;
      }
    } else {
      typingText.textContent = currentText.slice(0, charIndex);
      charIndex--;
      
      if (charIndex < 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 500);
        return;
      }
    }
    
    setTimeout(typeText, isDeleting ? 50 : 100);
  }
  
  typeText();
}

// Particle System
function setupParticleSystem() {
  const particlesContainer = document.getElementById('particles');
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 8 + 6;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}px`;
    particle.style.top = `${window.innerHeight}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = Math.random() * 0.6 + 0.2;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, duration * 1000);
  }
  
  // Create particles periodically
  setInterval(createParticle, 400);
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number, .achievement-number');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const stepTime = duration / (isDecimal ? target * 10 : target);
    let current = 0;
    
    const timer = setInterval(() => {
      if (isDecimal) {
        current += 0.1;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current.toFixed(1);
      } else {
        current += Math.ceil(target / 100);
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current;
      }
    }, stepTime);
  });
}

// Animate Hero Elements
function animateHeroElements() {
  const heroElements = document.querySelectorAll('.hero-content > *');
  
  heroElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// Intersection Observer for Animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Animate section elements
        if (element.classList.contains('section')) {
          animateSection(element);
        }
        
        // Animate skill bars
        if (element.classList.contains('skills-section')) {
          animateSkillBars();
        }
        
        // Unlock achievements
        if (element.classList.contains('achievement-card')) {
          unlockAchievement(element);
        }
        
        observer.unobserve(element);
      }
    });
  }, observerOptions);
  
  // Observe sections and elements
  document.querySelectorAll('.section, .achievement-card').forEach(el => {
    observer.observe(el);
  });
}

// Animate Section
function animateSection(section) {
  const elements = section.querySelectorAll('.section-header, .project-card, .contact-item, .skills-category, .achievement-item, .certification-card, .venture-card');
  
  elements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Animate Skill Bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute('data-width');
    
    setTimeout(() => {
      bar.style.width = `${width}%`;
    }, index * 100);
  });
}

// Unlock Achievement
function unlockAchievement(card) {
  const achievementType = card.getAttribute('data-achievement');
  
  if (!achievements[achievementType]) {
    achievements[achievementType] = true;
    
    setTimeout(() => {
      const unlock = card.querySelector('.achievement-unlock');
      if (unlock) {
        unlock.classList.add('show');
        
        setTimeout(() => {
          unlock.classList.remove('show');
        }, 2000);
      }
    }, 1000);
  }
}

// Event Listeners
function setupEventListeners() {
  // Navigation
  setupNavigation();
  
  // Mobile menu toggle
  setupMobileMenu();
  
  // Contact form
  setupContactForm();
  
  // Scroll events
  setupScrollEvents();
  
  // Project modal buttons - Fix for the critical bug
  setupProjectModals();
}

// Setup Project Modals - NEW FUNCTION TO FIX THE BUG
function setupProjectModals() {
  // Add event listeners to all project buttons
  document.addEventListener('click', function(e) {
    if (e.target.matches('.project-btn') || e.target.closest('.project-btn')) {
      const button = e.target.matches('.project-btn') ? e.target : e.target.closest('.project-btn');
      
      // Check if this is a "View Details" button (not a GitHub link)
      if (button.textContent.includes('View Details')) {
        e.preventDefault();
        
        // Find the project card and determine which project
        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('.project-title').textContent;
        
        // Find the project ID based on title
        const project = projects.find(p => p.title === projectTitle);
        if (project) {
          openProjectModal(project.id);
        }
      }
    }
  });
  
  // Modal close functionality
  const modal = document.getElementById('projectModal');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const closeButton = modal.querySelector('.modal-close');
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeProjectModal);
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', closeProjectModal);
  }
}

// Navigation Setup
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
      
      // Close mobile menu if open
      const navMenu = document.querySelector('.nav-menu');
      const navToggle = document.querySelector('.nav-toggle');
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// Mobile Menu Setup
function setupMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
}

// Contact Form Setup - ENHANCED TO FIX FEEDBACK ISSUE
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Validate form data
      const errors = validateForm(data);
      if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.btn-submit');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        
        // Show success notification - FIXED
        showNotification(`Thank you ${data.name}! Your message has been sent successfully. Aakash will get back to you soon at ${data.email}.`, 'success');
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
          
          // Clear form labels
          const labels = contactForm.querySelectorAll('.form-label');
          labels.forEach(label => {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--color-text-secondary)';
          });
        }, 3000);
      }, 2000);
    });
  }
}

// Enhanced form validation
function validateForm(formData) {
  const errors = [];
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Please enter a valid name (at least 2 characters)');
  }
  
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!formData.subject || formData.subject.trim().length < 5) {
    errors.push('Please enter a subject (minimum 5 characters)');
  }
  
  if (!formData.message || formData.message.trim().length < 10) {
    errors.push('Please enter a message (minimum 10 characters)');
  }
  
  return errors;
}

// Scroll Events Setup
function setupScrollEvents() {
  const navbar = document.getElementById('navbar');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar scroll behavior
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    // Navbar background opacity
    if (scrollTop > 50) {
      navbar.style.background = 'rgba(20, 20, 20, 0.95)';
    } else {
      navbar.style.background = 'rgba(20, 20, 20, 0.8)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Project Modal Functions - FIXED AND ENHANCED
function openProjectModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) {
    console.error('Project not found:', projectId);
    return;
  }
  
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalTech = document.getElementById('modalTech');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalImpact = document.getElementById('modalImpact');
  const modalGithub = document.getElementById('modalGithub');
  
  // Populate modal content
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalCategory) modalCategory.textContent = project.category;
  if (modalImage) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
  }
  if (modalDescription) modalDescription.textContent = project.description;
  if (modalGithub) modalGithub.href = project.github;
  
  // Populate tech tags
  if (modalTech) {
    modalTech.innerHTML = '';
    project.technologies.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = tech;
      modalTech.appendChild(tag);
    });
  }
  
  // Populate features
  if (modalFeatures) {
    modalFeatures.innerHTML = '<h4>Key Features:</h4><ul></ul>';
    const featuresList = modalFeatures.querySelector('ul');
    project.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
  }
  
  // Populate impact
  if (modalImpact) {
    modalImpact.innerHTML = `<h4>Impact:</h4><p>${project.impact}</p>`;
  }
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Add success notification
  showNotification(`Viewing details for ${project.title}`, 'info');
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Notification System - ENHANCED
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" aria-label="Close notification">×</button>
  `;
  
  const backgroundColor = {
    'success': '#E50914',
    'error': '#dc2626',
    'info': 'rgba(255, 255, 255, 0.1)'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${backgroundColor[type]};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Add CSS for notification animation
const notificationCSS = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .notification button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }
  
  .notification button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Add notification styles to head
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
  // Close modal with Escape key
  if (e.key === 'Escape') {
    const modal = document.getElementById('projectModal');
    if (modal && !modal.classList.contains('hidden')) {
      closeProjectModal();
    }
  }
  
  // Navigate sections with arrow keys
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const sections = ['home', 'about', 'venture', 'projects', 'skills', 'achievements', 'contact'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1]);
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      scrollToSection(sections[currentIndex - 1]);
    }
  }
});

function getCurrentSection() {
  const sections = ['home', 'about', 'venture', 'projects', 'skills', 'achievements', 'contact'];
  const scrollPosition = window.scrollY + 100;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section && section.offsetTop <= scrollPosition) {
      return sections[i];
    }
  }
  
  return 'home';
}

// Performance optimization for animations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance Metrics (for demonstration)
window.addEventListener('load', function() {
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log(`Aakash Eti Portfolio loaded in ${loadTime}ms`);
  
  if (loadTime > 3000) {
    console.warn('Portfolio loading time is above optimal threshold');
  } else {
    console.log('Portfolio performance is optimal! 🚀');
  }
});

// Error Handling
window.addEventListener('error', function(e) {
  console.error('Portfolio Error:', e.error);
  showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Add smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
  const smoothScrollPolyfill = function(target) {
    const startLocation = window.pageYOffset;
    const endLocation = target.offsetTop - 80;
    const distance = endLocation - startLocation;
    const duration = Math.abs(distance / 1);
    let timeLapsed = 0;
    const percentage = function(time) {
      return time < 0.5 ? 2 * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
    };
    
    const animateScroll = function() {
      timeLapsed += 16;
      const progress = percentage(timeLapsed / duration);
      window.scrollTo(0, startLocation + (distance * progress));
      if (timeLapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    
    animateScroll();
  };
  
  // Override scrollToSection for older browsers
  window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      smoothScrollPolyfill(section);
    }
  };
}

// Initialize theme based on user preference
function initializeTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', 'dark'); // Always use dark theme for Netflix style
}

// Call theme initialization
initializeTheme();

// Add loading completion event
window.addEventListener('DOMContentLoaded', function() {
  // Add a small delay to ensure smooth loading experience
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// Preload critical images
function preloadImages() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
    'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Call preload function
preloadImages();

// Add Aakash Eti specific easter eggs
let clickCount = 0;
document.querySelector('.logo-text')?.addEventListener('click', function() {
  clickCount++;
  if (clickCount === 5) {
    showNotification('🌾 You found the Kisan Connect easter egg! Agriculture meets technology! 🚀', 'success');
    clickCount = 0;
  }
});

// Console welcome message
console.log(`
🌾 Welcome to Aakash Eti's Portfolio! 🌾
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Founder & CEO at Kisan Connect
🎓 B.Tech IT Student with 8.0 CGPA  
🏆 Multiple Hackathon Winner
💻 Tech Stack: Flutter, Firebase, Node.js, ML
🌱 Mission: Empowering farmers through technology
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Contact: aakasheti4555@gmail.com
LinkedIn: linkedin.com/in/aakasheti
GitHub: github.com/aakash1274
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);