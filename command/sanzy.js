require('../command/config')
var { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
var fs = require('fs')
var util = require('util')
var chalk = require('chalk')
var { exec, spawn, execSync } = require("child_process")
var axios = require('axios')
var { fromBuffer } = require('file-type')
var path = require('path')
var os = require('os')
var request = require('request')
var speed = require('performance-now')
var fetch = require('node-fetch')
var { performance } = require('perf_hooks')
var { yta, ytv, servers } = require('../command/y2mate')
var { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('../message/myfunc')
var database = require('../json/database.json')
var nomorbot = '6288973004570'
var simbol = '»'
var setting = require('../json/setting.json')
let {
ownername,
ownernomer,
myweb,
myapi,
botname,
donasi
} = setting

//━━━━━━━━━━━━━━━[ MODULE EXPORTS ]━━━━━━━━━━━━━━━━━//
let vote = []

module.exports = sanzy = async (sanzy, m, chatUpdate) => {
try {
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? m.message.buttonsResponseMessage.selectedButtonId : ''
var budy = (typeof m.text == 'string' ? m.text : '')
var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
var isCmd = body.startsWith(prefix)
var command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()        
var isGroup = m.key.remoteJid.endsWith('@g.us')
var sender = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
var args = body.trim().split(/ +/).slice(1)
var pushname = m.pushName || "No Name"
var isCreator = [sanzy.user.id, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
var itsMe = m.sender == sanzy.user.id ? true : false
var isOwner = ownernomer.includes(m.sender)
var text = q = args.join(" ")
var quoted = m.quoted ? m.quoted : m
var mime = (quoted.msg || quoted).mimetype || ''
var isMedia = /image|video|sticker|audio/.test(mime)
var groupMetadata = m.isGroup ? await sanzy.groupMetadata(m.chat).catch(e => {}) : ''
var groupName = m.isGroup ? groupMetadata.subject : ''
var groupMembers = isGroup ? groupMetadata.participants : ''
var participants = m.isGroup ? await groupMetadata.participants : ''
var groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
var isBotAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
var isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

//━━━━━━━━━━━━━━━[ STATUS BOT ]━━━━━━━━━━━━━━━━━//

var used = process.memoryUsage()
var cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
var cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})

//━━━━━━━━━━━━━━━[ FUNCTION ANTILINK ]━━━━━━━━━━━━━━━━━//
//ANTILINK

if (m.isGroup && !m.key.fromMe && !isGroupAdmins && !isBotAdmins){
if (budy.includes(`https://chat.whatsapp.com`)) {
sanzy.sendMessage(m.chat, {text: `*Antilink Group Terdeteksi*\n\nKamu akan dikeluarkan dari group ${groupMetadata.subject}`}, {quoted:m})
await sanzy.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}
//━━━━━━━━━━━━━━━[ SELF AND PUBLIC ]━━━━━━━━━━━━━━━━━//

if (!sanzy.public) {
if (!m.key.fromMe) return 
}

//━━━━━━━━━━━━━━━[ SUIT PVP ]━━━━━━━━━━━━━━━━━//
//suit PvP
this.suit = this.suit ? this.suit : {}
	    let roof = Object.values(this.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender))
	    if (roof) {
	    let win = ''
	    let tie = false
	    if (m.sender == roof.p2 && /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
	    if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
	    sanzy.sendTextWithMentions(m.chat, `@${roof.p2.split`@`[0]} menolak suit, suit dibatalkan`, m)
	    delete this.suit[roof.id]
	    return !0
	    }
	    roof.status = 'play'
	    roof.asal = m.chat
	    clearTimeout(roof.waktu)
	    //delete roof[roof.id].waktu
	    sanzy.sendText(m.chat, `Suit telah dikirimkan ke chat

@${roof.p.split`@`[0]} dan 
@${roof.p2.split`@`[0]}

Silahkan pilih suit di chat masing"
klik https://wa.me/${nomorbot.split`@`[0]}`, m, { mentions: [roof.p, roof.p2] })
	    if (!roof.pilih) sanzy.sendText(roof.p, `Silahkan pilih \n\nBatu\nKertas\nGunting`, m)
	    if (!roof.pilih2) sanzy.sendText(roof.p2, `Silahkan pilih \n\nBatu\nKertas\nGunting`, m)
	    roof.waktu_milih = setTimeout(() => {
	    if (!roof.pilih && !roof.pilih2) sanzy.sendText(m.chat, `Kedua pemain tidak niat main,\nSuit dibatalkan`)
	    else if (!roof.pilih || !roof.pilih2) {
	    win = !roof.pilih ? roof.p2 : roof.p
	    sanzy.sendTextWithMentions(m.chat, `@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]} tidak memilih suit, game berakhir`, m)
	    }
	    delete this.suit[roof.id]
	    return !0
	    }, roof.timeout)
	    }
	    let jwb = m.sender == roof.p
	    let jwb2 = m.sender == roof.p2
	    let g = /gunting/i
	    let b = /batu/i
	    let k = /kertas/i
	    let reg = /^(gunting|batu|kertas)/i
	    if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
	    roof.pilih = reg.exec(m.text.toLowerCase())[0]
	    roof.text = m.text
	    m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih2 ? `\n\nMenunggu lawan memilih` : ''}`)
	    if (!roof.pilih2) sanzy.sendText(roof.p2, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
	    }
	    if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
	    roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
	    roof.text2 = m.text
	    m.reply(`Kamu telah memilih ${m.text} ${!roof.pilih ? `\n\nMenunggu lawan memilih` : ''}`)
	    if (!roof.pilih) sanzy.sendText(roof.p, '_Lawan sudah memilih_\nSekarang giliran kamu', 0)
	    }
	    let stage = roof.pilih
	    let stage2 = roof.pilih2
	    if (roof.pilih && roof.pilih2) {
	    clearTimeout(roof.waktu_milih)
	    if (b.test(stage) && g.test(stage2)) win = roof.p
	    else if (b.test(stage) && k.test(stage2)) win = roof.p2
	    else if (g.test(stage) && k.test(stage2)) win = roof.p
	    else if (g.test(stage) && b.test(stage2)) win = roof.p2
	    else if (k.test(stage) && b.test(stage2)) win = roof.p
	    else if (k.test(stage) && g.test(stage2)) win = roof.p2
	    else if (stage == stage2) tie = true
	    sanzy.sendText(roof.asal, `_*Hasil Suit*_${tie ? '\nSERI' : ''}

@${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` Menang \n` : ` Kalah \n`}
@${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` Menang \n` : ` Kalah \n`}
`.trim(), m, { mentions: [roof.p, roof.p2] })
	    delete this.suit[roof.id]
	    }
	    }
	
	
//━━━━━━━━━━━━━━━[ CONSOLE MESSAGE ]━━━━━━━━━━━━━━━━━//

if (m.message) {
console.log(chalk.black(chalk.bgWhite('[ Nakata Z ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
}

//━━━━━━━━━━━━━━━[ SEND MESSAGE ]━━━━━━━━━━━━━━━━━//

var sendMess = (from, teks) => {
return sanzy.sendMessage(from, { text: teks })
}
var sendFileFromUrl = async (from, url, caption, msg, men) => {
let mime = '';
let res = await axios.head(url)
mime = res.headers['content-type']
if (mime.split("/")[1] === "gif") {
return sanzy.sendMessage(m.chat, { video: await convertGif(url), caption: caption, gifPlayback: true, mentions: men ? men : []}, {quoted: m})
}
let type = mime.split("/")[0]+"Message"
if(mime.split("/")[0] === "image"){
return sanzy.sendMessage(m.chat, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
} else if(mime.split("/")[0] === "video"){
return sanzy.sendMessage(m.chat, { video: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
} else if(mime.split("/")[0] === "audio"){
return sanzy.sendMessage(m.chat, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: m })
} else {
return sanzy.sendMessage(m.chat, { document: await getBuffer(url), mimetype: mime, caption: caption, mentions: men ? men : []}, {quoted: m })
}
}

sanzy.sendReadReceipt(m.chat, sender, [m.key.id])        

//━━━━━━━━━━━━━━━[ FAKE ]━━━━━━━━━━━━━━━━━//

const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us"}, "message": {orderMessage: {itemCount: 2021,status: 200, thumbnail: fs.readFileSync('./image/sanzy2.jpg'), surface: 200, message: `Nakata`, orderTitle: 'Please Subscribe Youtube Nakata Z', sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
		
//━━━━━━━━━━━━━━━[ FITURNYA ]━━━━━━━━━━━━━━━━━//
        
switch(command) {

case 'menu': case 'help': {
txt =` Hai Kak ${pushname}
┌──⭓Group Menu
│
│ ${simbol} ${prefix}revoke
│ ${simbol} ${prefix}add
│ ${simbol} ${prefix}kick
│ ${simbol} ${prefix}promote
│ ${simbol} ${prefix}demote
│ ${simbol} ${prefix}setname
│ ${simbol} ${prefix}setprofile
│ ${simbol} ${prefix}group
│ ${simbol} ${prefix}linkgroup
│ ${simbol} ${prefix}hidetag
│ ${simbol} ${prefix}tagall
│ ${simbol} ${prefix}totag
│ ${simbol} ${prefix}delete
│
└───────⭓

┌──⭓Islamic Menu
│
│ ${simbol} ${prefix}iqra
│ ${simbol} ${prefix}hadist
│ ${simbol} ${prefix}alquran
│ ${simbol} ${prefix}juzamma
│ ${simbol} ${prefix}tafsirsurah
│
└───────⭓

┌──⭓Sticker Menu
│
│ ${simbol} ${prefix}sticker
│ ${simbol} ${prefix}smeme
│ ${simbol} ${prefix}togif
│ ${simbol} ${prefix}tomp4
│ ${simbol} ${prefix}tomp3
│ ${simbol} ${prefix}toimage
│ ${simbol} ${prefix}emojimix
│
└───────⭓

┌──⭓Audio Menu
│
│ ${simbol} ${prefix}tovn
│ ${simbol} ${prefix}bass
│ ${simbol} ${prefix}blown
│ ${simbol} ${prefix}deep
│ ${simbol} ${prefix}earrape
│ ${simbol} ${prefix}fast
│ ${simbol} ${prefix}fat
│ ${simbol} ${prefix}earrape
│ ${simbol} ${prefix}reverse
│ ${simbol} ${prefix}robot
│ ${simbol} ${prefix}slow
│ ${simbol} ${prefix}smooth
│ ${simbol} ${prefix}tupai
│
└───────⭓

┌──⭓Owner Menu
│
│ ${simbol} ${prefix}block
│ ${simbol} ${prefix}unblock
│ ${simbol} ${prefix}eval
│ ${simbol} ${prefix}public
│ ${simbol} ${prefix}join
│ ${simbol} ${prefix}leave
│ ${simbol} ${prefix}self
│ ${simbol} ${prefix}ping
│ ${simbol} ${prefix}owner
│
└───────⭓
┌──⭓Islami Menu
│
│ ${simbol} ${prefix}doaharian
│ ${simbol} ${prefix}tahlil
│ ${simbol} ${prefix}wirid
│ ${simbol} ${prefix}ayatkursi
│ ${simbol} ${prefix}bacaansholat
│ ${simbol} ${prefix}niatsholat
│ ${simbol} ${prefix}asmaulhusna
│
└───────⭓

┌──⭓Anime Menu 
│
│ ${simbol} ${prefix}kusonimesearch
│ ${simbol} ${prefix}manggatoon
│ ${simbol} ${prefix}chara
│ ${simbol} ${prefix}anime
│
└───────⭓

┌──⭓Downloader Menu
│
│ ${simbol} ${prefix}ytmp4
│ ${simbol} ${prefix}ytmp3
│ ${simbol} ${prefix}ytplay
│ ${simbol} ${prefix}tiktokdl
│ ${simbol} ${prefix}mediafiredl
│ ${simbol} ${prefix}igfoto
│ ${simbol} ${prefix}igvideo
│ ${simbol} ${prefix}gitclone
│
└───────⭓

┌──⭓Random Menu
│
│ ${simbol} ${prefix}katabijak
│ ${simbol} ${prefix}fakta
│ ${simbol} ${prefix}motivasi
│ ${simbol} ${prefix}quotes
│ ${simbol} ${prefix}bucin
│ ${simbol} ${prefix}pantun
│ ${simbol} ${prefix}cerpen
│ ${simbol} ${prefix}quotesanime
│
└───────⭓

┌──⭓Image Maker
│
│ ${simbol} ${prefix}ttp
│ ${simbol} ${prefix}blackpink
│ ${simbol} ${prefix}neon
│ ${simbol} ${prefix}matrix
│ ${simbol} ${prefix}joker
│ ${simbol} ${prefix}devil
│ ${simbol} ${prefix}transformer
│ ${simbol} ${prefix}thunder
│ ${simbol} ${prefix}harry
│ ${simbol} ${prefix}gradient
│ ${simbol} ${prefix}3dchristmas
│ ${simbol} ${prefix}3ddeepsea
│ ${simbol} ${prefix}americanflag
│ ${simbol} ${prefix}3dscifi
│ ${simbol} ${prefix}3drainbow
│ ${simbol} ${prefix}3dwaterpipe
│ ${simbol} ${prefix}halloweenskeleton
│ ${simbol} ${prefix}sketch
│ ${simbol} ${prefix}bluecircuit
│ ${simbol} ${prefix}space
│ ${simbol} ${prefix}metallic
│ ${simbol} ${prefix}fiction
│ ${simbol} ${prefix}greenhorror
│ ${simbol} ${prefix}transformer
│ ${simbol} ${prefix}berry
│ ${simbol} ${prefix}thunder
│ ${simbol} ${prefix}magma
│ ${simbol} ${prefix}3dcrackedstone
│ ${simbol} ${prefix}3dneonlight
│ ${simbol} ${prefix}impressiveglitch
│ ${simbol} ${prefix}naturalleaves
│ ${simbol} ${prefix}fireworksparkle
│ ${simbol} ${prefix}matrix
│ ${simbol} ${prefix}dropwater
│ ${simbol} ${prefix}harrypotter
│ ${simbol} ${prefix}foggywindow
│ ${simbol} ${prefix}neondevils
│ ${simbol} ${prefix}christmasholiday
│ ${simbol} ${prefix}3dgradient
│ ${simbol} ${prefix}blackpink
│ ${simbol} ${prefix}gluetext
│
└───────⭓

┌──⭓Ephoto Menu
│
│${simbol} ${prefix}ffcover
│${simbol} ${prefix}crossfire
│${simbol} ${prefix}galaxy
│${simbol} ${prefix}glass
│${simbol} ${prefix}neon
│${simbol} ${prefix}beach
│${simbol} ${prefix}blackpink
│${simbol} ${prefix}igcertificate
│${simbol} ${prefix}ytcertificate
│
└───────⭓

┌──⭓Photo Oxy Menu
│
│ ${simbol} ${prefix}shadow
│ ${simbol} ${prefix}romantic
│ ${simbol} ${prefix}smoke
│ ${simbol} ${prefix}burnpapper
│ ${simbol}  ${prefix}naruto
│ ${simbol} ${prefix}lovemsg
│ ${simbol} ${prefix}grassmsg
│ ${simbol} ${prefix}lovetext
│ ${simbol} ${prefix}coffecup
│ ${simbol} ${prefix}butterfly
│ ${simbol} ${prefix}harrypotter
│ ${simbol} ${prefix}retrolol
│
└───────⭓

┌──⭓Fun Menu
│
│ ${simbol} ${prefix}suitpvp [@tag]
│ ${simbol} ${prefix}tebak [option]
│ ${simbol} ${prefix}halah
│ ${simbol} ${prefix}hilih
│ ${simbol} ${prefix}huluh
│ ${simbol} ${prefix}heleh
│ ${simbol} ${prefix}holoh
│
└───────⭓

┌──⭓Asupan Menu
│
│ ${simbol} ${prefix}asupanbocil
│ ${simbol} ${prefix}asupangheayubi
│ ${simbol} ${prefix}asupanrika
│ ${simbol} ${prefix}asupansantuy
│ ${simbol} ${prefix}asupanukhty
│ ${simbol} ${prefix}asupan
│ ${simbol} ${prefix}cewekchina
│ ${simbol} ${prefix}cewekindonesia
│ ${simbol} ${prefix}cewekjapan
│ ${simbol} ${prefix}cewekkorea
│ ${simbol} ${prefix}cewekmalaysia
│ ${simbol} ${prefix}cewekthailand
│ ${simbol} ${prefix}cewekvietnam
│
└───────⭓

┌──⭓Nfsw Menu
│
│ ${simbol} ${prefix}ahegao
│ ${simbol} ${prefix}ass
│ ${simbol} ${prefix}bdsm
│ ${simbol} ${prefix}cuckold
│ ${simbol} ${prefix}cum
│ ${simbol} ${prefix}ero
│ ${simbol} ${prefix}femdom
│ ${simbol} ${prefix}foot
│ ${simbol} ${prefix}hentai
│ ${simbol} ${prefix}jahy
│ ${simbol} ${prefix}manga
│ ${simbol} ${prefix}nsfwneko
│ ${simbol} ${prefix}tentacles
│ ${simbol} ${prefix}yuri
│ ${simbol} ${prefix}pussy
│ ${simbol} ${prefix}xnxxsearch
│ ${simbol} ${prefix}xnxxdl
│
└───────⭓

┌──⭓Primbon Menu
│
│ ${simbol} ${prefix}artinama
│ ${simbol} ${prefix}cariresep
│
└───────⭓

┌──⭓Search Menu
│
│ ${simbol} ${prefix}liriklagu
│ ${simbol} ${prefix}wikisearch
│ ${simbol} ${prefix}herodetails
│ ${simbol} ${prefix}dafontsearch
│ ${simbol} ${prefix}pinterest
│ ${simbol} ${prefix}linkwa
│ ${simbol} ${prefix}playstore
│
└───────⭓

┌──⭓Stalk Menu
│
│ ${simbol} ${prefix}ghstalk
│ ${simbol} ${prefix}igstalk
│
└───────⭓

┌──⭓Information Menu
│
│ ${simbol} ${prefix}covid
│ ${simbol} ${prefix}gempa
│ ${simbol} ${prefix}tribunnews
│ ${simbol} ${prefix}kompas
│ ${simbol} ${prefix}film
│ ${simbol} ${prefix}jadwalbola
│ ${simbol} ${prefix}jadwaltv
│ ${simbol} ${prefix}jadwalsholat
│
└───────⭓

┌──⭓Wallpaper Menu
│
│ ${simbol} ${prefix}accelworld
│ ${simbol} ${prefix}animegirl
│ ${simbol} ${prefix}codegeas
│ ${simbol} ${prefix}naruto
│ ${simbol} ${prefix}onepiece
│ ${simbol} ${prefix}samuraix
│ ${simbol} ${prefix}tokyoghoul
│ ${simbol} ${prefix}tokyorevenger
│ ${simbol} ${prefix}transformerwp
│ ${simbol} ${prefix}vocaloid
│
└───────⭓`
let message = await prepareWAMessageMedia({ image: fs.readFileSync('./image/sanzy2.jpg') }, { upload: sanzy.waUploadToServer })
const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
imageMessage: message.imageMessage,
hydratedContentText: txt,
hydratedButtons: [{
urlButton: {
displayText: 'Res Api',
url: 'https://nakatatzy.herokuapp.com/api'
}
}, {
urlButton: {
displayText: 'Youtube',
url: 'https://youtube.com/channel/UCERXfP4wOi1JVuCoDmUvs6g'
}
}, {
quickReplyButton: {
displayText: 'Status Bot',
id: 'ping'
}
}, {
quickReplyButton: {
displayText: 'Owner',
id: 'owner'
}  
}, {
quickReplyButton: {
displayText: '𝑺𝒄𝒓𝒊𝒑𝒕',
id: 'sc'
}
}]
}
}
}), { userJid: m.chat, quoted: m })
sanzy.relayMessage(m.chat, template.message, { messageId: template.key.id })
}
break
case 'revoke':
if (!m.isGroup) throw mess.group
if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin                                               
let link = await sanzy.groupRevokeInvite(m.chat)
await m.reply( `*New Link For ${groupName}* :\n https://chat.whatsapp.com/${link}`)
case 'kick': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sanzy.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'add': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sanzy.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'vote': {
            if (!m.isGroup) throw mess.group
            if (m.chat in vote) throw `_Masih ada vote di chat ini!_\n\n*${prefix}hapusvote* - untuk menghapus vote`
            if (!text) throw `Masukkan Alasan Melakukan Vote, Example: *${prefix + command} Owner Gemoyy*`
            m.reply(`Vote dimulai!\n\n*${prefix}upvote* - untuk ya\n*${prefix}devote* - untuk tidak\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}hapusvote* - untuk menghapus vote`)
            vote[m.chat] = [q, [], []]
            await sleep(1000)
            upvote = vote[m.chat][1]
            devote = vote[m.chat][2]
            teks_vote = `*VOTE*

*Alasan:* ${vote[m.chat][0]}

UPVOTE 

Total: ${vote[m.chat][1].length}




DEVOTE 

Total: ${vote[m.chat][2].length}

 


*${prefix}hapusvote* - untuk menghapus vote`
let buttonsVote = [
  {buttonId: `${prefix}upvote`, buttonText: {displayText: 'UP VOTE'}, type: 1},
  {buttonId: `${prefix}devote`, buttonText: {displayText: 'DEVOTE'}, type: 1}
]

            let buttonMessageVote = {
                text: teks_vote,
                footer: sanzy.user.name,
                buttons: buttonsVote,
                headerType: 1
            }
            sanzy.sendMessage(m.chat, buttonMessageVote)
	    }
            break
               case 'upvote': {
            if (!m.isGroup) throw mess.group
            if (!(m.chat in vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`
            isVote = vote[m.chat][1].concat(vote[m.chat][2])
            wasVote = isVote.includes(m.sender)
            if (wasVote) throw 'Kamu Sudah Vote'
            vote[m.chat][1].push(m.sender)
            menvote = vote[m.chat][1].concat(vote[m.chat][2])
            teks_vote = `*VOTE*

*Alasan:* ${vote[m.chat][0]}

UPVOTE 

Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')}


DEVOTE 

Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')}


*${prefix}hapusvote* - untuk menghapus vote`
            let buttonsUpvote = [
              {buttonId: `${prefix}upvote`, buttonText: {displayText: 'UP VOTE'}, type: 1},
              {buttonId: `${prefix}devote`, buttonText: {displayText: 'DEVOTE'}, type: 1}
            ]

            let buttonMessageUpvote = {
                text: teks_vote,
                footer: sanzy.user.name,
                buttons: buttonsUpvote,
                headerType: 1,
                mentions: menvote
             }
            sanzy.sendMessage(m.chat, buttonMessageUpvote)
	    }
             break
                case 'devote': {
            if (!m.isGroup) throw mess.group
            if (!(m.chat in vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`
            isVote = vote[m.chat][1].concat(vote[m.chat][2])
            wasVote = isVote.includes(m.sender)
            if (wasVote) throw 'Kamu Sudah Vote'
            vote[m.chat][2].push(m.sender)
            menvote = vote[m.chat][1].concat(vote[m.chat][2])
            teks_vote = `*VOTE*

*Alasan:* ${vote[m.chat][0]}

UPVOTE 

Total: ${vote[m.chat][1].length}
${vote[m.chat][1].map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')}



DEVOTE 

Total: ${vote[m.chat][2].length}
${vote[m.chat][2].map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')}



*${prefix}hapusvote* - untuk menghapus vote`
            let buttonsDevote = [
              {buttonId: `${prefix}upvote`, buttonText: {displayText: 'UP VOTE'}, type: 1},
              {buttonId: `${prefix}devote`, buttonText: {displayText: 'DEVOTE'}, type: 1}
            ]

            let buttonMessageDevote = {
                text: teks_vote,
                footer: sanzy.user.name,
                buttons: buttonsDevote,
                headerType: 1,
                mentions: menvote
            }
            sanzy.sendMessage(m.chat, buttonMessageDevote)
	}
            break
                 
case 'cekvote':
if (!m.isGroup) throw mess.group
if (!(m.chat in vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`
teks_vote = `VOTE 

*Alasan:* ${vote[m.chat][0]}

UPVOTE

Total: ${upvote.length}
${vote[m.chat][1].map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')}



DEVOTE 

Total: ${devote.length}
${vote[m.chat][2].map((v, i) => `${i + 1}. @${v.split`@`[0]}`).join('\n')}



*${prefix}hapusvote* - untuk menghapus vote


©${sanzy.user.id}
`
sanzy.sendTextWithMentions(m.chat, teks_vote, m)
break
		case 'deletevote': case'delvote': case 'hapusvote': {
            if (!m.isGroup) throw mess.group
            if (!(m.chat in vote)) throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`
            delete vote[m.chat]
            m.reply('Berhasil Menghapus Sesi Vote Di Grup Ini')
	    }
            break
case 'promote': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sanzy.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'demote': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sanzy.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'setname': case 'setsubject': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
if (!text) throw 'Text ?'
await sanzy.groupUpdateSubject(m.chat, text).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'setprofile': case 'setpp': {
if (!isCreator && !m.key.fromMe) throw mess.owner
if (!quoted) throw 'Reply Image'
if (/image/.test(mime)) throw `balas image dengan caption *${prefix + command}*`
let media = await sanzy.downloadAndSaveMediaMessage(quoted)
if (!m.isGroup && !isBotAdmins && !isGroupAdmins) {
await sanzy.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
await fs.unlinkSync(media)
} else if (!isCreator && !m.key.fromMe) {
await sanzy.updateProfilePicture(sanzy.user.id, { url: media }).catch((err) => fs.unlinkSync(media))
await fs.unlinkSync(media)
}
}
break
case 'group': case 'grup': {
if (!m.isGroup) throw mess.group
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
if (!isBotAdmins && !m.key.fromMe) throw mess.botAdmin
if (!text) throw 'Masukkan value open/close'
if (args[0].toLowerCase() === 'close') {
await sanzy.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
} else if (args[0].toLowerCase() === 'open') {
await sanzy.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
}
break
case 'linkgroup': case 'linkgc': {
if (!m.isGroup) throw mess.group
if (!isBotAdmins) throw mess.botAdmin
let response = await sanzy.groupInviteCode(m.chat)
sanzy.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
}
break
case 'hidetag':
if (!m.isGroup) throw mess.group
if (!isGroupAdmins && !m.key.fromMe) throw mess.admin
var group = await sanzy.groupMetadata(m.chat)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var optionshidetag = {
text: q,
contextInfo: { mentionedJid: mem },
quoted: m
}
sanzy.sendMessage(m.chat, optionshidetag, text)
break
case 'hidetag2':
if (!m.isGroup) throw mess.group
if (!isCreator && !m.key.fromMe) throw mess.owner
var group = await sanzy.groupMetadata(m.chat)
var member = group['participants']
var mem = []
member.map(async adm => {
mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
})
var optionshidetag = {
text: q,
contextInfo: { mentionedJid: mem },
quoted: m
}
sanzy.sendMessage(m.chat, optionshidetag, text)
break
case 'tagall2': case 'infoall2':
if (!m.isGroup) throw mess.group
if (!isCreator && !m.key.fromMe) throw mess.owner
let startnum = 1
let teks = `*_Tag All Member_*\n*Pesan : ${q ? q : '-'}*\n\n`
for (let mem of groupMembers) {
teks += `${startnum++}. @${mem.id.split('@')[0]}\n`
}
teks += `\n⋙ Nakata Z ⋘`
sanzy.sendMessage(m.chat, { text: teks, mentions: groupMembers.map(a => a.id) }, { quoted: m })
break
case 'tag': case 'totag': case 'hidetag': {
			if (!isGroupAdmins && !isCreator && !m.key.fromMe) return m.reply('Eitssss Ngga Bisa')
			let cc = smsg(sanzy, q ? m : m.quoted ? await quoted.fakeObj : false || m)
		        let cck = q ? q : cc.text
			await sanzy.copyNForward(m.chat, sanzy.cMod(m.chat, cc, /hidetag|tag|totag/i.test(cck) ? cck : `${cck}`, { contextInfo: { mentionedJid: participants.map(v => v.jid) }}), true, { contextInfo: { mentionedJid: participants.map(v => v.jid) }}).catch(_ => _)
		}
		break
case 'delete': case 'del': {
                if (!m.quoted) throw false
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                sanzy.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break
case 'iqra': {
		oh = `Example : ${prefix + command} 3\n\nIQRA Yang tersedia : 1,2,3,4,5,6`
		if (!text) throw oh
		yy = await getBuffer(`https://islamic-api-indonesia.herokuapp.com/api/data/pdf/iqra${text}`)
		sanzy.sendMessage(m.chat, {document: yy, mimetype: 'application/pdf', fileName: `iqra${text}.pdf`}, {quoted:m}).catch ((err) => m.reply(oh))
		}
		break
case 'juzamma': {
		if (args[0] === 'pdf') {
		m.reply(mess.wait)
		sanzy.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pdf'}, mimetype: 'application/pdf', fileName: 'juz-amma-arab-latin-indonesia.pdf'}, {quoted:m})
		} else if (args[0] === 'docx') {
		m.reply(mess.wait)
		sanzy.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.docx'}, mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', fileName: 'juz-amma-arab-latin-indonesia.docx'}, {quoted:m})
		} else if (args[0] === 'pptx') {
		m.reply(mess.wait)
		sanzy.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pptx'}, mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', fileName: 'juz-amma-arab-latin-indonesia.pptx'}, {quoted:m})
		} else if (args[0] === 'xlsx') {
		m.reply(mess.wait)
		sanzy.sendMessage(m.chat, {document: {url: 'https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.xlsx'}, mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName: 'juz-amma-arab-latin-indonesia.xlsx'}, {quoted:m})
		} else {
		m.reply(`Mau format apa ? Example : ${prefix + command} pdf

Format yang tersedia : pdf, docx, pptx, xlsx`)
		}
		}
		break
case 'hadis': case 'hadist': {
		if (!args[0]) throw `Contoh:
${prefix + command} bukhari 1
${prefix + command} abu-daud 1

Pilihan tersedia:
abu-daud
1 - 4590
ahmad
1 - 26363
bukhari
1 - 7008
darimi
1 - 3367
ibu-majah
1 - 4331
nasai
1 - 5662
malik
1 - 1594
muslim
1 - 5362`
		if (!args[1]) throw `Hadis yang ke berapa?\n\ncontoh:\n${prefix + command} muslim 1`
		try {
		let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/json/hadith/${args[0]}`)
		let { number, arab, id } = res.find(v => v.number == args[1])
		m.reply(`No. ${number}

${arab}

${id}`)
		} catch (e) {
		m.reply(`Hadis tidak ditemukan !`)
		}
		}
		break
case 'alquran': {
		if (!args[0]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
		if (!args[1]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
		let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`)
		let txt = `*Arab* : ${res.result.data.text.arab}
*English* : ${res.result.data.translation.en}
*Indonesia* : ${res.result.data.translation.id}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
		m.reply(txt)
		sanzy.sendMessage(m.chat, {audio: { url: res.result.data.audio.primary }, mimetype: 'audio/mpeg'}, { quoted : m })
		}
		break
case 'tafsirsurah': {
		if (!args[0]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`
		if (!args[1]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`
		let res = await fetchJson(`https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`)
		let txt = `*Tafsir Surah*  

*Pendek* : ${res.result.data.tafsir.id.short}

*Panjang* : ${res.result.data.tafsir.id.long}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`
		m.reply(txt)
		}
		break
case 'sticker': case 's': case 'stickergif': case 'sgif': {
if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command}`
m.reply(mess.wait)
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await sanzy.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return m.reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await sanzy.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
}
}
break
case 'smeme': case 'stickermeme': case 'stickmeme': {
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Foto Dengan Caption ${prefix + command} *teks*`)
m.reply(mess.wait)
idoganz = args.join(' ')
let smeme = await sanzy.downloadAndSaveMediaMessage(quoted)
let ngirim = await TelegraPh(smeme)
let gaskeun = `https://api.memegen.link/images/custom/-/${idoganz}.png?background=${util.format(ngirim)}`
let smemenya = await sanzy.sendImageAsSticker(m.chat, gaskeun, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(smemenya)
}
break
case 'toimage': case 'toimg': {
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
m.reply(mess.wait)
let media = await sanzy.downloadAndSaveMediaMessage(quoted)
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) throw err
let buffer = fs.readFileSync(ran)
sanzy.sendMessage(m.chat, { image: buffer }, { quoted: m })
fs.unlinkSync(ran)
})
}
break
case 'emojimix': {
	        if (!text) throw `Example : ${prefix + command} 😁+😭`
		let [emoji1, emoji2] = text.split`+`
		let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
		for (let res of anu.results) {
		    let encmedia = await sanzy.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
		    await fs.unlinkSync(encmedia)
		}
	    }
	    break
case 'tomp4': case 'tovideo': {
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
m.reply(mess.wait)
let media = await sanzy.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await sanzy.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
await fs.unlinkSync(media)
}
break
case 'tomp3':
	    if (/video/.test(mime)) {
	    m.reply(mess.wait)
	    inp = await quoted.download()
	    let { toAudio } = require('../command/converter.js')
	    hua = await toAudio(inp, 'mp3')
	    sanzy.sendMessage(m.chat, {audio: hua, mimetype: 'audio/mp4'}, {quoted:m})
	    } else { m.reply('Reply Video') }
	    break
case 'togif': {
if (!quoted) throw 'Reply Image'
if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
m.reply(mess.wait)
let media = await sanzy.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await sanzy.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
await fs.unlinkSync(media)
}
break
case 'tovn': case 'toptt': {
            if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
            if (!quoted) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
            m.reply(mess.wait)
            let media = await quoted.download()
            let { toPTT } = require('../command/converter')
            let audio = await toPTT(media, 'mp4')
            sanzy.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
            }
            break
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'tupai':
                try {
                let set
                if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
                if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
                if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
                if (/earrape/.test(command)) set = '-af volume=12'
                if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
                if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
                if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
                if (/reverse/.test(command)) set = '-filter_complex "areverse"'
                if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
                if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
                if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
                if (/tupai/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
                if (/audio/.test(mime)) {
                m.reply(mess.wait)
                let media = await sanzy.downloadAndSaveMediaMessage(quoted)
                let ran = getRandom('.mp3')
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                fs.unlinkSync(media)
                if (err) return m.reply(err)
                let buff = fs.readFileSync(ran)
                sanzy.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
                fs.unlinkSync(ran)
                })
                } else m.reply(`Balas audio yang ingin diubah dengan caption *${prefix + command}*`)
                } catch (e) {
                m.reply(e)
                }
                break

case 'public': {
if (!isCreator && !m.key.fromMe) throw mess.owner
sanzy.public = true
m.reply('Sukses Change To Public Usage')
}
break
case 'self': {
if (!isCreator && !m.key.fromMe) throw mess.owner
sanzy.public = false
m.reply('Sukses Change To Self Usage')
}
break
case 'join': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                if (!text) throw 'Masukkan Link Group!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
                m.reply(mess.wait)
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await sanzy.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
case 'leave': {
                if (!isCreator && !m.key.fromMe) throw mess.owner
                await sanzy.groupLeave(m.chat).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
case 'ping': case 'botstatus': case 'statusbot': {
let timestamp = speed()
let latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
m.reply(respon)
}
break
case 'owner': case 'creator': {
let vcard = `BEGIN:VCARD\n` // metadata of the contact card
+ `VERSION:3.0\n`
+ `N:;${ownername}.;;;`
+ `FN:${ownername}.\n` // full name
+ `ORG:${ownername};\n` // the organization of the contact
+ `TEL;type=CELL;type=VOICE;waid=${ownernomer}:${ownernomer}\n` // WhatsApp ID + phone number
+ `END:VCARD`
let msg = await sanzy.sendMessage(m.chat, { contacts: { displayName: `${ownername}`, contacts: [{ vcard }] } }, { quoted: m })
let buttons3 = [
{buttonId: `menu`, buttonText: {displayText: '►BACK MENU '}, type: 1},
]
let buttonMessage3 = {
text: `DONT NOT SPAM OWNER!! `,
footerText: 'Press The Button Below',
buttons: buttons3,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage3, { quoted: m })                        
}
break
case 'eval': {
if (!isCreator && !m.key.fromMe) return m.reply(mess.owner)
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))
}
}
break
case 'block': {
if (!isCreator && !m.key.fromMe) throw mess.owner
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sanzy.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'unblock': {
if (!isCreator && !m.key.fromMe) throw mess.owner
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sanzy.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
break
case 'sc': {
m.reply('Cari Sc Ya kak?Nih\nhttps://github.com/sanzykawaiiii/SanzyMDV2')
}
break

case 'doaharian': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/doaharian', {}, 'apikey'))
resultnya = webapi.result
txt =`Title : ${resultnya.Title}
Arabic : ${resultnya.Arabic}
Latin : ${resultnya.Latin}
Translate : ${resultnya.Translate}`
let buttons = [{buttonId: `doaharian`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: txt,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'tahlil': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/tahlil', {}, 'apikey'))
resultnya = webapi.result
txt =`Id : ${resultnya.id}
Title : ${resultnya.title}
Arabic : ${resultnya.arabic}
Translation : ${resultnya.translation}`
let buttons = [{buttonId: `tahlil`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: txt,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'wirid': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/wirid', {}, 'apikey'))
resultnya = webapi.result
txt =`Id : ${resultnya.id}
Times : ${resultnya.times}
Arabic : ${resultnya.arabic}
Tnc : ${resultnya.tnc}`
let buttons = [{buttonId: `wirid`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: txt,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'ayatkursi': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/ayatkursi', {}, 'apikey'))
resultnya = webapi.result
txt =`Tafsir : ${resultnya.tafsir}
Translation : ${resultnya.translation}
Arabic : ${resultnya.arabic}
Latin : ${resultnya.latin}`
m.reply(txt)
}
break
case 'bacaansholat': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/bacaansholat', {}, 'apikey'))
resultnya = webapi.result
txt =`Id : ${resultnya.id}
Name : ${resultnya.name}
Arabic : ${resultnya.arabic}
Latin : ${resultnya.latin}
Terjemahan : ${resultnya.terjemahan}`
let buttons = [{buttonId: `bacaansholat`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: txt,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'niatsholat': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/niatsholat', {}, 'apikey'))
resultnya = webapi.result
txt =`Id : ${resultnya.id}
Name : ${resultnya.name}
Arabic : ${resultnya.arabic}
Latin : ${resultnya.latin}
Terjemahan : ${resultnya.terjemahan}`
let buttons = [{buttonId: `niatsholat`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: txt,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'asmaulhusna': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/asmaulhusna', {}, 'apikey'))
resultnya = webapi.result
txt =`Number : ${resultnya.number}
Latin : ${resultnya.latin}
Arabic : ${resultnya.arabic}
Translate Id : ${resultnya.translate_id}
Translate En : ${resultnya.translate_en}`
let buttons = [{buttonId: `asmaulhusna`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: txt,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break

case 'ytmp44': {
if (!text) throw 'Masukkan Link Youtube Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/ytMp4', { url: text }, 'apikey'))
imagenya = await getBuffer(webapi.result.thumb)
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
locationMessage: { 
degreesLatitude: 0,
degreesLongitude: 0, 
jpegThumbnail: imagenya,
},
hydratedContentText: `Title : ${webapi.result.title}\nQuality : ${webapi.result.quality}\nSize : ${webapi.result.size}\nViews : ${webapi.result.views}\nLikes : ${webapi.result.likes}\nDislike : ${webapi.result.dislike}\nChannel : ${webapi.result.channel}\nUpload Date : ${webapi.result.uploadDate}\nDesc : ${webapi.result.desc}`,
hydratedFooterText: `Nakata`,
hydratedButtons: [{
urlButton: {
displayText: 'Res Api',
url: `https://nakatatzy.herokuapp.com/api`
}
}, {
urlButton: {
displayText: 'Youtube Owner',
url: 'https://youtube.com/channel/UCERXfP4wOi1JVuCoDmUvs6g'
}
}, {
quickReplyButton: {
displayText: '𝑨𝑼𝑫𝑰𝑶',
id: `ytmp3 ${q}`
}
}, {
quickReplyButton: {
displayText: '𝑽𝑰𝑫𝑬𝑶',
id: `ytmp4 ${q}`
}
}]
}
}
}), { userJid: m.chat, quoted: ftroli })
sanzy.relayMessage(m.chat, template.message, { messageId: template.key.id })
}
break
case 'ytmp4': {
if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27`
                let result = await ytv(isUrl(text)[0])
                let { dl_link, thumb, title, filesizeF, filesize } = result
                if (Number(filesize) >= 40000) return m.reply('File Melebihi Batas'+util.format(result))
                sanzy.sendMessage(m.chat, { video: { url: dl_link }, caption: `⭔ Title : ${title}\n⭔ File Size : ${filesizeF}\n⭔ Url : ${text}\n⭔ Ext : MP4` }, { quoted: m })
            }
            break
case 'ytmp33': {
if (!text) throw 'Masukkan Link Youtube Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/ytMp3', { url: text }, 'apikey'))
imagenya = await getBuffer(webapi.result.thumb)
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
locationMessage: { 
degreesLatitude: 0,
degreesLongitude: 0, 
jpegThumbnail: imagenya,
},
hydratedContentText: `Title : ${webapi.result.title}\nSize : ${webapi.result.size}\nViews : ${webapi.result.views}\nLikes : ${webapi.result.likes}\nDislike : ${webapi.result.dislike}\nChannel : ${webapi.result.channel}\nUpload Date : ${webapi.result.uploadDate}\nDesc : ${webapi.result.desc}`,
hydratedFooterText: `Nakata`,
hydratedButtons: [{
urlButton: {
displayText: 'Res Api',
url: `https://nakatatzy.herokuapp.com/api`
}
}, {
urlButton: {
displayText: 'Youtube Owner',
url: 'https://youtube.com/channel/UCERXfP4wOi1JVuCoDmUvs6g'
}
}, {
quickReplyButton: {
displayText: '𝑨𝑼𝑫𝑰𝑶',
id: `ytmp3 ${isUrl(text)}`
}
}, {
quickReplyButton: {
displayText: '𝑽𝑰𝑫𝑬𝑶',
id: `ytmp4 ${isUrl(text)}`
}
}]
}
}
}), { userJid: m.chat, quoted: ftroli })
sanzy.relayMessage(m.chat, template.message, { messageId: template.key.id })
}
break
case 'ytmp3': {
if (!text) throw `Example : ${prefix + command} https://youtube.com/watch?v=PtFMh6Tccag%27`
                let result = await yta(isUrl(text)[0])
                let { dl_link, thumb, title, filesizeF, filesize } = result
                if (Number(filesize) >= 40000) return m.reply('File Melebihi Batas'+util.format(result))
                sanzy.sendImage(m.chat, thumb, `⭔ Title : ${title}\n⭔ File Size : ${filesizeF}\n⭔ Url : ${text}\n⭔ Ext : MP3`, m)
                sanzy.sendMessage(m.chat, { document: { url: dl_link }, fileName: `${title}.mp3`, mimetype: 'audio/mp3' }, { quoted: m })
            }
            break
