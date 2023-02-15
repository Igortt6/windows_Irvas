const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        const triggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);

        triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { // event.target - якщо існуе
                    e.preventDefault(); // відміняемо перезавантаження, при клікі не на кнопку(на лінк)
                }
                openPopup();
            });
        });
        close.addEventListener('click', () => {
            closePopup()
        });
        function openPopup() {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            // document.body.classList.add('modal-open');
            document.addEventListener(`keydown`, ifEsc)
        }
        function closePopup() {
            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
            document.removeEventListener(`keydown`, ifEsc)
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closePopup()
                // document.body.classList.remove('modal-open');
            }
        })
        function ifEsc(e) {
            if (e.key === "Escape") {
                console.log('Escape :>> ');
                closePopup()
            }
        }

    }

    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "hidden";
            document.addEventListener('keydown', ifEsc)

            function ifEsc(e) {
                if (e.key === "Escape") {
                    console.log('Escape :>> ');
                    document.querySelector(selector).style.display = "none";
                    document.body.style.overflow = "";
                    document.removeEventListener('keydown', ifEsc)
                }
            }
        }, time)

    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    // showModalByTime('.popup', 60000);

};


export default modals;