import React from 'react';

import Loadable from 'react-loadable';

import path from 'path'

import { render } from 'react-dom';

import {
    Link,
    Route,
    BrowserRouter as Router
} from 'react-router-dom'

import './app.scss';

import List from './List';
//import Feedback from './Feedback'
import Loading from './Loading'


let loadableFeedback = Loadable({
    loader: () => import('./Feedback'),
    loading: Loading
});

class App extends React.Component {
    state = {
        test: 'passing'
    }

    fetchData() {
        console.log('here it is...dfdfdfd.', this.state.test)

    }

    componentDidMount() {
        let result = this.fetchData()
    }
    render() {
        return (
            <Router>
                <div>
                    <Link to="/list">Todo List</Link>
                    <Link to="feedback">Feedback</Link>
                    <Route path="/list" component={List} />
                    <Route path="/feedback" component={loadableFeedback} />
                </div>
            </Router>
        )
    }
}

render(<App />, document.getElementById('root'))