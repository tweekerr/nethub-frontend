import React, {FC} from 'react';
import SvgSelector from "../../UI/SvgSelector/SvgSelector";
import cl from './ArticleInfo.module.sass'
import IArticleLocalizationResponse from "../../../types/api/Article/IArticleLocalizationResponse";
import IArticleResponse from "../../../types/api/Article/IArticleResponse";
import {createImageFromInitials} from "../../../utils/logoGenerator";
import {getArticleContributors, getContributorRole} from "../../../pages/Articles/One/ArticleSpace.functions";
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import ContributorsSkeleton from "./ContributorsSkeleton";
import FilledDiv from '../../UI/FilledDiv';
import {Button, Link, Skeleton, Text, useColorModeValue} from "@chakra-ui/react";

interface IArticleInfoProps {
  article: IArticleResponse,
  localization: IArticleLocalizationResponse,
  isError: boolean,
  isLoading: boolean,
}

const ArticleInfo: FC<IArticleInfoProps> = ({article, localization, isError, isLoading}) => {

  const navigate = useNavigate();
  const whiteTextColor = useColorModeValue('whiteLight', 'whiteDark');

  const contributors = useQuery(['contributors', localization.articleId, localization.languageCode],
    () => getArticleContributors(localization.contributors), {staleTime: 50000});

  const getDomain = (link: string) => {
    const url = new URL(link);
    const domain = url.hostname.replace('www.', '');
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }

  const divBg = useColorModeValue('purpleLight', 'purpleDark');

  return (
    isError ? <></> :
      <div className={cl.articleInfo}>
        {
          isLoading ? <Skeleton height={100} className={cl.infoBlock}/> :
            <FilledDiv className={cl.infoBlock}>
              <p className={cl.infoBlockTitle}>Переклади</p>
              <div className={cl.translates}>
                {article.localizations?.map(localization =>
                  <Button
                    onClick={() => navigate(`/article/${localization.articleId}/${localization.languageCode}`)}
                    key={localization.languageCode}
                    borderRadius={'10px'}
                    padding={'5px 16px'}
                    width={'fit-content'}
                  >
                    <Text as={'p'} mr={2} color={whiteTextColor}>
                      {localization.languageCode.toUpperCase()}
                    </Text>
                    <SvgSelector id={localization.languageCode}/>
                  </Button>
                )}
              </div>
            </FilledDiv>
        }

        {
          isLoading ? <Skeleton height={100} className={cl.infoBlock}/> :
            <FilledDiv className={cl.infoBlock}>
              <Text as={'p'} className={cl.infoBlockTitle}>Автори</Text>
              <div className={cl.contributors}>
                {contributors.isLoading ? <ContributorsSkeleton/> : contributors.data!.map(author =>
                  <Button
                    key={author.id}
                    className={cl.contributor}
                    width={'fit-content'}
                    bg={divBg}
                    borderRadius={'10px'}
                    padding={'6px 15px'}
                    color={whiteTextColor}
                    onClick={() => navigate('/profile/' + author.id)}
                  >
                    <div className={cl.role}>
                      <Text as={'p'}>{getContributorRole(localization.contributors, author.id)}</Text>
                      <Text as={'p'}>{author.userName}</Text>
                    </div>
                    <img src={author.profilePhotoLink ?? createImageFromInitials(25, author.userName)} alt={'damaged'}/>
                  </Button>
                )}
              </div>
            </FilledDiv>
        }

        {
          isLoading ? <Skeleton height={100} className={cl.infoBlock}/> :
            article.originalArticleLink &&
            <FilledDiv className={cl.infoBlock}>
              <Text as={'p'} className={cl.infoBlockTitle}>Перейти до оригіналу:</Text>
              <Button
                background={'#896DC8'}
                borderRadius={'10px'}
                padding={'5px 16px'}
                className={cl.originalLink}
                width={'fit-content'}
                bg={divBg}
              >
                <Link
                  color={whiteTextColor}
                  href={article.originalArticleLink}
                >
                  {getDomain(article.originalArticleLink)}
                </Link>
              </Button>
            </FilledDiv>
        }
      </div>
  );
};

export default ArticleInfo;
