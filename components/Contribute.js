import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/Campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

function Contribute(props){

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
   async function submit(event){
        event.preventDefault();

        setLoading(true);
        setMessage('');
        try{
            const campaign = new Campaign(props.address)
            const accounts= await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(input, 'ether')
             });

             Router.replaceRoute(`/campaigns/${props.address}`)
        }catch(err){
            setMessage(
                <Message negative>
                  <Message.Header>Oops!!</Message.Header>
                  <p>{err.message}</p>
                </Message>);
                setInput('');
        }
        setLoading(false);
        
    }
    return (
        <Form onSubmit={submit} error={!!message}>
            <Form.Field>
             <label>Amount to Contribute</label>
             <Input 
             value={input}
             onChange={(e)=>setInput(e.target.value)}
             label='ether'
             labelPosition='right'
             placeholder='Enter amount' />
            </Form.Field>
            <Button loading={loading} primary>Contribute</Button>
            {message}
        </Form>
    )
}

export default Contribute;