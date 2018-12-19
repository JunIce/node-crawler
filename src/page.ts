import requestPromise from 'request-promise'
import cheerio from 'cheerio'
import download from 'download'
import md5 from 'md5'
import fs from 'fs'
import path from 'path'
import Url from './urlModel'
import config from './config'


export function fetchContentImage(url: string): any {
    return requestPromise({
        url: url,
        headers: config.headers,
        transform:(s: string) => cheerio.load(s)
    }).then($ => {
        let boxes = $('.swipebox-img').find('img')
        let imgs: string[] = []
        boxes.each((i: number, e: any) => {
            imgs[i] = `https:${$(e).attr('data-src')}`
        })
        return imgs
    }).then(imgs => {
        console.log(`download images length: ${imgs.length}`)
        imgs.map((img, idx: number) => {
            console.log(`this is number ${idx}`)
            let filename = `${md5(img)}${path.extname(img)}`
            let origin = img.split('!')[0]
            let originImg = `${origin}${path.extname(img)}`
            saveImages(originImg, filename, idx)
        })
    })
}


export function saveImages(originImg: string, filename: string, idx: number): void {
    if(fs.existsSync(config.saveDir + '/'+ filename)) {
        console.log(`${filename} exists!`)
        return
    }
    download(originImg, config.saveDir , {
        filename: filename
    }).then(() => {
        console.log(`image_${idx} download success!`)
        let u = new Url({url: filename})
        u.save().then(() => console.log(`image_${idx} save to mongodb success!`))
    })
}
