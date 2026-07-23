function calculateATS(resume) {

    let score = 40;

    if (resume.skills.length >= 5)
        score += 20;

    if (resume.projects.length > 0)
        score += 15;

    if (resume.education.length > 0)
        score += 10;

    if (resume.certifications.length > 0)
        score += 10;

    if (score > 100)
        score = 100;

    return score;

}

module.exports = calculateATS;