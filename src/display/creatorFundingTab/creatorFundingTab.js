import React, {Component} from 'react';
import {getCreatoriFundingDetails} from "../../eth/interaction"
import CardList from "../common/card_list";
class CreatorFundingTab extends Component{
    state = {
        creatorFundingDetails:[],
    }
    async UNSAFE_componentWillMount () {
        let creatorFundingDetails = await getCreatoriFundingDetails();
        console.table(creatorFundingDetails)
        this.setState({
            creatorFundingDetails
        })
    }

    render() {
        return (
           <CardList details = {this.state.creatorFundingDetails}/>
        );
    }
}

export default CreatorFundingTab