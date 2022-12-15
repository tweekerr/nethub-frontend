import React, {FC, useState} from 'react';
import SvgSelector from "../../UI/SvgSelector/SvgSelector";
import cl from './ArticleRateCounter.module.sass';
import {articlesApi} from "../../../api/api";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {isAuthorized} from "../../../utils/JwtHelper";
import FilledDiv from '../../UI/FilledDiv';
import {Text, useColorModeValue} from "@chakra-ui/react";
import Actions from "../../UI/Action/Actions";

export type RateVariants = 'up' | 'down' | 'none';

interface IArticleRateCounterProps {
  actualVote:RateVariants,
  current: number,
  setCurrent: (value: number) => void,
  articleId: number
}


const ArticlesRateCounter: FC<IArticleRateCounterProps> = ({actualVote, current, setCurrent, articleId}) => {
  const [counterState, setCounterState] = useState<RateVariants>(actualVote)
  const {enqueueError} = useCustomSnackbar();


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

  return (
    <Actions className={cl.rating}>
      <div onClick={handleDownVote}>
        <SvgSelector id={'ArrowDown'} className={counterState === 'down' ? cl.ratingDown : ''}/>
      </div>
      <Text as={'p'} className={cl.ratingCount} style={{color: ratingCountColor()}}>{current}</Text>
      <div onClick={handleUpVote}>
        <SvgSelector id={'ArrowUp'} className={counterState === 'up' ? cl.ratingUp : ''}/>
      </div>
    </Actions>
  );
};

export default ArticlesRateCounter;
