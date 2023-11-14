import Head from 'next/head';
import Layout from "../components/Layout";
import InputForm from "../components/InputForm";
import {Typography} from "@mui/material";


const Home = () => {
  return (<>
      <Head>
        <title>Nutrition</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant={'h2'} textAlign={"center"}>Thông tin của trẻ</Typography>
      <InputForm/>
  </>);
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;