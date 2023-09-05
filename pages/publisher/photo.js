import React,{Component} from 'react';
import {Form,Button,Input,Message,Image, Grid, Divider, Icon} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Publisher from '../../ethereum/publisher';
import master from '../../ethereum/master';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host:'ipfs.infura.io',port: '5001', protocol: 'https'});
let reader;

class PublisherPhoto extends Component{

  state={
    photobuffer:null,
    photohash:'',
    loading:false
  };

  static async getInitialProps(props){

    const publisher=Publisher(props.query.address);
    const summary=await publisher.methods.getPublisherDetails().call();
    return {
        address:props.query.address,
        publisher_photo:summary[8]
    };
  }

  fileCapture= async (event)=>{
  event.preventDefault();
  const file=event.target.files[0];
  if(typeof window=='undefined')
  {
    console.log("SSR");
    reader = new FileReader();
  }
  else
  {
   console.log("CSR");
   reader=new window.FileReader();
  }
  await reader.readAsArrayBuffer(file);
  reader.onloadend=async ()=>{
    let buffer=await reader.result;
    buffer=Buffer(buffer);
    this.setState({photobuffer:buffer});
  }
};
onSubmit=async(event)=>{
  event.preventDefault();
  reader.onloadend=async ()=>{
    let buffer=await reader.result;
    buffer=Buffer(buffer);
    this.setState({photobuffer:buffer});
  }
  console.log("The buffered file is ",this.state.photobuffer);

    await ipfs.add(this.state.photobuffer,(error,result)=>{
    this.setState({photohash:result[0].hash});
    console.log("File Hash is ",this.state.photohash);
    if(error){
      console.log("There is error ",error);
      return;
    }
  })
}
  confirm=async()=>{
  try{
  const accounts=await web3.eth.getAccounts();
  const publisher=Publisher(this.props.address);
  const id=await publisher.methods.id().call();
  console.log("this id is ",id);

  await publisher.methods
  .setPublisherPhoto(this.state.photohash)
  .send({
      from:accounts[0],gas:3000000,
      gasPrice:40000000000,
    });
  await master.methods
  .updatePhoto(id,this.state.photohash)
  .send({
      from:accounts[0],gas:3000000,
      gasPrice:40000000000,
    });
    Router.pushRoute(`/publisher/profile/${this.props.address}`);
  }catch(err)
  {
    console.log(err);
  }
};

  render(){
    return(
      <Layout currentuser={this.props.address}>
       <h2 style={{marginLeft:'415px'}}>Update Your Profile Photo</h2>
       <Divider />
       <Grid columns={3} divided style={{marginTop:'20px'}}>
       <Grid.Row>
       <Grid.Column>
       <h2 style={{marginLeft:'40px'}}>Old Profile Photo</h2>
      <Image style={{marginLeft:'60px', marginTop:'30px'}} src={`https://ipfs.infura.io/ipfs/${this.props.publisher_photo}`} size='small' bordered circular/>
      </Grid.Column>
      <Grid.Column>
      <Image style={{marginTop:'60px'}} src='/static/arrows2.jpg' size='medium'/>
      <Form onSubmit={this.onSubmit}>
      <Button style={{marginLeft:'20px'}} as="label" htmlFor="file" type="button" size="small" color='grey'>
       <Icon name='folder'/>
        Select Photo
        </Button>
        <input type="file" id="file" hidden onChange={this.fileCapture}/>
        <Button type="submit" color='grey'>
        <Icon name='arrow alternate circle up'/>
        Upload Photo</Button>
        </Form>

       </Grid.Column>
       <Grid.Column>
       <h2 style={{marginLeft:'80px'}}>New Profile Photo</h2>
       <Image style={{marginLeft:'100px', marginTop:'30px'}} src={`https://ipfs.infura.io/ipfs/${this.state.photohash}`} size='small' bordered circular/>
         <Button style={{marginLeft:'110px', marginTop:'10px'}} color='black' onClick={this.confirm}>Save Changes</Button>
         </Grid.Column>
         </Grid.Row>
         </Grid>
      </Layout>
     );
  }
}

export default PublisherPhoto;
