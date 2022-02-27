import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;


const Sidebar = (props) => {
    const { window } = props;
    const drawer = (
        <div>
            <List sx={{ mt: '80px' }}>
                <NavLink activeClassName="active" to='products'>
                    <ListItem button sx={{ backgroundColor: 'inherit' }} >
                        <ListItemIcon >
                            <Inventory2Icon />
                        </ListItemIcon>
                        <ListItemText primary={"Products"} />
                    </ListItem>
                </NavLink >
                <NavLink activeClassName="active" to='categories'>
                    <ListItem button sx={{ backgroundColor: 'inherit' }} >
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Categoriess"} />
                    </ListItem>
                </NavLink >
                <NavLink activeClassName="active" to='users'>
                    <ListItem button sx={{ backgroundColor: 'inherit' }} >
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Users"} />
                    </ListItem>
                </NavLink >
            </List>
            <Divider />
            <List>
                <NavLink activeClassName="active" to='orders'>
                    <ListItem button sx={{ backgroundColor: 'inherit' }} >
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Orders"} />
                    </ListItem>
                </NavLink >
                <NavLink activeClassName="active" to='bills'>
                    <ListItem button sx={{ backgroundColor: 'inherit' }} >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Bills"} />
                    </ListItem>
                </NavLink >
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer // mobile
                    container={container}
                    variant="temporary"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Sidebar
