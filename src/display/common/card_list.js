import React from "react";
import {Card, Image, List, Progress} from "semantic-ui-react";

const src = '/images/logo193.png'

const CardList = (props) => {
    let details = props.details
    let onCardClick = props.onCardClick
    let cards = details.map( detail => {
        return <CardFunding key = {detail.fundingAddress}
                            detail = {detail}
                            onCardClick = {onCardClick}
        />
    })
   return (
       <Card.Group >
           {cards}
       </Card.Group>
   )
}

const CardFunding = (props) => {
    const {detail} = props;
    const {fundingAddress, manager, projectName, targetMoney, supportMoney, leftTime, balance, investorsCount} = detail;
    let percent = parseFloat(balance)/parseFloat(targetMoney) * 100
    return (
        <div>
            <Card onClick={()=>{props.onCardClick && props.onCardClick(detail)}}>
                <Image src={src}/>
                <Card.Content>
                    <Card.Header>{projectName}</Card.Header>
                    <Card.Meta>
                        <span>剩余时间:{leftTime}秒</span>
                        <Progress  percent={percent} size='small' progress/>
                    </Card.Meta>
                    <Card.Description>不容错过</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <List divided horizontal style={{display: 'flex', justifyContent: 'space-around'}}>
                        <List.Item>
                            <List.Content>
                                <List.Header>已筹</List.Header>
                                {balance} wei
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>已达</List.Header>
                                {percent}%
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>参与人数</List.Header>
                                {investorsCount}
                            </List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        </div>
    )
}


export default CardList