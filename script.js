

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

function get_access() {
    try {

        let status = document.getElementById("status");
        status.innerText = "Попытка получить аксес";

        vkBridge.send('VKWebAppInit',{});

        vkBridge.subscribe((e) => console.log(e));

        vkBridge
            .send('VKWebAppGetEmail')
            .then(data => {
                console.log('email',data.email);
            })
            .catch(error => {
                console.log('email нет');
            });

        console.log('show ',VK.callMethod("showSettingsBox", 131072));

        VK.addCallback('onSettingsChanged', function f(location) {
            console.log('разрешения выданы');
        })

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

            vkBridge.send('VKWebAppInit',{});
            VK.callMethod("showSettingsBox", 262144);

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

