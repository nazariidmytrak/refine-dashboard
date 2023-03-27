import { AuthBindings, Authenticated, Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from '@mui/icons-material';

import {
  ErrorComponent,
  RefineSnackbarProvider,
  notificationProvider,
} from '@refinedev/mui';

import { CssBaseline, GlobalStyles } from '@mui/material';
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import axios, { AxiosRequestConfig } from 'axios';
import { CredentialResponse } from 'interfaces/google';

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { parseJwt } from 'utils/parse-jwt';

import { Layout } from 'components/layout';
import { Header } from 'components/layout/header';
import { Sider } from 'components/layout/sider';
import { Title } from 'components/layout/title';

import {
  Login,
  Home,
  Agents,
  MyProfile,
  PropertyDetails,
  AllProperties,
  CreateProperty,
  AgentProfile,
  EditProperty,
} from 'pages';
import Agent from 'pages/agent';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (request.headers) {
    request.headers['Authorization'] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      //Save user to mongoDB
      if (profileObj) {
        const response = await fetch(
          /* 'http://localhost:8080/api/v1/users', */
          'https://refine-dashboard-jkj7.onrender.com/api/v1/users',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          }
        );

        const data = await response.json();
        if (response.status === 200) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return {
            success: false,
          };
        }
      }

      localStorage.setItem('token', `${credential}`);

      return {
        success: true,
        redirectTo: '/home',
      };
    },
    logout: async () => {
      const token = localStorage.getItem('token');

      if (token && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: '/',
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem('token');

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: new Error('Not authenticated'),
        logout: true,
        redirectTo: '/',
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem('user');

      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
        <RefineSnackbarProvider>
          <Refine
            dataProvider={dataProvider(
              /* 'http://localhost:8080/api/v1' */
              'https://refine-dashboard-jkj7.onrender.com/api/v1'
            )}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              {
                name: 'properties',
                list: '/properties',
                show: '/properties/show/:id',
                create: '/properties/create',
                edit: '/properties/edit/:id',
                meta: {
                  icon: <VillaOutlined />,
                },
              },
              {
                name: 'agents',
                list: '/agents',
                show: '/agents/show/:id',
                meta: {
                  icon: <PeopleAltOutlined />,
                },
              },
              {
                name: 'review',
                list: '/review',
                meta: {
                  icon: <StarOutlineRounded />,
                },
              },
              {
                name: 'message',
                list: '/message',
                meta: {
                  icon: <ChatBubbleOutline />,
                },
              },
              {
                name: 'my-profile',
                list: '/my-profile',
                meta: {
                  label: 'My profile',
                  icon: <AccountCircleOutlined />,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to='/' />}>
                    <Layout Header={Header} Sider={Sider} Title={Title}>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path='/home' element={<Home />} />

                <Route path='/properties'>
                  <Route index element={<AllProperties />} />
                  <Route path='create' element={<CreateProperty />} />
                  <Route path='edit/:id' element={<EditProperty />} />
                  <Route path='show/:id' element={<PropertyDetails />} />
                </Route>
                <Route path='/agents'>
                  <Route index element={<Agent />} />
                  <Route path='show/:id' element={<AgentProfile />} />
                </Route>
                <Route path='/review'>
                  <Route index element={<Home />} />
                </Route>
                <Route path='/message'>
                  <Route index element={<Home />} />
                </Route>
                <Route path='/my-profile'>
                  <Route index element={<MyProfile />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    {<NavigateToResource />}
                  </Authenticated>
                }
              >
                <Route index element={<Login />} />
              </Route>
              <Route
                element={
                  <Authenticated>
                    <Layout Header={Header} Sider={Sider} Title={Title}>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path='*' element={<ErrorComponent />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </RefineSnackbarProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
