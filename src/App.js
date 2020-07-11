import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import Home from "./home/Home";


// Importing Global Style Overrides
import './global/stylesheets/overrides.scss'

// Importing Stylesheets
import './App.scss';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={["/", "/page/:pageNo(\\d+)"]}>
                    <Home/>
                </Route>

                <Route path="*">
                    Wrong Path.
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
