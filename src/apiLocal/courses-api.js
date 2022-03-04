import levenshtein from 'fast-levenshtein';
import courseListings from './data/courseListings.js';
import courses from './data/courses.js'
import programs from './data/programs';
import calculateEligibility from './calculateEligibility.js';

const SEARCH_SCORE_CUT_OFF = 8;
const courseCodes = courses.map((course) => course.code);

const  fetchAllCourses = function()
{
    return new Promise((resolve) => resolve({ data: courseListings }));
};

const submitSelection = function({ selections })
{
    const courseSet = new Set(selections.map((idIndex) => courses[idIndex].code));
    
    const matchedPrograms = programs.map(
    ({ id, name, requirements, slug }) => 
    {
        const results = calculateEligibility(requirements, courseSet);

        const fulfilledCourses = results.requirements.map((requirement) => 
            requirement.fulfilledCourses);
            
        return {
            fulfilledCourses, 
            programDescription: "",
            programId: id,
            programName: name,
            programPercentage: results.criteria.percentage,
            programRequirements: {
                requirements: requirements.map(({ count, from }) => 
                    `${count*3} units from ${from.join(', ')}`)
            },
            programSlug: slug
        }
    });

    return new Promise((resolve) => resolve({ data: { matchedPrograms }}));
}

// search filter function needs a bit of work.

const searchForCourse = function({ searchTerm })
{
    const searchTermUpperCase = searchTerm.toUpperCase();

    const results = courseCodes.map((code, index) => 
    ({
        id: index, code,
        score: levenshtein.get(searchTermUpperCase, code)
    })).filter((result) => result.score <= SEARCH_SCORE_CUT_OFF)
    .sort((a, b) =>  a.score - b.score)
    .map(({ id }) => 
    {
        const { name, code, description, timetable } = courses[id];

        return {
            courseCode: code,
            courseID: id,
            courseName: name,
            courseDesc: description + '\n' + timetable
        };
    });

    return new Promise((resolve) => resolve({ data: { results }}));
}

export {
    fetchAllCourses,
    submitSelection,
    searchForCourse,
};