import React, {FC, useState} from 'react';
import SvgSelector from "../../basisComps/SvgSelector/SvgSelector";
import cl from "../../basisComps/ВasicComps.module.sass";
import {FilledDiv} from "../../basisComps/Basic.styled";
import {articlesApi} from "../../../api/userApi";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {isAuthorized} from "../../../utils/JwtHelper";

interface IRateCounterProps {
  articleId: number,
  current: number,
  setCurrent: (value: number) => void;
  actualVote: 'up' | 'down' | 'none',
}

export type RateVariants = 'up' | 'down' | 'none';

const ArticlesRateCounter: FC<IRateCounterProps> = ({
                                                      articleId,
                                                      current,
                                                      actualVote,
                                                      setCurrent
                                                    }) => {
  const [counterState, setCounterState] = useState<'up' | 'down' | 'none'>(actualVote)
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
      await articlesApi.setRate(articleId, 'up');
      setCurrent(current + 1);
    }

    if (counterState === 'down') {
      await articlesApi.setRate(articleId, 'up');
      setCurrent(current + 2);
    }

    if (counterState === 'up') {
      await articlesApi.setRate(articleId, 'none');
      setCurrent(current - 1);
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
      await articlesApi.setRate(articleId, 'down');
      setCurrent(current - 1);
    }

    if (counterState === 'down') {
      await articlesApi.setRate(articleId, 'none');
      setCurrent(current + 1);
    }

    if (counterState === 'up') {
      await articlesApi.setRate(articleId, 'down');
      setCurrent(current - 2);
    }
  }


  return (
    <FilledDiv
      onClick={(e) => e.stopPropagation()}
      background={'white'}
      padding={'7px 9px'}
      className={cl.rating}>
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
