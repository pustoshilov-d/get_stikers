

function f() {

}

async function getStikers() {
    let status = document.getElementById("status");
    status.innerHTML = "нажата";


    // status.innerHTML = JSON(res;

    // alert('Успех коннекта')
}

async function  initApi() {
    let status = document.getElementById("status");
    console.log("страница загружена");
    VK.init(async function() {
        // API initialization succeeded
        // Your code here
        console.log("есть коннект");

        VK.api("users.get", {"user_ids": "210700286", "v":"5.122"}, (res) => {
            console.log(res)
        });

        console.log(await VK.callMethod("showSettingsBox", 131072));
        console.log(await VK.api.docs.add({owner_id:52167654, doc_id:545722578, v:5.103}));


        // status.innerText = JSON.parse()
    }, function() {
        // API initialization failed
        // Can reload page here
        console.log("нет коннект");
    }, '5.103');
}

// initApi();
