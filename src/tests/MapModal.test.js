import React from 'react';
import { shallow } from 'enzyme';

import {boldString} from '../Components/MapModal.js';

const requirement = "6 units of EARTHSC 1G03, ENVIRSC 1C03";
const updatedRequirement = "6 units of <strong>EARTHSC 1G03</strong>, ENVIRSC 1C03";


describe('boldString', () => {
    it('should enbolden a course match within a requirement', () => {
        const fulfilledRequirement = "EARTHSC 1G03"
        // console.log(boldString(requirement, fulfilledRequirement));
    
      expect(boldString(requirement, fulfilledRequirement)).toEqual(updatedRequirement);
    });

    it('should return the existing requirement if no match is found', () => {
        const fulfilledRequirement = "OJIBWE 1Z03"
        // console.log(boldString(requirement, fulfilledRequirement));

        expect(boldString(requirement, fulfilledRequirement)).toEqual(requirement);
    });
});
    