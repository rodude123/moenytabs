import React, {Component} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {Container, CssBaseline, Link} from "@material-ui/core";

class Main extends Component
{
	render()
	{
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				This is where the main app info would reside
				<Link component={RouterLink} to="/loginsignup">Login</Link>
			</Container>
		);
	}
}

export default Main;
