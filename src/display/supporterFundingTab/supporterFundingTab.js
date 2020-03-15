import React, {Component} from 'react';
import {approveRequest, getFundingDetails, showRequests} from "../../eth/interaction"
import CardList from "../common/card_list";
import CreateFundingForm from "../creatorFundingTab/creatorFundingForm";
import {Button} from "semantic-ui-react";
import RequestTable from "../common/request_list";
class SupporterFundingTab extends Component{
    state = {
        supportFundingDetails:[],
        selectFundingDetail:'',
        res: [],


    }
    async UNSAFE_componentWillMount () {
        let supportFundingDetails = await getFundingDetails(3);
        console.table(supportFundingDetails)
        this.setState({
            supportFundingDetails
        })
    }
    onCardClick = (selectFundingDetail) => {
        console.log(selectFundingDetail)
        this.setState({
            selectFundingDetail
        })
    }
    handleShowRequest = async () => {
        let fundingAddress = this.state.selectFundingDetail.fundingAddress
        try {
            let res = await showRequests(fundingAddress)
            this.setState({res})
            console.log(res)
        } catch (e) {
            console.log(e)
        }

    }
    handleApprove = async (index) => {
        try {
            let res = await approveRequest(this.state.selectFundingDetail.fundingAddress, index)
        } catch (e) {
            console.log(e)
        }

    }


    render() {
        return (
          <div>
              <CardList
                  details = {this.state.supportFundingDetails}
                  onCardClick = {this.onCardClick}
              />
              <CreateFundingForm/>
              {
                  this.state.selectFundingDetail && (
                      <div>
                          <Button onClick={this.handleShowRequest}>申请详情</Button>
                          <div>
                              <RequestTable
                                  requestDetails={this.state.res}
                                  handleApprove = {this.handleApprove}
                                  paheKey={3}
                              />
                          </div>
                      </div>
                  )
              }
          </div>


        );
    }
}

export default SupporterFundingTab