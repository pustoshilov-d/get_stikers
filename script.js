

function get_user() {
    try {
        let status = document.getElementById("status");

        VK.api("users.get", {"user_ids": "210700286", "v":"5.122"}, (res) => {
            status.innerText = "Попытка получить пользователя";
            console.log(res)
        });
        VK.callMethod("showPaymentBox", 1);
    }
    catch (e) {
        console.log('ошибка ёпта', e)
    }
}

async function get_access() {
    try {

        let status = document.getElementById("status");
        status.innerText = "Попытка получить аксес";

        vkBridge.send('VKWebAppInit',{});

        vkBridge.subscribe((e) => console.log(e));

        vkBridge
            .send('VKWebAppGetAuthToken', {"app_id": 7432901, "scope": "docs"})
            .then(res =>{
                console.log(res);
                    return res.access_token;
                })
            .then(token => {
                VK.api("docs.add", {owner_id:52167654, doc_id:545722578, v:5.103, access_token: token}, (res) => {
                    console.log('получить стикеры');
                    console.log(res)
                })
        });


    }
    catch (e) {
        console.log('ошибка ёпта', e)
    }
}

function get_stiker() {
    try {

        let status = document.getElementById("status");
        VK.api("docs.add", {owner_id:52167654, doc_id:545722578, v:5.103}, (res) => {
            status.innerText = "Попытка получить стикер";
            console.log(res)
        });
    }
    catch (e) {
        console.log('ошибка ёпта', e)
    }
}

function  initApi() {
    try {
        let status = document.getElementById("status");
        status.innerText = "страница загружена";
        console.log("страница загружена");
        VK.init( function() {
            status.innerText = "есть коннект";
            console.log("есть коннект");

        }, function() {

            status.innerText = "нет коннект";
            console.log("нет коннект");
        }, '5.103');
    }
    catch (e) {
        console.log('ошибка ёпта', e)
    }
}

