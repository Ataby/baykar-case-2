import React, { useState, useEffect } from 'react';

const ResultRow = (props) => {


  return (
    <div className='result-row overflow-auto'>
        <div className='border-2 border-red-700 flex-row p-4 text-lg font-bold'>
        {props.question}
        </div>
    
        <div disabled={props.selectedOption!=0} className='mx-auto w-1/2 p-2 rounded-md shadow-sm shadow-gray-600'>
        {props.options[0]}
        </div>
        <div disabled={props.selectedOption!=1} className='mx-auto w-1/2 p-2 rounded-md shadow-sm shadow-gray-600'>
        {props.options[1]}
        </div>
        <div disabled={props.selectedOption!=2}className='mx-auto w-1/2 p-2 rounded-md shadow-sm shadow-gray-600'>
        {props.options[2]}
        </div>
        <div disabled={props.selectedOption!=3}className='mx-auto w-1/2 p-2 rounded-md shadow-sm shadow-gray-600'>
        {props.options[3]}
        </div>
    </div>
  );

}
export default ResultRow;