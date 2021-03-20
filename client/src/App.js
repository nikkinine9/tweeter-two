import './StyleSheet/App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
    return ( <
        Router className = "App" >
        <
        Switch >
        <
        Route path = "/user-signup" >
        <
        SignUp / >
        <
        /Route> <
        Route path = "/user-signin" >
        <
        SignIn / >
        <
        /Route> <
        Route path = "/" >
        <
        Home / >
        <
        /Route> <
        /Switch> <
        /Router>
    );
}

export default App;