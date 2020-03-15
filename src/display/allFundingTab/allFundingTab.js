import React, {Component} from 'react';
import {getFundingDetails,handleInvestFunc} from "../../eth/interaction"
import CardList from "../common/card_list";
import CreateFundingForm from "../creatorFundingTab/creatorFundingForm";
import {Form, Dimmer, Loader, Label} from "semantic-ui-react";

class AllFundingTab extends Component{
    state = {
        active:false,
        allFundingDetails:[],
        selectFundingDetail: '',
    }
    async UNSAFE_componentWillMount () {
        let allFundingDetails = await getFundingDetails(1);
        console.table(allFundingDetails)
        this.setState({
            allFundingDetails
        })
    }
    onCardClick = (selectFundingDetail) => {
        console.log(selectFundingDetail)
        this.setState({
            selectFundingDetail
        })
    }
    handleInvest = async () => {
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorsCount} = this.state.selectFundingDetail
        this.setState({
            active:true,
        })
        try {
            let res = await handleInvestFunc(fundingAddress, supportMoney)
            this.setState({
                active:false,
            })
        } catch (e) {
            this.setState({
                active:false,
            })
            console.log(e);
        }
    }
    render() {
        let {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorsCount} = this.state.selectFundingDetail
        return (
            <div>
                <CardList details = {this.state.allFundingDetails} onCardClick = {this.onCardClick}/>
                <div>
                    <h3>参与众筹</h3>
                    <Dimmer.Dimmable as={''} dimmed={this.state.active}>
                        <Dimmer active={this.state.active} inverted>
                            <Loader>支持中</Loader>
                        </Dimmer>
                        <Form onSubmit={this.handleInvest}>
                        <Form.Input type='text' value={projectName || ''} label='项目名称:'/>
                        <Form.Input type='text' value={fundingAddress || ''} label='项目地址:'/>
                        <Form.Input type='text' value={supportMoney || ''} label='支持金额:'
                                    labelPosition='left'>
                            <Label basic>￥</Label>
                            <input/>
                        </Form.Input>

                        <Form.Button primary content='参与众筹'/>
                    </Form>
                    </Dimmer.Dimmable>
                </div>
            </div>
        );
    }
}

export default AllFundingTab