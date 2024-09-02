import React, { useState, useEffect } from 'react';

const AnswerButtons = (props) => {
    return (

        <button  className='border-2 p-2 border-blue-300 rounded-lg cursor-pointer' disabled={!props.isActive}  onClick={ (e)=>props.clickEvent(props.selectedID)} >
            {props.content}
        </button>
    );

}
export default AnswerButtons;