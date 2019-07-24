import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, yellow } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import callsites from 'callsites';
import Paper from '@material-ui/core/Paper';
import BackgroundImage from './Backgroundimg/Backgroundimg';





const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '500',
    maxHeight: '500',
    marginTop: '20%',
    marginLeft: '50%',
    backgroundColor:'#F4EEEE'

  },

  root: {
    padding: theme.spacing(19),
    backgroundImage:`url(${'/sheet.jpg'})`
  },


  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },

  backgroundColor: {
    backgroundColor: grey[500],

  }

}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
  <div>
     <BackgroundImage/> 
   <Paper className={classes.root}>
      <Card className={classes.card}>
        <h1>allig</h1>
      </Card>
   </Paper>
   </div>
 
    
  );
}
