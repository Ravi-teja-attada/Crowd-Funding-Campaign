import React from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/Campaign";
import {Router} from "../routes";

function RequestRow(props){
    const {Row, Cell} = Table;
    async function onApprove(){
        const campaign = new Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(props.id).send({from:accounts[0]});
        Router.pushRoute(`/campaigns/${props.address}`)
    }
    async function onFinalize(){
        const campaign = new Campaign(props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(props.id).send({from:accounts[0]});
        Router.pushRoute(`/campaigns/${props.address}`)
    }
    return <Row disabled={props.request.completed} positive={props.request.approvalCount>props.approversCount/2 && !props.request.completed}>
        <Cell>{props.id}</Cell>
        <Cell>{props.request.description}</Cell>
        <Cell>{web3.utils.fromWei(props.request.value,'ether')}</Cell>
        <Cell>{props.request.recipient}</Cell>
        <Cell>{props.request.approvalCount}/{props.approversCount}</Cell>
        <Cell>{props.request.completed?null:(
            <Button color="green" onClick={onApprove}>Approve</Button>
            )}
        </Cell>
        <Cell>{props.request.completed?null:(
            <Button color="teal" onClick={onFinalize}>Finalize</Button>
            )}
        </Cell>
    </Row>
}

export default RequestRow;