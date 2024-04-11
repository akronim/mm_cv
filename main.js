const menuItems = document.querySelectorAll("span[id^='section__']");
const header = document.getElementById("header");
const contentSections = document.querySelectorAll('div[class*="section__"]');
const lastSection = document.querySelector('div[class*="section__other"]');
const contentContainer = document.getElementById("content");
const progressBar = document.getElementById("progressBar");
const content = document.getElementById("content");
const SCROLL_OFFSET = 10;

(function () {
    attachEventListeners();
    setContentHeight();
    setContentTopMargin();

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);
            scrollToSection(0);
        }
    }, 50);
})()

function setContentHeight() {
    const lastSectionHeight = lastSection.clientHeight;
    const contentHeight = content.scrollHeight;
    content.style.height = contentHeight + window.innerHeight - lastSectionHeight - header.clientHeight + "px";
}

function setContentTopMargin() {
    const topMargin = header.clientHeight + 0.5 * parseFloat(getComputedStyle(document.documentElement).fontSize) + "px";
    content.style.marginTop = topMargin;
}

function attachEventListeners() {
    menuItems.forEach(item => {
        item.addEventListener('click', onMenuItemClick);
    });
}

function onMenuItemClick() {
    menuItems.forEach(item => {
        item.classList.remove('nav__item--selected');
    });

    this.classList.add('nav__item--selected');

    const targetSectionClass = "." + this.id;
    const targetSection = document.querySelector(targetSectionClass);
    const top = targetSection.offsetTop - header.offsetHeight - 10;

    scrollToSection(top);
}

function scrollToSection(top) {
    if ('scroll' in window && window.scroll !== undefined) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: top
        });
    } else {
        window.scrollTo(0, top);
    }
}
