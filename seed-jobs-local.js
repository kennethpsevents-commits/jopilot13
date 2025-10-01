#!/usr/bin/env node

// Local seed script that creates dummy jobs data
// This works without Supabase connection

const jobs = [
  // Tech Jobs
  { title: "Senior Frontend Developer", company: "TechCorp", location: "Amsterdam", salary_min: 65000, salary_max: 85000, skills: ["React", "TypeScript", "Next.js"], contract_type: "full-time" },
  { title: "Backend Engineer", company: "DataFlow", location: "Utrecht", salary_min: 70000, salary_max: 90000, skills: ["Node.js", "Python", "PostgreSQL"], contract_type: "full-time" },
  { title: "Full Stack Developer", company: "StartupXYZ", location: "Rotterdam", salary_min: 55000, salary_max: 75000, skills: ["React", "Node.js", "MongoDB"], contract_type: "full-time" },
  { title: "DevOps Engineer", company: "CloudTech", location: "Den Haag", salary_min: 80000, salary_max: 100000, skills: ["AWS", "Docker", "Kubernetes"], contract_type: "full-time" },
  { title: "Data Scientist", company: "AI Solutions", location: "Eindhoven", salary_min: 75000, salary_max: 95000, skills: ["Python", "Machine Learning", "TensorFlow"], contract_type: "full-time" },
  { title: "UX Designer", company: "DesignStudio", location: "Amsterdam", salary_min: 60000, salary_max: 80000, skills: ["Figma", "User Research", "Prototyping"], contract_type: "full-time" },
  { title: "Product Manager", company: "InnovateCo", location: "Utrecht", salary_min: 85000, salary_max: 110000, skills: ["Agile", "Product Strategy", "Analytics"], contract_type: "full-time" },
  { title: "Mobile Developer", company: "AppWorks", location: "Rotterdam", salary_min: 60000, salary_max: 80000, skills: ["React Native", "iOS", "Android"], contract_type: "full-time" },
  { title: "Cloud Architect", company: "InfraTech", location: "Amsterdam", salary_min: 90000, salary_max: 120000, skills: ["AWS", "Azure", "Microservices"], contract_type: "full-time" },
  { title: "QA Engineer", company: "QualityFirst", location: "Den Haag", salary_min: 50000, salary_max: 70000, skills: ["Testing", "Automation", "Selenium"], contract_type: "full-time" },
  
  // Marketing & Sales
  { title: "Digital Marketing Manager", company: "GrowthCo", location: "Amsterdam", salary_min: 55000, salary_max: 75000, skills: ["SEO", "Google Ads", "Analytics"], contract_type: "full-time" },
  { title: "Sales Manager", company: "SalesPro", location: "Utrecht", salary_min: 60000, salary_max: 80000, skills: ["B2B Sales", "CRM", "Lead Generation"], contract_type: "full-time" },
  { title: "Content Marketing Specialist", company: "ContentLab", location: "Rotterdam", salary_min: 45000, salary_max: 65000, skills: ["Content Strategy", "SEO", "Social Media"], contract_type: "full-time" },
  { title: "Brand Manager", company: "BrandStudio", location: "Amsterdam", salary_min: 65000, salary_max: 85000, skills: ["Brand Strategy", "Marketing", "Campaign Management"], contract_type: "full-time" },
  
  // Finance & Business
  { title: "Financial Analyst", company: "FinanceCorp", location: "Amsterdam", salary_min: 60000, salary_max: 80000, skills: ["Financial Modeling", "Excel", "Analysis"], contract_type: "full-time" },
  { title: "Business Analyst", company: "BusinessTech", location: "Utrecht", salary_min: 55000, salary_max: 75000, skills: ["Requirements", "Process Improvement", "Data Analysis"], contract_type: "full-time" },
  { title: "Account Manager", company: "ClientFirst", location: "Rotterdam", salary_min: 50000, salary_max: 70000, skills: ["Client Relations", "Account Management", "Sales"], contract_type: "full-time" },
  
  // Remote Jobs
  { title: "Remote Frontend Developer", company: "RemoteTech", location: "Remote", salary_min: 60000, salary_max: 80000, skills: ["React", "Vue.js", "Remote Work"], contract_type: "full-time" },
  { title: "Remote Data Engineer", company: "DataRemote", location: "Remote", salary_min: 70000, salary_max: 90000, skills: ["Python", "SQL", "Data Pipeline"], contract_type: "full-time" },
  { title: "Remote UX Designer", company: "DesignRemote", location: "Remote", salary_min: 55000, salary_max: 75000, skills: ["Figma", "User Research", "Remote Collaboration"], contract_type: "full-time" },
  
  // Part-time & Contract
  { title: "Part-time Developer", company: "FlexTech", location: "Amsterdam", salary_min: 30000, salary_max: 40000, skills: ["JavaScript", "Part-time", "Flexible"], contract_type: "part-time" },
  { title: "Freelance Designer", company: "CreativeAgency", location: "Utrecht", salary_min: 40000, salary_max: 60000, skills: ["Graphic Design", "Freelance", "Creative"], contract_type: "freelance" },
  { title: "Contract Project Manager", company: "ProjectCo", location: "Rotterdam", salary_min: 50000, salary_max: 70000, skills: ["Project Management", "Contract", "Agile"], contract_type: "contract" },
  
  // Internships
  { title: "Software Development Intern", company: "TechStartup", location: "Amsterdam", salary_min: 0, salary_max: 0, skills: ["Learning", "Internship", "Mentorship"], contract_type: "internship" },
  { title: "Marketing Intern", company: "GrowthStartup", location: "Utrecht", salary_min: 0, salary_max: 0, skills: ["Marketing", "Internship", "Learning"], contract_type: "internship" }
];

// Generate more jobs by duplicating and varying
const generateMoreJobs = (baseJobs, targetCount) => {
  const generatedJobs = [...baseJobs];
  
  while (generatedJobs.length < targetCount) {
    const randomJob = baseJobs[Math.floor(Math.random() * baseJobs.length)];
    const variations = [
      "Senior", "Junior", "Lead", "Principal", "Staff", "Associate"
    ];
    
    const variation = variations[Math.floor(Math.random() * variations.length)];
    const newJob = {
      ...randomJob,
      title: `${variation} ${randomJob.title}`,
      company: `${randomJob.company}${Math.floor(Math.random() * 100)}`,
      salary_min: randomJob.salary_min + Math.floor(Math.random() * 10000),
      salary_max: randomJob.salary_max + Math.floor(Math.random() * 10000)
    };
    
    generatedJobs.push(newJob);
  }
  
  return generatedJobs.slice(0, targetCount);
};

const allJobs = generateMoreJobs(jobs, 2000);

console.log(`Generated ${allJobs.length} dummy jobs`);
console.log('Sample jobs:');
allJobs.slice(0, 5).forEach((job, index) => {
  console.log(`${index + 1}. ${job.title} at ${job.company} - ${job.location} (${job.salary_min}-${job.salary_max})`);
});

// Save to JSON file for the website to use
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'public', 'dummy-jobs.json');
fs.writeFileSync(outputPath, JSON.stringify(allJobs, null, 2));

console.log(`\nJobs saved to: ${outputPath}`);
console.log('✅ Seed script completed successfully!');

