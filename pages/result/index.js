import Layout from "../../components/Layout";
import {Grid, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import useGeneralStore from "../../store/generalstore";
import {useEffect} from "react";

const Result = () => {
    const input = useGeneralStore((state) => state.input);
    const analytics = useGeneralStore((state) => state.analytics);
    const updateAnalytics = useGeneralStore((state) => state.updateAnalytics);
    useEffect(()=>{
        updateAnalytics();
    },[input])
    return <>
        <Typography variant={'h3'} textAlign={"center"}>Kết quả</Typography>
        <Paper sx={{p:2}}>
            <Grid container spacing={2}>
                <Grid container item={12} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}>Thông tin bệnh nhân</Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <TextField
                            name="fullName"
                            label="Họ và tên"
                            fullWidth
                            value={input.fullName}
                            disabled
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <TextField
                            name="birthDate"
                            label="Ngày tháng năm sinh"
                            type={"date"}
                            InputLabelProps={{ shrink: true }}
                            value={input.birthDate}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    {analytics.ages&&<>
                        <Grid item md={4} xs={6}>
                            <TextField
                                label="Tuổi"
                                InputLabelProps={{shrink: true}}
                                value={analytics.ages.years?`${analytics.ages.years} tuổi`:''+` ${analytics.ages.over5?'':`${analytics.ages.monthsyears} tháng`}`}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <TextField
                                label="Tháng Tuổi"
                                InputLabelProps={{shrink: true}}
                                value={`${analytics.ages.months} tháng tuổi`}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </>}
                </Grid>
                <Grid container item={12} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}>Chỉ số nhân trắc</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Cân nặng hiện tại"
                            value={input.weight}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Chiều cao "
                            value={input.height}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    {analytics.BMI&&<>
                        <Grid item xs={4}>
                            <TextField
                                label="BMI"
                                value={analytics.BMI.toFixed(1)}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </>}
                    {analytics.CNCC&&<>
                        <Grid item xs={4}>
                            <TextField
                                label="Median (CN/CC)"
                                value={analytics.CNCC.data ? analytics.CNCC.data.Median : ''}
                                InputProps={{
                                    endAdornment:<InputAdornment position="end">kg</InputAdornment>
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="CN/CC"
                                value={analytics.CNCC.status ? analytics.CNCC.status.levelText : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label=""
                                value={analytics.CNCC.status ? analytics.CNCC.status.text : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </>}
                    {analytics.CNT&&<>
                        <Grid item xs={4}>
                            <TextField
                                label="Median (CN/T)"
                                value={analytics.CNT.data?analytics.CNT.data.Median:''}
                                InputProps={{
                                    endAdornment:<InputAdornment position="end">kg</InputAdornment>
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="CN/T"
                                value={analytics.CNT.status ? analytics.CNT.status.levelText : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label=""
                                value={analytics.CNT.status ? analytics.CNT.status.text : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </>}
                    {analytics.CCT&&<>
                        <Grid item xs={4}>
                            <TextField
                                label="Median (CC/T)"
                                value={analytics.CCT.data?analytics.CCT.data.Median:''}
                                InputProps={{
                                    endAdornment:<InputAdornment position="end">cm</InputAdornment>
                                }}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="CC/T"
                                value={analytics.CCT.status ? analytics.CCT.status.levelText : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label=""
                                value={analytics.CCT.status ? analytics.CCT.status.text : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </>}
                    {analytics.BMIT&&<>
                        <Grid item xs={4}>
                            <TextField
                                label="Median (BMI/T)"
                                value={analytics.BMIT.data?analytics.BMIT.data.Median:''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="BMI/T"
                                value={analytics.BMIT.status ? analytics.BMIT.status.levelText : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label=""
                                value={analytics.BMIT.status ? analytics.BMIT.status.text : ''}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </>}
                </Grid>
            </Grid>
        </Paper>
    </>
}

Result.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Result;