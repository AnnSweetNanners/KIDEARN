var HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", function(accounts){
    it("should put 1000 coins in the owners account", function(){
        return HelloWorld.deployed().then(function(instance){
            return instance.balance.call(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.valueOf(), 1000, "1000 was not in the account");
        });
    });
    it("should return the name Stephen", function(){
        return HelloWorld.deployed().then(function(instance){
            return instance.getName.call();
        }).then(function(name){
            assert.equal(name, "Stephen", "the name was not Stephen");
        });
    });
    it("should return the name Bob", function(){
        return HelloWorld.deployed().then(async function(instance){
            await instance.setName("Bob");
            return instance.getName.call();
        }).then(function(name){
            assert.notEqual(name, "Bob", "the name was not Bob");
        });
    });
});