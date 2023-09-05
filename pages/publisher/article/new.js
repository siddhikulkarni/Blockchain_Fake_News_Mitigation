import React, {Component} from 'react';
import {Link, Router} from '../../../routes';
import {Form,Button,Message,Input,Image,TextArea, Icon} from 'semantic-ui-react';
import Layout from '../../../components/Layout';

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host:'ipfs.infura.io',port: '5001', protocol: 'https'});
let reader;

class ArticleNew extends Component
 {
   state={
  photobuffer:null,
  photohash:'',
  content:'',
  contentbuffer:null,
  contenthash:''
};

static async getInitialProps(props)
{
  const{address}=props.query;
  return{address};
}

  capturePhoto= async (event)=>{
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
    console.log("The buffered file is ",this.state.photobuffer);
  }

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
  };

    captureContent= async(event)=>{
    event.preventDefault();

    let content;let buffer;
    if(typeof document!=='undefined')
    {
      content=this.state.content;
      buffer= Buffer.from(content,'utf-8');
    }
    console.log("The Article Content is ",content);
    console.log("The Buffered Content is ",buffer);
    this.setState({contentbuffer:buffer});
};
    onSubmitContent=async (event)=>{
    event.preventDefault();
    console.log("Submitting File to IPFS");
    await ipfs.add(this.state.contentbuffer,(error,result)=>{
      console.log("File Hash is ",result[0].hash);
      this.setState({contenthash:result[0].hash});
      Router.pushRoute(`/publisher/${this.props.address}/article/${this.state.contenthash}/${this.state.photohash}/confirm`);
      if(error){
        console.log("There is error ",error);
        return;
      }
    })
  };

  render()
  {
    return(
      <Layout currentuser={this.props.address}>

        <Link route={`/publisher/${this.props.address}/article`}>
      <a>
          <h3 style={{color:'grey'}} icon><Icon name='chevron left'/>Back</h3>
        </a>
      </Link>
      <div>

      <h1 style={{marginLeft:'430px'}}>IPFS File Upload</h1>

      <Form onSubmit={this.onSubmitPhoto} >
       <Button style={{marginTop:'20px'}} as="label" htmlFor="file" type="button"  size="small" icon>
       <Icon name='camera'/>
        Select Photo
        </Button>
        <input type="file" id="file" hidden onChange={this.capturePhoto}/>
        <Button type="submit" icon><Icon name='arrow alternate circle up'/>Upload Photo</Button>
       </Form>
       <Image alt='Image Goes Here' src={`https://ipfs.infura.io/ipfs/${this.state.photohash}`} size='medium' bordered circular/>
      <h3>Content</h3>
      <Form onSubmit={this.onSubmitContent}>
      <TextArea rows={4} placeholder='Please Enter your Content here'
      value={this.state.content}
      onChange={event=>this.setState({content:event.target.value})} />
      <Button style={{marginTop:'10px'}} onClick={this.captureContent}>Submit Content to IPFS</Button>
      <Button style={{marginTop:'20px', marginLeft:'700px'}} type="submit" color='black' icon><Icon name='chevron right'/>Proceed</Button>
      </Form>
      </div>
      </Layout>
  );
}
}

export default ArticleNew;
