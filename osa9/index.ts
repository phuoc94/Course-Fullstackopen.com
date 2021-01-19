import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express();

app.get('/bmi', (_req, res) => {
    if(_req.query.height && _req.query.weight){
        const weight: number = parseFloat(_req.query.weight as string)
        const height: number =  parseFloat(_req.query.height as string)
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});