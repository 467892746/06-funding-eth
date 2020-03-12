import {factoryInstance, newFundingInstance} from "./instance";
import web3 from "../utils/InitWeb3";

let getFundingDetails = async (index) => {
    let accounts = await web3.eth.getAccounts();
    let currentFundings = []
    if (index === 1){
        currentFundings = await factoryInstance.methods.getAllFundings().call({from: accounts[0]})

    }else if (index === 2) {
        // 我发起
        currentFundings = await factoryInstance.methods.getCreatorFundings().call({from: accounts[0]})
    }else if (index === 3){
        //  我参与的
        currentFundings = await factoryInstance.methods.getSupporterFunding().call({from: accounts[0]})

    }else {

    }

    let detailsPromises = currentFundings.map( fundingAddress =>  {
        console.log(fundingAddress)
        return new Promise(async (resolve, reject) => {
            try {
                let funding = newFundingInstance()
                funding.options.address = fundingAddress
                let projectName = await funding.methods.projectName().call()
                let manager = await funding.methods.manager().call()
                let targetMoney = await funding.methods.targetrMoney().call()
                let supportMoney = await funding.methods.supportMoney().call()
                let leftTime = await funding.methods.getLeftTime().call()
                let balance = await funding.methods.getBalance().call()
                let investorsCount = await funding.methods.getInvestorsCount().call()

                let detail = {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorsCount}
                resolve(detail)
            } catch (e) {
                reject(e)
            }
        })
    })
    let detailInfo = Promise.all(detailsPromises)
    return detailInfo
}

let createFunding =  (active, projectName, supportMoney, targetMoney, duration) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await web3.eth.getAccounts()
            console.log(accounts[0])
            let res = await factoryInstance.methods.createFunding(projectName, targetMoney, supportMoney, duration).send({
                from: accounts[0],
            })
            resolve(res)
        } catch (e) {
            reject(e)
        }
    } )
    // 调用创建方法
}

export {
    getFundingDetails,
    createFunding,
}