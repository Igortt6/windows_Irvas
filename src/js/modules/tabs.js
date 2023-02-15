const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContant() {
        content.forEach(item => {
            item.style.display = "none";
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    };

    function showTabContant(i = 0) {
        content[i].style.display = "block";
        tab[i].classList.add(activeClass);
    };

    hideTabContant();
    showTabContant();

    header.addEventListener('click', (e) => {
        const target = e.target;

        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContant();
                    showTabContant(i);
                }
            })
        }
    })

}
export default tabs;