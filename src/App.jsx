/* eslint-disable unicorn/filename-case */
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layouts/layout';
import { LayoutAuth } from './components/layouts/layout-auth';
import { LayoutMainPage } from './components/layouts/layout-main-page';
import { PrivateRoute, PublicRoute } from './components/router';
import { AuthPage } from './pages/authorization/auth';
import { ForgotPassPage } from './pages/authorization/forgot-pass';
import { RegistrationPage } from './pages/authorization/registration';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile';
import { TermsPage } from './pages/terms';
import { ROUTES } from './constans';

// eslint-disable-next-line unicorn/filename-case
const App = () => (
  <HashRouter>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.HOME} element={<LayoutAuth />}>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.AUTH} />} />
          <Route path={ROUTES.AUTH} element={<AuthPage />} />
          <Route path={ROUTES.REGISTRATION} element={<RegistrationPage />} />
          <Route path={ROUTES.FORGOT_PASS} element={<ForgotPassPage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route element={<LayoutMainPage />}>
            <Route path={ROUTES.BOOKS_CATEGORY} element={<MainPage />} />
            <Route path={ROUTES.TERMS} element={<TermsPage contentView={ROUTES.TERMS} />} />
            <Route path={ROUTES.CONTRACT} element={<TermsPage contentView={ROUTES.CONTRACT} />} />
          </Route>
          <Route path={ROUTES.BOOKS_CATEGORY_ID} element={<BookPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  </HashRouter>
);

export default App;
