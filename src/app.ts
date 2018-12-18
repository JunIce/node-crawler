import requestPromise from 'request-promise'
import cheerio from 'cheerio'

import {fetchContentImage} from './page'

// requestPromise({
//     url: 'https://m.woyaogexing.com/touxiang/',
//     transform: (s) => cheerio.load(s)
// }).then($ => {
//     let e = $('.m-img-wrap').find('a')
//     let img: any = []
//     e.each((i:number, ele: any) => {
//         img[i] = `https://m.woyaogexing.com${$(ele).attr('href')}`
//     })
//     return img
// }).then(imgs => {
//     imgs.map((i: string) => {
//         // fetchContentImage(i)
//         console.log(i)
//     })
// })

fetchContentImage('https://m.woyaogexing.com/touxiang/nv/2018/704340.html')