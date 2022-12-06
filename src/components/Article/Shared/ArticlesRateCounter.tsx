import React, {useState} from 'react';
import SvgSelector from "../../UI/SvgSelector/SvgSelector";
import cl from './ArticleRateCounter.module.sass';
import {articlesApi} from "../../../api/api";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {isAuthorized} from "../../../utils/JwtHelper";
import FilledDiv from '../../UI/FilledDiv';
import {useColorModeValue} from "@chakra-ui/react";
import {useArticleContext} from "../../../pages/Articles/One/ArticleSpace.Provider";
import {useQueryClient} from "react-query";

export type RateVariants = 'up' | 'down' | 'none';

const ArticlesRateCounter = () => {
  const queryClient = useQueryClient();
  const {article, userActions} = useArticleContext();
  const [counterState, setCounterState] = useState<'up' | 'down' | 'none'>(userActions.rate)
  const {enqueueError} = useCustomSnackbar();

  const articleId = article.data!.id
  const current = article.data!.rate;
  const setCurrent = (value: number) => queryClient.setQueryData(['article', articleId], {...article, rate: value});

  function checkAuth() {
    if (!isAuthorized()) {
      enqueueError('Будь ласка, авторизуйтесь')
      return;
    }
  }

  const ratingCountColor = () => current === 0 ? 'black' : current > 0 ? '#09A552' : '#DF2638';

  async function handleUpVote(e: React.MouseEvent) {
    e.stopPropagation()
    checkAuth()

    if (counterState === 'up')
      setCounterState('none');
    else
      setCounterState('up');

    if (counterState === 'none') {
      setCurrent(current + 1);
      await articlesApi.setRate(articleId, 'up');
    }

    if (counterState === 'down') {
      setCurrent(current + 2);
      await articlesApi.setRate(articleId, 'up');
    }

    if (counterState === 'up') {
      setCurrent(current - 1);
      await articlesApi.setRate(articleId, 'none');
    }
  }

  async function handleDownVote(e: React.MouseEvent) {
    e.stopPropagation()
    checkAuth()

    if (counterState === 'down')
      setCounterState('none');
    else
      setCounterState('down');

    if (counterState === 'none') {
      setCurrent(current - 1);
      await articlesApi.setRate(articleId, 'down');
    }

    if (counterState === 'down') {
      setCurrent(current + 1);
      await articlesApi.setRate(articleId, 'none');
    }

    if (counterState === 'up') {
      setCurrent(current - 2);
      await articlesApi.setRate(articleId, 'down');
    }
  }

  const blockColor = useColorModeValue('#FFFFFF', '#EFEFEF');

  return (
    <FilledDiv
      onClick={(e) => e.stopPropagation()}
      background={'white'}
      padding={'7px 9px'}
      className={cl.rating}
      width={'fit-content'}
      bg={blockColor}
    >
      <div onClick={handleDownVote}>
        <SvgSelector id={'ArrowDown'} className={counterState === 'down' ? cl.ratingDown : ''}/>
      </div>
      <p className={cl.ratingCount} style={{color: ratingCountColor()}}>{current}</p>
      <div onClick={handleUpVote}>
        <SvgSelector id={'ArrowUp'} className={counterState === 'up' ? cl.ratingUp : ''}/>
      </div>
    </FilledDiv>
  );
};

export default ArticlesRateCounter;
