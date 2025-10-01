// Job Seeder for WeAreJobPilot
// Run: node seed-jobs.js (requires env vars NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const jobTitles = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer',
  'Data Scientist', 'ML Engineer', 'Product Manager', 'UX/UI Designer',
  'QA Engineer', 'Security Engineer', 'Cloud Architect', 'Mobile Developer',
  'Sales Manager', 'Marketing Manager', 'Customer Success Manager', 'HR Manager',
  'Content Writer', 'Graphic Designer', 'SEO Specialist', 'Business Analyst'
];

const skills = [
  ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
  ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
  ['Python', 'TensorFlow', 'SQL', 'Statistics'],
  ['Python', 'PyTorch', 'NLP', 'Computer Vision'],
  ['Agile', 'Scrum', 'Product Strategy', 'Analytics'],
  ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
  ['Selenium', 'Jest', 'Cypress', 'Testing'],
  ['Cybersecurity', 'Penetration Testing', 'ISO 27001'],
  ['AWS', 'Azure', 'GCP', 'System Design'],
  ['React Native', 'Flutter', 'iOS', 'Android'],
  ['Sales Strategy', 'CRM', 'Negotiation', 'B2B'],
  ['Digital Marketing', 'SEO', 'Analytics', 'Content'],
  ['Customer Support', 'Onboarding', 'Retention'],
  ['Recruitment', 'Talent Management', 'HR Strategy'],
  ['Copywriting', 'Content Strategy', 'SEO'],
  ['Photoshop', 'Illustrator', 'Branding', 'Typography'],
  ['SEO', 'Google Analytics', 'Link Building', 'Content'],
  ['Data Analysis', 'Excel', 'SQL', 'Business Intelligence']
];

const locations = [
  'Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag', 'Eindhoven',
  'Groningen', 'Maastricht', 'Breda', 'Nijmegen', 'Haarlem',
  'Brussels', 'Antwerp', 'Ghent', 'Bruges', 'Leuven',
  'Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'
];

const companies = [
  'TechCorp', 'InnovateNL', 'DataDrive', 'CloudSolutions', 'StartupHub',
  'DesignStudio', 'AgileTeam', 'SecureNet', 'GrowthLabs', 'DevForce',
  'SmartApps', 'PixelPerfect', 'CodeCraft', 'NextGen', 'FutureTech',
  'AILabs', 'ScaleUp', 'BuildIt', 'LaunchPad', 'CreativeMinds'
];

const descriptionTemplates = [
  'We are looking for a talented {title} to join our growing team. You will work on cutting-edge projects using modern technologies.',
  'Join our innovative team as a {title}. Help us build products that make a difference for thousands of users.',
  'Exciting opportunity for a {title}! Work remotely or hybrid with a dynamic international team.',
  'We are hiring a {title} to help scale our platform. Competitive salary and great work-life balance.',
  'Looking for an experienced {title} to lead key initiatives. Join a fast-growing company with massive potential.'
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createDummyEmployer() {
  // Check if demo employer exists
  const { data: existing } = await supabase
    .from('employer_profiles')
    .select('id')
    .limit(1)
    .single();

  if (existing) return existing.id;

  // Create a demo auth user first (you'll need to do this manually in Supabase Auth)
  // For now, we'll just create the employer profile with a placeholder
  console.log('Note: You need to create a demo employer user in Supabase Auth first');
  console.log('Then update this script with the user_id');
  
  return null; // Return null if no employer exists
}

async function seedJobs() {
  console.log('Starting job seeding...');

  // Note: For this to work, you need at least one employer profile
  // Get first employer or create demo
  const { data: employers } = await supabase
    .from('employer_profiles')
    .select('id')
    .limit(1);

  if (!employers || employers.length === 0) {
    console.log('⚠️  No employer profiles found. Creating jobs anyway (they will be orphaned until you assign an employer)');
  }

  const jobs = [];
  
  for (let i = 0; i < 2000; i++) {
    const titleIdx = i % jobTitles.length;
    const title = jobTitles[titleIdx];
    const jobSkills = skills[titleIdx];
    const location = randomItem(locations);
    const company = randomItem(companies);
    const remoteType = randomItem(['remote', 'hybrid', 'onsite']);
    const employmentType = randomItem(['fulltime', 'parttime', 'contract', 'freelance']);
    const experienceLevel = randomItem(['junior', 'medior', 'senior', 'lead']);
    const description = randomItem(descriptionTemplates).replace('{title}', title) + ` At ${company}, we value innovation, collaboration, and continuous learning. Join us and make an impact!`;

    const salaryMin = randomInt(30, 80) * 1000;
    const salaryMax = salaryMin + randomInt(10, 40) * 1000;

    jobs.push({
      employer_id: employers && employers[0] ? employers[0].id : null, // Will be null if no employers
      title,
      description,
      skills_required: jobSkills,
      location,
      remote_type: remoteType,
      salary_min: salaryMin,
      salary_max: salaryMax,
      salary_currency: 'EUR',
      employment_type: employmentType,
      experience_level: experienceLevel,
      status: 'active',
      views: randomInt(0, 500)
    });

    if ((i + 1) % 100 === 0) {
      console.log(`Generated ${i + 1} jobs...`);
    }
  }

  // Insert in batches
  const batchSize = 100;
  for (let i = 0; i < jobs.length; i += batchSize) {
    const batch = jobs.slice(i, i + batchSize);
    const { error } = await supabase.from('jobs').insert(batch);
    
    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
    } else {
      console.log(`✓ Inserted batch ${i / batchSize + 1} (${batch.length} jobs)`);
    }
  }

  console.log('✅ Job seeding complete! 2000 jobs created.');
}

seedJobs().catch(console.error);
