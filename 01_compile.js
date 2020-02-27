// 导入solc编译器
let solc = require('solc')
let fs = require('fs')
// 读取合约
let sourceCode = fs.readFileSync('./contracts/FundingFactory.sol', 'utf-8')
let output = solc.compile(sourceCode, 1)
console.log('output:', output)
module.exports = output['contracts'][':FundingFactory']