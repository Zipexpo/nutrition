import * as moment from 'moment';
import BMI_female from './BMI_female.json';
import BMI_male from './BMI_male.json';
import CCT_female from './CCT_female.json';
import CCT_male from './CCT_male.json';
import CNCC_female from './CNCC_female.json';
import CNCC_male from './CNCC_male.json';
import CNCD_female from './CNCD_female.json';
import CNCD_male from './CNCD_male.json';
import CNT_female from './CNT_female.json';
import CNT_male from './CNT_male.json';

const levels = ["-3_SD","-2_SD","-1_SD","Median","1_SD","2_SD","3_SD"];
function getlevel (data,value) {
    let currentLevel = 7;
    for (let i =0;i<levels.length;i++) {
        if (value < data[levels[i]])
        {
            currentLevel = i;
            return i;
        }
    }
    return currentLevel;
}

const dataapi = {
    BMIT:{data:[BMI_male,BMI_female],findFunc:(d)=>d.Months,
        getlevel:(range,input)=>{
            const v = input['BMI'];
            const r = {level:null,text:'',levelText:''}
            if (!v)
                return r;
            debugger
            const level = getlevel(range,v);
            r.level = level;
            r.levelText = levels[level]?`< ${levels[level]}`:`> ${levels[levels.length-1]}`;
            if (level===0){
                r.text = "SDD nặng";
            }else if(level===1){
                r.text = "SDD vừa";
            }else{
                r.text = "Bình thường"
            }
            return r;
        }},
    CCT:{data:[CCT_male,CCT_female],findFunc:(d)=>d.Months,
        getlevel:(range,input)=>{
            const v = input['height'];
            const r = {level:null,text:'',levelText:''}
            if (!v)
                return r;
            const level = getlevel(range,v);
            r.level = level;
            r.levelText = levels[level]?`< ${levels[level]}`:`> ${levels[levels.length-1]}`;
            if (level===0){
                r.text = "Thấp còi nặng";
            }else if(level===1){
                r.text = "Thấp còi";
            }else if(level===7){
                r.text = "Kiểm tra nội tiết";
            }else{
                r.text = "Bình thường"
            }
            return r;
        }},
    CNCC:{data:[CNCC_male,CNCC_female],findFunc:(d)=>d.cm,
        getlevel:(range,input)=>{
            const v = input['weight'];
            const r = {level:null,text:'',levelText:''}
            if (!v)
                return r;
            const level = getlevel(range,v);
            r.level = level;
            r.levelText = levels[level]?`< ${levels[level]}`:`> ${levels[levels.length-1]}`;
            r.level = level;
            if (level===0){
                r.text = "Gầy còm nặng";
            }else if(level===1){
                r.text = "Gầy còm";
            }else if(level===7){
                r.text = "Béo phì";
            }else if(level===7){
                r.text = "Thừa cân";
            }else if(level===7){
                r.text = "Có nguy cơ thừa cân";
            }else{
                r.text = "Bình thường"
            }
            return r;
        }},
    // CNCD:{data:[CNCD_male,CNCD_female],findFunc:(d)=>d.cm,
    //     getlevel:(range,input)=>{
    //         const v = input['BMI'];
    //         const r = {level:null,text:''}
    //         if (!v)
    //             return r;
    //         const level = getlevel(range,v);
    //         r.level = level;
    //         if (level===0){
    //             r.text = "Gầy còm nặng";
    //         }else if(level===1){
    //             r.text = "Gầy còm";
    //         }else if(level===7){
    //             r.text = "Béo phì";
    //         }else if(level===7){
    //             r.text = "Thừa cân";
    //         }else if(level===7){
    //             r.text = "Có nguy cơ thừa cân";
    //         }else{
    //             r.text = "Bình thường"
    //         }
    //         return r;
    //     }},
    CNT:{data:[CNT_male,CNT_female],findFunc:(d)=>d.Months,
        getlevel:(range,input)=>{
            const v = input['weight'];
            const r = {level:null,text:'',levelText:''}
            if (!v)
                return r;
            const level = getlevel(range,v);
            r.level = level;
            r.levelText = levels[level]?`< ${levels[level]}`:`> ${levels[levels.length-1]}`;
            if (level===0){
                r.text = "Thiếu cân nặng";
            }else if(level===1){
                r.text = "Thiếu cân";
            }else if(level<4){
                r.text = "Bình thường";
            }else{
                r.text = "Có sự lệch lạc về tăng trưởng  nên đánh giá thêm với CN/CC"
            }
            return r;
        }},
}

function api (cat,gender=0,key,input) {
    if (dataapi[cat] && dataapi[cat].data[gender]) {
        const col = dataapi[cat].data[gender];
        const findFunc = dataapi[cat].findFunc;
        const levelFunc = dataapi[cat].getlevel;
        const data = col.find(d => findFunc(d) === key);
        const status = data?levelFunc(data,input):{level:null,text:'_'};
        return {data,status};
    }
    return null;
}
const roundToNearest5 = x => Math.round(x / 5) * 5
export function analyticsHandle (input) {
    const {checkDate,birthDate,weight,height, gender} = input;
    const analytics = {};
    if (birthDate){
        const current = moment(checkDate);
        const birth = moment(birthDate);
        const years = (current.diff(birth,"years"));
        const months = (current.diff(birth,"months"));
        const roundYear = birth.add(years,'years');
        const monthsyears = (current.diff(roundYear,"months"));
        const over5 = years>=5;
        analytics.ages = {years,monthsyears,months,over5};

        // analytics
        ["CCT","CNT"].forEach(k=>{
            debugger
            analytics[k] = api(k, gender, months,input)
        })
    }
    if (weight&&height) {
        analytics.BMI = weight/(height*height) * 10000;
        ["CNCC"].forEach(k=>{
            analytics[k] = api(k, gender, roundToNearest5(height),input);
        });
        ["BMIT"].forEach(k=>{
            analytics[k] = api(k, gender, analytics.ages.months,analytics);
        })
    }
    return analytics
}