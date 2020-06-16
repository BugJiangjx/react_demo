import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { isEmpty } from 'lodash';
import Layout from "~/App/Layout";
import Login from "~/App/Login";
import router from '~/router';

const Router = () => {
  const renderRoute = () => {
    const routes = [];
    if (isEmpty(router)) return;
    router.forEach(i => {
      routes.push(<Route exact path={i.path} component={i.component} />);
      if (!isEmpty(i.children)){
        routes.push(<Route path={`${i.path}${i.children.path}`} component={i.children.component} />);
      }
    });
    return routes;
  }
  
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Layout>
        {renderRoute()}
      </Layout>
    </Switch>
  );
};
  

export default Router;