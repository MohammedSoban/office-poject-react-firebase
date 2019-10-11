import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import firebase from '../Config/config.js'
import { Grid, Image } from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

class viewClients extends Component {
    
    constructor(props) {
        super(props);
    
    
    
        this.state = {
    
          
       clients:[],
      
        
         
        }
    
    }


componentDidMount=()=>{

    var that=this
    const db =firebase.firestore();

    var clientsHolder=[]

    db.collection("clients").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            clientsHolder.push({...doc.data(),client_id:doc.id})
        });

        that.setState({
            clients:clientsHolder
        })
    });
}

handleDelete=(client_id,index)=>{
    var that=this
    const db =firebase.firestore();

    db.collection("clients").doc(client_id).delete().then(function() {
        console.log("Document successfully deleted!");
        that.state.clients.splice(index,1)
        that.setState({
            clients:that.state.clients
        })
        alert('client succesfully deleted')
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        alert('error deleteing logo ',error)
    });
  }

  goto = path => {
    this.props.history.push(path);
  };

    render() {
        return (
            <div>
                <Header/>
                <br/>
                <Grid unstackable={true}>
<Grid.Row centered={true}>
 
  <Grid.Column width={12} >

                <Table border='2'>
<Thead>
  <Tr>
    <Th>Clinet ID</Th>
    <Th>Name</Th>
    <Th>Logo</Th>

    <Th>Delete Client</Th>

  </Tr>
</Thead>
<br/>
<Tbody>
{ this.state.clients.map((client,index)=>{
      return(
  <Tr>
    <Td>{client.client_id}</Td>
    <Td>{client.clientName}</Td>
    <Td><img src={client.imageUrl} width='70px' height='70px'/></Td>
    <Td><button class="ui secondary button" onClick={()=>this.handleDelete(client.client_id,index)} >Delete</button></Td>
  </Tr>
      )
   })
}

</Tbody>
</Table>
</Grid.Column>

 

</Grid.Row>
</Grid>

                <Footer/>
                
            </div>
        );
    }
}

export default withRouter(viewClients);