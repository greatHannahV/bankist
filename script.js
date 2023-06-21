'use strict';

///////////////////////////////////////

const header = document.querySelector('.header')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')


// Modal window
const openCloseModal = function(e) {
    e.preventDefault()
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
};
//an oldschool method that I hate

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openCloseModal);

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openCloseModal))

btnCloseModal.addEventListener('click', openCloseModal);
overlay.addEventListener('click', openCloseModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        openCloseModal();
    }
});

//cookie

const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookies for improving functionality and analytics. <button class ="btn btn--close-cookie">Got it! </button>'
header.append(message)
message.style.position = 'fixed';
message.style.bottom = '0';
message.style.left = '0';
message.style.zIndex = '2222'


document.querySelector('.btn--close-cookie').addEventListener('click', function() {
    message.remove()
});

//Styles
const massageWidth = document.body.getBoundingClientRect().width
message.style.backgroundColor = '#37383d'
message.style.width = '100%'
    // message.style.transform = "skewX(-15deg)";
    // console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
message.style.padding = '5px 10px'
    // document.documentElement.style.setProperty('--color-primary', 'pink')

//smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')
btnScrollTo.addEventListener('click', function(e) {
    const s1coords = section1.getBoundingClientRect();

    section1.scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        let headerCoord = header.getBoundingClientRect()
        window.scrollTo({
            left: headerCoord.left + window.pageXOffset,
            top: headerCoord.top + window.pageYOffset,
            behavior: 'smooth'
        })
    }
})

//the page navigation bubbleup--event elegetion:

// document.querySelectorAll('.nav__link').forEach(function(el) {
//     el.addEventListener('click', function(e) {
//         e.preventDefault();
//         const id = this.getAttribute('href')
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' })

//     })
// })
document.querySelector('.nav__links').addEventListener('click', function(e) {
        // console.log(e.target);
        e.preventDefault();
        //matching strategy
        if (e.target.classList.contains('nav__link')) {
            const id = e.target.getAttribute('href')
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
        }
    })
    /////////////////
    ////////////////
    //section2
    //tabbbed component
tabsContainer.addEventListener('click', function(e) {

    const clicked = e.target.closest('.operations__tab');

    //guard clause
    if (!clicked) return;
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active');

    //activate content area
    tabsContent.forEach(e => e.classList.remove('operations__content--active'))
    document.querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active')


})

//MENY FADE ANIMATION
const handleHover = function(e) {
        if (e.target.classList.contains('nav__link')) {
            const link = e.target;
            const siblings = link.closest('.nav').querySelectorAll('.nav__link')
            const logo = link.closest('.nav').querySelector('img')

            siblings.forEach(el => {
                if (el != link) el.style.opacity = this

            })
            logo.style.opacity = this

        }

    }
    // nav.addEventListener('mouseover', function(e) {
    //     handleHover(e, 0.5)
    // })
    // nav.addEventListener('mouseout', function(e) {
    //     handleHover(e, 1)
    // })

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

//STICKY NAVIGATION

// window.addEventListener("scroll", function() {
//     const initialCoord = section1.getBoundingClientRect()
//     if (this.window.screenY > initialCoord.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');

// })

///API
// const obsCallBack = function(entries, observer) {
//     entries.forEach(entry => {
//         console.log(entry);
//     })
// }
// const obsOption = {
//     root: null,
//     threshold: [0, 0.2]

// }

// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(section1)
const mobileNav = document.querySelector('.mobile-nav')
const navHeigth = nav.getBoundingClientRect().height
const navHeigthMob = mobileNav.getBoundingClientRect().height

const stickyNavMob = function(entries) {
    const [entry] = entries
    if (!entry.isIntersecting) {
        mobileNav.classList.add('sticky');
    } else {
        mobileNav.classList.remove('sticky');
    }
}
const headerObserverMob = new IntersectionObserver(stickyNavMob, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeigthMob}px`,
});

headerObserverMob.observe(header)

const stickyNav = function(entries) {
    const [entry] = entries
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
}
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeigth}px`,
});
headerObserver.observe(header)

