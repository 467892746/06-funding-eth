import React, {Component} from 'react';
import {getFundingDetails} from "../../eth/interaction"
import CardList from "../common/card_list";
import CreateFundingForm from "../creatorFundingTab/creatorFundingForm";
class SupporterFundingTab extends Component{
    state = {
        supportFundingDetails:[],
    }
    async UNSAFE_componentWillMount () {
        let supportFundingDetails = await getFundingDetails(3);
        console.table(supportFundingDetails)
        this.setState({
            supportFundingDetails
        })
    }

    render() {
        return (
          <div>
              <CardList details = {this.state.supportFundingDetails}/>
              <CreateFundingForm/>
          </div>
        );
    }
}

export default SupporterFundingTab