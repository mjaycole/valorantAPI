const requestURL = 'https://valorant-api.com/v1/agents';

var agentList = {};

fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function (jsonObject) {
        console.log(jsonObject);
        agentList = jsonObject;
        displayAgents(agentList)
    })

function displayAgents(jsonObject) {
    let agentParent = document.querySelector('.agents');

    for (agent in jsonObject.data) {
        if (jsonObject.data[agent].fullPortrait == null) {
            continue;
        }

        let newAgent = document.createElement('div');
        newAgent.setAttribute('class', 'agent');
        newAgent.setAttribute('agent-id', agent);
        newAgent.setAttribute('onclick', `loadAgentDetails(${agent})`)

        let name = document.createElement('h3');
        name.textContent = jsonObject.data[agent].displayName;

        let image = document.createElement('img');
        image.src = jsonObject.data[agent].displayIcon;

        let abilities = document.createElement('div');
        abilities.setAttribute('class', 'abilities');

        for (ability in jsonObject.data[agent].abilities) {
            if (jsonObject.data[agent].abilities[ability].displayIcon == null) {
                continue;
            }

            let abilityImg = document.createElement('img');
            abilityImg.setAttribute('class', 'ability');

            abilityImg.src = jsonObject.data[agent].abilities[ability].displayIcon;

            abilities.append(abilityImg);
        }

        let description = document.createElement('p');
        description.textContent = jsonObject.data[agent].description;

        newAgent.append(name);
        newAgent.append(image);

        agentParent.append(newAgent);
    }
}

function loadAgentDetails(agent) {
    let buttons = document.querySelector('.buttons');
    let returnButton = document.createElement('div');
    returnButton.setAttribute('class', 'returnToAgentList');
    returnButton.setAttribute('onclick', 'window.location.reload()');
    returnButton.textContent = "Return to Agent List";
    buttons.append(returnButton);


    document.querySelector('.agents').innerHTML = "";

    let agentParent = document.querySelector('.agent-info');

    let newAgent = document.createElement('div');
    newAgent.setAttribute('class', 'ind-agent');

    let name = document.createElement('h3');
    name.textContent = agentList.data[agent].displayName;

    let image = document.createElement('img');
    image.src = agentList.data[agent].fullPortrait;

    let description = document.createElement('p');
    description.textContent = agentList.data[agent].description;

    let abilities = document.createElement('div');
    abilities.setAttribute('class', 'agent-abilities');

    for (ability in agentList.data[agent].abilities) {
        if (agentList.data[agent].abilities[ability].displayIcon == null) {
            continue;
        }
        let newAbility = document.createElement('div');
        newAbility.setAttribute('class', 'ind-ability');

        let abilityImg = document.createElement('img');
        abilityImg.src = agentList.data[agent].abilities[ability].displayIcon;

        let abilityName = document.createElement('h4');
        abilityName.textContent = agentList.data[agent].abilities[ability].displayName;

        let abilityDescription = document.createElement('p');
        abilityDescription.textContent = agentList.data[agent].abilities[ability].description;

        newAbility.append(abilityImg);
        newAbility.append(abilityName);
        newAbility.append(abilityDescription);

        abilities.append(newAbility);
    }

    newAgent.append(name);
    newAgent.append(image);
    newAgent.append(description);
    newAgent.append(abilities);

    agentParent.append(newAgent);
}