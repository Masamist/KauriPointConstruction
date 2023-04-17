// style
import { calculateProjectProgress } from '../../components/ProgressBar'
import './ProjectFinancialInfo.css'

export default function ProjectFinancialInfo({project}) {

  const financialInfo = calculateProjectProgress(project)

  const totalExcGst = financialInfo.totalCost
  const totalClaimed = financialInfo.totalClaimed
  const gst = totalExcGst * 0.15 // GST 15%
  const totalIncGst = totalExcGst * 1.15
  const stilltoclaim = totalIncGst - totalClaimed


  return (
      <div className="project-financial-info">
        <div>
          <FinancialData label='Total excluding GST' 
                          value={numberWithCommas(totalExcGst)} />
          <FinancialData label='GST' 
                          value={numberWithCommas(gst)} />
          <FinancialData label='Total including GST' 
                          value={numberWithCommas(totalIncGst)} />
        </div>
        <div>
          <FinancialData label='Payment Claim to Date' 
                          value={numberWithCommas(totalClaimed)} />
          <FinancialData label='Cost to Completion' 
                          value={numberWithCommas(stilltoclaim)} />
        </div>
        
          
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

function numberWithCommas(x) {
  x = x.toFixed(2);
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = '$' + x.replace(pattern, "$1,$2");
  return x;
}