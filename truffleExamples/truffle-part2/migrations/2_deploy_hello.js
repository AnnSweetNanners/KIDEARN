const hello = artifacts.require("./HelloWorld");

const helloSettings = {
    name: "Stephen"
}

module.exports = function(deployer){
    deployer.deploy(hello);
};