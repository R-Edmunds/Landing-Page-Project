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


/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

function addDummyLinks() {
  // add dummy li links to nav element
  const docFragment = document.createDocumentFragment();

  for (let i = 1; i <= 6; i++) {
    const newNavItem = document.createElement("li");
    newNavItem.innerHTML = `<a href="#section${i}" class="menu__link">Section ${i}</a>`
    docFragment.appendChild(newNavItem);
  }

  const nav = document.querySelector("ul#navbar__list");
  nav.appendChild(docFragment);
}

addDummyLinks();

// Scroll to section on link click

// Set sections as active
