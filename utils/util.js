const recognize = function (array, id) {
  console.log(array)
  switch(id) {
    case "0":
      return case0(array)
    case "1":
      return case1(array)
    case "2":
      return true;
    default:
      return false;
  }
}

const case0 = function (array) {
  //大拇指在最左边
  var numb_flag = 0;
  var min = array[0].x;
  var i = 0;
  for(i=1; i<21; i++){
    if(array[i].x < min){
      min = array[i].x; 
    }
  }
  if (min == array[4].x)  numb_flag = 1;
  var ave_x;
  var ave_y;
  ave_x = (array[9].x + array[13].x)/2;
  ave_y = (array[9].y + array[13].y)/2;
  //食、中、无名指与琴弦（水平方向）没有成45度
  if(!(Math.abs((ave_y-array[0].y)/(array[0].x-ave_x))>=0.9 && Math.abs((ave_y-array[0].y)/(array[0].x-ave_x))<=10)) {
    return {
      is_ok : false,
      info: "食、中、无名指与琴弦（水平方向）没有成45度",
      img: "/images/c1/0.png"
    }
  } else if(numb_flag != 1) {//拇指指尖没有位于最右，其他手指不得超过
    return {
      is_ok : false,
      info: "拇指指尖没有位于最右，其他手指不得超过",
      img: "/images/c1/1.png"
    }
  } else if(!(array[8].score < 0.6 && array[12].score < 0.6 && array[16].score < 0.6)){ //遮挡 {
    return {
      is_ok : false,
      info: "手指被遮挡或有光源干扰，请重新识别",
    }
  } else if (!(Math.abs((array[4].y - array[3].y)/(array[4].x - array[3].x) - (array[3].y - array[2].y)/(array[3].x - array[2].x))<= 1)) {
    //拇指2、3、4没有成180度
    return {
      is_ok : false,
      info: "拇指指尖没有位于最右，其他手指不得超过",
      img: "/images/c1/2.png"
    }
  } else {
    return {
      is_ok : true,
      info: "恭喜你顺利通过！",
    }
  }


  // if(
  //   Math.abs((ave_y-array[0].y)/(array[0].x-ave_x))>=0.9 && Math.abs((ave_y-array[0].y)/(array[0].x-ave_x))<=10  //食、中、无名指与琴弦（水平方向）成45度
  //   && numb_flag == 1   //拇指指尖位于最右，其他手指不得超过
  //   && array[8].score < 0.6 && array[12].score < 0.6 && array[16].score < 0.6 //遮挡
  //   && Math.abs((array[4].y - array[3].y)/(array[4].x - array[3].x) - (array[3].y - array[2].y)/(array[3].x - array[2].x))<= 1   //拇指2、3、4成180度
  // )
  // return true;
  // else return false;
}

  


const case1 = function (array) {
  return {
    is_ok : false,
    info: "其他手指超过了大拇指",
  }
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime,
  recognize
}




