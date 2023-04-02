import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
// import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

// styles
import './Create.css'
import Sidebar from '../../components/Sidebar'


export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { documents } = useCollection('projects')
  // const { user } = useAuthContext()

  // form field values
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [suburb, setSuburb] = useState('')
  const [city, setCity] = useState('')
  
  // const [financialSummary, setfinancialSummary] = useState([])
  const [projectList, setProjectList] = useState([])
  const [tempMain, setTempMain] = useState([])
  const [tempLabourList, setTempLabourList] = useState([])

  const [startDate, setStartDate] = useState('')
  const [GSTno, setGSTno] = useState('')
  const [subContractFee, setSubContractFee] = useState('')
  const [description, setDescription] = useState([])
  const [memberName, setMemberName ] = useState('') 
  const [memberRole, setMemberRole ] = useState('') 
  const [memberRate, setMemberRate ] = useState('') 
  const [teamList, setTeamList] = useState([])

  // console.log(teamList)

  const [formError, setFormError] = useState(null)

  console.log(startDate)
  useEffect(() => {
    if(documents){
      const options = documents.map(project => {
        return { value: {...project, id:project.id}, label: project.name}
      })
      setProjectList(options)
    }
  }, [documents])

  const handleTeamAdd = () => {
    const member = {name: memberName, role: memberRole, rate: memberRate}
    setTeamList([...teamList, member])
    setMemberName('')
    setMemberRole('') 
    setMemberRate('') 
  }

  const handleTeamRemove = (index) => {
    const list = [...teamList]
    list.splice(index, 1)
    setTeamList(list)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormError(null)
    if(!projectList){
      setFormError('Please select a task group')
      return
    }

    const address = {
        line1,
        line2,
        suburb,
        city,   
    }

    let project = {
      name,
      clientName,
      phone,
      email,
      address, 
      mainList: tempMain.value.mainList,
      labourList: tempLabourList.value.labourList,
      startDate: timestamp.fromDate(new Date(startDate)),
      GSTno,
      subContractFee,
      description,
      team: teamList,
    }

    project={
      "name":"Bannerman Road",
      "startDate":"16/02/2023",
      "GSTno":"133-514-384",
      "clientName":"Brad & Renai Hagstrom",
      "subContractFee":"0.1",
      "address":{
      "line1":"46 Bannerman rd",
      "suburb":"Western Springs ",
      "city":"Auckland"
      },
      "team":{
      "1":{
      "name":"Simon",
      "role":"Foreman",
      "rate":"70"
      },
      "2":{
      "name":"Troy",
      "role":"Builder 1",
      "rate":"70"
      },
      "3":{
      "name":"Cam",
      "role":"Builder 2",
      "rate":"70"
      },
      "4":{
      "name":"Isaac",
      "role":"Apprentice 1",
      "rate":"40"
      }
      },
      "mainList":{
      "1":{
      "Preliminary and General":{
      "1":{
      "code":"A-130",
      "task":"Programme",
      "details":"Preparing and Updating the programme",
      "subcontractedamount":"140",
      "calculatedamount":"154",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"154",
      "stilltoclaim":"154",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "2":{
      "code":"A-140",
      "task":"Insurances",
      "details":"Contract works and public liability",
      "subcontractedamount":"400",
      "calculatedamount":"440",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"440",
      "stilltoclaim":"440",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "3":{
      "code":"A-190",
      "task":"Surveying",
      "details":"Setting out the work to the correct lines and levels, with progressive checking for accuracy",
      "subcontractedamount":"2000",
      "calculatedamount":"2200",
      "subcontractor":"Fluker Surveyors",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"2200",
      "stilltoclaim":"2200",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "4":{
      "code":"A-230",
      "task":"Signage",
      "details":"On site signage requirments",
      "subcontractedamount":"120",
      "calculatedamount":"132",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"132",
      "stilltoclaim":"132",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "5":{
      "code":"A-240",
      "task":"Health and Safety",
      "details":"Protective clothing and equipment, General management of health and safety, First aid and site treatment facilities",
      "subcontractedamount":"300",
      "calculatedamount":"330",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"330",
      "stilltoclaim":"330",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "6":{
      "code":"A-260",
      "task":"Delivery Fees",
      "details":"Costs for delivery or courier of products and materials",
      "subcontractedamount":"576",
      "calculatedamount":"633.6",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"633.6",
      "stilltoclaim":"633.6",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "7":{
      "code":"A-280",
      "task":"Crane/ HIAB hire",
      "details":"Allowance of machine lifting",
      "subcontractedamount":"500",
      "calculatedamount":"550",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"550",
      "stilltoclaim":"550",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "8":{
      "code":"A-310",
      "task":"Onsite and Offsite Storage",
      "details":"Hireage for 20ft shipping container and site lock ups",
      "subcontractedamount":"195",
      "calculatedamount":"214.5",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"214.5",
      "stilltoclaim":"214.5",
      "complete":"",
      "status":"",
      "comment":"",
      "claims":{
      
      }
      },
      "9":{
      "code":"A-350",
      "task":"Rubbish Removal",
      "details":"Rubbish and waste handling on and off site, provision of facilities for storage, sorting, transport, recycling and disposal",
      "subcontractedamount":"2000",
      "calculatedamount":"2200",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"2200",
      "stilltoclaim":"2200",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "10":{
      "code":"A-360",
      "task":"Port-a-loo",
      "details":"On site toilet costs",
      "subcontractedamount":"750",
      "calculatedamount":"825",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"825",
      "stilltoclaim":"825",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "11":{
      "code":"A-370",
      "task":"Subscriptions",
      "details":"Subscriptions, Project management tools, Forman phone/ipad",
      "subcontractedamount":"200",
      "calculatedamount":"220",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"220",
      "stilltoclaim":"220",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "12":{
      "code":"A-380",
      "task":"Office Consumables/Printing",
      "details":"Stationary, office + Ammenities consumables as required",
      "subcontractedamount":"240",
      "calculatedamount":"264",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"264",
      "stilltoclaim":"264",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "2":{
      "Equipment & Machinery":{
      "13":{
      "code":"AA-100",
      "task":"Mobile Scaffold - 4.6x1.4x0.6",
      "details":"Hireage cost for equipment or machinery",
      "subcontractedamount":"1600",
      "calculatedamount":"1760",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"1760",
      "stilltoclaim":"1160",
      "complete":"0.340909090909091",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"600"
      }
      },
      "14":{
      "code":"AA-110",
      "task":"Work Bench",
      "details":"Hireage cost for equipment or machinery",
      "subcontractedamount":"400",
      "calculatedamount":"440",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"440",
      "stilltoclaim":"0",
      "complete":"1",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"440"
      }
      },
      "15":{
      "code":"AA-120",
      "task":"5m Alumium Plank",
      "details":"Hireage cost for equipment or machinery",
      "subcontractedamount":"400",
      "calculatedamount":"440",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"440",
      "stilltoclaim":"0",
      "complete":"1",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"440"
      }
      },
      "16":{
      "code":"AA-140",
      "task":"Submersible Pump",
      "details":"Hireage cost for equipment or machinery",
      "subcontractedamount":"200",
      "calculatedamount":"220",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"220",
      "stilltoclaim":"160",
      "complete":"0.272727272727273",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"60"
      }
      },
      "17":{
      "code":"AA-160",
      "task":"Site Shelter",
      "details":"Hireage cost for equipment or machinery",
      "subcontractedamount":"400",
      "calculatedamount":"440",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"440",
      "stilltoclaim":"0",
      "complete":"1",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"440"
      }
      },
      "18":{
      "code":"AA-180",
      "task":"Concrete Breaker",
      "details":"Hireage cost for equipment or machinery",
      "subcontractedamount":"120",
      "calculatedamount":"132",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"132",
      "stilltoclaim":"132",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "19":{
      "code":"AA-190",
      "task":"Plate Compactor",
      "details":"Hireage cost for equipment or machinery",
      "subcontractedamount":"200",
      "calculatedamount":"220",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"220",
      "stilltoclaim":"220",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "3":{
      "Site Works":{
      "20":{
      "code":"B-180",
      "task":"Tree and Vegetation removal",
      "details":"Clearing and disposing of green waste",
      "subcontractedamount":"600",
      "calculatedamount":"660",
      "subcontractor":"Reform Earthworks",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"660",
      "stilltoclaim":"0",
      "complete":"1",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"660"
      }
      },
      "21":{
      "code":"B-190",
      "task":"Temporary Roading/ Site Access",
      "details":"Costs associated with putting in a temporary metal road or similar",
      "subcontractedamount":"",
      "calculatedamount":"0",
      "subcontractor":"",
      "quote,estimateorprovision":"",
      "comments":"",
      "budgetamount":"0",
      "stilltoclaim":"0",
      "complete":"0",
      "status":"Closed",
      "comment":"",
      "claims":{
      
      }
      },
      "22":{
      "code":"B-200",
      "task":"Excavation",
      "details":"Excavating to required levels",
      "subcontractedamount":"0",
      "calculatedamount":"0",
      "subcontractor":"Narrellan Pools",
      "quote,estimateorprovision":" ",
      "comments":"",
      "budgetamount":"0",
      "stilltoclaim":"0",
      "complete":"0",
      "status":"Closed",
      "comment":"",
      "claims":{
      
      }
      },
      "23":{
      "code":"B-210",
      "task":"Trenching Services",
      "details":"Excavating service trenches and haunching with fines",
      "subcontractedamount":"1000",
      "calculatedamount":"1100",
      "subcontractor":"Reform Earthworks",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"1100",
      "stilltoclaim":"300",
      "complete":"0.727272727272727",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"800"
      }
      },
      "24":{
      "code":"B-260",
      "task":"Truck Hire",
      "details":"Hired vehicle for moving fill not associated with main excavation",
      "subcontractedamount":"600",
      "calculatedamount":"660",
      "subcontractor":"Reform Earthworks",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"660",
      "stilltoclaim":"660",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "4":{
      "Concrete Works":{
      "25":{
      "code":"C-150",
      "task":"Blocklaying",
      "details":"Cost of block laying sub-contractor",
      "subcontractedamount":"11663",
      "calculatedamount":"12829.3",
      "subcontractor":"West Auckland Brick & Block",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"12829.3",
      "stilltoclaim":"0",
      "complete":"1",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"12829.3"
      }
      },
      "26":{
      "code":"C-210",
      "task":"Concrete Supply, Place and Finish",
      "details":"Placement and finishing - Sub contractor",
      "subcontractedamount":"5986.15",
      "calculatedamount":"6584.765",
      "subcontractor":"West End Concrete",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"6584.765",
      "stilltoclaim":"-0.005",
      "complete":"1.00000075932854",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"6584.77"
      }
      }
      }
      },
      "5":{
      "Waterproofing":{
      "27":{
      "code":"D-120",
      "task":"TPO ",
      "details":"TPO supply and install",
      "subcontractedamount":"12690",
      "calculatedamount":"13959",
      "subcontractor":"Masterproof",
      "quote,estimateorprovision":"",
      "comments":"",
      "budgetamount":"13959",
      "stilltoclaim":"13959",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "28":{
      "code":"D-130",
      "task":"Mulseal",
      "details":"Supply and install of mulseal/ black seal or similar",
      "subcontractedamount":"250",
      "calculatedamount":"275",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"275",
      "stilltoclaim":"275",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "29":{
      "code":"D-140",
      "task":"Mapelastic smart",
      "details":"Supply and install of mapelastic smart waterproofing system",
      "subcontractedamount":"432",
      "calculatedamount":"475.2",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"475.2",
      "stilltoclaim":"475.2",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "6":{
      "Structural Steel & Flashings":{
      "30":{
      "code":"E-100",
      "task":"Structural Steel Supply",
      "details":"Fabrication, Supply of all structural steel ",
      "subcontractedamount":"2500",
      "calculatedamount":"2750",
      "subcontractor":"Impact Steel",
      "quote,estimateorprovision":"Estimate",
      "comments":"Preliminary Cost - To Be Updated",
      "budgetamount":"2750",
      "stilltoclaim":"2750",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "31":{
      "code":"E-119",
      "task":"Custom Roof Flashing",
      "details":"Supply and install of custom roof flashings",
      "subcontractedamount":"2500",
      "calculatedamount":"2750",
      "subcontractor":"Impact Steel",
      "quote,estimateorprovision":"Estimate",
      "comments":"Preliminary Cost - To Be Updated",
      "budgetamount":"2750",
      "stilltoclaim":"2750",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "32":{
      "code":"E-160",
      "task":"Rainheads",
      "details":"Custom Rain heads",
      "subcontractedamount":"400",
      "calculatedamount":"440",
      "subcontractor":"Impact Steel",
      "quote,estimateorprovision":"Estimate",
      "comments":"Preliminary Cost - To Be Updated",
      "budgetamount":"440",
      "stilltoclaim":"440",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "33":{
      "code":"E-180",
      "task":"Powder Coating",
      "details":"Transport and powder coating cost",
      "subcontractedamount":"2000",
      "calculatedamount":"2200",
      "subcontractor":"Impact Steel",
      "quote,estimateorprovision":"Estimate",
      "comments":"Preliminary Cost - To Be Updated",
      "budgetamount":"2200",
      "stilltoclaim":"2200",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "7":{
      "Roofing":{
      "34":{
      "code":"F-120",
      "task":"Downpipes",
      "details":"Supply and installation of downpipes  system",
      "subcontractedamount":"250",
      "calculatedamount":"275",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"275",
      "stilltoclaim":"275",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "8":{
      "Windows & Doors":{
      "35":{
      "code":"H-110",
      "task":"Aluminium Joinery Supply",
      "details":"Supply of aluminium joinery system",
      "subcontractedamount":"17847.5",
      "calculatedamount":"19096.825",
      "subcontractor":"Rylock",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"19096.825",
      "stilltoclaim":"19096.825",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "9":{
      "Plumbing & Drainage":{
      "36":{
      "code":"J-110",
      "task":"Plumbing General",
      "details":"Sub contractor for all first and Second fix plumbing systems ",
      "subcontractedamount":"10378.62",
      "calculatedamount":"11105.1234",
      "subcontractor":"Pinnacle Plumbing",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"11105.1234",
      "stilltoclaim":"11105.1234",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "37":{
      "code":"J-160",
      "task":"Fittings and Accessories",
      "details":"Selected fittings and accessories for plumbed areas",
      "subcontractedamount":"3500",
      "calculatedamount":"3745",
      "subcontractor":"",
      "quote,estimateorprovision":"Estimate",
      "comments":"For Consideration",
      "budgetamount":"3745",
      "stilltoclaim":"3745",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "38":{
      "code":"J-180",
      "task":"Drainlaying",
      "details":"Sub contractor for all first and Second fix Drainage systems",
      "subcontractedamount":"6000",
      "calculatedamount":"6420",
      "subcontractor":"DrainCo",
      "quote,estimateorprovision":"Estimate",
      "comments":"Preliminary Cost - To Be Updated",
      "budgetamount":"6420",
      "stilltoclaim":"6420",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "10":{
      "Electrical & Mechanical ":{
      "39":{
      "code":"K-100",
      "task":"Electrical ",
      "details":"Sub contractor for all first and second fix electrical systems ",
      "subcontractedamount":"10431.72",
      "calculatedamount":"11161.9404",
      "subcontractor":"Hoffmann Electrics",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"11161.9404",
      "stilltoclaim":"11161.9404",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "11":{
      "Insulation & Interior Linings":{
      "40":{
      "code":"L-160",
      "task":"Gib Stopping",
      "details":"Sub contractor for gib stopping",
      "subcontractedamount":"3207.6",
      "calculatedamount":"3432.132",
      "subcontractor":"Sevin Decorating",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"3432.132",
      "stilltoclaim":"3432.132",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "41":{
      "code":"L-200",
      "task":"VIlla and Soffit Joint Stopping",
      "details":"Subcontractor for stopping villa joints in tiled areas and soffit joints where required",
      "subcontractedamount":"500",
      "calculatedamount":"550",
      "subcontractor":"Sevin Decorating",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"550",
      "stilltoclaim":"550",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "12":{
      "Tiling":{
      "42":{
      "code":"P-110",
      "task":"Waterproofing",
      "details":"Supply and install waterproofing",
      "subcontractedamount":"1500",
      "calculatedamount":"1650",
      "subcontractor":"Cando Tiling",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"1650",
      "stilltoclaim":"1650",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "43":{
      "code":"P-120",
      "task":"Tile Supply",
      "details":"Supply and delivery of selected tiles",
      "subcontractedamount":"",
      "calculatedamount":"0",
      "subcontractor":"",
      "quote,estimateorprovision":"",
      "comments":"For Consideration",
      "budgetamount":"0",
      "stilltoclaim":"0",
      "complete":"0",
      "status":"Closed",
      "comment":"",
      "claims":{
      
      }
      },
      "44":{
      "code":"P-130",
      "task":"Tiling",
      "details":"Sub-contractor for tiling, grout and silicone ",
      "subcontractedamount":"2570",
      "calculatedamount":"2749.9",
      "subcontractor":"Cando Tiling",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"2749.9",
      "stilltoclaim":"2749.9",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "45":{
      "code":"P-140",
      "task":"Silicone Joints ",
      "details":"Provisional amount for specific silicone work",
      "subcontractedamount":"100",
      "calculatedamount":"110",
      "subcontractor":"Cando Tiling",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"110",
      "stilltoclaim":"110",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "13":{
      "Flooring":{
      "46":{
      "code":"Q-100",
      "task":"Timber flooring supply",
      "details":"Supply and deliver timber floor boards",
      "subcontractedamount":"",
      "calculatedamount":"0",
      "subcontractor":"",
      "quote,estimateorprovision":"",
      "comments":"",
      "budgetamount":"0",
      "stilltoclaim":"0",
      "complete":"0",
      "status":"Closed",
      "comment":"",
      "claims":{
      
      }
      },
      "47":{
      "code":"Q-110",
      "task":"Timber Flooring",
      "details":"Sub contractor to install timber floor boards",
      "subcontractedamount":"4000",
      "calculatedamount":"4400",
      "subcontractor":"Cando Flooring",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"4400",
      "stilltoclaim":"4400",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "48":{
      "code":"Q-130",
      "task":"Grinding & Leveling ",
      "details":"Provision for floor level prior to install",
      "subcontractedamount":"1000",
      "calculatedamount":"1100",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"1100",
      "stilltoclaim":"1100",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "14":{
      "Painting & Decorating":{
      "49":{
      "code":"R-110",
      "task":"Interior Painting",
      "details":"Sub contractor for all internal prep and painting ",
      "subcontractedamount":"5394",
      "calculatedamount":"5771.58",
      "subcontractor":"Sevin Decorating",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"5771.58",
      "stilltoclaim":"5771.58",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "50":{
      "code":"R-120",
      "task":"Exterior Painting",
      "details":"Sub contractor for all exterior prep and painting",
      "subcontractedamount":"6918",
      "calculatedamount":"7402.26",
      "subcontractor":"Sevin Decorating",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"7402.26",
      "stilltoclaim":"7402.26",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      },
      "51":{
      "code":"R-130",
      "task":"Painting Touch-ups ",
      "details":"Provision for touch-ups",
      "subcontractedamount":"400",
      "calculatedamount":"440",
      "subcontractor":"Sevin Decorating",
      "quote,estimateorprovision":"Provision",
      "comments":"",
      "budgetamount":"440",
      "stilltoclaim":"440",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "15":{
      "Glazing":{
      "52":{
      "code":"S-110",
      "task":"Shower Glass",
      "details":"Supply and install of shower glass",
      "subcontractedamount":"1795.83",
      "calculatedamount":"1975.413",
      "subcontractor":"360 Glass",
      "quote,estimateorprovision":"Quote",
      "comments":"",
      "budgetamount":"1975.413",
      "stilltoclaim":"1975.413",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      
      }
      }
      }
      },
      "16":{
      "Materials":{
      "53":{
      "code":" ",
      "task":"Total Materials before Variation",
      "details":" As per Placemakers take-off + allowance for general wasteage and consumables",
      "subcontractedamount":"33380",
      "calculatedamount":"36718",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"36718",
      "stilltoclaim":"36718",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"0"
      }
      }
      }
      },
      "Labour":{
      "54":{
      "code":"W-100",
      "task":"Labour",
      "details":"Labour total as per provided Labour List",
      "subcontractedamount":"",
      "calculatedamount":"85690",
      "subcontractor":"KPC",
      "quote,estimateorprovision":"Estimate",
      "comments":"",
      "budgetamount":"85690",
      "stilltoclaim":"85690",
      "complete":"0",
      "status":"Open",
      "comment":"",
      "claims":{
      "claim1":"0",
      "claim2":"0",
      "claim3":"0",
      "claim4":"0",
      "claim5":"0"
      }
      }
      }
      },
      "labourList":{
      "1":{
      "GENERAL":{
      "1":{
      "name":"PROJECT ADMIN./ MEETINGS/ ORDERING MATERIALS/ DRAWING DETAILS ETC..",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "2":{
      "name":"WORK WITH & ATTENDANCE OF SUB-TRADES & SITE MANAGEMENT",
      "hoursPredicted":{
      "Foreman":"2",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "3":{
      "name":"CHECK EXTERIOR JOINERY SHOP DRAWINGS",
      "hoursPredicted":{
      "Foreman":"0.25",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "4":{
      "name":"TILE SET OUTS ",
      "hoursPredicted":{
      "Foreman":"0.25",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "5":{
      "name":"COUNCIL MEETINGS AND INSPECTIONS",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "6":{
      "name":"SITE SET UP & SAFETY",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "7":{
      "name":"DEMOLITION / SALVAGE WORKS",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "8":{
      "name":"COVER AND PROTECT EXISTING HOUSE",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"0.5",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "9":{
      "name":"PROFILE AND SETOUT ",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      }
      }
      },
      "2":{
      "SITE & CONCRETE WORKS":{
      "10":{
      "name":"EXCAVATION WORKS",
      "hoursPredicted":{
      "Foreman":"1.5",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1.5"
      }
      },
      "11":{
      "name":"FOOTING REO",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "12":{
      "name":"SET FOOTIING SHS",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":" ",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "13":{
      "name":"POUR AND PLACE FOOTINGS",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "14":{
      "name":"PLACE AND COMPACT HARDFILL/DRAINAGE METAL",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "15":{
      "name":"BOX SLAB",
      "hoursPredicted":{
      "Foreman":"2",
      "Builder 1":"2",
      "Builder 2":"",
      "Apprentice 1":"2"
      }
      },
      "16":{
      "name":"LAY DPM",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":" ",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "17":{
      "name":"LAY POLYSTYRENE PODS",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":" ",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "18":{
      "name":"INSTALL REO",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "19":{
      "name":"BOX REBATES",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"0.5",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "20":{
      "name":"POUR AND CURE SLAB",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "21":{
      "name":"STRIP BOXING, CLEAN CONCRETE",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"",
      "Builder 2":" ",
      "Apprentice 1":"0.5"
      }
      }
      }
      },
      "3":{
      "1ST FIX CARPENTRY WORKS START":{
      "22":{
      "name":"EXTERIOR WALL FRAMING",
      "hoursPredicted":{
      "Foreman":"2",
      "Builder 1":"2",
      "Builder 2":"",
      "Apprentice 1":"2"
      }
      },
      "23":{
      "name":"GENERAL FRAMING                                 ",
      "hoursPredicted":{
      "Foreman":"1.5",
      "Builder 1":"1.5",
      "Builder 2":" ",
      "Apprentice 1":"1.5"
      }
      },
      "24":{
      "name":"INSTALL PFC BEAMS",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "25":{
      "name":"WALL AND BEAM HARDWARE",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "26":{
      "name":"PACK BEAMS",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "27":{
      "name":"INSTALLING RAFTERS AND NOGS",
      "hoursPredicted":{
      "Foreman":"3",
      "Builder 1":"3",
      "Builder 2":" ",
      "Apprentice 1":"3"
      }
      },
      "28":{
      "name":"PARAPET FRAMING",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "29":{
      "name":"INSTALL FURRINGS ",
      "hoursPredicted":{
      "Foreman":"2",
      "Builder 1":"2",
      "Builder 2":"",
      "Apprentice 1":"2"
      }
      },
      "30":{
      "name":"FRAME GUTTER",
      "hoursPredicted":{
      "Foreman":"0",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "31":{
      "name":"INSTALL ROOF PLY",
      "hoursPredicted":{
      "Foreman":"1.5",
      "Builder 1":"1.5",
      "Builder 2":"",
      "Apprentice 1":"1.5"
      }
      },
      "32":{
      "name":"WRAP WALLS & TAPE ALL OPENINGS ",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":" ",
      "Apprentice 1":"1"
      }
      },
      "33":{
      "name":"INSTALL ALUMINIUM JOINERY",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"2",
      "Builder 2":"",
      "Apprentice 1":"2"
      }
      },
      "34":{
      "name":"INSTALL CAVITY SYSTEM",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "35":{
      "name":"INSTALL WEATHERBOARD SYSTEM",
      "hoursPredicted":{
      "Foreman":"2",
      "Builder 1":"3",
      "Builder 2":"",
      "Apprentice 1":"3"
      }
      },
      "36":{
      "name":"INSTALL JAMES HARDIES EASY LAP SYSTEM",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "37":{
      "name":"FRAME AND LINE SOFFIT",
      "hoursPredicted":{
      "Foreman":"1.5",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1.5"
      }
      },
      "38":{
      "name":"INTERIOR SETOUT",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "39":{
      "name":"FRAME INTERNAL WALLS",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "40":{
      "name":"INSTALL INTERIOR DOORS",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "41":{
      "name":"EXTERIOR FINISHING",
      "hoursPredicted":{
      "Foreman":"1.5",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "42":{
      "name":"INSULATE WALLS AND CEILING",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "43":{
      "name":"INSTALL WALL HARDWARE",
      "hoursPredicted":{
      "Foreman":"",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "44":{
      "name":"BUZZ & STRAIGHTEN INTERNAL WALLS ",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":" "
      }
      },
      "45":{
      "name":"INSTALL GIB",
      "hoursPredicted":{
      "Foreman":"2",
      "Builder 1":"2",
      "Builder 2":"",
      "Apprentice 1":"2"
      }
      }
      }
      },
      "4":{
      "2ND FIX CARPENTRY WORKS START":{
      "46":{
      "name":"FINISHING LINES & DETAILING",
      "hoursPredicted":{
      "Foreman":"3",
      "Builder 1":"3",
      "Builder 2":" ",
      "Apprentice 1":"3"
      }
      },
      "47":{
      "name":"INSTALL BATHROOM FIXTURES",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      },
      "48":{
      "name":"FINAL DETAILING",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"1",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      }
      }
      },
      "5":{
      "LANDSCAPE WORKS":{
      
      }
      },
      "6":{
      "MISC. WORKS":{
      "49":{
      "name":"SET UP TEMPORARY ACCESS & SCAFFOLD SYSTEMS",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":" ",
      "Apprentice 1":"1"
      }
      },
      "50":{
      "name":"TEMP. COVER & PROTECT FLOOR SURFACES",
      "hoursPredicted":{
      "Foreman":"",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "51":{
      "name":"WATERBLASTING DRIVE & ROAD",
      "hoursPredicted":{
      "Foreman":"",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "52":{
      "name":"FINAL SITE CLEAN",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "53":{
      "name":"DELIVERIES, UNLOADING, MOVING & STACKING MATERIALS AROUND SITE",
      "hoursPredicted":{
      "Foreman":"1",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":"1"
      }
      },
      "54":{
      "name":"TOOL & PLANT MAINTENANCE",
      "hoursPredicted":{
      "Foreman":"",
      "Builder 1":"0.5",
      "Builder 2":"",
      "Apprentice 1":"0.5"
      }
      },
      "55":{
      "name":"PERFECTING DETAILS",
      "hoursPredicted":{
      "Foreman":"0.5",
      "Builder 1":"",
      "Builder 2":"",
      "Apprentice 1":""
      }
      }
      }
      }
      }
      }

    await addDocument(project)

    if (!response.error) {
      history.push('/')
    }
  }


  return (
    <div className='page-container'>
    <Sidebar />
    <div className='content-container'>
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <h3>Client details</h3>
        <label>
          <span>Client:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setClientName(e.target.value)}
            value={clientName}
          />
        </label>
        <label>
          <span>Phone:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            required 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Address:</span>
          <p>Line 1</p>
          <input
            required 
            type="text" 
            onChange={(e) => setLine1(e.target.value)}
            value={line1}
          />
          <p>Line 2</p>
          <input
            type="text" 
            onChange={(e) => setLine2(e.target.value)}
            value={line2}
          />
          <p>Suburb</p>
          <input
            required 
            type="text" 
            onChange={(e) => setSuburb(e.target.value)}
            value={suburb}
          />
          <p>City</p>
          <input
            required 
            type="text" 
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </label>

        <label>
        <h3>Main List</h3>
          <span>Main List Template:</span>
            <Select
              onChange={(option) => setTempMain(option)}
              options={projectList}
            />
        </label>
        
        
        <label>
        <h3>Labour List</h3>
        <span>Labour List Template:</span>
          <Select
            onChange={(option) => setTempLabourList(option)}
            options={projectList}
          />
          <br />
          {/* <input
            type="number" 
            onChange={(e) => setName(e.target.value)}
            value={address}
          /> */}
        </label>


        <h3>Project Details</h3>
        <label>
          <span>Start date:</span>
            <input
              required 
              type="date" 
              onChange={(e) => setStartDate(e.target.value)} 
              value={startDate}
            />
        </label>
        <label>
          <span>GST No:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setGSTno(e.target.value)}
            value={GSTno}
          />
        </label>
        <label>
          <span>Sub Contract Fee:</span>
          <input
            required 
            type="number" 
            onChange={(e) => setSubContractFee(e.target.value)}
            value={subContractFee}
          />
        </label>

        <label>
          <span>Project Description:</span>
          <textarea 
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description} 
          ></textarea>
        </label>

        <div>
          <h3>Assign Staff Members</h3>
            {teamList.map((singleStaff, index) => (
                <div key={index}>
                  <div>
                    <span>Staff {index + 1}:</span>
                    <p><span>Staff Name: </span> {singleStaff.name}</p>
                    <p><span>Role: </span> {singleStaff.role}</p>
                    <p><span>Rate: </span> {singleStaff.rate}</p>            
                  </div>
                  <button 
                      type="button" 
                      className="btn"
                      onClick={() => handleTeamRemove(index)}
                    >
                    Remove
                  </button>
                </div>
              ))}
        </div>

        <form>
          <label>
            <div>
                <span>New Staff:</span>
                <p>Staff Name</p>
                <input 
                  name="name" 
                  type="text" 
                  id="name" 
                  required
                  value={memberName}
                  
                  onChange = {(e) => setMemberName(e.target.value)}
                />
                <p>Role</p>
                <input 
                  name="role" 
                  type="text" 
                  id="role" 
                  required
                  value={memberRole}
                  onChange = {(e) => setMemberRole(e.target.value)}
                />
                <p>Rate</p>
                <input 
                  name="rate" 
                  type="text" 
                  id="rate" 
                  required
                  value={memberRate}
                  onChange = {(e) => setMemberRate(e.target.value)}
                />
                <button className="btn" onClick={handleTeamAdd}>Add Staff</button>                     
              </div>
          </label>
        </form>


        {/* <label>
          <span>Staff 1:</span>
          <p>Name</p>
          <input
            type="text" 
            onChange={(e) => setStaffName(e.target.value)}
            value={staffName}
          />
          <p>Role</p>
          <Select
            onChange={(option) => setStaffRole(option)}
            options={staffRoleOption}
          />
          <p>Rate</p>
          <input
            type="number" 
            onChange={(e) => setStaffRate(e.target.value)}
            value={staffRate}
          />
        </label> */}
        
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
    </div>
    </div>
  )
}