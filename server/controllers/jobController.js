const Job = require('../models/jobModel');

const createJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job posting', error: error.message });
    }
};

const getJobs = async (req, res) => {
    try {
        const { jobTitle, location, jobType, salaryRange } = req.query;

        const query = {};

        if (jobTitle) {
            const normalizedTitle = jobTitle.trim().toLowerCase().replace(/\s+/g, '');
            query.jobTitle = { $regex: new RegExp(normalizedTitle, 'i') };
        }

        if (location) {
            query.location = location;
        }

        if (jobType) {
            query.jobType = jobType;
        }

        if (salaryRange) {
            const salary = Number(salaryRange) * 10000;
            query.salaryMin = { $lte: salary };
            query.salaryMax = { $gte: salary };
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve job postings', error: error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
};