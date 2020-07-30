import React from "react";
import HomePage from "./src/components/homepage";
import AboutPage from "./src/components/aboutpage";
//import CoursesPage from "./coursespage";
import CoursePage from "./src/components/coursepage";
import Header from "./src/components/common/header";
import PageNotFound from "./src/components/pagenotfound";
import ManageCoursePage from "./src/components/managecoursepage";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  // exact property on "/" Route ensures that Homepage only loads for "/" exactly
  // use switch like switch statement where last route is for items that do not match anything
  // routes with params must be placed above routes that have the same name wihtout parmas
  return (
    <div className="container-fluid">  
      <ToastContainer autoClose={3000} position="top-center" hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/courses" component={CoursePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Redirect from="/about-page" to="about"></Redirect>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
