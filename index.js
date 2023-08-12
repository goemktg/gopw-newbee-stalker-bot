const { Client, Events, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const cron = require("node-cron")
 
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	client.user.setActivity('뉴비', { type: ActivityType.Watching });

	if (process.env.DEBUG === "true")
		processKillmail(process.env.DEBUG === "true");
});

var isJobRunning = false;

cron.schedule("*/10 * * * * *", async function () {
	if (!(process.env.DEBUG === "true"))
		processKillmail();
	});

async function processKillmail(debug = false) {
	if (isJobRunning)
		return;
	//console.log("running a task every 10 seconds");
	isJobRunning = true;
	// redisq zkillboard api 
	// retives one killmail at one time
	// job flow
	// 1) 10초마다 받아옴
	// 2) 킬메일 받아오기 시작. 2-1) 혹은 2-2) 로 감
	// 2-1) 킬메일 존재할 경우 꼽 아이디 확인 후 2로 돌아감
	// 2-2) 킬메일 없을 경우 1)로 돌아감 (10초 대기)

	var isKillmailExist = true;

	while (isKillmailExist) {
		var killboardResponse = await fetch("https://redisq.zkillboard.com/listen.php", { method: "GET"} );
		var redisqData = await JSON.parse(await killboardResponse.text());

		if (debug) {
			killboardResponse = '{"package":{"killID":110946162,"killmail":{"attackers":[{"damage_done":239865,"faction_id":500021,"final_blow":false,"security_status":0,"ship_type_id":30212},{"character_id":91266835,"corporation_id":98438347,"damage_done":24964,"final_blow":true,"security_status":-0.3,"ship_type_id":29988,"weapon_type_id":29988},{"character_id":90803088,"corporation_id":98578021,"damage_done":8633,"final_blow":false,"security_status":-1.6,"ship_type_id":29986,"weapon_type_id":29986},{"character_id":322718659,"corporation_id":98578021,"damage_done":6798,"final_blow":false,"security_status":5,"ship_type_id":29986,"weapon_type_id":27401},{"character_id":90273223,"corporation_id":98438347,"damage_done":5864,"final_blow":false,"security_status":-0.8,"ship_type_id":29988,"weapon_type_id":2446},{"character_id":2113436920,"corporation_id":98739488,"damage_done":966,"faction_id":500003,"final_blow":false,"security_status":4.7,"ship_type_id":47466,"weapon_type_id":47466},{"character_id":450024655,"corporation_id":98490492,"damage_done":832,"final_blow":false,"security_status":5,"ship_type_id":29988,"weapon_type_id":2466}],"killmail_id":110946162,"killmail_time":"2023-08-12T12:57:09Z","solar_system_id":31001074,"victim":{"alliance_id":1220922756,"character_id":2120222883,"corporation_id":98691843,"damage_taken":287922,"items":[{"flag":14,"item_type_id":8135,"quantity_destroyed":1,"singleton":0},{"flag":5,"item_type_id":30013,"quantity_destroyed":8,"singleton":0},{"flag":20,"item_type_id":41054,"quantity_destroyed":1,"singleton":0},{"flag":25,"item_type_id":16535,"quantity_dropped":1,"singleton":0},{"flag":5,"item_type_id":33474,"quantity_destroyed":1,"singleton":0},{"flag":94,"item_type_id":26086,"quantity_destroyed":1,"singleton":0},{"flag":30,"item_type_id":24507,"quantity_destroyed":10,"singleton":0},{"flag":33,"item_type_id":24507,"quantity_destroyed":10,"singleton":0},{"flag":32,"item_type_id":33450,"quantity_dropped":1,"singleton":0},{"flag":16,"item_type_id":8135,"quantity_destroyed":1,"singleton":0},{"flag":27,"item_type_id":16475,"quantity_dropped":1,"singleton":0},{"flag":5,"item_type_id":4613,"quantity_dropped":1,"singleton":0},{"flag":28,"item_type_id":33450,"quantity_dropped":1,"singleton":0},{"flag":5,"item_type_id":33475,"quantity_dropped":1,"singleton":0},{"flag":29,"item_type_id":24507,"quantity_destroyed":10,"singleton":0},{"flag":28,"item_type_id":24507,"quantity_destroyed":10,"singleton":0},{"flag":11,"item_type_id":1248,"quantity_destroyed":1,"singleton":0},{"flag":29,"item_type_id":33450,"quantity_destroyed":1,"singleton":0},{"flag":5,"item_type_id":76114,"quantity_destroyed":6,"singleton":0},{"flag":32,"item_type_id":24507,"quantity_destroyed":10,"singleton":0},{"flag":33,"item_type_id":33450,"quantity_dropped":1,"singleton":0},{"flag":92,"item_type_id":26374,"quantity_destroyed":1,"singleton":0},{"flag":24,"item_type_id":2281,"quantity_destroyed":1,"singleton":0},{"flag":5,"item_type_id":24507,"quantity_destroyed":15366,"singleton":0},{"flag":30,"item_type_id":33450,"quantity_dropped":1,"singleton":0},{"flag":31,"item_type_id":24507,"quantity_destroyed":10,"singleton":0},{"flag":12,"item_type_id":1248,"quantity_destroyed":1,"singleton":0},{"flag":15,"item_type_id":8135,"quantity_destroyed":1,"singleton":0},{"flag":5,"item_type_id":28668,"quantity_dropped":17,"singleton":0},{"flag":87,"item_type_id":31890,"quantity_destroyed":2,"singleton":0},{"flag":87,"item_type_id":31890,"quantity_dropped":3,"singleton":0},{"flag":22,"item_type_id":2281,"quantity_dropped":1,"singleton":0},{"flag":87,"item_type_id":31894,"quantity_destroyed":3,"singleton":0},{"flag":87,"item_type_id":31894,"quantity_dropped":2,"singleton":0},{"flag":93,"item_type_id":4397,"quantity_destroyed":1,"singleton":0},{"flag":17,"item_type_id":2048,"quantity_dropped":1,"singleton":0},{"flag":21,"item_type_id":13953,"quantity_destroyed":1,"singleton":0},{"flag":19,"item_type_id":5443,"quantity_dropped":1,"singleton":0},{"flag":5,"item_type_id":17938,"quantity_dropped":1,"singleton":0},{"flag":31,"item_type_id":33450,"quantity_dropped":1,"singleton":0},{"flag":87,"item_type_id":2488,"quantity_destroyed":4,"singleton":0},{"flag":87,"item_type_id":2488,"quantity_dropped":2,"singleton":0},{"flag":23,"item_type_id":41218,"quantity_destroyed":1,"singleton":0},{"flag":13,"item_type_id":1248,"quantity_destroyed":1,"singleton":0}],"position":{"x":-106675567338.35883,"y":-53284704281.52799,"z":637580135899.0309},"ship_type_id":47466}},"zkb":{"locationID":40406890,"hash":"df5710fe59fd96e09cbaa381cd52906bc7f919a6","fittedValue":374428881.32,"droppedValue":43312011.33,"destroyedValue":378840295.1,"totalValue":422152306.43,"points":7,"npc":false,"solo":false,"awox":false,"labels":["cat:6","#:5+","pvp","loc:w-space"],"href":"https://esi.evetech.net/v1/killmails/110946162/df5710fe59fd96e09cbaa381cd52906bc7f919a6/"}}}'
			redisqData = JSON.parse(killboardResponse);
		}

		if (redisqData.package == null)
			isKillmailExist = false;
		else {
			if (debug)
				console.log(redisqData.package);

			console.log('process: '+redisqData.package.killID);
		
			// create attacker db
			var newbeeAttackerIDs = new Array();
			for (let element of redisqData.package.killmail.attackers) {
				if (debug)
					console.log(element);

				if (element.corporation_id == 98578021 || element.final_blow == true && redisqData.package.killmail.victim.corporation_id == 98578021) {
					newbeeAttackerIDs.push(element);
				}
			}
		
			// check victim
			if (redisqData.package.killmail.victim.corporation_id == 98578021)
				pushKillmailMsg(redisqData.package, 'lost', newbeeAttackerIDs);
			// check attackers
			else if (newbeeAttackerIDs.length)
				pushKillmailMsg(redisqData.package, 'killed', newbeeAttackerIDs);
		}

		if (debug)
			break;
	}
	
	isJobRunning = false;
}

