import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ShopView from './views/ShopView'
import ProductView from './views/ProductView'
import CartView from './views/CartView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ProfileView from './views/ProfileView'
import ShippingView from './views/ShippingView'
import PlaceOrderView from './views/PlaceOrderView'
import OrderView from './views/OrderView'
import UserListView from './views/Admin Views/UserListView'
import UserEditView from './views/UserEditView'
import ProductListView from './views/Admin Views/ProductListView'
import ProductEditView from './views/Admin Views/ProductEditView'
import OrderListView from './views/Admin Views/OrderListView'
import HomeView from './views/HomeView'
import ContactView from './views/ContactView'
import CheckoutView from './views/CheckoutView'

function App() {
  return (
    <Router>
      <Header />
      <main className='mt-3' style={{ paddingBottom: '10vh' }}>
        <Route path='/profile' component={ProfileView} />
        <Route path='/register' component={RegisterView} />
        <Route path='/contact' component={ContactView} />
        <Route path='/login' component={LoginView} />
        <Route path='/order/:id' component={OrderView} />
        <Route path='/shipping' component={ShippingView} />
        <Route path='/checkout' component={CheckoutView} />
        <Route path='/placeorder' component={PlaceOrderView} />
        <Route path='/product/:id' component={ProductView} />
        <Route path='/cart/:id?' component={CartView} />
        <Route path='/admin/userlist' component={UserListView} />
        <Route path='/admin/user/:id/edit' component={UserEditView} />
        <Route path='/admin/productlist' component={ProductEditView} exact />
        <Route
          path='/admin/productlist/:pageNumber'
          component={ProductListView}
          exact
        />
        <Route path='/admin/orderlist' component={OrderListView} />
        <Route path='/admin/product/:id/edit' component={ProductEditView} />
        <Route path='/shop/search/:keyword' component={ShopView} exact />
        <Route path='/shop/page/:pageNumber' component={ShopView} exact />
        <Route
          path='/shop/search/:keyword/page/:pageNumber'
          component={ShopView}
          exact
        />
        <Route path='/shop' component={ShopView} exact />
        <Route path='/' component={HomeView} exact />
      </main>

      <Footer />
    </Router>
  )
}

export default App
