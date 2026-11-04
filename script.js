// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('INCD Studio website loaded successfully!');

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                navMenu.classList.remove('active');

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Contact modal functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactModal();
    }
});

// Video switcher function
function switchVideo(index, videoId, title, description) {
    // Update the main video player
    const videoPlayer = document.getElementById('mainVideoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');

    // Update iframe src
    videoPlayer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

    // Update title and description
    videoTitle.textContent = title;
    videoDescription.textContent = description;

    // Update active state on thumbnails
    const thumbnails = document.querySelectorAll('.video-thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });

    // Smooth scroll to video player
    document.getElementById('video').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Contact form submission handler
function handleSubmit(event) {
    event.preventDefault();

    // Validate captcha
    const captchaInput = document.getElementById('captcha');
    const captchaError = document.getElementById('captchaError');
    const captchaValue = captchaInput.value.trim();

    // Check if answer is correct (5 + 3 = 8)
    if (captchaValue !== '8') {
        captchaError.classList.add('active');
        captchaInput.focus();
        return false;
    } else {
        captchaError.classList.remove('active');
    }

    // Get form data
    const formData = {
        nome: document.getElementById('nome').value,
        cognome: document.getElementById('cognome').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        servizio: document.getElementById('servizio').value,
        messaggio: document.getElementById('messaggio').value
    };

    // Here you would normally send the data to your server
    console.log('Form submitted:', formData);

    // Show success message (you can customize this)
    alert('Grazie per averci contattato! Ti risponderemo al più presto.');

    // Reset form and close modal
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }

    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    return false;
}

// Discography carousel scroll function
function scrollDiscography(direction) {
    const carousel = document.getElementById('discographyCarousel');
    const scrollAmount = 320; // Width of one item + margin

    if (carousel) {
        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Auto-scroll discography carousel
let discographyAutoScroll;

function startDiscographyAutoScroll() {
    const carousel = document.getElementById('discographyCarousel');
    if (!carousel) return;

    discographyAutoScroll = setInterval(() => {
        // Check if we've reached the end
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
            // Reset to beginning
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Scroll to next item
            scrollDiscography(1);
        }
    }, 3000); // Scroll every 3 seconds
}

// Stop auto-scroll on hover
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('discographyCarousel');
    if (carousel) {
        // Start auto-scroll
        startDiscographyAutoScroll();

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(discographyAutoScroll);
        });

        // Resume on mouse leave
        carousel.addEventListener('mouseleave', () => {
            startDiscographyAutoScroll();
        });
    }
});

// Lightbox functions for discography images
function openLightbox(imageSrc, altText) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    lightboxImage.src = imageSrc;
    lightboxImage.alt = altText;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close lightbox on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
        closeVideoLightbox(event);
    }
});

// Video Gallery Carousel scroll function
function scrollVideoGallery(direction) {
    const carousel = document.getElementById('videoGalleryCarousel');
    const scrollAmount = 420; // Width of one item + gap

    if (carousel) {
        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Video Lightbox functions
function openVideoLightbox(videoId, title) {
    const lightbox = document.getElementById('videoLightbox');
    const content = document.getElementById('videoLightboxContent');

    // Create iframe with autoplay
    content.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoLightbox(event) {
    const lightbox = document.getElementById('videoLightbox');
    const content = document.getElementById('videoLightboxContent');

    // Only close if clicking on the background or close button, not the video
    if (event && event.target !== lightbox && !event.target.classList.contains('lightbox-close')) {
        return;
    }

    lightbox.classList.remove('active');
    content.innerHTML = ''; // Stop video playback
    document.body.style.overflow = '';
}

// Auto-scroll video gallery
let videoGalleryAutoScroll;

function startVideoGalleryAutoScroll() {
    const carousel = document.getElementById('videoGalleryCarousel');
    if (!carousel) return;

    videoGalleryAutoScroll = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            scrollVideoGallery(1);
        }
    }, 4000); // Scroll every 4 seconds
}

// Setup video gallery auto-scroll
document.addEventListener('DOMContentLoaded', function() {
    const videoCarousel = document.getElementById('videoGalleryCarousel');
    if (videoCarousel) {
        startVideoGalleryAutoScroll();

        videoCarousel.addEventListener('mouseenter', () => {
            clearInterval(videoGalleryAutoScroll);
        });

        videoCarousel.addEventListener('mouseleave', () => {
            startVideoGalleryAutoScroll();
        });
    }
});

// Equipment Carousel scroll function
function scrollEquipment(direction) {
    var carousel = document.getElementById('equipmentCarousel');
    if (carousel) {
        carousel.scrollLeft += direction * 420;
    }
}

