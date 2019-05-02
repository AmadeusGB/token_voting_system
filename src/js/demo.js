import contract from "truffle-contract";
import DemoContract from "@contracts/demo.json";


const Users = {
  contract: null,

  instance: null,

  init_user: function() {
    let self = this;

    return new Promise(function(resolve, reject) {
      self.contract = contract(DemoContract);
      self.contract.setProvider(window.web3.currentProvider);

      self.contract
        .deployed()
        .then(instance => {
          self.instance = instance;
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  addvotingdata: function(
    number,
    topic,
    startdate,
    enddate,
    state,
    result,
    judge,
    choose1,
    choose2,
    choose3
  ) {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .addvotingdata(
          number,
          topic,
          startdate,
          enddate,
          state,
          result,
          judge,
          choose1,
          choose2,
          choose3,
          {
            from: window.web3.eth.accounts[0]
          }
        )
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  backordernumber: function () {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .backordernumber({ from: window.web3.eth.accounts[0] })
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  backvoting: function () {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .backvoting({ from: window.web3.eth.accounts[0] })
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  vote: function (
    number,
    choose,
    amount
  ) {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .vote(
          number,
          choose,
          amount,
          {
            from: window.web3.eth.accounts[0]
          }
        )
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  backcredit: function (
    number,
    choose,
  ) {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .backcredit(
          number,
          choose,
          {
            from: window.web3.eth.accounts[0]
          }
        )
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  buy: function (
    amount
  ) {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .buy(
          amount,
          {
            from: window.web3.eth.accounts[0]
          }
        )
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  sell: function (
    amount
  ) {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .sell(
          amount,
          {
            from: window.web3.eth.accounts[0]
          }
        )
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  check_balance: function () {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .check_balance(
          {
            from: window.web3.eth.accounts[0]
          }
        )
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  displayinfo: function (index, num) {
    let self = this;

    return new Promise((resolve, reject) => {
      self.instance
        .displayinfo(index, num, { from: window.web3.eth.accounts[0] })
        .then(tx => {
          resolve(tx);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default Users;
