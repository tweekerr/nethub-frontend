import React, {FC} from 'react';
import cl from './ArticlesThreadSpace.module.sass';
import {Box, Select, Text} from "@chakra-ui/react";

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
    <Box className={cl.threadTitle}>
      <Text as={'h2'}>Стрічка</Text>

      <Select
        borderColor={'gray.200'}
        width={'fit-content'} defaultValue={articlesLanguage}
        onChange={(e) => {
          setArticlesLanguage(e.target.value)
        }}
        aria-label={'Мова'}
      >
        {options.map(option =>
          <option key={option.value} value={option.value}>{option.title}</option>
        )}
      </Select>
    </Box>
  )
};

export default ArticlesThreadTitle;
