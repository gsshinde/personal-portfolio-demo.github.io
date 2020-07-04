const changeTheme = () => {
    if (localStorage.getItem('_themeColor') != null) {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('_themeColor').toString())
    } else {
        document.documentElement.setAttribute('data-theme', 'pink')
    }
    var colorChange = document.querySelectorAll('.icon-bar .color-palette > a');
    const span = document.querySelector('.right-arrow span');
    const iconBar = document.querySelector('.icon-bar');
    colorChange.forEach(element => {
        element.addEventListener('click', function() {
            if (element.className === 'pink') {
                document.documentElement.setAttribute('data-theme', 'pink')
                localStorage.setItem('_themeColor', 'pink');
            } else if (element.className === 'orange') {
                document.documentElement.setAttribute('data-theme', 'orange')
                localStorage.setItem('_themeColor', 'orange');
            } else if (element.className === 'green') {
                document.documentElement.setAttribute('data-theme', 'green')
                localStorage.setItem('_themeColor', 'green');
            } else if (element.className === 'blue') {
                document.documentElement.setAttribute('data-theme', 'blue')
                localStorage.setItem('_themeColor', 'blue');
            } else if (element.className === 'purple') {
                document.documentElement.setAttribute('data-theme', 'purple')
                localStorage.setItem('_themeColor', 'purple');
            }

            iconBar.classList.toggle('icon-bar-active');
            span.classList.remove('fa', 'fa-angle-double-left');
            span.classList.add('fa', 'fa-angle-double-right');
        })
    });
}

const trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

const onClickSiideIconsbar = () => {
    const span = document.querySelector('.right-arrow span');
    const iconBar = document.querySelector('.icon-bar');
    span.addEventListener('click', () => {
        iconBar.classList.toggle('icon-bar-active');
        if (iconBar.className.includes('icon-bar-active')) {
            span.classList.remove('fa', 'fa-angle-double-right');
            span.classList.add('fa', 'fa-angle-double-left');
        } else {
            span.classList.remove('fa', 'fa-angle-double-left');
            span.classList.add('fa', 'fa-angle-double-right');
        }
    })
}

class TypeWriter {
    constructor(txtElement, words, wait = 1000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 300;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

const navSlide = () => {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active')
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        })

        burger.classList.toggle('toggle')
    })


}

const navBackground = () => {
    const nav = document.querySelector('nav');
    window.addEventListener("scroll", function(event) {
        var scroll = this.scrollY;
        if (scroll > 300) {
            nav.style.backgroundColor = 'rgb(60, 60, 60)';
        } else {
            nav.style.backgroundColor = 'transparent';
        }
    });
}

const closeNav = () => {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks_a = document.querySelectorAll('.nav-links .nav-link a');
    const navLinks = document.querySelectorAll('.nav-links li');

    navLinks_a.forEach(element => {
        element.addEventListener('click', () => {
            nav.classList.toggle('nav-active')
            burger.classList.toggle('toggle')
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            })
        })
    });
}


AOS.init({
    duration: 1000
})

navSlide();
navBackground();
closeNav();
changeTheme();
onClickSiideIconsbar();