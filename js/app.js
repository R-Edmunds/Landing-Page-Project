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

// toggle link active attr
function toggleLinkActive(id) {
  const anchors = document.querySelectorAll("nav a.menu__link");
  for (anchor of anchors) {
    const url = anchor.getAttribute("href");
    if (url === "#" + id) {
      anchor.classList.add("link__active");
    } else {
      anchor.classList.remove("link__active");
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


// Add class 'active' to section when near top of viewport
// check that the element centre, is inside the middle third of viewport
function elementActiveToggle() {
  function getSectionPositions() {
    // query section, build list from getElementPosition(element) func
    const sections = document.querySelectorAll("main section");
    let sectionCentres = [];
    for (i of sections) {
      sectionCentres.push(getElementPosition(i));
    }
    return sectionCentres;
  }

  const middleThird = {top: window.innerHeight / 3, bottom: (window.innerHeight / 3) * 2};
  for (section of getSectionPositions()) {
    const e = document.querySelector(`main section#${section.id}`);
    if (section.yCentre > middleThird.top && section.yCentre < middleThird.bottom) {
      e.classList.add("your-active-class");
      toggleLinkActive(section.id);
    } else {
      e.classList.remove("your-active-class");
    }
  }
}


// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
  if (event.target.nodeName === "a".toUpperCase()) {
    event.preventDefault();  // prevent normal href behavior
    const dataNav = event.target.getAttribute("data-nav");
    // get all sections, match data-nav, scroll to location
    const sections = document.querySelectorAll("section");
    for (section of sections) {
      if (section.getAttribute("data-nav") === dataNav) {
        const body = document.querySelector("body");
        const bodyRect = body.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const offset = sectionRect.top - bodyRect.top;
        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    }
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
  nav.addEventListener("click", function (event) {
    scrollToSection(event); }
  );
}

scrollToSectionEvent()


// Set sections as active
function elementActiveEvent() {
  document.addEventListener("scroll", function() {
    window.setTimeout(elementActiveToggle(), 0);
  });
}

elementActiveEvent();
