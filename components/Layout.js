import React,{Component} from 'react';
import Header from './header';
import Footer from './footer';
import {Grid, Container} from 'semantic-ui-react';
import Head from 'next/head';

class Layout extends Component{

render(){
  return(
    <Container>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      <Header currentuser={this.props.currentuser}/>
      <Grid container columms={1}>
      <Grid.Row>
      <Grid.Column>
      {this.props.children}
      </Grid.Column>
      </Grid.Row>
      </Grid>
      <Footer currentuser={this.props.currentuser}/>
      </Container>
  );
}
};
export default Layout;
