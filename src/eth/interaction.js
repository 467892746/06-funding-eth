import {factoryInstance, newFundingInstance} from "./instance";


let getCreatoriFundingDetails = async () => {
    let creatorFundings = await factoryInstance.methods.getCreatorFundings().call()

    let detailsPromises = creatorFundings.map( fundingAddress =>  {
        return new Promise(async (resolve, reject) => {
            try {
                let funding = newFundingInstance()
                funding.options.address = fundingAddress
                let projectName = await funding.methods.projectName().call()
                let manager = await funding.methods.manager().call()
                let targetMoney = await funding.methods.targetrMoney().call()
                let supportMoney = await funding.methods.supportMoney().call()
                let leftTime = await funding.methods.endTime().call()
                let detail = {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime}
                resolve(detail)
            } catch (e) {
                reject(e)
            }
        })
    })
    let detailInfo = Promise.all(detailsPromises)
    return detailInfo
}

export {
    getCreatoriFundingDetails,
}