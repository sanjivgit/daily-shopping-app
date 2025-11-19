import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import { Provider } from "react-redux";
import { store } from "./stores";
import Dashboard from "./pages/user-dashboard";
import VendorDashboard from "./pages/vendor-dashboard";
import { QueryProvider } from "./lib/query-provider";
import ClientLayout from "./layout/client-layout";
import { Toaster } from "sonner";
import ItemsPanelPage from "./pages/user-dashboard/item-panel-page";
import Navigation from "./layout/navigation";
import VendorMatchingPanelPage from "./pages/user-dashboard/vendor-maching-panel-page";
import VendorAuthLayout from "./layout/vendor-auth-layout";
import VendorLoginPage from "./pages/vendor-auth/vendor-login";
import VendorRegisterPage from "./pages/vendor-auth/vendor-register";
import OrderListPage from "./pages/user-dashboard/order-list-page";

function App() {

  return (
    <>
      <Toaster />
      <QueryProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/vendor/register" element={<VendorRegisterPage />} />
              <Route path="/" element={<ClientLayout />}>

                <Route path="/login" element={<LoginPage />} />

                <Route element={<Navigation />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dashboard/items/:listId" element={<ItemsPanelPage />} />
                  <Route path="dashboard/vendors/:listId" element={<VendorMatchingPanelPage />} />
                  <Route path="dashboard/order-list" element={<OrderListPage />} />
                </Route>
              </Route>

              <Route element={<VendorAuthLayout />} >
                <Route path="/vendor/login" element={<VendorLoginPage />} />
                <Route path="vendor-dashboard" element={<VendorDashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </QueryProvider>
    </>
  )
}

export default App
