import React, {Component} from 'react';
import {approveRequest, createRequest, finalizeRequest, getFundingDetails, showRequests} from "../../eth/interaction"
import CardList from "../common/card_list";
import CreateFundingForm from "./creatorFundingForm";
import {Button, Form, Label, Segment} from "semantic-ui-react";
import RequestTable from "../common/request_list";

class CreatorFundingTab extends Component {
    state = {
        creatorFundingDetails: [],
        selectFundingDetail: '',
        requestDesc: '',
        requestBalance: '',
        requestAddress: '',
        res: [],
    }
    handleChange = (e, {name, value}) => this.setState({[name]: value})

    async UNSAFE_componentWillMount() {
        let creatorFundingDetails = await getFundingDetails(2);
        console.table(creatorFundingDetails)
        this.setState({
            creatorFundingDetails
        })
    }

    onCardClick = (selectFundingDetail) => {
        console.log(selectFundingDetail)
        this.setState({
            selectFundingDetail
        })
    }
    handleCreateRequest = async () => {
        let {creatorFundingDetails, selectFundingDetail, requestDesc, requestBalance, requestAddress} = this.state
        // 创建花费请求
        try {
            let res = await createRequest(selectFundingDetail.fundingAddress, requestDesc, requestBalance, requestAddress)
        } catch (e) {
            console.log(e)
        }
    }
    handleShowRequest = async () => {
        let fundingAddress = this.state.selectFundingDetail.fundingAddress
        try {
            let res = await showRequests(fundingAddress)
            this.setState({res})
        } catch (e) {
            console.log(e)
        }

    }
    handleFinalize = async (index) =>{
        try {
            let res = await finalizeRequest(this.state.selectFundingDetail.fundingAddress, index)
        } catch (e) {
            console.log(e)
        }
}

    render() {
        let {creatorFundingDetails, selectFundingDetail, requestDesc, requestBalance, requestAddress, res} = this.state
        return (
            <div>
                <CardList
                    details={creatorFundingDetails}
                    onCardClick={this.onCardClick}
                />
                <CreateFundingForm/>
                <div>
                    <h3>发起付款请求</h3>

                    <Segment>
                        <h4>当前项目:{selectFundingDetail.projectName}, 地址: {selectFundingDetail.fundingAddress}</h4>
                        <Form onSubmit={this.handleCreateRequest}>
                            <Form.Input type='text' name='requestDesc' required value={requestDesc}
                                        label='请求描述' placeholder='请求描述' onChange={this.handleChange}/>

                            <Form.Input type='text' name='requestBalance' required value={requestBalance}
                                        label='付款金额' labelPosition='left' placeholder='付款金额'
                                        onChange={this.handleChange}>
                                <Label basic>￥</Label>
                                <input/>
                            </Form.Input>

                            <Form.Input type='text' name='requestAddress' required value={requestAddress}
                                        label='商家收款地址' labelPosition='left' placeholder='商家地址'
                                        onChange={this.handleChange}>
                                <Label basic><span role='img' aria-label='location'>📍</span></Label>
                                <input/>
                            </Form.Input>

                            <Form.Button primary content='开始请求'/>
                        </Form>
                    </Segment>
                </div>
                {
                    selectFundingDetail && (
                        <div>
                            <Button onClick={this.handleShowRequest}>申请详情</Button>
                            <RequestTable requestDetails={res}
                                          handleFinalize = {this.handleFinalize}
                                          pageKey = {2}
                                          investorsCount = {selectFundingDetail.investorsCount}
                            />
                        </div>
                    )
                }


            </div>
        );
    }
}

export default CreatorFundingTab