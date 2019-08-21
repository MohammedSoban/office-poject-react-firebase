import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Header from '../Header/Header'
import ProductPictures from './productPictures'
import { ButtonBase } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop:"2%",
  //  paddingBottom:"2%",
    height: 400,
    width: 400,
  },
  control: {
    padding: theme.spacing(20),
  },
}));

export default function SpacingGrid() {

  const datas =[{
  name:'sink',
  picture:'',
  price:12000,
  details:'A kitchen is a room or part of a room used for cooking and food preparation in a .'
},
{
  name:'sink',
  picture:'',
  price:12000,
  details:'A kitchen is a room or part of a room used for cooking and food preparation in a dwelling or in a commercial establishment'
},

{
  name:'sink',
  picture:`http://banella.co.za/wp-content/uploads/2013/11/jpeg-8.jpg`,
  price:12000,
  details:'A kitchen is a room or part of a room used for cooking and food preparation in a'
},
{
  name:'sink',
  picture:`http://banella.co.za/wp-content/uploads/2013/11/jpeg-8.jpg`,
  price:12000,
  details:'A kitchen is a room or part of a room used for cooking and food preparation in a'
},
{
  name:'sink',
  picture:`http://banella.co.za/wp-content/uploads/2013/11/jpeg-8.jpg`,
  price:12000,
  details:'A kitchen is a room or part of a room used for cooking and food preparation in a'
},
{
  name:'sink',
  picture:`http://banella.co.za/wp-content/uploads/2013/11/jpeg-8.jpg`,
  price:12000,
  details:'A kitchen is a room or part of a room used for cooking and food preparation in a'
}
] 

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  function handleChange(event, value) {
    setSpacing(Number(value));
  }
  function goto(){
 
    console.log('hello')
  }

  return (
    <React.Fragment>
      
    <Header/>
    
    <Grid container className={classes.root} spacing={2}>
   
      <Grid item xs={12}>
      
        <Grid container justify="center" spacing={spacing}>
        
          {datas.map(data => (

            

            <Grid key={data} item>
                <ButtonBase className={classes.cardAction}  onClick={goto()}>
              <Paper className={classes.paper}><ProductPictures/>{data.name}</Paper>
              </ButtonBase>
            </Grid>
            
            

          ))}
         
        </Grid>
       
      </Grid>
      
      
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container>
            <Grid item>
              
              <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={handleChange}
                row
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={value.toString()}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    
    </React.Fragment>
  );
}



