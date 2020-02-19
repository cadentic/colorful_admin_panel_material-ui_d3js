import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import SvgIcon from '@material-ui/core/SvgIcon';
import axios from 'axios';

// Icons
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

// import json-s
import * as textEn from './components/JSON/text.en.json';
import IconButton from '@material-ui/core/IconButton';
import { Divider, Icon, Menu, ListItemIcon, Avatar, Paper } from '@material-ui/core';
const appBarHeight = 60;

const useStyles = makeStyles(theme => ({
  appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: '#ffffff',
	  color: '#606060',
	  height: appBarHeight,
  },
  list: {
  width: 250,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(0, 1, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
    },
  },
  search: {
	paddingTop: 3,
    position: 'relative',
    backgroundColor: fade(theme.palette.common.black, 0.10),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.20),
	},
	borderRadius: 50,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
	},
	height: 20,
	top: 7,
	right: 10,
  },
  logoBut: {
	marginLeft: 0,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
  	},
  maxWidth: 200,
  },
  searchIcon: {
    width: theme.spacing(0),
	height: 20,
	marginLeft: 130,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerPaper: {
	top: appBarHeight,
	boxShadow: '3px 0 3px rgba(68, 68, 68, 0.3)',
  },
  dividerDiv: {
	  height: 30,
	  marginLeft: 20,
	  marginTop: 40,
	  paddingBottom: 5,
  },
  listItem: {
	  height: 40,
	  marginLeft: 0,
  },
  icon: {
	  marginRight: 10,
	  marginLeft: 10,
  },
  avatar: {
	display: 'flex',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  grow: {
    flexGrow: 1,
  },
  greetings: {
	marginRight: 10,
  },
  papers: {
	alignItems: "center",
	justify: "center",
	marginTop: appBarHeight + 20,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
	},
  },
}));

function App() {

  const [state, setState] = React.useState({
    isSideBar: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const classes = useStyles();
  let sidebar = null;
  if (state.isSideBar) {
    	sidebar =
        <div className={classes.list} onClick={() => setState({
			...state,
			isSideBar: !state.isSideBar,
		})}>
            <Drawer open={state.isSideBar}
			width={200}
			variant="persistent"
			anchor='left'
			classes={{
					paper: classes.drawerPaper
				}}
			      >
					<div className={classes.dividerDiv}>
						<Typography>
							{textEn.main}
						</Typography>
					</div>
					<List className={classes.list}>
						<ListItem className={classes.listItem} button key={textEn.home}
						onClick={event => handleListItemClick(event, 0)}
						selected={selectedIndex===0}>
							<HomeOutlinedIcon fontSize='small' className={classes.icon}/>
							<ListItemText primary={textEn.home} />
						</ListItem>
						<ListItem button key={textEn.messages}
						onClick={event => handleListItemClick(event, 1)}
						selected={selectedIndex===1}>
							<EmailOutlinedIcon fontSize='small' className={classes.icon}/>
							<ListItemText primary={textEn.messages} />
						</ListItem>
					</List>
					<div className={classes.dividerDiv}>
						<Typography>
							{textEn.apps}
						</Typography>
					</div>
					<List className={classes.list}>
						<ListItem button key={textEn.charts}
						onClick={event => handleListItemClick(event, 2)}
						selected={selectedIndex===2}>
							<BarChartOutlinedIcon fontSize='small' className={classes.icon} />
							<ListItemText primary={textEn.charts} />
						</ListItem>
						<ListItem button key={textEn.forms}
						onClick={event => handleListItemClick(event, 3)}
						selected={selectedIndex===3}>
							<FileCopyOutlinedIcon fontSize='small' className={classes.icon} />
							<ListItemText primary={textEn.forms} />
						</ListItem>
						<ListItem button key={textEn.layout}
						onClick={event => handleListItemClick(event, 4)}
						selected={selectedIndex===4}>
							<LayersOutlinedIcon fontSize='small' className={classes.icon} />
							<ListItemText primary={textEn.layout} />
						</ListItem>
					</List>
					<div className={classes.dividerDiv}>
						<Typography>
							{textEn.extras}
						</Typography>
					</div>
					<List className={classes.list}>
						<ListItem button key={textEn.timer}
						onClick={event => handleListItemClick(event, 5)}
						selected={selectedIndex===5}>
							<TimerOutlinedIcon fontSize='small' className={classes.icon} />
							<ListItemText primary={textEn.timer} />
						</ListItem>
						<ListItem button key={textEn.users}
						onClick={event => handleListItemClick(event, 6)}
						selected={selectedIndex===6}>
							<PersonOutlineOutlinedIcon fontSize='small' className={classes.icon} />
							<ListItemText primary={textEn.users} />
						</ListItem>
					</List>
            </Drawer>
        </div>;
}
  return (
    <div className={classes.bg}>
		<div className={classes.grow}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Button 
					fullWidth={false}
					edge="start"
					className={classes.logoBut}
					onClick={()=>setState({
						...state, 
						isSideBar: !state.isSideBar,
					})}
					style={{flex: 1}}>
						Your logo
					</Button>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon fontSize='small'/>
							</div>
							<InputBase 
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
							/>
						</div>
						<Button className={classes.greetings}>
							{textEn.greetings + ""}
						</Button>
						<Avatar className={classes.avatar} ></Avatar>
						{/* <Menu 
						title={textEn + ""}>
							{/* TODO }
						</Menu> */}
					</div>
				</Toolbar>
			</AppBar>
		</div>
		{sidebar}
		<div className={classes.papers}>
			<Paper elevation={3}></Paper>
			<Paper elevation={3}></Paper>
			<Paper elevation={3}></Paper>
			<Paper elevation={3}></Paper>
			<Paper elevation={3}></Paper>
			<Paper elevation={3}></Paper>
			<Paper elevation={3}></Paper>
		</div>
    </div>
  );
}

export default App;
