import React, { Component } from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
// import { Table } from 'semantic-ui-react'
import { Grid, Image } from 'semantic-ui-react'
import firebase from '../Config/config.js'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import DataTable from 'react-data-table-component'
import { Button } from 'semantic-ui-react'

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
    db.collection("users").orderBy('timestamp','desc').get().then(function(querySnapshot) {
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

  handleContact=(email)=>{

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}` ,`_blank`)
    
  }

  ContactAll=(email)=>{

    this.state.users.map((user)=>{

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}` ,`_blank`)

    })
  }

    render() {

      const columns=[{
        name:'Title'
      }]
        return (
         <React.Fragment>
                <Header/>

      
                <br/>
      
                <br/>
  
  <div style={{ 
    minHeight:600
  }}
      >
        <div style={{marginBottom:'5%'}}>
        <button class="ui primary button" onClick={()=>this.ContactAll()}>Contact ALL</button>
        </div>
       
<Grid unstackable={true}>

  <Grid.Row centered={true}>


      <Grid.Column width={11} >
      
     
    
           <Table className="tdBefore" border='2' Selectable Rows>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                <Th>E-mail</Th>
                <Th>Company Name</Th>
                <Th>Time and Date</Th>
                <Th>Contact</Th>
              </Tr>
            </Thead>
            <br/>
            <Tbody>
              { this.state.users.map((user,index)=>{
                return(
                <Tr>
                  <Td>{user.firstName+' '+user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.companyName}</Td>
                <Td>{new Date(user.created).getHours()}:{new Date(user.created).getMinutes()}<br/>{new Date(user.created).getDate()} - {new Date(user.created).getMonth()+1}- {new Date(user.created).getFullYear()}</Td>
                 <Td><button class="ui primary button" onClick={()=>this.handleContact(user.email)}>contact</button></Td>

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

export default myUsers;