case 'play': {
if (!text) throw 'Masukkan Link Youtube Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/ytPlay', { query: text }, 'apikey'))
imagenya = await getBuffer(webapi.result.thumb)
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
locationMessage: { 
degreesLatitude: 0,
degreesLongitude: 0, 
jpegThumbnail: imagenya,
},
hydratedContentText: `Title : ${webapi.result.title}\nSize : ${webapi.result.size}\nViews : ${webapi.result.views}\nLikes : ${webapi.result.likes}\nDislike : ${webapi.result.dislike}\nChannel : ${webapi.result.channel}\nUpload Date : ${webapi.result.uploadDate}\nDesc : ${webapi.result.desc}`,
hydratedFooterText: `Nakata`,
hydratedButtons: [{
urlButton: {
displayText: 'Res Api',
url: `https://nakatatzy.herokuapp.com/api`
}
}, {
urlButton: {
displayText: 'Youtube Owner',
url: 'https://youtube.com/channel/UCERXfP4wOi1JVuCoDmUvs6g'
}
}, {
quickReplyButton: {
displayText: '𝑨𝑼𝑫𝑰𝑶',
id: `ytmp3 ${isUrl(text)}`
}
}, {
quickReplyButton: {
displayText: '𝑽𝑰𝑫𝑬𝑶',
id: `ytmp4 ${isUrl(text)}`
}
}]
}
}
}), { userJid: m.chat, quoted: ftroli })
sanzy.relayMessage(m.chat, template.message, { messageId: template.key.id })
}
break
case 'tiktokdl': case 'tiktok': {
if (!text) throw 'Masukkan Link Tiktok Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/tiktokvideo', { url: text }, 'apikey'))
let buttons = [{buttonId: `nowm ${isUrl(text)}`, buttonText: {displayText: 'NO WM'}, type: 1},{buttonId: `wm ${isUrl(text)}`, buttonText: {displayText: 'WM'}, type: 1}]
let buttonMessage = {
text: `Silahkan Pilih File Yang Ingin Di Download`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'nowm': case 'tiktoknowm': case 'ttnowm': {
if (!text) throw 'Masukkan Link Tiktok Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/tiktokvideo', { url: text }, 'apikey'))
sanzy.sendMessage(m.chat, { video: { url: webapi.result.result.nowm }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'wm': case 'tiktokwm': case 'ttwm': {
if (!text) throw 'Masukkan Link Tiktok Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/tiktokvideo', { url: text }, 'apikey'))
sanzy.sendMessage(m.chat, { video: { url: webapi.result.result.wm }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'mediafiredl': case 'mediafire': {
if (!text) throw 'Masukkan Link Mediafire Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/mediafireD', { url: text }, 'apikey'))
let buttons = [{buttonId: `mddl ${isUrl(text)}`, buttonText: {displayText: 'DOWNLOAD'}, type: 1}]
let buttonMessage = {
text: `File Berhasil Di Dapatkan\n\nNama : ${webapi.result.nama}\nSize : ${webapi.result.size}\nLink : ${webapi.result.link}\n\nSilahkan Klik Tombol Download Di Bawah Ini`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'mddl': {
if (!text) throw 'Masukkan Link Mediafire Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/mediafireD', { url: text }, 'apikey'))
sendFileFromUrl(m.chat, webapi.result.link, {quoted: ftroli, mimetype: webapi.result.mime, filename: webapi.result.nama})
}
break
case 'igfoto': {
if (!text) throw 'Masukkan Link Foto Instragram'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/igfoto', { link: text }, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result.link }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'igvideo': {
if (!text) throw 'Masukkan Link Video Instragram'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/igtv', { link: text }, 'apikey'))
sanzy.sendMessage(m.chat, { video: { url: webapi.result.link }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'git': case 'gitclone':
             m.reply(mess.wait)
            let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
    
    let [, user, repo] = text.match(regex1) || []
    repo = repo.replace(/.git$/, '')
    let url = `https://api.github.com/repos/${user}/${repo}/zipball`
    let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
    // 'attachment; filenameq=ZidniGanz.zip'
    m.reply(`*Mohon tunggu, sedang mengirim repository..*`)
  sanzy.sendMessage(m.chat, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m })
			 break
case 'katabijak': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/bijak', {},'apikey'))
let buttons = [{buttonId: `katabijak`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: `Kata Bijak : ${webapi.result}`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'fakta': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/fakta', {},'apikey'))
let buttons = [{buttonId: `fakta`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: `Fakta : ${webapi.result}`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'motivasi': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/motivasi', {},'apikey'))
let buttons = [{buttonId: `motivasi`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: `Motivasi : ${webapi.result}`,
footerText: `𝑺𝒂𝒏𝒛??`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'quotes': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/quotes', {},'apikey'))
let buttons = [{buttonId: `quotes`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: `Quotes : ${webapi.quotes}`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'bucin': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/bucin', {},'apikey'))
let buttons = [{buttonId: `bucin`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: `Bucin : ${webapi.result.Bucin}`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'pantun': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/Pantun', {},'apikey'))
let buttons = [{buttonId: `pantun`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: `Pantun : ${webapi.result.Pantun}`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'cerpen': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/cerpen', {},'apikey'))
let buttons = [{buttonId: `cerpen`, buttonText: {displayText: 'NEXT⏩'}, type: 1}]
let buttonMessage = {
text: `Title : ${webapi.result.title}\nPengarang : ${webapi.result.pengarang}\nKategori : ${webapi.result.kategori}\nCerpen : ${webapi.result.cerpen}`,
footerText: `Nakata`,
buttons: buttons,
headerType: 2
}
sanzy.sendMessage(m.chat, buttonMessage, { quoted: ftroli })
}
break
case 'quotesanime': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/quotesAnime', {},'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Link : ${x.link}\nKarakter : ${x.karakter}\nAnime : ${x.anime}\nEpisode: ${x.episode}\nUp At : ${x.up_at}\nQuotes : ${x.quotes}`
imagenya = await getBuffer(x.gambar)
}
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
locationMessage: { 
degreesLatitude: 0,
degreesLongitude: 0, 
jpegThumbnail: imagenya,
},
hydratedContentText: txt,
hydratedFooterText: `Nakata`,
hydratedButtons: [{
urlButton: {
displayText: 'Res Api',
url: `https://nakatatzy.herokuapp.com/api`
}
}, {
urlButton: {
displayText: 'Youtube Owner',
url: 'https://youtube.com/channel/UCERXfP4wOi1JVuCoDmUvs6g'
}
}, {
quickReplyButton: {
displayText: 'NEXT⏩',
id: `quotesanime`
}
}]
}
}
}), { userJid: m.chat, quoted: ftroli })
sanzy.relayMessage(m.chat, template.message, { messageId: template.key.id })
}
break

case 'ttp': {
if (!text) throw 'Teks Nya Mana ?'
m.reply(mess.wait)
webapi = await getBuffer(api('sanzy', '/ttp', { text: text }, 'apikey'))
sanzy.sendMessage(m.chat, {image: webapi, caption: `stikerin banh`}, {quoted:ftroli})
}
break
case 'blackpink':
case 'neon':
case 'matrix':
case 'joker':
case 'devil':
case 'transformer':
case 'thunder':
case 'harry':
case 'gradient': {
if (!text) throw 'Teks Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', `/${command}`, { text: text }, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.data }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case '3dchristmas': case '3ddeepsea': case 'americanflag': case '3dscifi': case '3drainbow': case '3dwaterpipe': case 'halloweenskeleton': case 'sketch': case 'bluecircuit': case 'space': case 'metallic': case 'fiction': case 'greenhorror': case 'transformer': case 'berry': case 'thunder': case 'magma': case '3dcrackedstone': case '3dneonlight': case 'impressiveglitch': case 'naturalleaves': case 'fireworksparkle': case 'matrix': case 'dropwater':  case 'harrypotter': case 'foggywindow': case 'neondevils': case 'christmasholiday': case '3dgradient': case 'blackpink': case 'gluetext': {
                if (!text) throw `Example : ${prefix + command} Sanzy|Botz`
                m.reply(mess.wait)
                let anu = await getBuffer(api('zenz', '/textpro/'+command, { text: text }, 'apikey'))
                sanzy.sendMessage(m.chat, { image: anu, caption: `Download From ${text}` }, { quoted: m})
	    }
            break
case 'ffcover': case 'crossfire': case 'galaxy': case 'glass': case 'neon': case 'beach': case 'blackpink': case 'igcertificate': case 'ytcertificate': {
                if (!text) throw 'No Query Text'
                m.reply(mess.wait)
                sanzy.sendMessage(m.chat, { image: { url: api('zenz', '/ephoto/' + command, { text: text }, 'apikey') }, caption: `Ephoto ${command}` }, { quoted: m })
            }
            break
case 'shadow': case 'romantic': case 'smoke': case 'burnpapper': case 'naruto': case 'lovemsg': case 'grassmsg': case 'lovetext': case 'coffecup': case 'butterfly': case 'harrypotter': case 'retrolol': {
                if (!text) throw 'No Query Text'
                m.reply(mess.wait)
                sanzy.sendMessage(m.chat, { image: { url: api('zenz', '/photooxy/' + command, { text: text }, 'apikey') }, caption: `Photo Oxy ${command}` }, { quoted: m })
            }
            break
case 'suitpvp': case 'suit': {
            this.suit = this.suit ? this.suit : {}
            let poin = 10
            let poin_lose = 10
            let timeout = 60000
            if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) m.reply(`Selesaikan suit mu yang sebelumnya`)
	    if (m.mentionedJid[0] === m.sender) return m.reply(`Tidak bisa bermain dengan diri sendiri !`)
            if (!m.mentionedJid[0]) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya..\n\nContoh : ${prefix}suit @${ownernomer[1]}`, m.chat, { mentions: [ownernomer[1] + '@s.whatsapp.net'] })
            if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`
            let id = 'suit_' + new Date() * 1
            let caption = `_*SUIT PvP*_

@${m.sender.split`@`[0]} menantang @${m.mentionedJid[0].split`@`[0]} untuk bermain suit

Silahkan @${m.mentionedJid[0].split`@`[0]} untuk ketik terima/tolak`
            this.suit[id] = {
            chat: await sanzy.sendText(m.chat, caption, m, { mentions: parseMention(caption) }),
            id: id,
            p: m.sender,
            p2: m.mentionedJid[0],
            status: 'wait',
            waktu: setTimeout(() => {
            if (this.suit[id]) sanzy.sendText(m.chat, `_Waktu suit habis_`, m)
            delete this.suit[id]
            }, 60000), poin, poin_lose, timeout
            }
            }
            break
case 'tebak': {
                if (!text) throw `Example : ${prefix + command} lagu\n\nOption : \n1. lagu\n2. gambar\n3. kata\n4. kalimat\n5. lirik\n6.lontong`
                if (args[0] === "lagu") {
                    if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://fatiharridho.github.io/tebaklagu.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    let msg = await sanzy.sendMessage(m.chat, { audio: { url: result.link_song }, mimetype: 'audio/mpeg' }, { quoted: m })
                    sanzy.sendText(m.chat, `Lagu Tersebut Adalah Lagu dari?\n\nArtist : ${result.artist}\nWaktu : 60s`, msg).then(() => {
                    tebaklagu[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebaklagu.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    sanzy.sendButtonText(m.chat, [{ buttonId: 'tebak lagu', buttonText: { displayText: 'Tebak Lagu' }, type: 1 }], `Waktu Habis\nJawaban:  ${tebaklagu[m.sender.split('@')[0]]}\n\nIngin bermain? tekan button dibawah`, sanzy.user.name, m)
                    delete tebaklagu[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'gambar') {
                    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    sanzy.sendImage(m.chat, result.img, `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : 60s`, m).then(() => {
                    tebakgambar[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebakgambar.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    sanzy.sendButtonText(m.chat, [{ buttonId: 'tebak gambar', buttonText: { displayText: 'Tebak Gambar' }, type: 1 }], `Waktu Habis\nJawaban:  ${tebakgambar[m.sender.split('@')[0]]}\n\nIngin bermain? tekan button dibawah`, sanzy.user.name, m)
                    delete tebakgambar[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'kata') {
                    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    sanzy.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : 60s`, m).then(() => {
                    tebakkata[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebakkata.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    sanzy.sendButtonText(m.chat, [{ buttonId: 'tebak kata', buttonText: { displayText: 'Tebak Kata' }, type: 1 }], `Waktu Habis\nJawaban:  ${tebakkata[m.sender.split('@')[0]]}\n\nIngin bermain? tekan button dibawah`, sanzy.user.name, m)
                    delete tebakkata[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'kalimat') {
                    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    sanzy.sendText(m.chat, `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : 60s`, m).then(() => {
                    tebakkalimat[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebakkalimat.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    sanzy.sendButtonText(m.chat, [{ buttonId: 'tebak kalimat', buttonText: { displayText: 'Tebak Kalimat' }, type: 1 }], `Waktu Habis\nJawaban:  ${tebakkalimat[m.sender.split('@')[0]]}\n\nIngin bermain? tekan button dibawah`, sanzy.user.name, m)
                    delete tebakkalimat[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'lirik') {
                    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    sanzy.sendText(m.chat, `Ini Adalah Lirik Dari Lagu? : *${result.soal}*?\nWaktu : 60s`, m).then(() => {
                    tebaklirik[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
                    })
                    await sleep(60000)
                    if (tebaklirik.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    sanzy.sendButtonText(m.chat, [{ buttonId: 'tebak lirik', buttonText: { displayText: 'Tebak Lirik' }, type: 1 }], `Waktu Habis\nJawaban:  ${tebaklirik[m.sender.split('@')[0]]}\n\nIngin bermain? tekan button dibawah`, sanzy.user.name, m)
                    delete tebaklirik[m.sender.split('@')[0]]
                    }
                } else if (args[0] === 'lontong') {
                    if (caklontong.hasOwnProperty(m.sender.split('@')[0])) throw "Masih Ada Sesi Yang Belum Diselesaikan!"
                    let anu = await fetchJson('https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json')
                    let result = anu[Math.floor(Math.random() * anu.length)]
                    sanzy.sendText(m.chat, `*Jawablah Pertanyaan Berikut :*\n${result.soal}*\nWaktu : 60s`, m).then(() => {
                    caklontong[m.sender.split('@')[0]] = result.jawaban.toLowerCase()
		    caklontong_desk[m.sender.split('@')[0]] = result.deskripsi
                    })
                    await sleep(60000)
                    if (caklontong.hasOwnProperty(m.sender.split('@')[0])) {
                    console.log("Jawaban: " + result.jawaban)
                    sanzy.sendButtonText(m.chat, [{ buttonId: 'tebak lontong', buttonText: { displayText: 'Tebak Lontong' }, type: 1 }], `Waktu Habis\nJawaban:  ${caklontong[m.sender.split('@')[0]]}\nDeskripsi : ${caklontong_desk[m.sender.split('@')[0]]}\n\nIngin bermain? tekan button dibawah`, sanzy.user.name, m)
                    delete caklontong[m.sender.split('@')[0]]
		    delete caklontong_desk[m.sender.split('@')[0]]
                    }
                }
            }
            break
case 'asupanbocil':
case 'asupangheayubi':
case 'asupanrika':
case 'asupansantuy':
case 'asupanukhty':
case 'asupan': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', `/${command}`, {}, 'apikey'))
sanzy.sendMessage(m.chat, { video: { url: webapi.result.url }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'cewekchina':
case 'cewekindonesia':
case 'cewekjapan':
case 'cewekkorea':
case 'cewekmalaysia':
case 'cewekthailand':
case 'cewekvietnam': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', `/${command}`, {}, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result.url }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break

case 'ahegao':
case 'ass':
case 'bdsm':
case 'cuckold':
case 'cum':
case 'ero':
case 'femdom':
case 'foot':
case 'hentai':
case 'jahy':
case 'manga':
case 'nsfwneko':
case 'orgy':
case 'panties':
case 'sfwneko':
case 'tentacles': {
if (m.isGroup) return m.reply('Fitur Tidak Dapat Digunakan Untuk Group!')
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', `/${command}`, {}, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'yuri':
case 'pussy': {
m.reply(mess.wait)
myapi = await fetchJson(api('sanzyyt', `/${command}`, {}, 'apikey'))
sanzy.sendMessage(m.chat, { image: {url: myapi.result }, caption: `Done Nih....`}, { quoted: ftroli })
}
break
case 'xnxxsearch': {
if (m.isGroup) return m.reply('Fitur Tidak Dapat Digunakan Untuk Group!')
if (!text) throw 'Judul Bokep Nya Mana'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/xnxxsearch', { query: text }, 'apikey'))
resultnya = webapi.result.result
for (var x of resultnya) {
txt =`Title : ${x.title}\nInfo : ${x.info}\nLink : ${x.link}`
}
m.reply(txt)
}
break

case 'xnxxdl': {
if (m.isGroup) return m.reply('Fitur Tidak Dapat Digunakan Untuk Group!')
if (!text) throw 'Link Video Bokep Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/xnxxdl', { url: text }, 'apikey'))
imagenya = await getBuffer(webapi.result.result.image)
var template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
locationMessage: { 
degreesLatitude: 0,
degreesLongitude: 0, 
jpegThumbnail: imagenya,
},
hydratedContentText: `Title : ${webapi.result.result.title}\nDuration : ${webapi.result.result.duration}\nVideo Type : ${webapi.result.result.videoType}\nVideo Width : ${webapi.result.result.videoWidth}\nVideo Height : ${webapi.result.result.videoHeight}\nInfo : ${webapi.result.result.info}`,
hydratedFooterText: `Nakata`,
hydratedButtons: [{
urlButton: {
displayText: 'Res Api',
url: `https://nakatatzy.herokuapp.com/api`
}
}, {
urlButton: {
displayText: 'Youtube Owner',
url: 'https://youtube.com/channel/UCERXfP4wOi1JVuCoDmUvs6g'
}
}, {
quickReplyButton: {
displayText: 'LOW',
id: `low ${q}`
}
}, {
quickReplyButton: {
displayText: 'HIGH',
id: `high ${q}`
}
}, {
quickReplyButton: {
displayText: 'HLS',
id: `hls ${q}`
}
}]
}
}
}), { userJid: m.chat, quoted: ftroli })
sanzy.relayMessage(m.chat, template.message, { messageId: template.key.id })
}
break
case 'low': {
if (!text) throw 'Link Video Bokep Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/xnxxdl', { url: text }, 'apikey'))
sanzy.sendMessage(m.chat, { video: { url: webapi.result.result.files.low }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'high': {
if (!text) throw 'Link Video Bokep Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/xnxxdl', { url: text }, 'apikey'))
sanzy.sendMessage(m.chat, { video: { url: webapi.result.result.files.high }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'hls': {
if (!text) throw 'Link Video Bokep Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/xnxxdl', { url: text }, 'apikey'))
sanzy.sendMessage(m.chat, { video: { url: webapi.result.result.files.hls }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break

case 'artinama': {
if (!text) throw 'Nama Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/artinama', { nama: text }, 'apikey'))
txt =`Arti : ${webapi.result.arti}`
m.reply(txt)
}
break
case 'cariresep': {
if (!text) throw 'Mau Cari Resep Apa ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/cariresep', { query: text }, 'apikey'))
resultnya = webapi.result.data
for (var x of resultnya) {
txt =`Creator : ${webapi.result.creator}
Judul : ${x.judul}
Link : ${x.link}`
}
m.reply(txt)
}
break

case 'liriklagu': {
if (!text) throw 'Judul Lagu Nya Apa ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/liriklagu', { query: text }, 'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Lirik : ${x.result}`
}
m.reply(txt)
}
break
case 'wikisearch': {
if (!text) throw 'Mau Cari Apa ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/wikisearch', { query: text }, 'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Wiki : ${x.wiki}
Judul : ${x.judul}`
imagenya = await getBuffer(x.thumb)
}
sanzy.sendMessage(m.chat, {image: imagenya, caption: txt}, {quoted:ftroli})
}
break
case 'herodetails': {
if (!text) throw 'Nama Hero Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/herodetails', { name: text }, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result.image }, caption: `Hero Name : ${webapi.result.hero_name}\nEtrance Quotes : ${webapi.result.etrance_quotes}\nHero Feature : ${webapi.result.hero_feature}\nMovement Speed : ${webapi.result.attributes.movement_speed}\nPhysical Attack : ${webapi.result.attributes.physical_attack}\nMagic Power : ${webapi.result.attributes.magic_power}\nAttack Speed : ${webapi.result.attributes.attack_speed}\nPhysical Defense : ${webapi.result.attributes.physical_defense}\nMagic Defense : ${webapi.result.attributes.magic_defense}\nBasic Attack Crit Rate : ${webapi.result.attributes.basic_atk_crit_rate}\nHp : ${webapi.result.attributes.hp}\nMana : ${webapi.result.attributes.mana}\nAbility Crit Rate : ${webapi.result.attributes.ability_crit_rate}\nHp Regen : ${webapi.result.attributes.hp_regen}\nMana Regen : ${webapi.result.attributes.mana_regen}\nBattle Point : ${webapi.result.price.battle_point}\nDiamond : ${webapi.result.price.diamond}\nHero Fragment : ${webapi.result.price.hero_fragment}\nRole : ${webapi.result.role}\nDurability : ${webapi.result.skill.durability}\nOffense : ${webapi.result.skill.offense}\nSkill Effects : ${webapi.result.skill.skill_effects}\nDifficulty : ${webapi.result.skill.difficulty}\nSpeciality : ${webapi.result.speciality}\nLaning Recommendation : ${webapi.result.laning_recommendation}\nRelease Date : ${webapi.result.release_date}\nBackground Story : ${webapi.result.background_story}`}, { quoted: ftroli })
}
break
case 'dafontsearch': {
if (!text) throw 'Nama Font Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/dafontsearch', { query: text }, 'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Judul : ${x.judul}
Style : ${x.style}
Link : ${x.link}
Total : ${x.total}`
}
m.reply(txt)
}
break
case 'pinterest': {
if (!text) throw 'Mau Cari Gambar Apa ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/pinterest', { query: text }, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result.url }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break
case 'linkwa': {
if (!text) throw 'Mau Cari Group Wa Apa ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/linkwa', { nama: text }, 'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Nama : ${x.nama}\nLink : ${x.link}`
}
m.reply(txt)
}
break
case 'playstore': {
if (!text) throw 'Mau Cari Aplikasi Atau Game Apa ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/playstore', { name: text }, 'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Nama : ${x.name}\nLink : ${x.link}\nDeveloper : ${x.developer}\nLink Developer : ${x.link_dev}`
}
m.reply(txt)
}
break

