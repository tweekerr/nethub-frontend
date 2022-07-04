import React from 'react';
import classes from './ArticleCreating.module.scss';
import TitleInput from '../basisComps/titleInput/TitleInput';
import TinyInput from './TinyInput';
import {useState} from 'react';
import {useActions} from '../../utils';

// import {createArticleSlice, updateMainTxt, updateSubTitle, updateTitle} from '../../store/createArticleSlice';

const MainArticleParams = ({titleParams}) => {

    const {updateTitle, updateMainTxt, updateSubTitle} = useActions();
    const [titleValue, setTitleValue] = useState('');
    const [subTitleValue, setSubTitleValue] = useState('');
    const [txtValue, setTxtValue] = useState('');

    // const articleStoreSelector = useSelector(state=> state.articleReducer)
    // console.log(articleStoreSelector)


    return (
        <div className={classes.mainArticleParams}>
            <p>{titleParams}</p>
            {/*{JSON.stringify(newArticle)}*/}
            <TitleInput
                value={titleValue}
                setValue={(val) => {
                    updateTitle(val);
                }}
                titleToInput={'Заголовок статті'}
                placeholder={'Заголовок вашої статті'}
                width={'100%'}
            />
            <TitleInput
                value={subTitleValue}
                setValue={(val) => {
                    updateSubTitle(val);
                }}
                titleToInput={'Заголовок статті'}
                placeholder={'Заголовок вашої статті'}
                width={'100%'}
            />
            <TinyInput
                initialValue={txtValue}
                setValue={(val) => {
                    updateMainTxt(val);
                }}
                tinyTitle={'Текст статті'}
            />
        </div>
    );
};

export default MainArticleParams;