import React, { useEffect, useState } from 'react';
import jobicon from '../assets/jobicon.svg';
import person from '../assets/person.svg';
import office from '../assets/office.svg';
import stack from '../assets/stack.svg';


const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('https://jobvault.onrender.com/api/jobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error.message);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className='second-frame'>
            <div className="job-list">
                {jobs.map(job => (
                    <div key={job._id} className="job-card">
                        <div className='header'>
                            <div className='icon-div'>
                                <img src={jobicon} alt="jobicon" className='jobicon' />
                            </div>
                            <div className='time'>24h Ago</div>
                        </div>
                        <h3>{job.jobTitle}</h3>
                        <p className='info'>
                            <div>
                                <img src={person} alt="person" className='emotes' />
                                <span> 1-3 yr Exp</span>
                            </div>
                            <div>
                                <img src={office} alt="office" className='emotes' />
                                <span> {job.jobType}</span>
                            </div>
                            <div>
                                <img src={stack} alt="stack" className='emotes' />
                                <span> {(job.salaryMin / 100000).toFixed()}LPA</span>
                            </div>
                        </p>
                        <p className='description'>
                            {job.jobDescription.split('.').map((sentence, index) => (
                                sentence.trim() && <span key={index}>{sentence.trim()}.</span>
                            ))}
                        </p>
                        <div className='apply-btn'>
                            <button type="submit" className="apply-now">Apply Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobList;