async function pushKillmailMsg(package, type, newbeeAttackerIDs) {
	// make using id as array
	var idMap = new Map();
	idMap.set(package.killmail.victim.ship_type_id, null);
	idMap.set(package.killmail.victim.character_id, null);
	idMap.set(package.killmail.solar_system_id, null);

	for (let element of newbeeAttackerIDs) {
		console.log('element:');
		console.log(element);
		
		idMap.set(element.character_id, null);
		idMap.set(element.ship_type_id, null);
		idMap.set(element.weapon_type_id, null);
	}
	
	const postData = JSON.stringify( Array.from(idMap.keys()) );
	console.log('post: '+postData);

	// get name resolved
	const EsiResponse = await fetch("https://esi.evetech.net/latest/universe/names/?datasource=tranquility", { method: "POST", headers: { 'User-Agent': 'Maintainer: Goem Funaila(IG) samktg52@gmail.com' }, body: postData } )
	const EsiData = await JSON.parse(await EsiResponse.text());

	//console.log('Esi: ')
	//console.log(EsiData);

	// apply esi data
	for (let element of EsiData) {
		idMap.set(element.id, element.name);
	}
	//console.log(idMap);

	//                                      true : false
	let embedColor = (type == 'lost') ? 0xFF0000 : 0x00FFFF
	//console.log(embedColor);
	//                  Kill: Goem Funaila (Keres)
	const embedTitle = 'Kill: '+idMap.get(package.killmail.victim.character_id)+' ('+idMap.get(package.killmail.victim.ship_type_id)+')';
	//console.log(embedTitle);

	const killmailEmbed = new EmbedBuilder()
		.setColor(embedColor)
		.setTitle(embedTitle)
		.setURL('https://zkillboard.com/kill/'+package.killmail.killmail_id+'/')
		.setDescription('**Location:** \n'+idMap.get(package.killmail.solar_system_id))
		.setThumbnail('https://images.evetech.net/types/'+package.killmail.victim.ship_type_id+'/render?size=128')
		.addFields(
			{ name: 'newbee '+type+':', value: idMap.get(package.killmail.victim.character_id)+' flying in a **'+idMap.get(package.killmail.victim.ship_type_id)+'**' },
		);
	
	var isFristElement = true;
	for (let element of newbeeAttackerIDs) {
		var fieldName = '\u200b';

		if (isFristElement) {
			fieldName = 'contributers:';
			isFristElement = false;
		}

		killmailEmbed.addFields({ name: fieldName, value: '**'+idMap.get(element.character_id)+'** flying in a '+getShipAndWeaponString(idMap.get(element.ship_type_id), idMap.get(element.weapon_type_id)), inline: true })
	}

	killmailEmbed.addFields({ name: '\u200b', value: '**Total '+getPriceString(package.zkb.totalValue)+' ISK**, Droped '+getPriceString(package.zkb.droppedValue)+' ISK' });

	client.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send({
		content: '뉴비 연관 킬메일 발생!',
		embeds: [killmailEmbed],
		});
}

function getPriceString(rawKillmailPrice) {
	if (rawKillmailPrice >= 1000000000) // 1b 이상
		return (rawKillmailPrice / 1000000000).toFixed(2).toLocaleString()+'B';
	else if (rawKillmailPrice >= 1000000) // 1m 이상
		return (rawKillmailPrice / 1000000).toFixed(2).toLocaleString()+'M';
	else
		return rawKillmailPrice.toFixed(2).toLocaleString();
}

function getShipAndWeaponString(ship, weapon) {
	var returnString = '';

	returnString = returnString + ship;
	if (ship == weapon)
		return returnString;

	return returnString + ' with ' + weapon;
}