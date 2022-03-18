const calculateElgibility = function(requirements, courseSet)
{
    // consumed requirements => aggregates all requirements preventing course from matching twice
    // logging requirement => tracks individual requirement count and kept around for debug

    const consumedRequirementsSet = new Set();
    const loggingRequirements = [];

    // iterate through requrements
    for (let { count, from } of requirements)
    {
        // create a set for the courses which might be matched in this requirement
        const loggingCourseSet = new Set();
        
        // iterate through courses in the requirement
        for (let course of from)
        {
            // if the course hasn't already been consumed and is contained in the course list
            if (!consumedRequirementsSet.has(course) && courseSet.has(course))
            {
                // add the course to both course sets representing it has been matched and consumed
                consumedRequirementsSet.add(course);
                loggingCourseSet.add(course);

                // if the total requirement count is met, break out of the loop early
                if (loggingCourseSet.size === count) break;
            }
        }
        loggingRequirements.push(loggingCourseSet);
    }

    // map throug the logging requirements processing them to be easier aggregated/debugged/read
    const loggingResults = loggingRequirements
    .map((courseSet, index) =>
    ({
        numerator: courseSet.size, 
        denominator: requirements[index].count, 
        fulfilledCourses: Array.from(courseSet)
    }));

    // aggregate logging results into a global consumed results
    const consumedResults = loggingResults
    .reduce((consumedResults, requirementResult) =>
    {
        consumedResults.numerator += requirementResult.numerator;
        consumedResults.denominator += requirementResult.denominator;

        return consumedResults;
    },
    {
        numerator: 0, denominator: 0,
        fulfilledCourses: Array.from(consumedRequirementsSet), 
    });

    // calcaulte final percentage
    const percentage = consumedResults.numerator 
    / consumedResults.denominator;
    
    // return combined results object, adding in new consumed percentage key/value pair
    return { 
        consumed: {...consumedResults, percentage }, 
        log: loggingResults 
    };
}

export default calculateElgibility;