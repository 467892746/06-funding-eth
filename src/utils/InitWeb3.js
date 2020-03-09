let Web3 = require('web3');

let web3 = new Web3(window.web3.currentProvider);

// es6语法， default表示默认导出，在使用时，名字可以改变
export default web3;