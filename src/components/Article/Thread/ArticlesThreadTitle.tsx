import React, {FC} from 'react';
import cl from './ArticlesThreadSpace.module.sass';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton} from "@mui/material";

interface IArticleThreadTitleProps {
  options: { title: string, value: string }[],
  setArticlesLanguage: (value: string) => void,
  articlesLanguage: string
}

const ArticlesThreadTitle: FC<IArticleThreadTitleProps> = ({
                                                             options,
                                                             articlesLanguage,
                                                             setArticlesLanguage,
                                                           }) => {

  return (
    <div className={cl.threadTitle}>
      <h2>Стрічка</h2>
      <FormControl>
        <InputLabel id="select-label">Мова</InputLabel>
        <Select
          className={cl.select}
          onChange={(e: SelectChangeEvent) => {
            setArticlesLanguage(e.target.value);
          }}
          sx={{
            '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
              padding: '0 0 0 5px'
            }
          }}
          type={'primary'}
          value={articlesLanguage}
          labelId={'select-label'}
          label={'Мова'}
        >
          {options.map(option =>
            <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  )
};

export default ArticlesThreadTitle;
