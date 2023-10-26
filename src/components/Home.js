/* eslint-disable no-new-func */
import React, {useState} from 'react';
import classes from './Home.module.css'
import Demo from './Demo';
import Button from './Button';
/**
 * Renders the Home component which displays a calculator.
 * @returns {JSX.Element} The Home component.
 */
function Home() {
  const [res, setRest] = useState('');
  const buttons = ['C', '9','/','8','7','6','*','5','4','3','+','2','1','0','-','.','(',')','Del','='];

  /**
   * Finds the result of the expression entered by the user and updates the state with the result.
   * If there is a parenthesis mismatch, it sets the state with an error message.
   */
  const findVal = () => {
    let openParenthesis = (res.match(/\(/g) || []).length;
    let closeParenthesis = (res.match(/\)/g) || []).length;
    if (openParenthesis !== closeParenthesis) {
      setRest('Error: Parenthesis mismatch');
      return;
    }
    let result = Function('return ' + res)();
    setRest(result.toString());
  }

  /**
   * Handles the button click event and updates the state accordingly.
   * @param {string} arg - The value of the button clicked.
   */
  const handler = (arg) => {
    console.log(arg);
    if(arg === 'infinity') {
      return;
    }
    if(arg === 'C')setRest('');
    else if(arg === '=') findVal();
    else if(arg === 'Del') {
      let n = res.length;
      if(n > 0) setRest(res.slice(0, n-1));
    }
    else {
      // Check for invalid expressions
      if ((arg === '+' && res.endsWith('+')) || (arg === '-' && res.endsWith('-')) || (arg === '*' && res.endsWith('*'))) {
        setRest('Error: Invalid expression');
        return;
      }
      setRest(res.concat(arg));
    }
  }

  return (
    <div className={classes.home}>
        <div className={classes.inner}>
            <div className={classes.result}>
                <div className={classes.resbox}>{res}</div>
            </div>
        
        <div className={classes.btns}>
            {buttons.map((ele, index) => {return <Button handler={handler} key={index} value={ele} />
            })}
        </div>
        </div>
        <Demo />
    </div>
  );
}
export default Home;