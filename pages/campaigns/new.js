import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Router } from "../../routes";

function New() {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
 const onSubmit = async (event)=>{
  event.preventDefault();

  setLoading(true);
  const accounts = await web3.eth.getAccounts();
  try {
    await factory.methods.createCampaign(input)
    .send({
      from: accounts[0]
    });
    Router.pushRoute('/');
  } catch (error) {
    setMessage(
      <Message negative>
        <Message.Header>Oops!!</Message.Header>
        <p>{error.message}</p>
      </Message>
    )
  }

  setLoading(false);
  

 }
    return <Layout>
    <h1>New Campaign</h1>
    <Form onSubmit={onSubmit} error={!!message}>
    <Form.Field>
      <label>Minimum Contribution</label>
      <Input
      label='wei'
      labelPosition="right"
      onChange={(event)=>{setInput(event.target.value)}}
      value={input}
    />
    </Form.Field>
    <Button loading={loading} type='submit'>Create</Button>
    </Form>
    {message}
    </Layout>
}

export default New;
