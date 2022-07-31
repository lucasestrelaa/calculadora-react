import { render } from '@testing-library/react'
import React, { Component } from 'react'
import './buttons.css'

export default props => 
    <button className={`
            button
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
        `}
        onClick={e =>  props.click && props.click(props.label)}
    >
        {props.label}
    </button>
