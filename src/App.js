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
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// Backend
import axios from 'axios';
import * as data from './components/JSON/data.example.json';

// Styles
import clsx from 'clsx';

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
import { Divider, Icon, Menu, ListItemIcon, Avatar, Paper, createMuiTheme, Box } from '@material-ui/core';
import TaskForm, {fillPercentage} from './components/taskForm.js';
import DataForm from './components/dataForm.js';
import Calendar from './components/calendar.js'

const appBarHeight = 60;
const drawerWidth = 250;

const useStyles = makeStyles(theme => ({ 
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		background: '#ffffff',
		color: '#606060',
		height: appBarHeight,
	},
	list: {
		width: drawerWidth,
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
		display: 'block',
		marginLeft: 0,
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
		[theme.breakpoints.up('sm')]: {
			
		},
	},
	drawerPaper: {
		width: drawerWidth,
		flexShrink: 0,
		overflowX: 'scroll',
		boxShadow: '3px 0 3px rgba(68, 68, 68, 0.3)',
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'&::-webkit-scrollbar': {
			width: 3,
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgb(255, 255, 255, 0)',
			outline: '1px solid slategrey',
			'&:hover': {
				backgroundColor: 'rgba(0,160,0,.2)',
			},
		}
	},
	dividerDiv: {
		height: 30,
		marginTop: 40,
		paddingBottom: 5,
		width: drawerWidth,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	listItem: {
		height: 40,
		marginLeft: 0,
	},
	icon: {
		marginRight: 30,
		marginLeft: 10,
	},
	avatar: {
		display: 'flex',
	},
	sectionDesktop: {
		display: 'flex',
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
		flexGrow: 0,
		marginTop: appBarHeight + 20,
		display: 'flex',
		// flexWrap: 'wrap',
		'& > *': {
			marginRight: theme.spacing(2),
			marginBottom: theme.spacing(13)
			// width: theme.spacing(16),
			// height: theme.spacing(16),
		},
		[theme.breakpoints.up('sd')]: {
			display: 'block',
		},
		
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		whiteSpace: 'no-wrap',
		transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(9) + 1,
	},
	topMarginDrawer: {
		marginTop: 40
	},
	sectionName: {
		fontWeight: 700,
	},
	tasksBlock: {
	},
	countUsersAndOrders: {
	},
	logoButSize: {
		width: '100%',
	},
	toolBar: {
		minHeight: 64,
	},
	calendar: {

	}
}));

function App() {

	// Drawer open or closed
  const [state, setState] = React.useState({
    isSideBar: false,
  });

  // Account menu open or closed
  const [openPoperAccount, setOpenPoperAccount] = React.useState(false);

  // Drawer chosen item
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const anchorRef = React.useRef(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleToggle = () => {
    setOpenPoperAccount(prevOpen => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenPoperAccount(false);
    }
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenPoperAccount(false);
  };

  const classes = useStyles();
  let sidebar =
        <div className={classes.list} >
			<Drawer 
			variant="permanent"
			classes={{
				paper: clsx(classes.drawerPaper, {
					[classes.drawerClose]: !state.isSideBar,
					[classes.drawerOpen]: state.isSideBar,
				})
			}}
			className={clsx(classes.drawerPaper, {
				[classes.drawerClose]: !state.isSideBar,
				[classes.drawerOpen]: state.isSideBar,
			})}
			>
				<div className={classes.topMarginDrawer}>
				</div>
				<div className={classes.dividerDiv}>
							<Typography className={classes.sectionName}>
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
							<Typography className={classes.sectionName}>
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
							<Typography  className={classes.sectionName}>
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

		window.onload = () => function() {
			fillPercentage("task_zero", data.tasks[0].done_rate / 100);
			fillPercentage("task_one", data.tasks[1].done_rate / 100)
		}()
  return (
    <div className={classes.root}>
		<div>
		<div className={classes.grow}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolBar}>
					<div className={classes.logoButSize}>
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
					</div>
					{/* <div className={classes.grow} /> */}
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
						<div>
							<Button className={classes.greetings}
							ref={anchorRef}
							aria-controls={openPoperAccount ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={handleToggle}>
								{textEn.greetings + ""}
							</Button>
							<Popper open={openPoperAccount} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
							{({ TransitionProps, placement }) => (
								<Grow
								{...TransitionProps}
								style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
								>
								<Paper>
									<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={openPoperAccount} id="menu-list-grow" onKeyDown={handleListKeyDown}>
										<MenuItem onClick={handleClose}>Profile</MenuItem>
										<MenuItem onClick={handleClose}>My account</MenuItem>
										<MenuItem onClick={handleClose}>Logout</MenuItem>
									</MenuList>
									</ClickAwayListener>
								</Paper>
								</Grow>
							)}
							</Popper>
						</div>
						<Avatar className={classes.avatar} ></Avatar>
						{/* <Menu 
						title={textEn + ""}>
							{/* TODO }
						</Menu> */}
					</div>
				</Toolbar>
			</AppBar>
		</div>
		</div>
		{sidebar}
		<main className={classes.papers}>
			<div className={classes.countUsersAndOrders}>
				<DataForm isShop={false} data={data.active_users} text={textEn.active_users} />
				<DataForm isShop={true} data={data.new_orders} text={textEn.new_orders} />
			</div>
			<div className={classes.tasksBlock}>
				<TaskForm
				name={data.tasks[0].name}
				description={data.tasks[0].description}
				doneRate={data.tasks[0].done_rate} 
				taskID={"task_zero"}
				/>
				<TaskForm
				name={data.tasks[1].name}
				description={data.tasks[1].description}
				doneRate={data.tasks[1].done_rate}
				taskID={"task_one"}
				/>
			</div>
			<Calendar 
			className={classes.calendar}
			name={textEn.calendar} 
			/>
		</main>
    </div>
  );
}

export default App;
