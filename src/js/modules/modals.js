const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeByOverlayOrEsc = true) {
        const triggers = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]');

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
        function ifEsc(e) {
            if (e.key === "Escape" && closeByOverlayOrEsc) {
                console.log('Escape :>> ');
                closePopup()
            }
        }
        function allPopup() {
            windows.forEach(item => {
                item.style.display = 'none';
            })
        }

        triggers.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) { // event.target - якщо існуе
                    e.preventDefault(); // відміняемо перезавантаження, при клікі не на кнопку(на лінк)
                }
                allPopup();
                openPopup();
            });
        });
        close.addEventListener('click', () => {

            allPopup();
            closePopup();
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeByOverlayOrEsc) {

                allPopup();
                closePopup()
            }
        })
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
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc .popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);

};

export default modals;