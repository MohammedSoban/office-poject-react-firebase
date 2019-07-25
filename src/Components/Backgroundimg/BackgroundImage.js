import React, { Component } from 'react'
import Sheet from '../Backgroundimg/Sheet.jpg';
import Steel from '../Backgroundimg/steel.png';


const styles = {
    paperContainer: {
        height: 1000,
        backgroundImage:`url(${Steel})`
    }
};

 class BackgroundImage extends Component {
    render() {
        return (
            <div style={styles.paperContainer}>
               
            </div>
        )
    }
}

export default BackgroundImage




