import React, {FC} from 'react';
import {FilledDiv} from '../../basisComps/Basic.styled';
import SvgSelector from "../../basisComps/SvgSelector/SvgSelector";
import cl from './ArticleSpace.module.sass'
import {Skeleton} from "@mui/material";
import IArticleLocalizationResponse from "../../../types/api/Article/IArticleLocalizationResponse";
import IArticleResponse from "../../../types/api/Article/IArticleResponse";
import {createImageFromInitials} from "../../../utils/logoGenerator";
import {getArticleContributors, getContributorRole} from "./ArticleSpace.functions";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import ContributorsSkeleton from "./ContributorsSkeleton";

interface IArticleInfoProps {
  article: IArticleResponse,
  localization: IArticleLocalizationResponse,
  isError: boolean,
  isLoading: boolean,
}

const ArticleInfo: FC<IArticleInfoProps> = ({article, localization, isError, isLoading}) => {

  const navigate = useNavigate();

  const contributors = useQuery(['contributors', localization.articleId, localization.languageCode],
    () => getArticleContributors(localization.contributors), {staleTime: 50000});

  const getDomain = (link: string) => {
    const url = new URL(link);
    const domain = url.hostname.replace('www.', '');
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }

  return (
    isError ? <></> :
      <div className={cl.articleInfo}>
        {
          isLoading ? <Skeleton height={75} variant='rounded' className={cl.infoBlock}/> :
            <FilledDiv className={cl.infoBlock}>
              <p className={cl.infoBlockTitle}>Переклади</p>
              <div className={cl.translates}>
                {article.localizations?.map(localization =>
                  <FilledDiv
                    onClick={() => navigate(`/article/${localization.articleId}/${localization.languageCode}`)}
                    key={localization.languageCode} background={'#896DC8'} borderRadius={'10px'}
                    padding={'5px 16px'}
                  >
                    {localization.languageCode.toUpperCase()}
                    <SvgSelector id={localization.languageCode}/>
                  </FilledDiv>
                )}
              </div>
            </FilledDiv>
        }

        {
          isLoading ? <Skeleton width={'100%'} height={100} variant='rounded' className={cl.infoBlock}/> :
            <FilledDiv className={cl.infoBlock}>
              <p className={cl.infoBlockTitle}>Автори</p>
              <div className={cl.contributors}>
                {contributors.isLoading ? <ContributorsSkeleton/> : contributors.data!.map(author =>
                  <FilledDiv
                    key={author.id} className={cl.contributor} background={'#896DC8'} borderRadius={'10px'}
                    padding={'6px 15px'}
                  >
                    <div className={cl.role}>
                      <p>{getContributorRole(localization.contributors, author.id)}</p>
                      <p>{author.userName}</p>
                    </div>
                    <img src={author.profilePhotoLink ?? createImageFromInitials(25, author.userName)} alt={'damaged'}/>
                  </FilledDiv>
                )}
              </div>
            </FilledDiv>
        }

        {
          isLoading ? <Skeleton width={'100%'} height={100} variant='rounded' className={cl.infoBlock}/> :
            article.originalArticleLink &&
            <FilledDiv className={cl.infoBlock}>
              <p className={cl.infoBlockTitle}>Перейти до оригіналу:</p>
              <FilledDiv background={'#896DC8'} borderRadius={'10px'} padding={'5px 16px'} className={cl.originalLink}>
                <a>{getDomain(article.originalArticleLink)}</a>
              </FilledDiv>
            </FilledDiv>
        }
      </div>
  );
};

export default ArticleInfo;
