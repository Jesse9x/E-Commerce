import { Badge, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ countItem }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Drawer open={mobileOpen} onClose={handleDrawerToggle}>
                <IconButton></IconButton>

                <List>
                    <ListItemButton sx={{ py: 2 }} onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>

                        <ListItemText primary='Home' />
                    </ListItemButton>

                    <Divider />

                    <ListItemButton sx={{ py: 2 }} onClick={() => navigate('/cart')}>
                        <ListItemIcon>
                            <Badge badgeContent={countItem} color='success' showZero>
                                <ShoppingCartIcon />
                            </Badge>
                        </ListItemIcon>

                        <ListItemText primary='Shopping' />
                    </ListItemButton>

                    <Divider />

                    <ListItemButton sx={{ py: 2 }} onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>

                        <ListItemText primary='About' />
                    </ListItemButton>

                    <Divider />
                </List>
            </Drawer>

            <IconButton onClick={handleDrawerToggle} color='inherit'>
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default Sidebar;
