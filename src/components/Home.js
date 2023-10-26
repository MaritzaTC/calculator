/* eslint-disable no-new-func */
import React, {useState} from 'react';
import classes from './Home.module.css'
import Demo from './Demo';
import Button from './Button';
function Home() {
  const [res, setRest] = useState('');
  const buttons = ['C', '9','/','8','7','6','*','5','4','3','+','2','1','0','-','.','(',')','Del','='];
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
    else setRest(res.concat(arg));
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