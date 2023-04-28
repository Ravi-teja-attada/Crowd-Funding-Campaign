import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/Campaign';
import { Button, Card, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import Contribute from '../../components/Contribute';
import {Link} from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
            console.log('ok');
            console.log(summary);
            return{
                address: props.query.address,
                balance: summary[0],
                minContribution:summary[1],
                requestsLength:summary[2],
                approversCount:summary[3],
                owner:summary[4]
            };
        }

        displayCard(){
            const {balance,minContribution,requestsLength,approversCount,owner} = this.props

            const items = [
                {
                  header: owner,
                  meta: 'Address of the Owner',
                  description:
                    'The Owner created this campaign and can create requests to wothdraw money',
                  
                  style: {overflowWrap : 'break-word'}
                },
                {
                  header: minContribution,
                  meta: 'Minimum Contribution (wei)',
                  description:
                    'This is the minimum amount of wei you must contribute to become an approver',
                  
                  style: {overflowWrap : 'break-word'}
                },
                {
                  header: web3.utils.fromWei(balance, 'ether'),
                  meta: 'Balance of this campaign (ether)',
                  description:
                    'Amount of ether left to be spend by the owner of this campaign',
                  
                  style: {overflowWrap : 'break-word'}
                },
                {
                  header: requestsLength,
                  meta: 'Number of active requests',
                  description:
                    'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
                  
                  style: {overflowWrap : 'break-word'}
                },
                {
                  header: approversCount,
                  meta: 'Number of approvers',
                  description:
                    'Number of people who have already donated to the campaign',
                  
                  style: {overflowWrap : 'break-word'}
                }];

            return <Card.Group items={items} />
        }


      render(){ return <Layout>
        <h1>Its working</h1>
        <Grid>
        <GridRow>
        <Grid.Column width={10}>
        {this.displayCard()}
        
        </Grid.Column>
        <Grid.Column width={6}>
        <Contribute address={this.props.address}/>
        </Grid.Column>
        </GridRow>
        <GridRow>
          <GridColumn>
          <Link route={`/campaigns/${this.props.address}/requests`}>
        <a>
          <Button 
            primary
            content='view requests'
          />
        </a>
        </Link>
          </GridColumn>
        </GridRow>
        </Grid>
        </Layout>} 

    }

export default CampaignShow;