import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {paths} from "../routes/paths";
import NotFoundSpace from "../pages/NotFoundSpace";
import ErrorBoundary from "./Layout/ErrorBoundary";
import AuthorizedHoc from "../hocs/AuthorizedHoc";

const AppRouter: FC = () => {
  return (
    // <ErrorBoundary main={true}>
      <Routes>
        {paths.map(({path, Component, authorized}) => {

          return <Route
            key={path} path={path} element={
            <Component.Provider>
                {authorized
                  ? <AuthorizedHoc>
                    <Component/>
                  </AuthorizedHoc>
                  : <Component/>}
            </Component.Provider>
          }
          />
        })}
        <Route
          path={'*'} element={
            <NotFoundSpace/>
        }
        />
      </Routes>
    // </ErrorBoundary>
  );
};

export default AppRouter;
