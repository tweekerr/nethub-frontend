import React from 'react';
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import BasicInput from "../basisComps/BasicInput/BasicInput";
import classes from "./Header.module.css"
import LoggedUserBar from "./LoggedUserBar";
import BasicLinker from "../basisComps/BasicLinker";
import axios from "axios";
import {updateArticleId} from "../../store/plugArticleSlice";
import {useDispatch} from "react-redux";

const Header = config => {

    const dispatch = useDispatch()

    const {REACT_APP_GENERAL_BACK_POINT} = process.env;

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjMiLCJVc2VybmFtZSI6InR3ZWVrZXIiLCJuYmYiOjE2NTUwNjc3NDEsImV4cCI6MTY1NTEzNzI4MSwiaWF0IjoxNjU1MDY3NzQxfQ.ZJgGDgvOMaNTbL08b45eMveIvhtVFIXUfUHPQqHrn1c"
        const _api = axios.create({
            baseURL: REACT_APP_GENERAL_BACK_POINT,
        });

    const createArticlePlug = (e) => {

         _api.post(`/articles`, {},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(updateArticleId(res.data.id));
            });
    }
    return (
        <header>
            <div className="mainContainer">
                <div className={classes.headerContainer}>
                    <SvgSelector className={classes.svgLogo} id="navbarLogo"/>
                    <div className={classes.inputWithLink}>
                        <BasicInput placeholder={"Пошук"} width={470}/>
                        <BasicLinker onClick={createArticlePlug} linktxt={"Створити статтю"}
                                     svgId={"DriveFileRenameOutlineIcon"}/>
                    </div>

                    <div className={classes.userEntry}>
                        {/*<UnloggedUserBar/>*/}
                        <LoggedUserBar/>
                    </div>
                </div>
            </div>
        </header>
    );

}
;

export default Header;
