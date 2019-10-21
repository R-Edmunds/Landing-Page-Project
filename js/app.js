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

// Build dummy sections

function addDummySections() {
  // add dummy sections to the main element
  const docFragment = document.createDocumentFragment();

  for (let i = 1; i <= 6; i++) {
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

addDummySections();


// Build menu

function generateLinks() {
  // query all section elements and generate nav links
  const allSections  = document.querySelectorAll("section");
  const docFragment = document.createDocumentFragment();

  for (i of allSections) {
    const newNavItem = document.createElement("li");
    const h2Text = i.querySelector("h2").textContent;
    newNavItem.innerHTML = (
      `<a href="#${i.id}" class="menu__link">${h2Text}</a>`
    );
    docFragment.appendChild(newNavItem);
  }

  const nav = document.querySelector("ul#navbar__list");
  nav.appendChild(docFragment);
}

generateLinks()

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

// addDummyLinks();

// Scroll to section on link click

// Set sections as active
