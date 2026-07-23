const predefinedSkills = [
    "Java",
    "Python",
    "C",
    "C++",
    "JavaScript",
    "React",
    "NodeJS",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "SQL",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind",
    "Git",
    "GitHub",
    "AWS",
    "Docker",
    "REST API"
];

function extractSkills(text) {

    const foundSkills = [];

    predefinedSkills.forEach((skill) => {

        if (
            text.toLowerCase().includes(skill.toLowerCase())
        ) {
            foundSkills.push(skill);
        }

    });

    return [...new Set(foundSkills)];

}

module.exports = extractSkills;