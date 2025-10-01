import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const countries = [
  { code: "NL", city: ["Amsterdam","Rotterdam","Utrecht","Eindhoven","The Hague"], currency: "EUR" },
  { code: "DE", city: ["Berlin","Munich","Hamburg","Frankfurt","Cologne"], currency: "EUR" },
  { code: "PL", city: ["Warsaw","Krakow","Wroclaw","Gdansk","Poznan"], currency: "PLN" },
  { code: "FR", city: ["Paris","Lyon","Marseille","Toulouse","Nice"], currency: "EUR" },
  { code: "ES", city: ["Madrid","Barcelona","Valencia","Seville","Bilbao"], currency: "EUR" },
  { code: "IT", city: ["Milan","Rome","Naples","Turin","Florence"], currency: "EUR" },
  { code: "SE", city: ["Stockholm","Gothenburg","Malmo","Uppsala"], currency: "SEK" },
  { code: "NO", city: ["Oslo","Bergen","Trondheim","Stavanger"], currency: "NOK" },
  { code: "FI", city: ["Helsinki","Tampere","Turku","Oulu"], currency: "EUR" },
  { code: "DK", city: ["Copenhagen","Aarhus","Odense","Aalborg"], currency: "DKK" },
  { code: "UK", city: ["London","Manchester","Birmingham","Leeds","Edinburgh"], currency: "GBP" },
  { code: "IE", city: ["Dublin","Cork","Galway","Limerick"], currency: "EUR" },
];

const sectors = [
  {
    title: ["Frontend Developer","Backend Developer","Fullstack Engineer","Data Scientist","AI Engineer","DevOps Engineer","Mobile Developer","Cloud Architect"],
    skills: ["React","TypeScript","Node.js","SQL","Python","AWS","Docker","Kubernetes","Vue.js","Angular"],
    min: 40000, max: 90000,
    weight: 30 // 30% of jobs
  },
  {
    title: ["Financial Analyst","Accountant","Investment Associate","Risk Manager","Treasury Analyst","Compliance Officer"],
    skills: ["Excel","Finance","SQL","SAP","Risk Management","Accounting","CFA","FRM"],
    min: 35000, max: 75000,
    weight: 15
  },
  {
    title: ["Nurse","Healthcare Assistant","Medical Analyst","Clinical Researcher","Healthcare Administrator","Medical Technologist"],
    skills: ["Patient Care","Medical Records","Lab Analysis","Healthcare IT","Clinical Research","HIPAA"],
    min: 30000, max: 60000,
    weight: 12
  },
  {
    title: ["Logistics Coordinator","Supply Chain Analyst","Warehouse Manager","Operations Manager","Procurement Specialist"],
    skills: ["Logistics","SAP","Scheduling","Inventory Management","Supply Chain","ERP"],
    min: 28000, max: 55000,
    weight: 10
  },
  {
    title: ["Marketing Manager","SEO Specialist","Content Creator","Digital Marketing Specialist","Brand Manager","Social Media Manager"],
    skills: ["SEO","Google Ads","Copywriting","Analytics","Social Media","Content Marketing"],
    min: 32000, max: 70000,
    weight: 15
  },
  {
    title: ["Legal Assistant","Compliance Officer","Paralegal","Contract Manager","Legal Counsel"],
    skills: ["Contracts","GDPR","Compliance","Legal Research","Corporate Law","Regulatory"],
    min: 35000, max: 80000,
    weight: 8
  },
  {
    title: ["Manufacturing Engineer","Quality Assurance","Production Manager","Process Engineer","Operations Analyst"],
    skills: ["Manufacturing","Quality Control","Lean Six Sigma","Process Improvement","ISO","Safety"],
    min: 32000, max: 65000,
    weight: 10
  }
];

const companySuffixes = [
  "Group", "Systems", "Solutions", "Technologies", "Consulting", "Partners", 
  "Labs", "Innovations", "Digital", "Global", "Europe", "International",
  "Ventures", "Capital", "Holdings", "Enterprises", "Corp", "Ltd"
];