case 'ghstalk': {
if (!text) throw 'Username Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/ghstalk', { username: text }, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result.avatar_url }, caption: `Login : ${webapi.result.login}\nId : ${webapi.result.id}\nUrl : ${webapi.result.url}\nType : ${webapi.result.type}\nSite Admin : ${webapi.result.site_admin}\nName : ${webapi.result.name}\nCompany : ${webapi.result.company}\nBlog : ${webapi.result.blog}\nLocation : ${webapi.result.location}\nEmail : ${webapi.result.email}\nHireable : ${webapi.result.hireable}\nBio : ${webapi.result.bio}\nTwitter Username : ${webapi.result.twitter_username}\nPublic Repos : ${webapi.result.public_repos}\nPublic Gists : ${webapi.result.public_gists}\nFollowers : ${webapi.result.followers}\nFollowing : ${webapi.result.following}\nCreated At : ${webapi.result.created_at}\nUpdated At : ${webapi.result.updated_at}`}, { quoted: ftroli })
}
break
case 'igstalk': {
if (!text) throw 'Username Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/igstalk', { username: text }, 'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result.thumbnail }, caption: `Username : ${webapi.result.username}\nFull Name : ${webapi.result.fullname}\nVerified : ${webapi.result.verified}\nVideo Count Reel : ${webapi.result.video_count_reel}\nFollowers : ${webapi.result.followers}\nFollow : ${webapi.result.follow}\nIs Bussines : ${webapi.result.is_bussines}\nIs Professional : ${webapi.result.is_professional}\nCategory : ${webapi.result.category}`}, { quoted: ftroli })
}
break
case 'covid': {
if (!text) throw 'Nama Negaranya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/covid', { negara: text }, 'apikey'))
txt =`Kasus : ${webapi.result.result.kasus}\nMeninggal : ${webapi.result.result.meninggal}\nSembuh : ${webapi.result.result.sembuh}`
m.reply(txt)
}
break
case 'gempa': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/gempa', {}, 'apikey'))
txt =`Waktu : ${webapi.result.Waktu}\nLintang : ${webapi.result.Lintang}\nBujur : ${webapi.result.Bujur}\nMagnitudo : ${webapi.result.Magnitudo}\nKedalaman : ${webapi.result.Kedalaman}\nWilayah : ${webapi.result.Wilayah}`
m.reply(txt)
}
break
case 'kompas': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/kompas', {}, 'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Title : ${x.title}\nDesc : ${x.desc}\nDate : ${x.date}\nLink : ${x.link}`
}
m.reply(txt)
}
break
case 'film': {
if (!text) throw 'Masukan Judul Film Nya'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/film', { query: text }, 'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Author : ${x.author}\nJudul : ${x.judul}\nQuality : ${x.quality}\nType : ${x.type}\nUpload : ${x.upload}\nLink : ${x.link}`
imagenya = await getBuffer(x.thumb)
}
sanzy.sendMessage(m.chat, {image: imagenya, caption: txt}, {quoted:ftroli})
}
break
case 'tribunnews': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/tribunnews', {},'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Title : ${x.title}\nDesc : ${x.desc}\nDate : ${x.date}\nLink : ${x.link}`
}
m.reply(txt)
}
break
case 'jadwalbola': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/jadwalbola', {},'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Author : ${x.author}\nJadwal : ${x.jadwal}\nTanggal : ${x.tanggal}\nJam : ${x.jam}\nUrl : ${x.url}`
}
m.reply(txt)
}
break
case 'jadwaltv': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/jadwaltv', {},'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Author : ${x.author}\nAcara : ${x.acara}\nChannel : ${x.channel}\nJam : ${x.jam}\nSource : ${x.source}`
}
m.reply(txt)
}
break
case 'jadwalsholat': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/jadwalsholat', {},'apikey'))
txt =`Tanggal : ${webapi.result.tanggal}\nImsyak : ${webapi.result.imsyak}\nSubuh : ${webapi.result.subuh}\nDzuhur : ${webapi.result.dzuhur}\nAshar : ${webapi.result.ashar}\nMaghrib : ${webapi.result.maghrib}\nIsya : ${webapi.result.isya}`
m.reply(txt)
}
break

case 'accelworld':
case 'animegirl':
case 'codegeas':
case 'naruto':
case 'onepiece':
case 'samuraix':
case 'tokyoghoul':
case 'tokyorevenger':
case 'transformerwp':
case 'vocaloid': {
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', `/${command}`, {},'apikey'))
sanzy.sendMessage(m.chat, { image: { url: webapi.result.url }, caption: `Nih Kak....`}, { quoted: ftroli })
}
break

case 'kusonimesearch': {
if (!text) throw 'Judul Anime Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/scrapKusonime', { query: text },'apikey'))
txt =`Creator : ${webapi.result.creator}\nTitle : ${webapi.result.title}\nTitle Japan : ${webapi.result.title_jp}\nView : ${webapi.result.view}\nGenre : ${webapi.result.genre}\nSeason : ${webapi.result.season}\nProducers : ${webapi.result.producers}\nType : ${webapi.result.type}\nStatus Anime : ${webapi.result.status_anime}\nTotal Episode : ${webapi.result.total_episode}\nScore : ${webapi.result.score}\nDuration : ${webapi.result.duration}\nReleased : ${webapi.result.released}\nDescription : ${webapi.result.description}`
sanzy.sendMessage(m.chat, { image: { url: webapi.result.thumb }, caption: txt}, { quoted: ftroli })
}
break
case 'manggatoon': {
if (!text) throw 'Judul Anime Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/manggaToon', { judul: text },'apikey'))
txt =`Judul : ${webapi.result.judul}\nGenre : ${webapi.result.genre}\nLink : ${webapi.result.Link}`
sanzy.sendMessage(m.chat, { image: { url: webapi.result.thumb }, caption: txt}, { quoted: ftroli })
}
break
case 'chara': {
if (!text) throw 'Judul Anime Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/chara', { query: text },'apikey'))
txt =`Nama : ${webapi.result.nama}\nGender : ${webapi.result.gender}\nWarna Rambut : ${webapi.result.warna_rambut}\nDescription : ${webapi.result.description}`
m.reply(txt)
}
break
case 'anime': {
if (!text) throw 'Judul Anime Nya Mana ?'
m.reply(mess.wait)
webapi = await fetchJson(api('sanzy', '/anime', { query: text },'apikey'))
resultnya = webapi.result
for (var x of resultnya) {
txt =`Judul : ${x.judul}\nLink : ${x.link}`
}
m.reply(txt)
}
break

//━━━━━━━━━━━━━━━[ AKHIR FITUR ]━━━━━━━━━━━━━━━━━//

default:
if (budy.startsWith('=>')) {
if (!isCreator && !m.key.fromMe) return m.reply(mess.owner)
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return m.reply(bang)
}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))
}
}

if (budy.startsWith('>')) {
if (!isCreator && !m.key.fromMe) return m.reply(mess.owner)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m = String(err)
await m.reply(m)
}
}

if (budy.startsWith('$')) {
if (!isCreator && !m.key.fromMe) return reply(mess.owner)
exec(budy.slice(2), (err, stdout) => {
if(err) return m.reply(err)
if (stdout) return m.reply(stdout)
})
}
}
       
if (budy.includes('6281276698054')) {  
sanzy.sendMessage(m.chat, {text: 'Ada Apa Ya Tags Owner Saya'}, {quoted: ftroli})
	  }	  

} catch (err) {
m.reply(util.format(err))
}
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
