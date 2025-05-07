document.addEventListener("DOMContentLoaded", () => {
    // Animación al hacer scroll
    const animateElements = document.querySelectorAll(
      ".feature-card, .benefit-item, .problem-card, .problem-video-container, .map-card, .info-card, .app-download-container",
    )
  
    animateElements.forEach((element) => {
      element.classList.add("will-animate")
    })
  
    function checkIfInView() {
      const windowHeight = window.innerHeight
      const windowTopPosition = window.scrollY
      const windowBottomPosition = windowTopPosition + windowHeight
  
      animateElements.forEach((element) => {
        const elementHeight = element.offsetHeight
        const elementTopPosition = element.offsetTop
        const elementBottomPosition = elementTopPosition + elementHeight
  
        if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
          element.classList.add("animate")
        }
      })
    }
  
    window.addEventListener("scroll", checkIfInView)
    window.addEventListener("resize", checkIfInView)
  
    // Trigger once on load
    setTimeout(checkIfInView, 100)
  
    // Navegación de testimonios
    const testimonialSlides = document.querySelectorAll(".testimonial-slide")
    const testimonialNav = document.querySelector(".testimonial-nav")
  
    if (testimonialSlides.length > 0 && testimonialNav) {
      testimonialSlides.forEach((_, index) => {
        const button = document.createElement("button")
        button.setAttribute("aria-label", `Ver testimonio ${index + 1}`)
        if (index === 0) button.classList.add("active")
  
        button.addEventListener("click", () => {
          document.querySelectorAll(".testimonial-nav button").forEach((btn) => btn.classList.remove("active"))
          button.classList.add("active")
  
          const testimonialSlider = document.querySelector(".testimonial-slider")
          if (testimonialSlider) {
            testimonialSlider.scrollTo({
              left: testimonialSlides[index].offsetLeft,
              behavior: "smooth",
            })
          }
        })
  
        testimonialNav.appendChild(button)
      })
    }
  
    // Formulario de contacto
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Aquí iría la lógica para enviar el formulario
        alert("¡Gracias por contactarnos! Te responderemos a la brevedad.")
        contactForm.reset()
      })
    }
  })
  

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil responsive
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Cerrar el menú cuando se hace clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.checked = false;
        });
    });
    
    // Asegurarse de que el menú se muestre correctamente
    const navToggleLabel = document.querySelector('.nav-toggle-label');
    if (navToggleLabel) {
        navToggleLabel.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Testimonial slider
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const testimonialNav = document.querySelector('.testimonial-nav');
    let currentSlide = 0;

    // Crear botones de navegación para testimonios
    if (slider && testimonialNav && slides.length > 0) {
        // Limpiar cualquier botón existente
        testimonialNav.innerHTML = '';
        
        // Crear botones para cada slide
        slides.forEach((_, index) => {
            const button = document.createElement('button');
            button.setAttribute('aria-label', `Ver testimonio ${index + 1}`);
            if (index === 0) button.classList.add('active');
            
            button.addEventListener('click', () => {
                goToSlide(index);
            });
            
            testimonialNav.appendChild(button);
        });
        
        // Función para ir a un slide específico
        function goToSlide(n) {
            currentSlide = (n + slides.length) % slides.length;
            const offset = slides[currentSlide].offsetLeft;
            slider.scrollTo({
                left: offset,
                behavior: 'smooth'
            });
            
            // Actualizar botón activo
            document.querySelectorAll('.testimonial-nav button').forEach((btn, i) => {
                if (i === currentSlide) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
        
        // Detectar cambio de testimonio al desplazarse
        slider.addEventListener('scroll', () => {
            const index = Math.round(slider.scrollLeft / slider.clientWidth);
            if (index !== currentSlide) {
                currentSlide = index;
                document.querySelectorAll('.testimonial-nav button').forEach((btn, i) => {
                    if (i === currentSlide) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        });
    }

    // Intersection Observer para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .benefit-item, .location-card, .problem-card, .problem-video-container').forEach(el => {
        observer.observe(el);
        // Añadir clase para preparar la animación
        el.classList.add('will-animate');
    });

    // Smooth scrolling para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignorar enlaces al inicio de la página
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajustar el desplazamiento para tener en cuenta el header fijo
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
