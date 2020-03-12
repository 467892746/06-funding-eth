import React, {Component} from 'react';
import {getFundingDetails} from "../../eth/interaction"
import CardList from "../common/card_list";
import CreateFundingForm from "./creatorFundingForm";
class CreatorFundingTab extends Component{
    state = {
        creatorFundingDetails:[],
    }
    async UNSAFE_componentWillMount () {
        let creatorFundingDetails = await getFundingDetails(2);
        console.table(creatorFundingDetails)
        this.setState({
            creatorFundingDetails
        })
    }

    render() {
        return (
            <div>
                <CardList details = {this.state.creatorFundingDetails}/>
                <CreateFundingForm/>
            </div>
        );
    }
}

export default CreatorFundingTab