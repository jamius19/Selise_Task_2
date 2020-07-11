import React from 'react';
import Home from "./home/Home";

// Importing Bootswatch
import './vendor/bootswatch/bootswatch_import.scss'

// Importing Global Style Overrides
import './global/stylesheets/overrides.scss'

// Importing Stylesheets
import './App.css';

function App() {
    return (
        <React.Fragment>
            <Home/>
        </React.Fragment>
    );
}

export default App;
