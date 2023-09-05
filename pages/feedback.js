import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Divider, Header, Image, Segment, Message, Input, Placeholder, Form, TextArea, Radio, Button, Rating} from 'semantic-ui-react'

class About extends Component{

  static async getInitialProps(props){

    const {type}=props.query;
    console.log("the currentuser is ",type);
    return{type};
  }

  render(){
    return (
      <Layout currentuser={this.props.type}>
      <Segment style={{marginTop:'20px'}}>
      <Header as='h2' floated='left'>
      Your Feedback
      </Header>
      <Message style={{marginTop:'40px'}}>We would love to hear your thoughts, concerns, or problems with anything so we can improve!</Message>
      <Divider clearing />
      <Form>
      <Form.Field required>
      <label>Name</label>
      <input />
      </Form.Field>

      <Form.Field required>
      <label>Email</label>
      <input />
      </Form.Field>

      <Form.Field required>
      <label>Describe Feedback</label>
      <TextArea placeholder='Tell us more' />
      </Form.Field>

      <Radio label='Comments' />
      <Radio label='Bug Reports' />
      <Radio label='Questions' />

      </Form>
      <div style={{marginTop:'20px'}}>
      <h5>Plese leave your Rating!</h5>
      <Rating maxRating={5} clearable />
      </div>
      <div>
      <Button color="black" type='submit' style={{marginLeft:'400px'}}>Submit Feedback</Button>
      </div>
      </Segment>
      </Layout>
    );
  }
}

export default About;
