//Fishing functions
function showHour (){
	var position = 100;
	var icon = game.add.sprite(width/2-150, position, 'icon');
			icon.scale.setTo(scale, scale);
			icon.smoothed = false;
			icon.frame = 1;
	var icon1 = game.add.sprite(width/2-110, position, 'icon');
			icon1.scale.setTo(scale, scale);
			icon1.smoothed = false;
			icon1.frame = 1;
	var icon2 = game.add.sprite(width/2-70, position, 'icon');
			icon2.scale.setTo(scale, scale);
			icon2.smoothed = false;
			icon2.frame = 13;
	var icon3 = game.add.sprite(width/2-30, position, 'icon');
			icon3.scale.setTo(scale, scale);
			icon3.smoothed = false;
			icon3.frame = 1;
	var icon4 = game.add.sprite(width/2+10, position, 'icon');
			icon4.scale.setTo(scale, scale);
			icon4.smoothed = false;
			icon4.frame = 1;
	var icon5 = game.add.sprite(width/2+50, position, 'icon');
			icon5.scale.setTo(scale, scale);
			icon5.smoothed = false;
			icon5.frame = 11;
}
function fishing (){
	if(phoneOn < 0){
		for(var x = 0; x < FishList.length; x++){
			if((Math.ceil(vein.scale.y) == Math.ceil(scale*16))&&(weather == FishList[x].weather1 || weather == FishList[x].weather2)&& (time > FishList[x].timeOfDayMin && time < FishList[x].timeOfDayMax)&&Math.random()<0.01){
				FishInfo = {
					id: 0,
					weight : 0,
					frame : 0,
					weightRound : function(){
						this.weight = Math.round(this.weight * 100) / 100;
					},
				}
				FishInfo.id = x;
				FishInfo.weight = Math.random() * (FishList[x].weightMax - FishList[x].weightMin) + FishList[x].weightMin;
				FishInfo.weightRound();
				FishInfo.frame = FishList[x].frame;
				fish.frame = FishInfo.frame;
				caught++;
				console.log("U caught: " + FishList[x].name + " with weight: " + FishInfo.weight);
				fishRun();
			}
		}
	}
}
function fishRun (){
	veinDistance(2);
	if(Math.floor(distance/7) >= 12){
		caught = 3;
	}
	
	if(rolling == true){
		if(Math.floor(distance/7) <= 2){
			caught = 3;
		}
		else caught++;
	}
}
function fightWithFish (){
	if(rolling == true){
		veinTension(3)
		veinDistance(-1)
	}
	else{
		veinTension(-4)
		veinDistance(1)
	}
	if(tension < 0)tension = 0;
	if((Math.floor(distance/7) >= 12 )||( Math.floor(tension/7) >= 12)){
		caught = 3;
	}
	
	if(Math.floor(tension/7) >= 12){
		tension = 0;
		caught = 3;
	}
	if(distance <= 0){
		fishRestart ();
		tension = 0;
		caught = 4;
	}
}
function breakVein (){
	veinDistance(-1);
	tension = 0;
	barS.frame = 0;
	if(distance == 0) caught = 0;
}
function takingOut (){
	fishTake.start();
	veinClose.start();

//	if(rolling == true) caught = 0;
	distance = 0;
	barE.frame = 0;
	barS.frame = 0;
	popupShow.start();
}
function veinDistance (x){
	distance +=x;
	barE.frame = Math.floor(distance/7);
	vein.angle = (distance*-1)*0.5;
	if(distance == 0) vein.scale.setTo(1, scale*16);
	else vein.scale.setTo(1, 200);
}
function veinTension (x){
	tension +=x;
	barS.frame = Math.floor(tension/7);
}
function retire(){
	if(rolling == true){
		veinUp.start();
		fishOut.start();
		caught = 0;
	}
}
function popupScreenHide (){
	popupHide.start();
	Backpack.fish[Backpack.fish.length] = FishInfo;
	caught = 5;
}
function fishRestart (){
	fish.x = 39*scale;
	fish.y = height;
	fish.angle = 90;
}

