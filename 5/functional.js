console.log('hello world');

/* class Orang {
    constructor(nama, kelamin, umur) {
        this.nama = nama;
        this.kelamin = kelamin;
        this.umur = umur;
    }
} */

var a = [{nama: 'budi', kelamin: 'pria', umur: 20},
         {nama: 'agus', kelamin: 'pria', umur: 25},
         {nama: 'susi', kelamin: 'wanita', umur: 22}]

a.forEach( x => { console.log('Hello, ' + x.nama) })

Array.prototype.partition = function(fun) {
    const hasil = [[],[]];
    
    this.forEach(x => {
        var i = 1
        if (fun(x))
            i = 0
        hasil[i].push(x)
    });
    return hasil;
}

Array.prototype.groupBy = function(fun) {
    const hasil = {}

    this.forEach(x => {
        const key = fun(x)
        if (! hasil.hasOwnProperty(key))
            hasil[key] = [x];
        else
            hasil[key].push(x);
    });

    return hasil;
}

x = a.partition( x => { return x.kelamin == 'pria' })
console.log('Semua pria: ')
x[0].forEach( x => {console.log(x) })
console.log('Semua wanita: ')
x[1].forEach( x => {console.log(x) })

x = a.groupBy (x => { return x.nama.slice(-1); })

console.log(x)

/* Array.prototype.groupBy = function(...) {
    ...
}*/
