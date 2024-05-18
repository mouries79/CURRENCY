class CurrencyService {
    constructor(firstCurrency, secondCurrency) {
      this.firstCurrency = firstCurrency;
      this.secondCurrency = secondCurrency;
      const apiKey = "8342a6d122e552557ad1b807";
      this.url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
      this.amount = null;
    }
  
    alert(message) {
      const div = document.createElement("div");
      div.textContent = message;
      div.className = "alert alert-danger";
      div.style.display = "block";
  
      const section = document.querySelector(".main");
  
      section.append(div);
  
      setTimeout(() => {
        div.style.display = "none";
      }, 1000);
  
      amountElementLeft.value = "";
    }
  
    exchange() {
      if (this.firstCurrency == this.secondCurrency) {
        this.alert("Valyutalarınız hər iki istiqamətdə uyğun gəlir");
      }
      return new Promise((resolve, reject) => {
        fetch(this.url + this.firstCurrency)
          .then((res) => res.json())
          .then((data) => {
            let datas = data.conversion_rates;
            const rate = datas[this.secondCurrency];
  
            const newAmount = Number(this.amount);
  
            let result = (rate * newAmount).toFixed(4);
  
            let fromRate = document.querySelector("#fromRate");
            let toRate = document.querySelector("#toRate");
            fromRate.textContent = `1 ${this.firstCurrency} = ${rate.toFixed(
              4
            )} ${this.secondCurrency}`;
  
            toRate.textContent = `1 ${this.secondCurrency} = ${(1 / rate).toFixed(
              4
            )} ${this.firstCurrency}`;
  
            resolve(result);
          })
          .catch((err) => {
            this.alert("Burada nəsə səhvdir!");
            reject(err);
          });
      });
    }
    changeAmount(amount) {
      this.amount = amount;
    }
  
    changeFirstCurrency(fromCurrency) {
      this.firstCurrency = fromCurrency;
    }
  
    changeSecondCurrency(toCurrency) {
      this.secondCurrency = toCurrency;
    }
  }

  const amountElementLeft = document.querySelector("#amount");

const firstSelect = document.querySelector("#from");
const secondSelect = document.querySelector("#to");

const amountElementRight = document.querySelectorAll("#amount")[1];

const currencyService = new CurrencyService("RUB", "USD");

init();

function init() {
  document.addEventListener("DOMContentLoaded", () => {
    currencyService.exchange();
  });
  amountElementLeft.addEventListener("input", exchangeCurrency);
  firstSelect.addEventListener("click", exchangeFrom);
  secondSelect.addEventListener("click", exchangeTo);
  amountElementLeft.addEventListener("keyup", changeComma);
  amountElementRight.addEventListener("keyup", changeComma);
}

function changeComma(e) {
  if (e.target.value.includes(",")) {
    let newFilterComma = e.target.value.replace(",", ".");
    e.target.value = newFilterComma;
  }
}

function exchangeCurrency() {
  amountElementLeft.value = amountElementLeft.value.replace(/ /g, "");

  if (
    (amountElementLeft.value.indexOf(",") == -1 ||
      amountElementLeft.value.indexOf(".") == -1) &&
    amountElementLeft.value.match(/[a-z&\/\\_^#@+()$~%'"`!|:*?<>{}-]/g)
  ) {
    currencyService.alert("Вы можете вводить только числовые значения...");

    amountElementLeft.value = "";
    amountElementRight.value = "";
  } else {
    if (
      amountElementLeft.value.indexOf(",") == -1 &&
      amountElementLeft.value.indexOf(".") == -1
    ) {
      let _new = Number(amountElementLeft.value);
      if (isNaN(_new)) {
        amountElementLeft.value = "";
      } else {
        amountElementLeft.value = _new;
      }

      currencyService.changeAmount(_new);
    } else {
      if (amountElementLeft.value.indexOf(",")) {
        let _new = amountElementLeft.value.replace(",", ".");
        currencyService.changeAmount(_new);
      }
    }
    currencyService.exchange().then((result) => {
      if (amountElementLeft.value == 0) {
        amountElementRight.value = "";
      } else {
        amountElementRight.value = result;
      }
    });
  }
}

function exchangeFrom(e) {
  currencyService.changeFirstCurrency(e.target.textContent);

  currencyService
    .exchange()
    .then((result) => {
      if (amountElementLeft.value == 0) {
        amountElementRight.value = "";
      } else {
        amountElementRight.value = result;
      }
    })
    .catch((err) => console.log(err));
}

function exchangeTo(e) {
  currencyService.changeSecondCurrency(e.target.textContent);

  currencyService
    .exchange()
    .then((result) => {
      if (amountElementLeft.value == 0) {
        amountElementRight.value = "";
      } else {
        amountElementRight.value = result;
      }
    })
    .catch((err) => console.log(err));
}



let buttonsLeft = document.querySelectorAll("#from button");
let buttonsRight = document.querySelectorAll("#to button");

change = (e) => {
  for (element of e.target.parentNode.children) {
    element.style = "background-color: #fff; color: #C6C6C6;";
  }
  e.target.style = "background-color: #833AE0; color: #fff;";
};

buttonsLeft.forEach((button) => {
  button.addEventListener("click", change);
});
buttonsRight.forEach((button) => {
  button.addEventListener("click", change);
});
