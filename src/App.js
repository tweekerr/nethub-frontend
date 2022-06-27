import Header from "./components/Header/Header";
import MainSpace from "./components/mainSpace/MainSpace";
import NewsSpace from "./components/mainSpace/news/NewsSpace";
import MenuItems from "./components/mainSpace/menuItems/MenuItems";
import 'typeface-inter'
import moment from "moment";
// import {Routes, Route, Link} from 'react-router-dom'
import 'moment/locale/uk'
import 'moment/locale/de'
import ArticleCreatingSpace from "./components/articleCreating/ArticleCreatingSpace";
import {useState} from "react";


const LANGUAGE = "uk";

function App() {


    switchLocal()

    return (
        <div className="App">
            <Header/>
            <ArticleCreatingSpace/>
            {/*<MainSpace/>*/}

            {/*<Routes>*/}
            {/*    <Route path="/" element = {<MainSpace/>} />*/}
            {/*    <Route path="/" element = {<NewsSpace/>} />*/}
            {/*    <Route path="/" element = {<MenuItems/>} />*/}
            {/*</Routes>*/}
        </div>
    );
}

const switchLocal = ()=>{
        switch(LANGUAGE){
            case "uk":
                moment.locale("uk")
                break
            case "de":
                moment.locale("de")
                break
        }
}

export default App;