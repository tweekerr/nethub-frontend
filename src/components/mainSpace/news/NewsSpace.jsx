import React, {useEffect} from 'react';
import classes from './NewsSpace.module.scss';
import NewsItem from './NewsItem';
import {useState} from 'react';
import {api} from '../../../api/api';

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

  return (
    <div className={classes.newsSpace}>
      <h2>News</h2>
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
