import React from 'react';
import cl from './ArticleBody.module.sass';
import {getArticleContributors, getAuthor} from "../../../../pages/Articles/One/ArticleSpace.functions";
import {articlesApi} from "../../../../api/api";
import ArticlesRateCounter from "../../Shared/ArticlesRateCounter";
import ArticleSavingActions from "../../Shared/ArticleSavingActions";
import {DateToRelativeCalendar} from "../../../../utils/dateHelper";
import {useQuery} from "react-query";
import FilledDiv from "../../../UI/FilledDiv";
import {Badge, Box, Button, Skeleton, Text, useColorModeValue} from "@chakra-ui/react";
import {useArticleContext} from "../../../../pages/Articles/One/ArticleSpace.Provider";

const ArticleBody = () => {
  const {articleAccessor, setArticle, localizationAccessor, userActions} = useArticleContext();

  async function handleSave() {
    await articlesApi.toggleSavingLocalization(localizationAccessor.data!.articleId, localizationAccessor.data!.languageCode);
  }

  function handleSetRate(value: number) {
    setArticle({...articleAccessor.data!, rate: value});
  }

  const contributors = useQuery(['contributors', localizationAccessor.data!.articleId, localizationAccessor.data!.languageCode],
    () => getArticleContributors(localizationAccessor.data!.contributors), {staleTime: 50000});

  const variant = 'preview';
  const viewsBlockBg = useColorModeValue('whiteLight', 'whiteDark');

  return (
    (!localizationAccessor.isSuccess || !articleAccessor.isSuccess)
      ? <Skeleton height={200}/>
      : <FilledDiv className={cl.articleWrapper}>
        <Box className={cl.articleTitle} display={'flex'} alignItems={'center'}>
          <Text as={'p'} fontWeight={'bold'} fontSize={18}>{localizationAccessor.data.title}</Text>
          {
            (() => {

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
          <Text>{localizationAccessor.data.description}</Text>
        </div>

        <hr className={cl.line}/>

        <div className={cl.articleBody} dangerouslySetInnerHTML={{__html: localizationAccessor.data.html}}/>

        <div className={cl.articleTags}>
          {articleAccessor.data.tags.map(tag =>
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
              articleId={articleAccessor.data.id}
              current={articleAccessor.data.rate}
              setCurrent={handleSetRate}
              actualVote={userActions.rate}
            />
            <FilledDiv bg={viewsBlockBg} className={cl.views} padding={'7px 19px'}>
              <Text as={'b'} color={'black'} className={cl.viewsCount}>{localizationAccessor.data.views}</Text>
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
                <a>{getAuthor(localizationAccessor.data.contributors, contributors.data!)?.userName}</a>
              }
            </p>
          </div>
          <div className={cl.dates}>
            <div className={cl.created}>Створено: {DateToRelativeCalendar(localizationAccessor.data.created)}</div>
            {
              localizationAccessor.data.updated &&
             <div className={cl.updated}>Оновлено: {DateToRelativeCalendar(localizationAccessor.data.updated)}</div>
            }
          </div>
        </div>
      </FilledDiv>
  );
};

export default ArticleBody;
