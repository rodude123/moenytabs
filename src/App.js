import React, {Component} from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import {green, grey, lime} from "@material-ui/core/colors"
import LoginSignup from "./Pages/loginSignup";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {SnackbarProvider} from "notistack";
import Main from "./Pages/main";
import Tab from "./Pages/tab";
import Verify from "./Pages/verify";
import ResetPass from "./Pages/resetPass";

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
			<ThemeProvider theme={this.theme}>
				<SnackbarProvider maxSnack={3}>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={Main}/>
							<Route exact path="/loginsignup" component={LoginSignup}/>
							<Route exact path="/tab" component={Tab}/>
							<Route exact path="/verify" component={Verify}/>
							<Route exact path="/resetPass" component={ResetPass}/>
						</Switch>
					</BrowserRouter>
				</SnackbarProvider>
			</ThemeProvider>
		)
	}
}

export default App;
