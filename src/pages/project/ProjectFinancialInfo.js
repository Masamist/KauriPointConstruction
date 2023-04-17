// style
import './ProjectFinancialInfo.css'

export default function ProjectFinancialInfo({stages}) {

  // const [calculatedamountArr, setCalculatedamountArr] = useState([])
  let calculatedamountArr = []
  let stilltoclaimArr = []
  let CurrentClaimArr = []

  // console.log(stages)

  // function amountCalculator(){
  //   Object.entries(stages).map(([key, stage]) => (
  //     Object.entries(stage.tasks).map(([k, task]) => {
  //       // console.log(task.calculatedamount)
  //       calculatedamountArr.push(parseFloat((task.calculatedamount || task.calculatedamount !== '' ) ? task.calculatedamount : 0))
  //       stilltoclaimArr.push(parseFloat((task.stilltoclaim || task.stilltoclaim !== '' ) ? task.calculatedamount : 0))

  //       (task.claims? Object.entries(task.claims).map(([k, claim]) => {
  //         // console.log("claim",k, claim)
  //         CurrentClaimArr.push(parseFloat(claim ? claim : 0))
  //         return <></>
  //       }) : <span>No claim has created</span>)
  //       return <></>
  //     })
  //   ))
  // }
  // amountCalculator()

  // console.log(CurrentClaimArr)
  const totalExcGst = parseFloat(calculatedamountArr.reduce((a,b) => a+b, 0)).toFixed(2)
  const gst = parseFloat(totalExcGst*0.15).toFixed(2) // GST 15%
  const totalIncGst = parseFloat(totalExcGst*1.15).toFixed(2)
  
  const CurrentClaimExcGst = parseFloat(CurrentClaimArr.reduce((a,b) => a+b, 0)).toFixed(2)
  const costToCompletionExcGst = parseFloat(stilltoclaimArr.reduce((a,b) => a+b, 0)).toFixed(2)

  let stilltoclaim =  parseFloat(totalExcGst - (CurrentClaimExcGst + costToCompletionExcGst)).toFixed(2)

  

  return (
      <div className="project-financial-info">
          <FinancialData label='Total excluding GST' 
                          value={totalExcGst} />
          <FinancialData label='GST' 
                          value={gst} />
          <FinancialData label='Total including GST' 
                          value={totalIncGst} />
          <FinancialData label='Payment Claim to Date excluding GST' 
                          value={((!stilltoclaim) || !NaN ) ? 0 : stilltoclaim} />
          <FinancialData label='Current Claim excluding GST' 
                          value={CurrentClaimExcGst} />
          <FinancialData label='Cost to Completion excluding GST' 
                          value={costToCompletionExcGst} />
    </div>
  )
}


function FinancialData({label, value}) {
  return (
    <div className='financialData'>
      <span className='financialData-label'>{label}: </span>
      <span className='financialData-value'>{value}</span>
    </div>
  )
}