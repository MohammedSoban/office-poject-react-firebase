import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Table } from 'semantic-ui-react'
import { Grid, Image } from 'semantic-ui-react'
import firebase from '../Config/config.js'




class myUsers extends Component {
 
  constructor(props) {
    super(props);



    this.state = {

   users:[]
    
     
    }

}

  componentDidMount=()=>{
    var that=this
    const db =firebase.firestore();

    var usersHolder=[]
    db.collection("users").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          usersHolder.push({...doc.data(),product_id:doc.id})
      });

      that.setState({
        users:usersHolder
      })
    
  });
  }

    render() {
        return (
         <React.Fragment>
                <Header/>

      
  
      
   
<Grid unstackable={true}>
  <Grid.Row centered={true}>
     
      <Grid.Column width={11} >
      <Table
      columns='3'
      selectable={true}
      size='small'
      unstackable>
        
    <Table.Header>
      <Table.Row >
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>E-mail address</Table.HeaderCell>
        <Table.HeaderCell>Company Name</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      { this.state.users.map((user,index)=>{
        return(
      <Table.Row>
      <Table.Cell>{user.firstName+' '+user.lastName}</Table.Cell>

      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.companyName}</Table.Cell>
      </Table.Row>
        )
      })
    }
      



    </Table.Body>
  </Table>
      </Grid.Column>

     

    </Grid.Row>
  </Grid>



<Footer/>

                </React.Fragment>
        );
    }
}

export default myUsers;