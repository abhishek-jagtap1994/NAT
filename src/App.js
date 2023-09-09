import React, { Component, Suspense } from 'react';
//import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss';
import { HashRouter,Routes, HashRouterRoutes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { history } from './_helpers';
import { Nav, Alert, PrivateRoute } from './_components';
import Dashboard from './views/dashboard/Dashboard';
import FormControl from './views/forms/form-control/FormControl';
import Roles from './views/pages/forms/role_form';
import Banner from './views/pages/forms/banner_form';
import Event from './views/pages/forms/event_form';



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
       
           
       <Suspense fallback={<div>Loading... </div>}>
        <Routes>
           <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route  path="/" name="Login" element={<Login />} />

          <Route element={<PrivateRoute />}>
          <Route  path="/dashboard" name="dashboard" element={<Dashboard />} />
          <Route  path="/forms/form-control" name="dashboard" element={<FormControl/>} />
          <Route  path="/roles" name="roles" element={<Roles/>} />
          <Route  path="/banners" name="banners" element={<Banner/>} />
          <Route  path="/events" name="banners" element={<Event/>} />
          <Route path="*" name="Home" element={<Dashboard />} />

          <Route path="*" name="Home" element={<DefaultLayout />} />
          </Route>

        </Routes>
        </Suspense>
       
         </>
  )
}

export default App
