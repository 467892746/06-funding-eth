let {bytecode, interface} = require('./01_compile')
let Web3 = require('web3')
let HDWalletProvider = require('truffle-hdwallet-provider')

// 引入web3
// new 一个web3实例
// 设置网络
let terms = 'beyond core armed prosper rescue load twist notice autumn this solid goat'
let netIp = 'http://127.0.0.1:7545'
let provider = new HDWalletProvider(terms, netIp)
let web3 = new Web3()
web3.setProvider(provider)
// web3.setProvider('http://localhost:7545')

// console.log('version:', web3.version)
// console.log('provider', web3.currentProvider)

// 拼接合约数据
let contract = new web3.eth.Contract(JSON.parse(interface))

// 拼接bytecode
// contract.deploy({
//     data:bytecode,
//     arguments:['HelloWorld'] // 给构造函数传递参数，使用数组,
// }).send({
//     from:account,
//     gas:'3000000',
//     gasPrice:'1',
// }).then(instance => {
//     console.log('address:', instance.options.address)
// })
// 合约部署
let deploy = async () => {
    // 先获取所有的账户
    let accounts = await web3.eth.getAccounts()
    console.log('accounts:', accounts)
    // 执行部署
    let instance = await contract.deploy({
        data: bytecode,
        // arguments: ['HelloWorld'] // 给构造函数传递参数，使用数组,
    }).send({
        from: '0xFdC871A37d7970ca27Abed71baE90918ea59a136\n',
        gas: '300000000',
    })
    console.log('instance address:', instance.options.address)
}

deploy()