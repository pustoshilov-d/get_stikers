//
// let list1 = [545722298, 545722301, 545722340, 545722343, 545722345, 545722351, 545722410, 545722413, 545722415, 545722420, 545722422, 545722425, 545722427, 545722428, 545722432, 545722434, 545722441];
// let list2 = [545722446, 545722449, 545722557, 545722558, 545722561, 545722565, 545722567, 545722571, 545722574, 545722575, 545722578, 545722582, 545722585, 545722586, 545722587, 545722949, 545722958, 545722961];
// for (let i in list1) {
//     API.docs.add({owner_id:52167654, doc_id:list1[i]});
// }
// return "Пачка 1 добавлена"

// const VKBridge = require('@vkontakte/vk-bridge-mock');
// // import bridge from '@vkontakte/vk-bridge-mock';
// // import VKBridge from '@vkontakte/vk-bridge-mock';
//
// console.log(VKBridge);
// // VKBridge.default.send('VKWebAppInit',{});
// //
// VKBridge.default.subscribe((e) => {
//     console.log(e)
//
// });
//
// VKBridge.default.send('VKWebAppInit',{});
// VKBridge.default
//     .send('VKWebAppGetAuthToken', {"app_id": 7432901, "scope": "docs"})
//     .then(async res =>{
//         console.log(res);
//         token = res.access_token;
//
//     });

//
// let token = "";
// let captcha_sid = null;
//
// function capcha_enter() {
//     try{
//         let capcha = document.getElementById("capcha");
//         let input = document.getElementById("input");
//         capcha.setAttribute("hidden","hidden");
//         get_stikers(token,input.value);
//     }
//     catch (e) {
//         console.log(e)
//     }
// }
//
// function get_stikers(token, captcha_key) {
//     try {
//         vkBridge.send("VKWebAppCallAPIMethod", {
//             "method": "execute.getStikers",
//             "params": {"v": 5.103, "access_token": token},
//             "captcha_key": captcha_key
//         })
//             .then(res => {
//                 console.log('пак 1', res);
//             });
//         vkBridge.send("VKWebAppCallAPIMethod", {
//             "method": "execute.getStikers_two",
//             "params": {"v": 5.103, "access_token": token},
//             "captcha_key": captcha_key
//         })
//             .then(res => {
//                 console.log('пак 2', res);
//             });
//     }
//     catch (e) {
//         console.log(e);
//         //14
//         let captcha_img = "";
//         captcha_sid = "";
//         let status = document.getElementById("status");
//         status.innerText = "Введи капчу";
//         capcha.removeAttribute("hidden");
//         let img = document.getElementById("img");
//
//         img.setAttribute("scr",captcha_img);
//

/////////////

//
//
// function  initApi() {
//     try {
//         let status = document.getElementById("status");
//         let link = document.getElementById("link");
//         status.innerText= "Загружаем стикеры"
//         console.log("страница загружена");
//
//         VK.init( function() {
//             console.log("есть коннект");
//             vkBridge.send('VKWebAppInit',{});
//             vkBridge
//                 .send('VKWebAppGetAuthToken', {"app_id": 7432901, "scope": "docs"})
//                 .then(async res =>{
//                     console.log(res);
//                     token = res.access_token;
//
//                     await get_stikers(token, null);
//
//                     status.innerText = "Стикеры загружены. Проверяй";
//                     link.innerText = "свои документы";
//                 })
//
//         }, function() {
//             console.log("нет коннект");
//         }, '5.103');
//     }
//     catch (e) {
//         console.log('ошибка ёпта', e)
//     }
// }
//
let captcha_key = null;
let captcha_sid = null;

let code1 = "var list1 = [545722298, 545722301, 545722340, 545722343, 545722345, 545722351, 545722410, 545722413, 545722415, 545722420, 545722422, 545722425, 545722427, 545722428, 545722432, 545722434, 545722441];\n" +
    "var i = 0;\n" +
    "while (i != list1.length-1) {\n" +
    "    API.docs.add({owner_id:52167654, doc_id:list1[i]});\n" +
    "    i = i + 1;\n" +
    "};\n" +
    "return \"Пачка 1 добавлена\";";

console.log(code1);