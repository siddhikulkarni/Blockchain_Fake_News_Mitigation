import React,{Component} from 'react';
import {Form,Button,Input,Message,Segment,Container,Image, Step} from 'semantic-ui-react';
import master from '../../ethereum/master';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host:'ipfs.infura.io',port: '5001', protocol: 'https'});
let reader;

class PublisherNew extends Component{
  state={
    name:'',
    description:'',
    errorMessage:'',
    photobuffer:null,
    photohash:'',
    loading:false
  };

  static async getInitialProps(props){
    const {username}=props.query;
    return {username};
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
onSubmitPhoto=async(event)=>{
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

  onSubmit=async (event)=>{
    event.preventDefault();

    this.setState({loading:true,errorMessage:''});

    try{
    const accounts=await web3.eth.getAccounts();
    await master.methods
    .Enroll(this.state.name,this.state.description,this.state.photohash,this.props.username)
    .send({
        from:accounts[0],gas:3000000,
        gasPrice:40000000000,
        value:'200'
      });
      Router.pushRoute('/');
    }catch(err)
    {
      this.setState({errorMessage:err.message});
    }

    this.setState({loading:false});
  };
  render(){
    return(
      <Container style={{marginTop:'80px'}}>
      <Image src="/static/LogoF.jpg" centered size='small'/>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
      <Segment>

      <Step.Group ordered style={{marginLeft:'100px'}}>
    <Step completed>
      <Step.Content>
        <Step.Title>Sign Up</Step.Title>
        <Step.Description>You have signed up to the application succesfully</Step.Description>
      </Step.Content>
    </Step>

    <Step active>
      <Step.Content>
        <Step.Title>Create your Profile</Step.Title>
        <Step.Description>Add your details</Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
        <Step.Title>Log In</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>

       <h2>Create a Publisher</h2>
       <h4>Profile Photo</h4>
      <Image alt='Photo Goes Here' src={`https://ipfs.infura.io/ipfs/${this.state.photohash}`} size='medium' bordered circular/>
      <Form onSubmit={this.onSubmitPhoto}>
       <Button as="label" htmlFor="file" type="button" primary size="small">
        Select Photo
        </Button>
        <input type="file" id="file" hidden onChange={this.fileCapture}/>
        <Button type="submit" primary>Store Photo on IPFS</Button>
       </Form>
       <h1></h1>
       <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
       <Form.Field>
       <label>Name</label>
       <Input label="News Agency" labelPosition="right"
        value={this.state.name}
        onChange={event=>this.setState({name:event.target.value})}
       />
       </Form.Field>
       <Form.Field>
       <label>Description</label>
       <Input label="News Agency" labelPosition="right"
        value={this.state.description}
        onChange={event=>this.setState({description:event.target.value})}
       />
       </Form.Field>
       <Message error header="Oops" content={this.state.errorMessage}/>
      <Button loading={this.state.loading}primary>Create</Button>
       </Form>
       </Segment>
       </Container>
     );
  }
}

export default PublisherNew;
