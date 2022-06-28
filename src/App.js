import Header from "./components/Header/Header";
// import MainSpace from "./components/mainSpace/MainSpace";
// import NewsSpace from "./components/mainSpace/news/NewsSpace";
// import MenuItems from "./components/mainSpace/menuItems/MenuItems";
import 'typeface-inter'
import moment from "moment";
import 'moment/locale/uk'
import 'moment/locale/de'
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter'

const LANGUAGE = "uk";

function App() {


    switchLocal()

    return (
        <BrowserRouter>

            <div className="App">
                <Header />
                <AppRouter />
                {/*<MainSpace/>*/}

                {/*<Routes>*/}
                {/*    <Route path="/" element = {<MainSpace/>} />*/}
                {/*    <Route path="/" element = {<NewsSpace/>} />*/}
                {/*    <Route path="/" element = {<MenuItems/>} />*/}
                {/*</Routes>*/}
            </div>
        </BrowserRouter>
    );
}

const switchLocal = () => {
    switch (LANGUAGE) {
        case "uk":
            moment.locale("uk")
            break
        case "de":
            moment.locale("de")
            break
    }
}

export default App;