const companyPrefixes = [
  "EuroTech", "SkyNetics", "Polaris", "Nexus", "Quantum", "Vertex", "Apex",
  "Zenith", "Phoenix", "Catalyst", "Momentum", "Velocity", "Synergy",
  "Fusion", "Dynamic", "Proactive", "Strategic", "Innovative", "Advanced"
];

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getWeightedSector(): typeof sectors[0] {
  const totalWeight = sectors.reduce((sum, sector) => sum + sector.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const sector of sectors) {
    random -= sector.weight;
    if (random <= 0) {
      return sector;
    }
  }
  
  return sectors[0]; // fallback
}

function fakeJob() {
  const sector = getWeightedSector();
  const country = randomChoice(countries);
  const city = randomChoice(country.city);
  const title = randomChoice(sector.title);
  
  // Generate realistic company name
  const prefix = randomChoice(companyPrefixes);
  const suffix = randomChoice(companySuffixes);
  const company = `${prefix} ${suffix}`;

  const salaryMin = sector.min + randomInt(0, 5000);
  const salaryMax = salaryMin + randomInt(5000, 20000);

  // Generate skills (3-6 skills per job)
  const numSkills = randomInt(3, 6);
  const jobSkills: string[] = [];
  for (let i = 0; i < numSkills; i++) {
    const skill = randomChoice(sector.skills);
    if (!jobSkills.includes(skill)) {
      jobSkills.push(skill);
    }
  }

  // Generate contract type with realistic distribution
  const contractWeights = [
    { type: "full-time", weight: 60 },
    { type: "part-time", weight: 15 },
    { type: "contract", weight: 15 },
    { type: "freelance", weight: 8 },
    { type: "internship", weight: 2 }
  ];
  
  let contractRandom = Math.random() * 100;
  let contractType = "full-time";
  for (const contract of contractWeights) {
    contractRandom -= contract.weight;
    if (contractRandom <= 0) {
      contractType = contract.type;
      break;
    }
  }

  // Generate realistic job descriptions
  const whatWeWant = [
    `Experience with ${randomChoice(sector.skills)}`,
    "Team collaboration and communication skills",
    "Ability to deliver on deadlines",
    "Problem-solving and analytical thinking",
    "Adaptability in a fast-paced environment"
  ].slice(0, randomInt(3, 5));

  const whatWeOffer = [
    "Competitive salary and benefits package",
    "Hybrid/remote work options",
    "Training and professional development opportunities",
    "Flexible working hours",
    "Modern office environment",
    "Health and wellness programs"
  ].slice(0, randomInt(3, 5));

  return {
    title,
    company,
    location: `${city}, ${country.code}`,
    salary_min: salaryMin,
    salary_max: salaryMax,
    currency: country.currency,
    skills: jobSkills,
    contract_type: contractType,
    description: {
      what_we_want: whatWeWant,
      what_we_offer: whatWeOffer,
    },
    benefits: [
      "Health Insurance",
      "Remote Work Budget", 
      "Learning Stipend",
      "Flexible Hours",
      "Team Events"
    ].slice(0, randomInt(2, 4)),
    is_demo: true,
  };
}

async function main() {
  console.log("🌍 Seeding 2000 dummy jobs...");
  
  const batchSize = 100;
  const totalJobs = 2000;
  
  for (let i = 0; i < totalJobs; i += batchSize) {
    const jobs = [];
    const currentBatchSize = Math.min(batchSize, totalJobs - i);
    
    for (let j = 0; j < currentBatchSize; j++) {
      jobs.push(fakeJob());
    }
    
    const { error } = await supabase.from("jobs").insert(jobs);
    
    if (error) {
      console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error);
    } else {
      console.log(`✅ Inserted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(totalJobs/batchSize)} (${i + currentBatchSize}/${totalJobs} jobs)`);
    }
    
    // Small delay to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log("🎉 Done seeding 2000 dummy jobs!");
  
  // Show some statistics
  const { data: stats } = await supabase
    .from("jobs")
    .select("contract_type, currency")
    .eq("is_demo", true);
    
  if (stats) {
    const contractStats = stats.reduce((acc, job) => {
      acc[job.contract_type] = (acc[job.contract_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const currencyStats = stats.reduce((acc, job) => {
      acc[job.currency] = (acc[job.currency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log("\n📊 Job Distribution:");
    console.log("Contract Types:", contractStats);
    console.log("Currencies:", currencyStats);
  }
}

main().catch(console.error);




