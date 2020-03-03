import React from 'react';
import { shallow } from 'enzyme';

import {getTermCourseList} from '../Components/MainPage.js';


const seasonCourses = {
    'GEOG': [{id: 0, name: "course 0"}, {id: 1, name: "course 1"}],
    'MATH': [],
    'LIFESCI': [{id: 3, name: "course 3"}],
};
const expectedSeasonCourses = [{id: 0, name: "course 0"}, {id: 1, name: "course 1"}, {id: 3, name: "course 3"}];

describe('getTermCourseList', () => {
  it('should return a list of all courses given a list of course types', () => {
      console.log(getTermCourseList(seasonCourses));
  
    expect(getTermCourseList(seasonCourses)).toEqual(expectedSeasonCourses);
  });
});
