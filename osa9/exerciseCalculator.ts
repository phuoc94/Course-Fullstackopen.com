interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
type rating = 1 | 2 | 3

const calculateExercises = (list: number[], target: number): Result => {
    const sum: number = list.reduce(
        (sum, h) => sum + h,0
    )
    const average: number = sum/list.length
    const ratingDescription: { [key: number]: string } = {
        1: 'very bad',
        2: 'not too bad but could be better',
        3: 'good job',
    }

    const rating = (): rating => {
        const ndRating = target * 0.6 // 60% of target
        if(average >= target){
            return 3
        }else if(average >= ndRating){
            return 2
        }else{
            return 1
        }
    }

    return { 
        periodLength: list.length,
        trainingDays: list.filter(h => h > 0).length,
        success: rating() === 3,
        rating: rating(),
        ratingDescription: ratingDescription[rating()],
        target: target,
        average: average
    }
}

const target: number = parseFloat(process.argv[2])
const list: number[] = process.argv.splice(3, process.argv.length).map(x => parseFloat(x))

if(list){
    console.log(calculateExercises(list, target))
}else{
    console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))
}