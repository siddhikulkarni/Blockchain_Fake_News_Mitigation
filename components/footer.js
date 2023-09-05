import React,{Component} from 'react';
import {Menu,Popup,Button, Confirm, Divider, Grid, Icon} from 'semantic-ui-react';
import {Link, Router} from '../routes';

class Footer extends Component{


    render(){
      return(
        <div style={{marginTop:'90px'}}>
        <Divider />
        <Grid columms={2} divided>
        <Grid.Row>
        <Grid.Column width={2}>
        Privacy Rights
        </Grid.Column>
        <Grid.Column width={2}>
        Terms of Use
        </Grid.Column>
        <Grid.Column width={2} floated='right'>
        Follow us
        </Grid.Column>
        <Grid.Column>
        <Icon name='facebook'/>
        </Grid.Column>
        <Grid.Column>
        <Icon name='twitter'/>
        </Grid.Column>
        </Grid.Row>
        </Grid>
        <Divider />
      </div>
      );
    }
};
export default Footer;
