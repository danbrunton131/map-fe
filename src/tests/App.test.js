import React from 'react';
import { shallow, mount } from 'enzyme';
import ErrorMessage from '../common/ErrorMessage';
import App from '../App';

describe('Test error message', () => {
  const app = mount(<App />);
  jest.useFakeTimers();


  it('should appear if an error exists', () => {
    app.setState({ error: {"message": "bad"} });
    expect(app.find(ErrorMessage).length).toBe(1);
    expect(app.find(ErrorMessage).state().shown).toEqual(true);
  });

  it('should close after timeout', () => {
    jest.useFakeTimers();
    app.setState({ error: {"timeout": 7000, "message": "bad"}});

    setTimeout(() => {
      expect(app.find(ErrorMessage).state().shown).toEqual(false);
    }, 7000);

    jest.runAllTimers();
  });
  
});
