import React from 'react';
import Home from "./home/Home";

// Importing Stylesheets
import './App.css';

// Importing Bootswatch
import './vendor/bootswatch/bootswatch_import.scss'

// Importing Global Style Overrides
import './global/stylesheets/overrides.scss'

function App() {
    return (
        <React.Fragment>
            <Home/>
        </React.Fragment>
    );
}

export default App;
