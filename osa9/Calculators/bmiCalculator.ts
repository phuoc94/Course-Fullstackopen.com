

export const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = (weight/(height*height))*10000
    const Categories: { [index: number]: string; } = {
        15: 'Very severely underweight',
        16: 'Severely underweight',
        18.5: 'Underweight',
        25: 'Normal (healthy weight)',
        30: 'Overweight',
        35: 'Obese Class I (Moderately obese)',
        40: 'Obese Class II (Severely obese)',
    }

    const keys: number[] = Object.keys(Categories).map(x => parseFloat(x)).sort()
    for (let y=0; y<keys.length; ++y) {
        if(bmi <= keys[y]){
            return Categories[keys[y]]
        }
    }
    if(bmi > 40){
        return 'Obese Class III (Very severely obese)'
    }
    return 'Error'
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
if(height && weight){
    console.log(calculateBmi(height, weight))
}else{
    console.log(calculateBmi(180, 74))
}