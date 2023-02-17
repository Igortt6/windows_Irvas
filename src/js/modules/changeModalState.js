import checkNumInputs from "./checkNumInputs";
// Передаємо в стейт пустий обєкт modalState з main.Js. Вибираємо по селекторах, звікти ми будемо брати данні на сторінці. Валідуємо їх, окремою функцією checkNumInputs. За допомогою глобальної функції bindActionToElem: на певний нлнмент, навішує певний обробник, та записуе результат в стейт. Результат передається в main.js

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElem(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодне" : state[prop] = 'Тепле';
                            elem.forEach((box, j) => {
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            })
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT':
                        state[prop] = item.value;
                        break;
                }
                console.log(state);
            });
        });
    }
    function clearState(state) {
        state = '';
    };

    bindActionToElem('click', windowForm, 'form');
    bindActionToElem('input', windowWidth, 'width');
    bindActionToElem('input', windowHeight, 'height');
    bindActionToElem('change', windowType, 'type');
    bindActionToElem('change', windowProfile, 'profile');
};

export default changeModalState;