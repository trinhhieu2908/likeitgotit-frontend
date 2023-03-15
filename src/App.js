import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "../src/components/UI/LoadingSpinner";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Shop = React.lazy(() => import("./pages/Shop/Shop"));
const Checkout = React.lazy(() => import("./pages/Checkout/Checkout"));
const About = React.lazy(() => import("./pages/About/About"));
const Contact = React.lazy(() => import("./pages/Contact/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/shop" />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/checkout" exact>
            <Checkout />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default App;
