const requestURL = 'https://valorant-api.com/v1/weapons';

var weaponList = {};

fetch(requestURL)
    .then(function(response){
        return response.json();
    })
    .then(function (jsonObject) {
        console.log(jsonObject);
        weaponList = jsonObject;
        displayWeapons(weaponList)
    })

function displayWeapons(jsonObject) {
    let weaponParent = document.querySelector('.weapons');

    for (weapon in jsonObject.data) {
        if (jsonObject.data[weapon].displayIcon == null) {
            continue;
        }

        let newWeapon = document.createElement('div');
        newWeapon.setAttribute('class', 'weapon');
        newWeapon.setAttribute('weapon-id', weapon);
        newWeapon.setAttribute('onclick', `loadWeaponDetails(${weapon})`)

        let name = document.createElement('h3');
        name.textContent = jsonObject.data[weapon].displayName;

        let image = document.createElement('img');
        image.src = jsonObject.data[weapon].displayIcon;

        newWeapon.append(name);
        newWeapon.append(image);


        weaponParent.append(newWeapon);
    }
}

function loadWeaponDetails(weapon) {
    let buttons = document.querySelector('.buttons');
    let returnButton = document.createElement('div');
    returnButton.setAttribute('class', 'returnToAgentList');
    returnButton.setAttribute('onclick', 'window.location.reload()');
    returnButton.textContent = "Return to Weapons List";
    buttons.append(returnButton);


    document.querySelector('.weapons').innerHTML = "";

    let weaponParent = document.querySelector('.weapon-info');

    let newWeapon = document.createElement('div');
    newWeapon.setAttribute('class', 'ind-weapon');

    let name = document.createElement('h3');
    name.textContent = weaponList.data[weapon].displayName;

    let image = document.createElement('img');
    image.src = weaponList.data[weapon].displayIcon;

    //Set up the Shop
    let shop = document.createElement('div');
    shop.setAttribute('class', 'shop');

    let shopTitle = document.createElement('h4');
    shopTitle.textContent = "Shop Info";
    shop.append(shopTitle);

    let underline = document.createElement('hr');
    underline.style.width - "50%";
    shop.append(underline);

    if (weaponList.data[weapon].shopData != null) {
        let category = document.createElement('p');
        category.textContent = "Type: " + weaponList.data[weapon].shopData.categoryText;

        let cost = document.createElement('p');
        cost.textContent = "Cost: " + weaponList.data[weapon].shopData.cost;

        shop.append(category);
        shop.append(cost);
    }

    //Set up the Stats
    let stats = document.createElement('div');
    stats.setAttribute('class', 'stats');

    let statName = document.createElement('h4');
    statName.textContent = "Stats";
    stats.append(statName);

    let statsUnderline = document.createElement('hr');
    statsUnderline.style.width - "50%";
    stats.append(statsUnderline);

    //Base stats
    if (weaponList.data[weapon].weaponStats != null) {
        let magSize = document.createElement('p');
        magSize.textContent = "Mag Size: " + weaponList.data[weapon].weaponStats.magazineSize;

        let fireRate = document.createElement('p');
        fireRate.textContent = "Fire Rate: " + weaponList.data[weapon].weaponStats.fireRate;

        let equipTime = document.createElement('p');
        equipTime.textContent = "Equip Time: " + weaponList.data[weapon].weaponStats.equipTimeSeconds;

        let reloadTime = document.createElement('p');
        reloadTime.textContent = "Reload Time: " + weaponList.data[weapon].weaponStats.reloadTimeSeconds;

        let rangeTitle = document.createElement('h5');
        rangeTitle.textContent = "Damage";

        let damageRanges = document.createElement('div');
        damageRanges.setAttribute('class', 'ranges');
    
        //Damage stats
        if (weaponList.data[weapon].weaponStats.damageRanges != null) {
            for (damage in weaponList.data[weapon].weaponStats.damageRanges) {
                let range = document.createElement('div');
                range.setAttribute('class', 'range');

                let startMeters = document.createElement('p');
                startMeters.textContent = "Start Range: " + weaponList.data[weapon].weaponStats.damageRanges[damage].rangeStartMeters;

                let endMeters = document.createElement('p');
                endMeters.textContent = "End Range: " + weaponList.data[weapon].weaponStats.damageRanges[damage].rangeEndMeters;

                let bodyDamage = document.createElement('p');
                bodyDamage.textContent = "Body Damage: " + weaponList.data[weapon].weaponStats.damageRanges[damage].bodyDamage;

                let headDamage = document.createElement('p');
                headDamage.textContent = "Head Damage: " + weaponList.data[weapon].weaponStats.damageRanges[damage].headDamage;

                range.append(startMeters);
                range.append(endMeters);
                range.append(bodyDamage);
                range.append(headDamage);

                damageRanges.append(range);
            }
        }

        stats.append(magSize);
        stats.append(fireRate);
        stats.append(equipTime);
        stats.append(reloadTime);
        stats.append(rangeTitle);
        stats.append(damageRanges);
    }

    //Set up the Skins
    let skins = document.createElement('div');
    skins.setAttribute('class', 'skinsParent');

    let skinsTitle = document.createElement('h4');
    skinsTitle.textContent = "Skins";
    skins.append(skinsTitle);

    let skinUnderline = document.createElement('hr');
    skins.append(skinUnderline);

    if (weaponList.data[weapon].skins != null) {
        for (skin in weaponList.data[weapon].skins) {
            if (weaponList.data[weapon].skins[skin].displayIcon == null) {
                continue;                
            }

            let newSkinParent = document.createElement('div');
            newSkinParent.setAttribute('class', 'newSkin');

            let newSkin = document.createElement('img');
            newSkin.src = weaponList.data[weapon].skins[skin].displayIcon;

            let newSkinName = document.createElement('p');
            newSkinName.textContent = weaponList.data[weapon].skins[skin].displayName;

            newSkinParent.append(newSkin);
            newSkinParent.append(newSkinName);
            skins.append(newSkinParent);
        }
    }

    //Append the weapon data into the newWeapon
    newWeapon.append(name);
    newWeapon.append(image);
    if (weaponList.data[weapon].shopData != null) {
        newWeapon.append(shop);
    }
    newWeapon.append(stats);
    newWeapon.append(skins);

    //Append the newWeapon into the parent
    weaponParent.append(newWeapon);
}