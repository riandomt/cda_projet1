function openDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');

    if (!isVisible(dropdownContent))
        Object.assign(dropdownContent.style, {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            top: "75px",
            backgroundColor: "#FFFFFF",
            padding: "25px",
            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)"
        }); else {
        dropdownContent.style.cssText = "display:none;";
    }
}

function openNavbar() {
    const navbar = document.querySelector('nav');
    if (!isVisible(navbar)) {
        Object.assign(navbar.style, {
            display: "flex",
            flexDirection: "column",
            position:"absolute",
            top:"100px"
        });
    } else {
        navbar.style.cssText = "display:none;";
    }
}

function isVisible(element) {
    return element.style.display === "none" ? false : true;
}