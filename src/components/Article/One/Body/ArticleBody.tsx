import React, {FC} from 'react';
import cl from '../ArticleSpace.module.sass';
import {FilledDiv} from '../../../basisComps/Basic.styled';
import IArticleLocalizationResponse from "../../../../types/api/Article/IArticleLocalizationResponse";
import IUserInfoResponse from "../../../../types/api/User/IUserInfoResponse";
import {getArticleContributors, getAuthor} from "../ArticleSpace.functions";
import {articlesApi} from "../../../../api/userApi";
import ArticlesRateCounter, {RateVariants} from "../../Shared/ArticlesRateCounter";
import ArticleSavingActions from "../../../basisComps/ArticleSavingActions";
import {DateToRelativeCalendar} from "../../../../utils/dateHelper";
import {useQuery} from "react-query";
import {Skeleton} from "@mui/material";

interface IArticleBodyProps {
  localization: IArticleLocalizationResponse,
  tags: string[],
  userActions: { isSaved: boolean, rate: RateVariants }
  rate: { current: number, setCurrent: (value: number) => void }
}

const ArticleBody: FC<IArticleBodyProps> = ({localization, tags, userActions, rate}) => {

  async function handleSave() {
    await articlesApi.toggleSavingLocalization(localization.articleId, localization.languageCode);
  }

  const contributors = useQuery(['contributors', localization.articleId, localization.languageCode], () => getArticleContributors(localization.contributors), {staleTime: 50000});

  return (
    <FilledDiv className={cl.articleWrapper}>
      <div className={cl.articleTitle}>
        <p className={cl.title}>{localization.title}</p>
      </div>

      <div className={cl.articleDescription}>
        <p>{localization.description}</p>
      </div>

      <hr className={cl.line}/>

      <div className={cl.articleBody} dangerouslySetInnerHTML={{__html: localization.html}}/>

      <div className={cl.articleTags}>
        {tags.map(tag =>
          <FilledDiv
            key={tag}
            className={cl.tag}
            background={'#896DC8'}
            color={'white'}
            padding={'5px 20px'}
            borderRadius={'10px'}
          >#{tag}
          </FilledDiv>)
        }
      </div>

      <div className={cl.actions}>
        <div className={cl.actionsLeft}>
          <ArticlesRateCounter
            current={rate.current} setCurrent={rate.setCurrent} actualVote={userActions.rate}
            articleId={localization.articleId}
          />
          <FilledDiv background={'white'} className={cl.views} padding={'7px 19px'}>
            <b className={cl.viewsCount}>{localization.views}</b> переглядів
          </FilledDiv>
        </div>
        <ArticleSavingActions
          isSavedDefault={userActions.isSaved}
          onSave={handleSave}
        />
      </div>

      <div className={cl.creationInfo}>
        <div className={cl.author}>
          <p>Автор: 
            {contributors.isLoading ? <Skeleton variant={'rounded'} width={80} height={15}></Skeleton> :
              <a>{getAuthor(localization.contributors, contributors.data!)?.userName}</a>
            }
          </p>
        </div>
        <div className={cl.dates}>
          <div className={cl.created}>Створено: {DateToRelativeCalendar(localization.created)}</div>
          {
            localization.updated &&
            <div className={cl.updated}>Оновлено: {DateToRelativeCalendar(localization.updated)}</div>
          }
        </div>
      </div>
    </FilledDiv>
  );
};

export default ArticleBody;
