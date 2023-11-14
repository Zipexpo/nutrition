import Layout from "../../components/Layout";
import {Paper, Typography} from "@mui/material";

const About = () => {
    return <>
        <Typography variant={'h3'}>About US</Typography>
        <Paper sx={{p:2}}>
            <Typography variant={"body"}>
                Chúng tôi cung cấp chương trình về tư vấn dinh dưỡng cho trẻ dưới 19 tuổi.
                Các khuyến nghị từ chương trình đã được nghiên cứu kỹ lưỡng bởi Viện dinh dưỡng Tp. HCM
            </Typography>
        </Paper>
        </>
}

About.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default About;