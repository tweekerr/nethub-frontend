import React, {FC, useEffect, useState} from 'react';
import {FilledDiv} from '../../basisComps/Basic.styled';
import SvgSelector from "../../basisComps/SvgSelector/SvgSelector";
import cl from './ArticleSpace.module.sass'
import {Skeleton} from "@mui/material";
import IArticleLocalizationResponse from "../../../types/api/Article/IArticleLocalizationResponse";
import IArticleResponse from "../../../types/api/Article/IArticleResponse";
import IUserInfoResponse from "../../../types/api/User/IUserInfoResponse";
import {createImageFromInitials} from "../../../utils/logoGenerator";
import {getContributorRole} from "./ArticleSpace.functions";
import {useNavigate} from "react-router-dom";
import useLoading, {IError} from "../../../hooks/useLoading";

interface IArticleInfoProps {
  article: IArticleResponse,
  localization: IArticleLocalizationResponse,
  error: IError,
  isLoading: boolean,
  contributors: IUserInfoResponse[]
}

const ArticleInfo: FC<IArticleInfoProps> = ({article, localization, error, isLoading, contributors}) => {

  const navigate = useNavigate();

  const getDomain = (link: string) => {
    const url = new URL(link);
    const domain = url.hostname.replace('www.', '');
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }

  return (
    error.isError ? <></> :
      <div className={cl.articleInfo}>
        {
          isLoading ? <Skeleton height={75} variant='rounded' className={cl.infoBlock}/> :
            <FilledDiv className={cl.infoBlock}>
              <p className={cl.infoBlockTitle}>Переклади</p>
              <div className={cl.translates}>
                {article.localizations?.map(localization =>
                  <FilledDiv onClick={() => navigate(`/article/${localization.articleId}/${localization.languageCode}`)}
                             key={localization.languageCode} background={'#896DC8'} borderRadius={'10px'}
                             padding={'5px 16px'}>
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
                {contributors.map(author =>
                  <FilledDiv key={author.id} className={cl.contributor} background={'#896DC8'} borderRadius={'10px'}
                             padding={'6px 15px'}>
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