function openEquipmentLightbox(title, key) {
    var lightbox = document.getElementById('equipmentLightbox');
    var titleEl = document.getElementById('equipmentLightboxTitle');
    var contentEl = document.getElementById('equipmentLightboxContent');
    var items = equipmentData[key];
    if (!items) return;
    titleEl.textContent = title;
    contentEl.innerHTML = '<ul>' + items.map(function(item) { return '<li>' + item + '</li>'; }).join('') + '</ul>';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEquipmentLightbox(event) {
    if (event) event.stopPropagation();
    var lightbox = document.getElementById('equipmentLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Equipment data
const equipmentData = {
    microfoni: [
        '2x Neumann U87 AI', '2x Neumann TLM 103', '4x Neumann KMS 105',
        '2x SCHOEPS CMC 6 + Capsule MK 2', '2x Bluebird Blue SL', '1x Bluebird Blue',
        '2x AKG C1000 S', '1x Behringer T1', '1x Behringer B2',
        '4x Shure SM 58', '4x Shure SM 57', '6x Behringer C2',
        '1x AKG Drum Kit', '1x Sennheiser Drum Kit', '2x Sennheiser E 945',
        '1x Sennheiser MD 441 U', '1x Sennheiser MKH 816', '1x Sennheiser MKH 815',
        '4x Radiomicrofoni Soundsation archetti WF-U216', '4x Radiomicrofoni Soundsation gelato WF-U216',
        '1x Radiomicrofono Sennheiser E 835 gelato', '4x Radiomicrofoni LEM Wireless System L2000 archetti',
        '1x Disco di Jacklin', '1x Mini DSP Binaural System',
        '2x Teste registrazioni binaurali con microfoni Sanken Cos 11D',
        '1x Testa registrazioni binaurali con microfoni Monacor Electrect'
    ],
    processori: [
        'Mixer Behringer X32', 'Mixer Behringer X32 Compact', 'Mixer Behringer X32 Rack',
        'Mixer Zoom Livetrack L20', 'Mixer Zoom Livetrack L12', 'Stagebox Digitale Behringer S16',
        'Consolle DJ Pioneer Pro Opus Quad', '2x Amplificatori per basso Laney Nexus Tube 800W',
        '1x Amplificatore per chitarra vintage Vox valvolare 100W',
        'Studer A812 MKII con Dolby Spectral Recording 350', 'TEAC 3440 4 tracce con DBX DX4D',
        'Nagra 4.2', 'Apogee Rosetta 200', 'Millennia HV-3C'
    ],
    daw: [
        'Logic XI', 'Cubase', 'Ableton Live', 'Studio One', 'MuseScore', 'Sibelius',
        'DaVinci Resolve Pro', 'PhotoScore', 'Melodyne', 'Musio', 'Note Performer', 'All Plugin DSP'
    ],
    monitoring: [
        'Genelec 8250 con Autocal', 'KRK VXT 8', 'Bose F1 812 con subwoofer F1',
        '2x Turbosound TQ440 SP', '2x Subwoofer Mackie HD 1501',
        'Sistema servizio customer: Logitech THX 2+1 Z623',
        'Sistema ascolti cuffie per 10 utenze Behringer Mini Amp'
    ],
    strumenti: [
        'Pianoforte a coda Petrov', 'Yamaha S90ES', 'Studiologic Numa Piano GT',
        'Arturia Keylab 61 Essential', 'Tastiera Yamaha PSR 620',
        'Batterie complete Yamaha e Tama con octoban', 'Vari tipi di piatti e rullanti a richiesta',
        'Chitarre classiche e acustiche: Fender, Gibson, Morris, Epiphone', 'Chitarre di liuteria'
    ],
    servicelive: [
        'Mixer 2x Yamaha QL5', 'Mixer 2x Yamaha DM3', 'Mixer 2x Yamaha DM7',
        'Vari modelli Yamaha precedenti', 'Sistemi PA FBT Array Mitus varie serie',
        'Sistemi Yamaha con molti modelli di sub', 'Sistemi di varie potenze da 1000W a 50.000W'
    ]
};

// Services Carousel scroll function
function scrollServices(direction) {
    const carousel = document.getElementById('servicesCarousel');
    const scrollAmount = 420; // Width of one item + gap

    if (carousel) {
        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Service Lightbox functions
function openServiceLightbox(title, text) {
    const lightbox = document.getElementById('serviceLightbox');
    const titleEl = document.getElementById('serviceLightboxTitle');
    const textEl = document.getElementById('serviceLightboxText');

    titleEl.textContent = title;
    textEl.textContent = text;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceLightbox(event) {
    const lightbox = document.getElementById('serviceLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close service lightbox on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServiceLightbox();
    }
});


// Partners Carousel scroll function
function scrollPartners(direction) {
    const carousel = document.getElementById('partnersCarousel');
    const scrollAmount = 220; // Width of one item + gap

    if (carousel) {
        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Auto-scroll partners carousel
let partnersAutoScroll;

function startPartnersAutoScroll() {
    const carousel = document.getElementById('partnersCarousel');
    if (!carousel) return;

    partnersAutoScroll = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            scrollPartners(1);
        }
    }, 3000);
}

// Setup partners auto-scroll
document.addEventListener('DOMContentLoaded', function() {
    const partnersCarousel = document.getElementById('partnersCarousel');
    if (partnersCarousel) {
        startPartnersAutoScroll();

        partnersCarousel.addEventListener('mouseenter', () => {
            clearInterval(partnersAutoScroll);
        });

        partnersCarousel.addEventListener('mouseleave', () => {
            startPartnersAutoScroll();
        });
    }
});
