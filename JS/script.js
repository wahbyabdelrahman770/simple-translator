// https://api.mymemory.translated.net/get?q="text"&langpair=from|to

const countries = {
    "am-ET": "Amharic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu",
};

const selectTags = document.querySelectorAll("select");
selectTags.forEach((select) => {
    for (let country in countries) {
        select.innerHTML += `
            <option value="${country}">${countries[country]}</option>
        `;
    }
});

const fromTextArea = document.querySelector(".fromTextArea");
const toTextArea = document.querySelector(".toTextArea");
const fromSelect = document.querySelector(".fromSelect");
const toSelect = document.querySelector(".toSelect");
const translateBtn = document.querySelector(".btn-outline-primary");
const clearBtn = document.querySelector(".btn-outline-danger");
const switchBtn = document.querySelector(".switch");
let fromLang = "en-GB", toLang = "ar-SA";

fromTextArea.addEventListener("input", () => {
    let value = fromTextArea.value;
    if (value !== "") {
        translateBtn.disabled = false;
        clearBtn.disabled = false;
    }
    else {
        translateBtn.disabled = true;
        clearBtn.disabled = true;
    }
});

fromSelect.addEventListener("change", (e) => {
    fromLang = e.target.value;
});

toSelect.addEventListener("change", (e) => {
    toLang = e.target.value;
});

switchBtn.addEventListener("click", () => {
    let temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    fromLang = fromSelect.value;
    toLang = toSelect.value;
});

translateBtn.addEventListener("click", () => {
    const api = `https://api.mymemory.translated.net/get?q="${fromTextArea.value}"&langpair=${fromLang}|${toLang}`;
    fetch(api).then(response => response.json()).then(data => data.responseData.translatedText)
        .then((translatedText) => {
            toTextArea.value = translatedText ? translatedText : "Couldn't translate";
        });
});

clearBtn.addEventListener("click", () => {
    fromTextArea.value = null;
    toTextArea.value = null;
    translateBtn.disabled = true;
    clearBtn.disabled = true;
});