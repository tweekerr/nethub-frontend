import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from "../store";
import {privatePaths, publicPaths} from "../routes/paths";

const AppRouter: FC = () => {
  const { isLogin } = useAppSelector((state) => state.generalReducer);
  return (
    <>
      {isLogin ? (
        <Routes>
          {privatePaths.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      ) : (
        <Routes>
          {publicPaths.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to={'/login'} />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
