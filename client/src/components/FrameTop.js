import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from '../logo.svg';
import JobModal from './JobModal';
import glass from '../assets/glass.svg';
import down from '../assets/down.svg';
import location from '../assets/location.svg';
import person2 from '../assets/person2.svg';


const FrameTop = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobs, setJobs] = useState([]); // State for storing job data
    const [filters, setFilters] = useState({
        jobTitle: '',
        location: '',
        jobType: '',
        salaryRange: 100, // Default value of 100 (i.e., 10,000,000)
    });

    // Fetch jobs from the backend
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const query = new URLSearchParams(filters).toString();
                const response = await fetch(`https://jobvault.onrender.com/api/jobs?${query}`);
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            }
        };

        fetchJobs();
    }, [filters]); // Fetch jobs whenever filters change

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: name === 'salaryRange' ? Number(value) : value
        }));
    };

    return (
        <div className='parent-frame'>
            <nav className='navbar'>
                <div className='navbar-content'>
                    <img src={logo} alt="Logo" className='navbar-logo' />
                    <div className='navbar-links'>
                        <div className='element'><a href="#home">Home</a></div>
                        <div className='element'><a href="#find-jobs">Find Jobs</a></div>
                        <div className='element'><a href="#find-talents">Find Talents</a></div>
                        <div className='element'><a href="#about-us">About Us</a></div>
                        <div className='element'><a href="#testimonials">Testimonials</a></div>
                    </div>
                    <button className='create-jobs-btn' onClick={openModal}><span>Create Jobs</span></button>
                </div>
            </nav>

            <div className="filters">
                <div className='filter'>
                    <img src={glass} alt="glass" className='icons' />
                    <input
                        type="text"
                        name="jobTitle"
                        placeholder="Search By Job Title, Role"
                        value={filters.jobTitle}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className='filter' id='borders1'>
                    <img src={location} alt="location" className='icons' />
                    <select name="location" value={filters.location} onChange={handleFilterChange}>
                        <option value="" disabled>Preferred Location</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Other">Other</option>
                    </select>
                    <img src={down} alt="down" className='icons' />
                </div>

                <div className='filter' id='borders2'>
                    <img src={person2} alt="person2" className='icons' />
                    <select name="jobType" value={filters.jobType} onChange={handleFilterChange}>
                        <option value="" disabled>Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                    <img src={down} alt="down" className='icons' />
                </div>

                <div className='filter' id='range'>
                    <div id='title'>
                        <span>Salary Per Month</span>
                        <span>₹ {(filters.salaryRange*10/13).toFixed()}k - ₹ {(filters.salaryRange*10/11).toFixed()}k</span>
                    </div>
                    <input
                        type="range"
                        name="salaryRange"
                        min="0"
                        max="100"
                        value={filters.salaryRange}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            <JobModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default FrameTop;