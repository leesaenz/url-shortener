const alpha = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
const sum = alpha.length;

function shorten(num) {
  let n = num;
  let shortUrl = '';

  while (n) {
    const remainder = n % sum;
    n = Math.floor(n / sum);
    shortUrl = alpha[remainder].toString() + shortUrl;
  }

  return shortUrl;
}

module.exports.shorten = shorten;
