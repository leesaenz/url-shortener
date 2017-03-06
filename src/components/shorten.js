var alpha = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var sum = alpha.length;

function shorten(num){
  var shortUrl = '';
  var num = num.toString().replace(/\W/g, '');
  var num = Number(num);

  while (num){
    var remainder = num % sum;
    num = Math.floor(num / sum);
    shortUrl = alpha[remainder].toString() + shortUrl;
  }

  console.log(shortUrl);
  return shortUrl;
}

module.exports.shorten = shorten;