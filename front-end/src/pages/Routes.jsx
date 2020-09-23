import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import StoreProvider from '../components/Store/Provider';
import RoutesPrivate from '../components/PrivateRoute/PrivateRoute';

import Login from './Login/Login';
import Dragons from './Dragons/Dragons';
import ManipulateDragon from './Dragons/ManipulateDragon';
import Register from './Register/Register';

const Routes = () => (
	<Router>
		<StoreProvider>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/register" component={Register} />
				<RoutesPrivate path="/dragons" component={Dragons} />
				<RoutesPrivate path="/create-dragon" component={ManipulateDragon} />
				<RoutesPrivate path="/dragon/:id/:readOnly" component={ManipulateDragon} />
			</Switch>
		</StoreProvider>
	</Router>
)


export default Routes;
