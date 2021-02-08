import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey, green, lime } from "@material-ui/core/colors"
import LoginSignup from "../Pages/loginSignup";

class App extends React.Component
{
	state = {
		isDarkMode: true
	}
	
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
