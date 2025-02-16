const game = require("../lib/game/game");
const { getConfig } = require("../util/config");
const {gameChannel} = getConfig();
const play = require('play-dl');
const musicAll = require(`../commands/music.json`)
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const { AudioPlayerStatus } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const { MessageEmbed } = require("discord.js");
const { VoiceConnectionStatus, entersState } = require('@discordjs/voice');

module.exports = {
  name: "p",
  description: "Ставит текущую игру на паузу",
  hostOnly: true,
  inGameOnly: true,
  async run(message) {
    const coco = message.client.guilds.cache.get(`959870711680364564`).channels.cache.get(gameChannel)

    try {
      const randomMusic = musicAll[Math.floor(Math.random() * musicAll.length)];
      
      const connection = joinVoiceChannel({
        channelId: `975452788559581224`,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: false
      });

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Play,
          maxMissedFrames: 100
        }
      });

      connection.subscribe(player);

      const stream = await play.stream(randomMusic, {
        discordPlayerCompatibility: true,
        quality: 2,
        seek: 0,
        precache: 100,
        requestOptions: {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        }
      });

      const resource = createAudioResource(stream.stream, {
        inputType: stream.type,
        inlineVolume: true,
        silencePaddingFrames: 5
      });

      resource.volume?.setVolume(0.2);
      player.play(resource);

      player.on(AudioPlayerStatus.Playing, () => {
        console.log('The audio player has started playing!');
      });

      player.on('error', error => {
        console.error('Ошибка плеера:', error);
      });

      connection.on(VoiceConnectionStatus.Disconnected, async () => {
        try {
          await Promise.race([
            entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
            entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
          ]);
        } catch (error) {
          connection.destroy();
        }
      });

      const videoInfo = await play.video_info(randomMusic);
      const tit = new MessageEmbed()
        .setDescription(`Сейчас проигрывается - **${videoInfo.video_details.title}**`)
      coco.send({embeds: [tit]});

    } catch (error) {
      console.error('Ошибка при воспроизведении музыки:', error);
      const titerr = new MessageEmbed()
        .setDescription(`**Ошибка при воспроизведении музыки**`)
      coco.send({embeds: [titerr]});
    }

    game.pause();
  },
};
