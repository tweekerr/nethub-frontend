import React, {FC} from 'react';
import IExtendedArticle from "../../../types/IExtendedArticle";
import ArticleShortHeader from "./Related/ArticleShortHeader";
import ArticleShortFooter from "./Related/ArticleShortFooter";
import cl from "./ArticleShort.module.sass";
import FilledDiv from '../../UI/FilledDiv';
import {useNavigate} from "react-router-dom";
import {Text, useColorModeValue} from "@chakra-ui/react";

interface IArticleItemProps {
  localization: IExtendedArticle,
  setRate: (value: number) => void,
  save: { actual: boolean, handle: () => Promise<void> },
  time?: { before?: string, show?: 'default' | 'saved' },
  footerVariant?: 'default' | 'created'
}

const ArticleShort: FC<IArticleItemProps> = ({localization,setRate, save, time, footerVariant}) => {
  const navigate = useNavigate();

  return (
    <FilledDiv
      className={cl.articleItem}
      onClick={() => navigate(`/article/${localization.articleId}/${localization.languageCode}`)}
      cursor={'pointer'}
    >
      <ArticleShortHeader localization={localization} time={time}/>
      {/*<ArticleShortContent/>*/}
      <Text
        as={'p'} className={cl.description}
        color={useColorModeValue('#4F5B67', '#EFEFEF')}
      >
        {localization.description}
      </Text>
      <ArticleShortFooter localization={localization} save={save} setRate={setRate} variant={footerVariant}/>
    </FilledDiv>
  );
};

export default ArticleShort;