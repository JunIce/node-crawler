import requestPromise from 'request-promise'
import cheerio from 'cheerio'
import download from 'download'
import {guidGenerator} from './util'
import path from 'path'
import Url from './urlModel'


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
            download(originImg, '../images', {
                filename: filename
            }).then(() => {
                let u = new Url({url: filename})
                u.save()
            })
        })
    })
}
