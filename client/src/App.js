import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth/Auth.js";
import API from "./util/API";
import ViewContainer from "./components/ViewContainer";
import createHistory from "history/createBrowserHistory";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "./components/AppBar";
import {
  BiteDetail,
  CreateBite,
  EditUser,
  Landing,
  SearchResults,
  Message,
  MyBites,
  PageNotFound
} from "./views";

// let userInfo;
const history = createHistory();

const auth = new Auth();

class App extends React.Component {
  state = {
    navbarSearchQuery: "",
    landingSearchQuery: "",
    shadow: false,
    userId: "",
    // userId: "auth0|5a26d2a8d1b1b723b29f1f3b", // andrew
    // userId: "auth0|5a26d41ed1b1b723b29f1f70", // imran
    // userId: "auth0|5a26d474cc4fc5487394af4e", // nicole
    firstName: ""
  };

  // auth.testListenerFxn();
  loginListener = () => {
    auth.lock.on("hash_parsed", authResult => {
      console.log("looking in the authResult for token", authResult);
      if (authResult !== null) {
        auth.lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            console.log("ERROR:", error);
            return;
          }
          const userId = profile.sub;
          const storedInDb = profile.user_metadata.storedInDb;

          console.log("userId:", userId);
          console.log("profile", profile);
          console.log(storedInDb);
          const lastName = profile.user_metadata.lastName;
          const firstName = profile.user_metadata.firstName;

          if (!storedInDb) {
            const newUser = {
              _id: userId,
              firstName: firstName,
              lastName: lastName
            };

            console.log("newUser", newUser);
            console.log("STORING USER IN DB");
            API.createNewUser(newUser);
          }

          console.log("fn", firstName);

          this.setState({
            userId: userId,
            firstName: firstName
          });
          localStorage.setItem("accessToken", authResult.accessToken);
        });
      }
    });
  };

  componentDidMount = () => {
    this.loginListener();
  };

  logoutUser = () => {
    console.log("logging out user");
    this.setState({ userId: "" });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  // handles search submit event for both navbar and main landing page search query
  handleSearchSubmit = event => {
    event.preventDefault();

    // find out from where the search was done and what its query is
    const searchOrigin = event.target[0].getAttribute("name");
    const searchQuery =  this.state[searchOrigin].trim();

    if (searchQuery !== "") {
      // If search query is not empty, search the database for matching cities.
      // The reason this code exists here, despite the search results already page having
      // redundant code, is that for some reason, the navbar search does not work properly
      // when already on the search page without this bit.
      // Hopefully we will address this later, as this causes the database to be pinged twice.
      API.searchForBites(searchQuery)
        // save the search results in state, to pass to search results page
        .then(res => this.setState({ searchResults: res.data }))

      // redirect client to search results page
      history.push(`/search/${searchQuery}`);
      // reset the landing search box and put the query into the navbar search box
      this.setState({ navbarSearchQuery: searchQuery, landingSearchQuery: "" });
    } else {
      console.log("No search query provided.");
    }
  };

  render() {
    return (
      <Router history={history}>
        <div>
          <MuiThemeProvider>
            <AppBar
              auth={auth}
              userId={this.state.userId}
              userFirstName={this.state.firstName}
              history={history}
              logoutUser={this.logoutUser}
              handleInputChange={this.handleInputChange}
              navbarSearchQuery={this.state.navbarSearchQuery}
              handleSearchSubmit={this.handleSearchSubmit}
            />
          </MuiThemeProvider>
          <ViewContainer location={window.location.pathname}>
            <Switch>
              {/** Landing Page */}
              <Route
                exact
                path="/"
                render={props => (
                  <Landing
                    {...props}
                    handleInputChange={this.handleInputChange}
                    landingSearchQuery={this.state.landingSearchQuery}
                    handleSearchSubmit={this.handleSearchSubmit}
                  />
                )}
              />
              <Route
                exact
                path="/home"
                render={props => (
                  <Landing
                    {...props}
                    handleInputChange={this.handleInputChange}
                    landingSearchQuery={this.state.landingSearchQuery}
                    handleSearchSubmit={this.handleSearchSubmit}
                  />
                )}
              />

              {/* Search Results Page */}
              <Route
                exact
                path="/search/:searchQuery"
                render={props => (
                  <SearchResults
                    {...props}
                    searchQuery={this.state.searchQuery}
                    searchResults={this.state.searchResults}
                  />
                )}
              />

              {/* Create Bite Page */}
              <Route
                exact
                path="/bite/create"
                render={props => (
                  <CreateBite {...props} userId={this.state.userId} />
                )}
              />

              {/* Bite Detail Page */}
              <Route
                exact
                path="/bite/detail/:biteId"
                render={props => (
                  <BiteDetail {...props} auth={auth} userId={this.state.userId} />
                )}
              />

              {/* My Bites Page */}
              <Route
                exact
                path="/my-bites"
                render={props => (
                  <MyBites {...props} userId={this.state.userId} />
                )}
              />

              {/* Edit User Page */}
              <Route
                exact
                path="/user/edit"
                render={props => (
                  <EditUser {...props} userId={this.state.userId} />
                )}
              />

              {/* Message User Page */}
              <Route
                exact
                path="/message/:userId"
                render={props => (
                  <Message {...props} userId={this.state.userId} />
                )}
              />

              {/* 404 Error Page Not Found */}
              <Route component={PageNotFound} />
            </Switch>
          </ViewContainer>
        </div>
      </Router>
    );
  }
}

export default App;
