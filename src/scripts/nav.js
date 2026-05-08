const navLinks = document.querySelector.SelectorAll("[data-navLink]");

navLinks.forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname){
        link.setAttribute("aria-current","page");
    }

})