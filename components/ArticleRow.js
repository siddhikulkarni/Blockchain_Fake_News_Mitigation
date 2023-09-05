import React, {Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import {Link, Router} from '../routes';
import web3 from '../ethereum/web3';
import Publisher from '../ethereum/publisher';

class ArticleRow extends Component{

  render(){

      const {Row,Cell}=Table;
      const {id,article,type}=this.props;

    return(
      <Row>
      <Cell>{id}</Cell>
      <Cell>{article.writer}</Cell>
      <Cell>{article.headline}</Cell>
      <Cell>{article.category}</Cell>
      <Cell>
      <Link route={`/publisher/${this.props.address}/article/${id}/${type}`}>
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


export default ArticleRow;
