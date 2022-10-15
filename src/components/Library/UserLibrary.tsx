import React, {FC, useState} from 'react';
import cl from './UserLibrary.module.sass';
import {ToggleButton} from "@mui/material";
import {StyledToggleButtonGroup} from '../basisComps/Basic.styled';

interface IUserLibraryProps {
  items: ILibraryItem[]
}

export interface ILibraryItem {
  name: string,
  component: React.ReactNode
}

const UserLibrary: FC<IUserLibraryProps> = ({ items}) => {
  const [renderComponent, setRenderComponent] = useState<React.ReactNode>(items[0].component)
  const [selectedPage, setSelectedPage] = useState<number>(0);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number,
  ) => {
    setSelectedPage(newAlignment);
    setRenderComponent(items[newAlignment].component)
  };

  return (
    <div className={cl.libraryWrapper}>
      <div className={cl.contentButtons}>
        <StyledToggleButtonGroup
          color="primary"
          value={selectedPage}
          exclusive
          onChange={handleChange}
        >
          {items.map((i, index) =>
            <ToggleButton key={i.name} value={index}>{i.name}</ToggleButton>
          )}
        </StyledToggleButtonGroup>
      </div>
      <div className={cl.actualComponent}>
        {renderComponent}
      </div>

    </div>
  );
};
export default UserLibrary;
