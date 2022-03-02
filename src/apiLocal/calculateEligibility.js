const calculateElgibility = function(requirements, courseSet)
{
    const criteriaCourseSet = new Set();
    const requirementCourseSets = [];

    for (let { count, from } of requirements)
    {
        const requirementCourseSet = new Set();
        for (let course of from)
        {
            if (!criteriaCourseSet.has(course) && courseSet.has(course))
            {
                criteriaCourseSet.add(course);
                requirementCourseSet.add(course);
                if (requirementCourseSet.size === count) break;
            }
        }
        requirementCourseSets.push(requirementCourseSet);
    }

    const requirementResults = requirementCourseSets
    .map((courseSet, index) =>
    ({
        numerator: courseSet.size, 
        denominator: requirements[index].count, 
        fulfilledCourses: Array.from(courseSet)
    }));

    const criteriaResults = requirementResults
    .reduce((criteraResults, requirementResult) =>
    {
        criteraResults.numerator += requirementResult.numerator;
        criteraResults.denominator += requirementResult.denominator;

        return criteraResults;
    },
    {
        numerator: 0, denominator: 0,
        fulfilledCourses: Array.from(criteriaCourseSet), 
    });

    const percentage = criteriaResults.numerator 
    / criteriaResults.denominator;
    
    return { 
        criteria: {...criteriaResults, percentage }, 
        requirements: requirementResults 
    };
}

export default calculateElgibility;