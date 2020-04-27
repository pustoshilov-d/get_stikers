let token = "";
let captcha_sid = null;

function capcha_enter() {
    try{
        let capcha = document.getElementById("capcha");
        let input = document.getElementById("input");
        capcha.setAttribute("hidden", "true");
        stiker2(token,input.value);
        input.value = "";
    }
    catch (e) {
        console.log(e);
        let error = document.getElementById("error");
        error.innerText += "\n\n" + JSON.stringify(e);
    }
}

function stiker2(token, captcha_key) {
    console.log('капча дата', captcha_key,captcha_sid);
    vkBridge.send("VKWebAppCallAPIMethod", {
        "method": "execute.getStikers_two",
        "params": {"captcha_key": captcha_key, "captcha_sid": captcha_sid, "v": 5.103, "access_token": token}
    })
        .then(res => {
            console.log('пак 2', res);
        })
        .catch(e =>{
            console.log("ошибка ебаная 2",e);
            let error = document.getElementById("error");
            error.innerText += "\n\n" + JSON.stringify(e);

            if (e.error_data.error_reason.error_code === 14) {
                let link = document.getElementById("link");
                link.setAttribute("hidden","true");

                let captcha_img = e.error_data.error_reason.captcha_img;
                captcha_sid = e.error_data.error_reason.captcha_sid;

                let status = document.getElementById("status");
                status.innerText = "Введи капчу";
                capcha.removeAttribute("hidden");

                let img = document.getElementById("img");
                img.setAttribute("src",captcha_img);
            }

        });

    let status = document.getElementById("status");
    status.innerText = "Стикеры загружены. Проверяй";
    link.removeAttribute("hidden");
    link.innerText = "свои документы";
}

function get_stikers(token) {
    try {
        vkBridge.send("VKWebAppCallAPIMethod", {
            "method": "execute.getStikers",
            "params": {"v": 5.103, "access_token": token}
        })
            .then(res => {
                console.log('пак 1', res);
            })
            .catch(e => {
            console.log("ошибка",e);
            let error = document.getElementById("error");
            error.innerText += "\n\n" + JSON.stringify(e);
            });
        setTimeout(stiker2,1500,token);
    }
    catch (e) {
        console.log("ошибка",e);
        let error = document.getElementById("error");
        error.innerText += "\n\n" + JSON.stringify(e);
    }
}



function  initApi() {
    try {
        let status = document.getElementById("status");
        let link = document.getElementById("link");
        let btn_get = document.getElementById("btn_get");
        // btn_get.setAttribute("hidden", "true");

        status.innerText = "Загружаем стикеры";
        console.log("страница загружена");
        vkBridge.send('VKWebAppInit', {});
        vkBridge
            .send('VKWebAppGetAuthToken', {"app_id": 7432901, "scope": "docs"})
            .then(async res => {
                console.log(res);
                token = res.access_token;

                await get_stikers(token, null);
            })
    }

    catch (e) {
        console.log('ошибка ёпта', e);
        let error = document.getElementById("error");
        error.innerText += "\n\n" + JSON.stringify(e);
    }
}

