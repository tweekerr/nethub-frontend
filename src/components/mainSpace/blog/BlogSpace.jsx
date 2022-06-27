import React, {useEffect} from 'react';
import classes from "./blogSpace.module.css"
import BlogItem from "./BlogItem";
import axios from 'axios';
import {useState} from "react";
import moment from "moment";
import {BACKLINK} from "../../../constants/backend";


const BlogSpace = () => {

    const [blogItems, setBlogItems] = useState([])

    useEffect(()=> {
        axios.get(`${BACKLINK}/v1/articles?code=ua&page=1&perPage=20`)
            .then(res => {
                const items = res.data;
                setBlogItems(items);
            });
    },[])

    //todo: тут створити стор для блогу(редакс)
    return (
        <div className={classes.blogSpace}>
            <h2>Blog</h2>
            {blogItems.map(item =>
                <BlogItem
                    itemTitle={item.localizations[0].title}
                    itemDescription={item.localizations[0].description}
                    createdTime = {item.created}
                />)

            }
        </div>
    );
};

export default BlogSpace;