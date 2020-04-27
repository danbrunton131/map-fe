import React from 'react';
import { BeatLoader } from "react-spinners";

const override = `
  top: 50%;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
`;

export default class LoadingOverlay extends React.Component {

    render() {
      
      return(
        <div className="loading-overlay" role="alert" aria-live="assertive" aria-label="Program Results are Loading">>
            <BeatLoader  size={20} css={override} loading={true} color={"#8bd3e6"} /> {/* BW Sky Blue*/}
        </div>
      );
    }
  }