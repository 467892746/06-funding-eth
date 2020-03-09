import React from "react";
import {Card, Image, Icon} from "semantic-ui-react";

const src = '/images/logo193.png'

const CardList = (props) => {
    let details = props.details
    let cards = details.map( detail => {
        return <CardFunding key = {detail.fundingAddress} detail = {detail}/>
    })
   return (
       <Card.Group itemsPerRow = {4}>
           {cards}
       </Card.Group>
   )
}

const CardFunding = (props) => {
    const {detail} = props;
    const {funding, projectName, creator, supportBalance, targetBalance, endTime, currentBalance, investorCount} = detail;
    let percentage = (parseFloat(currentBalance)/parseFloat(targetBalance)).toFixed(2) * 100
    return (
        <div>
            <Card>
                <Image src={src}/>
                <Card.Content>
                    <Card.Header>{projectName}</Card.Header>
                    <Card.Meta>
                        <span>剩余时间:{endTime}秒</span>
                        <Progress indicating percent={percentage} size='small' progress/>
                    </Card.Meta>
                    <Card.Description>不容错过</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <List divided horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                        <List.Item>
                            <List.Content>
                                <List.Header>已筹</List.Header>
                                <List.Description>{currentBalance}wei</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>已达</List.Header>
                                <List.Description>{percentage}%</List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>参与人数</List.Header>
                                <List.Description>{investorCount}人</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        </div>
    )
}


export default CardList