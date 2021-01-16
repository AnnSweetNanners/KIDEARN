App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load tasks.
    $.getJSON('../tasks.json', function(data) {
      var tasksRow = $('#tasksRow');
      var taskTemplate = $('#taskTemplate');

      for (i = 0; i < data.length; i ++) {
        taskTemplate.find('.panel-title').text(data[i].name);
        taskTemplate.find('img').attr('src', data[i].picture);
        taskTemplate.find('.task-frequency').text(data[i].frequency);
        taskTemplate.find('.task-age').text(data[i].age);
        taskTemplate.find('.task-location').text(data[i].location);
        taskTemplate.find('.btn-accept').attr('data-id', data[i].id);

        tasksRow.append(taskTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('tasks.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var ChoreArtifact = data;
      App.contracts.Chore = TruffleContract(ChoreArtifact);
    
      // Set the provider for our contract
      App.contracts.Chore.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markCompleted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-accept', App.handleChore);
  },

  markCompleted: function() {
    var choreInstance;

App.contracts.Chore.deployed().then(function(instance) {
  choreInstance = instance;

  return choreInstance.getChores.call();
}).then(function(chores) {
  for (i = 0; i < chores.length; i++) {
    if (chores[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-chores').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
  },

  handleChore: function(event) {
    event.preventDefault();

    var choreId = parseInt($(event.target).data('id'));

    var choreInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Chore.deployed().then(function(instance) {
    choreInstance = instance;

    // Execute chore as a transaction by sending account
    return choreInstance.select_chore(choreId, {from: account});
  }).then(function(result) {
    return App.markCompleted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
