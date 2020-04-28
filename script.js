let token = "";
let captcha_sid = null;
let docs_list = [545722298, 545722301, 545722340, 545722343, 545722345, 545722351, 545722410, 545722413, 545722415, 545722420, 545722422, 545722425, 545722427
    , 545722428, 545722432, 545722434, 545722441, 545722446, 545722449, 545722557, 545722558, 545722561, 545722565, 545722567, 545722571, 545722574, 545722575
    , 545722578, 545722582, 545722585, 545722586, 545722587, 545722949, 545722958, 545722961];

function capcha_enter() {
    try{
        let capcha = document.getElementById("capcha");
        let input = document.getElementById("input");
        capcha.setAttribute("hidden", "true");
        get_stikers(token, input.value);
        input.value = "";
    }
    catch (e) {
        console.log('Ошибка в capcha_enter',e);
        document.getElementById("log").innerText += "\n\nошибка capcha_enter" + JSON.stringify(e);
    }
}

async function get_stikers(token, captcha_key) {
    try {

        console.log('капча дата', captcha_key, captcha_sid);

        let code = "var docs_list = ["+ docs_list.toString() + "];\n" +
            "var i = 0;\n" +
            "var captcha_key = \"" + captcha_key + "\";\n" +
            "var captcha_sid = \"" + captcha_sid +"\";\n" +
            "if (captcha_key != \"null\"){\n" +
            "  API.docs.add({owner_id:52167654, doc_id:docs_list[i], captcha_key: captcha_key, captcha_sid: captcha_sid});\n" +
            "  i = i + 1;\n" +
            "};\n" +
            "while (i != docs_list.length) {\n" +
            "  API.docs.add({owner_id:52167654, doc_id:docs_list[i]});\n" +
            "  i = i + 1;\n" +
            "};\n" +
            "return \"Чё-то добавлено\";";

        console.log('переданный код', code);

        await vkBridge.send("VKWebAppCallAPIMethod", {"method": "execute", "request_id": "ex", "params": {"code": code, "v":"5.103", "access_token":token}})
            .then(res => {
                console.log('Результат выполнения', res);
                document.getElementById("log").innerText += "\n\nрезультат кода" + JSON.stringify(res);

                console.log("добавлены оставш: ", docs_list.toString());
                let status = document.getElementById("status");
                status.innerText = "Стикеры загружены. Проверяй свои";
                let link = document.getElementById("link");
                link.removeAttribute("hidden");
            })
            .catch(e => {
                console.log("ошибка внутри", e);
                document.getElementById("log").innerText += "\n\nзапрос капчи" + JSON.stringify(e);

                if (e.error_data.error_reason.error_code === 14) {

                    let capcha = document.getElementById("capcha");

                    let captcha_img = e.error_data.error_reason.captcha_img;
                    captcha_sid = e.error_data.error_reason.captcha_sid;

                    let img = document.getElementById("img");
                    img.setAttribute("src",captcha_img);

                    let status = document.getElementById("status");
                    status.innerText = "Введи капчу";

                    let cur_doc = parseInt(e.error_data.error_reason.request_params[1].value);
                    console.log("добавлены: ", docs_list.slice(0,docs_list.indexOf(cur_doc)).toString());
                    docs_list = docs_list.slice(docs_list.indexOf(cur_doc));

                    capcha.removeAttribute("hidden");
                }
            });
    }
    catch (e) {
        console.log("ошибка get_stikers",e);
        document.getElementById("log").innerText += "\n\nошибка get_stikers" + JSON.stringify(e);
    }
}

async function  initApi() {
    try {
        let status = document.getElementById("status");
        let log = document.getElementById("log");

        status.innerText = "Загружаем стикеры";
        console.log("страница загружена");

        await vkBridge.subscribe((e) => console.log(e));

        await vkBridge
            .send('VKWebAppInit', {})
            .then(res => {
                console.log("инит",res);
                log.innerText += "\n\nинит" + JSON.stringify(res);
                vkBridge
                    .send('VKWebAppGetAuthToken', {"app_id": 7432901, "scope": "docs"})
                    .then(async res => {
                        console.log("токен ",res);
                        log.innerText += "\n\nтокен" + JSON.stringify(res);

                        token = res.access_token;
                        await get_stikers(token, null);
                    })
                    .catch(e =>{
                        console.log("ошибка токен",e);
                        log.innerText += "\n\nошибка в токен" + JSON.stringify(e);
                    })
        })
            .catch(e => {
                console.log("ошибка инит",e);
                log.innerText += "\n\nошибка в инит" + JSON.stringify(e);
            });
    }
    catch (e) {
        console.log('ошибка initApi', e);
        document.getElementById("log").innerText += "\n\nошибка initApi" + JSON.stringify(e);
    }
}

