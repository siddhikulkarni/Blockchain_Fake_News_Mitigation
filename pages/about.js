import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Divider, Header, Image, Segment, Message, Input, Placeholder, Card, Icon, Grid} from 'semantic-ui-react'

class About extends Component{

  static async getInitialProps(props){

    const {type}=props.query;
    console.log("the currentuser is ",type);
    return{type};
  }

  render(){
    return (
      <Layout currentuser={this.props.type}>
      <Segment style={{marginTop:'30px'}}>
      <Header as='h2' floated='left'>
        About Us
      </Header>

      <Divider clearing />

      <Grid>
      <Grid.Row>
      <Grid.Column width='3'>
      <Card raised style={{marginLeft:'130px'}}>
      <Image src='/static/shreyas.jpg' wrapped ui={false} size='tiny' />
    <Card.Content>
      <Card.Header>Shreyas Garsund</Card.Header>
      <Card.Meta>
        <span className='date'>PICT</span>
      </Card.Meta>
      <Card.Description>
        Computer Engineer from PICT 2016-2020
      </Card.Description>
      </Card.Content></Card>
      </Grid.Column>

      <Grid.Column  width='3'>
      <Card raised style={{marginLeft:'130px'}}>
      <Image src='/static/siddhi.jpg' wrapped ui={false} size='mini'/>
    <Card.Content>
      <Card.Header>Siddhi Kulkarni</Card.Header>
      <Card.Meta>
        <span className='date'>PICT</span>
      </Card.Meta>
      <Card.Description>
        Computer Engineer from PICT 2016-2020
      </Card.Description>
      </Card.Content></Card>
      </Grid.Column>

      <Grid.Column width='3'>
      <Card raised style={{marginLeft:'130px'}}>
      <Image src='/static/shiavni.jpg' wrapped ui={false} size='tiny'/>
    <Card.Content>
      <Card.Header>Shivani Pahade</Card.Header>
      <Card.Meta>
        <span className='date'>PICT</span>
      </Card.Meta>
      <Card.Description>
        Computer Engineer from PICT 2016-2020
      </Card.Description>
      </Card.Content></Card>
      </Grid.Column>
    <Grid.Column  width='3'>
      <Card raised style={{marginLeft:'130px'}}>
      <Image src='/static/surabhi.jpeg' wrapped ui={false} size='tiny'/>
    <Card.Content>
      <Card.Header>Surabhi Patil</Card.Header>
      <Card.Meta>
        <span className='date'>PICT</span>
      </Card.Meta>
      <Card.Description>
        Computer Engineer from PICT 2016-2020
      </Card.Description>
      </Card.Content></Card>
      </Grid.Column>

      </Grid.Row>
      </Grid>
      </Segment>

      </Layout>
    );
  }
}

export default About;
