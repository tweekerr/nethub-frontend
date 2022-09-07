import React, {useEffect, useState} from 'react';
import classes from './BlogSpace.module.scss';
import BlogItem from './BlogItem';
import {useActions} from "../../../utils";
import {Skeleton, Typography} from "@mui/material";
import UiButton from "../../UI/button/UiButton";

//TODO: TO TSX

const BlogSpace = () => {
  const [loading, setLoading] = useState(false);

  function load() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const [blogItems, setBlogItems] = useState([
    //   {
    //   localizations: [
    //     {
    //       title: 'Test title',
    //       description: 'wrrkgueglwej wrrkgueglwej wrrkgueglwej wrrkgueglwej qefgqegv wrrkgueglwejqewg wrgwrgwrgwrgfqwefweefg wdgwrgergwrgwe yumui,uiyjmnfgng  vxf bnvh y8uk egr',
    //     }
    //   ],
    //   created: Date.now(),
    // },
    //   {
    //     localizations: [
    //       {
    //         title: 'Test title',
    //         description: 'wrrkgueglwej wrrkgueglwej wrrkgueglwej wrrkgueglwej qefgqegv wrrkgueglwejqewg wrgwrgwrgwrgfqwefweefg wdgwrgergwrgwe yumui,uiyjmnfgng  vxf bnvh y8uk egr',
    //       }
    //     ],
    //     created: Date.now(),
    //   }
  ]);

  useEffect(() => {
    // api.getArticles().then((res) => {
    //   setBlogItems(res);
    // });
    load()
  }, []);

  //TODO: тут створити стор для блогу(редакс)
  return (
    <div className={classes.blogSpace}>
      <h2>Blog</h2>
      {blogItems.length > 0 ?
        blogItems.map((item, index) => (
          <BlogItem
            key={index}
            itemTitle={item.localizations[0].title}
            itemDescription={item.localizations[0].description}
            createdTime={item.created}
          />
        )) : <Skeleton/>}
      <UiButton onClick ={() => {setBlogItems([
        {
          localizations: [
            {
              title: 'Test title',
              description: 'wrrkgueglwej wrrkgueglwej wrrkgueglwej wrrkgueglwej qefgqegv wrrkgueglwejqewg wrgwrgwrgwrgfqwefweefg wdgwrgergwrgwe yumui,uiyjmnfgng  vxf bnvh y8uk egr',
            }
          ],
          created: Date.parse('2022/08/30 19:00:00'),
        },
      ])}}>Fetch</UiButton>
    </div>
  );
};

export default BlogSpace;
