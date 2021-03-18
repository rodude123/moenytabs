import React, {Component} from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey, green, lime } from "@material-ui/core/colors"
import LoginSignup from "./Pages/loginSignup";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Main from "./Pages/main";

/**
 * App class
 *
 * Base file for routing all the pages and use of theme
 */
class App extends Component
{
	state = {
		isDarkMode: true
	}
	
	/**
	 * Theme for whole app
	 * @type {object} theme object
	 */
	theme = createMuiTheme({
		palette: {
			type: this.state.isDarkMode ? 'dark' : 'light',
			primary: green,
			secondary: {
				main: lime[700],
				contrastText: grey[800]
			},
		},
	});
	/**
	 * render method to render the jsx
	 * @returns {JSX.Element}
	 */
	render()
	{
		return (
			<BrowserRouter>
				<ThemeProvider theme={this.theme}>
					<Switch>
						<Route exact path="/" component={Main}/>
						<Route exact path="/loginsignup" component={LoginSignup}/>
					</Switch>
				</ThemeProvider>
			</BrowserRouter>
		)
	}
}

export default App;