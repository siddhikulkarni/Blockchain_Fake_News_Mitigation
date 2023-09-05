import React, {Component} from 'react';
import {Form,Button,Message,Input} from 'semantic-ui-react';
import master from '../../../ethereum/master';
import Publisher from '../../../ethereum/publisher';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/Layout';

class ArticleConfirm extends Component{

    state={
      headline:'',
      category:'',
      loading:false,
      errorMessage:''
    };
    static async getInitialProps(props){

      const{address,photohash,contenthash}=props.query;

      return{address,photohash,contenthash};
    }


    onSubmit=async event=>{
      event.preventDefault();

      const publisher=Publisher(this.props.address);

      this.setState({loading:true,errorMessage:''});

      try {
              const accounts=await web3.eth.getAccounts();
              await publisher.methods
              .publish(this.state.headline,this.state.category,this.props.contenthash,this.props.photohash)
              .send({from:accounts[0],gas:3000000,
                gasPrice:40000000000,value:'100'});

                let name=await publisher.methods.name().call();
                let id=await publisher.methods.getArticleCount().call();
                id=id-1;
                console.log("The following is going as input");
                console.log(id,this.props.address,name,this.state.headline,this.props.photohash);
                if(this.state.category=="Politics")
                {
                  await master.methods.setPolitics(id,this.props.address,name,this.state.headline,this.props.photohash)
                  .send({from:accounts[0],gas:3000000,
                    gasPrice:40000000000});
                }
                else if(this.state.category=="Sports")
                {
                  await master.methods.setSports(id,this.props.address,name,this.state.headline,this.props.photohash)
                  .send({from:accounts[0],gas:3000000,
                    gasPrice:40000000000});
                }
                else if(this.state.category=="Finance")
                {
                  await master.methods.setFinance(id,this.props.address,name,this.state.headline,this.props.photohash)
                  .send({from:accounts[0],gas:3000000,
                    gasPrice:40000000000});
                }
                else if(this.state.category=="Entertainment")
                {
                  await master.methods.setEntertainment(id,this.props.address,name,this.state.headline,this.props.photohash)
                  .send({from:accounts[0],gas:3000000,
                    gasPrice:40000000000});
                }
                else
                {
                  await master.methods.setOther(id,this.props.address,name,this.state.headline,this.props.photohash)
                  .send({from:accounts[0],gas:3000000,
                    gasPrice:40000000000});
                }

              Router.pushRoute(`/publisher/${this.props.address}/article/${this.props.address}`);

      } catch (err) {
          this.setState({errorMessage:err.message});
      }

      this.setState({loading:false});

    };

  render(){
    return (
              <Layout currentuser={this.props.address}>
                <h3>Confirm Article</h3>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Headline</label>
                  <Input
                      value={this.state.headline}
                      onChange={event=>
                          this.setState({headline:event.target.value})}
                        />
                  </Form.Field>
                  <Form.Field>
                  <label>Category</label>
                  <div>
                  <Input list='category' placeholder='Choose Category...'
                  value={this.state.category}
                  onChange={event=>
                      this.setState({category:event.target.value})} />
                  <datalist id='category'>
                    <option value='Politics'/>
                    <option value='Sports'/>
                    <option value='Finance'/>
                    <option value='Entertainment'/>
                    <option value='Other'/>
                  </datalist>
                </div>
                </Form.Field>
                <Message error header="Oops" content={this.state.errorMessage}/>
                <Button primary loading={this.state.loading}>Create</Button>
              </Form>
            </Layout>
    );
  }
}

export default ArticleConfirm;
