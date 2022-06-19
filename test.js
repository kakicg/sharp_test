// 第一引数 "test"の場合テストモード
const fs = require("fs")
const path = require("path")

const sharp = require('sharp')

const image = sharp('./1_003.jpg')
const back = sharp('./bg800.jpg')
let testWidth, testHeight;
back
        .metadata().then(function(metadata) {
            testWidth = metadata.width;
            testHeight = metadata.height;
            console.log(`testWidth: ${testWidth}`)

            return image
        }).then( () => {
            image
                .resize( 800, 800, {
                    fit: 'fill'
                } )
                .composite( [{ input: 'bg800.jpg', blend: 'difference' }] )
                .jpeg({quality: 80})

                .toFile(`./composited.jpg`)
                .then( () => {
                })
                .catch(function(err) {
                    console.log(err);
                })
        })
        .catch(function(err) {
            console.log(err);
            reject(err)
        })

// image
//     .resize( testWidth, testHeight, {
//         fit: 'fill'
//     } )
//     .composite( [{ input: 'bg800.jpg', blend: 'difference' }] )
//     .jpeg({quality: 80})

//     .toFile(`./composited.jpg`)
//     .then( () => {
//     })
//     .catch(function(err) {
//         console.log(err);
//     })

    