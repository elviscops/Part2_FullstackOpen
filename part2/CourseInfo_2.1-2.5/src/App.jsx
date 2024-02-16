const getSumOfExercises = (props) => {
    let sum = 0;
    {props.parts.map( (item) => {
        sum += item.exercises
     })}
    return sum
}



const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Total = (props) => {
    return <b>Total number of exercises {props.sumOfExercises}</b>
  }

  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
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
    const fullCourse = props.course;


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
    
  
const App = () => {
    const course = [{
        id: 11,
        name: 'Half Stack application development',
        parts: [
            {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
            },
            {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
            },
            {
            name: 'State of a component',
            exercises: 14,
            id: 3
            },
            {
            name: 'Practice keeping the the console open all the times',
            exercises: 10000,
            id: 4
            },
            {
            name: 'Test',
            exercises: 99,
            id: 5
            }
        ]
        },
        {
        name: 'Node.js',
        id: 22,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
        }
  ]

   //const getSum = props.parts.reduce((a,cv) => a+cv.exercises,0);


return (
      <div>
        <Course course={course}/>
        {/* <Total sumOfExercises={getSum} /> */}
      </div>
    )
  }
  
  export default App