var enemies = [
    {
        "Name": "Cypher",
        "HP" : 25,
    },
    {
        "Name": "Breach",
        "HP" : 55,
    },
    {
        "Name": "Yoru",
        "HP" : 100,
    },
    {
        "Name": "KillJoy",
        "HP" : 125,
    },
    {
        "Name": "Jett",
        "HP" : 150,
    }
];
enemy = -1

var hero = [
    {
        "Name": "Phoenix",
        "Ability": "Hot Hands",
        "HP" : 350,
    },
    {
        "Name": "Sage",
        "Ability": "Healing Sphere",
        "HP" : 350,
    }
];


function Combat(){
    headDammage = 100;
    bodyDammage = 50;
    limbDammage = 25;
    miss = 0;
    hitArray = [headDammage, bodyDammage, bodyDammage, bodyDammage, limbDammage, limbDammage, limbDammage, limbDammage, miss, miss];
    random = Math.floor(Math.random() * hitArray + 1)

    function battleCalls(){
        switch(hitArray[random]){
            case headDammage:
                console.log("Head shot!");
                break;
            case bodyDammage:
                console.log("Body shot!");
                break;
            case limbDammage:
                console.log("Limb shot!");
                break;
                case miss:
                console.log("Miss!");
                break;
            default:
                console.log("????");
                break;
        }    
    }

    if(hero.HP > 0 && enemies[enemy].HP > 0){
        //hero Attack
        if (enemyStrikeFirst == false){
            random = Math.floor(Math.random() * 10)
            enemies[enemy].HP -= hitArray[random];
            battleCalls()
            console.log(enemies[enemy].Name,"lost", hitArray[random], "HP")
            console.log(enemies[enemy].Name, "has", enemies[enemy].HP, "HP")
            //enemy Attack
            random = Math.floor(Math.random() * 10 + 1);
            hero.HP -= hitArray[random];
            battleCalls();
            console.log(hero.Name,"lost", hitArray[random], "HP")
            console.log(hero.Name,"has", hero.HP, "HP")
            Combat();
        }
        else if (enemyStrikeFirst == true){
            random = Math.floor(Math.random() * 10 + 1)
            enemies[enemy].HP -= hitArray[random];
            battleCalls();
            //enemy attack
            console.log(hero.Name,"lost", hero, "HP")
            console.log(hero.Name, "has", hero.HP, "HP")
            //hero Attack
            random = Math.floor(Math.random() * 10 + 1);
            hero.HP -= hitArray[random];
            battleCalls();
            console.log(enemies[enemy].Name,"lost", enemies[enemy].HP, "HP")
            console.log(enemies[enemy].Name,"has", enemies[enemy].HP, "HP")
            Combat();
        }
    }else{
        if(enemies[enemy].HP <= 0){
            $("#text1").text(`${enemies[enemy].Name} was defeated`);
            $("#text2").text(`where will ${hero.Name} go?`)
            $("#HP-text").text(`${hero.HP} HP left`)
            enemyStrikeFirst = false;
        }
        else if(hero.HP <= 0){
            $("#text1").text("GAME OVER")
            $("#text2").text(`${enemies[enemy].Name} killed you`)
            $("#buttons").children().hide();
        }
    }
}

let userName = document.getElementById("txt").value

var enemyStrikeFirst = false;

$(document).ready(() =>{
    //hides everything but the start button and the valorant image
    $("#images").children().hide()
    $("#buttons").children().hide()
    $("#startBtn").show()
    $("#Valorant").show()

    $("#startBtn").on("click", () =>{
        $("#PhoenixBtn").show();
        $("#SageBtn").show();
        $("#startBtn").hide();
        $("#Valorant").hide();
        $("#txt").hide();
        $("#text1").text(`Who will ${userName} choose?`);
    })

    $("#PhoenixBtn").on("click", () =>{
        hero = hero[0];
        console.log(hero)
        $("#AbilityBtn").show();
        $("#PhoenixBtn").hide();
        $("#Phoenix").show();
        $("#SageBtn").hide();
        $("#BG-helper").hide();
        $("#text1").text(`${userName} chose Phoenix, he can kill anyone instantly with his ability`);
        $("#text2").text(`where will ${hero.Name} go?`); 
        $("#MidBtn").show();
        $("#C-linkBtn").show();
        $("#HP-text").text(`${hero.HP} HP left`)
    })

    $("#SageBtn").on("click", () =>{
        hero = hero[1];
        console.log(hero)
        $("#Sage").show();
        $("#BG-helper").hide();
        $("#AbilityBtn").show();
        $("#PhoenixBtn").hide();
        $("#SageBtn").hide();
        $("#text1").text(`${userName} chose Sage, she can heal herself to full HP`);
        $("#text2").text(`where will ${hero.Name} go?`);
        $("#MidBtn").show();
        $("#C-linkBtn").show();
        $("#HP-text").text(`${hero.HP} HP left`)
    })

    $("#C-linkBtn").on("click", () =>{
        $("#images").children().hide()
        $("#Cypher").show();
        $("#text1").text(`${enemies[0].Name} attacked ${hero.Name}`)
        enemy = 0;
        enemyStrikeFirst = true;
        Combat();
        $("#C-linkBtn").hide();
        $("#MidBtn").hide();
        $("#C-siteBtn").show()
    })

    $("#MidBtn").on("click", () =>{
        $("#BG-helper").show();
        $("#Sage").hide();
        $("#Phoenix").hide();
        $("#MidBtn").hide();
        $("#C-linkBtn").hide();
        $("#LobbyBtn").show();
        $("#text1").text("No one seems to be here");
    })

    $("#LobbyBtn").on("click", () =>{
        $("#LobbyBtn").hide();
        $("#text1").text("nobody is here either")
        $("#LongBtn").show()
    })

    $("#LongBtn").on("click", () =>{
        enemy = 4
        $("#text1").text(`${enemies[enemy].Name} attacked ${hero.Name}`)
        $("#Jett").show()
        Combat();
        $("#LongBtn").hide();
        $("#C-siteBtn").show()
    })
    $("#C-siteBtn").on("click", () =>{
        $("#text1").text(`KillJoy and Breach attack ${hero.Name}`);
        $("#images").children().hide();
        $("#Breach").css("display", "flex");
        $("#Yoru").css("display", "flex");
        enemy = 2;
        Combat();
        setTimeout(2000);
        enemy= 3;
        Combat();
    })
})
/*
function cLink(){
    document.getElementById("Sage").style.display = "none";
    document.getElementById("Phoenix").style.display = "none";
    document.getElementById("MidBtn").style.display = "none";
    document.getElementById("C linkBtn").style.display = "none";
    document.getElementById("Cypher").style.display = "inline";
    
    enemy = enemies[0]
    document.getElementById("text1").innerHTML = `${enemy.Name} Supprised you?`
    Combat();
    if(hero.HP > 0){
        document.getElementById("C siteBtn").style.display = "inline"
        document.getElementById("text1").innerHTML = `${hero.Name} beat ${enemy.Name} with ${hero.HP} HP left`
    }
}

function cSite(){
    document.getElementById("text2").style.display = "none"
    document.getElementById("C siteBtn").style.display = "none"
    document.getElementById("Cypher").style.display = "none"
    document.getElementById("text1").innerHTML = "Where will your actions take you? will you make it to golorious victory, or will you suffer terrible defeat. Only time will tell!"

}*/