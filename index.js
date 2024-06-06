<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Simple Contract Interaction</title>
</head>
<body>
    <h1>Simple Contract Interaction</h1>
    <div>
        <h3>Contract Name: <span id="contractName"></span></h3>
        <button onclick="getName()">Get Name</button>
    </div>
    <div>
        <h3>Count: <span id="count"></span></h3>
        <button onclick="getCount()">Get Count</button>
        <button onclick="incrementCount()">Increment Count</button>
    </div>
    <div>
        <input type="text" id="newName" placeholder="New Name">
        <button onclick="setName()">Set Name</button>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.3.6/dist/web3.min.js"></script>
    <script>
        const contractAddress = 'YOUR_CONTRACT_ADDRESS';
        const contractABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "count",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
            {
                "inputs": [],
                "name": "incrementCount",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "newName",
                        "type": "string"
                    }
                ],
                "name": "setName",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getName",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];

        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        async function getName() {
            const name = await contract.methods.getName().call();
            document.getElementById('contractName').innerText = name;
        }

        async function getCount() {
            const count = await contract.methods.getCount().call();
            document.getElementById('count').innerText = count;
        }

        async function incrementCount() {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.incrementCount().send({ from: accounts[0] });
            getCount();
        }

        async function setName() {
            const newName = document.getElementById('newName').value;
            const accounts = await web3.eth.getAccounts();
            await contract.methods.setName(newName).send({ from: accounts[0] });
            getName();
        }
    </script>
</body>
</html>
