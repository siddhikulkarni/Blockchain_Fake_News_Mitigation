import React, {Component} from 'react';
import {Table,Button,Image} from 'semantic-ui-react';
import {Link, Router} from '../routes';
import web3 from '../ethereum/web3';

class CategoryRow extends Component{

    render(){
      const {Row,Cell}=Table;
      const {type,category}=this.props;
      return(
      <Row>
      <Cell>{category.articleid}</Cell>
      <Cell>{category.articlewritername}</Cell>
      <Cell>{category.articleheadline}</Cell>
      <Cell>
      <Image src={`https://ipfs.infura.io/ipfs/${category.articlephoto}`} size='small' bordered circular/>
      </Cell>
      <Cell>
      <Link route={`/publisher/${category.articlewriteraddress}/article/${category.articleid}/${type}`}>
      <a>
        <Button color="blue" basic>
          View Full Article
        </Button>
      </a>
      </Link>
      </Cell>
      </Row>
    );
  }
}

export default CategoryRow;