//API FOR ALL SECTIONS
const allSection = document.querySelectorAll('.section')
const revealSection = function(entries, observer) {
    const [entry] = entries

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target)

}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15, //15% visible
})

allSection.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden')
})

//LAZY LOADING IMGS

const imgTargets = document.querySelectorAll('img[data-src]')

const revealImages = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    //replace src with dataset
    entry.target.src = entry.target.dataset.src
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)

}
const imagesObserver = new IntersectionObserver(revealImages, {
    root: null,
    threshold: 0.1,
    rootMargin: '200px'
})
imgTargets.forEach(img => {
        imagesObserver.observe(img)
    })
    ///////////////////
    //SLIDER
    ///////////////////
const slider = function() {

    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotsContainer = document.querySelector('.dots')


    //FUNCTIONS
    //dots
    const creatDots = function() {
        slides.forEach((_, i) => {
            dotsContainer.insertAdjacentHTML('beforeend',
                `<button class="dots__dot" data-slide=${i} ></button>`)
        })
    }

    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'))
        document.querySelector(`.dots__dot[data-slide="${slide}"]
    `).classList.add('dots__dot--active')
    }
    let curSlide = 0;
    const maxSlide = slides.length;

    const goToSlide = function(slide) {
        slides.forEach((s, i) => s.style.transform = `translateX(${100*(i-slide)}%)`);
    }


    //Next slider
    const nextSlide = function() {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;

        }
        goToSlide(curSlide);
        activateDot(curSlide)


    }
    btnRight.addEventListener('click', nextSlide)

    //previos slider
    const prevSlide = function() {
        if (curSlide === 0) {
            curSlide = maxSlide - 1
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide)
    }
    btnLeft.addEventListener('click', prevSlide)

    //init
    const init = function() {
        //first positions
        goToSlide(0);
        creatDots();
        activateDot(0);
    }
    init()

    //same with arrows keys
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });

    //dots *clicked one
    dotsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot')) {
            // const slide =e.target.dataset.slide
            const { slide } = e.target.dataset;
            goToSlide(slide)
            activateDot(slide)

        }
    })
}
slider()

///navigation
const btnNavMob = document.querySelector('.btn-mob-nav');
const iconsMobNac = document.querySelectorAll('.icon-mob-nav');
const mobNav = document.querySelector('.mobile-nav');
const navOpenLinks = document.querySelectorAll(".nav__link")

function toggleNavOpen() {
    iconsMobNac.forEach(el => {
        if (el.classList.contains("icon-mob-nav") && el.getAttribute("name") === "menu-outline") {
            el.classList.toggle('nav-open');
        }
        if (el.classList.contains("icon-mob-nav") && el.getAttribute("name") === "close-outline") {
            el.classList.toggle('nav-open');
        }
    });
}

btnNavMob.addEventListener('click', function() {
    const body = document.querySelector('body');
    body.classList.toggle('lock');
    nav.classList.toggle('nav-open');
    mobNav.classList.toggle('nav-open');

    toggleNavOpen()


});
navOpenLinks.forEach(el => {
    el.addEventListener('click', function() {
        mobNav.classList.toggle('nav-open');
        nav.classList.toggle('nav-open');
        toggleNavOpen()
    })
})

///////////
////////////////
// document.addEventListener('DOMContentLoaded', function(e) {
//     console.log('html has loaded', e);
// })

//////////////////
///////////////////
//header nav rgb(5, 145, 176)

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`


// document.querySelector('.nav__link').addEventListener('click', function(e) {
//     const addColor = document.querySelector('.nav__link')
//     this.style.backgroundColor = randomColor()
//     e.stopPropagation()
// })
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//     const addColor = document.querySelector('.nav__link')
//     this.style.backgroundColor = randomColor()
// })
// document.querySelector('.nav').addEventListener('click', function(e) {
//     const addColor = document.querySelector('.nav__link')
//     this.style.backgroundColor = randomColor()
// })