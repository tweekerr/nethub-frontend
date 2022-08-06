import React, { useState } from 'react';
import { privatePaths, publicPaths } from './paths';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';

export const AppRouter: React.FC = () => {
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
          <Route path="*" element={<Navigate to={'/'} />} />
        </Routes>
      )}
    </>
  );
};
