import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Landing from "./pages/Landing";
import Browse from "./pages/Browse";

//if not signed in, route to pages/SignIn
const App = () => {
	return (
		<Router>
			<div>
				<Route exact path="/" component={Landing} />
				<Route path="/landing" component={Landing} />
				<Route path="/signIn" component={SignIn} />
				<Route path="/browse" component={Browse} />
			</div>
		</Router>
	);
};

export default App;
