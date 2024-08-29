const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    salaryMin: { type: Number, required: true },
    salaryMax: { type: Number, required: true },
    applicationDeadline: { type: Date, required: true },
    jobDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;