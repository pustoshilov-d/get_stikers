

function f() {

}

async function getStikers() {
    let status = document.getElementById("status");
    status.innerHTML = "нажата";
    await VK.callMethod("showSettingsBox", 131072);

    VK.api("users.get", {"user_ids": "210700286", "v":"5.122"}, (res) => {
        console.log(res)
    });

    // status.innerHTML = JSON(res;

    // alert('Успех коннекта')
}

function  initApi() {
    let status = document.getElementById("status");
    status.innerHTML = "страница загружена";
    VK.init(function() {
        // API initialization succeeded
        // Your code here
        status.innerHTML = "есть коннект";
        // status.innerText = JSON.parse()
    }, function() {
        // API initialization failed
        // Can reload page here
        status.innerHTML = "нет коннект";
    }, '5.103');
}

// initApi();
