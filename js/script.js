// toggle icon nav jsdhajksdhkad
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height ) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle and navbar onclick link scroll yarn
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

    // scroll reveal
    ScrollReveal({
        // reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.home-content, .about-content, .heading, .portfolio-text, .tab-bar', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.about-img', { origin: 'left' });

    // typed js 
    const typed = new Typed('.multiple-text', {
        strings: ['Web Developer', 'Video Editor', 'Graphic Designer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    // tab-nav
    function filterProjects(category) {
        var projects = document.querySelectorAll('.portfolio-box');
        projects.forEach(function (project) {
            project.style.display = 'none';
        });
        
    var filteredProjects = document.querySelectorAll('.portfolio-box.' + category);
    filteredProjects.forEach(function (project) {
        project.style.display = 'block';
        project.style.opacity = 1;
        
    });

    // Update the active tab
    var tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(function (tab) {
        tab.classList.remove('active');
    });

    var activeTab = document.querySelector('.tab-button[onclick="filterProjects(\'' + category + '\')"]');
    activeTab.classList.add('active');
}

    // Set default category and activate corresponding tab
    var defaultCategory = 'video-edit';
    filterProjects(defaultCategory);

    document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    };

    fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log(data);
        // You can add additional logic here based on the server response
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
    });

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };
    
        fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            console.log(data);
            // You can add additional logic here based on the server response
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
    });

});

    

