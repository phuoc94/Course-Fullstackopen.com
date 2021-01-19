import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/bmi', (req, res) => {
    if(req.query.height && req.query.weight){
        const weight: number = parseFloat(req.query.weight as string)
        const height: number =  parseFloat(req.query.height as string)
        const bmi: string = calculateBmi(height, weight)
        res.send({
            weight,
            height,
            bmi
        })
    }else{
        res.send({
            error: "malformatted parameters"
        })
    }
});

app.post('/exercises', (req, res) => {

    interface Body {
        daily_exercises: number[],
        target: number
    }

    const {daily_exercises, target} = req.body as Body
    if(daily_exercises && target){
        res.send(calculateExercises(daily_exercises,target))
    }else{
        res.send({
            error: "malformatted parameters"
        })
    }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});