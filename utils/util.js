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
  return {
    is_ok : true,
    info: "手势正确",
  }
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




