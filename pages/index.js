import React, { useEffect, useState } from "react";
import { Card, CardGroup, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import instance from "../ethereum/factory";
import Layout from '../components/Layout';
import {Link} from '../routes';


function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);
    useEffect(()=>{
        async function loadList() {
          const camps =  await instance.methods.getDeployedContracts().call();
          setCampaigns(camps);
        }
    loadList();
    },[]);
function renderCampaigns(){
  const items = campaigns.map((address)=>{
    return{
      header: address,
      description: (<Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>),
      fluid: true
    }
    
  });

  return <CardGroup items={items} />
}
    
    return <Layout>
    <Link route='/campaigns/new'>
    <a>
    <Button 
      floated="right"
      content='Create Campaign'
      icon='add'
      primary
    />
    </a>
    </Link>
    {renderCampaigns()}
    </Layout>
}

export default CampaignList;