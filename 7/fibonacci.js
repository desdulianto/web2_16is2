const express = require('express');

const http = express();

// fungsi fibonacci ini menggunakan metode synchronous
// fungsi ini akan blocking apabila dipanggil dengan nilai
// n yang cukup besar misalnya 50. ini dikarenakan fungsi
// rekursif yang memanggil fibonacci yang berulang2 misalnya
// untuk 50 dipanggil fibonacci 48 dan 49
// untuk menghitung fibonacci 49 dipanggil rekursif lagi
// ke fibonacci 47 dan 48, begitu seterusnya
// karena sifatnya synchronous, pada saat request ini
// diproses, user yang membuka halaman web yang sama akan
// blocking (web akan stuck pada proses loading terus)
// menunggu hasil fibonacci selesai dilakukan
function fibonacci(n) {
    if (n === 0)
        return 0;
    else if (n === 1 || n === 2)
        return 1;
    else
        return fibonacci(n-2) + fibonacci(n-1);
}

// fungsi fibonacci rekursif dapat dipercepat dengan menggunakan
// metode memoization yaitu dengan menyediakan variable (dalam
// hal ini object) untuk mengingat hasil perhitungan yang sebelumnya
// jadi apabila fibonacci 50 menghasilkan rekursi fibonacci 48 dan 49
// fibonacci 49 akan sudah mendapatkan hasilnya dengan cepat
// karena fibonacci 47 dan 48 sudah pernah dihitung dan diingat sebelumnya
// oleh karena itu blocking time akan minimal dengan kompensasi pemakaian
// memory yang bertambah untuk mengingat hasil komputasi sebelumnya
fibonacciResults = {}
function fibonacciMemoization(n) {
    if (fibonacciResults[n])
        return fibonacciResults[n];
    if (n === 0)
        fibonacciResults[n] = 0
    else if (n == 1 || n == 2) {
        fibonacciResults[n] = 1;
    } else {
        fibonacciResults[n] = fibonacciMemoization(n-2) + fibonacciMemoization(n-1);
    }
    return fibonacciResults[n];
}

// fibonacci menggunakan metode asynchronous
// asynchronous memungkinkan nodejs untuk menjalankan
// long running process tanpa blocking sehingga
// request yang datang tetap dapat dilayani
// ciri-ciri asynchronous adalah hasil komputasi
// akan dikirimkan melalui function callback setelah
// komputasi selesai dilakukan
// setImmediate digunakan untuk menjadwalkan pemanggilan
// callback setelah proses komputasi selesai
// https://nodejs.org/api/timers.html#timers_setimmediate_callback_args
// pada contoh ini, fibonacci akan memanggil callback apabila
// n === 0/1/2
// apabila n > 2 jadwalkan eksekusi dengan setImmediate
// yang memanggil fungsi fibonacci secara rekursif untuk n-2 dan n-1
// setelah selesai, panggil callback dengan hasil komputasi
function fibonacciAsync(n, callback) {
    if (n === 0) {
        callback(undefined, 0)
    } else if (n === 1 || n === 2)
        callback(undefined, 1);
    else {
        setImmediate(function() {
            fibonacciAsync(n-1, function(err, val1) {
                if (err) callback(err);
                else setImmediate(function() {
                    fibonacciAsync(n-2, function(err, val2) {
                        if (err) callback(err);
                        else callback(undefined, val1+val2);
                    });
                });
            });
        });
    }
}


// synchronous fibonacci (blocking)
http.get('/sync', (req, res) => {
    const n = parseInt(req.query.n);

    res.send(fibonacci(n) + "");

    /*fibonacciAsync(n)
    .then(data => { res.send(data + "") })
    .catch(e => { res.send(e) });*/
    //res.send(fibonacci(n)+"");
    fibonacciAsync(n, (err, result) => {
        if (err)
            res.send(err);
        else
            res.send(result+"");
    });
});

// using memoization technique to speed up calculation
http.get('/memoization', (req, res) => {
    const n = parseInt(req.query.n);
    res.send(fibonacciMemoization(n) + "");
});

// using asynchronous call to prevent blocking
http.get('/async', (req, res) => {
    const n = parseInt(req.query.n);
    fibonacciAsync(n, (err, result) => {
        if (err)
            res.send(err);
        else
            res.send(result + "");
    });
});

http.listen(3000, () => {
    console.log('listening on 3000...');
});
