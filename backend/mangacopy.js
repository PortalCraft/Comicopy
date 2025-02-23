CryptoJS = require('crypto-js');

var dio = "xxxmanga.woo.key";  // 我改的变量名，属于玩梗（

function decrypt(_0x22f450) {
   var _0x513f33 = _0x22f450["substring"](0x0, 0x10);
   var _0x2b7558 = _0x22f450["substring"](0x10, _0x22f450["length"]);
   var _0x50dba9 = CryptoJS["enc"]["Utf8"]['parse'](dio);
   var _0x2f9554 = CryptoJS["enc"]["Utf8"]['parse'](_0x513f33);

   var content = function (_0x2bee4f) {
       var _0x1a54bf = CryptoJS["enc"]["Hex"]['parse'](_0x2bee4f)
           , _0x5c64e4 = CryptoJS["enc"]["Base64"]['stringify'](_0x1a54bf);
       return CryptoJS["AES"]["decrypt"](_0x5c64e4, _0x50dba9, {
           'iv': _0x2f9554,
           'mode': CryptoJS["mode"]['CBC'],
           'padding': CryptoJS['pad']["Pkcs7"]
       })["toString"](CryptoJS['enc']["Utf8"])["toString"]()
   }(_0x2b7558)

   return content
}

function decrypt_image_paths(imageData) {
   var _0x7db7b2 = CryptoJS
       , _0x2774f9 = imageData
       , _0x4f1bc2 = _0x2774f9["substring"](0x0, 0x10)
       , _0x18aa36 = _0x2774f9["substring"](0x10, _0x2774f9['length'])
       , _0xa3011c = _0x7db7b2['enc']["Utf8"]["parse"](dio)
       , _0x1b5a66 = _0x7db7b2["enc"]['Utf8']["parse"](_0x4f1bc2)
       , _0x556014 = function (_0x361948) {
           var _0x5673da = _0x7db7b2["enc"]["Hex"]["parse"](_0x361948)
               , _0x46e939 = _0x7db7b2["enc"]["Base64"]["stringify"](_0x5673da);
           return _0x7db7b2["AES"]['decrypt'](_0x46e939, _0xa3011c, {
               'iv': _0x1b5a66,
               'mode': _0x7db7b2["mode"]['CBC'],
               'padding': _0x7db7b2['pad']["Pkcs7"]
           })["toString"](CryptoJS['enc']["Utf8"])["toString"]()
       }(_0x18aa36)
       , _0x55bb85 = JSON['parse'](_0x556014);

   return _0x55bb85;
}