import "./App.css";
import NavBar from "./components/Nav/navBar";
import { Route, Routes, HashRouter } from "react-router-dom";
import PhotosContainer from "./components/Photos/photos";
import Music from "./components/Music/music";
import SettingsContainer from "./components/Settings/settingsContainer";
import Videos from "./components/Videos/videos";
import MessagesContainer from "./components/Messages/messagesContainer";
import UsersContainer from "./components/Users/usersContainer";
import ProfileContainer from "./components/Profile/profileContainer";
import TopMenuContainer from "./components/TopMenu/topMenuContainer";
import AuthorisedProfileContainer from "./components/AutorisedProfile/autorisedProfileContainer";
import { LoginContainer } from "./components/Login/loginContainer";
import { Component } from "react";
import { connect, Provider } from "react-redux";
import Preloader from "./components/common/Preloader/preloader";
import store from "./redux/redux-store";
import { initializeApp } from "./redux/app-reducer";

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app_wrapper">
        <TopMenuContainer />
        <NavBar />
        <div className="app_content">
          <Routes>
            <Route exact path="/login" element={<LoginContainer />} />
            <Route
              exact
              path="/profile"
              element={<AuthorisedProfileContainer />}
            />

            <Route
              exact
              path="/profile/:userId"
              element={<ProfileContainer />}
            />

            <Route path="/messages" element={<MessagesContainer />} />
            <Route path="/photos" element={<PhotosContainer />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<SettingsContainer />} />
            <Route path="/users" element={<UsersContainer />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});
let AppContainer = connect(mapStateToProps, { initializeApp })(App);

const MainApp = () => {
  return (
    // Using HashRouter instead of BrowserRouter just for browser being able to change url correctly
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};
export default MainApp;
