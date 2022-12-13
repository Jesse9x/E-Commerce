import {
    AppBar,
    Badge,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';

import { auth } from '../../firebase/Firebase';
import { logOut } from '../../firebase/Auth';
import { Sidebar } from '../../components';

const Header = () => {
    const theme = useTheme();
    const cartItem = useSelector((state) => state.cart.value);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const countItem = cartItem.reduce((totalCount, cartItem) => totalCount + cartItem?.quantity, 0);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logOut();
        navigate('/login');
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id='user-profile-menu'
            keepMounted
            transformOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }}
            anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar
                position='sticky'
                sx={{
                    backgroundImage: 'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)',
                }}
            >
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        {matches ? (
                            <Sidebar countItem={countItem} />
                        ) : (
                            <>
                                <IconButton color='inherit' onClick={() => navigate('/')}>
                                    <HomeIcon />
                                </IconButton>

                                <Link to='/'>
                                    <Typography
                                        variant='h6'
                                        sx={{
                                            color: 'white',
                                            display: { xs: 'none', sm: 'block' },
                                        }}
                                    >
                                        Ecommerce
                                    </Typography>
                                </Link>
                            </>
                        )}

                        <IconButton
                            color='inherit'
                            aria-label='Cart'
                            sx={{ ml: 'auto', display: { xs: 'none', sm: 'block' } }}
                            onClick={() => navigate('/cart')}
                        >
                            <Badge badgeContent={countItem} color='success' showZero>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        {user ? (
                            <Button color='inherit' onClick={handleProfileMenuOpen} sx={{ ml: { xs: 'auto', sm: 0 } }}>
                                Hi,{user?.name ?? user?.email}
                            </Button>
                        ) : (
                            <Button
                                color='inherit'
                                onClick={() => navigate('/login')}
                                sx={{ ml: { xs: 'auto', sm: 0 } }}
                            >
                                Login
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            {renderMenu}
        </>
    );
};

export default Header;
