import React, {FC} from 'react';
import cl from './ArticleBody.module.sass';
import IArticleLocalizationResponse from "../../../../types/api/Article/IArticleLocalizationResponse";
import {getArticleContributors, getAuthor} from "../../../../pages/Articles/One/ArticleSpace.functions";
import {articlesApi} from "../../../../api/api";
import ArticlesRateCounter, {RateVariants} from "../../Shared/ArticlesRateCounter";
import ArticleSavingActions from "../../Shared/ArticleSavingActions";
import {DateToRelativeCalendar} from "../../../../utils/dateHelper";
import {useQuery} from "react-query";
import FilledDiv from "../../../UI/FilledDiv";
import {Badge, Box, Button, Skeleton, Text, useColorModeValue} from "@chakra-ui/react";

interface IArticleBodyProps {
  localization: IArticleLocalizationResponse,
  tags: string[],
  userActions: { isSaved: boolean, rate: RateVariants }
  rate: { current: number, setCurrent: (value: number) => void }
  variant?: 'default' | 'preview'
}

const ArticleBody: FC<IArticleBodyProps> = ({localization, tags, userActions, rate, variant}) => {

  async function handleSave() {
    await articlesApi.toggleSavingLocalization(localization.articleId, localization.languageCode);
  }

  const contributors = useQuery(['contributors', localization.articleId, localization.languageCode], () => getArticleContributors(localization.contributors), {staleTime: 50000});

  return (
    <FilledDiv className={cl.articleWrapper}>
      <Box className={cl.articleTitle} display={'flex'} alignItems={'center'}>
        <Text as={'p'} fontWeight={'bold'} fontSize={18}>{localization.title}</Text>
        {
          (() => {
            variant = "preview";

            switch (variant) {
              // case 'default':
              //   return null;
              case 'preview':
                return <Badge ml={2} variant='outline' colorScheme='yellow'>
                  Preview
                </Badge>;
            }
          })()
        }
      </Box>

      <div className={cl.articleDescription}>
        <Text>{localization.description}</Text>
      </div>

      <hr className={cl.line}/>

      <div className={cl.articleBody} dangerouslySetInnerHTML={{__html: localization.html}}/>

      <div className={cl.articleTags}>
        {tags.map(tag =>
          <Button
            key={tag}
            className={cl.tag}
            maxH={30}
            borderRadius={'10px'}
            width={'fit-content'}
          >#{tag}
          </Button>)
        }
      </div>

      <div className={cl.actions}>
        <div className={cl.actionsLeft}>
          <ArticlesRateCounter
            current={rate.current} setCurrent={rate.setCurrent} actualVote={userActions.rate}
            articleId={localization.articleId}
          />
          <FilledDiv bg={useColorModeValue('whiteLight', 'whiteDark')} className={cl.views} padding={'7px 19px'}>
            <Text as={'b'} color={'black'} className={cl.viewsCount}>{localization.views}</Text>
            <Text as={'p'} color={'black'}>переглядів</Text>
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
            {contributors.isLoading ? <Skeleton width={'100px'} height={15}/> :
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
