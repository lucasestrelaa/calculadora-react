import React, { Component } from "react";
import './calculadora.css'


import Buttons from "../buttons/buttons";
import Display from "../display/display";

const initialState = {
    displayValue: '0', 
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculadora extends Component {
    state = {...initialState}

    clearMemory(){
        this.setState({...initialState})
    }
    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        }else{
            const equals = operation === '=' 
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (error) {
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                displayValue: values[0], 
                operation: equals ? null : operation, 
                current: equals ? 0 : 1,
                clearDisplay: !equals, 
                values
            })
        }
    }
    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
            return 
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay;

        const currentValue =  clearDisplay ? '' : this.state.displayValue;

        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false})

        if(n !== '.'){
            const i = this.state.current;
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values]
            values[i] = newValue
            console.log(values)
            this.setState({values})
        }
    }

    render(){
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)

        return (
            <div className="calculadora">
                <Display value={this.state.displayValue} />
                <Buttons label='AC' click={() => this.clearMemory()} triple />
                <Buttons label='/' click={setOperation} operation/>
                <Buttons label='7' click={addDigit}/>
                <Buttons label='8' click={addDigit}/>
                <Buttons label='9' click={addDigit}/>
                <Buttons label='*' click={setOperation} operation />
                <Buttons label='4' click={addDigit}/>
                <Buttons label='5' click={addDigit}/>
                <Buttons label='6' click={addDigit}/>
                <Buttons label='+' click={setOperation} operation/>
                <Buttons label='1' click={addDigit}/>
                <Buttons label='2' click={addDigit}/>
                <Buttons label='3' click={addDigit}/>
                <Buttons label='-' click={setOperation} operation/>
                <Buttons label='0' click={addDigit} double/>
                <Buttons label='.' click={addDigit}/>
                <Buttons label='=' click={setOperation} operation/>
            </div>
        )
    }
}