import React, {useState} from 'react';
import classes from './NewsSpace.module.scss';
import NewsItem from './NewsItem';
import {Trans, useTranslation} from "react-i18next";

//TODO: TO TSX

const NewsSpace = () => {
  //TODO: тут стор, в котрий я буду закидувати все, що мені прийде
  //FIX: можеш сетати в тулкіт, як варіант. Якщо новини можуть реюзатись
  const [newsItems, setNewsItems] = useState([{
    title: {
      rendered: 'dgwrgwrgryhbetb wrgwegfzdfs'
    },
    excerpt: {
      rendered: 'asdasdasd'
    }
  }]);
  // useEffect(() => {
  // api.getNews().then((res) => {
  //   setNewsItems(res);
  // });
  // }, []);
  const {t} = useTranslation();

  return (
    <div className={classes.newsSpace}>
      <h2>
        {t('news')}
        {/*<Trans i18nKey={'news'}/>*/}
      </h2>
      {newsItems.map((item, index) => (
        <NewsItem
          key={index}
          newsTitle={item.title.rendered}
          newsDescription={item.excerpt.rendered}
          description={'asdads'} title={'dsadas'}/>
      ))}
    </div>
  );
};

export default NewsSpace;
