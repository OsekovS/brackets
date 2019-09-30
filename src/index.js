module.exports = function check(str, bracketsConfig) {
  // module.exports = function check(str, bracketsConfig)
  let confString = bracketsConfig.reduce((accum,cur) => accum+=cur.join(''),'');
  const expr = new Changeble_string(str);
  // debugger
  for(let i=0; i< expr.value.length+1; i++){
    let cuttedSymbol = expr.cut(1);
    let curIndex =confString.indexOf(cuttedSymbol);
    if(curIndex === -1) continue
    if(curIndex%2 !== 0) return false
    else{
        if(parsePracketExp(confString.indexOf(cuttedSymbol),expr,confString)&&expr.value===''){
          return true
        }
        if(expr.value!==''){
          i = 0;
          continue
        }
        else{
          return false
        }
    }
  }
  return true
}
class Changeble_string{
  constructor(string){
      this.value = string;
  }
  cut(end){
      let cutted = this.value.slice(0,end)
      this.value = this.value.slice(end)
      return cutted
  }
}

let parsePracketExp = function parsePracketExp(bracketIndex,str, confString) {
  let mode='';
  confString[bracketIndex]===confString[bracketIndex+1] ?
  mode= 'ordinary' : mode ='double';
  // console.log(str.cut(1))
  const numOfIterations = str.value.length;
  for(let i=0; i< numOfIterations; i++){
    let cuttedSymbol = str.cut(1);
    let curIndex =confString.indexOf(cuttedSymbol);
    if(curIndex === -1) continue
    if(mode==='ordinary'){
      if(curIndex===bracketIndex) return true
      if(curIndex%2 === 0 && parsePracketExp(curIndex,str,confString)){
        continue
      }
      else return false
    }
    else{

      if(curIndex-1 === bracketIndex) return true
      if(curIndex%2 === 0 && parsePracketExp(curIndex,str,confString)){
        continue
      }
      else return false
    }
  }
  return false
};
 