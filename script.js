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

async function stiker2(token, captcha_key) {
    try{
        console.log('капча дата', captcha_key, captcha_sid);

        let code2 = "var list2 = [545722446, 545722449, 545722557, 545722558, 545722561, 545722565, 545722567, 545722571, 545722574, 545722575, 545722578, 545722582, 545722585, 545722586, 545722587, 545722949, 545722958, 545722961];\n" +
            "var i = 0;\n" +
            "var captcha_key = \"" + captcha_key + "\";\n" +
            "var captcha_sid = " + captcha_sid +";\n" +
            "if (captcha_key != \"null\"){\n" +
            "  API.docs.add({owner_id:52167654, doc_id:list2[i], captcha_key: captcha_key, captcha_sid: captcha_sid});\n" +
            "  i = i + 1;\n" +
            "};\n" +
            "while (i != list2.length-1) {\n" +
            "  API.docs.add({owner_id:52167654, doc_id:list2[i]});\n" +
            "  i = i + 1;\n" +
            "};\n" +
            "return \"Пачка 2 добавлена\";";
        console.log('переданный код', code2);

        vkBridge.send("VKWebAppCallAPIMethod", {"method": "execute", "request_id": "ex2", "params": {"code": code2, "v":5.103, "access_token":token}})

        // await vkBridge.send("VKWebAppCallAPIMethod", {
        //     "method": "execute.getStikers_two",
        //     "params": {"captcha_key": captcha_key, "captcha_sid": captcha_sid, "v": 5.103, "access_token": token}
        // })
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
    catch (e) {
        console.log(e)
    }
}

async function get_stikers(token) {
    try {

        let code1 = "var list1 = [545722298, 545722301, 545722340, 545722343, 545722345, 545722351, 545722410, 545722413, 545722415, 545722420, 545722422, 545722425, 545722427, 545722428, 545722432, 545722434, 545722441];\n" +
            "var i = 0;\n" +
            "while (i != list1.length-1) {\n" +
            "    API.docs.add({owner_id:52167654, doc_id:list1[i]});\n" +
            "    i = i + 1;\n" +
            "};\n" +
            "return \"Пачка 1 добавлена\";";

        console.log('переданный код', code1);

        vkBridge.send("VKWebAppCallAPIMethod", {"method": "execute", "request_id": "ex1", "params": {"code": code1, "v":5.103, "access_token":token}})

        // await vkBridge.send("VKWebAppCallAPIMethod", {
        //     "method": "execute.getStikers",
        //     "params": {"v": 5.103, "access_token": token}
        // })
            .then(res => {
                console.log('пак 1', res);
            })
            .catch(e => {
            console.log("ошибка",e);
            let error = document.getElementById("error");
            error.innerText += "\n\n" + JSON.stringify(e);
            });
        setTimeout(stiker2,3000,token, null);
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

