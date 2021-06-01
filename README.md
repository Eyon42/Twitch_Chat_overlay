# Twitch_Chat_overlay
A Twitch chat overlay as simple static website.

This is the overlay I use for my streams on [Twitch](https://www.twitch.tv/eyon_42)

To use in your own stream replace "Eyon_42" with your channel name

```js
const app = Vue.createApp({
    data () {
        return {
            channel : "Your_Channel"
        }
}
```
# To-Do:
- Add sample image
- Pack all into a single file release
- Emoji support(It's not hard, it's knowing the emoji keywords and replacing them with the corresponding image)
