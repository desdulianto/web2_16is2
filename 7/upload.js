const express = require('express');
const multer = require('multer');
const fs = require('fs');

const http = express();
const upload = multer({dest: 'tmp/'})

http.set('view engine', 'ejs');
http.set('views', 'views');

function copyFile(src, dst) {
    const promise = new Promise(function (resolve, reject) {
        fs.readFile(src, (err, data) => {
            if (err) {
                reject(err)
            } else {
                fs.writeFile(dst, data, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        fs.unlink(src, (err) => {
                            if (err)
                                reject(err)
                            else
                                resolve('Success');
                        });
                    }
                });
            }
        });
    });
    return promise;
}

http.get('/', (req, res) => {
    res.render('upload');
});

http.post('/upload', upload.single('berkas'), (req, res) => {
    copyFile(req.file.path, 'upload/' + req.file.originalname)
    .then(data => {
        res.send('File ' + req.file.originalname + ' uploaded');
    })
    .catch(err => {
        res.send(err);
    });
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});
