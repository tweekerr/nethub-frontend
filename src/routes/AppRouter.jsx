import React, { useState } from 'react';
import { publicPaths } from './paths';
import { Routes, Route, Navigate } from 'react-router-dom';

export const AppRouter = () => {
  const [isAuth] = useState(true);
  return (
    <>
      {isAuth && (
        <Routes>
          {publicPaths.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      )}
    </>
  );
};
