import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
// import { Table } from 'semantic-ui-react'
import { Grid, Image } from 'semantic-ui-react'
import firebase from '../Config/config.js'
import { Button } from 'semantic-ui-react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

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
     
        db.collection("Queries").orderBy('timestamp','desc').get().then(function(querySnapshot) {
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

        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}` ,`_blank`)
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

  
<br/>
  
  <div style={{ 
    minHeight:600
  }}
      >

<Grid unstackable={true}>
<Grid.Row centered={true}>
 
  <Grid.Column width={12} >



<Table border='2'>
      <Thead>
        <Tr>
          <Th>Qurey ID</Th>
          <Th>Name</Th>
          <Th>E-mail</Th>
          <Th>Query</Th>
          <Th>Time and Date</Th>
          <Th>Respond Query</Th>
          <Th>Close Query</Th>
        </Tr>
      </Thead>
      <br/>
      <Tbody>
      { this.state.queries.map((query,index)=>{
            return(
        <Tr>
          <Td>{query.query_id}</Td>
          <Td>{query.name}</Td>
          <Td>{query.email}</Td>
          <Td><p>{query.message}</p></Td>
          <Td>{new Date(query.created).getHours()}:{new Date(query.created).getMinutes()}<br/>{new Date(query.created).getDate()} - {new Date(query.created).getMonth()+1}- {new Date(query.created).getFullYear()}</Td>
          <Td><button class="ui primary button" onClick={()=>this.handleResponse(query.email)}>Respond</button></Td>
          <Td><button class="ui secondary button" onClick={()=>this.handleDelete(query.query_id,index)} >Close</button></Td>
        </Tr>
            )
         })
}

      </Tbody>
    </Table>
  </Grid.Column>

 

</Grid.Row>
</Grid>

</div>

<Footer/>

            </React.Fragment>
        );
    }
}

export default Queries;