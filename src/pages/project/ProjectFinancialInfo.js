// style
import './ProjectFinancialInfo.css'

export default function ProjectFinancialInfo({stages}) {

  // const [calculatedamountArr, setCalculatedamountArr] = useState([])
  let calculatedamountArr = []
  let stilltoclaimArr = []
  let CurrentClaimArr = []

  // console.log(stages)

  function amountCalculator(){
    Object.entries(stages).map(([key, stage]) => (
      Object.entries(stage.tasks).map(([k, task]) => {
        // console.log(task.calculatedamount)
        calculatedamountArr.push(parseFloat(task.calculatedamount))
        stilltoclaimArr.push(parseFloat(task.stilltoclaim))

        Object.entries(task.claims).map(([k, claim]) => {
          // console.log("claim",k, claim)
          CurrentClaimArr.push(parseFloat(claim))
          return <></>
        })
        return <></>
      })
    ))
  }
  amountCalculator()

  // console.log(CurrentClaimArr)
  const totalExcGst = parseFloat(calculatedamountArr.reduce((a,b) => a+b, 0)).toFixed(2)
  const gst = parseFloat(totalExcGst*0.15).toFixed(2) // GST 15%
  const totalIncGst = parseFloat(totalExcGst*1.15).toFixed(2)
  
  const CurrentClaimExcGst = parseFloat(CurrentClaimArr.reduce((a,b) => a+b, 0)).toFixed(2)
  const costToCompletionExcGst = parseFloat(stilltoclaimArr.reduce((a,b) => a+b, 0)).toFixed(2)

  let stilltoclaim =  parseFloat(totalExcGst - (CurrentClaimExcGst + costToCompletionExcGst)).toFixed(2)

  

  return (
      <div className="project-financial-info">
          <div>
            <p><span>Total excluding GST: </span> $ {totalExcGst}</p>
            <p><span>GST: </span> $ {gst}</p>
            <p><span>Total including GST: </span> $ {totalIncGst}</p>
          </div>
          <div>
            <p><span>Payment Claim to Date excluding GST: </span> $ {(( !stilltoclaim) || !NaN ) ? 0 : stilltoclaim}</p>
            <p><span>Current Claim excluding GST: </span> $ {CurrentClaimExcGst}</p>
            <p><span>Cost to Completion excluding GST: </span>$ {costToCompletionExcGst}</p>
          </div> 
    </div>
  )
}
