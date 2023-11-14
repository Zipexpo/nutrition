import {Grid, MenuItem, Typography} from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Formik, Form, Field } from 'formik';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {TextField} from "formik-mui";

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

export default function InputForm() {
    return <Formik initialValues={{}}
                   onSubmit={(values, { setSubmitting }) => {
                       // setTimeout(() => {
                       //     setSubmitting(false);
                       //     alert(JSON.stringify(values, null, 2));
                       // }, 500);
                   }}>
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
                                            name="birthYear"
                                            label="Năm sinh"
                                            type={"number"}
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
                                aria-controls="general-info"
                            >
                                <Typography>
                                    2. Đánh giá tình trạng dinh dưỡng và nhu cầu khuyến nghị
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
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
                    </Form>
                </div>
        )}
    </Formik>
}