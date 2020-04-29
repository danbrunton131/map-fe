// time may be used as a key for error messages
const getCurrentTime = () =>{
    return(new Date());
}
  
const getTermCourseList = (termCoursesByProgram) => {
    let allTermCourses = [];
    for (let classType in termCoursesByProgram){ 
      const classTypeList = termCoursesByProgram[classType];
      for (let i=0; i<classTypeList.length;i++){ //i is the course itself
        allTermCourses.push({...classTypeList[i], key:classTypeList[i].courseID});
      }
    }
    return allTermCourses;
  }
  
export {
    getCurrentTime,
    getTermCourseList,
};