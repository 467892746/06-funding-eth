import React from 'react'
import {Button, Table} from 'semantic-ui-react'

const RequestTable = (props) => {
    const {requestDetails, handleApprove, pageKey, handleFinalize,investorsCount} = props

    let final = requestDetails.map((request, index) => {
        let {0:purpose, 1:cost, 2:shopAddress, 3:approveCount, 4:status} = request
        let statusInfo = ''
        if (status == 0){
            statusInfo = 'voting'
        }else if (status == 1){
            statusInfo = 'approved'
        }else if (status == 2) {
            statusInfo = 'complete'
        }
        return (
            <Table.Row key={index}>
                <Table.Cell>{purpose}</Table.Cell>
                <Table.Cell>{cost}</Table.Cell>
                <Table.Cell>{shopAddress}</Table.Cell>
                <Table.Cell>{approveCount} / {investorsCount}</Table.Cell>
                <Table.Cell>{statusInfo}</Table.Cell>
                <Table.Cell>
                    {
                        (pageKey == 2) ? (
                            <Button  onClick={() => handleFinalize(index)}>支付</Button>
                        ) : (
                            <Button  onClick={() => handleApprove(index)}>批准</Button>
                        )
                    }
                </Table.Cell>
            </Table.Row>
        )
    })

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>花费描述</Table.HeaderCell>
                    <Table.HeaderCell>花费金额</Table.HeaderCell>
                    <Table.HeaderCell>商家地址</Table.HeaderCell>
                    <Table.HeaderCell>当前赞成人数</Table.HeaderCell>
                    <Table.HeaderCell>当前状态</Table.HeaderCell>
                    <Table.HeaderCell>操作</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {
                    final
                }
            </Table.Body>
        </Table>
    )
}

export default RequestTable