import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Table } from 'semantic-ui-react'
import { Grid, Image } from 'semantic-ui-react'
import firebase from '../Config/config.js'
import { Button } from 'semantic-ui-react'

class Queries extends Component {


    constructor(props) {
        super(props);
    
    
    
        this.state = {
    
       queries:[]
        
         
        }
    
    }

    componentDidMount=()=>{
        var that=this
        const db =firebase.firestore();
    
        var queryHolder=[]
        db.collection("Queries").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              queryHolder.push({...doc.data(),query_id:doc.id})
          });
    
          that.setState({
              queries:queryHolder
          })
        
      });
      }
    
      handleResponse=(email)=>{

        window.location.href=`mailto:${email}`
      }

      handleDelete=(query_id,index)=>{
        var that=this
        const db =firebase.firestore();

        db.collection("Queries").doc(query_id).delete().then(function() {
            console.log("Document successfully deleted!");
            that.state.queries.splice(index,1)
            that.setState({
                queries:that.state.queries
            })
            alert('query succesfully Closed')
        }).catch(function(error) {
            console.error("Error removing document: ", error);
            alert('error closing query ',error)
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
  columns='4'
  selectable={true}
  size='small'
  unstackable>
    
<Table.Header>
  <Table.Row >
    <Table.HeaderCell>Qurey ID</Table.HeaderCell>
    <Table.HeaderCell>Name</Table.HeaderCell>
    <Table.HeaderCell>E-mail address</Table.HeaderCell>
    <Table.HeaderCell>Query</Table.HeaderCell>
    <Table.HeaderCell>Time and Data</Table.HeaderCell>
    <Table.HeaderCell>Respond Query</Table.HeaderCell>
    <Table.HeaderCell>Close Query</Table.HeaderCell>
  </Table.Row>
</Table.Header>

<Table.Body>
  { this.state.queries.map((query,index)=>{
    return(
  <Table.Row>
  <Table.Cell>{query.query_id}</Table.Cell>
  <Table.Cell>{query.name}</Table.Cell>
  <Table.Cell>{query.email}</Table.Cell>
  <Table.Cell><p>{query.message}</p></Table.Cell>
   <Table.Cell>{query.created.seconds}</Table.Cell>
  <Table.Cell><button class="ui primary button" onClick={()=>this.handleResponse(query.email)}>Respond</button></Table.Cell>
  <Table.Cell><button class="ui secondary button" onClick={()=>this.handleDelete(query.query_id,index)} >Close</button></Table.Cell>
 
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

export default Queries;