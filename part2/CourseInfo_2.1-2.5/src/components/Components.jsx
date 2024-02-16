
const Header = (props) => {
    return <h1>{props.course}</h1>
}
    
const Total = (props) => {
    return <b>Total number of exercises {props.sumOfExercises}</b>
}

    
const Part = (props) => {
    return (<p>{props.part} {props.exercises}</p>)
}
    
const Content = (props) => {
    return (
    <div>
        {props.part.map( (item) => {
            return  <Part key={item.id} part={item.name} exercises={item.exercises}/>
        })}
    </div>
    )
}

const Course = (props) => {
return (<div>
            {props.course.map((courseItem,index)=>{
                const getSum = courseItem.parts.reduce((a,cv) => a+cv.exercises,0);
                return(
                    <div key={courseItem.id}>
                        <Header key={courseItem.id} course={courseItem.name} />
                        <Content key={courseItem.parts.id} part={courseItem.parts} />
                        <Total sumOfExercises={getSum} />
                    </div>
                )
            })
            }
        </div>
)
}

export default Course