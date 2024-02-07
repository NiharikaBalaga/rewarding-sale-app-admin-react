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
import Alternative from "views/pages/dashboards/Alternative.js";
import Buttons from "views/pages/components/Buttons.js";
import Calendar from "views/pages/Calendar.js";
import Cards from "views/pages/components/Cards.js";
import Charts from "views/pages/Charts.js";
import Components from "views/pages/forms/Components.js";
import Dashboard from "views/pages/dashboards/Dashboard.js";
import Elements from "views/pages/forms/Elements.js";
import Google from "views/pages/maps/Google.js";
import Grid from "views/pages/components/Grid.js";
import Icons from "views/pages/components/Icons.js";
import Lock from "views/pages/examples/Lock.js";
import Login from "views/pages/examples/Login.js";
import Notifications from "views/pages/components/Notifications.js";
import Pricing from "views/pages/examples/Pricing.js";
import Profile from "views/pages/examples/Profile.js";
import ReactBSTables from "views/pages/tables/ReactBSTables.js";
import Register from "views/pages/examples/Register.js";
import RTLSupport from "views/pages/examples/RTLSupport.js";
import Sortable from "views/pages/tables/Sortable.js";
import Tables from "views/pages/tables/Tables.js";
import Timeline from "views/pages/examples/Timeline.js";
import Typography from "views/pages/components/Typography.js";
import Validation from "views/pages/forms/Validation.js";
import Vector from "views/pages/maps/Vector.js";
import Widgets from "views/pages/Widgets.js";
import Users from "views/pages/users/users";
import Posts from "views/pages/posts/posts";
import Admins from "views/pages/admins/admins";
import UserEdit from "views/pages/users/user-edit";
import PostEdit from "views/pages/posts/post-edit";
import AdminEdit from "views/pages/admins/admin-edit";

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

export default routes;
