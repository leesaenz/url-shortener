var alpha = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var sum = alpha.length;

function shorten(num){
  var shortUrl = '';
  while (num){
    var remainder = num % sum;
    num = Math.floor(num / sum);
    shortUrl = alpha[remainder].toString() + shortUrl;
  }

  console.log(shortUrl);
  return shortUrl;
}

module.exports.shorten = shorten;