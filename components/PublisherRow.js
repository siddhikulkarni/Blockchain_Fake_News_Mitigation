import React, {Component} from 'react';
import {Table,Button,Image} from 'semantic-ui-react';
import {Link, Router} from '../routes';
import web3 from '../ethereum/web3';
import Publisher from '../ethereum/publisher';

class PublisherRow extends Component{
    render(){
      const {Row,Cell}=Table;
      const {id,publisher,type}=this.props;
      return(
      <Row>
      <Cell>{id}</Cell>
      <Cell>{publisher.publishername}</Cell>
      <Cell>{publisher.publisherdescription}</Cell>
      <Cell>
      <Image src={`https://ipfs.infura.io/ipfs/${publisher.publisherphoto}`} size='small' bordered circular/>
      </Cell>
      <Cell>{publisher.contractaddress}</Cell>
      <Cell>
      <Link route={`/publisher/${publisher.contractaddress}/${type}`}>
      <a>
        <Button color="black" basic>
          View Publisher
        </Button>
      </a>
      </Link>
      </Cell>
      </Row>
    );
  }
}

export default PublisherRow;
