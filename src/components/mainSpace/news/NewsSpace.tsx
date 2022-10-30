import React, {useState} from 'react';
import INewsResponse from "../../../types/api/News/INewsResponse";

//TODO: TO TSX

const NewsSpace = () => {
  //TODO: тут стор, в котрий я буду закидувати все, що мені прийде
  //FIX: можеш сетати в тулкіт, як варіант. Якщо новини можуть реюзатись
  const [newsItems, setNewsItems] = useState<INewsResponse[]>([]);

  // const {startLoading, finishLoading, isLoading, error, setError} = useLoading();
  //
  // useEffect(() => {
  //   startLoading();
  //   api.getNews()
  //     .then((news) => {
  //       setNewsItems(news);
  //     })
  //     .catch(e => {
  //       setError(e)
  //     })
  //     .finally(() => {
  //       finishLoading();
  //     })
  // }, []);

  // return (
  //   error.isError ? <div>{error.message}</div> :
  //     isLoading ? <ArticlesThreadSpaceSkeleton/> :
  //       <div className={classes.newsSpace}>
  //         {newsItems.map((item, index) => (
  //           <NewsItem
  //             key={index}
  //             title={item.title.rendered}
  //             description={item.excerpt.rendered}/>
  //         ))}
  //       </div>
  // );

  return <></>;
};

export default NewsSpace;
