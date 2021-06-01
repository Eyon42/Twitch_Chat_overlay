function isScrolledUpOutOfView(el) {
    const rect = el.getBoundingClientRect();
    return (rect.bottom >= 0);
}

const app = Vue.createApp({
    data () {
        return {
            channel : "Eyon_42"
        }
    },
    template: `
    <board
        v-bind:channel="channel"
    ></board>
    `
});

app.component("board", {
    props: ["channel"],
    data() {
        return {
            messages : [],
            m_count : 0,
        };
    },
    mounted() {
        this.client = new tmi.Client({
            channels: [ this.channel ]
        });
        this.client.connect();
        this.client.on('message', (channel, tags, message, self) => {
            this.messages.push({message : message, tags : tags, id:this.m_count});
        });
        this.m_count++
    },
    updated () {
        // Scroll last message into view
        document.getElementById('chat-bottom').scrollIntoView();
        // Check if the first element of the list is visible. If not, delete it
        first_message = document.getElementById(`message-n-${this.messages[0].id}`)
        if (!isScrolledUpOutOfView(first_message)) {
            this.messages.shift()
        }
    },
    template: `
    <div id="chat-board">
        <message
            v-for="m in messages"
            :data="m"
            :key=m.id
        ></message>
        <span id="chat-bottom"></span>
    </div>`,
});

app.component("message", {
    props: ["data"],
    template: `
    <div class="chat-message" :id="messageID">
        <p>
            <span :class="authorClass">
                {{ data.tags['display-name'] }}
            </span>
            : {{ data.message }}
        </p>
    </div>`,
    computed: {
        authorClass() {
            return {
                "chat-author" : true,
                "chat-author-broadcaster" : this.data.tags.badges.broadcaster === "1",
                "chat-author-moderator" : this.data.tags.badges.moderator === "1"
            }
        },
        messageID() {
            return "message-n-" + this.data.id
            // Used to know if the component is on view (see: board component update)
        },
    }
});
const vm = app.mount('#app')