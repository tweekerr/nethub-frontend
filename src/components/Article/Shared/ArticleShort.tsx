import React, {FC} from 'react';
import ArticlesRateCounter from "./ArticlesRateCounter";
import ArticleSavingActions from "./ArticleSavingActions";
import {useNavigate} from "react-router-dom";
import IExtendedArticle from "../../../types/IExtendedArticle";
import cl from "./ArticleShort.module.sass";
import {DateTime} from "luxon";
import FilledDiv from '../../UI/FilledDiv';
import {Link, Text, useColorModeValue} from "@chakra-ui/react";


interface IArticleItemProps {
  localization: IExtendedArticle,
  setRate: (value: number) => void,
  save: { actual: boolean, handle: () => Promise<void> },
  textBeforeTime?: string
  timeShow: 'published' | 'saved' | 'created'
}

const ArticleShort: FC<IArticleItemProps> = ({localization, save, textBeforeTime, setRate, timeShow}) => {
  const navigate = useNavigate();

  const getTimeAgo = () => {
    switch (timeShow) {
      case "published":
        return DateTime.fromISO(localization.created).toRelativeCalendar();
      case "saved":
        return DateTime.fromISO(localization.savedDate!).toRelativeCalendar();
      case "created":
        return 'created'
    }
  }


  return (
    <FilledDiv
      className={cl.articleItem}
      onClick={() => navigate(`/article/${localization.articleId}/${localization.languageCode}`)}
    >
      <Link href='#'>
        <div className={cl.titleTime}>
          <Text
            as={'h2'}
            className={cl.publicTitle}
            color={useColorModeValue('#242D35', '#EFEFEF')}
          >
            {localization.title}
          </Text>
          <Text
            as={'p'}
            className={cl.timeAgo}
            color={useColorModeValue('#757575', '#EFEFEF')}
          >
            {textBeforeTime ? `${textBeforeTime}: ${getTimeAgo()}` : getTimeAgo()}
          </Text>
        </div>
        <Text
          as={'p'} className={cl.description}
          color={useColorModeValue('#4F5B67', '#EFEFEF')}
        >
          {localization.description}
        </Text>
      </Link>
      <div className={cl.actions}>
        <ArticlesRateCounter
          actualVote={localization.vote ?? 'none'}
          current={localization.rate}
          setCurrent={setRate} articleId={localization.articleId}
        />
        <ArticleSavingActions
          isSavedDefault={save.actual}
          onSave={save.handle}
          saveLink={`${window.location.href}article/${localization.articleId}/${localization.languageCode}`}
        />
      </div>
    </FilledDiv>
  );
};

export default ArticleShort;
