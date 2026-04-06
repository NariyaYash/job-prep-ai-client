import { useEffect, useState } from 'react'
import { getAllInterviewReport, getInterviewReportById, genrateInterviewReport } from '../services/interview.api'
import { useContext } from 'react'
import { InterviewContext } from '../interview.context'

const sampleReport = {
    _id: { $oid: '69c66b4eaa11459bd39122b6' },
    matchScore: 85,
    technicalQuestions: [
        {
            question: 'How do you manage state in a complex React application, and when would you choose Context API over Redux or Recoil?',
            intention: 'Evaluate depth of knowledge in frontend architecture and state management performance.',
            answer: 'Use Context API for low-frequency updates like user themes or authentication state; use Redux/Recoil for complex, high-frequency data shared across distant component branches.'
        },
        {
            question: 'Can you explain the middleware pattern in Express.js and how you would implement a secure authentication middleware using JWT?',
            intention: 'Assess understanding of backend request flow and security practices.',
            answer: 'Middleware acts as a function in the request-response cycle. For JWT, verify the token in the Authorization header using jsonwebtoken.verify() and attach the decoded user object to req.user for downstream use.'
        },
        {
            question: 'What is the difference between SQL and NoSQL databases, and why might you choose MongoDB over MySQL for an e-commerce platform?',
            intention: 'Check decision-making skills regarding database schema design and data modeling.',
            answer: 'SQL is relational with fixed schemas; NoSQL is document-based and flexible. MongoDB is ideal for e-commerce product catalogs where product attributes vary significantly between categories.'
        },
        {
            question: 'How do you optimize a Node.js application that is experiencing high CPU usage?',
            intention: 'Gauge performance optimization and debugging skills in backend systems.',
            answer: 'Analyze using profiling tools, offload heavy computation to worker threads or background queues, implement caching with Redis, and optimize database queries to reduce processing time.'
        }
    ],
    behavioralQuestions: [
        {
            question: 'Describe a time you had a technical disagreement with a teammate. How did you resolve it?',
            intention: 'Assess collaboration skills and conflict resolution.',
            answer: 'Focus on using objective metrics, testing, or prototypes to validate which approach serves the project goals best rather than personal preference.'
        },
        {
            question: 'Tell me about a difficult bug you encountered in a live project. How did you approach debugging it?',
            intention: 'Evaluate problem-solving methodology and resilience under pressure.',
            answer: 'Detail the reproduction steps, isolation of variables, checking logs, and the systematic testing applied until the root cause was identified.'
        },
        {
            question: 'How do you handle working on multiple tasks with competing deadlines?',
            intention: 'Measure time management and prioritization skills.',
            answer: 'Prioritize based on project urgency, communicate clearly with stakeholders about timelines, and use agile tools like Jira or Trello to track progress.'
        },
        {
            question: 'Why do you want to work at TechNova Solutions, and what do you hope to learn here?',
            intention: 'Check cultural fit and alignment with career goals.',
            answer: "Connect personal interest in scalable applications with TechNova's specific product ecosystem and desire for mentorship in enterprise-grade development."
        }
    ],
    skillGaps: [
        { skill: 'Docker', severity: 'high' },
        { skill: 'CI/CD Pipelines', severity: 'medium' },
        { skill: 'Next.js', severity: 'medium' },
        { skill: 'Cloud Platforms (AWS)', severity: 'high' }
    ],
    preparationPlan: [
        {
            day: 1,
            focus: 'Advanced JavaScript & React Patterns',
            tasks: [
                'Review ES6+ advanced concepts like closures and async/await',
                'Practice building custom hooks in React',
                'Implement a memoization pattern in a component'
            ]
        },
        {
            day: 2,
            focus: 'Node.js & API Architecture',
            tasks: [
                'Build a robust CRUD API with Express',
                'Implement JWT-based authentication flow',
                'Document API endpoints using Swagger/Postman'
            ]
        },
        {
            day: 3,
            focus: 'Database Optimization',
            tasks: [
                'Practice complex MongoDB aggregation pipelines',
                'Compare index performance in MongoDB vs MySQL',
                'Refactor a slow query to improve response time'
            ]
        },
        {
            day: 4,
            focus: 'Infrastructure & Deployment',
            tasks: [
                'Create a Dockerfile for a Node.js app',
                'Understand the basics of a Jenkins or GitHub Actions workflow',
                'Research Vercel deployment configurations'
            ]
        },
        {
            day: 5,
            focus: 'Next.js & Server Side Rendering',
            tasks: [
                'Read Next.js documentation on SSR vs SSG',
                'Build a small static-rendered page',
                'Compare Next.js routing with React Router'
            ]
        },
        {
            day: 6,
            focus: 'System Design & Scalability',
            tasks: [
                'Review concepts for database sharding and partitioning',
                'Study how to implement load balancers',
                'Sketch an architecture for a scalable e-commerce site'
            ]
        },
        {
            day: 7,
            focus: 'Mock Interviews & Soft Skills',
            tasks: [
                'Practice answering behavioral questions out loud',
                'Perform a mock technical interview with a peer',
                "Review project highlights for the 'tell me about yourself' pitch"
            ]
        }
    ],
    user: { $oid: '69c60d90191856608058ca49' },
    createdAt: { $date: '2026-03-27T11:34:38.184Z' },
    updatedAt: { $date: '2026-03-27T11:34:38.184Z' },
    __v: 0
}

export function useInterview() {
    const context = useContext(InterviewContext)
    if (!context) {
        throw new Error('useInterview must be used within an InterviewProvider');
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const genrateReport = async (jobDescription, resumeFile, selfDescription) => {
        let res = null;
        try {
            setLoading(true)
            res = await genrateInterviewReport(jobDescription, resumeFile, selfDescription)
            setReport(res.interviewReport)

        } catch (err) {
            console.log("err: ", err);
        } finally {
            setLoading(false)
        }
        return await res.interviewReport

    }

    const getReportById = async (interviewId) => {
        let res = null;
        try {
            setLoading(true)
            res = await getInterviewReportById(interviewId)
            setReport(res.interviewReport)

        } catch (err) {
            console.log("err: ", err);
        } finally {
            setLoading(false);
        }

        return res.interviewReport;
    }

    const getAllReports = async () => {
        let res = null;
        try {
            setLoading(true)
            res = await getAllInterviewReport()
            setReports(res.interviewReports)
        } catch (err) {
            console.log("err: ", err);
        } finally {
            setLoading(false);
        }
        return res.interviewReports;
    }

    useEffect(() => {
        getAllReports()
    }, [])

    return {
        report,
        reports,
        loading,
        getReportById,
        getAllReports,
        genrateReport
    }
}
