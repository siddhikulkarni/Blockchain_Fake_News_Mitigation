import React, {Component} from 'react';
import master from '../ethereum/master';
import web3 from '../ethereum/web3';
import {Card,Button,Table,Confirm, Grid, Image, Container, Divider} from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';
import PublisherRow from '../components/PublisherRow';
import Publisher from '../ethereum/publisher';

class PublisherIndex extends Component
 {

    static async getInitialProps(props){

      const accounts=await web3.eth.getAccounts();
      const publisher_count=await master.methods.publisher_count().call();
      const publishers=await Promise.all(
        Array(parseInt(publisher_count)).fill().map((element,index)=>{
          return master.methods.publisherdetails(index).call()
        })
      );
      const {type}=props.query;
      let photo="QmVhSGos8tZUxTXtvrFmRovY56JriojyYoUsRrXx2Y6VEg";
      console.log("the type is ",type);
      if(type!='reader')
      {
      console.log("damn");
      const publisher=Publisher(type);
      const answer=await publisher.methods.check_reputation_score().call();
      console.log("What is the answer ",answer);
      photo=await publisher.methods.publisher_photo().call();
    }
      const blacklisted_publisher= await master.methods.getBlacklisted().call();
      console.log("Kya hai be ",blacklisted_publisher);
      return{type,publishers,photo, blacklisted_publisher};


    }

    renderPublishers(){

    return (this.props.publishers.map((publisher,index)=>{
        return(
          <PublisherRow
            key={index}
            id={index}
            publisher={publisher}
            type={this.props.type}
          />);
        })
      )

    };

  render()
  {
    const{Header,Row,HeaderCell,Body}=Table;
    return(
    <Layout currentuser={this.props.type}>
    <Grid style={{marginTop:'10px'}}>
    <Grid.Row>
    <Grid.Column width='7'>
    <h2>List of Publishers</h2>
    <Table color='black'>
      <Header>
        <Row>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Description</HeaderCell>
          <HeaderCell>Photo</HeaderCell>
          <HeaderCell>Contract Address</HeaderCell>
          <HeaderCell>View</HeaderCell>
        </Row>
      </Header>
      <Body>
        {this.renderPublishers()}
      </Body>
    </Table>
    </Grid.Column>

    <Grid.Column style={{marginLeft:'350px'}} width='4'>
    <Grid.Row>
    {(this.props.type!='reader')&&
    <Card raised style={{marginLeft:'50px', marginTop:'44px'}}>
    <h2 style={{marginLeft:'45px'}}>View My Profile</h2>
      <Image src={`https://ipfs.infura.io/ipfs/${this.props.photo}`} size='small' bordered circular style={{marginLeft:'45px'}}/>
    <div>
      <Link route={`/publisher/profile/${this.props.type}`}>
    <a>
      <Button color="black" basic style={{marginTop:'15px', marginLeft:'75px'}}>
        My Profile
      </Button>
    </a>
    </Link>
    </div>
    </Card>}
    </Grid.Row>
    <Grid.Row style={{marginTop:'30px'}}>
    <Card style={{marginLeft:'60px'}} raised>
    <h3>BlackListed Publishers</h3>
    {this.props.blacklisted_publisher}
    </Card>
    </Grid.Row>

    </Grid.Column>

    </Grid.Row>
    </Grid>
    </Layout>
  );
}
}

export default PublisherIndex;
