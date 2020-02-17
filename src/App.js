import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: '#ffffff',
      color: '#606060',
  },
  list: {
	width: 250,
  },
}));

function App() {

  const [state, setState] = React.useState({
    isSideBar: false,
  });

  const classes = useStyles();
  let sidebar = null;
  if (state.isSideBar) {
    	sidebar =
        <div className={classes.list} onClick={() => setState({
			...state,
			isSideBar: !state.isSideBar,
		})}>
            <Drawer open={state.isSideBar}
			>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>;
}
  return (
    <div >

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Button onClick={()=>setState({
            ...state, 
            isSideBar: !state.isSideBar,
          })}>
            <img alt="qwerty" src="https://unsplash.it/40/40"/>
          </Button>
          <Typography variant="h6" noWrap>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>

      {sidebar}
      
    </div>
  );
}

export default App;
