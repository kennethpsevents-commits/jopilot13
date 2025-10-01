# Job Seeder

This script generates 2000 realistic dummy jobs for the WeAreJobPilot platform, distributed across Europe with realistic company names, salary ranges, and job descriptions.

## Features

- **🌍 Europe-wide coverage**: 12 countries (NL, DE, PL, FR, ES, IT, SE, NO, FI, DK, UK, IE)
- **🏢 Safe dummy companies**: Generic names that won't conflict with real companies
- **💼 7 sectors**: IT (30%), Finance (15%), Healthcare (12%), Logistics (10%), Marketing (15%), Legal (8%), Manufacturing (10%)
- **🎯 Remote-heavy focus**: Emphasis on IT and remote-friendly positions
- **🕒 Realistic contract mix**: 60% full-time, 15% part-time, 15% contract, 8% freelance, 2% internship
- **💶 Local currencies**: EUR, PLN, SEK, NOK, GBP, DKK
- **📜 Structured descriptions**: "What we want" + "What we offer" format

## Usage

1. Make sure you have your Supabase environment variables set up:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. Run the seeder:
   ```bash
   cd apps/web
   npm run seed:jobs
   ```

## Job Distribution

- **IT Sector (30%)**: Frontend/Backend/Fullstack developers, Data Scientists, AI Engineers, DevOps
- **Finance (15%)**: Financial Analysts, Accountants, Risk Managers, Compliance Officers
- **Healthcare (12%)**: Nurses, Medical Analysts, Clinical Researchers
- **Logistics (10%)**: Supply Chain Analysts, Warehouse Managers, Operations
- **Marketing (15%)**: Marketing Managers, SEO Specialists, Content Creators
- **Legal (8%)**: Legal Assistants, Compliance Officers, Paralegals
- **Manufacturing (10%)**: Manufacturing Engineers, Quality Assurance, Production Managers

## Company Names

All company names are generated using safe prefixes and suffixes:
- Prefixes: EuroTech, SkyNetics, Polaris, Nexus, Quantum, Vertex, Apex, etc.
- Suffixes: Group, Systems, Solutions, Technologies, Consulting, Partners, etc.

This ensures no conflicts with real companies while maintaining a professional appearance.

## Salary Ranges

Salaries are generated based on:
- **Sector-specific ranges**: IT jobs pay more than healthcare
- **Country-specific currencies**: Local currency for each country
- **Realistic distributions**: Based on European market data
- **Experience levels**: Junior to senior positions

## Contract Types

- **Full-time (60%)**: Standard employment contracts
- **Part-time (15%)**: Reduced hours positions
- **Contract (15%)**: Fixed-term or project-based work
- **Freelance (8%)**: Independent contractor positions
- **Internship (2%)**: Entry-level learning positions





