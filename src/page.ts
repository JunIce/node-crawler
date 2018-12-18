import requestPromise from 'request-promise'
import cheerio from 'cheerio'
import download from 'download'
import path from 'path'


export function fetchContentImage(url: string): any {
    return requestPromise({
        url: url,
        transform:(s: string) => cheerio.load(s)
    }).then($ => {
        let boxes = $('.swipebox-img').find('img')
        let imgs: string[] = []
        boxes.each((i: number, e: any) => {
            imgs[i] = `https:${$(e).attr('data-src')}`
        })
        return imgs
    }).then(imgs => {
        imgs.map(img => {
            let filename = `${guidGenerator()}${path.extname(img)}`
            let origin = img.split('!')[0]
            let originImg = `${origin}${path.extname(img)}`
            console.log(originImg)
            // download(originImg, '../images', {
            //     filename: filename
            // }).then(data => {
            //     console.log(data)
            // })
        })
    })
}
function guidGenerator() {
    return (S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4()+S4());
}
function S4() {
    const rand = (1 + Math.random()) * 0x10000;
    return (rand | 0).toString(16).substring(1);
}