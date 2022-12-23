import React, {FC} from 'react';
import SvgSelector from "../../UI/SvgSelector/SvgSelector";
import cl from './ArticleRateCounter.module.sass';
import {articlesApi} from "../../../api/api";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {isAuthorized} from "../../../utils/JwtHelper";
import {Text} from "@chakra-ui/react";
import Actions from "../../UI/Action/Actions";

export type RateVariants = 'up' | 'down';

interface IArticleRateCounterProps {
  vote?: RateVariants,
  rate: number,
  updateCounter: (rate: number, vote?: RateVariants) => void,
  afterRequest: () => Promise<void>,
  articleId: number
}


const ArticlesRateCounter: FC<IArticleRateCounterProps> = ({vote, rate, updateCounter, afterRequest, articleId}) => {
  const {enqueueError} = useCustomSnackbar();


  function checkAuth() {
    if (!isAuthorized()) {
      enqueueError('Будь ласка, авторизуйтесь')
      return false;
    }
    return true;
  }

  const ratingCountColor = () => rate === 0 ? 'black' : rate > 0 ? '#09A552' : '#DF2638';


  async function handleUpVote(e: React.MouseEvent) {

    e.stopPropagation()
    if (!checkAuth()) return;

    const prevState = vote;
    const newState: {rate: number, vote?: RateVariants} = {rate: 0, vote: undefined};

    if (prevState === 'up')
      newState.vote = undefined;
    else
      newState.vote = 'up'


    if (prevState === undefined) {
      newState.rate = rate + 1;
    }

    if (prevState === 'down') {
      newState.rate = rate + 2;
    }

    if (prevState === 'up') {
      newState.rate = rate - 1;
    }

    updateCounter(newState.rate, newState.vote);
    await afterRequest();
    await articlesApi.setRate(articleId, 'up');
  }

  async function handleDownVote(e: React.MouseEvent) {
    e.stopPropagation()
    if (!checkAuth()) return;

    const prevState = vote;
    const newState: {rate: number, vote?: RateVariants} = {rate: 0, vote: undefined};

    if (prevState === 'down')
      newState.vote = undefined;
    else
      newState.vote = 'down';


    if (prevState === undefined) {
      newState.rate = rate - 1;
    }

    if (prevState === 'down') {
      newState.rate = rate + 1;
    }

    if (prevState === 'up') {
      newState.rate = rate - 2;
    }

    updateCounter(newState.rate, newState.vote);
    await afterRequest();
    await articlesApi.setRate(articleId, 'down');
  }

  return (
    <Actions className={cl.rating}>
      <div onClick={handleDownVote}>
        <SvgSelector id={'ArrowDown'} className={vote === 'down' ? cl.ratingDown : ''}/>
      </div>
      <Text as={'p'} className={cl.ratingCount} style={{color: ratingCountColor()}}>{rate}</Text>
      <div onClick={handleUpVote}>
        <SvgSelector id={'ArrowUp'} className={vote === 'up' ? cl.ratingUp : ''}/>
      </div>
    </Actions>
  );
};

export default ArticlesRateCounter;
