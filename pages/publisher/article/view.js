import React, {Component} from 'react';
import web3 from '../../../ethereum/web3';
import master from '../../../ethereum/master';
import Layout from '../../../components/Layout';
import {Link, Router} from '../../../routes';
import {Button,Container,Header,Form,Message,Grid,Card,Popup,Image} from 'semantic-ui-react';
import Publisher from '../../../ethereum/publisher';

const ipfsAPI = require('ipfs-api');

const ipfs = ipfsAPI({host:'ipfs.infura.io',port: '5001', protocol: 'https'});

class ViewArticle extends Component{
  state={
  fetchedarticle:''
  };
  static async getInitialProps(props){

    const{address,id,type}=props.query;
    const publisher=Publisher(address);
    publisher.getPastEvents("allEvents", { fromBlock: 1}).then(console.log);
    const article=await publisher.methods.list_of_info(id).call();
    return{address,article,id,type};
  }

  getData=async (event)=>{
   event.preventDefault();
   console.log("Trying to read file");
   console.log(this.props.article.content);

   const ipfsfile=await ipfs.files.get(this.props.article.content);

   console.log(ipfsfile[0].content);
   const data = this.convert(ipfsfile[0].content);
   console.log("The file is ",data);
   this.setState({fetchedarticle:data});
};
   convert=(array)=>{
   var out, i, len, c;
   var char2, char3;

   out = "";
   len = array.length;
   i = 0;
   while(i < len) {
   c = array[i++];
   switch(c >> 4)
   {
     case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
       // 0xxxxxxx
       out += String.fromCharCode(c);
       break;
     case 12: case 13:
       // 110x xxxx   10xx xxxx
       char2 = array[i++];
       out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
       break;
     case 14:
       // 1110 xxxx  10xx xxxx  10xx xxxx
       char2 = array[i++];
       char3 = array[i++];
       out += String.fromCharCode(((c & 0x0F) << 12) |
                      ((char2 & 0x3F) << 6) |
                      ((char3 & 0x3F) << 0));
       break;
   }
   }

   return out;
}

  onUpvote=async()=>{

            const accounts=await web3.eth.getAccounts();
            const publisher=Publisher(this.props.address);
            await publisher.methods
            .upvote(this.props.id)
            .send({from:accounts[0]});
            console.log("After upvote ",publisher.getPastEvents("after_upvote"));

  };

  onDownvote=async()=>{

            const accounts=await web3.eth.getAccounts();
            const publisher=Publisher(this.props.address);
            await publisher.methods
            .downvote(this.props.id)
            .send({from:accounts[0]});

  };


    renderArticle(){
        const {id,article}=this.props;
        return article.content;
    };

  render(){

    const {id,articles}=this.props;
    return(
      <Layout currentuser={this.props.type}>
      <Grid>

      <Grid.Row>
      <Link route={`/publisher/${this.props.address}/article/${this.props.type}`}>
      <a>
      <h4>Back</h4>
      </a>
      </Link>
      </Grid.Row>

      <Grid.Row>
      <Card fluid>
      <Card.Content header="View Article"/>
      </Card>
      </Grid.Row>

      <Grid.Row>
      <Image src={`https://ipfs.infura.io/ipfs/${this.props.article.article_photo}`} size='medium' bordered circular/>
      </Grid.Row>

      <Grid.Row>
      <Card fluid>
      <Card.Content header={this.props.article.headline}/>
      </Card>
      <Button primary onClick={this.getData}>Get Content From IPFS</Button>
      <Container fluid content={this.state.fetchedarticle}/>
      </Grid.Row>

      <Grid.Row>
      <Popup
      trigger={<Button onClick={this.onUpvote}>
      Upvote
      </Button>}
      content="If you agree with the contents of the article"
      />

      <Popup
      trigger={<Button onClick={this.onDownvote}>
      Downvote
      </Button>}
      content="If you disagree with the contents of the article"
      />
      </Grid.Row>

      <Link route={`/publisher/${this.props.address}/article/${this.props.id}/${this.props.type}/eventlog`}>
      <Button primary>View Upvotes and Downvotes</Button>
      </Link>
      </Grid>
      </Layout>



    );
  }
}

export default ViewArticle;
