import React from "react";
import { Router, Route } from "react-router-dom";
import styled from "styled-components";
import Auth from "./Auth/Auth.js";
import Navbar from "./components/NavBar";
import API from "./util/API";
import createHistory from "history/createBrowserHistory";
import {
  BiteDetail,
  Browse,
  CreateBite,
  CreateUser,
  Landing,
  LogIn,
  SearchResults
} from "./views";

const ViewContainer = styled.div`
  margin-top: 6.5em;
`;

const auth = new Auth();
const history = createHistory();

class App extends React.Component {
  state = {
    searchQuery: "",
    searchResults: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  // this is sort of patchwork, but it does the job.
  // this will have to be refactored later.
  handleSearchSubmit = event => {
    event.preventDefault();
    console.log("searching for", this.state.searchQuery);

    API.searchForBites(this.state.searchQuery).then(res => {
      Promise.resolve(this.setState({ searchResults: res.data })).then(() => {
        console.log("done searching");
        console.log("results", this.state.searchResults);
        console.log("redirecting to /search");
        history.push("/search");
      });
    });
  };

  render() {
    return (
      <Router history={history}>
        <div>
          <Navbar
            handleInputChange={this.handleInputChange}
            searchQuery={this.state.searchQuery}
            handleSearchSubmit={this.handleSearchSubmit}
            history={history}
          />
          <ViewContainer>
            <Route
              exact
              path="/"
              render={props => (
                <Landing
                  {...props}
                  handleInputChange={this.handleInputChange}
                  searchQuery={this.state.searchQuery}
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
                  searchQuery={this.state.searchQuery}
                  handleSearchSubmit={this.handleSearchSubmit}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => <LogIn {...props} auth={auth.login()} />}
            />
            <Route exact path="/browse" component={Browse} />
            <Route
              exact
              path="/search"
              render={props => (
                <SearchResults
                  {...props}
                  searchResults={this.state.searchResults}
                />
              )}
            />
            <Route exact path="/create/bite" component={CreateBite} />
            <Route exact path="/create/user" component={CreateUser} />
            <Route exact path="/bite-detail" component={BiteDetail} />
          </ViewContainer>
        </div>
      </Router>
    );
  }
}

export default App;
