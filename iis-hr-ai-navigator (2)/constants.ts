
import { HRContact } from './types';

export const IIS_HR_CONTACTS: HRContact[] = [
  {
    position: "Director / 主任",
    name: "汪思敏 Helga Wang",
    extension: "1701",
    email: "helga.wang@iis.kh.edu.tw",
    responsibilities: [
      "Leadership, planning, and oversight of all HR affairs",
      "Recruitment of host-country faculty and administrative staff",
      "Management of employment, contracts, compensation, and benefits (General)",
      "Whole-school planning and initiatives",
      "Developing HR strategies",
      "Managing annual budget",
      "Faculty performance evaluation systems"
    ]
  },
  {
    position: "Deputy Director / 副主任",
    name: "Anita Chiou",
    extension: "1702",
    email: "anita.chiou@iis.kh.edu.tw",
    responsibilities: [
      "Recruitment of overseas faculty",
      "Overseas employment contract management",
      "Overseas faculty orientation (flights, pick-up, housing, etc.)",
      "Faculty and staff development activities",
      "Overseas teacher retention surveys",
      "Overseas teacher recruitment budget",
      "Overseas faculty handbook revision"
    ]
  },
  {
    position: "Supervisor / 人事組組長",
    name: "陳柏琮 Sam Chen",
    extension: "1703",
    email: "sam@iis.kh.edu.tw",
    responsibilities: [
      "Salary-related affairs for all faculty and staff",
      "Monthly payment sheets review",
      "Insurance deductions (Labor, Health, Group, etc.)",
      "Overtime management and review",
      "Year-end bonus distribution",
      "Salary system management",
      "Initial salary verification",
      "Gift certificate purchase and distribution"
    ]
  },
  {
    position: "Deputy Supervisor / 招募組副組長",
    name: "許書菡 Lillian Hsu",
    extension: "1704",
    email: "lillian.hsu@iis.kh.edu.tw",
    responsibilities: [
      "Insurance and pension for MOE faculty",
      "Labor insurance for non-MOE staff",
      "Health insurance (NHI) affairs",
      "Leaving and retirement applications (MOE)",
      "Overseas faculty personal documents (ARC, Work permits)",
      "Military service deferment for male teachers",
      "Year-end banquet (尾牙) preparation",
      "Overseas tax declaration coordination"
    ]
  },
  {
    position: "Staff / 職員",
    name: "蘇珈儀 Jasmine Sue",
    extension: "1705",
    email: "jasmine.sue@iis.kh.edu.tw",
    responsibilities: [
      "Attendance management (online/paper leave requests)",
      "Host-country recruitment administrative support (104/1111 Job Bank)",
      "ID cards and parking permits",
      "Onboarding/offboarding logistics",
      "Health check-up organization",
      "Child Protection & Safeguarding document translation",
      "Meeting minutes and scheduling",
      "Employee welfare claims processing"
    ]
  }
];

export const SYSTEM_PROMPT = `
You are the HR AI Navigator for I-Shou International School (IIS). Your goal is to help staff find the right HR contact person based on the uploaded job descriptions.

CORE RULES:
1. Bilingual Support: Always respond in the SAME language used by the user (Traditional Chinese or English). Do not mix languages unless necessary for names or terms.
2. Tone: Be professional, helpful, and welcoming, reflecting the school's values of international-mindedness and excellence.
3. Guidance: If the user's request is vague or unclear, politely ask for clarification to provide better assistance.
4. Routing Logic:
   - Match the user's inquiry against the responsibilities of the HR staff provided in the database.
   - If a match is found, provide a warm response mentioning the contact's name and how they can help.
   - If the task is NOT in the database or outside HR's scope, direct the user to the HR Office general email: humanresourcesoffice@iis.kh.edu.tw.

DATABASE:
${JSON.stringify(IIS_HR_CONTACTS, null, 2)}
`;
