/*!

=========================================================
* Argon Dashboard PRO React - v1.2.5
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Login from "views/pages/examples/Login.js";
import Users from "views/pages/users/users";
import Posts from "views/pages/posts/posts";
import Admins from "views/pages/admins/admins";
import UserEdit from "views/pages/users/user-edit";
import PostEdit from "views/pages/posts/post-edit";
import AdminEdit from "views/pages/admins/admin-edit";
import Rewards from "views/pages/rewards/rewards";
import RewardsEdit from "views/pages/rewards/rewards-edit";
import React from 'react';

const routes = [
  {  
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-shop text-primary",
    miniName: "D",
    component: <Dashboard />,
    layout: "/admin",  
    showInSidebar: true,    
  },
  {
    path: "/users", 
    name: "Users",
    icon: "ni ni-single-02 text-yellow",    
    component: <Users />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/user-edit",
    name: "Users Edit",
    icon: "ni ni-single-02 text-primary",
    component: <UserEdit />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/rewards", 
    name: "Rewards",
    icon: "ni ni-trophy text-yellow",    
    component: <Rewards />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/rewards-edit", 
    name: "Rewards",
    icon: "ni ni-trophy text-yellow",    
    component: <RewardsEdit />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-calendar-grid-58 text-primary",
    component: <Posts />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/post-edit",
    name: "Post edit",
    icon: "ni ni-calendar-grid-58 text-primary",
    component: <PostEdit />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/admins",
    name: "Admins",
    icon: "ni ni-ui-04 text-primary",
    component: <Admins />,
    layout: "/admin",
    showInSidebar: false,
  },
  {
    path: "/admin-edit",
    name: "Admin edit",
    icon: "ni ni-ui-04 text-primary",
    component: <AdminEdit />,
    layout: "/admin",
    showInSidebar: false,
  },  
];

/* // Function to check if user is authenticated
const isAuthenticated = () => !!localStorage.getItem('accessToken');

// Function that filters routes based on the authentication status
const getRoutes = () => {
  if (isAuthenticated()) {
    // If authenticated, return all routes except the Login route
    return routes.filter(route => route.name !== "Login");
  } else {
    // If not authenticated, only return the Login route
    return routes.filter(route => route.name === "Login");
  }
};

// Export the function for dynamic route filtering
export default getRoutes; */


export default routes;