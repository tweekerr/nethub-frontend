import React, {useEffect} from 'react';
import classes from "./NewsSpace.module.scss"
import NewsItem from "./NewsItem";
import {BACKLINK} from "../../../constants/backend";
import {useState} from "react";
import axios from "axios";


const NewsSpace = () => {

    //TODO: тут стор, в котрий я буду закидувати все, що мені прийде
    const [newsItems, setNewsItems] = useState([])

    useEffect(()=> {
        axios.get(`${BACKLINK}/v1/news?Page=1&PerPage=3`)
            .then(res => {
                const items = res.data;
                setNewsItems(items);
            });
    },[])

    return (
        <div className = {classes.newsSpace}>
            <h2>News</h2>
            {newsItems.map(item =>
                <NewsItem
                    newsTitle={item.title.rendered}
                    newsDescription={item.excerpt.rendered}
                />)

            }
        </div>
    );
};

export default NewsSpace;
