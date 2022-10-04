import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/" exact>
            <HomePage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/" exact>
            <h1 className="centered">Welcome to Expense Tracker</h1>
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {/* We are rendering it with authCtx conditionally as the profile page has to be visible only for the authenticated
        users  */}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/" />}
        </Route>

        {/* (* )path represents any invalid route that the user enters apart from the given route then it redirects to home page  */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
