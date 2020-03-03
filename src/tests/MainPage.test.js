import React from 'react';
import { shallow } from 'enzyme';

import {getAllSeasonCourses} from '../Components/MainPage.js';


const seasonCourses = {
    'GEOG': [{id: 0, name: "course 0"}, {id: 1, name: "course 1"}],
    'MATH': [],
    'LIFESCI': [{id: 3, name: "course 3"}],
};
const expectedSeasonCourses = [{id: 0, name: "course 0"}, {id: 1, name: "course 1"}, {id: 3, name: "course 3"}];

describe('getAllSeasonCourses', () => {
  it('should return a list of courses given a list of course types', () => {
      console.log(getAllSeasonCourses(seasonCourses));
  
    expect(getAllSeasonCourses(seasonCourses)).toEqual(expectedSeasonCourses);
  });
});
