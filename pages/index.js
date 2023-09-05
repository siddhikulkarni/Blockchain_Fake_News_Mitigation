import React, {Component} from 'react';
import {Button,Divider,Header,Form,Radio,Input,Grid,Segment,Container,Message,Image, Card, Label} from'semantic-ui-react';
import Layout from '../components/Layout';
import {Router} from '../routes';
import master from '../ethereum/master';
import Publisher from '../ethereum/publisher';
import web3 from '../ethereum/web3';

const square = { width: 500, height: 500 }

class Home extends Component{

  state={
    loginusername:'',
    loginpassword:'',
    signupusername:'',
    signuppassword:'',
    password_confirmation:'',
    type:'',
    errorMessageLogin:'',
    errorMessageSignUp:'',
    loadingLogin:false,
    loadingSignUp:false
  };

  static async getInitialProps({props}){
    return {props};
  }

  onLogin=async (event)=>{
    event.preventDefault();
    this.setState({loadingLogin:true,errorMessageLogin:''});
    let result;
    try{
       const accounts=await web3.eth.getAccounts();
       result=await master.methods
       .Login(this.state.loginusername,this.state.loginpassword).call();
           console.log("The return value is ",result);
    }catch(err)
    {
      this.setState({errorMessageLogin:err.message});
    }
    this.setState({loadingLogin:false});

    if(result[0].toString()=='true'&&result[1].toString()=='0x0000000000000000000000000000000000000000')
    {
      Router.pushRoute(`/home/reader`);
    }
    else if(result[0].toString()=='true')
    {
      let currentuser=result[1].toString();
      const publisher =Publisher(currentuser);
      const isTerminated= await publisher.methods.check_reputation_score().call();
      if(isTerminated.toString()=='0x0000000000000000000000000000000000000000')
      {
          Router.pushRoute(`/home/${currentuser}`);
      }
      else{
        const accounts=await web3.eth.getAccounts();
        console.log("PUBLISHER BLACKLISTED");
        await master.methods.setBlacklist(currentuser).send({from:accounts[0], gas:3000000, gasPrice:40000000000});
      }

    }
    else
      this.setState({errorMessageLogin:'Invalid UserName or Password'});

  };

  onSignUp=async (event)=>{
    event.preventDefault();

    this.setState({loadingSignUp:true,errorMessageSignUp:''});
    let type=0;
    if(this.state.type=='reader')
    {
      type=1;
    }
  try{
      const accounts=await web3.eth.getAccounts();
      const result=await master.methods
      .signUp(this.state.signupusername,this.state.signuppassword,type)
      .send({
          from:accounts[0],gas:3000000,
          gasPrice:40000000000,
        });
        if(this.state.type=='publisher')
        {
          Router.pushRoute(`/publisher/new/${this.state.signupusername}`);
        }
        else
        {
            Router.pushRoute(`/home/${this.state.type}`);
        }
    }catch(err)
    {
      this.setState({errorMessageSignUp:err.message});
    }
    this.setState({loadingSignUp:false});
  };


  validate=()=>{
    let nameError="";
    if(!this.state.signupusername){
      this.setState({errorMessageSignUp:'Name Cannot Be Empty'});
      return false;
    }
    if(this.state.signuppassword!=this.state.password_confirmation){
      this.setState({errorMessageSignUp:'Password Do Not Match'});
      return false;
    }
    return true;
  };

  handleSignUp=event=>{
    event.preventDefault();
    const isValid=this.validate();
    if(isValid){
    console.log("Valid Credentials");
    this.onSignUp(event);
  }
};


  render()
  {
    return(

        <Container style={{backgroundImage: `url(${"static/backdrop19.jpg"})` ,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'}}>

        <Image src="/static/backdrop_upper.jpg" centered/>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>


        <Grid style={{ marginTop:'80px', marginLeft:'700px'}} columms={2} divided>
        <Grid.Row>
          <Grid.Column width={7} >
          <h1 >Login</h1>
            <Form onSubmit={this.onLogin} error={!!this.state.errorMessageLogin}>

              <Form.Input
              required
              label='Username'
              placeholder='Username'
                value={this.state.loginusername}
                onChange={event=>this.setState({loginusername:event.target.value})}
              />

              <Form.Input
              required
              label='Password'
              placeholder='Password'
                value={this.state.loginpassword}
                type='password'
                onChange={event=>this.setState({loginpassword:event.target.value})}
              />
              <Message error header="Oops" content={this.state.errorMessageLogin}/>
              <Button content='Login' loading={this.state.loadingLogin}
                style={{backgroundColor:'black',color:'white'}}/>
            </Form>

            </Grid.Column>

            <Grid.Column width={7}>
      <h1>Sign up</h1>


      <Form onSubmit={this.handleSignUp} error={!!this.state.errorMessageSignUp}  style={{marginTop:'10px'}}>

        <Form.Input
        required
          label='Username'
          placeholder='Username'
          value={this.state.signupusername}
          onChange={event=>this.setState({signupusername:event.target.value})}
        />

        <Form.Input
        required
        label='Password'
          placeholder='Password'
          value={this.state.signuppassword}
          type='password'
          onChange={event=>this.setState({signuppassword:event.target.value})}
        />

        <Form.Input
        required
        label='Confirm Password'
          placeholder='Re-Enter Password'
          type='password'
          name='password_confirmation'
          value={this.state.password_confirmation}
          onChange={event=>this.setState({password_confirmation:event.target.value})}
        />



        <Message error header="Oops" content={this.state.errorMessageSignUp}/>
        <Form.Field required>
        <h4>As: </h4><b>{this.state.type}</b>
          <Radio
            label='Publisher'
            value='publisher'
            checked={this.state.type === 'publisher'}
            onChange={event=>this.setState({type:'publisher'})}
          />
          <Radio
          label='Reader'
          value='reader'
          checked={this.state.type === 'reader'}
          onChange={event=>this.setState({type:'reader'})}
          />
          </Form.Field>
        <Button content='Sign up' loading={this.state.loadingSignUp}
          style={{backgroundColor:'black',color:'white', marginTop:'10px'}}/>

        </Form>

        </Grid.Column>

      </Grid.Row>

        </Grid>

</Container>
);
}

}



export default Home;
