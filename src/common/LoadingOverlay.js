import React from 'react';
import { Ring } from 'react-spinners-css';

export default class LoadingOverlay extends React.Component {

    render() {
      
      return(
        <div className="loading-overlay">
          <Ring className="loading-ring" color="#8bd3e6" /> {/*BW Sky Blue*/}
        </div>
      );
    }
  }