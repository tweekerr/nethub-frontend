import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {paths} from "../routes/paths";
import AuthorizedHoc from "./Auth/hoc/AuthorizedHoc";

const AppRouter: FC = () => {
  return (
    <Routes>
      {paths.map(({path, Component, authorized}) =>
        <Route key={path} path={path} element={
          authorized ? <AuthorizedHoc>
              <Component/>
            </AuthorizedHoc>
            : <Component/>}
        />
      )}
      <Route path={'*'} element={<h1>Not Found</h1>}/>
    </Routes>
  );
};

export default AppRouter;
