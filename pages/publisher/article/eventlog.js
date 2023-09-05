import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Grid, Segment, Divider, Table} from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import master from '../../../ethereum/master';
import Publisher from '../../../ethereum/publisher';

var answer;
var date;
var from;
var action;
var answer_downvote;
var date_downvote;
var from_downvote;
var action_downvote;
class EventLog extends Component{

  static async getInitialProps(props){
    const{address}=props.query;
    const{id}=props.query;
    const publisher=Publisher(address);

      var event=publisher.getPastEvents("after_upvote",{fromBlock:1},function(error, result) {
          if (!error)
          console.log("Upvote");
          console.log(result[0].returnValues);
          answer=JSON.stringify(result[0].returnValues);
          console.log("Answer:"+ answer);
          date=answer.substring(95,114);
          console.log("Date:"+ date);
          from=answer.substring(115,168);
          console.log("Sender:"+ from);
          action=answer.substring(169,202);
          console.log("Action:" + action);
        });

      var downvote_event= publisher.getPastEvents("after_downvote", {fromBlock:1}, function(error, result){
        if(!error)
        console.log("Downvote");
        console.log(result[0].returnValues);
        answer_downvote=JSON.stringify(result[0].returnValues);
        console.log("Answer Downvote:"+ answer_downvote);
        date_downvote=answer_downvote.substring(97,116);
        console.log("Downvote date:"+date_downvote);
        from_downvote=answer_downvote.substring(117,170);
        console.log("From:"+from_downvote);
        action_downvote=answer_downvote.substring(171,206)
        console.log("Action:"+action_downvote);



      });


    return{address,id,date,from, action,date_downvote,from_downvote,action_downvote};
  }

  render(){
    return(
      <Layout>

      <Grid>
      <Grid.Row>

  <Table stripped style={{marginTop:'20px'}}>
  <Table.Header>
  <Table.HeaderCell> Date </Table.HeaderCell>
  <Table.HeaderCell> Reader Address </Table.HeaderCell>
  <Table.HeaderCell> Action </Table.HeaderCell>
  </Table.Header>

  <Table.Body>
  <Table.Cell>{this.props.date}</Table.Cell>
  <Table.Cell>{this.props.from}</Table.Cell>
  <Table.Cell>{this.props.action}</Table.Cell>
  </Table.Body>
  </Table>
  </Grid.Row>
  <Grid.Row>
  <Table stripped style={{marginTop:'20px'}}>
  <Table.Header>
  <Table.HeaderCell> Date </Table.HeaderCell>
  <Table.HeaderCell> Reader Address </Table.HeaderCell>
  <Table.HeaderCell> Action </Table.HeaderCell>
  </Table.Header>

  <Table.Body>
  <Table.Cell>{this.props.date_downvote}</Table.Cell>
  <Table.Cell>{this.props.from_downvote}</Table.Cell>
  <Table.Cell>{this.props.action_downvote}</Table.Cell>
  </Table.Body>
  </Table>
  </Grid.Row>


  </Grid>
  </Layout>
    );
  }
}

export default EventLog;
