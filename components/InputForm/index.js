'use client'
import {Grid, MenuItem, Typography, TextField as TextFieldmui, Button} from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Formik, Form, Field } from 'formik';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Autocomplete, TextField} from "formik-mui";
import * as Yup from 'yup';
import useGeneralStore from "../../store/generalstore";
import { useRouter } from 'next/navigation'

const Accordion = ((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props}
    sx={theme  => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
    })}/>
));

const AccordionSummary = ((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
        sx={ theme  => ({
            backgroundColor:
                theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, .05)'
                    : 'rgba(152,212,255,0.33)',
            flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
            },
            '& .MuiAccordionSummary-content': {
                marginLeft: theme.spacing(1),
            },
        })}
    />
));

const AccordionDetails = (props)=><MuiAccordionDetails {...props}
 sx={theme => ({
     padding: theme.spacing(2),
     borderTop: '1px solid rgba(0, 0, 0, .125)',
 })}/>;

const historyOptions = [
    "Dị ứng đạm sữa bò",
    "Hen suyễn",
    "Bất dung nạp Lastose"
]

const drugHisOptions = [
    {key:1,text:"Sử dụng kháng sinh kéo dài"},
    {key:2,text:"Sử dụng Corticoid kéo dài"},
]

const eatHabitOptions = [
    {key:1,text:"Biếng ăn"},
    {key:2,text:"Lượng ăn ít"},
    {key:3,text:"Ít uống sữa"},
    {key:4,text:"Ăn hay ngậm"},
    {key:5,text:"Ăn hay ói"},
    {key:6,text:"Ăn hay khóc"},
]

const digestIssueOption = [
    {key:1,text:"Trào ngược dạ dày"},
    {key:2,text:"Đầy bụng, khó tiêu"},
    {key:3,text:"Táo bón"},
    {key:4,text:"Tiêu lỏng"},
    {key:5,text:"Tiêu phân sống, phân nát"},
    {key:6,text:"Tiêu phân có nhầy máu"},
]
const otherIssueOption = [
    {"key":1,"text":"Biếng ăn, chán ăn"},
    {"key":2,"text":"Khó ngủ, ngủ không sâu giấc"},
    {"key":3,"text":"Buồn chán, stress, trầm cảm"},
    {"key":4,"text":"Cơ thể mệt mỏi, tinh thần suy nhược"},
    {"key":5,"text":"Loãng xương, đau nhức khớp"},
    {"key":6,"text":"Vôi hóa động mạch"},
    {"key":7,"text":"Huyết áp cao, nhịp tim bất thường"},
    {"key":8,"text":"Trẻ chậm lớn, run rẩy, co giật tay chân"}];

const FormSchema = Yup.object().shape({
    checkDate: Yup.date().required('Required'),
    birthDate: Yup.date().required('Required'),
    gender: Yup.number().required('Required'),
    weight: Yup.number().required('Required'),
    height: Yup.number().required('Required'),
});
export default function InputForm() {
    const setInput = useGeneralStore((state) => state.setInput);
    const router = useRouter();
    return <Formik initialValues={{
        checkDate: '2023-10-17',//new Date(),
        birthDate: '2021-01-05',
        gender: 1,
        weight: 12,
        height: 80,
    }}
                   validationSchema={FormSchema}
                   onSubmit={(values, { setSubmitting }) => {
                       setInput(values);
                       setSubmitting(false);
                       router.push('/result');
                       // setTimeout(() => {
                       //     setSubmitting(false);
                       //     alert(JSON.stringify(values, null, 2));
                       // }, 500);
                   }}
    >
            {({ submitForm, isSubmitting }) => (
                <div>
                    <Form>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="general-info"
                            >
                                <Typography>
                                    1. Thông tin chung
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="fullName"
                                            label="Họ và tên"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="birthDate"
                                            label="Ngày tháng năm sinh"
                                            type={"date"}
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="gender"
                                            label="Giới"
                                            select
                                            fullWidth
                                        >
                                            <MenuItem value={0}>Nam</MenuItem>
                                            <MenuItem value={1}>Nữ</MenuItem>
                                        </Field>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="nutrition-info"
                            >
                                <Typography>
                                    2. Đánh giá tình trạng dinh dưỡng và nhu cầu khuyến nghị
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="weight"
                                            label="Căn nặng (kg)"
                                            type={"number"}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="birthWeight"
                                            label="Cân nặng lúc sinh (Kg)"
                                            type={"number"}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="height"
                                            label="Chiều cao (cm)"
                                            type={"number"}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="weight_height_changed"
                                            label="Sự thay đổi cân nặng và chiều cao"
                                            type={"number"}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="history-info"
                            >
                                <Typography>
                                    3. Tiền sử
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={Autocomplete}
                                            name="history"
                                            fullWidth
                                            multiple
                                            freeSolo
                                            options={historyOptions}
                                            getOptionLabel={(option) => option}
                                            renderInput={(params) => (
                                                <TextFieldmui
                                                    {...params}
                                                    label="Có từng được chẩn đoán các bệnh lý nào không?"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={Autocomplete}
                                            name="drugHis"
                                            fullWidth
                                            multiple
                                            options={drugHisOptions}
                                            getOptionLabel={(option) => option.text}
                                            renderInput={(params) => (
                                                <TextFieldmui
                                                    {...params}
                                                    label="Tiền sử dùng thuốc"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={TextField}
                                            name="food_allergy"
                                            label="Dị ứng thực phẩm"
                                            type={"text"}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="issue-info"
                            >
                                <Typography>
                                    4. Triệu chứng lâm sàng (than phiền)
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Field
                                            component={Autocomplete}
                                            name="eat_habit"
                                            fullWidth
                                            multiple
                                            freeSolo
                                            options={eatHabitOptions}
                                            getOptionLabel={(option) => option.text??option}
                                            renderInput={(params) => (
                                                <TextFieldmui
                                                    {...params}
                                                    label="Tình trạng ăn uống"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={Autocomplete}
                                            name="digest_issue"
                                            fullWidth
                                            multiple
                                            freeSolo
                                            options={digestIssueOption}
                                            getOptionLabel={(option) => option}
                                            renderInput={(params) => (
                                                <TextFieldmui
                                                    {...params}
                                                    label="Có từng được chẩn đoán các bệnh lý nào không?"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="weight_status"
                                            label="Tình trạng cân nặng"
                                            select
                                            fullWidth
                                        >
                                            <MenuItem value={1}>Sụt giảm</MenuItem>
                                            <MenuItem value={2}>Không tăng</MenuItem>
                                            <MenuItem value={3}>Tăng chậm</MenuItem>
                                            <MenuItem value={0}>Tăng trưởng tốt</MenuItem>
                                        </Field>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <Field
                                            component={TextField}
                                            name="height_status"
                                            label="Tình trạng chiều cao"
                                            select
                                            fullWidth
                                        >
                                            <MenuItem value={1}>Không tăng</MenuItem>
                                            <MenuItem value={2}>Tăng chậm</MenuItem>
                                            <MenuItem value={0}>Tăng trưởng tốt</MenuItem>
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Field
                                            component={Autocomplete}
                                            name="other_issue"
                                            fullWidth
                                            multiple
                                            options={otherIssueOption}
                                            getOptionLabel={(option) => option.text}
                                            renderInput={(params) => (
                                                <TextFieldmui
                                                    {...params}
                                                    label="Triệu chứng theo cơ quan: (Thêm những triệu chứng thường gặp ở trẻ)"
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Button type="submit">Gửi thông tin</Button>
                    </Form>
                </div>
        )}
    </Formik>
}