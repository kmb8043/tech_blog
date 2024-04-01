module.exports = {
    format_Date: (date) => {
      return date.toLocaleDateString();
    },

    format_amount: (amount) => {
      return parseInt(amount).toLocaleString;
    },
  };
  