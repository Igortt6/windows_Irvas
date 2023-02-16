import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Завантаження...',
        success: 'Дякую, ми з вами звʼяжемось',
        fail: "Щось пішло не так..."
    }

    //  відправляемо данні на сервер, чекаємо відповіді. Переводимо відповідь у потрібний формат
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();


            // Створюемо, і розміщяемо блок зі статусом помилки
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            // FormData збирає всі дані з форми.
            const formData = new FormData(item);
            // Якщо це сама та форма. Розбираємо данні та записуемо ключ+значення у FormData
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }


            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.fail)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        })
    })
}
export default forms;