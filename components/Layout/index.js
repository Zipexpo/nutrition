import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "../Header";
import styles from "../../styles/Home.module.css";
import {Container} from "@mui/material";

export default function Layout ({children}) {
 return <React.Fragment>
     <CssBaseline />
    <Container maxWidth="md">
     <Header/>
     {children}
    </Container>
 </React.Fragment>
}