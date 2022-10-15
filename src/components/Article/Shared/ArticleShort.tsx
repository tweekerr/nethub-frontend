import React, {FC} from 'react';
import cl from "../Thread/ArticlesThreadSpace.module.sass"
import ArticlesRateCounter from "./ArticlesRateCounter";
import ArticleSavingActions from "../../basisComps/ArticleSavingActions";
import {FilledDiv} from '../../basisComps/Basic.styled';
import {useNavigate} from "react-router-dom";
import IExtendedArticle from "../../../types/IExtendedArticle";
import {StyledLink} from "../../basisComps/PublicBasis/styled";
import classes from "../../basisComps/PublicBasis/PublicBasis.module.scss";
import {DateTime} from "luxon";


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
    <FilledDiv className={cl.blogItem}
               onClick={() => navigate(`/article/${localization.articleId}/${localization.languageCode}`)}>
      <StyledLink href='#'>
        <div className={classes.titleTime}>
          <h2 className={classes.publicTitle}>{localization.title}</h2>
          <p className={classes.timeAgo}>{textBeforeTime ? `${textBeforeTime}: ${getTimeAgo()}` : getTimeAgo()}</p>
        </div>
        <p className={classes.publicDes}>{localization.description}</p>
      </StyledLink>
      <div className={cl.downFuncItems}>
        <ArticlesRateCounter actualVote={localization.vote ?? 'none'} current={localization.rate}
                             setCurrent={setRate} articleId={localization.articleId}/>
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
