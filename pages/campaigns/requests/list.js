import React, { useEffect, useState } from "react";
import { Button, Table } from "semantic-ui-react";
import {Link} from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/Campaign";
import RequestRow from "../../../components/RequestRow";

function List({address}){
    const campaign = Campaign(address);
    const {Header, Row, HeaderCell, Cell, Body} = Table;
    const [requests, setRequests] = useState([]);
    const [approversCount, setApproversCount] = useState();
    
    
    useEffect(()=>{
        async function getRequests(){
            const approverCount = await campaign.methods.approversCount().call();
            const requestsCount = await campaign.methods.getRequestsCount().call();
           const requestList = await Promise.all(
        Array(parseInt(requestsCount)).fill()
        .map((element, index)=> {
            return campaign.methods.requests(index).call();
        })
        );
        setRequests(requestList);
        setApproversCount(approverCount);
        }
        getRequests();
    },[]) 
    
    function renderRows() {
        return requests.map((request, index)=>{
            return <RequestRow 
                key={index}
                id={index}
                request={request}
                address={address}
                approversCount={approversCount}
            />
        })
    }
    return <Layout>
        <Link route={`/campaigns/${address}/requests/new`}>
            <a>
                <Button primary>Add Request</Button>
            </a>
        </Link>
        <Table>
            <Header>
                <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Recipient</HeaderCell>
                    <HeaderCell>Approval Count</HeaderCell>
                    <HeaderCell>Approve</HeaderCell>
                    <HeaderCell>Finalize</HeaderCell>
                </Row>
            </Header>
            <Body>
                {renderRows()}
            </Body>
        </Table>
        <div>Found {requests.length} requests</div>
    </Layout>
}

List.getInitialProps = async(ctx)=>{
    return {address: ctx.query.address}
}
export default List;