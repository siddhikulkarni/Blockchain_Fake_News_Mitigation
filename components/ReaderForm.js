import React,{Component} from 'react';
import {Form,Input,Message,Button} from 'semantic-ui-react';
import Publisher from '../ethereum/publisher';
import web3 from '../ethereum/web3';
import {Router} from '../routes';

class ReaderForm extends Component{
  state={
    value:'',
    errorMessage:'',
    loading:false
  };
  onSubmit=async event=>{
    event.preventDefault();
    const publisher=Publisher(this.props.address);

    this.setState({loading:true,errorMessage:''});

    try{
      const accounts=await web3.eth.getAccounts();
      await publisher.methods.setReader().send({
        from:accounts[0],
        gas:'3000000',
        gasPrice:'40000000000',
        value:'0'
      });
      Router.replaceRoute(`/publisher/${this.props.address}/${this.props.currentuser}`)
    }catch(err){
        this.setState({errorMessage:err.message});
    }
    this.setState({loading:false,value:'',});
  };

  render(){
    return(
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Reader Contribution</label>
          <Input
          style={{ backgroundColor: 'black'}}
          value={this.state.value}
          onChange={event=>this.setState({value:event.target.value})}
          label="ether" labelPosition="right"/>
        </Form.Field>
        <Message error header="Oops" content={this.state.errorMessage}/>
        <Button primary loading={this.state.loading}>
          Contribute
        </Button>
      </Form>
    );
  }
}
export default ReaderForm;
