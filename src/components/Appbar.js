import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Appbar.css";

const Appbar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<img src='./mono.png' alt='' className='logo' />
					<p className='title'>會員置物櫃管理系統</p>
					<Box sx={{ flexGrow: 1 }} />
					<div className='Bar'>
						<div className='Bar-item'>
							<Avatar>R</Avatar>
							<p className='username'> Rosa </p>
						</div>
						<div className='Bar-item'>
							<LogoutIcon></LogoutIcon>
							<p className='Logout'> Logout</p>
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Appbar;
