/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/

const dummySectionCount = 6;


/**
 * End Global Variables
 * Start Helper Functions
 *
*/

// return object containing centre of element relative to top of viewport, and element id
function getElementPosition(element) {
  const top = element.getBoundingClientRect().top;
  const bottom = element.getBoundingClientRect().bottom;
  const centre = (bottom - top) / 2 + top;
  return {id: element.id, yCentre: centre};
}

// toggle nav link active class
function toggleLinkActive(id) {
  const anchors = document.querySelectorAll("nav a.menu__link");
  for (anchor of anchors) {
    anchor.classList.remove("link__active");
    const href = anchor.getAttribute("href");
    if (href === "#" + id) {
      anchor.classList.add("link__active");
    }
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build n dummy sections to main element with for loop
function addDummySections(n) {
  const docFragment = document.createDocumentFragment();
  for (let i = 1; i <= n; i++) {
    const newSectionElement = document.createElement("section");
    newSectionElement.innerHTML = (
      `
      <div class="landing__container">
        <h2>Section ${i}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>
      `
    );
    newSectionElement.id = `section${i}`;
    newSectionElement.setAttribute("data-nav", `Section ${i}`);
    docFragment.appendChild(newSectionElement);
  }
  const main = document.querySelector("main");
  main.appendChild(docFragment);
}

addDummySections(dummySectionCount);


// generate nav links from DOM section elements
function generateLinks() {
  const allSections  = document.querySelectorAll("section");
  const docFragment = document.createDocumentFragment();
  for (i of allSections) {
    const newNavItem = document.createElement("li");
    const h2Text = i.querySelector("h2").textContent;
    newNavItem.innerHTML = (
      `<a href="#${i.id}" class="menu__link" data-nav="${h2Text}">${h2Text}</a>`
    );
    docFragment.appendChild(newNavItem);
  }
  const nav = document.querySelector("ul#navbar__list");
  nav.appendChild(docFragment);
}

generateLinks();


// Add "section-active" class to section when visible in viewport
// check that the element centre, is inside the middle 2 quarters of viewport
function elementActiveToggle() {
  function getSectionPositions() {
    // get sections, build obj array from getElementPosition(element) func
    const sections = document.querySelectorAll("main section");
    let sectionCentres = [];
    for (i of sections) {
      sectionCentres.push(getElementPosition(i));
    }
    return sectionCentres;
  }

  const viewportHeight = window.innerHeight;
  const middleHalf = {top: viewportHeight / 4, bottom: (viewportHeight / 4) * 3};
  for (section of getSectionPositions()) {
    const e = document.querySelector(`main section#${section.id}`);
    if (section.yCentre > middleHalf.top && section.yCentre < middleHalf.bottom) {
      e.classList.add("section-active");
      toggleLinkActive(section.id);
    } else {
      e.classList.remove("section-active");
    }
  }
}


// Scroll to anchor ID using scrollIntoView event
function scrollToSection(event) {
  if (event.target.nodeName === "a".toUpperCase()) {
    event.preventDefault();  // prevent normal href behavior
    const dataNav = event.target.getAttribute("data-nav");
    // get all sections, match data-nav, scroll to location
    const sections = document.querySelectorAll("section");
    for (section of sections) {
      if (section.getAttribute("data-nav") === dataNav) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  }
}


// hide nav bar after n seconds of no scrolling

function hideNav() {
  // on scroll, make nav visible, start timer. when timer expires hide nav
  const header = document.querySelector("header.page__header");
  if (header.classList.contains("page__header__hide")) {
    header.classList.toggle("page__header__hide");
    function delayedHide() {
      header.classList.toggle("page__header__hide");
    }
    window.setTimeout(function () {delayedHide()}, 4000);
  }
}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section on link click
function scrollToSectionEvent() {
  const nav = document.querySelector("ul#navbar__list");
  nav.addEventListener("click", function () {
    window.setTimeout(scrollToSection(event), 0);
  });
}

scrollToSectionEvent();


// Set sections as active when in viewport
function elementActiveEvent() {
  document.addEventListener("scroll", function() {
    window.setTimeout(elementActiveToggle(), 0);
  });
}

elementActiveEvent();


// hide nav on scroll
function hideNavEvent() {
  document.addEventListener("scroll", function() {
    window.setTimeout(hideNav(), 0);
  });
}

hideNavEvent();
