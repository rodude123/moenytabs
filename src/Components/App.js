import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/lime';
import green from '@material-ui/core/colors/green';
import grey from "@material-ui/core/colors/grey";
import LoginSignup from "../Pages/loginSignup";

class App extends React.Component
{
	render()
	{
		const isDarkMode = true
		const theme = createMuiTheme({
			palette: {
				type: isDarkMode ? 'dark' : 'light',
				primary: {
					main: green[500],
					contrastText: grey[50]
				},
				secondary: {
					main: yellow[700],
					contrastText: grey[800]
				},
			},
		});
		return (
			<ThemeProvider theme={theme}>
				<LoginSignup/>
			</ThemeProvider>
		)
	}
}

export default App;
