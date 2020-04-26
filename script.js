function f() {

}

function getStikers() {
    let status = document.getElementById("status");
    status.innerHTML = "нажата";
    initApi()
    // alert('Успех коннекта')
}

function  initApi() {
    let status = document.getElementById("status");
    VK.init(function() {
        // API initialization succeeded
        // Your code here
        status.innerHTML = "есть коннект";
    }, function() {
        // API initialization failed
        // Can reload page here
        status.innerHTML = "нет коннект";
    }, '5.103');
}
