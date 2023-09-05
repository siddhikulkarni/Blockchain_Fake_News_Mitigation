import React , {Component} from 'react';
import {Menu,Responsive,Button,Image,Confirm, Popup, Grid, Segment, Label, Divider, Icon} from 'semantic-ui-react';
import {Link} from '../routes';

class Header extends Component {

  constructor() {
          super();

          var today = new Date(),
              date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

          this.state = {
              date: date
          };
      }

 state = { open: false }
 open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

static async getInitialProps(props){
  const {type}=props.query;

}

  render() {
    return (
      <div currentuser={this.props.type}>
      <marquee style={{ color: 'grey', fontSize: '2em' , marginTop:'20px'}}>Dedicate to Authentic News</marquee>

      <Divider />
      <Grid columns={3}>
      <Grid.Row>
      <Grid.Column>
      <Image style={{marginTop:'20px', marginLeft:'85px'}} src="/static/quotes2.jpg" size="small"/>
      </Grid.Column>
      <Grid.Column>
      <div>
      <Image style={{marginTop:'20px'}} src="/static/LogoF1.jpg" centered size='medium'/>

      <h3 style={{marginLeft:'100px'}}>{this.state.date}</h3>
      </div>
      </Grid.Column>
      <Grid.Column>
      <Image src="/static/quotes3.jpg" style={{marginTop:'20px', marginLeft:'96px'}} size="small"/>
      </Grid.Column>
      </Grid.Row>
      </Grid>
      <Divider />

      <Grid columms={6} divided>

      <Grid.Row>

      <Grid.Column width={2} style={{ marginLeft:'120px'}}>
      <Link route={`/home/${this.props.currentuser}`}><a><h3 style={{color:'grey'}}>Home</h3></a></Link>
      </Grid.Column>

      <Grid.Column width={2} >
      <Link route={`/category/politics/${this.props.currentuser}`}><a><h3 style={{color:'grey'}}>Politics</h3></a></Link>
      </Grid.Column>

      <Grid.Column width={2} >
      <Link route={`/category/sports/${this.props.currentuser}`}><a><h3 style={{color:'grey'}}>Sports</h3></a></Link>
      </Grid.Column>

      <Grid.Column width={2} >
      <Link route={`/category/finance/${this.props.currentuser}`}><a><h3 style={{color:'grey'}}>Finance</h3></a></Link>
      </Grid.Column>

      <Grid.Column width={2} >
      <Link route={`/category/entertainment/${this.props.currentuser}`}><a><h3 style={{color:'grey'}}>Entertainment </h3></a></Link>
      </Grid.Column>
      <Grid.Column width={2}>
      <Link route={`/category/other/${this.props.currentuser}`}><a><h3 style={{color:'grey'}}>Other</h3></a></Link>
      </Grid.Column>

      <Grid.Column width={1}>
      <Popup wide trigger={<Button icon ><Icon name='cog' /></Button>} on='click'>
      <Grid divided columns='equal'>
        <Grid.Column>

          <Popup
            trigger={<Link route={'/'}><Button onClick={this.open} content='Log Out' fluid /></Link>}
            position='top center'
            size='tiny'

          />

          <Popup
            trigger={<Link route={`/about/${this.props.currentuser}`}><Button style={{marginTop:'5px'}} content='About Us' fluid /></Link>}
            position='top center'
            size='tiny'
          />

          <Popup
            trigger={<Link route={`/feedback/${this.props.currentuser}`}><Button style={{marginTop:'5px'}} content='Feedback' fluid /></Link>}
            position='top center'
            size='tiny'
          />

        </Grid.Column>
      </Grid>
      </Popup>
      </Grid.Column>


      </Grid.Row>
      </Grid>

      <Divider />
      </div>

    )
  }
}
export default Header;
