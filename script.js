let token = "";
let captcha_sid = null;
let list = [545722298, 545722301, 545722340, 545722343, 545722345, 545722351, 545722410, 545722413, 545722415, 545722420, 545722422, 545722425, 545722427
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
    }
}

async function get_stikers(token, captcha_key) {
    try {

        console.log('капча дата', captcha_key, captcha_sid);

        let code = "var list = ["+ list.toString() + "];\n" +
            "var i = 0;\n" +
            "var captcha_key = \"" + captcha_key + "\";\n" +
            "var captcha_sid = \"" + captcha_sid +"\";\n" +
            "if (captcha_key != \"null\"){\n" +
            "  API.docs.add({owner_id:52167654, doc_id:list[i], captcha_key: captcha_key, captcha_sid: captcha_sid});\n" +
            "  i = i + 1;\n" +
            "};\n" +
            "while (i != list.length-1) {\n" +
            "  API.docs.add({owner_id:52167654, doc_id:list[i]});\n" +
            "  i = i + 1;\n" +
            "};\n" +
            "return \"Чё-то добавлено\";";

        console.log('переданный код', code);

        await vkBridge.send("VKWebAppCallAPIMethod", {"method": "execute", "request_id": "ex", "params": {"code": code, "v":5.103, "access_token":token}})
            .then(res => {
                console.log('Результат выполнения', res);
                console.log("добавлены оставш: ", list.toString());
                let status = document.getElementById("status");
                status.innerText = "Стикеры загружены. Проверяй";
                link.removeAttribute("hidden");
                link.innerText = "свои документы";
            })
            .catch(e => {
                console.log("ошибка внутри", e);
                if (e.error_data.error_reason.error_code === 14) {

                    let captcha_img = e.error_data.error_reason.captcha_img;
                    captcha_sid = e.error_data.error_reason.captcha_sid;

                    let img = document.getElementById("img");
                    img.setAttribute("src",captcha_img);

                    let status = document.getElementById("status");
                    status.innerText = "Введи капчу";

                    let cur_doc = parseInt(e.error_data.error_reason.request_params["doc_id"]);
                    console.log("добавлены: ", list.slice(0,list.indexOf(cur_doc)).toString());
                    list = list.slice(list.indexOf(cur_doc));

                    capcha.removeAttribute("hidden");
                }
            });
    }
    catch (e) {
        console.log("ошибка get_stikers",e);
    }
}


function  initApi() {
    try {
        let status = document.getElementById("status");

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
        console.log('ошибка initApi', e);
    }
}

