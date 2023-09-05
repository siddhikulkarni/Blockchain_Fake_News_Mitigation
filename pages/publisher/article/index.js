import React, {Component} from 'react';
import {Button,Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Publisher from '../../../ethereum/publisher';
import ArticleRow from '../../../components/ArticleRow';
import ReaderForm from '../../../components/ReaderForm';

class ArticleIndex extends Component{

    static async getInitialProps(props){
      const {address}=props.query;
      const {type}=props.query;
      const publisher=Publisher(address);
      const articlesCount=await publisher.methods.getArticleCount().call();
      const readersCount=await publisher.methods.readers_count().call();

      const articles=await Promise.all(
        Array(parseInt(articlesCount)).fill().map((element,index)=>{
          return publisher.methods.list_of_info(index).call()
        })
      );
      console.log(articles);
      return{type,address,articles,articlesCount,readersCount};
    }

    renderRows(){

      return this.props.articles.map((article,index)=>{
        return(<ArticleRow
              key={index}
              id={index}
              article={article}
              address={this.props.address}
              type={this.props.type}
              />
          );
      })
    }

  render(){

    const{Header,Row,HeaderCell,Body}=Table;

    return(

      <Layout currentuser={this.props.type}>
        <h1>Articles List</h1>
        <h3>Find this publisher's articles trustworthy??
            Become a Reader Now!!</h3>
        <div>
        {(this.props.type=='reader')&&
        <ReaderForm address={this.props.address} currentuser={this.props.type}/>}
        </div>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Writer</HeaderCell>
              <HeaderCell>Headline</HeaderCell>
              <HeaderCell>Category</HeaderCell>
              <HeaderCell>View</HeaderCell>
            </Row>
          </Header>

          <Body>
            {this.renderRows()}
          </Body>

        </Table>
        <div>Found {this.props.articlesCount} Articles </div>
      </Layout>
    );
  }
}

export default ArticleIndex;
