import React from 'react';
import logo from './logo.svg';
import Registration from './features/member-registration';
import Success from './features/member-registration/Success';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
	<BrowserRouter>
		<Routes>
			<Route path="register/*" >
				<Route index element={<Registration />} />
				<Route path='success' element={<Success />} />
			</Route>
		</Routes>
	</BrowserRouter>
  )
}

export default App;
