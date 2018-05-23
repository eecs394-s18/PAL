export function GetGradient(ratio){
  // var red =     '#ff0000';
  // var yellow =  '#ffff00';
  // var green =   '#008000';
  ratio = 1-ratio
  if (ratio == 0.5){
    return "#ffff00";
  }

  else if(ratio < 0.5){
    let r = ratio/0.5;
    let r2 = 1-r;

    let red = Math.round(255*r).toString(16); // #ff
    let green = Math.round(255*r + 128*r2).toString(16); // #ff*r + #80*r2
    // blue is 00
    if (red.length == 1) red = '0'+red;
    if (green.length == 1) green = '0' + green;

    //this.item.color = '#'+red.toString(16).substring(0,2)+green.toString(16).substring(0,2)+"00";
    return '#'+red+green+"00";
  }
  else {
    let r2 = 1-((ratio-.5)/.5);

    let green = Math.round(255*r2).toString(16);
    if (green.length == 1) green = '0' + green;

    return '#ff'+green+"00";
  }
}