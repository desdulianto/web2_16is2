const data = "desdulianto@x.gmail.com"

const regex = /^[a-zA-Z0-9.-_]+@([a-zA-Z0-9]+\.[a-zA-Z0-9]+)+$/
const telepon = /^(\+[0-9]{2}){0,1}([0-9]{3,4}-){0,1}[0-9]{7}$/

//console.log(data.search(regex));
//console.log(data.match(regex));
console.log('+62061-1234567'.match(telepon));
