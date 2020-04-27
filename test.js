let captcha_key = null;
let captcha_sid = 2;

let docs_list = [545722298, 545722301, 545722340, 545722343, 545722345, 545722351, 545722410, 545722413, 545722415, 545722420, 545722422, 545722425, 545722427
    , 545722428, 545722432, 545722434, 545722441, 545722446, 545722449, 545722557, 545722558, 545722561, 545722565, 545722567, 545722571, 545722574, 545722575
    , 545722578, 545722582, 545722585, 545722586, 545722587, 545722949, 545722958, 545722961];
let code = "var docs_list = ["+ docs_list.toString() + "];\n" +
    "var i = 0;\n" +
    "var captcha_key = \"" + captcha_key + "\";\n" +
    "var captcha_sid = \"" + captcha_sid +"\";\n" +
    "if (captcha_key != \"null\"){\n" +
    "  API.docs.add({owner_id:52167654, doc_id:list[i], captcha_key: captcha_key, captcha_sid: captcha_sid});\n" +
    "  i = i + 1;\n" +
    "};\n" +
    "while (i != list.length-1) {\n" +
    "  API.docs.add({owner_id:52167654, doc_id:docs_list[i]});\n" +
    "  i = i + 1;\n" +
    "};\n" +
    "return \"Чё-то добавлено\";";

console.log('переданный код', code);