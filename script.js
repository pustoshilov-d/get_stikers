

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

     //   const bridge = require('@vkontakte/vk-bridge');
       // bridge.send("VKWebAppInit", {});
        //bridge.subscribe((e) => console.log(e));

        VK.callMethod("showInstallBox");
        VK.addCallback('onApplicationAdded', function f(location){
            console.log('приложение установлено');
        });

        VK.callMethod("showSettingsBox", 131072);
        VK.addCallback('onSettingsChanged', function f(location){
            console.log('разрешения выданы');
        });
        VK.addCallback('onSettingsCancel', function f(location){
            console.log('разрешения не выданы');
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
            // API initialization succeeded
            // Your code here
            console.log(typeof VK.callMethod != 'undefined');
            VK.callMethod("showSettingsBox", 131072);
            VK.api("users.get", {"user_ids": "210700286", "v":"5.122"}, (res) => {
                status.innerText = "Попытка получить пользователя";
                console.log(res)
            });
            status.innerText = "есть коннект";
            console.log("есть коннект");

        }, function() {
            // API initialization failed
            // Can reload page here
            status.innerText = "нет коннект";
            console.log("нет коннект");
        }, '5.103');
    }
    catch (e) {
        console.log('ошибка ёпта', e)
    }
}

