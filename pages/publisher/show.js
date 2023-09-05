import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Grid,Card,Button,Image} from 'semantic-ui-react';
import Publisher from '../../ethereum/publisher';
import web3 from '../../ethereum/web3';
import ReaderForm from '../../components/ReaderForm';
import {Link} from '../../routes';

class PublisherShow extends Component{
  static async getInitialProps(props){

    const publisher=Publisher(props.query.address);

    const summary=await publisher.methods.getPublisherDetails().call();

    const {type}=props.query;
      console.log("the type is ",type);

    return {
        type:props.query.type,
        address:props.query.address,
        publisher_account:summary[0],
        name:summary[1],
        description:summary[2],
        reputation_score:summary[3],
        readersCount:summary[4],
        articlesCount:summary[5],
        verified:summary[6],
        warning:summary[7],
        publisher_photo:summary[8]
    };
  }

  renderCards(){

      const{
        publisher_account,
        name,
        description,
        reputation_score,
        readersCount,
        articlesCount,
        verified,
        warning,
        publisher_photo
      }=this.props;

      const items=[
        {
          header:publisher_account,
          meta:'Address of Publisher',
          description:'This is the publisher who can publish new articles',
          style :{overflowWrap:'break-word'}
        },
        {
          header:name,
          meta:'Name of the Publisher',
          description:'Name of Publisher Agency'
        },
        {
          header:description,
          meta:'Description of Publisher',
          description:'Publisher Details'
        },
        {
          header:articlesCount,
          meta:'Number of Articles',
          description:'Number of Articles Published'
        },
        {
          header:reputation_score,
          meta:'Reputation Score',
          description:'Reputation of the Publisher'
        },
        {
          header:(verified ?'Verified':'Non-Verified'),
          meta:'Status',
          description:'Verification Status of Publisher'
        },
        {
          header:readersCount,
          meta:'Number of Readers',
          description:'Number of Readers subscribed to the Publisher'
        },
        {
          header:warning,
          meta:'Number of Warnings',
          description:'Number of warnings issued to the Publisher'
        },
      ];

      return <Card.Group items={items}/>

  }

  render(){
    return(
      <Layout currentuser={this.props.type}>
       <h3>Publisher Details</h3>
       <Grid>
       <Grid.Row>
        <Grid.Column width={11}>
          {this.renderCards()}
        </Grid.Column>
        <Grid.Column width={4}>
          <div>
            <Image src={`https://ipfs.infura.io/ipfs/${this.props.publisher_photo}`} size='medium' bordered circular/>
          </div>
          {(this.props.type=='reader')&&
          <div>
          <ReaderForm address={this.props.address} currentuser={this.props.type}/>
          </div>
        }
          </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Link route={`/publisher/${this.props.address}/article/${this.props.type}`}>
          <a>
              <Button primary>View Articles</Button>
          </a>
          </Link>
        </Grid.Column>
      </Grid.Row>
      </Grid>
      </Layout>
  );
  }
}

export default PublisherShow;
