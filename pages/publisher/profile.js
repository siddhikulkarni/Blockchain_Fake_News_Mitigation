import React,{Component} from 'react';
import Layout from '../../components/Layout';
import {Grid,Card,Button,Image, Message, Divider, Icon, Popup} from 'semantic-ui-react';
import Publisher from '../../ethereum/publisher';
import web3 from '../../ethereum/web3';
import ReaderForm from '../../components/ReaderForm';
import {Link} from '../../routes';

class PublisherProfile extends Component{
  static async getInitialProps(props){

    const publisher=Publisher(props.query.address);
    const summary=await publisher.methods.getPublisherDetails().call();
    return {
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
    return{props};
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
          meta:'Name of Publisher',
          description:'Name of Publisher Agency',
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

      return <Card.Group color='black' items={items}/>

  }

  render(){

    return(
      <Layout currentuser={this.props.address}>
       <h1 style={{marginTop:'20px', marginLeft:'450px'}}>User Profile</h1>
       <Grid>
       <Grid.Row>
        <Grid.Column width={12} >
          {this.renderCards()}
        </Grid.Column>

        <Grid.Column width={4}>
          <Card>
          <Image src={`https://ipfs.infura.io/ipfs/${this.props.publisher_photo}`} size='medium' />
            <Card.Content>
            <Card.Header>{this.props.name}</Card.Header>

          </Card.Content>
          <Card.Content extra>
          <a>
          <Icon name='user' />
          {this.props.readersCount} Readers
          </a>
          </Card.Content>
          </Card>

          <Link route={`/publisher/${this.props.address}/update`}>
          <Button color="grey" icon><Icon name='edit'/></Button>
          </Link>


        <Link route={`/publisher/${this.props.address}/article/new`}>
        <a>
          <Button color="grey" style={{marginBottom:10}} icon>
          <Icon name='plus'/>
          Add Article</Button>
        </a>
        </Link>
        </Grid.Column>
      </Grid.Row>
      </Grid>

      <Divider style={{marginLeft:'120px'}} vertical/>
      <div style={{marginTop:'20px', marginLeft:'230px'}}>
      <Link route={`/publisher/${this.props.address}/article/${this.props.address}`}>
      <a>
          <Button color="grey" icon><Icon name='angle right'/>View Your Articles</Button>
      </a>
      </Link>
      </div>
      </Layout>
  );
  }
}

export default PublisherProfile;
