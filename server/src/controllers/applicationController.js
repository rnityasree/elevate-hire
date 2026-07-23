const Application = require("../models/Application");
const Job = require("../models/Job");

exports.saveJob = async (req, res) => {
    try {

        const { jobId } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const existing = await Application.findOne({
            user: req.user.id,
            job: jobId
        });

        if (existing) {

            existing.status = "Saved";

            await existing.save();

            return res.json(existing);
        }

        const application = await Application.create({
            user: req.user.id,
            job: jobId,
            status: "Saved"
        });

        res.status(201).json(application);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Unable to save job"
        });

    }
};

exports.applyJob = async (req, res) => {

    try {

        const { jobId } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        let application = await Application.findOne({
            user: req.user.id,
            job: jobId
        });

        if (application) {

            application.status = "Applied";
            application.appliedDate = new Date();

            await application.save();

            return res.json(application);

        }

        application = await Application.create({
            user: req.user.id,
            job: jobId,
            status: "Applied",
            appliedDate: new Date()
        });

        res.status(201).json(application);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Unable to apply"
        });

    }

};

exports.getApplications = async (req, res) => {

    try {

        const applications = await Application.find({
            user: req.user.id
        })
            .populate("job")
            .sort({
                createdAt: -1
            });

        res.json(applications);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Unable to fetch applications"
        });

    }

};

exports.updateStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { status, notes } = req.body;

        const application = await Application.findOne({
            _id: id,
            user: req.user.id
        });

        if (!application) {

            return res.status(404).json({
                message: "Application not found"
            });

        }

        if (status) {
            application.status = status;
        }

        if (notes !== undefined) {
            application.notes = notes;
        }

        await application.save();

        res.json(application);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Unable to update application"
        });

    }

};

exports.deleteApplication = async (req, res) => {

    try {

        const application = await Application.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!application) {

            return res.status(404).json({
                message: "Application not found"
            });

        }

        res.json({
            message: "Application deleted"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Unable to delete application"
        });

    }

};