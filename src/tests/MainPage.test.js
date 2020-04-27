import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorMessage from '../common/ErrorMessage';
import MainPage from '../Components/MainPage';
import {getTermCourseList} from '../Components/MainPage.js';



const seasonCourses = {
    'GEOG': [{id: 0, name: "course 0"}, {id: 1, name: "course 1"}],
    'MATH': [],
    'LIFESCI': [{id: 3, name: "course 3"}],
};
const expectedSeasonCourses = [{id: 0, name: "course 0"}, {id: 1, name: "course 1"}, {id: 3, name: "course 3"}];

describe('getTermCourseList', () => {
  it('should return a list of all courses given a list of course types', () => {
      // console.log(getTermCourseList(seasonCourses));
  
    expect(getTermCourseList(seasonCourses)).toEqual(expectedSeasonCourses);
  });
});

describe('Test error message', () => {
  const mainPage = mount(<MainPage />);
  jest.useFakeTimers();


  it('should appear if an error exists', () => {
    mainPage.setState({ error: {"message": "bad"} });
    expect(mainPage.find(ErrorMessage).length).toBe(1);
    expect(mainPage.find(ErrorMessage).state().shown).toEqual(true);

  });

  it('should close after timeout', () => {
    jest.useFakeTimers();
    mainPage.setState({ error: {"message": "bad", timeout: 7000}});

    setTimeout(() => {
      expect(mainPage.find(ErrorMessage).state().shown).toEqual(false);
    }, 7000);

    jest.runAllTimers();
  });
  
});
