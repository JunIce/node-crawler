const request = require('request-promise')
, md5 = require('md5')
, fs = require('fs')
, path = require('path')
, process = require('process')
, baseUrl = 'http://fanyi.youdao.com';

// let translateText = process.argv[2].toString()
let translateText = '地狱'
let headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8,zh-CN;q=0.7',
    'Content-Length': '254',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'fanyi.youdao.com',
    'Origin': baseUrl,
    'Referer': baseUrl,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'Cookie': 'OUTFOX_SEARCH_USER_ID=1062343950@10.169.0.83; OUTFOX_SEARCH_USER_ID_NCOO=71451398.72782004; JSESSIONID=aaa9FTnHkrmDCgDLfqbFw; UM_distinctid=167c672a182dd-0169df5626fcdc-10326653-1aeaa0-167c672a18387a; SESSION_FROM_COOKIE=test; ___rl__test__cookies=1545232626225'
}
// 生成sign
var getSign = function(e) {
    var t = md5(headers['User-Agent'])
      , r = "" + (new Date).getTime()
      , i = r + parseInt(10 * Math.random(), 10);
    return {
        ts: r,
        bv: t,
        salt: i,
        sign: md5("fanyideskweb" + e + i + "p09@Bn{h02_BIEe]$P^nG")
    }
}
// 对象组装
let obj = Object.assign({}, {
        i: translateText,
        from: 'AUTO',
        to: 'AUTO',
        smartresult: 'dict',
        client: 'fanyideskweb',
        doctype: 'json',
        version: '2.1',
        keyfrom: 'fanyi.web',
        action: 'FY_BY_REALTIME',
        typoResult: false
    }, getSign(translateText))

var test = (e) => {
    var t = md5(headers['User-Agent'])
    , r = 1545234378113
    , i = 15452343781131;

    return {
        ts: r,
        bv: t,
        salt: i,
        sign: md5("fanyideskweb" + e + i + "p09@Bn{h02_BIEe]$P^nG")
    }
}

console.log(test(translateText))
request.post({
    url: `${baseUrl}/translate_o`,
    params: {
        smartresult: 'dcit',
        smartresult: 'rule'
    },
    headers: headers,
    encoding: 'utf8',
    form: obj
}).then(res => {
    console.log(res)
}).catch(err => {
    throw new Error(err)
})

function writeToTxt(f, c) {
    fs.writeFileSync(f, c)
}

function getCookieString() {
    // 本地cookie储存，避免每次请求cookie
    let f = path.resolve(__dirname , 'cookie.txt')
    if(fs.existsSync(f)) {
        return fs.readFileSync(f).toString()
    }

    // cookie 进行储存
    let j = request.jar()
    request.get({url: baseUrl , jar: j}).then(() => {
        let cookie_string = j.getCookieString(baseUrl)
        writeToTxt(f, cookie_string)
    })
}