import requestPromise from 'request-promise'
import cheerio from 'cheerio'
import './mongo'
import {fetchContentImage} from './page'
import config from './config'
requestPromise({
    url: `${config.base}/touxiang/`,
    headers: config.headers,
    transform: (s) => cheerio.load(s)
}).then($ => {
    let e = $('.m-img-wrap').find('a')
    let img: any = []
    e.each((i:number, ele: any) => {
        img[i] = `${config.base}${$(ele).attr('href')}`
    })
    return img
}).then(urls => {
    let time = setInterval(() => {
        // console.log(urls.shift())
        fetchContentImage(urls.shift())
        if(urls.length == 0) clearInterval(time)
    }, 300)
})