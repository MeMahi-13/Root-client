import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import HomeLayout from "../layouts/HomeLayout";
import AllEmployeeList from "../pages/Admin/AllEmployeeList";
import Payroll from "../pages/Admin/Payroll";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import PaymentHistory from "../pages/employee/PaymentHistory";
import WorkSheet from "../pages/employee/WorkSheet";
import Home from "../pages/Home/Home";
import Details from "../pages/hr/Details";
import EmployeeList from "../pages/hr/EmplyeeList";
import Progress from "../pages/hr/Progress";
import MakeAdmin from "../pages/MakeAdmin";
import PayGate from "../pages/PayGate/PayGate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ]

  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/dashboard',
    element:
      <DashboardLayout></DashboardLayout>
    ,
    children: [
      {
        path: '/dashboard/workSheet',
        element: <WorkSheet />
      },
      {
        path: '/dashboard/payments',
        element: <PaymentHistory />
      },
      {
        path: '/dashboard/employees',
        element: <EmployeeList />
      },
      {
        path: "/dashboard/details/:slug",
        element: <Details />
      },
            {
        path: "/dashboard/progress",
        element: <Progress />
      },
       {
        path: "/dashboard/all-employees",
        element: <AllEmployeeList />,
      },
       {
        path: "/dashboard/payroll",
        element: <Payroll />,
      },
      // {
      //   path: '/dashboard/checkout',
      //   element: <CheckoutForm/>
      // },
      {
        path: '/dashboard/payment/:paymentId',
        element: <PayGate/>
      },
      {
         
        path: '/dashboard/makeAdmin',
        element: <MakeAdmin/>
      
      }
    ]
  }
]);