//Wheather and time functions
function cloudsGenerate (){
	for(var x = 0; x < 10; x++){
		cloudsObj[x] = new cloud(x);
		cloudsObj[x].generate();
	}
}
function cloudsGo (){
	for(var x = 0; x < 10; x++){
		cloudsObj[x].move();
	}
}
function timeChange (){
	time++;
	if(time > 24000)time = 0;
	if(time == 18200)goNight.start();
	if(time == 6000)goDay.start();
}

//Gui
function guiCreate (){
		barE = game.add.sprite(width/2, 20*scale, 'bar');
		barE.anchor.set(0.5, 0);
		barE.scale.setTo(scale, scale);
		barE.smoothed = false;
		barE.frame = 0;

		barS = game.add.sprite(width/2, 35*scale, 'bar');
		barS.anchor.set(0.5, 0);
		barS.scale.setTo(scale, scale);
		barS.smoothed = false;
		barS.frame = 0;
	
		popup = game.add.sprite(-width, 50*scale, 'popup');
		popup.anchor.set(0.5, 0);
		popup.scale.setTo(scale, scale);
		popup.smoothed = false;
		popupShow = game.add.tween(popup).to( { x: width/2 }, 1000, "Quart.easeOut", false, 0);
		popupHide = game.add.tween(popup).to( { x: -width }, 1000, "Quart.easeOut", false, 0);
		popup.addChild(game.make.sprite(-35, 40, 'fish'));
		
		popupClose = game.add.button(25, 10, 'button', popupScreenHide, this, 1, 1, 1);
		popupClose.anchor.set(0.5);
		popupClose.smoothed = false;
		popup.addChild(popupClose);
	
		button = game.add.button(width/2, height-20, 'button', actionOnClick, this, 0, 1, 2);
		button.anchor.set(0.5, 1);
		button.scale.setTo(scale, scale);
		button.smoothed = false;
}

//Phone functions
function actionOnClick () {
    if(phoneOn < 0){
		phoneShow.start();
	}
	else{
		phoneHide.start();
	}
	phoneOn *= -1;
}
function openMenu(){
	smartScreenOpen.start();
}
function smartCreate (){
	smart = game.add.sprite(0, height, 'smart');
	smart.scale.setTo(scale, scale);
	smart.smoothed = false;
//	smart.visible =! smart.visible;
	
	phoneShow = game.add.tween(smart).to( { y: 0 }, 1000, "Quart.easeOut");
	phoneHide = game.add.tween(smart).to( { y: height }, 1000, "Quart.easeOut");
	
//	smartHello = game.add.sprite(0, 0, 'smartScreen');
//	smartHello.smoothed = false;
//	smart.addChild(smartHello);
	
	openMenuButton = game.add.button(smart.width/(2*scale) + 25 * x, 130, 'smartIcons', openMenu, this, 16, 16, 16, 16);
	smart.addChild(openMenuButton);
	
	smartScreen = game.add.sprite(0, 0, 'smartScreen');
	smartScreen.smoothed = false;
	smart.addChild(smartScreen);
	smartScreen.alpha = 0;
	smartScreenOpen = game.add.tween(smartScreen).to( { alpha: 1 }, 200, "Quart.easeOut", false, 0);

	var smartButton = [];
	var buttonPosition = 0;
	for(var x = -1; x < 2; x++){
		for(var y = -1; y < 3; y++){
			smartButton[buttonPosition] = game.add.button(smart.width/(2*scale) + 25 * x, smart.height/(2.5*scale)+ 25 * y, 'smartIcons', actionOnClick, this, buttonPosition, buttonPosition, buttonPosition, buttonPosition);
			smartButton[buttonPosition].smoothed = false;
			smartButton[buttonPosition].anchor.set(0.5);
			smartScreen.addChild(smartButton[buttonPosition]);
			buttonPosition++;
		}
	}
}