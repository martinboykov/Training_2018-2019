// Top 10 algorithms in Interview Questions - https://www.geeksforgeeks.org/top-10-algorithms-in-interview-questions/
// Count triplets with sum smaller than a given value - https://www.geeksforgeeks.org/count-triplets-with-sum-smaller-that-a-given-value/

// Stock Buy Sell to Maximize Profit - https://www.geeksforgeeks.org/stock-buy-sell/

// Time -
// Space -
function getMaxProfit(days, day = 0, comboDay = [], buy = false, sell = true, lastBuyMoney = 0, currBalance = 0, memo = { maxProfit: 0, combination: {} }) {
  if (days.length <= 0) return null;
  console.log(day, comboDay, buy, sell, lastBuyMoney, currBalance);

  // SKIP DAY
  comboDay[day] = 'skip';
  getMaxProfit(days.slice(1), day + 1, comboDay.slice(), buy, sell, lastBuyMoney, currBalance, memo);

  // BUY OR SELL
  if (!buy && sell) { // if negative days are possible
    // BUY: if it is turn to buy
    lastBuyMoney += days[0];
    comboDay[day] = 'buy';
    getMaxProfit(days.slice(1), day + 1, comboDay.slice(), buy = true, sell = false, lastBuyMoney, currBalance, memo);
  } else if (buy && !sell && days[0] - lastBuyMoney > 0) {
    // SELL: if it is turn to sell
    currBalance += days[0] - lastBuyMoney;
    comboDay[day] = 'sell';
    if (memo.maxProfit < currBalance) {
      memo.maxProfit = currBalance;
      memo.combination = comboDay;
    }
    // reset lastBuyMoney
    getMaxProfit(days.slice(1), day + 1, comboDay.slice(), buy = false, sell = true, lastBuyMoney = 0, currBalance, memo);
  }
  return memo;
}
const arr1 = [100, 180, 260, 310, 40, 535, 695];
console.log(getMaxProfit(arr1));
