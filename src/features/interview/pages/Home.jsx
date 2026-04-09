import React, { useRef, useState } from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Home() {
    const { loading, genrateReport, reports } = useInterview();
    const [jobDescription, setJobDescription] = useState('')
    const [selfDescription, setSelfDescription] = useState('')
    const [uploadedFileName, setUploadedFileName] = useState('')
    const [fileError, setFileError] = useState('')
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0]
        setFileError('')
        if (file) {
            // Check file type
            const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            if (!allowedTypes.includes(file.type)) {
                setFileError('Please upload a PDF or DOCX file.')
                setUploadedFileName('')
                return
            }
            // Check file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setFileError('File size must be less than 5MB.')
                setUploadedFileName('')
                return
            }
            setUploadedFileName(file.name)
        }
    }

    const handleJobDescriptionChange = (e) => {
        const value = e.target.value
        if (value.length <= 5000) {
            setJobDescription(value)
        }
    }

    const handleSelfDescriptionChange = (e) => {
        const value = e.target.value
        if (value.length <= 1000) {
            setSelfDescription(value)
        }
    }

    const isFormValid = () => {
        const resumeFile = resumeInputRef.current?.files?.[0]
        return jobDescription.trim().length > 0 &&
            selfDescription.trim().length > 0 &&
            resumeFile &&
            !fileError
    }

    const handleGenrateReport = async () => {
        if (!isFormValid() || loading) return

        const resumeFile = resumeInputRef.current?.files?.[0]
        const report = await genrateReport(jobDescription.trim(), resumeFile, selfDescription.trim())
        if (report?._id) {
            toast.success("Your interview report has been generated successfully!")
            handleResetForm()
            navigate(`/interview/${report._id}`)
        } else {
            toast.error(report?.message || "An error occurred while generating the interview report. Please try again.")
            handleResetForm()
        }
    }

    const handleResetForm = () => {
        setJobDescription('')
        setSelfDescription('')
        setUploadedFileName('')
        setFileError('')
        if (resumeInputRef.current) {
            resumeInputRef.current.value = ''
        }
    }

    const getReportById = async (id) => {
        await navigate(`/interview/${id}`);
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <h1>Generating your personalized <b className="highlight">INTERVIEW PLAN.</b></h1>
                <div className="loader"></div>
            </main>
        )
    }

    return (
        <>
            <div className='home-page'>
                <div className='page-header'>
                    <h1>Create Your Custom <span className='highlight'>Interview Plan.</span></h1>
                    <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
                </div>

                <article className='interview-card'>
                    <div className='interview-card__body'>
                        <section className='panel panel--left'>
                            <div className='panel__header'>
                                <h2>Target Job Description</h2>
                            </div>

                            <div className='section-label'>
                                <span>Job Description</span>
                            </div>
                            <textarea
                                name='jobDescription'
                                id='jobDescription'
                                placeholder='Enter job description here...'
                                className='panel__textarea'
                                value={jobDescription}
                                onChange={handleJobDescriptionChange}
                            />
                            <span className='char-counter'>{jobDescription.length} / 5000 chars</span>
                        </section>

                        <div className='panel-divider' />
                        <section className='panel panel--right'>
                            <div className='panel__header'>
                                <h2>Your Profile</h2>
                            </div>

                            <div className='upload-section'>
                                <label className='section-label' htmlFor='resume'>Resume Upload</label>
                                <div className='dropzone' onClick={() => resumeInputRef.current?.click()}>
                                    <span className='dropzone__icon'>📄</span>
                                    <p className='dropzone__title'>Click to upload or drag & drop</p>
                                    <p className='dropzone__subtitle'>PDF or DOCX (max 5MB)</p>
                                    <input
                                        type='file'
                                        id='resume'
                                        name='resume'
                                        accept='.pdf,.docx'
                                        ref={resumeInputRef}
                                        hidden
                                        onChange={handleFileUpload}
                                    />
                                </div>
                                {uploadedFileName && (
                                    <div className='upload-success'>
                                        <span className='upload-success__icon'>✓</span>
                                        <span className='upload-success__text'>File uploaded: <strong>{uploadedFileName}</strong></span>
                                    </div>
                                )}
                                {fileError && (
                                    <div className='upload-error'>
                                        <span className='upload-error__icon'>⚠</span>
                                        <span className='upload-error__text'>{fileError}</span>
                                    </div>
                                )}
                            </div>

                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                                <textarea
                                    name='selfDescription'
                                    id='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder='Briefly describe your experience, key skills, and years of expertise...'
                                    value={selfDescription}
                                    onChange={handleSelfDescriptionChange}
                                />
                                <span className='char-counter'>{selfDescription.length} / 1000 chars</span>
                            </div>

                            <div className='form-note'>
                                <strong>Note:</strong> The more detailed your job description and self-description, the better the AI can tailor your interview strategy!
                            </div>

                            <div className='button-group'>
                                <button
                                    className='generate-btn'
                                    onClick={handleGenrateReport}
                                    disabled={!isFormValid() || loading}
                                >
                                    {loading ? 'Generating...' : 'Generate My Interview Strategy'}
                                </button>
                                <button
                                    className='reset-btn'
                                    onClick={handleResetForm}
                                    type="button"
                                >
                                    Reset Form
                                </button>
                            </div>
                        </section>
                    </div>
                </article>

                {/* recent reports section */}
                {reports.length > 0 && (
                    <section className='recent-reports'>
                        <h2>Recent Interview Reports</h2>
                        <div className='reports-grid'>
                            {reports.map((report) => (
                                <div key={report._id} className='report-card'>
                                    <h3>{report.title || 'Untitle Report'}</h3>
                                    <p>Match Score: {report.matchScore}%</p>
                                    <button onClick={() => getReportById(report._id)}>View Details</button>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

        </>
    )
}

export default Home