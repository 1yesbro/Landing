// Твоя цель - защитить Рейнальдо.

// Найди паладина с самым низким здоровьем.
function lowestHealthPaladin() {
    var lowestHealth = 99999;
    var lowestFriend = null;
    var friends = hero.findFriends();
    for(var f=0; f < friends.length; f++) {
        var friend = friends[f];
        if(friend.type != "paladin") { continue; }
        if(friend.health < lowestHealth && friend.health < friend.maxHealth) {
            lowestHealth = friend.health;
            lowestFriend = friend;
        }
    }
    return lowestFriend;
}

function commandPaladin(paladin) {
    // Вылечи паладина с низким здоровьем, используя `lowestHealthPaladin()`
    // Ты можешь использовать `paladin.canCast("heal")` и `command(paladin, "cast", "heal", target)`
    // Паладины также владеют щитом: `command(paladin, "shield")`
    // И не забудь, что они тоже умеют атаковать!
    if (paladin.canCast("heal", hero)) {
        var lowest = lowestHealthPaladin();
        if (lowest) {
            hero.command(paladin, "cast", "heal", lowest);
        }
    }
    else if (paladin.health < 200) {
        hero.command(paladin, "shield");
    }
    else {
        var enemy = paladin.findNearestEnemy();
        if (enemy) {
            hero.command(paladin, "attack", enemy);
        }
    }
}

function commandFriends() {
    // Управляй своими союзниками.
    var friends = hero.findFriends();
    for(var i=0; i < friends.length; i++) {
        var friend = friends[i];
        if(friend.type == "peasant") {
            commandPeasant(friend);
        } else if(friend.type == "griffin-rider") {
            commandGriffin(friend);
        } else if(friend.type == "paladin") {
            commandPaladin(friend);
        }
    }
}
var summonTypes = ["griffin-rider"];
function summonTroops() {
    var type = summonTypes[hero.built.length % summonTypes.length];
    if(hero.gold >= hero.costOf(type)){
     hero.summon(type);   
    }
    
}
    function commandPeasant(peasant){
        var item = peasant.findNearestItem();
        if (item) {
            hero.command(peasant, "move", item.pos);
        }
    }
    
    function commandGriffin(friend){
      var enemy = hero.findNearest(hero.findByType("warlock"));
    if (!enemy) {
        enemy = friend.findNearestEnemy();
    }
    if (enemy) {
       hero.command(friend, "attack", enemy); 
    }
}


while(true) {
    commandFriends();
    // Призывай наездников!
    summonTroops();
}