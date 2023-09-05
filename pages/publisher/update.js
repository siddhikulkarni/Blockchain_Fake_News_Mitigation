import React,{Component} from 'react';
import {Form,Button,Input,Message, Icon} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Publisher from '../../ethereum/publisher';
import master from '../../ethereum/master';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import {Link} from '../../routes';

class PublisherUpdate extends Component{

  state={
    name:'',
    description:'',
    errorMessage:'',

    loading:false
  };
  static async getInitialProps(props){

    const{address}=props.query
    return{address};
  }

  onSubmit=async (event)=>{
    event.preventDefault();

    this.setState({loading:true,errorMessage:''});

    try{

    const accounts=await web3.eth.getAccounts();

    const publisher=Publisher(this.props.address);
    const id=await publisher.methods.id().call();
    await publisher.methods
    .Update(this.state.name,this.state.description)
    .send({
        from:accounts[0],gas:3000000,
        gasPrice:40000000000,
      });
    await master.methods.
    updateDetails(id,this.state.name,this.state.description)
    .send({
        from:accounts[0],gas:3000000,
        gasPrice:40000000000,
      });

      Router.pushRoute(`/publisher/profile/${this.props.address}`);
    }catch(err)
    {
      this.setState({errorMessage:err.message});
    }

    this.setState({loading:false});
  };

  render(){
    return(
      <Layout currentuser={this.props.address}>
       <h3>Update Publisher</h3>
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
       <Input label="News Agency" labelPosition="right" color='black'
        value={this.state.description}
        onChange={event=>this.setState({description:event.target.value})}
       />
       </Form.Field>
       <Message error header="Oops" content={this.state.errorMessage}/>
      <Button loading={this.state.loading} color='black'>Update</Button>
       </Form>

       <Link route={`/publisher/${this.props.address}/update/photo`}>
       <a>
           <Button color="black" style={{marginTop:'10px'}} icon><Icon name='camera'/>Edit Photo</Button>
       </a>
       </Link>

      </Layout>
     );
  }
}

export default PublisherUpdate;
