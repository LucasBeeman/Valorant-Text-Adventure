var enemies = [
    {
        "Name": "Cypher",
        "HP" : 25,
    },
    {
        "Name": "High ping Breach",
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
abilityAvaliable = true;


function Combat(){
    headDammage = 100;
    bodyDammage = 50;
    limbDammage = 25;
    miss = 0;
    hitArray = [headDammage, bodyDammage, bodyDammage, bodyDammage, limbDammage, limbDammage, limbDammage, limbDammage, miss, miss];
    random = Math.floor(Math.random() * hitArray + 1)

    //check which shot was made in the console
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
            random = Math.floor(Math.random() * 10)
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
            //enemy attack
            battleCalls();
            console.log(hero.Name,"lost", hitArray[random], "HP")
            console.log(hero.Name, "has", hero.HP, "HP")
            hero.HP -= hitArray[random]
            random = Math.floor(Math.random() * 10)
            //hero Attack
            random = Math.floor(Math.random() * 10 + 1);
            enemies[enemy].HP -= hitArray[random];
            battleCalls();
            console.log(enemies[enemy].Name,"lost", hitArray[random], "HP")
            console.log(enemies[enemy].Name,"has", enemies[enemy].HP, "HP")
            Combat();
        }
    }else{
        //change the text to the new hp ammount
        if(enemies[enemy].HP <= 0){
            $("#text1").text(`${enemies[enemy].Name} was defeated`);
            $("#text2").text(`where will ${hero.Name} go?`)
            $("#HP-text").text(`${hero.HP} HP left`)
            enemyStrikeFirst = false;
        }
        //game over
        else if(hero.HP <= 0){
            $("#text1").text("GAME OVER")
            $("#text2").text(`${enemies[enemy].Name} killed you`)
            $("#buttons").children().hide();
            $("#HP-text").hide();
        }
    }
}
//hides the ability button and check which ability to use next turn
$("#AbilityBtn").on("click",() =>{
    $("#AbilityBtn").hide()
    if(abilityAvaliable == true){
        $("#buttons").children().on("click", () =>{
            if(hero.Name == "Phoenix"){
                enemies[enemy].HP = 0;
            }
            else if(hero.Name == "Sage"){
                hero.HP = 350;
            }
            abilityAvaliable = false;
        })
    }
})

let userName = document.getElementById("txt").value

var enemyStrikeFirst = false;

$(document).ready(() =>{
    //hides everything but the start button and the valorant image
    $("#images").children().hide()
    $("#buttons").children().hide()
    $("#startBtn").show()
    $("#Valorant").show()
    //gives the player a choice on phoenix or sage
    $("#startBtn").on("click", () =>{
        $("#PhoenixBtn").show();
        $("#SageBtn").show();
        $("#startBtn").hide();
        $("#Valorant").hide();
        $("#txt").hide();
        $("#text1").text(`Who will ${userName} choose?`);
    })
//shows the player what the picked, turnes hero from an array of objects to a single object
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
//puts the player in combat mode with cypher, cypher strikes first
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
//tells the player that nothing is here
    $("#MidBtn").on("click", () =>{
        $("#BG-helper").show();
        $("#Sage").hide();
        $("#Phoenix").hide();
        $("#MidBtn").hide();
        $("#C-linkBtn").hide();
        $("#LobbyBtn").show();
        $("#text1").text("No one seems to be here");
    })
//tells the player that nothing is here as well
    $("#LobbyBtn").on("click", () =>{
        $("#LobbyBtn").hide();
        $("#text1").text("nobody is here either")
        $("#LongBtn").show()
    })
//puts the player in combat with jett
    $("#LongBtn").on("click", () =>{
        enemy = 4
        $("#text1").text(`${enemies[enemy].Name} attacked ${hero.Name}`)
        $("#Jett").show()
        Combat();
        $("#LongBtn").hide();
        $("#C-siteBtn").show()
    })
    //puts the player in combat with yoru and killjoy, you fight killjoy before yoru
    $("#C-siteBtn").on("click", () =>{
        $("#text1").text(`KillJoy and Breach attack ${hero.Name}`);
        $("#images").children().hide();
        $("#Killjoy").show();
        $("#Yoru").show()
        $("#text1").text(`Defuse or wait?`)
        $("#C-siteBtn").hide();
        $("#WaitBtn").show();
        $("#DefuseBtn").show();
        enemy = 2;
        Combat();
        enemy= 3;
        Combat();
        $("#text1").text(`Killjoy and Yoru were defeated`)
        $("#text2").text("Defuse or wait")
    })
//makes the enemy you didn't kill fight you, they strike first
    $("#DefuseBtn").on("click", () =>{
        $("#images").children().hide();
        $("#WaitBtn").hide();
        $("#DefuseBtn").hide();
        $("#DefuseBtn2").show();
        $("#WaitBtn2").show();
        enemyStrikeFirst = true;
        if(enemies[4].HP >=0){
            enemy = 4;
            $("#text1").text(`${enemies[enemy].Name} attacked ${hero.Name}`)
            $("#Jett").show();
            $("#Cypher").hide();
            Combat();
        }
        if(enemies[4].HP >=0){
            enemy = 4;
            $("#text1").text(`${enemies[enemy].Name} attacked ${hero.Name}`)
            $("#Jett").show();
            $("#Cypher").hide();
            Combat();
        }
        $("#text2").text("Defuse or wait")
    })
    //makes the enemy you didn't kill fight you
    $("#WaitBtn").on("click", () =>{
        $("#images").children().hide();
        $("#WaitBtn").hide();
        $("#DefuseBtn").hide();
        $("#DefuseBtn2").show();
        $("#WaitBtn2").show();
        if(enemies[4].HP >=0){
            enemy = 4;
            $("#text1").text(`${hero.Name} attacked ${enemies[enemy].Name}`)
            $("#Jett").show();
            $("#Cypher").hide();
            Combat();
        }
        if(enemies[4].HP >=0){
            enemy = 4;
            $("#text1").text(`${hero.Name} attacked ${enemies[enemy].Name}`)
            $("#Jett").show();
            $("#Cypher").hide();
            Combat();
        }
        $("#text2").text("Defuse or wait")
    //if you defuse, High ping breach will attack and instakill you
    })
    $("#DefuseBtn2").on("click", () =>{
        enemy = 2
        $("#text1").text(`${enemies[enemy].Name} somehow walked in and killed you instantly due to ping`)
        hero.HP = 0;
        $("#text2").text("Game over");
        $("#buttons").children().hide()
        $("#images").children().hide()
        $("#Breach").show();
        $("#HP-text").text(`${hero.HP} HP left`);
    })
    //Breach will DC, and the player is free to defuse
    $("#WaitBtn2").on("click", () =>{
        $("#text1").text(`High ping Breach disconnected`)
        $("#DefuseBtn2").hide();
        $("#WaitBtn2").hide();
        $("#DefuseBtn3").show();
        $("#WaitBtn3").show();
        $("#images").children().hide();
        $("#Breach").show()
    })
    //victory button
    $("#DefuseBtn3").on("click", () =>{
        $("#buttons").children().hide();
        $("#images").children().hide();
        $("#text1").text(`VICTORY! ${userName} defused the spike`);
        $("#text2").hide();
    })
    //defeat button
    $("#WaitBtn3").on("click", () =>{
        $("#images").children().hide();
        $("#buttons").children().hide();
        $("text2").hide();
        $("#text1").text(`${hero.Name} waited too long and let the spike explode`)
        $("#text2").text("GAME OVER")
        $("#HP-text").text("0 HP left")
    })
})
