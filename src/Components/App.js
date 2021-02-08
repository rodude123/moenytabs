import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey, green, lime } from "@material-ui/core/colors"
import LoginSignup from "../Pages/loginSignup";

/**
 * App class
 *
 * Base file for routing all the pages and use of theme
 */
class App extends React.Component
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
			primary: {
				main: green[500],
				contrastText: grey[50]
			},
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
				<LoginSignup/>
			</ThemeProvider>
		)
	}
}

export default App;
