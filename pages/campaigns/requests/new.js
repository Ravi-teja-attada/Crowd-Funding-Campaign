import React, { useState } from "react";
import { Form, Button, Message, Input, FormField } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/Campaign";
import web3 from "../../../ethereum/web3";
import {Link, Router} from "../../../routes";
function addRequest({address}){
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [recipient, setRecepient] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    
    async function onSubmit(event){
        event.preventDefault();
        setMessage('');
        setLoading(true);
        try{
            const campaign = new Campaign(address);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.spendRequest(web3.utils.toWei(value,'ether'), description, recipient)
            .send({from:accounts[0]});
            Router.pushRoute(`/campaigns/${address}/requests`);
        }catch(err){
            setMessage(
                <Message negative>
                  <Message.Header>Oops!!</Message.Header>
                  <p>{err.message}</p>
                </Message>);
        }
        setLoading(false);
    }
    return <Layout>
        <Link route={`/campaigns/${address}/requests`}>
            <a>Back</a>
        </Link>
        <Form onSubmit={onSubmit} error={!!message}>
            <FormField>
                <label>Description</label>
                <Input 
                    value = {description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
            </FormField>
            <FormField>
                <label>Value</label>
                <Input 
                    value = {value}
                    onChange={(e)=>setValue(e.target.value)}
                />
            </FormField>
            <FormField>
                <label>Recipient</label>
                <Input 
                    value = {recipient}
                    onChange={(e)=>setRecepient(e.target.value)}
                />
            </FormField>
            <Button loading={loading} primary>Create Request</Button>
            {message}
        </Form>
    </Layout>
}

addRequest.getInitialProps= async(ctx)=>{
    return {address: ctx.query.address}
}

export default addRequest;