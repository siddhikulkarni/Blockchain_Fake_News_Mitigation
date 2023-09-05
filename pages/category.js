import {Link} from '../routes';
import React, {Component} from 'react';
import master from '../ethereum/master';
import web3 from '../ethereum/web3';
import {Card,Button,Table} from 'semantic-ui-react';
import Layout from '../components/Layout';
import CategoryRow from '../components/CategoryRow';
import Publisher from '../ethereum/publisher';

class Category extends Component
 {
    static async getInitialProps(props){

      const accounts=await web3.eth.getAccounts();
      const{subcategory}=props.query;
      const{type}=props.query;
      console.log(subcategory);
      let category;let category_count;
      if(subcategory=="politics")
      {
          category_count=await master.methods.politics_count().call();
          category=await Promise.all(
          Array(parseInt(category_count)).fill().map((element,index)=>{
            return master.methods.politics(index).call()
          })
        );
      }
      else if(subcategory=="sports")
      {
          category_count=await master.methods.sports_count().call();
          category=await Promise.all(
          Array(parseInt(category_count)).fill().map((element,index)=>{
            return master.methods.sports(index).call()
          })
        );
      }
      if(subcategory=="finance")
      {
          category_count=await master.methods.finance_count().call();
          category=await Promise.all(
          Array(parseInt(category_count)).fill().map((element,index)=>{
            return master.methods.finance(index).call()
          })
        );
      }
      if(subcategory=="entertainment")
      {
          category_count=await master.methods.entertainment_count().call();
          category=await Promise.all(
          Array(parseInt(category_count)).fill().map((element,index)=>{
            return master.methods.entertainment(index).call()
          })
        );
      }
      if(subcategory=="other")
      {
          category_count=await master.methods.other_count().call();
          category=await Promise.all(
          Array(parseInt(category_count)).fill().map((element,index)=>{
            return master.methods.other(index).call()
          })
        );
      }
      return{type,category};
    }

    renderCategory(){

    return (this.props.category.map((category,index)=>{
        return(
          <CategoryRow
            key={index}
            category={category}
            type={this.props.type}
          />);
        })
      )};

  render()
  {
    const{Header,Row,HeaderCell,Body}=Table;

    return(
    <Layout currentuser={this.props.type}>
    <div>
    <h1></h1>
    <h1></h1>
    </div>
    <Table>
      <Header>
        <Row>
          <HeaderCell>ID</HeaderCell>
          <HeaderCell>WriterName</HeaderCell>
          <HeaderCell>Headline</HeaderCell>
          <HeaderCell>Photo</HeaderCell>
          <HeaderCell>View</HeaderCell>
        </Row>
      </Header>
      <Body>
        {this.renderCategory()}
      </Body>

    </Table>

    </Layout>
  );
}
}

export default Category;
