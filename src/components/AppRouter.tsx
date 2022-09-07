import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {paths} from "../routes/paths";
import Authorized from "./Auth/hoc/Authorized";

const AppRouter: FC = () => {
  return (
    <Routes>
      {paths.map(({path, Component, authorized}) =>
        <Route key={path} path={path} element={
          authorized ? <Authorized>
              <Component/>
            </Authorized>
            : <Component/>}
        />
      )}
      <Route path={'*'} element={<h1>Not Found</h1>}/>
    </Routes>
  );
};

export default AppRouter;
