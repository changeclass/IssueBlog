// import { Router, Route, Link } from 'react-router'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { Layout } from 'antd';

// 导入共用组件
import MyHeader from './components/head/header'
import Aside from './components/aside/Aside'

// 导入路由组件
import Index from './pages/index/index'
import LabelPost from './pages/index/label'
import Label from './pages/label/label'
import Milestone from './pages/milestone/milestone'
import Post from './pages/post/post'
import OAuth from './pages/auth/auth'
import Admin from './pages/admin/admin'

const { Header, Footer, Content } = Layout;

// 根组件
function App () {
  return (
    <Layout>
      <Router>
        <Header>
          <MyHeader>
            <Link to='/'>主页</Link>
            <Link to='/label'>标签</Link>
            <Link to='/category'>分类</Link>
          </MyHeader>
        </Header>
        <Content>
          <div>
            <Switch>
              <Route path="/label/:label">
                <LabelPost />
              </Route>
              <Route path="/label/">
                <Label />
              </Route>
              <Route path="/category">
                <Milestone />
              </Route>
              <Route path="/post/:number">
                <Post />
              </Route>
              <Route path="/OAuth">
                <OAuth />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/">
                <Index />
              </Route>
            </Switch>
          </div>
        </Content>
      </Router>
      <Footer>Footer</Footer>
    </Layout >

  );
}

export default App;
