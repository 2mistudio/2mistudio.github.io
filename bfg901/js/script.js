// Menu Toggle Script

document.getElementById('toggleMenu').addEventListener('click', function() {
    var menu = document.getElementById('dropdownMenu');
    var backdrop = document.getElementById('backdrop');
    var isActive = menu.style.display === 'block';

    // Toggle menu visibility and button active state
    if (isActive) {
        menu.style.display = 'none';
        backdrop.style.display = 'none';
        this.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore body overflow
    } else {
        menu.style.display = 'block';
        backdrop.style.display = 'block';
        this.classList.add('active');
        document.body.style.overflow = 'hidden'; // Hide body overflow
    }
});

// Close menu and backdrop when clicking on the backdrop
document.getElementById('backdrop').addEventListener('click', function() {
    var menu = document.getElementById('dropdownMenu');
    var toggleButton = document.getElementById('toggleMenu');
    
    menu.style.display = 'none';
    this.style.display = 'none';
    toggleButton.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore body overflow
});


//General Event Listener for triggering animation
document.addEventListener('DOMContentLoaded', () => {
    // Countdown Script
    const countdownElements = document.querySelectorAll('.count');

    function startCounting(countdownElement, delay) {
        setTimeout(() => {
            const maxCount = parseInt(countdownElement.getAttribute('data-count'), 10);
            let count = 0;
            const duration = 2000; // Duration in milliseconds
            const interval = 70; // Interval in milliseconds
            const step = Math.ceil(maxCount / (duration / interval));

            function updateCount() {
                count += step;
                if (count >= maxCount) {
                    count = maxCount;
                    clearInterval(intervalId);
                }
                countdownElement.textContent = count;
            }

            const intervalId = setInterval(updateCount, interval);
        }, delay);
    }

    const countdownObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countdownElement = entry.target;
                const delay = parseInt(countdownElement.getAttribute('data-delay'), 10);
                startCounting(countdownElement, delay);
                observer.unobserve(countdownElement); // Stop observing after animation starts
            }
        });
    }, { threshold: 0.6 });

    countdownElements.forEach(element => {
        countdownObserver.observe(element);
    });

    // Scroll to Top Button Script
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    function handleScroll() {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }

    window.addEventListener('scroll', handleScroll);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    handleScroll(); // Initial check in case the user starts at a scrolled position

    // Animation Trigger Script
    function applyAnimation(element) {
        const animationType = element.getAttribute('data-animate-type');
        const animationDelay = element.getAttribute('data-animate-delay');
        const animationTiming = element.getAttribute('data-animate-timing');

        element.style.animationDelay = `${animationDelay}ms`;
        element.style.animationTimingFunction = animationTiming;

        if (animationType === 'fade-in') {
            element.classList.add('fade-in');
        } else if (animationType === 'fadein-up') {
            element.classList.add('fadein-up');
        } else if (animationType === 'expand-in') {
            element.classList.add('expand-in');
        }
    }

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                applyAnimation(element);
                observer.unobserve(element); // Stop observing after animation starts
            }
        });
    }, { threshold: 0.3 }); // Adjust threshold as needed

    document.querySelectorAll('.animated').forEach(element => {
        animationObserver.observe(element);
    });
});

// Popup Script
function openDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
    }
}

function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    if (dialog) {
        dialog.close();
        document.body.style.overflow = 'auto';
    }
}


//Course Tabs Script
const openCourse = (evt, courseName) => {
    const courseContent = document.getElementById(courseName);
    const isMobile = window.innerWidth <= 768;
  
    if (isMobile) {
      // Create backdrop
      const backdrop = document.createElement('div');
      backdrop.classList.add('course-backdrop');
      document.body.appendChild(backdrop);
  
      // Show popup
      courseContent.classList.add('mobile-popup');
      courseContent.style.display = 'block';
  
      // Disable body scroll
      document.body.classList.add('popup-open');
  
      // Make sure close button is visible
      const closeButton = courseContent.querySelector('.close-course-popup');
      if (closeButton) {
        closeButton.style.display = 'block';
      }
    } else {
      // Desktop behavior
      const courseList = document.querySelectorAll(".course-list");
      courseList.forEach(content => content.style.display = "none");
      courseContent.style.display = "block";
    }
  
    // Remove "active" class from all tab links
    const courseTabs = document.querySelectorAll(".course-card");
    courseTabs.forEach(tab => tab.classList.remove("active"));
  
    // Add "active" class to the clicked tab link
    evt.currentTarget.classList.add("active");
  };
  
  const closePopup = () => {
    const popup = document.querySelector('.course-list.mobile-popup');
    if (popup) {
      popup.style.display = 'none';
      popup.classList.remove('mobile-popup');
    }
  
    // Remove backdrop
    const backdrop = document.querySelector('.course-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  
    // Re-enable body scroll
    document.body.classList.remove('popup-open');
  };
  
  const initializeTabs = () => {
    const firstTabLink = document.querySelector(".course-card");
    if (firstTabLink) {
      const firstTabContentId = firstTabLink.getAttribute("data-course");
      if (firstTabContentId) {
        if (window.innerWidth > 768) {
          openCourse({ currentTarget: firstTabLink }, firstTabContentId);
        } else {
          firstTabLink.classList.add("active");
        }
      }
    }
  };
  
  const attachTabEventListeners = () => {
    const tabs = document.querySelectorAll(".course-card");
    tabs.forEach(tab => {
      tab.addEventListener("click", (event) => {
        const courseId = tab.getAttribute("data-course");
        openCourse(event, courseId);
      });
    });
  
    const closeButtons = document.querySelectorAll(".close-course-popup");
    closeButtons.forEach(button => {
      button.addEventListener("click", closePopup);
    });
  };
  
  // Handle window resize
  const handleResize = () => {
    const isMobile = window.innerWidth <= 768;
    const popup = document.querySelector('.course-list.mobile-popup');
    
    if (!isMobile && popup) {
      closePopup();
      const activeTab = document.querySelector('.course-card.active');
      if (activeTab) {
        const courseId = activeTab.getAttribute("data-course");
        openCourse({ currentTarget: activeTab }, courseId);
      }
    } else if (isMobile) {
      const visibleCourseList = document.querySelector('.course-list[style="display: block;"]');
      if (visibleCourseList) {
        visibleCourseList.style.display = 'none';
      }
    }
  };
  
  // Run the initialization when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    initializeTabs();
    attachTabEventListeners();
    window.addEventListener('resize', handleResize);
    // Initial call to handleResize to set correct state on page load
    handleResize();
  });