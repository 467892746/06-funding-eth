// 如果不是default,需要使用{}结构
import React, {Component} from 'react';
import web3 from "./utils/InitWeb3";
import {factoryInstance} from "./eth/instance";
import TabCenter from "./display/TabCenter";
class App extends Component {
  constructor(){
    super();
    this.state = {
      currentAccount:'',
    }
  }
  async componentWillMount() {
    let accounts = await web3.eth.getAccounts()
    console.log(accounts)
    let platformManager = await factoryInstance.methods.platformManager().call()
    console.log('manager:', platformManager)
    this.setState({
      currentAccount:accounts[0],
    })
  }


  render() {
    return (
        <div>
          <h1>众筹</h1>
          <p>当前账户:{this.state.currentAccount}</p>
          <TabCenter/>
        </div>
    );
  }
}
export default App;
