import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../App.css';
import angles from '../assets/angles.svg';
import sideways from '../assets/sideways.svg';


const JobModal = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Job posted successfully');
                onClose(); // Close the modal after successful submission
                window.location.reload(); // Refresh the page
            } else {
                console.error('Failed to post the job', response.statusText);
            }
        } catch (error) {
            console.error('Error while posting the job:', error);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Create Job Opening</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="job-form">
                    <div className='row'>
                        <div className='entry'>
                            <label>Job Title</label>
                            <input {...register('jobTitle', { required: true })} placeholder="Enter Job Title" />
                            {errors.jobTitle && <span className="error-message">This field is required</span>}
                        </div>

                        <div className='entry'>
                            <label>Company Name</label>
                            <input {...register('companyName', { required: true })} placeholder="Amazon, Microsoft, Swiggy" />
                            {errors.companyName && <span className="error-message">This field is required</span>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='entry'>
                            <label>Location</label>
                            <select {...register('location', { required: true })} defaultValue="">
                                <option value="" disabled>Choose Preferred Location</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Pune">Pune</option>
                                <option value="Hyderabad">Hyderabad</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.location && <span className="error-message">This field is required</span>}
                        </div>

                        <div className='entry'>
                            <label>Job Type</label>
                            <select {...register('jobType', { required: true })}>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                            {errors.jobType && <span className="error-message">This field is required</span>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='entry'>
                            <label>Salary Range</label>
                            <div className="salary-range">
                                <input {...register('salaryMin', { required: true, pattern: /^[0-9]*$/ })} className="updown" placeholder="₹0" />
                                <input {...register('salaryMax', { required: true, pattern: /^[0-9]*$/ })} className="updown" placeholder="₹12,00,000" />
                            </div>
                            {errors.salaryMin && <span className="error-message">Please enter a valid number</span>}
                            {errors.salaryMax && <span className="error-message">Please enter a valid number</span>}
                        </div>

                        <div className='entry'>
                            <label>Application Deadline</label>
                            <input type="date" {...register('applicationDeadline', { required: true })} />
                            {errors.applicationDeadline && <span className="error-message">This field is required</span>}
                        </div>
                    </div>

                    <div className='row-description'>
                        <div className='entry'>
                            <label>Job Description</label>
                            <textarea {...register('jobDescription', { required: true })} placeholder="Please share a description to let the candidate know more about the job role"></textarea>
                            {errors.jobDescription && <span className="error-message">This field is required</span>}
                        </div>
                    </div>

                    <div className='row-buttons'>
                        <button type="submit" className="save-draft">Save Draft <img src={angles} alt="angles" className='angles' /></button>
                        <button type="submit" className="publish">Publish <img src={sideways} alt="sideways" className='sideways' /></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobModal;