let token = "";
let captcha_sid = null;

function capcha_enter() {
    try{
        let capcha = document.getElementById("capcha");
        let input = document.getElementById("input");
        capcha.setAttribute("hidden","hidden");
        get_stikers(token,input.value);
    }
    catch (e) {
        console.log(e)
    }
}

function get_stikers(token, captcha_key) {
    try {
        vkBridge.send("VKWebAppCallAPIMethod", {
            "method": "execute.getStikers",
            "params": {"v": 5.103, "access_token": token},
            "captcha_key": captcha_key
        })
            .then(res => {
                console.log('пак 1', res);
            });
        vkBridge.send("VKWebAppCallAPIMethod", {
            "method": "execute.getStikers_two",
            "params": {"v": 5.103, "access_token": token},
            "captcha_key": captcha_key
        })
            .then(res => {
                console.log('пак 2', res);
            });
    }
    catch (e) {
        console.log(e);
        //14
        let captcha_img = "";
        captcha_sid = "";
        let status = document.getElementById("status");
        status.innerText = "Введи капчу";
        capcha.removeAttribute("hidden");
        let img = document.getElementById("img");

        img.setAttribute("scr",captcha_img);


/////////////
    }
}


function  initApi() {
    try {
        let status = document.getElementById("status");
        let link = document.getElementById("link");
        let btn_get = document.getElementById("btn_get");
        btn_get.setAttribute("hidden", "hidden");
        status.innerText = "Загружаем стикеры";
        console.log("страница загружена");
        vkBridge.send('VKWebAppInit', {});
        vkBridge
            .send('VKWebAppGetAuthToken', {"app_id": 7432901, "scope": "docs"})
            .then(async res => {
                console.log(res);
                token = res.access_token;

                await get_stikers(token, null);

                status.innerText = "Стикеры загружены. Проверяй";
                link.innerText = "свои документы";
            })
    }

    catch (e) {
        console.log('ошибка ёпта', e);
        let status = document.getElementById("status");
        status.innerText = "Ошибка :( " + e;
    }
}

