Cocaine — 18/04/2025, 13:58
Yeah I can try in the morning thank you
Cocaine — 18/04/2025, 13:58
I believe so
Cocaine — 18/04/2025, 13:58
A new folder in .Eliza? Or a new .Eliza folder
AIFlow.ML @ ElizaOS — 18/04/2025, 14:00
The node cpp work on all platform so if the model got DL it should also run.
Can you check in the folder if is there ?
[ai16z] <vesper8888>
APP
— 18/04/2025, 14:46
what works and what is broken now ? These new changes are so confusing lol
endgamebro — 18/04/2025, 15:08
hey for the sqlite in v2, where is it stored? I dont seem to be able to find it as I want to do an agent reset
sayonara — 18/04/2025, 15:21
On desktop or documents
sayonara — 18/04/2025, 15:22
Did it ever show you long download progress
[ai16z] <okulperilousscamfrog>
APP
— 18/04/2025, 15:36
quick question
when defining actions what is the purpose of returning true or false
sayonara — 18/04/2025, 15:37
Where?
ai16z-bridge-odi
APP
— 18/04/2025, 15:40
[ai16z] <okulperilousscamfrog> in the actions there is a handler, i see a lot of actions returning true or false for it
[ai16z] <wookosh>
APP
— 18/04/2025, 16:50
is there a way to turn off the admin-panel when starting with cli? seems like a huge security risk to have an insecure admin panel turned on by default?
[ai16z] <okulperilousscamfrog>
APP
— 18/04/2025, 17:04
i need help with the telegram client plugin
if anyone is familiar with using it regularly i would very much appreciate help
AffiliateWeapons.com — 18/04/2025, 17:10
does the eliza-starter support v2?
ai16z-bridge-odi
APP
— 18/04/2025, 17:12
[ai16z] <wookosh> no, use the cli tool instead: https://eliza.how/docs/cli/overview
ElizaOS CLI Overview | eliza
Comprehensive guide to the ElizaOS Command Line Interface (CLI) tools and commands

AffiliateWeapons.com — 18/04/2025, 17:12
ok thanks
AffiliateWeapons.com — 18/04/2025, 17:22
wow v2 is a mess
Image
Kenk — 18/04/2025, 17:30
are you using v2 develop branch?
AffiliateWeapons.com — 18/04/2025, 17:35
not sure
Cocaine — 18/04/2025, 17:44
Actually yeah it did when it’s trying to think of a response to my input of “hey”
0xbbjoker — 18/04/2025, 17:48
how did you setup your .env?

if you are on linux/mac try removing this and start again pls: rm -rf ~/.eliza

this is created in your root on the start and it will add database to ~/.eliza/db .
AffiliateWeapons.com — 18/04/2025, 18:00
which commands to install testing v2 with twitter ?
from scratch
i tried 3 ways and they all broke
I'm a developer
sayonara — 18/04/2025, 18:01
Might have to take you on screen share lol
What’s your availability
AffiliateWeapons.com — 18/04/2025, 18:08
allright, so this page should mention that you need "bun" on mac
https://eliza.how/docs/cli/overview
ElizaOS CLI Overview | eliza
Comprehensive guide to the ElizaOS Command Line Interface (CLI) tools and commands

but then you run in another error
Image
sayonara — 18/04/2025, 18:13
In the second command we need to fix that documentation untill v2 is out fully

Use npx @Elizaos/cli@beta start
AffiliateWeapons.com — 18/04/2025, 18:14
okay finally got it working with choosing pglite
Image
then saying hi gives
Image
rossudev — 18/04/2025, 18:26
Is there a "not broken" stable version new users can enjoy?
[ai16z] <2wljw2c5lm03504>
APP
— 18/04/2025, 18:27
@[elizaos] <mevinator> admin should provide a stable version
ai16z-bridge-odi
APP
— 18/04/2025, 18:28
[ai16z] <wookosh> I've been using 1.0.0-beta.27, seems stable enough.
AffiliateWeapons.com — 18/04/2025, 18:34
[2025-04-18 13:02:05] INFO: Starting starter service
[2025-04-18 13:03:05] INFO: MESSAGE_RECEIVED event received
[2025-04-18 13:03:05] ERROR: Failed to generate embedding:
message: "(Error) No handler found for delegate type: TEXT_EMBEDDING"
stack: [
"Error: No handler found for delegate type: TEXT_EMBEDDING",
ai16z-bridge-odi
APP
— 18/04/2025, 18:35
[ai16z] <wookosh> implies you do'nt have an LLM model setup, you need to include one in your plugins, or it default to local llama
sayonara — 18/04/2025, 18:36
Are you trying to use anthropic only?
AffiliateWeapons.com — 18/04/2025, 18:41
yes
i have anthropic key only
not openai
ok now it doesnt crash but I'm getting "No worlds found for this agent" after I say "hi"
sayonara — 18/04/2025, 19:00
You need an embedding provider also anthropic not does have that
So need to add open ai or add local ai plugin which can do this locally for you or ollama
AffiliateWeapons.com — 18/04/2025, 19:01
importing a JSON says:
error: "Invalid input for string type"
even with minmal JSON (name, system field only)
DeFine — 18/04/2025, 19:07
it seems imposible to launch the docker container, anyone has success with docker-compose up?
ai16z-bridge-odi
APP
— 18/04/2025, 19:08
[ai16z] <wookosh> Yeah but it was a while ago... what's the issue?
[ai16z] <okulperilousscamfrog>
APP
— 18/04/2025, 19:12
@jones084102 is a scammer pls remove him
sayonara — 18/04/2025, 19:25
@tcm390
0xbbjoker — 18/04/2025, 19:28
https://x.com/hashwarlock/status/1904449112772104691
tcm390 — 18/04/2025, 19:40
Could you send me your json file?
DeFine — 18/04/2025, 19:41
i wasn't able to build it once, but it could be launched as dev container
DeFine — 18/04/2025, 19:43
thank you but we are looking to deploy locally not on the phala network
AffiliateWeapons.com — 18/04/2025, 19:50
{
"name": "agent.dog",
"settings": {
"secrets": {},
"voice": {
"model": "en_US-male-medium"
Expand
minimal.json
1 KB
ai16z-bridge-odi
APP
— 18/04/2025, 19:57
[ai16z] <wookosh> can you give a bit more detail? what's the error(s)? what do you mean by "dev container"?
DeFine — 18/04/2025, 20:02
rerunning it now so i can sent you the log

nvm the dev container it was my mistake vs code gives the dev containeroption when you open a repo with dev container but it jsut copys the files it does not do any build process
Image
@ai16z-bridge-odi => CACHED [eliza builder 7/10] 0.0s
=> CACHED [eliza builder 8/10] 0.0s
=> CACHED [eliza builder 9/10] 0.0s
=> ERROR [eliza builder 10/10] R 2.4s

---

> [eliza builder 10/10] RUN bun run build:
> 0.294 $ turbo run build --filter=@elizaos/client && turbo run build --filter=!@elizaos/docs
> 0.439
> 0.439 Attention:
> 0.439 Turborepo now collects completely anonymous telemetry regarding usage.  
> 0.439 This information is used to shape the Turborepo roadmap and prioritize features.
> 0.439 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
> 0.439 https://turbo.build/repo/docs/telemetry
> 0.439
> success in 18ms
> 2.021 @elizaos/client:build: cache bypass, force executing 47a3c29f3da7a4f3
> 2.024 @elizaos/client:build: $ bun run extract-version && vite build
> 2.027 @elizaos/client:build: $ bash ./version.sh
> 2.029 @elizaos/client:build: ./version.sh: line 2: $'\r': command not found
> 2.029 @elizaos/client:build: ./version.sh: line 5: $'\r': command not found
> 2.029 @elizaos/client:build: ./version.sh: line 29: syntax error: unexpected end of file
> 2.031 @elizaos/client:build: ERROR: command finished with error: command (/app/packages/client) /app/node_modules/.bin/bun run build exited (2)
> \*\*2.031 @elizaos/client#build: command (/app/packages/client) /app/node_modules/.bin/bun run build exited (2)
> 2.032
> 2.032 Tasks: 1 successful, 2 total
> 2.032 Cached: 0 cached, 2 total
> 2.032 Time: 1.587s
> 2.032 Failed: @elizaos/client#build
> 2.032

## 2.039 ERROR run failed: command exited (2)

failed to solve: process "/bin/sh -c bun run build" did not complete successfully: exit code: 2\*\*
i think it's clrf, maybe the person who created the dockerfiles and tested them used linux as host without accounting for the windows host cases
tcm390 — 18/04/2025, 20:13
I think there’s a small syntax error:
"system": [
"You are an AI agent.'"
]
"system": [
"You are an AI agent."
]
0xbbjoker — 18/04/2025, 20:25
okay so I've just tested this and it's working:
docker build -t eliza . ,
and then as I am spinning pg in sep container,
docker run -p 3000:3000 -e POSTGRES_URL=postgresql://postgres:postgres@host.docker.internal:5555/eliza2 eliza,
or you can add this in .env and then:
add this to .env -> POSTGRES_URL=postgresql://postgres:postgres@host.docker.internal:5555/eliza2,
docker run -p 3000:3000 --env-file .env eliza,
DeFine — 18/04/2025, 20:40
Thanks! Testing
Also it worked with docker-compose up when the Windows-style line endings where (CRLF or \r\n) where converted to Unix-style (LF or \n)
AffiliateWeapons.com — 18/04/2025, 21:14
are there any working v2 plugin examples
I made a v1 plugin before, and would like to continue making it work for v2
Nisita — 18/04/2025, 21:22
Team is currently working on finding ways to migrate V1 plugins to V2, so it's easier on your end. Once the assessment is complete, we'll have a better idea of which approach we'll be taking and will provide you with clear next steps (if any).
vaib.ag — 18/04/2025, 21:45
Hi, a newbie here.. could anyone tell me how to listen to twitter mentions.
I took help from chatgpt and created a plugin but it did not even fired up in eliza-starter
tcm390 — 18/04/2025, 22:06
https://github.com/elizaOS/eliza/blob/51581ef25e067a4dc7ea032d1e549de9b065d900/packages/plugin-twitter/src/interactions.ts#L126

vaib.ag — 18/04/2025, 22:10
Just confirming the approach..

I should write a new action and call the mentions function in that action and perform the further action? Like passing to openai and get a cool response for it?
jin — 19/04/2025, 00:03
if there are issues / inconsistencies with the docs, please file an issue 🙏
sayonara — 19/04/2025, 01:21
need to add this info in docs somewhere @jin
Redvoid — 19/04/2025, 02:34
Is v2 stable to use for production?
which branch should i use
Odilitime — 19/04/2025, 02:43
I would say no, you can try it out. It doesn’t work with the plugin registry
v2-develop
Also eliza.how has a 1.0 quick start for it
Try it out and let us know what rough spots you hit
[ai16z] <OpenRouter #announcemen
APP
— 19/04/2025, 03:14
Exciting feature for developers:

In-stream usage accounting!,
Now you can get model-native token counts and credit usage at the end of every completion stream, for any model. No extra API call needed :7811partyrobotd:

{
"object": "chat.completion.chunk",
"usage": {
"completion_tokens": 2000,
"completion_tokens_details": {
"reasoning_tokens": 100
},
"cost": 0.2,
"prompt_tokens": 194,
"prompt_tokens_details": {
"cached_tokens": 20
},
"total_tokens": 2194
}
}

Docs available here: https://openrouter.ai/docs/use-cases/usage-accounting.

More info @here: https://x.com/OpenRouterAI/status/1913345350397460758
OpenRouter (@OpenRouterAI) on X
✨New for devs: in-stream usage accounting!

Everything you need to track AI model usage (incl. cached tokens), without a new API call.

Simply request `usage: { include: true }` 👇
OpenRouter (@OpenRouterAI) on X

X•19/04/2025, 03:04
Redvoid — 19/04/2025, 04:16
Got it thanks
Curious about client-direct - in v1, does it run by default? or do i need to install it?
Also declare it in the character to be able to use the API?
Odilitime — 19/04/2025, 04:32
It’s default
tcm390 — 19/04/2025, 07:07
Hi dmed you
[ai16z] <felixdigit>
APP
— 19/04/2025, 07:16
yio, the replies of my agent on X are hidden. EVen if account is verified now.
ai16z-bridge-odi
APP
— 19/04/2025, 08:25
[ai16z] <albert421> I just encounter the same problem,do you have solution now?
Daniel Jai — 19/04/2025, 11:04
cd
ai16z-bridge-odi
APP
— 19/04/2025, 15:29
[ai16z] <felixdigit> No I will try to find the answer in the docs or in this server!
[ai16z] <LarpsAI>
APP
— 19/04/2025, 15:44
which db adapter works best with V2 dev?
[ai16z] <lawd_one>
APP
— 19/04/2025, 18:09
there is currently no plugin for gemini in v2?
VALIPOKKANN — 19/04/2025, 20:41
am stuck here when trying to run eliza starter
[2025-04-19 15:10:07] ERROR: Error starting agents:
hi
Error fetching response: SyntaxError: Unexpected token 'A', "Agent not found" is not valid JSON
at JSON.parse (<anonymous>)
VALIPOKKANN — 19/04/2025, 21:21
Image
[ai16z] <LarpsAI>
APP
— 19/04/2025, 23:48
gamechanger imo
https://www.youtube.com/watch?v=ywMWpmOOaSo
YouTube
Cole Medin
Google is Quietly Revolutionizing AI Agents (This is HUGE)
Image
jin
pinned a message to this channel. See all pinned messages. — 20/04/2025, 00:41
Martin Rivera — 20/04/2025, 02:15
I think your character JSON file is wrong
For more details, let 's chat in DM
Plz add me in your friend list
VALIPOKKANN — 20/04/2025, 07:55
added
Kenk — 20/04/2025, 15:08
plugins are yet to be migrated for V2 -- we'll update the community when they are
Kenk — 20/04/2025, 15:09
are you using v1 or v2 here ?
Kenk — 20/04/2025, 15:46
no 0.x might be better for telegram atm
[ai16z] <ekipoure>
APP
— 20/04/2025, 20:25
Hi
I want to use gemini for client-telegram with eliza-starter.
But i have error.
I just set: GOOGLE_GENERATIVE_AI_API_KEY.

Can you please help me?
[2025-04-20 14:50:16] ERROR: Failed to generate embedding:
[2025-04-20 14:50:16] ERROR: Failed to initialize BGE model:
[2025-04-20 14:50:16] ERROR: Local embedding failed:
[2025-04-20 14:50:16] WARN: Local embedding failed, falling back to remote
[2025-04-20 14:50:16] ERROR: API Response:
[2025-04-20 14:50:16] ERROR: Full error details:
file:///discs/g/Source/eco-bot/eco-bot/eco-bot-eliza/eliza-starter/nodemodules/.pnpm/@elizaos+core@0.1.9@google-cloud+vertexai@1.9.2_@langchain+core@0.3.30_openai@4.78.1_zod@3.2_3pbzefte534i22dwkuq2q7akl4/node_modules/@elizaos/core/dist/index.js:2528
throw new Error(
^

Error: Embedding API Error: 404 Not Found
at getRemoteEmbedding (file:///discs/g/Source/eco-bot/eco-bot/eco-bot-eliza/eliza-starter/nodemodules/.pnpm/@elizaos+core@0.1.9@google-cloud+vertexai@1.9.2_@langchain+core@0.3.30_openai@4.78.1_zod@3.2_3pbzefte534i22dwkuq2q7akl4/node_modules/@elizaos/core/dist/index.js:2528:13)
at process.processTicksAndRejections (node:internal/process/task_queues:105:5)

This is my error.
standard — 20/04/2025, 21:58
I was looking at the discord plugin
Actually in the entire monorepo I can only see where the events are being emitted
Image
are they being subscribed to at all?
I haven't run it with the discord plugin active yet but just reading it idk how it works after the event DiscordEventTypes.MESSAGE_SENT is emitted for example
Like in plugin-bootstrap event MESSAGE_RECIEVED is picked up
Image
but for plugin-discord its not picked up at all anywhere in the repo
Same for Telegram events on the telegram plugin
Image
standard — 20/04/2025, 22:08
@Odilitime
Oh I see
Image
It literally emits both
But when would the Discord specific one get picked up?
Also - if we assume that plugin-bootstrap picks up event MESSAGE_RECEIVED
Callback gets called once before processActions with the response content
Image
When I've been testing it though it calls action REPLY which then hits the callback again, so that's the same callback twice
Image
that part is confusing me
Odilitime — 20/04/2025, 23:49
plugin-bootstrap has the event reciever
[ai16z] <trufflesoul>
APP
— 21/04/2025, 03:13
Hi guys. How can I write to the developers about my request so that they notice it? Why hasn't such a function been implemented yet - like posting pictures that are already ready and just lie in a folder (for example, on the server). It is necessary for the AI ​​agent, when creating a post or writing a Reply, to also attach a picture that it will take from the folder at random, absolutely any. Please help convey this idea to the developers. Or if someone already knows how to implement this, please share the solution.
standard — 21/04/2025, 04:05
I was confused about how the callback is called before process actions but also in the reply action
So effectively its called twice
I see through comments that the first callback assumes the text isn't present in the response but via log debugging i see that it is
So ur callback in whatever discord service or anything would get hit twice
[ai16z] <LarpsAI>
APP
— 21/04/2025, 13:58
this mcp is glorious! @jin u could migrate eliza docs to this and they will format them for Context7 use. its much better than llm.txt approach.
https://www.youtube.com/watch?v=G7gK8H6u7Rs
YouTube
Cole Medin
This is Hands Down the BEST MCP Server for AI Coding Assistants
Image
sayonara — 21/04/2025, 14:12
Yea
[ai16z] <flipwhale>
APP
— 21/04/2025, 14:24
Has anyone been able to make the plugin-image-generation to work with the twitter client or at all? I don't think the plugin is triggering at all even though it's part of the build - 0.25.9
ai16z-bridge-odi
APP
— 21/04/2025, 14:25
[ai16z] <k_carv> submitting an issue into the github might be a route here. that said if i am understanding the idea correctly, within v2 you will be able to call APIs and this could be to read files from a google folder, for example. Could you clarify if I have understood correctly?
ai16z-bridge-odi
APP
— 21/04/2025, 16:11
[ai16z] <cyber_zarathustra> Try during elizaOS office hours, theres a Q&A with shaw
ai16z-bridge-odi
APP
— 21/04/2025, 16:46
[ai16z] <k_carv> yep that's a good point, we also have a dev rel weekly office hours that you can add to your calendar here: https://calendar.google.com/calendar/embed?src=c_ed31cea342d3e2236f549161e6446c3e407e5625ee7a355c0153befc7a602e7f%40group.calendar.google.com&ctz=America%2FToronto
elizaOS Developer Ecosystem
モーテンセン — 21/04/2025, 17:52
Guys I have a quick question, how do I setup my plugin to communicate with my database?
For instance, when the Eliza starts I want to load into the knowledge all the data of the database, or it does it automatically? the thing is, how do I retrieve that data from the plugin specifically? Do I need to connect or something via PostgreSQL credentials or something? how does it works?
Zarathustra — 21/04/2025, 18:32
Anybody here have been playing with tempereature settings? I'm running 0.25 and no matter how I change temperature or change the lore, style and message example the character stays the same. In the terminal I can see that all the changes have been added just the "character" of the agent doesn't change.
[ai16z] <bowtiedbluefin>
APP
— 21/04/2025, 19:48
Is there a plugin to use a custom openAI API compatible base URL and API key. I'm only seeing them setup strictly by provider, but need to use one with a custom API provider that I'm working with.
0xbbjoker — 21/04/2025, 22:24
if talking about v2:
https://github.com/elizaOS/eliza/blob/v2-develop/packages/the-org/src/devRel/index.ts example how to add character knowledge,
if you want to do this in the plugin -> runtime.addKnowledge should be accessible from the plugin.,
モーテンセン — 21/04/2025, 23:10
thanks!
Rascar — 21/04/2025, 23:37
eliza-v2 does not work with deepseek? I could not find the plugin to use the deepseek llm
ai16z-bridge-odi
APP
— 21/04/2025, 23:43
[ai16z] <k_carv> You may need to create your own plugin, which you can do by following here - https://eliza.how/docs/core/plugins

this might also be useful https://github.com/carv-protocol/plugin-d.a.t.a
Plugin System | eliza
Learn about ElizaOS plugins - modular extensions that enhance agent capabilities
Plugin System | eliza
GitHub
GitHub - carv-protocol/plugin-d.a.t.a
Contribute to carv-protocol/plugin-d.a.t.a development by creating an account on GitHub.
Contribute to carv-protocol/plugin-d.a.t.a development by creating an account on GitHub.
モーテンセン — 21/04/2025, 23:44
i've done that!
ai16z-bridge-odi
APP
— 21/04/2025, 23:45
[ai16z] <k_carv> Ok — can you share a repo, or specifically the character file
モーテンセン — 21/04/2025, 23:46
@ai16z-bridge-odi i have this issues whenever I start the project
Image
I need a logs relations on my database already
do i need to create the relation agents? can't it create it by itself?
ai16z-bridge-odi
APP
— 21/04/2025, 23:53
[ai16z] <k_carv> Not sure I’ve understood correctly but you need to add your API key to the env file.

If it’s a separate source of instance to generic OpenAI you might need to set this up as a new LLM option in the framework
ai16z-bridge-odi
APP
— 21/04/2025, 23:57
[ai16z] <bowtiedbluefin> Exactly what I was asking - if there was a custom OpenAI compatible LLM option where you add the base url and api key. I guess I need to create a new plugin
ai16z-bridge-odi
APP
— 22/04/2025, 00:07
[ai16z] <k_carv> Gotcha, yeah I’ve not seen that before. Unsure if that’d be a new plugin, or adding a new instance provider within the env file.

It’s not something I’ve done before. One of the core devs might be able to add further colour.
Zarathustra — 22/04/2025, 00:16
it's the default character.ts file. I deleted / modified the lore, adjevtives, bio etc. Even the hard coded messageExamples don't seem to work for me. And obviously also the temperature doesn't change it.
0xbbjoker — 22/04/2025, 00:29
drop pg instance -> drop volume if you don't need to persist data.

start again.

this is happening bc you have \_\_drizzle_migrations table in your postgres.

also you could remove this record from table for the migraitons to run again...
Image
Image
0xbbjoker — 22/04/2025, 00:38
for temperature you should adjust that in the code.

for bio, lore, message examples if you could clarify the issue a bit more?
Zarathustra — 22/04/2025, 00:47
I did change it in the code. It's confirmed in terminal when I run it. But I have the feeling it hase no influence on the character.
Image
Image
Martin Rivera — 22/04/2025, 01:07
In my experience, style -> chat makes notable changes. This is instruction of manner for agent. 🙂
Zarathustra — 22/04/2025, 01:24
Thanks, will try to improve it that way
LemonS — 22/04/2025, 02:59
was this fixed?
[ai16z] <jakleupageus>
APP
— 22/04/2025, 03:05
I developed a plugin that allows the agent to communicate via MIDI that supports virtual midi in/out ports so that you can effectively utilize your agent as a MIDI instrument in and of itself. Has this been done yet?
Hidden Forces — 22/04/2025, 03:31
Running into the same CSP issues with V2 on a Windows machine - used gitbash to work out the installation.

Server is running from pnpm start:client but the browser can't connect. character.json is being found and loaded into the server instance.

One issue looks to be Content Security Policy triggering from an eval statement.

Did you find a workaround?
モーテンセン — 22/04/2025, 04:25
I deleted the table and I still get the error...
Image
Image
drop pg instance -> drop volume can you elaborate?
0xbbjoker — 22/04/2025, 04:52
I mean wipe db fully and start from fresh.
For example if you run postgres in docker you can drop volume.
モーテンセン — 22/04/2025, 04:53
okay thanks
LemonS — 22/04/2025, 05:58
where is the sql url stored when a new project is created using cli and it asks for the url?
0xbbjoker — 22/04/2025, 06:00
~/.eliza/.env
LemonS — 22/04/2025, 06:00
no env is being created
[ai16z] <kingkutah.>
APP
— 22/04/2025, 06:08
whoever greenlit andreseen to fund the mistral 7b project - id like to personally give you a blowy
LemonS — 22/04/2025, 06:30
any tutorial creating a new project and first steps using v2?
nitzan — 22/04/2025, 07:41
yo im running eliza 0.25.9 and am wondering how to get my agent to not reply/retweet/like any posts. anyone know how to do that?
sam-developer — 22/04/2025, 09:25
Yes
[ai16z] <lantianlaoli>
APP
— 22/04/2025, 11:23
Have any good example opensource project using elizaos?
Coinshome — 22/04/2025, 11:44
hey guys. how could i configue the agent to reply to the REPLIES of a target account? right now its missing them as they arent posts.. running main branch eliza 0.25.9 w twitter client installed and running well. thank you
[ai16z] <happylol123>
APP
— 22/04/2025, 13:16
who knows how to prevent agent to select "None" action if question repeats?

it just ignoring, and don't call action
[ai16z] <mtbc_69795>
APP
— 22/04/2025, 13:33
Could anyone review/approve/merge https://github.com/elizaos-plugins/plugin-zilliqa/pull/1 ? It's been tested and good to go for a while now, would nice to get this squared away then we can focus on v2.

X
GitHub
GitHub - CrucibleNetworksLtd/Eliza-Plugin-Unreal: An ElizaOS plugin...
An ElizaOS plugin for Unreal Engine. Contribute to CrucibleNetworksLtd/Eliza-Plugin-Unreal development by creating an account on GitHub.
An ElizaOS plugin for Unreal Engine. Contribute to CrucibleNetworksLtd/Eliza-Plugin-Unreal development by creating an account on GitHub.
Catoff (@CatoffGaming) on X
Esports prediction market on Solana & Sonic powered by AI Agent odds. Bet on matches, stream, & challenge friends. Game. Wager. Win.

X
Catoff
Turn everyday activities into epic challenges! Challenge friends to dares, engage in 1-on-1 duels, or join global pools for endless fun.
Image
Fuzz AI (@fuzzai_agent) on X
Advancing AI agent security through adversarial combat scenarios

CA: 0xab9aff6f259787300bbb16dd1fa0c622426aa169

TG: https://t.co/n2MP4oOk6o

X
ai16z-bridge-odi
APP
— 22/04/2025, 13:52
[ai16z] <k_carv> https://eliza.how/docs/quickstart this is the quick start guide, you need to use v2-develop brand from the elizaOS repo
Quickstart Guide | eliza
Get started quickly with ElizaOS - from installation to running your first AI agent
Quickstart Guide | eliza
[ai16z] <ak190>
APP
— 22/04/2025, 14:24
Is twitter post issue resolved in Version: 1.0.0-beta?
0xbbjoker — 22/04/2025, 15:31
https://www.youtube.com/watch?v=-4sp4ZncMWc
0xbbjoker — 22/04/2025, 15:34
loosen prompt a bit here: https://github.com/elizaOS/eliza/blob/v2-develop/packages/plugin-bootstrap/src/index.ts#L198

example Eliza is very strict and will respond to messages directed only to community manager -> so you could loosen the character a bit. But log the prompt here and see why.
[ai16z] <lantianlaoli>
APP
— 22/04/2025, 16:07
I checkout to v2-develop branch, but the src/commands/create.ts don't have import, before the push don't check if build success?

await installDependencies(targetDir);

// Skip building in test mode
if (process.env.ELIZA_NONINTERACTIVE === '1' || process.env.ELIZA_NONINTERACTIVE === 'true') {
console.log('Skipping build in test mode');
} else {
await buildProject(targetDir);
}

console.log('Project initialized successfully!');

[ai16z] <lantianlaoli>
APP
— 22/04/2025, 16:27
Did the V2 not support deepseek?
CheddarQueso 🧀 — 22/04/2025, 17:22
Help. I am unable to see auto.fun channels history. Can someone please check permissions? Trying to get help but the channels are blank for me. Thanks. 🙏
ai16z-bridge-odi
APP
— 22/04/2025, 17:44
[ai16z] <k_carv> i've just added a verified tag to your profile, this should let you see the channel - i'm also going to take a dive into the set up later
CheddarQueso 🧀 — 22/04/2025, 17:45
It worked!! Thank you! 🥰
0xbbjoker — 22/04/2025, 17:56
if you could elaborate this a bit?

and for the deepseek try using plugin-venice or you could create plugin-deepseek that goes to deepseek api directly.

should be really easy to build the plugin on v2.
https://github.com/elizaOS/eliza/tree/v2-develop/packages/plugin-venice
Image
[ai16z] <danielbeja>
APP
— 22/04/2025, 18:32
hey is the pdf plugin currently working?

I don't see it in the registyr
[ai16z] <OpenRouter #announcemen
APP
— 22/04/2025, 20:47
Gemini caching is now live!,
75% off prompt token prices, and we made the API extremely simple:

Just set cache_control on a message. Exactly the same as Anthropic. Docs are here: https://openrouter.ai/docs/features/prompt-caching#google-gemini

We made it significantly easier to use than Gemini direct:
You do not need to manually create, update, or delete caches.,
You do not need to manage cache names or TTL explicitly.,
Plus, it's standardized with other models like Anthropic,

Current model support and other details here: https://x.com/OpenRouterAI/status/1914699401127157933 @everyone
Screenshot_2025-04-22_at_11.15.52_AM.png
Image
[ai16z] <0xbuns>
APP
— 22/04/2025, 21:56
imma cry... my msgs keep auto-deleting.
ai16z-bridge-odi
APP
— 22/04/2025, 22:44
[ai16z] <trufflesoul> Yes fam. How my ai agent with twitter client, can post images with text?
ai16z-bridge-odi
APP
— 22/04/2025, 23:42
[ai16z] <k_carv> nice to meet you today -- what were you trying to share?
ai16z-bridge-odi
APP
— 22/04/2025, 23:53
[ai16z] <k_carv> it's here -- https://github.com/elizaos-plugins/plugin-pdf
i dont think it is deprecated, looks like it has been updated 2 weeks ago
GitHub
GitHub - elizaos-plugins/plugin-pdf: Core Node.js plugin for Eliza ...
Core Node.js plugin for Eliza OS that provides essential services and actions for file operations. - elizaos-plugins/plugin-pdf
GitHub - elizaos-plugins/plugin-pdf: Core Node.js plugin for Eliza ...
Hidden Forces — 23/04/2025, 02:23
Can someone give me a quick breakdown of how to load "Eddy the ElizaOS Wizard Boy" character?

I've been trying to build this exact agent to digest the new docs and then build my next project with me. Missed Eddy's debut by a few weeks..

https://github.com/elizaOS/eliza/blob/v2-develop/packages/the-org/src/devRel/index.ts
GitHub
eliza/packages/the-org/src/devRel/index.ts at v2-develop · elizaOS...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
[ai16z] <OpenRouter #announcemen
APP
— 23/04/2025, 02:34
We've been having capacity issues on Sonnet 3.7 today - we've just made some improvements on our end and you should now be seeing much lower error rates. Apologies for the disturbance today.
0xbbjoker — 23/04/2025, 03:15
Eddy is part of the org.

How to start the org ->
git checkout v2-develop,
bun i,
bun run build,
setup your .env -> you'll see in the example Eddy operates on discord/telegram,
make sure you set this in .env as well: DEVREL_IMPORT_KNOWLEDGE=true,
you can also tweek the code so it loads the .ts files -> here https://github.com/elizaOS/eliza/blob/v2-develop/packages/the-org/src/devRel/index.ts#L94,
once you setup the .env,
bun run start,

usually I comment some agents here so I don't have full swarm as it's easier to develop https://github.com/elizaOS/eliza/blob/v2-develop/packages/the-org/src/index.ts#L133
Cocaine — 23/04/2025, 03:40
I’m back! Been a bit busy IRL with some stuff I had to take care of. Gonna continue attempting to get this AI to be able to post on Twitter
standard — 23/04/2025, 03:59
Image
Not getting agent id back from the rest endpoint create agent
0xbbjoker — 23/04/2025, 04:29
https://github.com/elizaOS/eliza/blob/v2-develop/packages/cli/src/server/api/agent.ts#L144

you should be able to provide the UUID and you'll have it back in that case.

usually ID for agent is constructed from the name.
if you don't provide it to the REST-API it's gonna be randomized keep that in mind.
standard — 23/04/2025, 04:41
Ok so you’ll want to pregen the uuid
artzy — 23/04/2025, 05:13
Hi guys, is it possible to run 2 different characters in the same machine? Say i have like 1 json character for twitter and another for telegram. How could i run them both in the same machine (even though they're different Agents) ?
blackpink — 23/04/2025, 06:18
hello eliza team
i have built an agent where user can perform trading actions through a platform
for that user needs to set up his wallet in the agent right?
i set the wallet private key in .env file, but in this way, the agent can only manage one wallet
this means the agent is for only one user, is there any way to bypass this?
is there any way to make the agent like normal frontend which has wallet connect functionality so that users can connect their own wallet, and make actions with their wallet instead of pre-set wallet
blackpink — 23/04/2025, 06:22
hi
i have used ts character so far, but i think using this command by adding more character path separated by commar, would do it
Image
artzy — 23/04/2025, 06:33
Interesting.. yeah it does indeed say that "multiple character files can be loaded simultaneously" :PES_Think:
Coinshome — 23/04/2025, 06:37
hey guys. how could i configue the agent to reply to the REPLIES of a target account? right now its missing them as they arent posts.. running main branch eliza 0.25.9 w twitter client installed and running well. thank you

ive been seeing a lot of stuff about V2 - should i switch? thank you
blackpink — 23/04/2025, 06:38
@0xbbjoker @0xfabs @Agent Joshua ₱ @AlliDoizCode @cygaar @Deniz @eskender.eth @jin @Malibu @N3rdStorm @Neodotneo @Odilitime @Ropirito @shaw @tcm390 @~/ʜᴏᴡɪᴇᴅᴜʜᴢɪᴛ ¯\_(ツ)\_/¯
maybe is this the limit of the eliza agent?
[ai16z] <lantianlaoli>
APP
— 23/04/2025, 07:15
Does the eliza-starter has the V2 version?
[ai16z] <lantianlaoli>
APP
— 23/04/2025, 07:28
The v2-develop branch don't exist the agent.json, https://eliza.how/blog/add-plugins
Adding Plugins in V2 | eliza
V2 introduces significant upgrades to improve how developers build, share, and integrate functionality into their agents. This guide will walk through updates as they relate to plugins (hint: everything is a plugin).
[ai16z] <lantianlaoli>
APP
— 23/04/2025, 07:37

```
cxp@R9000P:~/ai_agent_learn/eliza$ elizaos update-cli
Checking for ElizaOS CLI updates...

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⠀⠙⠛⠿⢤⣦⣐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣐⣿⣿⢰⡀⠀⠀⠀⠈⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠤⠾⠛⠛⣿⣶⣇⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢰⣋⡳⡄⠀⠀⠀⢨⣭⡀⠀⡤⠀⣀⣝⢿⣶⣿⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢸⣯⠀⣇⠀⠀⠀⣼⣿⣿⣆⢷⣴⣿⣿⡏⣛⡉⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⢸⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⣾⣿⣿⣧⠀⠀⠀⢸⠟⢀⣴⣿⣿⣿⣿⣦⡀⣠⣾⣿⣿⣿⣿⣦⡙⢿⠀
⠀⠀⠀⠙⢷⣮⠀⠀⢸⣿⣿⣿⣿⣷⣯⣟⣏⣼⣷⣅⠾⡟⠀⠀⢸⣿⣇⣀⣀⣀⠀⢸⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⣠⣿⣿⠟⠁⠀⠀⣼⣿⡟⣿⣿⣆⠀⠀⠀⠀⣿⣿⠋⠀⠈⠻⣿⡇⣿⣿⣅⣀⣀⡛⠛⠃⠀⠀
⠀⠀⠀⠀⠀⠁⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠀⠀⠀⠀⢸⣿⡿⠿⠿⠿⠀⢸⣿⣿⠀⠀⠀⠀⠀⣿⣿⡇⠀⣠⣾⣿⠟⠁⠀⠀⠀⣰⣿⣿⣁⣸⣿⣿⡄⠀⠀⠀⣿⣿⡀⠀⠀⢘⣿⣿⢈⣛⠿⠿⠿⣿⣷⡄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣉⡟⠀⠀⠀⠀⠀⢸⣿⣧⣤⣤⣤⣤⢸⣿⣿⣦⣤⣤⣤⡄⣿⣿⡇⣾⣿⣿⣧⣤⣤⣤⡄ <clipped message>
[ai16z] <lantianlaoli>
APP
 — 23/04/2025, 14:10
[node-llama-cpp] load: special_eos_id is not in special_eog_ids - the tokenizer config may be incorrect
[node-llama-cpp] Using this model ("~/.eliza/models/bge-small-en-v1.5.Q4_K_M.gguf") to tokenize text and then detokenize it resulted in a different text. There might be an issue with the model or the tokenizer implementation. Using this model may not work as intended
[2025-04-23 08:28:19] INFO: Embedding model initialized successfully
[2025-04-23 08:28:19] INFO: Generating embedding for text
    textLength: 18
[2025-04-23 08:28:19] INFO: Embedding generation complete
    dimensions: 384
{"level":40,"time":1745396899531,"pid":168240,"hostname":"R9000P","msg":"Could not parse text as JSON, returning null"}

The elizaos dev command it download local llm which has big problem
0xbbjoker — 23/04/2025, 17:26
it's ref to ex character.json actually and how you can import one with the CLI

you are supposed to create one

look into the CLI tests how does it load the .json

https://github.com/elizaOS/eliza/tree/v2-develop/packages/cli/__test_scripts__
[ai16z] <happylol123>
APP
 — 23/04/2025, 17:32
@jintern you working?
what bots are working to ask questions?
was https://eliza.gg/ but it not working, what replacement?
ai16z-bridge-odi
APP
 — 23/04/2025, 19:40
[ai16z] <wookosh> Do you have the full list somewhere? very curious to check these out
[ai16z] <blazo101>
APP
 — 23/04/2025, 20:15
hi

ai16z-bridge-odi
APP
 — 23/04/2025, 20:21
[ai16z] <blazo101> Hey guys, I'm part of a team that has built an AI powered text based RPG game that will be launching on Solana soon. It's the first of its kind here and is incredibly cool.

We are in beta testing mode right now and users are playing the game currently, and I wanted to ask if some of you guys from here would be down to try it out and give some feedback.
Demo is linked above, but if you are interested to beta test, please join our discord. Invite link is on the twitter profile!
ai16z-bridge-odi
APP
 — 23/04/2025, 20:43
[ai16z] <trufflesoul> Dm me fam. Very interesting
Hidden Forces — 23/04/2025, 20:51
What OS are people using?  I want to say Eliza sucks on Windows because they're are so many conflicts.  But I don't have the foundational knowledge to know if it's just me.  Certainly all the directions I've gotten in the docs and here are FUKT/never fully explained and require hours of tweaking just to get the agent up.

Is there a way to interact with eliza on a Windows machine that makes sense?
[ai16z] <blazo101>
APP
 — 23/04/2025, 20:51
dmed you @trufflesoul
[ai16z] <kingkutah.>
APP
 — 23/04/2025, 20:57
im trying to code an little quiz bot running locally but i cant get it to stop hallucinating outside of my provided docs, has anyone got some good ways to prevent this? it is a mistral7b tho sorry eliza

thanks in advance appreciate it
[ai16z] <ccerrato147>
APP
 — 23/04/2025, 21:26
Hey everyone. Has there been an MCP integration built for Eliza? I searched for one in the Pluging GitHub but nothing showed up
Never mind, just found the Fleek one
[ai16z] <OpenRouter #announcemen
APP
 — 23/04/2025, 21:51
NEW: Universal PDF Support 📄⚡️,
OpenRouter now supports PDF processing for every model – and I think it's the first platform to do this!

🎯 Key highlights:,
Universal compatibility: Works with any LLM available on OpenRouter.,
All PDF types: Handles any PDF, including image-only scans.,
Native support: Automatically uses native PDF support for providers that support it, including Gemini, Anthropic, and OpenAI.,
Multimodal magic: For multimodal models, we automatically send embedded images from PDFs directly to the model.,
Combine with other integrations: Pair it with our web search feature to blend PDF data with real-time info, or with the Auto Router,
Flexible integration: Accessible via API and directly from the OpenRouter Chatroom - process multiple PDFs simultaneously with multiple models in a single request.,

⚙️ Pricing:,
Two PDF processing engines to choose from:

mistral-ocr (default): OCR support with text and embedded images extraction — $2 per 1000 pages.,
pdf-text: Text-only extraction without OCR or image support — free.,

📖 Documentation & Getting Started:,
Check out the full docs and implementation guide:
→ openrouter.ai/docs/features/images-and-pdfs

Video demo here, and more info in the announcement: https://x.com/OpenRouterAI/status/1915083006349382033. @everyone
pdf2.mp4
[ai16z] <odilitime>
APP
 — 23/04/2025, 23:39
gm
[ai16z] <ccerrato147>
APP
 — 24/04/2025, 00:20
Loving the new UI for Eliza. First time I used it was pure terminal. Does anyone know if we can connect Rooms from agents running in different machines? Perhaps a plugin?
[ai16z] <odilitime>
APP
 — 24/04/2025, 00:20
you can make them chat on twitter, discord or telegram
that's probably the best way
[ai16z] <ccerrato147>
APP
 — 24/04/2025, 00:21
I've done, yeah, got like 55 running for our community. Thanks for the tip 👌
[ai16z] <odilitime>
APP
 — 24/04/2025, 00:22
nice
55? what do they do?
[ai16z] <ccerrato147>
APP
 — 24/04/2025, 00:23
Just characters on twitter for now. We're working on an MCP Server that'll give them capabilities to operate on chain in the coming weeks.
[ai16z] <odilitime>
APP
 — 24/04/2025, 00:24
interesting
[ai16z] <ccerrato147>
APP
 — 24/04/2025, 00:25
YEah, we'll do workshops followed by a hackathon with our community and others to teach how to build AI system that can operate on-chain.
standard — 24/04/2025, 00:52
does the eliza ui work out of the box with sending images and stuff, default character
I don't think it works out of the box
trying to find the code for it
DeFine — 24/04/2025, 01:10
creating a new default project and running the Agent does not work for me
Odilitime — 24/04/2025, 01:10
which branch?
standard — 24/04/2025, 01:12
develop-v2
Image
Image
Odilitime — 24/04/2025, 01:32
yea, I think that's broken in v2-develop
standard — 24/04/2025, 01:32
What branch should I be on?
Odilitime — 24/04/2025, 01:32
main is 0.x
standard — 24/04/2025, 01:33
oh fr
Odilitime — 24/04/2025, 01:33
it's more stable
standard — 24/04/2025, 01:33
ok
standard — 24/04/2025, 02:40
Wait though this is elizav1
I just realized
so no db-based characters etc
Odilitime — 24/04/2025, 02:45
yes
standard — 24/04/2025, 02:48
Is there already stubbed out code for image processing in v2-develop? I can give it a shot
DeFine — 24/04/2025, 02:57
when using the quickstart for v2 https://eliza.how/docs/quickstart

i got errors when running elizaos start and need to setup each plugin such as sql and bootstrap individually. Any workarounds?
Image
Odilitime — 24/04/2025, 02:59
maybe take video-understanding and make an image-understanding plugin
Odilitime — 24/04/2025, 03:00
not sure, just git clone the repo and checkout the v2-develop branch
DeFine — 24/04/2025, 03:02
got really harsh experiences with that, it's basically hit or miss(ex: docker compose setups give frequent errors especially building from windows host). Do you have a recommended way of interacting with v2?
Odilitime — 24/04/2025, 03:03
git clone the repo and checkout v2-develop
DeFine — 24/04/2025, 04:03
Thanks! It works but there exists bug which if an anthropic key is not specified it will error with the following [2025-04-23 22:20:42] WARN: ANTHROPIC_API_KEY is not set in environment - Anthropic functionality will be limited
[2025-04-23 22:20:47] WARN: Service instrumentation not found
    agentName: "Eliza"
    agentId: "b850bc30-45f8-0041-a00a-83df46d8555d"
[2025-04-23 22:20:47] WARN: [getTracer] Service instrumentation not found in runtime.
[2025-04-23 22:20:48] ERROR: Error during emitEvent for MESSAGE_RECEIVED (handler execution):
    agentName: "Eliza"
    agentId: "b850bc30-45f8-0041-a00a-83df46d8555d"
    message: "(AI_APICallError) x-api-key header is required"
    stack: [
      "AI_APICallError: x-api-key header is required",
      "at new _AISDKError (/eliza/node_modules/@ai-sdk/provider/dist/index.mjs:19:5)",
      "at new APICallError (/eliza/node_modules/@ai-sdk/provider/dist/index.mjs:61:5)",
      "at <anonymous> (/eliza/node_modules/@ai-sdk/provider-utils/dist/index.mjs:667:18)",
      "at processTicksAndRejections (native:7:39)"
    ]
[2025-04-23 22:23:11] WARN: Service instrumentation not found
    agentName: "Eliza"
    agentId: "b850bc30-45f8-0041-a00a-83df46d8555d"
[2025-04-23 22:23:11] WARN: [getTracer] Service instrumentation not found in runtime.
[2025-04-23 22:23:13] ERROR: Error during emitEvent for MESSAGE_RECEIVED (handler execution):
    agentName: "Eliza"
    agentId: "b850bc30-45f8-0041-a00a-83df46d8555d"
    message: "(AI_APICallError) x-api-key header is required"
    stack: [
      "AI_APICallError: x-api-key header is required",
      "at new _AISDKError (/eliza/node_modules/@ai-sdk/provider/dist/index.mjs:19:5)",
      "at new APICallError (/eliza/node_modules/@ai-sdk/provider/dist/index.mjs:61:5)",
      "at <anonymous> (/eliza/node_modules/@ai-sdk/provider-utils/dist/index.mjs:667:18)",
      "at processTicksAndRejections (native:7:39)"
    ]
^C
root@9086241be6d2:/eliza# ^C
root@9086241be6d2:/eliza# bun start
$ cd ./packages/the-org && bun run start
$ bun ../cli/dist/index.js start
Odilitime — 24/04/2025, 04:06
what model provider were you trying to use?
DeFine — 24/04/2025, 04:12
this happens after bun start without extra configurations. If i am not having the Anthropic key it's always erroring. Having the openai key in the env or not does not make any difference
Odilitime — 24/04/2025, 04:17
yea I think the default eliza tries it if it's set or includes it by default
DeFine — 24/04/2025, 04:21
Do you know where the code for the default eliza project is located? Willing to work on this as it blocks adding new inference providers, at least on the default project.

I also opened a detailed bug issue https://github.com/elizaOS/eliza/issues/4346
Odilitime — 24/04/2025, 04:21
I would start in packages/cli/commands/start
there's been some recent changes so I don't trust my memory
Luke 🇦🇺 — 24/04/2025, 06:27
has anyone been able to get telegram working on elizaos v2?
Odilitime — 24/04/2025, 06:33
yes
just got it working
To fix this, you need to disable "Privacy Mode":

Steps:

Open BotFather

Send /mybots → Choose your bot

Go to Bot Settings → Group Privacy

Set it to Turn Off

and then I had to kick the bot out of any group and re-add him

ai16z-bridge-odi
APP
 — 24/04/2025, 06:38
[ai16z] <lantianlaoli> can you tell me how to add plugin about V2? the elizaos project add-plugin command not work. I plan to manually to plus code into the package
[ai16z] <odilitime>
APP
 — 24/04/2025, 06:39
I just use the character file's plugin field
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 06:41
have github link? I want to know how to actually to using the V2. the guide of document have a lot of thing not actually reflect on code
do you developed by * v2-develop branch or origin main branch?
what I want to implement is quite simple, customize a plugin and running it under the V2,
[ai16z] <odilitime>
APP
 — 24/04/2025, 06:51
there's some docs on https://eliza.how/
eliza | eliza
Flexible, scalable AI agents for everyone
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 06:52
Yes, I have watch the doc 2 days.
[ai16z] <odilitime>
APP
 — 24/04/2025, 06:52
does this help? https://github.com/elizaOS/eliza/blob/e3310ae25588c2e291acf357415c89fb48b55d6d/packages/the-org/src/investmentManager/index.ts#L33
GitHub
eliza/packages/the-org/src/investmentManager/index.ts at e3310ae255...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
eliza/packages/the-org/src/investmentManager/index.ts at e3310ae255...
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 06:56
First of I confused thing with v2 is the folder construction. The src just have a create.ts. And the file lack import code
ai16z-bridge-odi
APP
 — 24/04/2025, 07:00
[ai16z] <lantianlaoli> the-org is so comprehensive, it is a plugin, but it also include plugin, why make it like a maze?
[ai16z] <odilitime>
APP
 — 24/04/2025, 07:03
idk, I didn't make that change and I didn't understand the answer when I asked
ai16z-bridge-odi
APP
 — 24/04/2025, 07:03
[ai16z] <lantianlaoli> what repo you base to building your porject? the eliza or eliza-start? the eliza-start last update is 2 month ago, I don't know it supprt the V2? The plugin function is really adopt with the v2?
[ai16z] <odilitime>
APP
 — 24/04/2025, 07:04
but basically those org plugins are just injected at the end of the character file's plugins list
if v2-develop has all the plugins you need then use that, otherwise main branch
all the plugins in the registry don't work with v2 yet
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 07:07
tbh, I don't need the default plugin when checkout to v2. but I want to know how to development own plugin and adding it into the v2. It's construction change a lot. I even don't find how to register plugin to the eliza runtime
[ai16z] <odilitime>
APP
 — 24/04/2025, 07:08
I would clone v2-develop and copy an existing plugin for now
we're working on better documentation for plugin creation and it's going to be changing soon
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 07:10
in additional. why the v2 dont support the deepseek model?
# OpenAI Configuration
OPENAI_API_KEY=

# Anthropic Configuration
ANTHROPIC_API_KEY=

just support the 2 model, is so disappointed
[ai16z] <odilitime>
APP
 — 24/04/2025, 07:12
there's local-ai, grok or groq I forget which, ollama
there's more than 2
Luke 🇦🇺 — 24/04/2025, 07:12
the moment i put my TG token in .env and try to start eliza i just hit this and it fails to start:

[2025-04-24 01:41:07] ERROR: Telegram initialization attempt 1 failed: request to https://api.telegram.org/bot7666187858:[REDACTED]/getMe failed, reason:
[2025-04-24 01:41:07] INFO: Retrying Telegram initialization in 2 seconds...

/home/luke/eliza/node_modules/node-fetch/lib/index.js:1501
                        reject(new FetchError(request to ${request.url} failed, reason: ${err.message}, 'system', err));
                               ^
FetchError: request to https://api.telegram.org/bot7666187858:[REDACTED]/getMe failed, reason:
    at ClientRequest.<anonymous> (/home/luke/eliza/node_modules/node-fetch/lib/index.js:1501:11)
    at ClientRequest.emit (node:events:513:28)
    at emitErrorEvent (node:_http_client:104:11)
    at TLSSocket.socketErrorListener (node:_http_client:512:5)
    at TLSSocket.emit (node:events:513:28)
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  type: 'system',
  errno: 'ETIMEDOUT',
  code: 'ETIMEDOUT'
}

Node.js v23.3.0
[ai16z] <odilitime>
APP
 — 24/04/2025, 07:12
yea v2 is missing a lot still
Luke 🇦🇺 — 24/04/2025, 07:13
am i missing something obvious?
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 07:14
the local-ai, My computer don't have ability to run it, can you told me what is the requirements about the model?
yesterday. I make a plugin project buiding by elizaos command elizaos create -t plugin my-plugin, it just support the local-ai, it can been successful download a little model but was skilled when running it
Odilitime — 24/04/2025, 07:15
sounds like you network connection to telegram is suspect
Luke 🇦🇺 — 24/04/2025, 07:17
i thought that also but i can curl the api endpoint just fine though so i'm so confused
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 07:19
So I was troubled by the various problems mentioned above for 2 days, and this v2 version is simply making me crash
Odilitime — 24/04/2025, 07:20
are you running it in docker or something?
Luke 🇦🇺 — 24/04/2025, 07:21
running directly on a virtualised ubuntu (24.04)
ai16z-bridge-odi
APP
 — 24/04/2025, 07:22
[ai16z] <lantianlaoli> Yes, I runnig it on wsl2, it's a ubuntu
cxp@R9000P:~/ever_green/multi-source-collector/msc-union-service$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.3 LTS
Release:        22.04
Codename:       jammy

tcm390 — 24/04/2025, 07:53
There is a draft pr for attachments: https://github.com/elizaOS/eliza/pull/4324/files#diff-79b3653b1602e46dd91472006eabc9e952f7cf2bb09d2ea811370b3b96c3341a
standard — 24/04/2025, 07:54
Thanks
Also, running into this
Image
How can I understand what might be going on here?
this happens when i spin up the agent and chat via local gui
tcm390 — 24/04/2025, 07:58
are you using v2-develop branch?
tcm390 — 24/04/2025, 07:59
Could you provide the reproduction steps?
[ai16z] <lee_coin1>
APP
 — 24/04/2025, 08:00
how can I find the access token twitter

standard — 24/04/2025, 08:05
Yeah I am
Actually I cloned plugin-bootstrap and I'm using basically that cloned version
I can get more indepth with it in a bit too
is there a generic reason i can follow as to why it might be happening?
I'd have to spend a little time path tracing to get to the root
tcm390 — 24/04/2025, 08:14
I'm not entirely sure, but it seems like it might be storing duplicate messages in the database. Could this be caused by duplicate event triggers (EventType.MESSAGE_RECEIVED)?
standard — 24/04/2025, 08:15
hmm
well i am just saying "hi" repeatedly
standard — 24/04/2025, 08:24
I'll take a look at that. I'm just triggering it via a message on the UI
tcm390 — 24/04/2025, 08:26
might happen if runtime.createMemory(message, 'messages') is being called twice somewhere in the code. Would be worth checking for duplicate calls
standard — 24/04/2025, 08:26
ok will do!
ty
ai16z-bridge-odi
APP
 — 24/04/2025, 13:57
[ai16z] <lantianlaoli> the v2-developer how to add plugin? the src folder just one file
tskoyo — 24/04/2025, 14:12
Why is GitHub Personal Access Token required for running a new character?
[ai16z] <tenacious_starfish_2799
APP
 — 24/04/2025, 14:55
hello eliza
i have built an agent where user can perform trading actions through a platform
for that user needs to set up his wallet in the agent right?
i set the wallet private key in .env file, but in this way, the agent can only manage one wallet
this means the agent is for only one user, is there any way to bypass this?
is there any way to make the agent like normal frontend which has wallet connect functionality so that users can connect their own wallet, and make actions with their wallet instead of pre-set wallet
@jin
sayonara — 24/04/2025, 15:07
you can change openai base url env and models and basically use any model/provider
ai16z-bridge-odi
APP
 — 24/04/2025, 15:37
[ai16z] <lantianlaoli> are you building on V2?
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 15:38
the solana plugin only supprt pre-set wallet, you need to dev a new plugin to achevement the function that let user to sign their action.
I am trying to build a new plugin on the v2 branch. But its support for plugins is very poor now.
standard — 24/04/2025, 16:16
Do Providers not get initialized via the plugin on import?
Image
i dont understand why you have to pass in providers
they're already specified in the plugin
i would imagine that all u have to do is use the plugin in your charfile and the runtime auto registers all the providers in it
so it looks like registerPlugin does this
Image
but its not being used anywhere?
@tcm390
sayonara — 24/04/2025, 16:31
shouldnt be the case anymore; are you running latest v2-develop / elizaos beta cli
ai16z-bridge-odi
APP
 — 24/04/2025, 18:35
[ai16z] <tenacious_starfish_27990> yeah, it's okay if i can build a new plugin
[ai16z] <tenacious_starfish_2799
APP
 — 24/04/2025, 18:35
but i am not sure how
we can't simply write wallet private key in the agent chat anyway
obviously we can't use exisiting wallet connection provider like rainbowkit in the agent either
ai16z-bridge-odi
APP
 — 24/04/2025, 18:42
[ai16z] <lantianlaoli> have open source ?, I need to learn how to building
ai16z-bridge-odi
APP
 — 24/04/2025, 18:44
[ai16z] <tenacious_starfish_27990> no, it's not open-source project
[ai16z] <tenacious_starfish_2799
APP
 — 24/04/2025, 18:44
i am just wondering how i can do that
and i don't really understand why the core dev team doesn't support
at least, they could let us know the possibility
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 18:46
the project not complete suitable to production,
our company just use it to make simple interaction with GPT, a lot of feature was not use
I think it is advantage as the tool to join hackathon, not really product
ai16z-bridge-odi
APP
 — 24/04/2025, 18:49
[ai16z] <lantianlaoli> it is simple, you just modify the frontend and custom your self solana plugin
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 18:51
a lot of product have achevement the function
sam-developer — 24/04/2025, 18:52
Hi,
How can i help out
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 18:52
you don't see the winners of last solana AI hackathon?
[ai16z] <tenacious_starfish_2799
APP
 — 24/04/2025, 18:52
no
i didn't see that
can you give me the link?
[ai16z] <lantianlaoli>
APP
 — 24/04/2025, 18:53
check the sendAI twitter
a lot of project combination the solana agent kit
you totally can insert  user sigh operation before the action execute process or some step, just you clearify what you done
[ai16z] <tenacious_starfish_2799
APP
 — 24/04/2025, 19:03
i can't see anything
can you give me exact link @lantianlaoli

[ai16z] <ad_dev>
APP
 — 24/04/2025, 19:05
is eliza 2 finally working with twitter?
Acul — 24/04/2025, 19:20
is there any reason why i'm getting the same DTS build error when cloning a plugin and building via bun run build?, i've tried both the open-weather and client-twitter plugins?
sam-developer — 24/04/2025, 19:57
which branch are you on Acul,

the correct github branch is v2-develop
tskoyo — 24/04/2025, 20:09
Yeah, that was the issue.
nasdaq.ai — 24/04/2025, 20:32
I'm also still waiting for an official announcement
Acul — 24/04/2025, 20:45
i think i'm using v2-dev, though now i'm setting up the project via elizaos cli instead of directly cloning via git. (does say on cli current:10.0.-beta.37) ,  wanting to modify open-weather plugin after install , but if I go to project plugin directory or clone plugin via elizos-plugins repo , to build either by running "bun run build" , I get the same DTS error.
sayonara — 24/04/2025, 20:50
share more please what error exactly
Acul — 24/04/2025, 20:54
acul@acul-Inspiron-5570:~/ai_agent/openweatherex/node_modules/@elizaos-plugins/plugin-open-weather$ bun run build
$ tsup --format esm --dts
CLI Building entry: src/index.ts
CLI Using tsconfig: tsconfig.json
CLI tsup v8.3.5
CLI Using tsup config: /home/acul/ai_agent/openweatherex/node_modules/@elizaos-plugins/plugin-open-weather/tsup.config.ts
CLI Target: node16
CLI Cleaning output folder
ESM Build start
ESM dist/index.js     6.76 KB
ESM dist/index.js.map 12.62 KB
ESM ⚡️ Build success in 99ms
DTS Build start
error TS2688: Cannot find type definition file for 'hapi__shot'.
  The file is in the program because:
    Entry point for implicit type library 'hapi__shot'

Error: error occurred in dts build
    at Worker.<anonymous> (/home/acul/ai_agent/openweatherex/node_modules/@elizaos-plugins/plugin-open-weather/node_modules/tsup/dist/index.js:1541:26)
    at Worker.emit (node:events:507:28)
    at MessagePort.<anonymous> (node:internal/worker:268:53)
    at [nodejs.internal.kHybridDispatch] (node:internal/event_target:827:20)
    at MessagePort.<anonymous> (node:internal/per_context/messageport:23:28)
DTS Build error
error: script "build" exited with code 1
I get exactly the same error if I clone plugin
git clone https://github.com/elizaos-plugins/plugin-open-weather.git
 and run
bun run build
[ai16z] <_orayo_>
APP
 — 24/04/2025, 21:10
seems like the plugins do not work at all in v2..
Nisita — 24/04/2025, 21:15
Plugins are yet to be migrated/compatible with V2. Team is working on this as we speak. Will share an update once it's available.
Acul — 24/04/2025, 21:20
I noticed in the open-weather plugin in the action handler function  it uses a runtime function called updateRecentMessageState() which I couldn't find in v2-dev implementation , or previous ( meaning it hasn't been working for while?) , anyways,,  was attempting to have a look see if I could get it working - might wait for migration ,, cheers
[ai16z] <torviscottnfts>
APP
 — 24/04/2025, 22:39
#verify
Hidden Forces — 24/04/2025, 23:44
Anyone else running into load errors with short flags?  Trying to boot up Eddy the Eliza Agent and I can't complete the build, AI has me chasing short flags, but I'm zooming out for better solutions.
PS C:\eliza> bun run start
bun.exe : $ cd ./packages/the-org && bun run start
At C:\nvm4w\nodejs\bun.ps1:14 char:3
+   & "$basedir/node_modules/bun/bin/bun.exe"   $args
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ cd ./packages/the-org && bun run start:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError

$ bun ../cli/dist/index.js start
1012 |       }
1013 |       if (flagParts[0].startsWith("-")) {
1014 |         const unsupportedFlag = flagParts[0];
1015 |         const baseError = option creation failed due to '${unsupportedFlag}' in option flags '${flags}';
1016 |         if (/^-[^-][^-]/.test(unsupportedFlag))
1017 |           throw new Error(
                       ^
error: option creation failed due to '-pl' in option flags '-pl, --plugin <name>'
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')
      at splitOptionFlags (C:\eliza\packages\cli\dist\chunk-UBGSNNKA.js:1017:17)
      at new Option2 (C:\eliza\packages\cli\dist\chunk-UBGSNNKA.js:760:29)
      at createOption (C:\eliza\packages\cli\dist\chunk-UBGSNNKA.js:1608:16)
      at _optionEx (C:\eliza\packages\cli\dist\chunk-UBGSNNKA.js:1736:29)
      at C:\eliza\packages\cli\dist\chunk-SVKGFOWI.js:652:168
Bun v1.2.5 (Windows x64)
error: script "start" exited with code 1
error: script "start" exited with code 1

feels like a Windows problem
sayonara — 25/04/2025, 01:08
damn!
Hidden Forces — 25/04/2025, 01:51
I mean, I'm sayin the same thing, but I might just be down my own rabbithole.  Care to elaborate?
YungYoda — 25/04/2025, 01:52
anyone getting
 Could not parse text as JSON, returning null
followed docs and just added envs.
ODEV — 25/04/2025, 01:56
Is there a way to make my agent only like & reply but not retweet?
sayonara — 25/04/2025, 02:00
Not really, let me look into it further
sayonara — 25/04/2025, 02:00
Share more plz! How to reproduce
YungYoda — 25/04/2025, 02:16
@sayonara i made this gist that has the character file. its slightly modified from the original but nothing new. i actually commented and removed plugins. https://gist.github.com/yungyoda/42e162abc140d20177169a078ba72968

the full error is
[2025-04-24 20:41:57] INFO: Name:  Themis
[2025-04-24 20:41:57] INFO: *** Initializing starter plugin ***
[2025-04-24 20:41:58] INFO: *** Starting starter service ***
[2025-04-24 20:42:13] INFO: MESSAGE_RECEIVED event received
[2025-04-24 20:42:13] INFO:
    0: "runtime"
    1: "message"
    2: "callback"
    3: "onComplete"
[2025-04-24 20:42:14] WARN: Could not parse text as JSON, returning null
[2025-04-24 20:42:14] INFO: No worlds found for this agent
[2025-04-24 20:42:14] WARN: Could not parse text as JSON, returning null
[2025-04-24 20:42:14] WARN: *** Missing required fields, retrying... ***
[2025-04-24 20:42:14] WARN: Could not parse text as JSON, returning null
[2025-04-24 20:42:14] WARN: *** Missing required fields, retrying... ***
[2025-04-24 20:42:14] WARN: Could not parse text as JSON, returning null
[2025-04-24 20:42:14] WARN: *** Missing required fields, retrying... ***


NOTE i can run the default Eliza character with the same envs...
Gist
Test agent
Test agent. GitHub Gist: instantly share code, notes, and snippets.
Test agent
sayonara — 25/04/2025, 02:19
Did you set any specific models to be used?
YungYoda — 25/04/2025, 02:20
where do i set that? i assumed all i had to do was modify the existing index.ts.
YungYoda — 25/04/2025, 02:29
what is the difference currently between 'npx @Elizaos/cli start' & 'elizaos start' ?
sayonara — 25/04/2025, 02:42
What did you use to start
sayonara — 25/04/2025, 02:43
It’s ideally same but without @beta tag after cli it won’t work yet
YungYoda — 25/04/2025, 02:43
i used what was set in the pacakage.json
  "scripts": {
    "start": "elizaos start",
    "dev": "elizaos dev",
YungYoda — 25/04/2025, 02:45
the models are set in the character file correct? or am i wrong?
sayonara — 25/04/2025, 02:47
You could set via env or character file
YungYoda — 25/04/2025, 02:47
did my character file look correct to you?
sayonara — 25/04/2025, 02:50
Yeah
sayonara — 25/04/2025, 02:50
Did you add .env ?
YungYoda — 25/04/2025, 02:55
yes
Image
Image
sayonara — 25/04/2025, 03:09
Okay do bun run start
And share complete logs
YungYoda — 25/04/2025, 03:10
done
Version: 1.0.0-beta.34
[2025-04-24 21:40:09] INFO: Found project by description in package.json
[2025-04-24 21:40:12] INFO: Initializing character
Warning: Example plugin variable is not provided
[2025-04-24 21:40:12] INFO: Name:  Themis
[2025-04-24 21:40:12] INFO: *** Initializing starter plugin ***
Startup successful!
Go to the dashboard at http://localhost:3000
[2025-04-24 21:40:15] INFO: *** Starting starter service ***
[2025-04-24 21:40:30] INFO: MESSAGE_RECEIVED event received
[2025-04-24 21:40:30] INFO:
    0: "runtime"
    1: "message"
    2: "callback"
    3: "onComplete"
[2025-04-24 21:40:32] WARN: Could not parse text as JSON, returning null
[2025-04-24 21:40:32] INFO: No worlds found for this agent
[2025-04-24 21:40:32] WARN: Could not parse text as JSON, returning null
[2025-04-24 21:40:32] WARN: *** Missing required fields, retrying... ***
[2025-04-24 21:40:32] WARN: Could not parse text as JSON, returning null
[2025-04-24 21:40:32] WARN: *** Missing required fields, retrying... ***
[2025-04-24 21:40:32] WARN: Could not parse text as JSON, returning null
[2025-04-24 21:40:32] WARN: *** Missing required fields, retrying... ***
YungYoda — 25/04/2025, 03:28
Okay sooooooooo the default starterPlugin was the issue. Again this was from a fresh 'create'. i simply removed that from index.ts and it worked.
export const projectAgent: ProjectAgent = {
  character,
  init: async (runtime: IAgentRuntime) => await initCharacter({ runtime }),
  plugins: [], <------ remove starterPlugin
};
sayonara — 25/04/2025, 03:32
thanks for pointing; we need to update documentation around it
LemonS — 25/04/2025, 07:21
I cant get to run a new project using v2, I'm getting errors witht he db plugin and I cant find the error,
If i run the code using bun run start I get
error: No version matching "^0.25.6" found for specifier "@elizaos/plugin-sql" (but package exists)
error: @elizaos/plugin-sql@^0.25.6 failed to resolve


if I run the code with elizaos start directly in console I get
ERROR: Database connection test failed:
    message: "(Error) Connection terminated due to connection timeout"


I have a neon url set in the .env, and my character is using, tested with one from supabase and the same error, pglite works ok
plugins: [
    '@elizaos/plugin-sql',
    ...(process.env.OPENAI_API_KEY ? ['@elizaos/plugin-openai'] : []),
    ...(process.env.ANTHROPIC_API_KEY ? ['@elizaos/plugin-anthropic'] : []),
    ...(process.env.DISCORD_API_TOKEN ? ['@elizaos/plugin-discord'] : []),
    ...(process.env.TWITTER_USERNAME ? ['@elizaos/plugin-twitter'] : []),
    ...(process.env.TELEGRAM_BOT_TOKEN ? ['@elizaos/plugin-telegram'] : []),
    ...(!process.env.IGNORE_BOOTSTRAP ? ['@elizaos/plugin-bootstrap'] : [])
  ],


im using 1.0.0-beta.34 for everything
Odilitime — 25/04/2025, 08:38
weird it's asking for 0.25.6 on v2
ai16z-bridge-odi
APP
 — 25/04/2025, 09:17
[ai16z] <lantianlaoli> The V2 version of the plugin requires you to use the elizaos command to actively download it
[ai16z] <lantianlaoli>
APP
 — 25/04/2025, 09:17
From which platform were these statements forwarded?
[ai16z] <itsafwog>
APP
 — 25/04/2025, 09:47
is pasting links on knowledge works? or we need text?
LemonS — 25/04/2025, 10:02
I'm just creating a new project using the command
[ai16z] <abstract.logica>
APP
 — 25/04/2025, 10:10
Is there a way for me to plug the old Gemini functionality into the cli version?
ai16z-bridge-odi
APP
 — 25/04/2025, 11:09
[ai16z] <odilitime> The elizaOS dev discord
[ai16z] <odilitime>
APP
 — 25/04/2025, 11:09
The tech-support room
sayonara — 25/04/2025, 11:36
@0xbbjoker issues with postgres, pglite works ok
ai16z-bridge-odi
APP
 — 25/04/2025, 12:00
[ai16z] <lantianlaoli> Can you send me the link?
[ai16z] <lantianlaoli>
APP
 — 25/04/2025, 12:00
I have encountered a lot of problems and need a lot of help
0xbbjoker — 25/04/2025, 12:02
try changing the region closer to your location on neon if you can.
[ai16z] <lantianlaoli>
APP
 — 25/04/2025, 12:09
I plan to develop a plugin based on version v2 to participate in Hackathon, but it leaves me at a loss. I can't even find the code location where this agent is used to load plugins and start them.
The documentation on the official website is too simple
ai16z-bridge-odi
APP
 — 25/04/2025, 12:28
[ai16z] <itsafwog> in the character
standard — 25/04/2025, 12:57
bump on this
@Odilitime
providers for plugins dont get registered at start
nvm they do in
Image
bitcryptowski.btc — 25/04/2025, 13:41
i don't think my brain is the best anymore 😉 i just can't get to a running bot in the latest version 😦
Kenk — 25/04/2025, 17:12
can you share where you are getting stuck?
the guide on eliza.how is for the v2-develop brand frm the repo
ai16z-bridge-odi
APP
 — 25/04/2025, 17:41
[ai16z] <itsafwog> anyone?
ai16z-bridge-odi
APP
 — 25/04/2025, 17:43
[ai16z] <k_carv> pretty sure you'll need text
ai16z-bridge-odi
APP
 — 25/04/2025, 17:58
[ai16z] <itsafwog> ok
Mel G — 25/04/2025, 18:41
Hey @frank  I tried this one: https://github.com/armorwallet/armor-crypto-mcp and I had issues, so what steps did you follow to get it connected successfully?
GitHub
GitHub - armorwallet/armor-crypto-mcp: The MCP server for interacti...
The MCP server for interacting with Blockchain, Swaps, Strategic Planning and more. - armorwallet/armor-crypto-mcp
GitHub - armorwallet/armor-crypto-mcp: The MCP server for interacti...
ai16z-bridge-odi
APP
 — 25/04/2025, 18:44
[ai16z] <k_carv> Hey. I'd suggest to take a look at the Bio Agent plugin that was created by BioDAO -- here is an overview for reference https://www.bio.xyz/blog-posts/bioagents-pioneering-decentralized-science-with-ai-agents
BioAgents: Accelerating Decentralized Science with AI Agents • BI...
We saw how AlphaFold revolutionized protein prediction with millions of volunteer compute hours. Imagine that same global collaboration incentivized via cryptoeconomics. At Bio Protocol, we’re driving this change with a decentralized fleet of BioAgents to accelerate scientific breakthroughs.
BioAgents: Accelerating Decentralized Science with AI Agents • BI...
[ai16z] <k_carv>
APP
 — 25/04/2025, 18:45
and here is a plugin tutorial https://ai-docs.bio.xyz/developers/plugins
Plugin Guide | Bio x AI Hackathon
Plugin Guide | Bio x AI Hackathon
0xCardiE — 25/04/2025, 19:34
looks great
ai16z-bridge-odi
APP
 — 25/04/2025, 19:35
[ai16z] <k_carv> can you share anymore on where you're at?
LemonS — 25/04/2025, 19:42
it works, but not always, can I configure the timeout to be larger?
0xCardiE — 25/04/2025, 19:43
I manage also like this to finnaly start it. the recommended quides on docs just dont work.
0xbbjoker — 25/04/2025, 19:49
try it but I would really on more stable postgres instance in your case.
LemonS — 25/04/2025, 19:52
is there a config variable or something like that? its not being stable even in my closest region
bitcryptowski.btc — 25/04/2025, 19:53
all very confusing 😭
morlok — 25/04/2025, 20:14
yoo, want to develop my agent rn with a custom plugin, whats the best branch/approach to do so?

v2-develop? or elizaos create project?
Nisita — 25/04/2025, 20:27
use original version please. v2-develop doesn't have plugins compatible yet
ai16z-bridge-odi
APP
 — 25/04/2025, 20:36
[ai16z] <odilitime> https://discord.gg/elizaOS
[ai16z] <egoarka>
APP
 — 26/04/2025, 00:50
Hey there, sometimes Eliza stuck into “None” action, when I’m asking to do particular action (again) once it failed. How to ignore this behaviour? I’m using telegram client
[ai16z] <OpenRouter #announcemen
APP
 — 26/04/2025, 02:17
Update on Gemini 2.5 Pro Experimental Free,
Demand for Gemini 2.5 Pro Experimental continues to exceed available capacity significantly. To address this, we are removing Gemini 2.5 Pro Experimental from the free model tier and imposing stricter usage limits: 1 request per minute and a total of 1000 requests per day (including errors). The model will continue to be free to use.

This adjustment means that your daily quota of 1000 requests for free models will remain unaffected by requests made to Gemini 2.5 Pro Experimental. Our goal with these changes is to clarify usage expectations around this model and the free tier.

For those seeking higher reliability and fewer constraints, we recommend utilizing the paid variant of Gemini 2.5 Pro. Your credits (such as the $10 minimum purchase) can now directly support usage on this paid endpoint, while preserving your full free-tier quotas.

More details in the thread below 🧵
Gemini 2.5 Pro Experimental - API, Providers, Stats
Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. Run Gemini 2.5 Pro Experimental with API
Gemini 2.5 Pro Experimental - API, Providers, Stats
sam-developer — 26/04/2025, 14:35
can you share more
are you developing any agent
DeFine — 26/04/2025, 18:40
Hello, it is my first time publishing a plugin in v2 can someone review the pr please 🙏

https://github.com/elizaOS/registry/pull/48
[ai16z] <notorious_d_e_v>
APP
 — 26/04/2025, 20:35
Streaming some autofun development right now if anyone wants to watch!
https://x.com/i/broadcasts/1vOGwXewgLEJB
PayAI Network
PayAI x AutoFun Hacking Pt. 1

X
ODEV — 26/04/2025, 23:19
Where can I see the results of a tweet dry run?
[ai16z] <itsafwog>
APP
 — 27/04/2025, 01:42
is knowledge for docs and rules?
i want to know everything in the character file
i want to set what should the ai post, where should i add that? ty guys
Cocaine — 27/04/2025, 02:13
Are you free now? Sorry been a bit busy IRL
Cocaine — 27/04/2025, 02:31
Damn lol I'm still having trouble running it and keeping it running without it crashing
I have good hardware in my Desktop just wondering if it's a code issue
[ai16z] <pedrrr000>
APP
 — 27/04/2025, 02:50
guys was there a plugin for pump.fun token creation?
Cocaine — 27/04/2025, 02:59
@sayonara @0xbbjoker
Image
When I type something in the chat sometimes it crashes is it because I have to train it first?
DeFine — 27/04/2025, 03:18
Is there someone we contact for v2 plug-in pr reviews?

Our Livepeer plug-in offers free inventivized inference
0xbbjoker — 27/04/2025, 03:20
I guess the context is to large for the model. But not sure. You still using local-ai? Can you try larger model if you have enough VRAM you should be able to run it.

You can find models on https://huggingface.co/
Cocaine — 27/04/2025, 03:22
Yeah it's on local, I had a question: When I'm having it post on twitter live and replying etc, will it need that larger model as well? Will my CMD console have to remain open to use the agent on twitter?
I'm gonna check out that site now!
Is there any specific model you recommend?
DeFine — 27/04/2025, 03:22
@0xbbjoker could we get some direction regarding the review and pr approval sir?
Cocaine — 27/04/2025, 03:42
By any chance would you be free for a screenshare to guide me through sometime
I'm sorry but it's just I have a lot of trouble lol
0xbbjoker — 27/04/2025, 03:44
ser submit the PR here for now we'll move plugins to registry soon. https://github.com/elizaOS/eliza/tree/v2-develop
0xbbjoker — 27/04/2025, 03:45
I'll ping you in two hours if you are around to help

ai16z-bridge-odi
APP
 — 25/04/2025, 19:35
[ai16z] <k_carv> can you share anymore on where you're at?
LemonS — 25/04/2025, 19:42
it works, but not always, can I configure the timeout to be larger?
0xCardiE — 25/04/2025, 19:43
I manage also like this to finnaly start it. the recommended quides on docs just dont work.
0xbbjoker — 25/04/2025, 19:49
try it but I would really on more stable postgres instance in your case.
LemonS — 25/04/2025, 19:52
is there a config variable or something like that? its not being stable even in my closest region
bitcryptowski.btc — 25/04/2025, 19:53
all very confusing 😭
morlok — 25/04/2025, 20:14
yoo, want to develop my agent rn with a custom plugin, whats the best branch/approach to do so?

v2-develop? or elizaos create project?
Nisita — 25/04/2025, 20:27
use original version please. v2-develop doesn't have plugins compatible yet
ai16z-bridge-odi
APP
 — 25/04/2025, 20:36
[ai16z] <odilitime> https://discord.gg/elizaOS
[ai16z] <egoarka>
APP
 — 26/04/2025, 00:50
Hey there, sometimes Eliza stuck into “None” action, when I’m asking to do particular action (again) once it failed. How to ignore this behaviour? I’m using telegram client
[ai16z] <OpenRouter #announcemen
APP
 — 26/04/2025, 02:17
Update on Gemini 2.5 Pro Experimental Free,
Demand for Gemini 2.5 Pro Experimental continues to exceed available capacity significantly. To address this, we are removing Gemini 2.5 Pro Experimental from the free model tier and imposing stricter usage limits: 1 request per minute and a total of 1000 requests per day (including errors). The model will continue to be free to use.

This adjustment means that your daily quota of 1000 requests for free models will remain unaffected by requests made to Gemini 2.5 Pro Experimental. Our goal with these changes is to clarify usage expectations around this model and the free tier.

For those seeking higher reliability and fewer constraints, we recommend utilizing the paid variant of Gemini 2.5 Pro. Your credits (such as the $10 minimum purchase) can now directly support usage on this paid endpoint, while preserving your full free-tier quotas.

More details in the thread below 🧵
Gemini 2.5 Pro Experimental - API, Providers, Stats
Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. Run Gemini 2.5 Pro Experimental with API
Gemini 2.5 Pro Experimental - API, Providers, Stats
sam-developer — 26/04/2025, 14:35
can you share more
are you developing any agent
DeFine — 26/04/2025, 18:40
Hello, it is my first time publishing a plugin in v2 can someone review the pr please 🙏

https://github.com/elizaOS/registry/pull/48
[ai16z] <notorious_d_e_v>
APP
 — 26/04/2025, 20:35
Streaming some autofun development right now if anyone wants to watch!
https://x.com/i/broadcasts/1vOGwXewgLEJB
PayAI Network
PayAI x AutoFun Hacking Pt. 1

X
ODEV — 26/04/2025, 23:19
Where can I see the results of a tweet dry run?
[ai16z] <itsafwog>
APP
 — 27/04/2025, 01:42
is knowledge for docs and rules?
i want to know everything in the character file
i want to set what should the ai post, where should i add that? ty guys
Cocaine — 27/04/2025, 02:13
Are you free now? Sorry been a bit busy IRL
Cocaine — 27/04/2025, 02:31
Damn lol I'm still having trouble running it and keeping it running without it crashing
I have good hardware in my Desktop just wondering if it's a code issue
[ai16z] <pedrrr000>
APP
 — 27/04/2025, 02:50
guys was there a plugin for pump.fun token creation?
Cocaine — 27/04/2025, 02:59
@sayonara @0xbbjoker
Image
When I type something in the chat sometimes it crashes is it because I have to train it first?
DeFine — 27/04/2025, 03:18
Is there someone we contact for v2 plug-in pr reviews?

Our Livepeer plug-in offers free inventivized inference
0xbbjoker — 27/04/2025, 03:20
I guess the context is to large for the model. But not sure. You still using local-ai? Can you try larger model if you have enough VRAM you should be able to run it.

You can find models on https://huggingface.co/
Cocaine — 27/04/2025, 03:22
Yeah it's on local, I had a question: When I'm having it post on twitter live and replying etc, will it need that larger model as well? Will my CMD console have to remain open to use the agent on twitter?
I'm gonna check out that site now!
Is there any specific model you recommend?
DeFine — 27/04/2025, 03:22
@0xbbjoker could we get some direction regarding the review and pr approval sir?
Cocaine — 27/04/2025, 03:42
By any chance would you be free for a screenshare to guide me through sometime
I'm sorry but it's just I have a lot of trouble lol
0xbbjoker — 27/04/2025, 03:44
ser submit the PR here for now we'll move plugins to registry soon. https://github.com/elizaOS/eliza/tree/v2-develop
0xbbjoker — 27/04/2025, 03:45
I'll ping you in two hours if you are around to help
Cocaine — 27/04/2025, 03:46
Ok thank you I'm gonna setup the huggingface model, do you recommend any specific one?
ai16z-bridge-odi
APP
 — 27/04/2025, 04:00
[ai16z] <k_carv> Is this for a plugin?
standard — 27/04/2025, 07:52
yall come across how entities provider takes 4s to reply
Image
standard — 27/04/2025, 08:21
yo this thing is loading plugin-bootstrap even if i expcliitly take it out
yikesawjeez — 27/04/2025, 08:28
anybody tried out v2 discord client yet? not working for me
yikesawjeez — 27/04/2025, 08:56
ight, will drop it off here, off an 'npx elizaos create' and 'npx elizaos start':

telegram and local client work fine,

discord doesn't work, bot doesn't show up as online (maybe its the dev bot settings? but i matched 'em up with Red so they should be working cuz she is),

twitter seeeems like it doesn't work either (at least asking eli to post doesn't, we'll see if the min/max env vars kick it on later,

cc @shaw tryna hit ur bounties, u can hit up @eli_von_fun_bot on tg if u get bored to test his cringe levels

logs of me trying all of the above are attached.

down to jump on and troubleshoot/test/w.e whenever, as long as those bounties are up imma be tryna hit 'em as main thing #1 lol
~/Projects/eli5 via  v23.11.0 on ☁  (us-east-1) on ☁  coolaburner65@gmail.com
➜ npx elizaos start

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⠀⠙⠛⠿⢤⣦⣐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣐⣿⣿⢰⡀⠀⠀⠀⠈⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠤⠾⠛⠛⣿⣶⣇⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
Expand
message.txt
11 KB
shaw — 27/04/2025, 09:07
nice
yikesawjeez — 27/04/2025, 09:09
kinda hard to tell what model he's using in the logs, there a good way to suss that out other than dropping the env vars for all the models 1 by 1?
deepseek 3.1 is fairly non-cringe & on free tier so tryna hit that but can't exaaactly tell if it's working
ai16z-bridge-odi
APP
 — 27/04/2025, 09:09
[ai16z] <orayo> Im curious how did you get telegram and local client working.

I was using v1 late december by forking the repo with plugins for discord and twitter and it was super useful, but somehow everything broke when i migrated to v2 when i used eliza create

Embedding isn't working because the plugins cannot be downloaded, including openai and anthropic so the entire module cannot function.

Should i have just forked eliza-starter?
yikesawjeez — 27/04/2025, 09:10
mm they worked out of the box for me but i also have a ver of v2 i cloned down and linked to my npx command back when it was beta, so it might be that i'm still on that. but i'd start from scratch rather than migrating personally
i did have to put in my github PAT, once i got that in then the plugins were able to download. if you just run npx eliazos create, cd in, npx elizaos start, eliza should start up, if she does then you shouuuuld be good to go wrt embeddings
current thing that has working local and working tg is above process ^
i generally recommend once you get an eliza configured the way you like her, just fork that version off and don't update it until you've tried cloning down main and eveyrthing works the way you want it
it still moves giga fast so if you try to keep it updated it'll inevitably break something lol
but atm the pure npx commands work for me, so wroth a try if you havent in a while
i wouldn't use any of the starter repos atm  (i think), they're all mostly older versions and might have compatibility issues etc. new version of starter is basically npx elizaos create
i have an eliza folder in my Projects folder that has like 8 versions of eliza in it by now at various points when i could succesfully decringify her 😂
ai16z-bridge-odi
APP
 — 27/04/2025, 09:18
[ai16z] <orayo> thanks for this my G
[ai16z] <_orayo_>
APP
 — 27/04/2025, 09:18
did you put your github PAT in your .env ?
how does it work?
yikesawjeez — 27/04/2025, 09:24
it asked for it when i did the create
fyi don't do it with your work github/make a separate gh acct for it, atm i think it requests write/read to all repos (could be fixed by now tho)
presumably ole shaw won't steal all your private data bc you'd yell at him on twitter and stop using his agent framework, so incentive-wise it's not a concern, but a security-best-practices aka your compliance team's expectations would be to isolate full-perms request tokens away from anything meaningful
ik scoping down perm requests is on the roadmap so eventually it'll be sorted but when it was beta there was a buncha weird lil plugin edge cases so had to whole-hog it iirc
DeFine — 27/04/2025, 12:18
On it ser
[ai16z] <aiqubit>
APP
 — 27/04/2025, 12:19
How to call client-twitter in plugin actions and publish a tweet?
Does anyone know it?
[ai16z] <_sthx>
APP
 — 27/04/2025, 13:36
hi, the latest starter pack is based on Eliza OS 2?
bitcryptowski.btc — 27/04/2025, 13:45
how can i use heurist or openrouter or gemini as the main model? how can i set USE_LOCAL_AI: true to false if that is the solution?
ai16z-bridge-odi
APP
 — 27/04/2025, 13:56
[ai16z] <aiqubit> Can anyone know it?
bitcryptowski.btc — 27/04/2025, 14:00
Startup successful!
Go to the dashboard at http://localhost:3000
AgentServer is listening on port 3000
[2025-04-27 08:27:36] INFO: Using default Eliza character with all plugins

A new version of elizaOS CLI is available: 1.0.0-alpha.1 (current: 1.0.0-beta.37)
Expand
message.txt
9 KB
so before it was somehow easier or I think too complicated.
ai16z-bridge-odi
APP
 — 27/04/2025, 14:27
[ai16z] <k_carv> yes the quickstart guide in eliza.how is based on v2 beta
[ai16z] <_sthx>
APP
 — 27/04/2025, 14:30
ty. i'll check it out. been away for 2 months, things move fast around here
[ai16z] <itsafwog>
APP
 — 27/04/2025, 14:57
same
it was running before but today i got this error
ai16z-bridge-odi
APP
 — 27/04/2025, 15:01
[ai16z] <k_carv> yes indeed
sayonara — 27/04/2025, 15:33
were you able to get running?
Cocaine — 27/04/2025, 15:33
unfortunately no lol
sayonara — 27/04/2025, 15:35
I just got back to desk!

can you try the following

rm -rf ~/.eliza
cd ~/Documents
npm i -g @elizaos/cli@beta
elizaos create <agent-name>
cd <agent-name>
elizaos start
Cocaine — 27/04/2025, 15:40
no worries
for some reason it says it cant find that path lol
sayonara — 27/04/2025, 15:40
windows?
Cocaine — 27/04/2025, 15:41
yeah
sayonara — 27/04/2025, 15:44
rmdir /s /q %USERPROFILE%\.eliza
cd %USERPROFILE%\Documents
npm i -g @elizaos/cli@beta
elizaos create <agent-name>
cd <agent-name>
elizaos start
Cocaine — 27/04/2025, 15:45
it cant find that path either
the first line
sayonara — 27/04/2025, 15:47
okay just try after 1st command
Cocaine — 27/04/2025, 15:59
ok my pc is a bit slow doing it
Cocaine — 27/04/2025, 16:00
when trying to run it
Image
[ai16z] <_sthx>
APP
 — 27/04/2025, 16:03
trying to add the twitter cookies for login.  which coockies are mandatory?
sayonara — 27/04/2025, 16:03
DM'ng
Cocaine — 27/04/2025, 16:08
ok



[ai16z] <.starlord0>
APP
 — 29/04/2025, 14:04
Hi i got an error of schema validation when trying to load up my  character model. it said more details would be in a log but couldn’t find one. Where should I be looking for this. Thanks for the help and I would also love if u could ping on response
OpsDev | ONYX[AI]
 — 29/04/2025, 14:15
GMGM
I have cloned elizaos repo and run successfully on my localnet using ubuntu vps.
And I want to integrate this eliza ai framework to my other chatting frontend demo but I can't find how to integrate that eliza ai to my project frontend.
Plz help me @here
ai16z-bridge-odi
APP
 — 29/04/2025, 14:18
[ai16z] <nextidearly> So are you looking for a dev to handle that?
OpsDev | ONYX[AI]
 — 29/04/2025, 14:19
yes
sam-developer — 29/04/2025, 14:19
can you share logs ?
OpsDev | ONYX[AI]
 — 29/04/2025, 14:28
Who has exp w/ it?
[ai16z] <stan0473>
APP
 — 29/04/2025, 15:17
Did someone tried the McP plugin with notion McP ?

Is it working as well as Claude desktop ? Are you guys using it with openAI model or Antropic ones ? Thanks !
sam-developer — 29/04/2025, 15:45
hey @OpsDev | ONYX ,

if you wanna integrate agents api endpoint into your project,

https://github.com/elizaOS/eliza/blob/v2-develop/packages/cli/src/server/api/agent.ts

you can take reference of all the agents api endpoints from above file
GitHub
eliza/packages/cli/src/server/api/agent.ts at v2-develop · elizaOS...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
OpsDev | ONYX[AI]
 — 29/04/2025, 16:16
Thanks for kindly reply and will try with that.
I will ping you when I got issues
[ai16z] <uedersonferreira>
APP
 — 29/04/2025, 18:42
Hi guys! Quick question – I'm trying to run local models to test Eliza, but I'm hitting RAM limits. Any tips? I'm also using OpenRouter, but the 50-queries-per-day limit is pretty harsh, haha. I'm on a Mac M2 with 8GB RAM.
FaultyCarry — 29/04/2025, 19:20
anyone getting this error?
Image
[2025-04-29 13:48:26] WARN: [getTracer] Service instrumentation not found in runtime.
{"level":40,"time":1745934511439,"pid":362581,"hostname":"work","msg":"Could not parse text as JSON, returning null"}
sayonara — 29/04/2025, 19:21
Using Gemini endpoint?
sayonara — 29/04/2025, 19:23
Yes use open ai api key lol or groq
FaultyCarry — 29/04/2025, 19:33
I am using openrouter
ai16z-bridge-odi
APP
 — 29/04/2025, 19:33
[ai16z] <.starlord0> your macbook doesn’t have the hardware capability to run wtv model your using. either quantize it, use a smaller model or use some cloud server
FaultyCarry — 29/04/2025, 19:34
Open Router,
OPENAI_LARGE_MODEL=tngtech/deepseek-r1t-chimera:free
OPENAI_SMALL_MODEL=tngtech/deepseek-r1t-chimera:free
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_EMBEDDING_MODEL=text-embedding-004
OpenRouter
OpenRouter
The unified interface for LLMs. Find the best models & prices for your prompts
OpenRouter
FaultyCarry — 29/04/2025, 19:41
has anybody faced this error?
[2025-04-29 14:05:24] ERROR: Error stopping Twitter client b850bc30-45f8-0041-a00a-83df46d8555d-b850bc30-45f8-0041-a00a-83df46d8555d:
    message: "(RangeError) Maximum call stack size exceeded"
    stack: [
      "RangeError: Maximum call stack size exceeded",
sayonara — 29/04/2025, 19:42
did it start working for you
FaultyCarry — 29/04/2025, 19:42
gemini did not start working. I used openrouter now I am atleast getting replies on the dashboard from my agent
but twitter client does not seem to work
sayonara — 29/04/2025, 19:45
gemini models are not working via curl / their openai endpoind rn for me as well if set (stream: false)
FaultyCarry — 29/04/2025, 19:46
interesting.
I am using deepseek/deepseek-chat-v3-0324:free
now I can atleast get replies on dashboard
let me check twitter
looks like these errors are mostly cause of models that I am using. but they get reflected as if it was problem on the elizaos side
sbusonero — 29/04/2025, 20:08
hey gm, building an agent with eliza.

Anyone using any ai safety tool here? What do you recommend?

I'd like to test against prompt injections and maybe having guardrails
sayonara — 29/04/2025, 20:12
seem like memory issue on your end
FeelGood2 — 29/04/2025, 20:26
bun sRuntimeError: Aborted().
[ai16z] <_orayo_>
APP
 — 29/04/2025, 21:02
hey guys, why is there a error for dynamic require of util? I am using node.js 23+. Do you guys have the same error

✔ Select your database: › pglite (embedded database)
[2025-04-29 14:39:38] INFO: Selected pglite database
[2025-04-29 14:39:39] INFO: Found project by description in package.json
[2025-04-29 14:39:39] ERROR: Error importing module: Error: Dynamic require of "util" is not supported
[2025-04-29 14:39:39] WARN: Project module doesn't contain a valid default export
sayonara — 29/04/2025, 21:28
what commands did you run
Rascar — 29/04/2025, 23:00
is there any deepseek pluging for eliza v2?
sam-developer — 29/04/2025, 23:33
OPENAI_LARGE_MODEL=tngtech/deepseek-r1t-chimera:free
OPENAI_SMALL_MODEL=tngtech/deepseek-r1t-chimera:free
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_EMBEDDING_MODEL=text-embedding-004


you can use these as suggested by @FaultyCarry
ai16z-bridge-odi
APP
 — 29/04/2025, 23:38
[ai16z] <stan0473> Anyone ? 😦
jbvegas — 29/04/2025, 23:58
Hey guys. I’m using more.js 23 and am able to get Eliza to start but when I go to the gui and try to get a response it crashes. It is saying there is an issue with memory. I’ve tried this on two different machines because the first one only had about 40 gigs of space on the hard drive. Second machine has plenty of space. Here are some screenshots from command js.
Image
Image
Image
cjft — 30/04/2025, 00:07
seems like machine not enough GPU / RAM for local AI, whats your hardware spec?
cjft — 30/04/2025, 00:16
https://www.reddit.com/r/LocalLLaMA/comments/1gfvsiq/hardware_requirements_for_llama_32_3b_with_full/, apparently need like 20+ gigs of VRAM, for full context LLAMA 3 8B
jbvegas — 30/04/2025, 00:18
I’ve got 4 gigs of gpu ram.
AMD Radeon Pro WX 3100
Image
[ai16z] <OpenRouter #announcemen
APP
 — 30/04/2025, 01:43
FYI for those experiencing rate limit issues with 2.5 Flash, we just got more capacity on that model and it should be much better to use now.
OpsDev | ONYX[AI]
 — 30/04/2025, 11:17
I am looking for developer
I want to build EVM AI AGENT and I already built frontend chatting page.
I need to integrate my frontend code to Eliza AI framework.
get CMC info using plugin-coingecko,
Transfer, Swap, Bridge using plugin-evm,
Need smart contract & Token deployment,
It should be done with wallet connection in UI, NOT with private key.,
sam-developer — 30/04/2025, 11:37
@OpsDev | ONYX

if you take the agent id
and hit below endpoint
http://localhost:3000/api/agents/b850bc30-45f8-0041-a00a-83df46d8555d

you will be able to call agent through api and integrate it with your frontend.

I think you have to host your eliza cli version to a seperate backend endpoint if on production.

note : this is my agent id so this api endpoint might not work for you.
dming you all the api endpoint details
Image
OpsDev | ONYX[AI]
 — 30/04/2025, 11:39
Thanks for kindly guide @sam-developer
👍
You are the best
Ahsen Tahir — 30/04/2025, 11:45
hey can anyone provide a guide for elizaOS version 0.25.9
i'm a windows user
also have wsl
the ElisaOS starter is giving me errors in better_sqlite3
sam-developer — 30/04/2025, 11:55
can you share what kind of errors you are getting
Ahsen Tahir — 30/04/2025, 11:57
[2025-04-30 05:45:40] ERROR: Error starting agent for character Eliza:
    tries: [
      "/mnt/c/Users/ahsen/OneDrive - FAST National University/Desktop/forVSCODE/eliza-starter/node_modules/.pnpm/better-sqlite3@11.5.0/node_modules/better-sqlite3/build/better_sqlite3.node",
      "/mnt/c/Users/ahsen/OneDrive - FAST National University/Desktop/forVSCODE/eliza-starter/node_modules/.pnpm/better-sqlite3@11.5.0/node_modules/better-sqlite3/build/Debug/better_sqlite3.node",
      "/mnt/c/Users/ahsen/OneDrive - FAST National University/Desktop/forVSCODE/eliza-starter/node_modules/.pnpm/better-sqlite3@11.5.0/node_modules/better-sqlite3/build/Release/better_sqlite3.node",
      "/mnt/c/Users/ahsen/OneDrive - FAST National University/Desktop/forVSCODE/eliza-starter/node_modules/.pnpm/better-sqlite3@11.5.0/node_modules/better-sqlite3/out/Debug/better_sqlite3.node",
Expand
message.txt
12 KB
sam-developer — 30/04/2025, 12:03
which command are you using
Ahsen Tahir — 30/04/2025, 12:04
pnpm one that is given in the readme on github
git clone https://github.com/elizaos/eliza-starter.git
cd eliza-starter
cp .env.example .env
pnpm i && pnpm build && pnpm start
sam-developer — 30/04/2025, 12:04
that is old
can you use the cli
can you try these
Also you might be needing bun for it

npm install -g @elizaos/cli@beta
elizaos create or npx elizaos create (since you are on windows)
select pglite upon start
bun start when inside the created project
ai16z-bridge-odi
APP
 — 30/04/2025, 12:28
[ai16z] <mmmorlok> how do I deploy to prod within railway using a project started with the cli?
currently it gets stuck on the database prompt (although I have setup the POSTGRES_KEY secret + env)
hh — 30/04/2025, 16:14
hey sam thanks for that I did that and it work but my agent on the dashboard don't talk maybe do you know why ? in the env I have inserted the key api open ai
AlexShelpinOP303 — 30/04/2025, 16:17
Hi! Which node version are you using? It seems there is a known incompatibility between the latest version of bettersqlite and node 23.3 , I had to downgrade to node 20.19.1 ….
hh — 30/04/2025, 16:30
got this error [2025-04-30 10:42:37] WARN: [AgentRuntime][Eliza] No TEXT_EMBEDDING model registered. Skipping embedding dimension setup
sam-developer — 30/04/2025, 16:39
OPENAI_API_KEY did you filled this env key
sam-developer — 30/04/2025, 16:39
can you double check if you have credits on your api key
as this seems to be working me
sam-developer — 30/04/2025, 16:41
let me get back to you on this
hh — 30/04/2025, 16:48
I filled it also got credit
Image
Image
sam-developer — 30/04/2025, 16:48
can you update the cli once
hh — 30/04/2025, 16:48
what is the command ?
this one ? npm install -g @Elizaos/cli@beta
sayonara — 30/04/2025, 16:52
that should work
Ahsen Tahir — 30/04/2025, 16:54
i'm using v23.11.0
hh — 30/04/2025, 16:54
got the same error ] WARN: [AgentRuntime][Eliza] No TEXT_EMBEDDING model registered. Skipping embedding dimension setup
AlexShelpinOP303 — 30/04/2025, 16:59
Then I am sure you are facing issues because of this incompatibility , try to downgrade to 20.19.1
Ahsen Tahir — 30/04/2025, 16:59
sure
0xbbjoker — 30/04/2025, 17:56
hmm that's weird

can you check you API key, give all permissions and don't  dorestricted on the openai console?
hh — 30/04/2025, 18:00
yeah I'm sure that only doest with eliza os
0xbbjoker — 30/04/2025, 18:08
if you think API key is okay then:
did you customized character?,
and if so what is the order of plugins in your character?,

in case you didn't changed anything and just trying to start by populating .env then I think smth is wrong with the API key and your setup on openai console.

all I have in .env and elizaos start works for me.

I have all permissions enabled on my openai key.
Image
hh — 30/04/2025, 18:09
maybe my version isnt good ? I have this one https://github.com/elizaos/eliza-starter
GitHub
GitHub - elizaOS/eliza-starter
Contribute to elizaOS/eliza-starter development by creating an account on GitHub.
GitHub - elizaOS/eliza-starter
0xbbjoker — 30/04/2025, 18:11
but you don't need that - that is for v1.

if you wanna use CLI you don't need any repo locally.

⁠❓｜tech-support⁠
the CLI will create a project repo for you
Image
hh — 30/04/2025, 18:11
aaaah I just need to do the command then
let me do it
[ai16z] <kirsty_extropy>
APP
 — 30/04/2025, 18:15
Hey I'm getting this error

Error: No handler found for delegate type: TEXT_EMBEDDING

I have an anthropic key and openai key and still no luck. Any ideas?
0xbbjoker — 30/04/2025, 18:19
the Anthropic plugin does not have a TEXT_EMBEDDING model so you'll need some plugin like OpenAI.

The screenshot shows the order of plugins in your character file. This order matters because if a capability is missing in one plugin, it will fallback to the next LLM plugin in the list.

So for example, this configuration will add all the possible models from Anthropic, and then OpenAI will add the TEXT_EMBEDDING functionality that Anthropic lacks.
Image
[ai16z] <OpenRouter #announcemen
APP
 — 30/04/2025, 19:01
🐳 New mysterious model! DeepSeek Prover v2,
This morning, the DeepSeek team silently dropped a new 671B model on Hugging Face. Not much is known about the model yet, as it was published without a description or announcement

The previous release (v1.5) pushed the frontier forward on miniF2F and ProofNet benchmarks, using Reinforcement Learning & a Monte-Carlo search that employs an intrinsic-reward-driven exploration strategy to generate diverse proof paths.

Let’s see what v2 can do. Try it out in your own evals and let us know what you think!

Available in both free and paid variants:
deepseek/deepseek-prover-v2:free,
deepseek/deepseek-prover-v2,
[ai16z] <godisrupt>
APP
 — 30/04/2025, 19:02
hey newbie question, how can I host ElizaOS? Because right now it runs fine on my macbook, but is it possible to mount it on Vercel? Sorry for this rather silly question
hh — 30/04/2025, 19:11
I have done all those step
and I keep getting the same error
[AgentRuntime][Eliza] No TEXT_EMBEDDING model registered. Skipping embedding dimension setup.
[ai16z] <godisrupt>
APP
 — 30/04/2025, 19:14
hey eliza how is offline ?
Mel G — 30/04/2025, 19:33
Hey everyone, I am also facing issues with OpenAI. As I can see, eliza is connected to my MCP, and in the .env file, I set the values of: OPENAI_API_KEY, OPENAI_BASE_URL, SMALL_OPENAI_MODEL,MEDIUM_OPENAI_MODEL,LARGE_OPENAI_MODEL,EMBEDDING_OPENAI_MODEL. I use openrouter and and I know I have credits (and I am using ((v1.0.0-beta.38)))
Mel G — 30/04/2025, 19:49
is there something else that I should configure?
sayonara — 30/04/2025, 19:58
What’s the issue
Mel G — 30/04/2025, 20:01
OPENAI_BASE_URL=https://openrouter.ai/api/v1
SMALL_OPENAI_MODEL=anthropic/claude-3.7-sonnet
MEDIUM_OPENAI_MODEL=anthropic/claude-3.7-sonnet
LARGE_OPENAI_MODEL=anthropic/claude-3.7-sonnet
EMBEDDING_OPENAI_MODEL=anthropic/claude-3.7-sonnet
OPENAI_API_KEY=sk-...
Image
sayonara — 30/04/2025, 20:03
should be OPENAI_EMBEDDING_MODEL but unrelated
wait
OPENAI_EMBEDDING_MODEL=
OPENAI_LARGE_MODEL=
OPENAI_SMALL_MODEL=
OPENAI_API_KEY=sk...
OPENAI_BASE_URL=https://openrouter.ai/api/v1
should be like this
you have setup wrong
sayonara — 30/04/2025, 20:08
railway or render; ask chatgpt how to do it
Mel G — 30/04/2025, 20:08
even with this setup, I get the same issue
sayonara — 30/04/2025, 20:09
did you restart?
the elizaos server

[ai16z] <subhankar141202>
APP
 — 01/05/2025, 03:07
Its 1.0.0-beta
[ai16z] <odilitime>
APP
 — 01/05/2025, 03:10
oof that's tough, I don't have any magic for that one
you're in the terrirtory of needed to optimize queries, and checking indexes of the queries
wonder if you could just increase the timeouts initiailly to get you some more head room
but you'll need to profile and analyze what's eating up postgres's time
[ai16z] <OpenRouter #announcemen
APP
 — 01/05/2025, 03:30
An update on the upstream Vertex token counting issue with Gemini 2.5 Pro and Flash Preview models: The Vertex team has finished the rollout of the fix, and we have now re-enabled the model.
[ai16z] <OpenRouter #announcemen
APP
 — 01/05/2025, 05:12
We're temporarily disabling caching on Gemini 2.5 Pro Preview as we evaluate usage and costs from upstream (AI Studio and Vertex) to ensure users aren't being over-billed.
shaw — 01/05/2025, 06:44
hmm what is your postgres? this sounds like connection pooling headache thing, if you're using pgbouncer should be ok

1000 agents, sounds cool
Thanh — 01/05/2025, 09:14
Hi there
I cannot make agent work with knowledge
"knowledge": [
"Rokie is a superman. He loves peace He fly around the world everyday He dont eat"
],
Image
Anyone pls help me on this
Odilitime — 01/05/2025, 09:28
https://eliza.how/docs/0.25.9/faq#memory-and-knowledge-management maybe
Frequently Asked Questions | eliza
What is Eliza?
[ai16z] <dansyk.>
APP
 — 01/05/2025, 09:30
hello, how to startup eliza new release
i tried to run twitter but it stuck
Thanh — 01/05/2025, 09:52
I have not changed much things. Just install elizaos/cli@beta, create a project, add .env param: open ai key, postgresql server, then add that knowledge into src/index.ts
Image
Image
Odilitime — 01/05/2025, 10:31
Oh that’s 1.x
sayonara — 01/05/2025, 11:39
Is your agent name Rokie? And it’s still loading Eliza ( default character)
Can you share the commands that you ran?
[ai16z] <mohit_87823>
APP
 — 01/05/2025, 12:29
Hey, can anyone suggest me ways to reduce the image size of eliza repo? I am using some plugins, using customized core and agent package. My current image size is coming around 3.32gb.
[ai16z] <mtbc_69795>
APP
 — 01/05/2025, 13:56
Could anyone review the plugin enhancement on https://github.com/elizaos-plugins/plugin-zilliqa/pull/1 ? It's tested and working, we just want to get it in to make it available to others.
GitHub
Add swaps with PlunderSwap plugin and wrap/unwrap of WZIL. by mtbc ...
Adds to the Zilliqa plugin the functionality offered by https://www.npmjs.com/package/@goat-sdk/plugin-zilliqa to convert tokens between ZIL and WZIL and to swap between WZIL and other tokens on th...
Add swaps with PlunderSwap plugin and wrap/unwrap of WZIL. by mtbc ...
[ai16z] <kirsty_extropy>
APP
 — 01/05/2025, 15:10
Still getting this error

file:///Users/../.nvm/versions/node/v23.3.0/lib/node_modules/@elizaos/cli/dist/chunk-GFPVHNVN.js:46822
      throw new Error(`No handler found for delegate type: ${modelKey}`);
            ^

Error: No handler found for delegate type: TEXT_EMBEDDING


I've added the open api key to .env.

On line 45459 in chunk-GFPVHNVN.js  TEXT_EMBEDDING: "TEXT_EMBEDDING",  is being used as the modelKey it seems.
is this right for modelType?

Also tried rm -rf ~/.eliza and restarted. @here
sam-developer — 01/05/2025, 15:19
can you uninstall cli , reinstall it and again test it out once ?
Thanh — 01/05/2025, 15:19
Just install elizaos cli beta, config .env, add following knowledge to src/index.ts

knowledge: [
"Rokie is a superman. He loves peace He fly around the world everyday He dont eat"
],

Then run: elizaos start

The agent name is Eliza as default. Rokie is a name that mentioned in the knowledge story
sam-developer — 01/05/2025, 15:23
npm uninstall -g @elizaos/cli
rm -rf ~/.eliza

npm install -g @elizaos/cli@beta
npx elizaos create
cd project that got created
input the env keys value
elizaos start

if things give some embedding issue it means your system doesn't have any local model restart it again and it will start downloading local ai model
otherwise put open ai or anthropic key in env for outputs.

make sure for if you want local ai model to run you should have good amount of free ram as ai models are usually heavy and space taking on


can you try this once
sayonara — 01/05/2025, 15:52
Will test on my end
Thanh — 01/05/2025, 17:56
Thankyou bro ❤️ ❤️
Thanh — 01/05/2025, 20:27
Should I try v2 now?
Just in a development stage for a plugin
Odilitime — 01/05/2025, 20:29
that is v2
Thanh — 01/05/2025, 20:29
Beta is v2 actually?
Odilitime — 01/05/2025, 20:32
1.0.0beta is what Shaw calls v2
Thanh — 01/05/2025, 20:33
So confusing but love what you guys are building
STRIMANDO — 01/05/2025, 20:56
Hello everyone I'm working on a project for a Co host for my streaming and I using the project open llm vtuber
https://docs.llmvtuber.com/
I already installed everything, the last part I can't figure out, is that o want to use a cloned voice in Brazilian portuguese of Kratos, i tried GPT-SOVITS v2, coqui TTS and edge tts with RVC, but still can't make the model to use the cloned voice, what would you guys recommend for me in this case? I got this error using coqui TTS and the trained voice.
src.open_llm_vtuber.conversations.single_conversation:process_single_conversation:112 | Error in conversation chain: CUDA failed with error device-side assert triggered
DEBUG:    > TEXT '{"type": "error", "message": "Conversation erro...side assert triggered"}' [103 bytes]


any ideas?

I have 4090, i9, 64gb ddr5
Hello from Open LLM Vtuber | Open LLM Vtuber
Description will go into a meta tag in
Hello from Open LLM Vtuber | Open LLM Vtuber
Tom — 01/05/2025, 22:01
Hello, I have extensive experience in developing AI agents and bots. My skills include:

✅ Social Media Agents: Twitter, Telegram, Discord, and more.
✅ Voice Agents: WebRTC, VoIP, and Telephony.
✅ Crypto Trading Agents: Solana, Ethereum, and Hyperliquid.

Please feel free to DM me if anyone is in need of a developer.
[ai16z] <mmmorlok>
APP
 — 01/05/2025, 22:15
heyheyhey, can someone give me a clue on how I can process every received interaction without interupting the original workflow?

idea is to store all of the received tweets in a seperate backend db, tried with actions with no examples and no similes, but doesn't seem to work :(((
[ai16z] <mmmorlok>
APP
 — 01/05/2025, 22:25
for now I've created an action with no similes and no examples and put this logic into the validate function, is this the best place? (handler doesn't get executed for some reason :((( )
sam-developer — 01/05/2025, 23:38
are you using cli ?
sam-developer — 01/05/2025, 23:39
can you share me what's the issue you might be facing in the console
[ai16z] <doriand0963>
APP
 — 02/05/2025, 00:44
i think something like this (the agent cards) could/should be implement for Eliza agents, I wrote a thing a while back about an agent registry and inter-agent messaging (meaning agents not hosted on the same swarm); and this seems to flesh out the concept of agent to agent markets
STRIMANDO — 02/05/2025, 01:29
I am using TRAE AI
[ai16z] <stan0473>
APP
 — 02/05/2025, 02:13
Yop, what is the new bm25 in package/core ?
[ai16z] <stan0473>
APP
 — 02/05/2025, 02:20
I mean how is it used now ?
0xbbjoker — 02/05/2025, 02:34
have a look here: https://github.com/elizaOS/eliza/blob/v2-develop/packages/core/src/runtime.ts#L2277

vector search on memory table,
then results are reranked using bm25,
Thanh — 02/05/2025, 06:20
Hi have you checked again?
YungYoda — 02/05/2025, 07:39
can we add external db's as knowledge?
LemonS — 02/05/2025, 07:48
whats the correct way to generate text to answer an action like the agent? I think I have to use runtime.useModel, but do I also have to provide a template saying to answer like the agent? do I have to add something else?
Ocisly — 02/05/2025, 08:07
Hi guys, the conversation with ai agent will disappear after a few minutes, does anyone know how to fix it? thanks a lot
DrakeDinh — 02/05/2025, 08:12
same question
sayonara — 02/05/2025, 08:34
what kind of db?
YungYoda — 02/05/2025, 09:23
a big postgres db of media images and video. i essentially want it to make contextual video references.
sayonara — 02/05/2025, 09:30
You could write plugin for that but we don’t have any such support right now !!

on v2 you could potentially use mcp plugin and Postgres mcp server to do that but I don’t know if anyone has tried that
Acul — 02/05/2025, 11:47
I've been getting an EINTVAL error no:-22 while elizaos/cli:build is copying files and directories , had to change the way fs.copy was used ,, anyone else been having this issue while running
bun run build
?
sam-developer — 02/05/2025, 11:57
can you tell me your branch name ?

I will suggest try using cli if you wanna interact with agents.
⁠❓｜tech-support⁠

you can install cli by checking this
Acul — 02/05/2025, 12:05
this is on latest v2-develop, if I use elizaos create , cd into new project and run elizaos start i'm getting ensureAgentExists error ,, that's i've been trying to build directly via bun on v2
sam-developer — 02/05/2025, 12:07
what's your node version Acul ?
YungYoda — 02/05/2025, 12:07
remove starterPlugin from index.ts
Acul — 02/05/2025, 12:08
23.8.0
YungYoda — 02/05/2025, 12:26
i see that plugin Actions have an example section is it then necessary to add the same chat examples in your character file as well?
sam-developer — 02/05/2025, 12:30
nopes , it will automatically pick examples from plugin
DrakeDinh — 02/05/2025, 13:40
Does v2 support Deepseek or i have to write my own plugin to use it ?
Thanh — 02/05/2025, 13:41
Basically yes with MCP based on what I am reading, but my development halted at the first step importing knowledge from a .md file
Thanh — 02/05/2025, 13:43
Based on .env.example I guess that v2 already support
Image
sam-developer — 02/05/2025, 14:01
yes you can,
check this out ,
you need to define model in envs

⁠❓｜tech-support⁠
DrakeDinh — 02/05/2025, 14:14
i created new project use
npm install -g @elizaos/cli@beta
elizaos create

my .env.example file  only has 46 lines without DEEPSEEK or other model, only openai, anthropic, ollama and studiolm
ai16z-bridge-odi
APP
 — 02/05/2025, 14:35
[ai16z] <stan0473> Anybody know that ?
sam-developer — 02/05/2025, 14:41
if you run things by default,
it will automatically install deep seek quen model and start your agent
DrakeDinh — 02/05/2025, 14:42
so now i want to use deepseek via api key, what i need to do
sam-developer — 02/05/2025, 14:42
nothing just run elizaos start
inside the folder you created
DrakeDinh — 02/05/2025, 14:43
Image
with this character config, if im not have openai api key and anthropic api key, it will use local-ai right?
sam-developer — 02/05/2025, 14:44
yes
DrakeDinh — 02/05/2025, 14:44
but i want to use deepseek model because i have deepseek api key
i don't have enough VRAM for local-ai
always got this error for just say hi message
Image
sam-developer — 02/05/2025, 14:50
Drake are you using opensourter api ? to access deep seek model ?
DrakeDinh — 02/05/2025, 14:51
you mean openrouter right ?
maybe v2 is not supported yet?
Image
sayonara — 02/05/2025, 15:12
rm -rf ~/.eliza once and retry also update your cli with npm i -g @elizaos/cli@beta
sayonara — 02/05/2025, 15:14
we dont have deepseek direct support but you maybe able to use with openai plugin

https://github.com/elizaOS/eliza/blob/v2-develop/packages/docs/blog/openai-plugin-envs.md
GitHub
eliza/packages/docs/blog/openai-plugin-envs.md at v2-develop · eli...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
DrakeDinh — 02/05/2025, 15:17
it's only available on branch v2-develop, not project created by using cli @beta right?
sayonara — 02/05/2025, 15:54
available on both but custom embedding endpoint setup available in next beta release
Acul — 02/05/2025, 17:39
I deleted .eliza in home dir, deleted elizaos in nvm node_modules and updated using your npm cmd ,, did this for both node version 23.3.0 & 23.8.0 ,, still having ensureAgentExists ERROR. i'll see if I can debug further  -
[2025-05-02 11:58:10] ERROR: Failed to create agent entity: Agent Eliza does not exist in database after ensureAgentExists call
    agentName: "Eliza"
    agentId: "b850bc30-45f8-0041-a00a-83df46d8555d"
sayonara — 02/05/2025, 17:42
Can you do

elizaos --version
sayonara — 02/05/2025, 17:43
can you tell me if you're using pglite or postgres also
Acul — 02/05/2025, 17:45
1.0.0-beta.41 - pglite
[ai16z] <darthgus>
APP
 — 02/05/2025, 17:49
hi all - glad to join - looking to move a project on the registry from eliza-plugins to our own github account - is that allowed?
sayonara — 02/05/2025, 18:06
Can you share exactly what commands are you running to start
sayonara — 02/05/2025, 20:38
Scam
[ai16z] <stan0473>
APP
 — 02/05/2025, 20:55
Hi, do we have a way to count, retrieve the total amount of token that've been used from a a message.

Like, I send a message, then I can retrieve the total amount of token it was used to generate the final answer ? (embedding + every useModels..)
[ai16z] <jay_cool54>
APP
 — 02/05/2025, 20:55
Yes

0xbbjoker — 03/05/2025, 02:19
it really can't be easier then this.

your knowledge.

my character looks like this and you don't need true/false, just the content in the knowledge section.
Image
Image
cc @Thanh
notice also my question it has a lot more context which significantly improves chances to find some similar "knowledge" in database.
0xbbjoker — 03/05/2025, 02:40
To give you an explanation on this - yes we use similarity score which is calculated over cosine distance.

And then also bm25 for reranking which will improve the similarity score. Means better context for the agent.
Thanh — 03/05/2025, 03:21
Thankyou @Tangl @0xbbjoker @sayonara : Actually I would not be the person who contribute the knowledge. Our clients will do. So I am quite worry that if they input : Rokie is a superman. He loves peace He fly around the world everyday He dont eat ; then expect the correct answer for these questions: Who is Rokie, Gender? which is totally answered correctly by any Ai Chat with fastest models from ChatGPT, Gemini, Deepseek
Image
0xbbjoker — 03/05/2025, 03:30
Image
I don't see any definition of gender in your "articles" for Rokie. So any LLM will make assumption unless there is strict context in the RAG which would explain the gender. Not sure did I miss something from your context?

I don't wanna say our RAG is way better then openai. But I don't see any diff.

I know anthropic has some secret sauce on it and I'll try to introduce this on ElizaOS in the coming weeks.
Thanh — 03/05/2025, 03:34
Bro your demo is much more than what I tried before
Can you pls share us your character file demo for that?
Which ai model are you using?
0xbbjoker — 03/05/2025, 03:35
I'll push the branch - using just openai for this example.

Will point you to the branch and how to run it.
Thanh — 03/05/2025, 03:36
This is what I got with same knowledge
Thanh — 03/05/2025, 03:36
Thankyou ^^
0xbbjoker — 03/05/2025, 03:42
here is the character: https://github.com/0xbbjoker/eliza/blob/comic-comentator/packages/project-starter/src/index.ts

you can cp this to your index.ts file if u used:
elizaos create,
update the index.ts file where character is located,
after you update elizaos dev -> this will do the build for you again and start it.,
Rascar — 03/05/2025, 03:43
Is the ElizaOs Documentation offline? I am not being able to access it
Thanh — 03/05/2025, 03:44
Thankyou bro, Do you have any advice for short paragraph like I tried with chatgpt.com o4 mini? : Rokie is a superman. He loves peace He fly around the world everyday He dont eat
YungYoda — 03/05/2025, 03:58
if i add a bunch of PDFs to my agents /knowledge directory how do i know the agent has processed them? I also see in the docs that PDFs have a specific PDF runtime service. Do i only use the this for loading pdfs dynamically or is this not necessary as long as the directory structure matches the docs?

  // Add knowledge directories configuration
  knowledge: [
    {
      directory: 'knowledge/shared/pdf-templates-main',
      shared: true,
    },
    // Case examples specific to Agent
    {
      directory: 'knowledge/Agent/pdf-examples',
      shared: true,
    }
  ],
I tried asking the agent about the pdfs and it said it didnt know.
0xbbjoker — 03/05/2025, 04:06
not sure if you could elaborate this a bit more? what are you trying to accomplish?
0xbbjoker — 03/05/2025, 04:12
Hmmm, okay so this is the 0.25.9 version of ElizaOS, and if you feed in knowledge like this:

Your PDFs will be chunked into smaller pieces called fragments.,
You can't ask the agent "Hey, do you have those PDFs?",
The agent is not aware of those PDFs.,
You trigger the search on the database with your message to the agent (that's called context).,
That context is transformed into a vector.,
Then we compare that vector with the fragments in the database and look for similarity between your vector and what's in the database.,
The search operation binds the knowledge to the prompt.,
And this is the point where the "context" is extended with your knowledge (that you fed into the database).,

Though I haven't tried PDF import for a while now on the 0.25.9 version.
YungYoda — 03/05/2025, 04:19
Ah okay so if i want the agent to bring up specific documents is it better to dynamically pull in the pfs through the provider/action pattern instead?
Acul — 03/05/2025, 04:32
elizaos start
, in the directory I just created using create
lantianlaoli — 03/05/2025, 14:15
elizaos/core:build: src/generation.ts(598,21): error TS2741: Property 'preconnect' is missing in type '(input: RequestInfo | URL, init?: RequestInit) => Promise<Response>' but required in type 'typeof fetch'.
@elizaos/core:build:
@elizaos/core:build: Error: error occurred in dts build
@elizaos/core:build:     at Worker.<anonymous> (/home/cxp/ai_agent_learn/eliza/node_modules/tsup/dist/index.js:1541:26)
@elizaos/core:build:     at Worker.emit (node:events:513:28)
@elizaos/core:build:     at MessagePort.<anonymous> (node:internal/worker:267:53)
@elizaos/core:build:     at [nodejs.internal.kHybridDispatch] (node:internal/event_target:827:20)
@elizaos/core:build:     at MessagePort.<anonymous> (node:internal/per_context/messageport:23:28)
@elizaos/core:build: DTS Build error
@elizaos/core:build:  ELIFECYCLE  Command failed with exit code 1.
@elizaos/core:build: ERROR: command finished with error: command (/home/cxp/ai_agent_learn/eliza/packages/core) /home/cxp/.local/share/pnpm/.tools/pnpm/9.15.7/bin/pnpm run build exited (1)
@elizaos/core#build: command (/home/cxp/ai_agent_learn/eliza/packages/core) /home/cxp/.local/share/pnpm/.tools/pnpm/9.15.7/bin/pnpm run build exited (1)

 Tasks:    1 successful, 2 total
Cached:    1 cached, 2 total
  Time:    5.8s
Failed:    @elizaos/core#build

The main branch run pnpm build has the error !!!!
don't any check step before push code?
lantianlaoli — 03/05/2025, 15:00
Why aren't you updating this document. Your string is no longer usable, is there no one managing your documents?
Image
There are too many inconsistencies between the document and the code,
I don't understand why in the Eliza project of this monorepo, the original packages of this project did not include the Solana project, and now I am declaring it directly in packagejson. So, is it downloaded to node_rodules or this package folder? I really don't understand at all
[ai16z] <mirmomoguro>
APP
 — 03/05/2025, 15:17
I need help I want to start twitter agent but only on petecular chain , agent need to know full about that project and post it every day and news and update on time need to update like this
OpsDev | ONYX[AI]
 — 03/05/2025, 22:25
I am looking for developer who can do this.
get CMC info like token price, volume, marketcap..etc,
swap & transfer tokens(when swap or transfer token, the ai agent should say "pending..." when swapping token, and after success, it should tell us tx hash link.,
deploy tokens,
integrate with wallet connection, not private key,
sayonara — 03/05/2025, 22:52
@Spit if you;re looking
OpsDev | ONYX[AI]
 — 03/05/2025, 22:52
@Spit  Hi, Check your DM plz
YungYoda — 04/05/2025, 01:17
send me DM
[ai16z] <nicassonft>
APP
 — 04/05/2025, 02:35
dm who can run auto.fun, I'll pay $500
rahms — 04/05/2025, 06:30
I am trying to use the RAG Knowledge function for eliza. I have used both the knowledge folder with .md, as well as adding the knowledge array to the character with some facts inside. While it seems to be vectoring the information, I can't get the bot to return the correct information from my knowledge base, instead it pulls the prior knowledge that OpenAI has. I've followed the docs (https://docs.eliza.how/docs/core/knowledge) but can't get it to work. I feel like i might be missing something but not sure what. Anyone here been able to set up the RAG agent successfully recently?
Knowledge System | eliza
Understanding ElizaOS knowledge management - how agents process, store, and retrieve information
Knowledge System | eliza
[ai16z] <stan0473>
APP
 — 04/05/2025, 14:24
V025 or v1 ?
sayonara — 04/05/2025, 15:29
Scam
sayonara — 04/05/2025, 15:29
Scam
[ai16z] <davidrounders>
APP
 — 04/05/2025, 15:58
Anybody working with X API instead of scrapper for the agent? We just got limited the API account without warning and without a clear reason… horrible.
Is there a configuration to stop being flagged somehow? What action could be flagging us most likely?
We paid 400 dollars already :PeepoHappy:

We created a plug-in that is 100% functional but we just got limited by X.
0xbbjoker — 04/05/2025, 16:47
the rag is working - I can confirm that.

I am not sure wdym by "I can't get the bot to return the correct information from my knowledge base, instead it pulls the prior knowledge that OpenAI has"?
rahms — 04/05/2025, 17:40
The example knowledge I have is "Burger King only has 5 restaurants worldwide", but when i ask it, it says that it has 18000 restaurant (the real amount). Thats what i meant by pulling prior knowledge from openai/llm.
0xbbjoker — 04/05/2025, 18:07
Please read messages exchanged from this point about rag knowledge. ⁠❓｜tech-support⁠
VALIPOKKANN — 04/05/2025, 18:23
i set up eliza-starter and have twitter username password   on the .env file. added twitter in plugins, in character file. llm is up and running, still i dont see any posts on my twitter.
HELP
0xbbjoker — 04/05/2025, 18:30
try this: https://www.youtube.com/watch?v=-4sp4ZncMWc
VALIPOKKANN — 04/05/2025, 18:43
so this uses the full eliza os and not eliza-starter right ?
0xbbjoker — 04/05/2025, 19:22
this is like a new starter on v2 and it uses CLI
VALIPOKKANN — 04/05/2025, 19:39
sorry, noob here, that video straight up fired up the cli, i have no idea whats V2
just learning javascript to learn typescript later
0xbbjoker — 04/05/2025, 19:52
can you follow the instructions?

v2 is our new version of ElizaOS -> beta.1.0.0
[ai16z] <2spooky9996>
APP
 — 04/05/2025, 20:06
I am recreating the example from AI Agent Dev School 3 with V0.25, and everything is generally working. However, the provider and generateText functions run before the evaluator handler, so the agent doesn't immediately respond with the secret code to the user's message where the final piece of required information is provided. Is there another Eliza way to make this happen?
Ben Schiller 🔸 — 05/05/2025, 07:32
thank you thank you thank you! i was banging my head against the wall for hours until i came across this video. perfect!

a few things… i did this to begin Ensure you're using Node.js v23.3.0: nvm install 23.3.0 && nvm use 23.3.0 then followed the video instructions. for supabase setup i used Transaction pooler parameters. make sure to add OPENAI_API_KEY and that's it 🚀
Image
axs[Mn]
 — 05/05/2025, 07:53
Hi family, i'm having the following errors, i'm new to this and would love some help ❤️

[2025-05-05 02:17:11] ERROR: Error details: Database adapter not initialized. The SQL plugin (@elizaos/plugin-sql) is required for agent initialization. Please ensure it is included in your character configuration.
[2025-05-05 02:17:11] ERROR: Stack trace: Error: Database adapter not initialized. The SQL plugin (@elizaos/plugin-sql) is required for agent initialization. Please ensure it is included in your character configuration.


I've already tried to:

rm -rf ~/.eliza


But it did not work

Any idea?

I have WSL installed, node is up to date, npm as well
Note: I did not create a "project" I first wanted to use the vanilla installation of Eliza as per the documention

EDIT:,
This seems to be the error:

[2025-05-05 02:41:53] WARN: Failed to load plugin module '@elizaos/plugin-sql' using all available strategies.
[2025-05-05 02:41:53] WARN: Plugin @elizaos/plugin-sql installed : but could not be loaded/verified.
[2025-05-05 02:41:53] ERROR: All installation attempts failed for plugin @elizaos/plugin-sql


SOLUTION :yes:,
I finally made it work,
so basically I installed Ubuntu via Microsoft Store and then ran my commands in the Ubuntu CLI, it got me rid of the Database Adapter error,


Still wasn't enough to work, I then got the No TEXT_EMBEDDING error, I then:

started using "elizaos start" and on the web interface I added the openai plugin (which you can do in CLI as well),
created a .env file specifying my OPENAI_API_KEY=,

and it worked, I am currently chatting with ElizaOS using my OpenAI API Key

This was only step 1 tho, need to dig this more and more now.
Hope this helps
[ai16z] <.alex92>
APP
 — 05/05/2025, 10:38
Whats the deal with tweets, I get the first initial tweet generate and post no problem, then nothing else

✓ Agent Twitter Agent started successfully!
[2025-05-05 04:57:57] INFO: Created Twitter client for d237f16b-2854-09db-a0be-24818f4a45de
[2025-05-05 04:58:57] INFO: Generating new post...
[2025-05-05 04:58:57] INFO: No settings state found for server 1919224171751714816
[2025-05-05 04:58:57] WARN: [getTracer] Service instrumentation not found in runtime.
[2025-05-05 04:58:59] WARN: [getTracer] Service instrumentation not found in runtime.

lantianlaoli — 05/05/2025, 13:14
export default {
  name: "GENERATE_RAYDIUM_CLMM_CONFIG",
  similes: ["CREATE_RAYDIUM_CLMM_CONFIG", "BUIDING_POOL_CONFIG"],
  validate: async (_runtime: IAgentRuntime, _message: Memory) => {
    return true;
  },
  description:
    "Create a Raydium CLMM pool config like token amount and step of Ladder-Step LP. Requires user token held by amount.",
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback?: HandlerCallback
  ): Promise<boolean> => {
    elizaLogger.info("Starting generate raydium clmm config");


why my log of plugin can't be see on console? but the core  can be work?

[2025-05-05 07:37:58] INFO: Selected model: nousresearch/hermes-3-llama-3.1-405b
[2025-05-05 07:38:02] INFO: Executing handler for action: GENERATE_RAYDIUM_CLMM_CONFIG
[2025-05-05 07:38:02] ERROR: Error in pool provider:
Error in generateObject: InvalidArgumentError [AI_InvalidArgumentError]: Invalid argument for parameter schema: Schema is required for object output.
sayonara — 05/05/2025, 13:47
have you setup post interval correctly? try with lower interval to see if its working
lantianlaoli — 05/05/2025, 15:03
I have running the eliza project but why the api is faild?
Image
Image
Ben Schiller 🔸 — 05/05/2025, 16:00
When I create an agent in GUI, I do not see that reflected inside index.ts or anywhere at all in the project. I would expect the JSON to be somewhere in the project directory. Am I missing it?
0xbbjoker — 05/05/2025, 16:30
In that case your agent is stored in database.
Ben Schiller 🔸 — 05/05/2025, 17:48
Interesting. Only Eliza is in agents table, not the one I created. As I make more agents I'll see if I can recreate the issue to be more exact in describing the problem. For now I manually added the agent into db and moving on 🤷 Thank you!
sayonara — 05/05/2025, 17:49
changes that you make to agents in gui are made in db; if you start/stop from there, they will be reflected that way
you can always export agents in db via cli tho
DrakeDinh — 05/05/2025, 20:53
Hi i used your knowledge file sample to test. I saw it on database and it loaded data when i ask but still got wrong answer
Image
Image
Image
yoyoha — 05/05/2025, 20:54
I have set the following .env

TWITTER_ENABLE_POST_GENERATION=true
TWITTER_POST_INTERVAL_MIN=1
TWITTER_POST_INTERVAL_MAX=3

And expect a new tweet max per 3 mins but I see only 1 tweet posted.
[ai16z] <jacobfromoffice_08423>
APP
 — 05/05/2025, 21:03
Hi everyone, I have a little problem and hope some of you can help me. It seems to be quite easy but I am pritty new to eliza and maybe that is the problem haha. So I have a plugin created by elizaos create --type plugin and when I run yarn dev everything works (this is plugin that generate random text every 3-4h). And how can I integrate it with eliza project created by run elizaos create --type project? How can I run my plugin in elizaos project with some particular character? Should I publish my plugin first? And how can I create character and some way pass it to plugin?
morlok — 05/05/2025, 23:07
regarding the plugin thing, depends on how you want to do stuff, but you do not need to create a separate plugin like that (maybe you do in case of a team working on it, clean code or whatever...), but within the project, you can simply create the plugin there and import it within the agent.

regarding, the character implementation, within the you can create your own character and within the plugin list import your plugin
soyrubio — 06/05/2025, 01:51
anyone to discuss how to appraoch building a terminal (web2 chat app) for elizaos? i know there is already a client but that is client-side rendered + has other minor issues/inconveniences. are there any premade plugins/clients for this, or any other repos already available for this specifically?
morlok — 06/05/2025, 01:57
yooo, where is recommeded to deploy a twitter agent to not get banned/flagged? I imagine that if it's some datacenter IP, twitter blocks them, right?
0xbbjoker — 06/05/2025, 02:02
https://fleek.xyz/troubleshooting/eliza/eliza-deployment-troubleshooting/#what-should-i-do-if-i-encounter-twitter-login-issues-or-failures-during-deployment
also I noticed if you login with VPN close to server usually works,
if that does not work then grab the cookies when you login close to server and add to .env,
YungYoda — 06/05/2025, 02:08
nah just code your own with the messaging api its quite simple.
YungYoda — 06/05/2025, 02:18
its one endpoint to send messages: https://docs.eliza.how/docs/rest/send-message
Send a message to an agent | eliza
Sends a message to an agent and receives a response
morlok — 06/05/2025, 02:32
I guess fleek is not a way to go with custom plugins right?
sayonara — 06/05/2025, 02:53
https://github.com/elizaOS/eliza-v2-nextjs-starter
GitHub
GitHub - elizaOS/eliza-v2-nextjs-starter: Eliza v2 Document Chat De...
Eliza v2 Document Chat Demo Built on Next.js. Contribute to elizaOS/eliza-v2-nextjs-starter development by creating an account on GitHub.
Eliza v2 Document Chat Demo Built on Next.js. Contribute to elizaOS/eliza-v2-nextjs-starter development by creating an account on GitHub.
soyrubio — 06/05/2025, 03:00
🔥 lfg thank you
0xbbjoker — 06/05/2025, 03:23
nope but it's a good explanation how can you troubleshoot the issue with twitter
[ai16z] <some_68286>
APP
 — 06/05/2025, 06:30
Hello everyone! I’m new here, and while this might have been asked before, I couldn’t find a clear answer, so I hope it’s okay if I ask again:

Is there a proxy plugin (or any recommended method) that would allow each Twitter client to use a different IP address locally? I’m looking for a way to run multiple Twitter agents, each with its own IP.
Is it possible to build a custom, lightweight set of plugins instead of installing the full Eliza client? For example, I’d like to combine only the Twitter plugin, SQLite plugin, OpenAI plugin, and (if it exists) a proxy plugin. What would be the best way to achieve this?,
,

I’d really appreciate any guidance or tips! Thanks in advance.
[ai16z] <boyaloxer>
APP
 — 06/05/2025, 08:43
Is this correct if using the defaultCharacter.ts?:

Plugin Configuration

Configure plugin settings in your character definition:

{
  "name": "MyAgent",
  "plugins": ["@Elizaos/plugin-example"],
  "settings": {
    "example": {
      "enableFeatureX": true
      // Plugin-specific configuration
    }
  }
}
lantianlaoli — 06/05/2025, 08:46
why do I call these api that don't get response?  project have been running
Image
Image
Image
[ai16z] <open24hrs.eth>
APP
 — 06/05/2025, 11:58
s
sayonara — 06/05/2025, 12:04
These are 1.x docs
boyaloxer — 06/05/2025, 12:09
Been messing with this for a while. Not sure what the format is supposed to be for plugins in the defaultCharacter.ts. I could probably fix it by rewriting a bunch of code but that doesn't seem to be intended.
sayonara — 06/05/2025, 12:13
Yes,
sayonara — 06/05/2025, 12:14
settings.example should be settings.secret I believe
boyaloxer — 06/05/2025, 12:14
Asking about "plugins" though
sayonara — 06/05/2025, 12:16
Seems correct for adding plugin
boyaloxer — 06/05/2025, 12:18
Image
boyaloxer — 06/05/2025, 12:19
Sorry, extra quotation there,
Image
sayonara — 06/05/2025, 12:20
Is this 0.x or 1.x
boyaloxer — 06/05/2025, 12:20
0.x
in v1 you'd just put Clients.Discord
sayonara — 06/05/2025, 12:23
Refer this

https://github.com/elizaOS/characters/blob/main/omniflix.character.json
GitHub
characters/omniflix.character.json at main · elizaOS/characters
Some character files you can use. Contribute to elizaOS/characters development by creating an account on GitHub.
Some character files you can use. Contribute to elizaOS/characters development by creating an account on GitHub.
sayonara — 06/05/2025, 12:24
Client need to be defined separately in 0.x
boyaloxer — 06/05/2025, 12:26
So the defaultCharacter.ts is depricated?
Because the whole layout of the defaultCharacter.ts is pretty far off from the character.json examples
sayonara — 06/05/2025, 13:47
No!
[ai16z] <kirsty_extropy>
APP
 — 06/05/2025, 14:14
Hey I'm getting a similar error and ran bun install, bun run build and bun run start, getting this error

error: No version matching "^0.25.6" found for specifier "@elizaos/plugin-sql" (but package exists)
error: @elizaos/plugin-sql@^0.25.6 failed to resolve
error: script "start" exited with code 1
@-MBP-2 eliza %

ai16z-bridge-odi
APP
 — 06/05/2025, 14:27
[ai16z] <kirsty_extropy> @sam-developer also ran the elizaos commands as per docs and getting this. Also copied the .env example from v1 incase I was missing something. On the chat settings the plugins are showing as installed. Also tried adding the openai api key on the chat settings

[2025-05-06 08:26:00] WARN: Failed to load plugin module '@elizaos/plugin-openai' using all available strategies.
[2025-05-06 08:26:00] INFO: Plugin @elizaos/plugin-openai not available, installing into /Users//Developer/Cerebra/eliza...
[2025-05-06 08:26:00] INFO: Installing plugin: @elizaos/plugin-openai
[2025-05-06 08:26:00] INFO: Prioritizing npm install for @elizaos/plugin-openai@1.0.0-beta.32
[2025-05-06 08:26:00] INFO: Attempting to install plugin :...
[2025-05-06 08:26:00] INFO: Attempting to install package: @elizaos/plugin-openai using bun
[0.34ms] ".env"
bun add v1.2.11 (cb6abd21)

installed @elizaos/plugin-openai@1.0.0-beta.32

[154.00ms] done
[2025-05-06 08:26:00] INFO: Successfully installed @elizaos/plugin-openai from npm registry.
[2025-05-06 08:26:00] INFO: Installation successful for @elizaos/plugin-openai, verifying import...
[2025-05-06 08:26:00] WARN: Failed to load plugin module '@elizaos/plugin-openai' using all available strategies.
[2025-05-06 08:26:00] WARN: Plugin @elizaos/plugin-openai installed : but could not be loaded/verified.
[2025-05-06 08:26:00] ERROR: All installation attempts failed for plugin @elizaos/plugin-openai
[2025-05-06 08:26:00] WARN: Failed to load plugin module '@elizaos/plugin-openai' using all available strategies.
[2025-05-06 08:26:00] ERROR: Failed to load plugin @elizaos/plugin-openai even after installation.
[2025-05-06 08:26:00] WARN: Failed to load or prepare plugin specified by name: @elizaos/plugin-openai
HG — 06/05/2025, 15:05
Hey, anyone know how I can make sure that nothing gets added to the memory by default when an action is triggered? eliza.how tells me that I can set "suppressMemoryUpdate" to true in the handler, but I dont think thats correct
sayonara — 06/05/2025, 15:11
what commands did you run before! can you share your elizaos version

elizaos --version
sayonara — 06/05/2025, 15:12
can you update your cli with npm i -g @elizaos/cli@beta
a4oya4o — 06/05/2025, 15:53
how do i make a character to use the packages/core/... config files that i have set
and do i need to add actions in order for the agent to process for example a semantic serach etc.
sam-developer — 06/05/2025, 16:01
I think you can simple create a character using cli on gui
when you run elizaos locally
sam-developer — 06/05/2025, 16:02
if you place things in knowledge folder , it will automatically do semantic search for it
⁠❓｜tech-support⁠ check this out for cli installation
a4oya4o — 06/05/2025, 16:04
i want to run it in prod, so basically what i am trying to do is to call and process my .env file in env.ts which is in packages/core. however if i start my character with pnpm, the character doesnt use my packages/core settings, so i am wondering how do i make the character use the settings and how the character can for example quote info on twitter.
I guess i will need an action for the information quoting on twitter, which i also dont know how to call trough my character
sam-developer — 06/05/2025, 16:06
using cli would be best option
you can deploy things on prod as well
cli supports twitter as well
a4oya4o — 06/05/2025, 16:07
im using 0.25.9 as the guides there are more comperhensive and detailed
not the 1 beta
sam-developer — 06/05/2025, 16:07
cool 👍
Engel — 06/05/2025, 17:55
I try to follow the Quickstart guide but i seen to get this error every time, anyone knows why?

message: "(Error) Database adapter not initialized. The SQL plugin (@elizaos/plugin-sql) is required for agent initialization. Please ensure it is included in your character configuration."
a4oya4o — 06/05/2025, 18:08
install bun with the npm install -g bun command and then try to manually install the plugin\
basically just install bun and it will automatically try to isntall the plugin with bun
sayonara — 06/05/2025, 18:09
try this ⁠❓｜tech-support⁠
Engel — 06/05/2025, 18:14
I have tried that a couple of times but it doesn’t work
sayonara — 06/05/2025, 18:15
what cli version are you using elizaos --version
Engel — 06/05/2025, 18:37
1.0.0-beta.43
sayonara — 06/05/2025, 18:46
pushing fix for this
Engel — 06/05/2025, 18:48
Nice! do you know why it happens?
sayonara — 06/05/2025, 18:50
try updating with npm i -g @elizaos/cli@beta
sayonara — 06/05/2025, 18:50
yes pushed fix for it
sayonara — 06/05/2025, 18:51
1.0.0-beta.45 has the fix
[ai16z] <shadows.13>
APP
 — 06/05/2025, 18:54
HI jus wanted to find out if Eliza V2 is working with twitter and custom plug ins?
also is there an official guide on best practice to add custom plug in retrieved data to memory? @shaw
Engel — 06/05/2025, 19:01
Amazing, works now! Thanks
Scooter — 06/05/2025, 20:14
If we want all messages stored to postgresSQL how to get around duplicate key constraint?
0xbbjoker — 06/05/2025, 20:17
could you elaborate pls?
Scooter — 06/05/2025, 20:18
Seems the sql plugin sets up the databse to store memory of unique messages rather than all messages from a given user/identity
So mesages with the same content get converted to keys that are duplicates
and because of the unique constraint set by the plugin logic the duplicate is rejected
But I basically want to store full comment logs
0xbbjoker — 06/05/2025, 20:21
Can you give me the exact constraint error that you see?

you storing to log table if I understood correctly?

so I suppose it's because of entity or room constraint not duplicated content?
Scooter — 06/05/2025, 20:26
message: "(error) duplicate key value violates unique constraint "memories_pkey""
    stack: [
      "error: duplicate key value violates unique constraint "memories_pkey"",
yes storing to a cloud hosted database
0xbbjoker — 06/05/2025, 20:45
Can you show more logs and the code that causes this?
[ai16z] <OpenRouter #announcemen
APP
 — 06/05/2025, 21:01
🚀  The new Google Gemini 2.5 Pro Preview snapshot is live now

You can continue using the same model slug as before, but we also updated it to remove the date from the name and updated the endpoints to specificaly point to the new date on Vertex and AI Studio. Check out the tweet from Google: https://x.com/OfficialLoganK/status/1919770687167684808

And try the model out now! https://openrouter.ai/google/gemini-2.5-pro-preview
Logan Kilpatrick (@OfficialLoganK) on X
Gemini 2.5 Pro just got an upgrade & is now even better at coding, with significant gains in front-end web dev, editing, and transformation.

We also fixed a bunch of function calling issues that folks have been reporting, it should now be much more reliable. More details in 🧵
Logan Kilpatrick (@OfficialLoganK) on X

X•06/05/2025, 20:36
Gemini 2.5 Pro Preview - API, Providers, Stats
Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. Run Gemini 2.5 Pro Preview with API
Gemini 2.5 Pro Preview - API, Providers, Stats
0xbbjoker — 06/05/2025, 21:17
I suppose your issue is because you are creating same id for memory twice. But can't be sure without more logs. I wanna see what does it call and from where.
Scooter — 06/05/2025, 21:48
I think so too.  I have created some custom workflows and they are both attempting to send the same message id to the database pretty sure.
Isnt breaking anything but the terminal logs are pretty annoying lol
0xbbjoker — 06/05/2025, 22:01
try to setup the workflow so it handles the ID properly. Make sure it always create diff ID or just leave it without ID
DeFine — 06/05/2025, 22:06
hello, is there any way to bypass the first db prompt(pglite or db) when you initially run bun run dev?
edit: nvm i used  echo -e '\n' to simulate pressing enter and it worked, great for docker compose initialization setups if anyone needs that
0xbbjoker — 06/05/2025, 22:19
yes if you setup the PGLITE_DATA_DIR in .env before you start or POSTGRES_URL depn on what DB you choose
DeFine — 06/05/2025, 22:26
thanks @0xbbjoker
[ai16z] <hachemdznn>
APP
 — 06/05/2025, 23:31
Hi
[ai16z] <OpenRouter #announcemen
APP
 — 06/05/2025, 23:47
New features, in addition to the new Gemini 2.5 Pro ^:

📊  Enhanced Activity Page,
    •    Dive deeper into model usage with multiple new charts.
    •    Check your personalized model rankings by clicking on one!

⚡  Improved Reasoning Model Perf Metrics,
    •    Latency for reasoning models now measures the time until the first reasoning token.
    •    Throughput metrics now include both reasoning and output tokens.

🛠️  For Developers:,
    •    New Request Builder: Easily generate request body JSON and understand requests better—try it here: https://openrouter.ai/request-builder
    •    Prompt Category API: Request models optimized for specific prompt categories directly!
    •    Example (Programming models): https://openrouter.ai/api/v1/models?category=programming
    •    Explore all available categories via the sidebar at https://openrouter.ai/models

@everyone
IMG_5103.png
IMG_5099.png
OpenRouter
OpenRouter
The unified interface for LLMs. Find the best models & prices for your prompts
OpenRouter
OpenRouter
Models | OpenRouter
Browse models on OpenRouter
Models | OpenRouter
Image
Image
Scooter — 07/05/2025, 00:20
I was just forgetting to kill eliza instances turns out lol
alerios — 07/05/2025, 00:54
Hi guys, sorry if this is a FAQ:  I'm getting duplicate processing of the requests in both the localhost UI and the telegram client, It started to happened when I tried to upgrade from 1.0.0-beta.37 to 1.0.0-beta.41 and I reverted. How can I debug if I'm loading something twice or how can I reset the agents/plugins I use to test without wiping up the PGLite DB? thanks
Tom — 07/05/2025, 01:15
Hello, I have extensive experience in developing AI agents and bots. My skills include:

✅ Social Media Agents: Twitter, Telegram, Discord, and more.
✅ Voice Agents: WebRTC, VoIP, and Telephony.
✅ Crypto Trading Agents: Solana, Ethereum, and Hyperliquid.

Please feel free to DM me if anyone is in need of a developer.
bob_the_spounge — 07/05/2025, 01:49
Has someone been able to run Eliza with lmstudio or ollama?
[ai16z] <mtbc_69795>
APP
 — 07/05/2025, 01:53
I ran 1.x with ollama just fine, just a case of setting the right .env and telling the character which model, etc.
bob_the_spounge — 07/05/2025, 01:55
i am attempting to follow the quickstart on ubuntu but i end up breaking everything. it fails from the beginning:
npm install -g @Elizaos/cli@beta
npm error code EACCES
npm error syscall mkdir
npm error path /usr/lib/node_modules/@Elizaos
npm error errno -13
npm error Error: EACCES: permission denied, mkdir '/usr/lib/node_modules/@Elizaos'
npm error     at async mkdir (node:internal/fs/promises:853:10)
npm error     at async /usr/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:624:20
npm error     at async Promise.allSettled (index 0)
npm error     at async [reifyPackages] (/usr/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:325:11)
npm error     at async Arborist.reify (/usr/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:142:5)
npm error     at async Install.exec (/usr/lib/node_modules/npm/lib/commands/install.js:150:5)
npm error     at async Npm.exec (/usr/lib/node_modules/npm/lib/npm.js:207:9)
npm error     at async module.exports (/usr/lib/node_modules/npm/lib/cli/entry.js:74:5) {
npm error   errno: -13,
npm error   code: 'EACCES',
npm error   syscall: 'mkdir',
npm error   path: '/usr/lib/node_modules/@Elizaos'
npm error }
npm error
npm error The operation was rejected by your operating system.
npm error It is likely you do not have the permissions to access this file as the current user
npm error
npm error If you believe this might be a permissions issue, please double-check the
npm error permissions of the file and its containing directories, or try running
npm error the command again as root/Administrator.
npm notice
npm notice New major version of npm available! 10.9.2 -> 11.3.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.3.0
npm notice To update run: npm install -g npm@11.3.0
npm notice
npm error A complete log of this run can be found in: /home/user/.npm/_logs/2025-05-06T20_23_46_192Z-debug-0.log
GitHub
Release v11.3.0 · npm/cli
11.3.0 (2025-04-08)
Features

b306d25 #8129 add node-gyp as actual config (@wraithgar)

Bug Fixes

2f5392a #8135 make npm run autocomplete work with workspaces (#8135) (@terrainvidia)

Documentatio...
11.3.0 (2025-04-08)
Features

b306d25 #8129 add node-gyp as actual config (@wraithgar)

Bug Fixes

2f5392a #8135 make npm run autocomplete work with workspaces (#8135) (@terrainvidia)

Documentatio...
then i attempt to find turnaround, struggle with bun etc
0xbbjoker — 07/05/2025, 02:28
can you please send the logs for duplicated request?

you can run in debug mode: LOG_LEVEL=debug elizaos start

I would need a bit more context to help you with the issue? maybe if you can run and show me the logs?
0xbbjoker — 07/05/2025, 02:29
yes ollama
0xbbjoker — 07/05/2025, 02:29
can you try elizaos --version and then also which elizaos and show me the logs?
bob_the_spounge — 07/05/2025, 02:37
elizaos --version
1.0.0-beta.45
which elizaos
/home/user/.nvm/versions/node/v24.0.0/bin/elizaos
0xbbjoker — 07/05/2025, 02:40
so you have the CLI installed

you can do elizaos start
bob_the_spounge — 07/05/2025, 02:45
[2025-05-06 2154] INFO: Successfully installed @Elizaos/plugin-bootstrap from npm registry.
[elizaos] Resolved .env file from: /home/user/test/.env
[2025-05-06 2154] INFO: Initializing character
Warning: Example plugin variable is not provided
[2025-05-06 2154] INFO: Installation successful for @Elizaos/plugin-bootstrap, verifying import...
[2025-05-06 2154] WARN: Failed to load plugin module '@Elizaos/plugin-bootstrap': Cannot find package '@Elizaos/plugin-bootstrap' imported from /home/user/.nvm/versions/node/v24.0.0/lib/node_modules/@elizaos/cli/dist/chunk-37ODWVII.js
[2025-05-06 2154] WARN: Plugin @Elizaos/plugin-bootstrap installed : but could not be loaded/verified.
[2025-05-06 2154] ERROR: All installation attempts failed for plugin @Elizaos/plugin-bootstrap
[2025-05-06 2154] WARN: Failed to load plugin module '@Elizaos/plugin-bootstrap': Cannot find package '@Elizaos/plugin-bootstrap' imported from /home/user/.nvm/versions/node/v24.0.0/lib/node_modules/@elizaos/cli/dist/chunk-37ODWVII.js
[2025-05-06 2154] ERROR: Failed to load plugin @Elizaos/plugin-bootstrap even after installation.
[2025-05-06 2154] WARN: Failed to load or prepare plugin specified by name: @Elizaos/plugin-bootstrap
[2025-05-06 2154] INFO: iInstrumentation Service configured as disabled.
[2025-05-06 2154] WARN: [AgentRuntime][Eliza] No TEXT_EMBEDDING model registered. Skipping embedding dimension setup.
    agentName: "Eliza"
    agentId: "b850bc30-45f8-0041-a00a-83df46d8555d"
[2025-05-06 21:54] INFO: Name:  Eliza
[2025-05-06 21:54] INFO:  Initializing starter plugin
[2025-05-06 21:54] INFO:  Starting starter service
I have installee npm with nvm on Ubuntu but it seems the plugins are not accessible while installed
0xbbjoker — 07/05/2025, 02:57
did you created project with elizaos create before this or just elizaos start after the installation?
kandizzy — 07/05/2025, 03:16
I just had this problem, but on MacOS, if I tried to run my project with elizaos start after installing the cli with npm i -g @elizaos/cli@beta, the plugins fail to load. But they do load if I use npx elizaos start
alerios — 07/05/2025, 03:29
Hi, here's an example where I'm getting the same response to the action [FETCH_VAULT_LIST] twice, thanks!
vaulter-agent$ LOG_LEVEL=debug elizaos start

⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⠀⠙⠛⠿⢤⣦⣐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣐⣿⣿⢰⡀⠀⠀⠀⠈⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠤⠾⠛⠛⣿⣶⣇⠀⠀⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢰⣋⡳⡄⠀⠀⠀⢨⣭⡀⠀⡤⠀⣀⣝⢿⣶⣿⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀... (223 KB left)
Expand
vaulter-full-log-duplicate-response.txt
273 KB
0xbbjoker — 07/05/2025, 04:09
It's really hard for me to tell what is happening here. I see you have lot of custom actions. Not sure how did you setup your flow. I don't see in the logs that actions is being called twice for REPLY.
ai16z-bridge-odi
APP
 — 07/05/2025, 04:11
[ai16z] <some_68286> Apologies if these questions seem basic — they’re still relevant and important to me as I try to understand the topic better. For the record, both v1 and v2 are suitable for my use case
alerios — 07/05/2025, 04:16
that's ok, can you at least tell me how can I clear the cache and db, and start fresh keeping my existing code and dependency versions?
0xbbjoker — 07/05/2025, 04:18
rm -rf /.eliza/db

but this will drop your data in db as well and you'll start from fresh
it's here for you: /home/alerios/.eliza/db
alerios — 07/05/2025, 04:19
cool, let me try that, thanks
Dark Cobra — 07/05/2025, 05:24
Hi guys i am having this issue where i have created an x agent and everything seems to be initialised properly and the agent is logging in too but its not posting anything at all dry run is set to false post immediately is true and i have min and max for post and also poll intervals at 120


here are the logs:
cobra@DESKTOP-R4GKMH3:~$ LOG_LEVEL=debug elizaos start
[2025-05-06 23:53:52] DEBUG: [UserEnvironment] Gathering environment information for directory: cwd
[2025-05-06 23:53:52] DEBUG: [UserEnvironment] Detecting OS information
[2025-05-06 23:53:52] DEBUG: [UserEnvironment] Getting CLI information
[2025-05-06 23:53:52] DEBUG: [UserEnvironment] Detecting package manager
[2025-05-06 23:53:52] DEBUG: [UserEnvironment] Checking for lock files in: /home/cobra
Expand
message.txt
36 KB
alerios — 07/05/2025, 05:26
having a closer look at the debug output, what I'm observing is that after Eliza builds the object from messageHandlerTemplate, it returns on "actions": ["FETCH_VAULT_LIST", "REPLY"], and a "message". Then it executes my FETCH_VAULT_LIST, and after that it also executes the REPLY action with the "message", so the user gets both. I made a quick test with a simple HELLO_WORLD action from the sample plugin, and it doesn't return the REPLY action, any thoughts? thanks!

Dark Cobra — 07/05/2025, 05:31
wondering if thats linked to [2025-05-06 23:53:56] ERROR: Error saving configuration: TypeError: fs4.exists is not a function at all
0xbbjoker — 07/05/2025, 05:33
Hmm I haven't tried X agent with local-ai plugin. Unless you did setup for some custom models?
0xbbjoker — 07/05/2025, 05:35
Not sure really I would add more logs to see why. Also I am not sure where did you added actions and how? Maybe you could change template for prompt so that agent is aware that it does not need to call both FETCH_VAULT_LIST & REPLY
Dark Cobra — 07/05/2025, 05:36
i am using
Image
open ai
0xbbjoker — 07/05/2025, 05:40
okay sorry I see now you have two agents, I was looking into logs that you shared.

hmm do you have TWITTER_ENABLE_POST_GENERATION=true  setup in your .env?
Dark Cobra — 07/05/2025, 05:43
yess
Scooter — 07/05/2025, 05:45
Getting service instrumentation not found in runtime errors.  Not breaking anything but is this from not registering my custom services with Eliza properly?
0xbbjoker — 07/05/2025, 05:55
I am running Twitter with these .envs

TWITTER_USERNAME=user-name
TWITTER_PASSWORD=pass
TWITTER_EMAIL=email
TWITTER_ENABLE_POST_GENERATION=true
TWITTER_POST_INTERVAL_MIN=1
TWITTER_POST_INTERVAL_MAX=2


not sure how did you setup and why it doesn't post.

I have this simple example: https://www.youtube.com/watch?v=-4sp4ZncMWc&t=8s

if that helps
Dark Cobra — 07/05/2025, 05:56
i just created the agent through the dashboard
i set up new ubuntu distro installed nvm and required node and then i got unzip and bun and then i did install eliza and then eliza start
ill try again with the video thanks for the resource
Scooter — 07/05/2025, 08:40
Did you ever get this "Service instrumentation not found in runtime" error figured out? Having the same issue. Thinking I'm not registering my service extension in the way eliza expects.
[ai16z] <rferrari>
APP
 — 07/05/2025, 09:18
Hi Devs,

i just cloned the eliza and installed few plugins using npx eliza pluigns add ....
including client-twitter.

all plugins (discord, farcaster, and others) are running ok so far, but twitter, i got this error:

Failed to import plugin: @elizaos-plugins/client-twitter Error: Cannot find package '@elizaos-plugins/client-twitter'


i checked the agent/node_modules, and all plugins and clients are there, except for twitter.

some clue on that?

already hit pnpm clean, rm node_modules and install build all over again and could not make it find client-twitter package...
Thanh — 07/05/2025, 10:40
Image
I got this error when run elizaos create, using beta 45
Tried with other beta version, same issues
sayonara — 07/05/2025, 11:00
can you share more logs to help us figure this
Thanh — 07/05/2025, 11:01
How to get more log for this?
sayonara — 07/05/2025, 11:02
LOG_LEVEL=debug before the command e.g. LOG_LEVEL=debug elizaos create
sayonara — 07/05/2025, 11:05
do you have bun installed btw?
Thanh — 07/05/2025, 11:05
oh not yet, is it required for elizaos cli?
sayonara — 07/05/2025, 11:07
yes
Thanh — 07/05/2025, 11:07
Oh it works after install bun
Lets me try again
sayonara — 07/05/2025, 12:19
were you able to run the agent
Thanh — 07/05/2025, 12:21
Yeah. It is running now. Bun install should be included in Prerequisites
sayonara — 07/05/2025, 12:29
DMing you to get more details
a4oya4o — 07/05/2025, 13:27
generating wallets is not a defined command for actions, i will need a separate script, so my next question is in which file do i call the script? is it in the main index.ts file whch is in the src folder of my project?
bob_the_spounge — 07/05/2025, 17:03
hi!
i am attempting to run eliza with LMStudio but when i attempt to chat with the agent over the GUI, nothing happens:
[node-llama-cpp] load: special_eos_id is not in special_eog_ids - the tokenizer config may be incorrect
[2025-05-07 11:26:48] USERLVL: Model initialization complete for large model
[2025-05-07 11:30:55] DEBUG: Entity created successfully:
    entity: {
      "id": "59f547ec-827f-0e30-a9df-5f43fc8df3ec",
      "names": [
        "user",
        "user"
      ],
      "metadata": {
        "client_chat": {
          "name": "user",
          "userName": "user"
        }
      },
      "agentId": "b850bc30-45f8-0041-a00a-83df46d8555d"
    }
[2025-05-07 11:30:55] INFO: MESSAGE_RECEIVED event received
[2025-05-07 11:30:55] INFO:
    0: "runtime"
    1: "message"
    2: "callback"
    3: "onComplete"
this is my .env:
LOG_LEVEL=debug

Local AI Configuration,
USE_LOCAL_AI=true
USE_STUDIOLM_TEXT_MODELS=true
STUDIOLM_SERVER_URL=http://127.0.0.1:1234/
STUDIOLM_SMALL_MODEL=qwen3-1.7b
STUDIOLM_MEDIUM_MODEL=qwen3-1.7b
STUDIOLM_EMBEDDING_MODEL=text-embedding-nomic-embed-text-v1.5
Tiki — 07/05/2025, 17:26
Is there a way to have a login page on the client?
sam-developer — 07/05/2025, 18:18
@a4oya4o what's your node version
a4oya4o — 07/05/2025, 18:26
v20.18.0
Eli — 07/05/2025, 18:31
Hi guyz, do you know any good tutorial to run the agent and get an answer on this new v1 beta. Seems like it's a mess from the creation of the project, to get it working. Just trying to run eliza with ollama models in local. Can't get answers from the agent
0xCardiE — 07/05/2025, 19:45
wondering what would be a way to use elizaOS for spining many different agents, like per user agent. meaning a user logs in to a site and he gets access to agent, another users does the same and he gets different elizaOS sessions.    Is the platform suitable for this kind of modification?
Nisita — 07/05/2025, 20:04
If you are using it on your local machine with ollama, this might help

⁠💬｜general⁠
Scooter — 07/05/2025, 20:55
Where can we find the most up to date documentation for the cli ?
Odilitime — 07/05/2025, 21:11
The cli help?
Odilitime — 07/05/2025, 21:12
There is no log in system yet, but one could build it. I have one instance that’s running 500 agents, we just have some frontend glue that controls who has what access to which agent
[ai16z] <OpenRouter #announcemen
APP
 — 07/05/2025, 21:12
A screencast of more activity page features, with Export coming soon!
https://x.com/OpenRouterAI/status/1920141911928488305
OpenRouter (@OpenRouterAI) on X
New features this week on the Activity page ✨

1. Personal model leaderboards
2. More charts
3. Better table rows
4. Better cost breakdowns
5. (soon) Activity export!
OpenRouter (@OpenRouterAI) on X

X•07/05/2025, 21:11
0xCardiE — 07/05/2025, 21:15
trying to wrap my head around this, how could i expose some api for each agent i spin for different user?
Odilitime — 07/05/2025, 21:19
We use a private network, locked down so only our frontend app can talk/change settings on elizaOS
Using the elizaOS rest api (client-direct on 0.x)
[ai16z] <Rick>
APP
 — 07/05/2025, 21:45
🐦 shared by @jin tweet from Docker 🕑 18h ago

Docker (@Docker)
We’ve been YOLO-ing MCP tools: raw credentials, zero isolation, no provenance checks. 🎆
︀︀
︀︀Docker’s new MCP Catalog & Toolkit helps fix that—by wrapping MCP servers in containers. Reproducible. Secure. Runnable without burning your house down.
︀︀
︀︀🔗 bit.ly/4kbSPRX

💬 2 ❤️ 11 👁️ 5.6K 

FxTwitter•07/05/2025, 02:48
[ai16z] <dankvr>
APP
 — 07/05/2025, 21:45
https://www.docker.com/blog/whats-next-for-mcp-security/
Docker
Justin Cormack
What’s Next for MCP Security? | Docker
Learn about the new challenges of MCP security, where many current MCP tools fall short, and how containers help maintain best practices.
Securing Model Context Protocol: Safer Agentic AI with Containers
interesting post
https://www.docker.com/blog/announcing-docker-mcp-catalog-and-toolkit-beta/
Docker
Jean-Laurent de Morlhon
Introducing Docker MCP Catalog and Toolkit: The Simple and Secure W...
With the Docker MCP Catalog and Toolkit, you can easily discover tools and connect with your favorite MCP clients.
Introducing Docker MCP Catalog and Toolkit: The Simple and Secure Way to Power AI Agents with MCP
Dark Cobra — 07/05/2025, 22:00
i am getting this error now with the x agent

5-05-07 16:28:09] INFO:  Starting starter service
[2025-05-07 16:28:09] INFO: Created Twitter client for b850bc30-45f8-0041-a00a-83df46d8555d
[2025-05-07 16:29:09] INFO: Generating new post...
[2025-05-07 16:29:09] INFO: No settings state found for server 1919679766413627392
[2025-05-07 16:29:09] WARN: [getTracer] Service instrumentation not found in runtime.
[2025-05-07 16:29:12] WARN: [getTracer] Service instrumentation not found in runtime.
{"level":40,"time":1746635352817,"pid":6098,"hostname":"DESKTOP-R4GKMH3","msg":"Could not find XML block in text"}
[2025-05-07 16:29:12] ERROR: Failed to parse XML response for post creation. Raw response: IGNORE
Odilitime — 07/05/2025, 22:03
What LLM model are you using?
XML is weird, twitter doesn't use XML iirc
is this 0.x or 1.x? thjs is 1.x
sam-developer — 07/05/2025, 22:05
you need to upgrade your node version then it will work smooth
v23.11.0

this is my node version
Dark Cobra — 07/05/2025, 22:05
open ai and i also keep seeing [2025-05-07 16:34:50] WARN: [getTracer] Service instrumentation not found in runtime.
adrianodelvoux — 07/05/2025, 22:06
Hey guys, I'm testing the Twitter integration, but the agent isn't replying in the main thread — it's responding directly to my reply instead. Does anyone know how I can change this behavior?

Dark Cobra — 07/05/2025, 22:06
not using local ai
sam-developer — 07/05/2025, 22:07
the api for it is automatically created
@0xCardiE i have dmed you api list
Odilitime — 07/05/2025, 22:09
that's normal for 1.x
Odilitime — 07/05/2025, 22:10
not sure what you mean? It replies to your reply but what's the main thread?
Dark Cobra — 07/05/2025, 22:10
ama try again from scratch
[ai16z] <OpenRouter #announcemen
APP
 — 07/05/2025, 22:22
Excited to announce a ludicrous-speed provider: Cerebras! ⚡,
3k+ TPS on Llama 4 Scout,
1.8k+ TPS on Llama 3.3 70B Instruct,

Watch it instantly generate an animation for ~$0.001.

➡️ Cerebras chips are the largest ever built, packed with up to 4 trillion transistors on a single wafer, and massive on-chip memory: 40 GB per wafer, eliminating bottlenecks from external memory.

 More info: https://x.com/OpenRouterAI/status/1920157813306806371 @here
cerebras.mp4
sayonara — 07/05/2025, 22:45
we have a way to set API key for server with env https://github.com/elizaOS/eliza/blob/v2-develop/packages/cli/src/server/authMiddleware.ts
but its very primitive (asks for same api key / auth variable on frontend)
but you can do middleware and advance customisation as your need
Scooter — 07/05/2025, 22:46
having the same issue!
sayonara — 07/05/2025, 22:47
its not an issue just a warning; we can suppress to debug level if its annoying to all
then it will show only when LOG_LEVEL=debug is set
Scooter — 07/05/2025, 22:48
is this from extending services with custom code?
sayonara — 07/05/2025, 22:49
nah its for if you wanna setup telemetry for your server
Scooter — 07/05/2025, 22:49
understood thank you
Has anyone tried implementing an interval posting discord messages similar to the twitter set up?    Having trouble setting that up.  Guessing I need to extend the discord plugin?
not seeing anything in the plugin that would let me do that natively
Odilitime — 07/05/2025, 23:11
I haven’t seen that yet but should be pretty easy to do from a code perspective
Odilitime — 07/05/2025, 23:11
Yea you’d have to add it
Dark Cobra — 08/05/2025, 00:24
yo i have tried again from scrath i am still facing the same issue where its failing to parse xml response should i try deepseek or some other llm
same issue when using anthropic
[2025-05-07 19:00:10] WARN: [AgentRuntime][LinkedOut Teaser Bot] No TEXT_EMBEDDING model registered. Skipping embedding dimension setup.
    agentName: "LinkedOut Teaser Bot"
    agentId: "cf520981-e0bc-0b03-b2c5-a317f1282d61"
[2025-05-07 19:00:11] INFO: Successfully logged in.
[2025-05-07 19:00:11] INFO: Emitted WORLD_JOINED event for Twitter account LinkedOutCoin
✓ Agent LinkedOut Teaser Bot started successfully!
Expand
message.txt
5 KB
Odilitime — 08/05/2025, 00:45
I can't find this error in our code "Could not find XML block in text"
Odilitime — 08/05/2025, 00:47
well if you're using an LLM to generate XML, then trying a different model could help
Dark Cobra — 08/05/2025, 00:55
It’s just for x I haven’t change any other settings just did elizaos create and made an x agent through dashboard I don’t even know the xml part
[ai16z] <dankvr>
APP
 — 08/05/2025, 00:59
im reverting the AI docs RAG agent
its hallucinating and overall needs more refinement before production usage
apologies for confusion
[ai16z] <odilitime>
APP
 — 08/05/2025, 01:02
frustrating we're still fighting that
[ai16z] <dankvr>
APP
 — 08/05/2025, 01:18
AI needa update knowledge from trusted sources like a parent to a child
[ai16z] <dankvr>
APP
 — 08/05/2025, 01:36
anyone here into data analysis / visualization?
sayonara — 08/05/2025, 02:00
ChatGPT?
0xCardiE — 08/05/2025, 04:52
this is for v2?
Odilitime — 08/05/2025, 05:46
I think so
[ai16z] <cjft>
APP
 — 08/05/2025, 05:46
https://vercel.com/changelog/mcp-server-support-on-vercel
Vercel
MCP server support on Vercel - Vercel
Run MCP servers on with Next.js or Node.js in your Vercel project with 1st class support for Anthropic's MCP SDK
MCP server support on Vercel - Vercel
MCPs on next.js now a default API type, lolz rip hoster startups
Dark Cobra — 08/05/2025, 08:03
are the post interval variables for twitter plugin still in mins
Odilitime — 08/05/2025, 08:07
https://github.com/elizaos-plugins/client-twitter/blob/46de4f98a9e88a2fa3591d1c912657bbf2f86b30/src/environment.ts#L185
seems like it
shaw — 08/05/2025, 09:41
3k tps jesus
sam-developer — 08/05/2025, 11:53
Yes
[ai16z] <keygray_mm>
APP
 — 08/05/2025, 12:48
Does anyone know which version of Eliza is currently working best?
i want run a agent with twitter
sam-developer — 08/05/2025, 12:51
the latest version would be good
[ai16z] <keygray_mm>
APP
 — 08/05/2025, 13:00
i dont know how to add plugin twitter to character
Stan ⚡ — 08/05/2025, 13:02
https://docs.eliza.how/blog/twitter-agent-guide
sam-developer — 08/05/2025, 13:04
it will automatically get added once you install cli , create a new project and add your twitter creds

mainly these
TWITTER_USERNAME=
TWITTER_PASSWORD=
TWITTER_EMAIL=
TWITTER_ENABLE_POST_GENERATION=

sayonara — 08/05/2025, 13:35
https://eliza.how/blog/twitter-agent-guide
Setting Up Your Own Twitter Agent with ElizaOS | eliza
Deploy a customized AI agent on Twitter
ThunderRonin — 08/05/2025, 15:21
im attempting to build docker image of v1.0.0 beta 48, eliza always falls back to using local ai plugin even though i removed it from the agent via control planel and also overridden every true instance of USE_LOCAL_AI that i could find. i use groq as an ai provider, i have correctly set the api keys and specified models for each size category. still no luck, eliza falls back to local no matter what. any help would be appreciated
Startup successful!
Go to the dashboard at http://localhost:3000
AgentServer is listening on port 3000
[elizaos] Resolved .env file from: /app/.env
[2025-05-08 09:35:06] INFO: 📊 Instrumentation Service configured as disabled.
[2025-05-08 09:35:59] INFO: Validating environment configuration...
[2025-05-08 09:35:59] INFO: Validating model configuration with values:
    USE_LOCAL_AI: false
    USE_STUDIOLM_TEXT_MODELS: false
[2025-05-08 09:35:59] INFO: Setting USE_LOCAL_AI to false as per configuration
[2025-05-08 09:35:59] INFO: Configuration is valid
[2025-05-08 09:35:59] INFO: Environment configuration validated
[2025-05-08 09:35:59] INFO: Starting local model download...
[2025-05-08 09:35:59] INFO: Attempting model download:
    description: "LFS URL with GGUF suffix"
    url: "https://huggingface.co/ChristianAzinn/bge-small-en-v1.5-gguf/resolve/main/bge-small-en-v1.5.Q4_K_M.gguf?download=true"
[2025-05-08 09:35:59] INFO: Starting download to: /root/.eliza/models/bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-08 09:36:00] INFO: Starting download to: /root/.eliza/models/bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-08 09:36:01] INFO: Downloading bge-small-en-v1.5.Q4_K_M.gguf: ▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱▱ 0%
sayonara — 08/05/2025, 15:38
where did you set the .env


You can use heurist
It’s free
ai16z-bridge-odi
APP
 — 08/05/2025, 21:45
[ai16z] <maheepatel09> ok trying it right now.
sam-developer — 08/05/2025, 21:45
just put your twitter creds in env,
your twitter agent will start working
⁠❓｜tech-support⁠
ai16z-bridge-odi
APP
 — 08/05/2025, 21:49
[ai16z] <maheepatel09> i don't have access to this  how do i get access. or can you provide detials
funboy — 08/05/2025, 21:49
@shaw when/if you have a minute, would you like to test my fist interactive 24/7 unreal engine elizaOS metahuman ? https://x.com/AIRewardrop/status/1920510027632177276
we are in 0.1.9 now, we will go forward to V2 and try update/push our multistream-client and air3market-plugin
AIR3 Agent (@AIRewardrop) on X
AIR3 Agent By AIRewardrop first 24/7 LiveStream Market Insight Channel https://t.co/GLdNevRxXA

X•08/05/2025, 21:34
Kenk — 08/05/2025, 22:47
would you be up for demo'ing this?
[ai16z] <lockedin.augusto>
APP
 — 08/05/2025, 22:48
how to get started guys
sam-developer — 08/05/2025, 22:50
Its your twitter details
sam-developer — 08/05/2025, 22:51
check this out to get started https://eliza.how/
eliza | eliza
Flexible, scalable AI agents for everyone
[ai16z] <avf00>
APP
 — 08/05/2025, 23:05
https://voideditor.com/
Void
Void is an open source Cursor alternative. Full privacy. Fully-featured.
Void
interesting project
0xbbjoker — 09/05/2025, 03:54
are you running in debug mode?
[ai16z] <OpenRouter #announcemen
APP
 — 09/05/2025, 06:45
🔥  Gemini 2.5 Pro Implicit Caching is live now!,
We now have full support for Gemini 2.5 models implicit caching. It works like OpenAI's automatic caching, without any cache breakpoints.

You can view caching discounts in the activity feed, or in the usage chunks when you use our usage parameter

Read more from Logan: https://x.com/OfficialLoganK/status/1920523026551955512
Logan Kilpatrick (@OfficialLoganK) on X
We just shipped implicit caching in the Gemini API, automatically enabling a 75% cost savings with the Gemini 2.5 models when your request hits a cache 🚢

We also lowered the min token required to hit caches to 1K on 2.5 Flash and 2K on 2.5 Pro!

X•08/05/2025, 22:25
[ai16z] <bowtiedbluefin>
APP
 — 09/05/2025, 06:48
has anyone had success importing a plugin into eliza, and being able to see it in the plugins tab in the UI on a local build. I was asked to move the plugin to the new plugin registry (rather than the core eliza repo) and import it in the package.json file in eliza....and that works properly, but the UI will not pick it up
[ai16z] <bowtiedbluefin>
APP
 — 09/05/2025, 07:33
@Odilitime Claude gave me this response for my issue. You requested that I move out of the registry and into my own, and I'm seeing this problem. Can you help confirm:

ElizaOS Plugin Resolution Issue: GitHub Repository Organization Constraints
After a detailed analysis of the ElizaOS codebase, I've identified a specific issue with how ElizaOS resolves and loads plugins that aren't in the official elizaos-plugins organization.
The Problem
ElizaOS has hardcoded assumptions about plugin repository locations. When it fails to find a plugin in the npm registry, it attempts to resolve it via GitHub, but makes critical assumptions about the repository structure:
In the file eliza/packages/cli/src/utils/registry/index.ts, plugins are resolved through the getPluginRepository function:
Apply to index.ts
}
The DEFAULT_REGISTRY only contains official ElizaOS plugins:
Apply to index.ts
;
When a plugin is needed, ElizaOS tries to install it using npm first:
Apply to index.ts
404
After npm fails, it should try GitHub, but due to the way it builds repository URLs it's likely looking for:
Apply to index.ts
morpheus
instead of
Apply to index.ts
morpheus
The Root Issue
The core problem is that ElizaOS doesn't correctly parse and use the GitHub URL format from package.json. When you specify:
Apply to index.ts
"
ElizaOS is ignoring the "github:bowtiedbluefin/plugin-morpheus" part and trying to resolve "@elizaos/plugin-morpheus" through its standard resolution process, which assumes plugins are in the official registry.
Contradictory Requirements
There appears to be a contradiction between:
The ElizaOS documentation showing examples using github:elizaos-plugins/plugin-example
The request to NOT put your code in the elizaos-plugins registry and host through your own GitHub account
ElizaOS's current implementation doesn't fully support the second option due to hardcoded assumptions about repository paths.
Potential Solutions
Fix for ElizaOS: They need to modify their plugin resolution logic in getPluginRepository and related functions to properly handle GitHub URLs from package.json, particularly for plugins outside the elizaos-plugins organization.

I've proven this by also trying with another plugin currently within your plugin registry that pulls from github outside of the registry. It also failed to load that plugin. Additionally, I was able to implement a fix to get the plugin to show in the UI, but  it required me to add to eliza/packages/client/src/hooks/use-plugins.ts in addition to the package.json of "the-org" and the top level.
ai16z-bridge-odi
APP
 — 09/05/2025, 07:36
[ai16z] <odilitime> do you have a PR on https://github.com/elizaos-plugins/registry/pulls ?
GitHub
Pull requests · elizaos-plugins/registry
JSON Registry for all the plugins in the elizaOS ecosystem - Pull requests · elizaos-plugins/registry
Pull requests · elizaos-plugins/registry
[ai16z] <bowtiedbluefin>
APP
 — 09/05/2025, 07:37
I didn't want to add into that index.json until I was confident it was working properly via testing. Did I misinterpret and it's actually pulling from that index.json file? Would love that to be my error

Edit: This can't be the issue because I also used a plugin from within the registry and it still didn't pull properly
(Side note: Tough situation because in this mechanism you wouldn't be able to test prior to PR)
ai16z-bridge-odi
APP
 — 09/05/2025, 07:42
[ai16z] <odilitime> yea the plugin lists pulls from the registry
[ai16z] <bowtiedbluefin>
APP
 — 09/05/2025, 07:43
Enso was the example I tried as a secondary proof point, which is in the registry (https://github.com/elizaos-plugins/registry/blob/main/index.json) **no shot at enso, just found one that had an external github call

[2025-05-09 02:01:29] ERROR: All installation methods (npm, GitHub, monorepo) failed.
[2025-05-09 02:01:29] WARN: Installation failed for plugin :
[2025-05-09 02:01:29] ERROR: All installation attempts failed for plugin @Elizaos/plugin-enso
[2025-05-09 02:01:29] WARN: Failed to load plugin module '@Elizaos/plugin-enso' using all available strategies.
[2025-05-09 02:01:29] ERROR: Failed to load plugin @Elizaos/plugin-enso even after installation.
[2025-05-09 02:01:29] WARN: Failed to load or prepare plugin specified by name: @Elizaos/plugin-enso
GitHub
registry/index.json at main · elizaos-plugins/registry
JSON Registry for all the plugins in the elizaOS ecosystem - elizaos-plugins/registry
registry/index.json at main · elizaos-plugins/registry
[ai16z] <odilitime>
APP
 — 09/05/2025, 07:53
yea 1.x plugins from registry still need some work
[ai16z] <bowtiedbluefin>
APP
 — 09/05/2025, 07:54
Can you provide a recommendation for how I proceed? Should I just PR the plugin in there and then continue to test?
[ai16z] <odilitime>
APP
 — 09/05/2025, 07:55
we're going to publish some instructions next week, I'd just hang tight
[ai16z] <bowtiedbluefin>
APP
 — 09/05/2025, 07:56
Alright. I submitted the PR anyway. Nobody is goign to grab this organically in the mean time. Can we push this through so I can continue my Eliza development using the plugin. Everything works when I import natively so I don't anticipate any other issues: https://github.com/elizaos-plugins/registry/pull/132
GitHub
add plugin-morpheus by bowtiedbluefin · Pull Request #132 · eliza...
Adding plugin to registry as per @ChristopherTrimboli recommendation
Registry Update Checklist
Registry:

I&amp;#39;ve made the organization @eliza-plugins (left side of the colon of JSON entry in...
funboy — 09/05/2025, 09:19
Sure, but what kind of demo do you mean? I mean, the best way to try the service is to join the 24/7 Twitch livestream at https://www.twitch.tv/airewardrop and test the actions directly.

We're not fully ready for interaction via X and YouTube due to API limitations. We're working on a cost-effective solution using Scrap + WebSocket callbacks, but it's not reliable enough at the moment.
Twitch
airewardrop - Twitch
AIR3 Agent By AIRewardrop first 24/7 LiveStream Market Insight Channel
Image
a4oya4o — 09/05/2025, 17:05
guys in order to make an agent to perform a transaction on solana mainnet, do i have to create an action, and where do i announce this action - in the character.json file or in the index.ts?
Pr⭕f. J[UA]
 — 09/05/2025, 19:22
I was able to get my Solana agent to do transactions on Mainnet by asking it in the online dashboard that I ran locally. I asked cursor to add the plugin and it added code to the character file. Not sure if anywhere else. And of coarse details for wallet and chain in the env file and should work.
Sorry I only use Ai for setup and don’t know the technical way to explain.
a4oya4o — 09/05/2025, 19:30
okay how do you call your env file in the character without exposing private keys api keys etc
You only use the localhost GUI to set it up?
Failed to import plugin: @Elizaos-plugins/plugin-solana Error: Cannot find package '@Elizaos/plugin-trustdb' imported from /opt/elizaos/eliza/packages/plugin-solana/dist/index.js
    at packageResolve (/opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:757:9)
    at moduleResolve (/opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:798:18)
    at Object.defaultResolve (/opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/dist-raw/node-internal-modules-esm-resolve.js:912:11)
    at /opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/src/esm.ts:218:35
    at entrypointFallback (/opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/src/esm.ts:168:34)
    at /opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/src/esm.ts:217:14
    at addShortCircuitFlag (/opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/src/esm.ts:409:21)
    at resolve (/opt/elizaos/eliza/nodemodules/.pnpm/ts-node@10.9.2@swc+core@1.11.4_@swc+helpers@0.5.15@types+node@22.13.5_typescript@5.8.2/node_modules/ts-node/src/esm.ts:197:12)
    at nextResolve (node:internal/modules/esm/hooks:748:28)
    at Hooks.resolve (node:internal/modules/esm/hooks:240:30)
As you can see on the screenshot i have the plugin in the packages folder
\
Image
a4oya4o — 09/05/2025, 20:01
how im feeling right now lol 😄
Image
Pr⭕f. J[UA]
 — 09/05/2025, 21:08
To be honest most of this is technical for me but I’ll add your error to my cursor when I get home and see what it says. Are you using cursor or chatgpt for assistance?
Pr⭕f. J[UA]
 — 09/05/2025, 21:08
Me all the time
😂
sayonara — 09/05/2025, 21:16
can you confirm your elizaos --version that gave you this error
sayonara — 09/05/2025, 21:18
what ui? are you talking about your vscode / cursor?
Fenil Modi — 09/05/2025, 21:26
beta 1.0.41
and same on discord-plugin also
sayonara — 09/05/2025, 21:26
can you try 1.0.48
Fenil Modi — 09/05/2025, 21:27
will do
sayonara — 09/05/2025, 21:27
npm i -g @elizaos/cli@beta to update
Rascar — 09/05/2025, 21:34
Hey guys, I've just git cloned Eliza0s and changed to the v2-develop branch, did the following : bun i && bun run build && bun start
and got the error:

[2025-05-09 15:58:14] ERROR: Failed to run database migrations (pglite):
    message: "(RuntimeError) Aborted(). Build with -sASSERTIONS for more info."
    stack: [
      "RuntimeError: Aborted(). Build with -sASSERTIONS for more info.",
      "at abort (/home/rascar/ai-agents-projects/eliza-v2/eliza-code-deepseek-v2/eliza/node_modules/@electric-sql/pglite/dist/index.js)",
      "at unknown",
      "at unknown",
      "at unknown",
      "at unknown",
      "at unknown",
      "at <anonymous> (/home/rascar/ai-agents-projects/eliza-v2/eliza-code-deepseek-v2/eliza/node_modules/@electric-sql/pglite/dist/index.js:3:243608)",
      "at processTicksAndRejections (native:7:39)"
    ]

How do I fix it?
nodejs version: 23.3.0
python version: 3.13.0
bun 1.2.10
sayonara — 09/05/2025, 21:36
can you try clearing rm -rf ~/.eliza
and then try again?
Rascar — 09/05/2025, 21:39
It worked, thank you! The database inside the eliza folder got corrupted or something? What happened?
sayonara — 09/05/2025, 21:40
yeah pglite is kinda that way sometimes! recommend using POSTGRES with neon.tech or supabase
Rascar — 09/05/2025, 21:40
Great, thx!
bob_the_spounge — 09/05/2025, 23:08
Hi all!
i've got this bug with the twitter plugin on ubuntu 24. Any clue ?
Exception in PromiseRejectCallback:
file:///home/user/test/node_modules/@elizaos/plugin-twitter/dist/index.js:9243
        await client.service.stop();
                             ^

RangeError: Maximum call stack size exceeded


<--- Last few GCs --->

[14939:0x28ca4000]    48050 ms: Scavenge (interleaved) 4049.9 (4069.6) -> 4049.1 (4113.1) MB, pooled: 0 MB, 21.97 / 0.00 ms  (average mu = 0.216, current mu = 0.126) allocation failure;
[14939:0x28ca4000]    50250 ms: Mark-Compact (reduce) 4049.3 (4113.1) -> 4048.7 (4054.1) MB, pooled: 0 MB, 2074.51 / 0.00 ms  (+ 11.1 ms in 4 steps since start of marking, biggest step 5.0 ms, walltime since start of marking 2093 ms) (average mu = 0.157,
FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
----- Native stack trace -----

 1: 0xf1ae99 node::OOMErrorHandler(char const, v8::OOMDetails const&) [node]
 2: 0x1333dc0 v8::Utils::ReportOOMFailure(v8::internal::Isolate, char const, v8::OOMDetails const&) [node]
 3: 0x1333eaf v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate, char const*, v8::OOMDetails const&) [node]
 4: 0x15ca385  [node]
 5: 0x15ca3b2  [node]
 6: 0x15ca6aa v8::internal::Heap::RecomputeLimits(v8::internal::GarbageCollector, v8::base::TimeTicks) [node]
 7: 0x15dabca  [node]
 8: 0x15def70  [node]
 9: 0x206f741  [node]
Aborted (core dumped)
sayonara — 09/05/2025, 23:10
Restart should fix, seems to be ran out of memory
bob_the_spounge — 09/05/2025, 23:10
restart of the server ?

Will investigate more
sayonara — 09/05/2025, 23:10
Yea
How much ram are you working with
bob_the_spounge — 09/05/2025, 23:11
24Go
should be enough i guess
lol
i ve the same error after reboot
sayonara — 09/05/2025, 23:13
Hmm what version are you using
bob_the_spounge — 09/05/2025, 23:17
1.0.0-beta.48
Scooter — 09/05/2025, 23:26
How to get eliza agent to respond to messages on Discord with their @?
sayonara — 09/05/2025, 23:30
What version
Scooter — 09/05/2025, 23:31
cli beta
latest version
sayonara — 09/05/2025, 23:34
Number please 😅
sayonara — 09/05/2025, 23:35
Ask something like ‘can you help me create a new community channel’
Scooter — 09/05/2025, 23:38
1.0.0-beta.37
Just to be clear I want the agent to use the @username of the person they are responding to in the response.
sayonara — 09/05/2025, 23:43
yeah I think that was fixed
suggest to upgrade to 1.0.0-beta.48
Scooter — 09/05/2025, 23:45
Thank you kindly
TH3H4RM1N4T0R — 09/05/2025, 23:59
eliza.gg down?
YungYoda — 10/05/2025, 00:11
how long are facts/provider knowledge cached in state?
Is there a time based way to set this?
[ai16z] <winded4752>
APP
 — 10/05/2025, 00:37
Till they return? As far as I know persistence is the dbs
sayonara — 10/05/2025, 00:43
yes
ai16z-bridge-odi
APP
 — 10/05/2025, 00:44
[ai16z] <k_carv> Use Eliza.how
Scooter — 10/05/2025, 00:46
When eliza agent is monitoring/responding in multiple servers do we want each server (or even channel) to be its own world?
ai16z-bridge-odi
APP
 — 10/05/2025, 00:47
[ai16z] <k_carv> In v2 it will be able to use the same memory across multiple client interfaces
Scooter — 10/05/2025, 00:56
How to force migrate or scrap old ppostgresSQL configuration for the new one with the added WorldID field?
sayonara — 10/05/2025, 01:21
Wdym
You want to retain old agent memories and migrate to v1.x?
Scooter — 10/05/2025, 01:23
Yeah but I just went ahead and deleted the old DB and trying to get atest version Eliza to configure a new one
0xbbjoker — 10/05/2025, 01:32
you should be able to dump database but not sure how old is your DB and if you gonna have migration issues.

if you could clarify exactly what do you wanna do maybe I can help you?
Scooter — 10/05/2025, 01:35
Just trying to set up a new database with proper configuration
Scooter — 10/05/2025, 01:48
Just ran eliza start --configure with latest version of eliza and passed new DB url and configuration and migration failed
[2025-05-09 20:17:41] WARN: Error loading configuration: TypeError: fs4.exists is not a function
[2025-05-09 20:17:41] INFO: First time setup. Let's configure your Eliza agent.
[2025-05-09 20:17:41] ERROR: Error saving configuration: TypeError: fs4.exists is not a function
[2025-05-09 20:17:41] INFO: Found project by description in package.json
[2025-05-09 20:17:42] ERROR: Failed to run database migrations (pg):
0xbbjoker — 10/05/2025, 01:58
I feel like you having issue with .env and POSTGRES_URL.

So do this:
rm -rf ~/.eliza -> here is the global .env,
double check your .env if you have it in the root of the project and make sure this instance of postgres is fresh,
Scooter — 10/05/2025, 02:19
Tried these steps but not working
here's more detailed logs

[2025-05-09 20:48:48] WARN: Error loading configuration: TypeError: fs4.exists is not a function
[2025-05-09 20:48:48] INFO: First time setup. Let's configure your Eliza agent.
[2025-05-09 20:48:48] ERROR: Error saving configuration: TypeError: fs4.exists is not a function
[2025-05-09 20:48:48] INFO: Found project by description in package.json
[2025-05-09 20:48:49] ERROR: Failed to run database migrations (pg):
    message: "(error) relation "agents" already exists"
    stack: [
      "error: relation "agents" already exists",
      "at file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:4107:21",
      "at process.processTicksAndRejections (node:internal/process/task_queues:105:5)",
      "at async file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:48157:13",
      "at async _NodePgSession.transaction (file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:51566:22)",
      "at async PgDialect.migrate (file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:48153:5)",
      "at async migrate2 (file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:51676:3)",
      "at async PostgresConnectionManager.runMigrations (file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:51992:7)",
      "at async PgDatabaseAdapter.init (file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:54342:7)",
      "at async AgentServer.initialize (file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:56738:7)",
      "at async startAgents (file:///home/tayter502/.nvm/versions/node/v23.6.1/lib/node_modules/@elizaos/cli/dist/chunk-SSXCTVZL.js:57473:3)"
    ]
0xbbjoker — 10/05/2025, 02:20
yea your DB is not fresh
Scooter — 10/05/2025, 02:20
werid I literally deleted it
0xbbjoker — 10/05/2025, 02:20
what do you use? neon?
Scooter — 10/05/2025, 02:20
yeah
0xbbjoker — 10/05/2025, 02:22
go to tables see if you have __drizzle_migrations somewhere drop it
Scooter — 10/05/2025, 02:22
there was a child branch for testing so maybe that is somehow being referenced
with the old configuration
0xbbjoker — 10/05/2025, 02:23
I am not a fan of neon just because I can't drop it easily. Had similar issues. You could delete the project and create a new one to make sure DB is fresh.
do you use SDK for neon?
Scooter — 10/05/2025, 02:29
no not using SDK
0xbbjoker — 10/05/2025, 02:30
that's okay - you can remove it from UI on the web and try with fresh db.
Scooter — 10/05/2025, 03:25
Realized I was just creating "fresh" branches under the same project on Neon
Had to create anew project and it workd
thanks for the help!
still getting these two type errors surrounding the use of fs.exists method in node
guessing this is an eliza bug
0xbbjoker — 10/05/2025, 03:49
we gonna publish fix for that soon https://github.com/elizaOS/eliza/commit/677e4b24ef866b3ea758d732a633e2806a59871c

thanks for addressing the issue
0xbbjoker — 10/05/2025, 03:50
you are able to run agents now?


I do not see ollama plugin here
Image
Image
0xbbjoker — 10/05/2025, 20:09
https://www.npmjs.com/package/@elizaos/plugin-ollama?activeTab=versions
npm
@elizaos/plugin-ollama
This plugin provides integration with Ollama's local models through the ElizaOS platform.. Latest version: 1.0.0-beta.8, last published: a month ago. Start using @elizaos/plugin-ollama in your project by running `npm i @elizaos/plugin-ollama`. There are no other projects in the npm registry using @elizaos/plugin-ollama.
Image
add in character obj
Void — 10/05/2025, 20:10
Character config?

Question here
Do i need to download ollama plugin?,
0xbbjoker — 10/05/2025, 20:11
no CLI will handle install and load

how did you started? I mean did you created the project with CLI?

elizaos create or?
Void — 10/05/2025, 20:12
Install globally,
npm install -g @elizaos/cli@beta
Start ElizaOS,
elizaos start
This, i tried

Elizaos plugins add @ollama (anything related to) and there was error
0xbbjoker — 10/05/2025, 20:14
can you try:
elizaos create -> this gonna create a project starter,
cd into project,
edit character in index.ts -> add plugin to plugins,
elizaos dev,
adrianodelvoux — 10/05/2025, 20:16
Thanks! I'm checking it out. Looks like the createRoom function has been removed. Is there another recommended way to create rooms for this use case (via api client)?
sayonara — 10/05/2025, 20:17
still there
createGroupChat: (
    agentIds: string[],
    roomName: string,
    serverId: string,
    source: string,
    metadata?: any
  ) => {
    const worldId = WorldManager.getWorldId();
    return fetcher({
      url: `/agents/groups/${serverId}`,
      method: 'POST',
      body: {
        agentIds,
        name: roomName,
        worldId,
        source,
        metadata,
      },
    });
  },
Void — 10/05/2025, 20:22
is this right
Image
added 30~36 lines
sayonara — 10/05/2025, 20:28
settings should be outside like this you can use env also
Image
sayonara — 10/05/2025, 20:29
you can put this in .env @Void
Koplo — 10/05/2025, 21:50
Hey!

Is there a cache system on Eliza ? I've started to dev my plugin the return are correct, the when the agent send the data on telegram or the classic UI it seems that it take an old response and not the latest
sayonara — 10/05/2025, 21:52
v1.x or v0.x
Koplo — 10/05/2025, 21:52
Version: 1.0.0-beta.48
sayonara — 10/05/2025, 21:53
can you elaborate your issue more; I didnt get you
bitcryptowski.btc — 10/05/2025, 21:55
hello everyone. i have customized everything in my project under src/index.ts and when i then start eliza via cli, i only have the eliza standard agent in the cli and web dashboard without my changes. what am i doing wrong?  many thanks
Koplo — 10/05/2025, 21:55
My bad.

Ok so i have a plugin that give me some data such as (that the data in the chat)

Top 3 Stablecoin Yields on Ethereum:

morpho-blue (Ethereum): 21.70% APY for SAKURAUSDC
Type: Lending Pool,
morpho-blue (Ethereum): 19.24% APY for APRUSR
Type: Lending Pool,
spectra-v2 (Ethereum): 14.56% APY for YVCURVE-GHO-USR
Type: Pool,

BUT

i get this message on the UI or telegram
[REALTIME_DATA] found 3 top stablecoin pools on Ethereum:
morpho-blue (ethereum): 16.84% apy for aprusr.
pendle (ethereum): 14.22% apy for fgho.
spectra-v2 (ethereum): 13.50% apy for yvcurve-gho-usr.

real-time data from defillama, not hardcoded values.

which was an oooold message. And i'm stuck here
sayonara — 10/05/2025, 21:55
do bun run build before you start when you make changes
sayonara — 10/05/2025, 21:57
potentially your plugin isnt passing data back as response....mind if I look at code?
bitcryptowski.btc — 10/05/2025, 21:58
ty!
Koplo — 10/05/2025, 21:59
Sure, can i get your github user so i can add you to the repo (it's in private as for now the code is too horrible :D)
or i guess i can just dm you with the plugin lol
sayonara — 10/05/2025, 22:02
https://github.com/wtfsayo
GitHub
wtfsayo - Overview
The ticker is $ai16z. wtfsayo has 120 repositories available. Follow their code on GitHub.
Image
TernaryBash — 10/05/2025, 22:06
I  keep getting the TEXT_EMBEDDING issue with the new beta version. I don't use openAI though and only wanted to use Ollama, is this supported? I put all of the env variables in yet it isn't being used. Do I need to install a plugin or something? Thank you.
Koplo — 10/05/2025, 22:07
Ok invite sent!
bitcryptowski.btc — 10/05/2025, 22:21
can i only realize text-embedding with openAi at the moment?
i only have anthropic at the moment.
TernaryBash — 10/05/2025, 22:23
I think so man, same here. Even Ollama doesn't worth. They don't say it but I think OpenAI is a requirment right now.
bitcryptowski.btc — 10/05/2025, 22:37
okay. thanks.
sayonara — 10/05/2025, 22:37
it should work; there are two methods; use ollama plugin or openai plugin like this
https://github.com/elizaOS/eliza/blob/b17106f4d6823f4260356513060f0c933aa8cdc7/packages/docs/blog/openai-plugin-envs.md
GitHub
eliza/packages/docs/blog/openai-plugin-envs.md at b17106f4d6823f426...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
eliza/packages/docs/blog/openai-plugin-envs.md at b17106f4d6823f426...
sayonara — 10/05/2025, 22:38
need to set .env like this
Koplo — 10/05/2025, 23:19
I'm betting on a cache or something .. but i've been deleting all folders / files close enough to be a cache stuff .. still getting the old message lol
sayonara — 10/05/2025, 23:22
using pglite?
Koplo — 10/05/2025, 23:23
yeah
sayonara — 10/05/2025, 23:23
try rm -rf ~/.eliza once and then bun run build before starting up
[ai16z] <soof0541>
APP
 — 10/05/2025, 23:36
Ai16z back to 10 cents ?
Koplo — 10/05/2025, 23:46
mmmh it's actually a bit better! But i still have the issue (this time with a less old message aha). Did you check my code ? Maybe i'm missing something between the plugin data and the agent reading it
[ai16z] <_sthx>
APP
 — 10/05/2025, 23:47
i am running into being banned from X due to spammy messages and manipulation. How can i set up ElisaOS v2 to not respod to everything and just post messages on the account and only reply when tagged? cant seem to figure it out
0xbbjoker — 10/05/2025, 23:50
what's your configuration in .env for TWITTER?
sayonara — 10/05/2025, 23:55
https://github.com/elizaOS/eliza/blob/v2-develop/packages/the-org/src/investmentManager/plugins/community-investor/recommendations/analysis.ts

use this as an example
GitHub
eliza/packages/the-org/src/investmentManager/plugins/community-inve...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
sayonara — 10/05/2025, 23:56
just need to make prompt / message example better
changing your character name might also help
it can be confusing to LLM
add one example of action here ig- https://github.com/Koploseus/koplo_agent/blob/9af1d7482b9ac77eaea94b1de9afe343499d1399/src/index.ts#L40
Koplo — 10/05/2025, 23:59
MMmh seems interesting! Going to test it now thanks!
Koplo — 11/05/2025, 00:07
indeed! works better now:! thanks @sayonara !
boyaloxer — 11/05/2025, 02:44
Oh I tried this btw, it still doesn't boot the discord client
[ai16z] <OpenRouter #announcemen
APP
 — 11/05/2025, 03:44
Reminder for devs: OpenRouter will automatically "stick" you to providers that show that they're caching your requests.
https://x.com/OpenRouterAI/status/1921327473150595130
OpenRouter (@OpenRouterAI) on X
💡TIP: You don't need to implement sticky inference caching yourself.

OpenRouter "sticks" you to providers as they cache your requests (until the provider expires their cache), and passes the full cost savings to you.

X•11/05/2025, 03:42
TernaryBash — 11/05/2025, 06:27
Thank you for the response. Are you sure this is the case for the most recent beta .47?
TernaryBash — 11/05/2025, 06:28
Yeah, I had the .env set up already, didn't know I needed a plugin though. Will try again, thank you
lantianlaoli — 11/05/2025, 09:17
Running  pnpm build after modify the plugin and pnpm i on root folder. There have any more convenient way to do it?
why I use postman call the http://localhost:3000/agents that is work, but another backend project do it is failed?
[Nest] 11305  - 05/11/2025, 11:43:40 AM   ERROR [ElizaAgentService] Failed to fetch Eliza agent ID
Request failed with status code 502
[Nest] 11305  - 05/11/2025, 11:43:40 AM   ERROR [ExceptionsHandler] Error: Failed to send message to Eliza agent, Error: Could not retrieve Eliza agent ID
    at ElizaAgentService.sendMsg (/home/cxp/solana/hackathon/solana-breakout/backend/src/services/eliza-agent.service.ts:68:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async LiquidityService.aiConfigGeneration (/home/cxp/solana/hackathon/solana-breakout/backend/src/modules/liquidity/liquidity.service.ts:219:31)

Both services are running on WSL2. The first call works from Postman, but when my other backend service tries to make the same request, it fails with a 502 error.
sayonara — 11/05/2025, 09:42
Upgrade your cli
sayonara — 11/05/2025, 09:53
48 or 49
sayonara — 11/05/2025, 09:53
Using 0.x?
boyaloxer — 11/05/2025, 09:54
latest version. installed the discord client using terminal. It's installed registered just doesn't boot on start
sayonara — 11/05/2025, 09:55
Are you trying to message eliza from another backend?
sayonara — 11/05/2025, 09:56
Did you add it to your character ?
lantianlaoli — 11/05/2025, 09:56
If I change the localhost to my wsl2 ip address, it turn to be work. but I dont understand why cause it
boyaloxer — 11/05/2025, 11:29
Yea added it to the client field
bitcryptowski.btc — 11/05/2025, 14:04
hello and good morning from doomed germany. i have deleted the local-ai plugin, use antrophic as a model and have this in my .env:

OPENAI_API_KEY=dummy-key
OPENAI_EMBEDDING_URL=https://api.voyageai.com/v1
OPENAI_EMBEDDING_MODEL=voyage-3
OPENAI_EMBEDDING_DIMENSIONS=1024

nevertheless, my agent keeps downloading a local model (screenshot). what am i doing wrong?  best regards
Image
I have also set USE_LOCAL_AI=false in my .env, but this does not help.
sayonara — 11/05/2025, 14:29
Add to plugin
Field
——-
Where is your .env placed @bitcryptowski.btc
Also bun run build before you start

bitcryptowski.btc — 11/05/2025, 14:40
Startup successful!
Go to the dashboard at http://localhost:3000/
AgentServer is listening on port 3000
[elizaos] Resolved .env file from: /home/atze/.env
sayonara — 11/05/2025, 14:44
Is it same folder as your project? I don’t think so
bitcryptowski.btc — 11/05/2025, 14:44
no.  in the root folder.   😭
sayonara — 11/05/2025, 14:44
Why
bitcryptowski.btc — 11/05/2025, 14:46
idk dude ;/  i can trade but don't understand  this coding stuff well.   i just moved the env.
the cli  looks better now.
I always thought that [elizaos] Resolved .env file from: /home/atze/.env looked very good.
sayonara — 11/05/2025, 15:06
Nope
bitcryptowski.btc — 11/05/2025, 15:32
thank you very much! you have played through eliza, right? so i definitely need an openAI key. only antrophic doesn't work?
sayonara — 11/05/2025, 16:17
Yes! Need an embedding provider OpenAI or any other
[ai16z] <zakito11>
APP
 — 11/05/2025, 16:25
Hello , how to install the new version of eliza on windows
bitcryptowski.btc — 11/05/2025, 17:44
https://docs.anthropic.com/en/docs/build-with-claude/embeddings#how-to-get-embeddings-with-anthropic

How do I get this to work?
Anthropic
Embeddings - Anthropic
Text embeddings are numerical representations of text that enable measuring semantic similarity. This guide introduces embeddings, their applications, and how to use embedding models for tasks like search, recommendations, and anomaly detection.
sayonara — 11/05/2025, 17:46
Just set

OpenAI and anthropic key both in .env it will work out of the box
ai16z-bridge-odi
APP
 — 11/05/2025, 17:57
[ai16z] <deniz989898> wsl is recommended
[ai16z] <zakito11>
APP
 — 11/05/2025, 17:57
ok
link for the installation guide ?
ai16z-bridge-odi
APP
 — 11/05/2025, 19:50
[ai16z] <_sthx> is there a simple answer to this? about the twitter spam and to get Elisa to only post and reply to tagged messages?
[ai16z] <0xmitch>
APP
 — 11/05/2025, 20:59
pm me fren, i was the original dev for that plug in, you can see the original pr here: https://github.com/elizaOS/eliza/pull/2784

they repackaged it and didn't give me credit:
https://github.com/elizaos-plugins/plugin-arbitrage
GitHub
feat(new-plugin): add arbitrage plugin with example character by mm...
Arbitrage Plugin for Eliza
This PR adds a new plugin that enables Eliza to perform cryptocurrency arbitrage trading across decentralized exchanges (DEXs).
Features

Real-time market monitoring via ...
Arbitrage Plugin for Eliza
This PR adds a new plugin that enables Eliza to perform cryptocurrency arbitrage trading across decentralized exchanges (DEXs).
Features

Real-time market monitoring via ...
GitHub
GitHub - elizaos-plugins/plugin-arbitrage: Identifies and executes ...
Identifies and executes cryptocurrency arbitrage opportunities across multiple exchanges. - elizaos-plugins/plugin-arbitrage
Identifies and executes cryptocurrency arbitrage opportunities across multiple exchanges. - elizaos-plugins/plugin-arbitrage
[ai16z] <pupathebig>
APP
 — 11/05/2025, 21:18
guys...
every time i touch eliza it feels cursed lol
[ai16z] <pupathebig>
APP
 — 11/05/2025, 21:26
9 6e 64 20 6d 6f 64 75 ... 606 more bytes>
  ],
  pid: 19253,
  stdout: <Buffer 0a 3e 20 40 65 6c 69 7a 61 6f 73 2d 70 6c 75 67 69 6e 73 2f 70 6c 75 67 69 6e 2d 74 77 69 74 74 65 72 40 30 2e 31 2e 39 20 62 75 69 6c 64 20 2f 55 73 ... 476 more bytes>,
  stderr: <Buffer 73 72 63 2f 69 6e 64 65 78 2e 74 73 28 31 2c 32 39 29 3a 20 65 72 72 6f 72 20 54 53 32 33 30 37 3a 20 43 61 6e 6e 6f 74 20 66 69 6e 64 20 6d 6f 64 75 ... 606 more bytes>
}
Adding plugin @elizaos-plugins/plugin-twitter to agent/package.json
wth
error Error: Command failed: pnpm build
src/index.ts(1,15): error TS2305: Module '"@elizaos/core-plugin-v1"' has no exported member 'Plugin'.
like what the hell is this, it's just not working
[ai16z] <pupathebig>
APP
 — 11/05/2025, 21:43
Like, ok fixed that
but how can i use LLM from OpenAI or grok whatever... it spins up llama.... but my character file = "modelProvider": "grok",
ai16z-bridge-odi
APP
 — 11/05/2025, 21:48
[ai16z] <0xchainbrain> Appreciate the ping but that was like a century ago lol, I’ve moved on to 50 other things. Will reach out should I ever return to it.
TH3H4RM1N4T0R — 11/05/2025, 21:59
are you on 1.0.0 or 0.25.x?
modelProvider is no longer used in newer versions it seems, you need to make sure you set all required values in your .env file and then just include the plugins in your characterfile for the llm's you want
If it falls back to llama then somewhere its configured to do so, just search throught the source for the model name used and you'll find it
boyaloxer — 11/05/2025, 22:04
Tried that also didn't work
TH3H4RM1N4T0R — 11/05/2025, 22:07
you have the plugin added to your package.json? added the plugin to your characters plugin? have the .env variables set for discord, have them passed along to the secrets of the character?
[ai16z] <pupathebig>
APP
 — 11/05/2025, 22:14
TWITTER_DRY_RUN=true = is not true - it still posted on timeline 🤦‍♂️
boyaloxer — 11/05/2025, 22:15
I installed it using CMD like the docs say, but I don't see it in the package.json in either the agent directory or the core directory. Does this have to be added manually for all plugins and clients?
TH3H4RM1N4T0R — 11/05/2025, 22:15
Not sure whether it's included by default, but you can just add it, to the package.json, to the plugins in your character.ts/json file and then re-run (bun install bun run build bun run start or just elizaos start i guess), see if that makes a difference
you can also set LOG_LEVEL=debug in your .env and see what the logs do
You also need to make sure that your App in Discord has all the correct gateway intents enabled
boyaloxer — 11/05/2025, 22:53
Oh it actually is in the package.json

All that other stuff you mentioned is setup as well. I currently have an agent running on the previous version of eliza
TH3H4RM1N4T0R — 11/05/2025, 22:53
and you don't get it connected to your discord server rn, correct?
boyaloxer — 11/05/2025, 22:57
Right but the client doesn't appear to even be loading when I start the agent
I might've found a typo I'll try to fix
TH3H4RM1N4T0R — 11/05/2025, 23:01
You could also add this to the init of your plugin/project:

  // Register runtime events
  runtime.registerEvent('DISCORD_WORLD_JOINED', async (params: { server: Guild }) => {
    logger.debug('Discord connected')
  });


and see if it triggers
ai16z-bridge-odi
APP
 — 11/05/2025, 23:40
[ai16z] <_sthx> anyone who can help me with this? I have set up a tweetpost in the character but is still spamms twitter. on the last version i jsut deleted the functions to quote, retweet and it eventually worked out. but in the new version I cant find it.
YungYoda — 12/05/2025, 01:07
download the ubuntu plugin
YungYoda — 12/05/2025, 01:08
if we set both api keys will it use Claude for llm and OpenAI for embeddings automatically?
Scooter — 12/05/2025, 01:27
Accidentally deleted global eliza folder.  Tried initializing and building again but only getting the .env and not the config file.  Anyone got a spare one laying around?
Scooter — 12/05/2025, 01:42
Maybe .49 has a bug not creating the global config?
Scooter — 12/05/2025, 02:07
Someone mind just copy pasting their global config file?  Will figure out the rest.
TH3H4RM1N4T0R — 12/05/2025, 02:08
You can just get it from github right?
Scooter — 12/05/2025, 02:08
didn't se the global config?
TH3H4RM1N4T0R — 12/05/2025, 02:08
wdym w global config
Scooter — 12/05/2025, 02:08
there is a global folder eliza creates
has a .env and a config
this is not in the project directory
TH3H4RM1N4T0R — 12/05/2025, 02:10
just clone the project fresh rerun the setup and youll get it i guess
Scooter — 12/05/2025, 02:15
In there somehwere just not obvious where since it is created when you build after installing
TH3H4RM1N4T0R — 12/05/2025, 02:15
I don't have that whole directory at all
Scooter — 12/05/2025, 02:15
if you could just copy past yours that be super sick
wsl?
TH3H4RM1N4T0R — 12/05/2025, 02:15
are you actually asking me to share my .env?
Scooter — 12/05/2025, 02:15
no the config
TH3H4RM1N4T0R — 12/05/2025, 02:15
there's no .eliza dir on my side
what version are you on?
Scooter — 12/05/2025, 02:15
should just point your project to global dependencies something like that
.48
TH3H4RM1N4T0R — 12/05/2025, 02:16
I don't have it
Just try to recreate it from scratch
TH3H4RM1N4T0R — 12/05/2025, 02:17
you could just do this then
https://eliza.how/docs/cli/env
Environment Configuration | eliza
Configure environment variables and API keys for ElizaOS projects
Scooter — 12/05/2025, 02:18
I did do that and it only created the .env
TH3H4RM1N4T0R — 12/05/2025, 02:18
just run the reset
sayonara — 12/05/2025, 02:18
Yup
Scooter — 12/05/2025, 02:18
very annoying to do this
sayonara — 12/05/2025, 02:19
If you don’t change anything in default characters plugin setup
TH3H4RM1N4T0R — 12/05/2025, 02:19
seems like a broken setup is annoying as well
Scooter — 12/05/2025, 02:19
someone just copy past their config please
[ai16z] <hqidn659>
APP
 — 12/05/2025, 02:24
@miniod
send me direct message for guidance
Thanh — 12/05/2025, 06:39
I'm able to configure knowledge using a string format, but it doesn't work with path or directory formats in beta 49 @sayonara @Mod
Image
Thanh — 12/05/2025, 08:40
String knowledge was imported to agent’s knowledge successfully
Scooter — 12/05/2025, 11:09
How to get agent to respond to users on discord with @username in response?
Eli — 12/05/2025, 12:22
Hey guys, regarding the plugins of video-generation, are the videos displayed correctly with a player or is the GUI not able to display the videos generated by the agents? The videos are well saved into the content_cache tho
Image
DrakeDinh — 12/05/2025, 12:43
Im using cli @beta ver 49, node version 23.3.0 and can't use knowledge from file
I tried both file references and directory references, only direct string knowledge work.
I saw we support 3 file types (.pdf .md .txt), can we provide sample file and code example where it work ?
*notes: already set ragKnowledge: true
sayonara — 12/05/2025, 13:10
ui issue; will fix
sayonara — 12/05/2025, 13:12
if you start agent again, it would be auto-created
bitcryptowski.btc — 12/05/2025, 13:27
Hmm, I have about $70 on Anthropic and $0 on Openai.  I thought maybe I could run everything through Anthropic?`
sayonara — 12/05/2025, 13:28
adding 5$ to openai should be enough i think! or you could pair with local ai plugin;

where you define plugin keep anthropic first and local ai after
bitcryptowski.btc — 12/05/2025, 13:51
but how does the agent decide to use claude as the main model and do the text embeddings via openai? i don't quite check that in the new version yet.
sayonara — 12/05/2025, 13:51
based on first found order; anthropic doesnt have embedding so it will find it from next plugin that has it
if you put openai first; it will use it all from openai
bitcryptowski.btc — 12/05/2025, 13:52
ok. thanks

Unfortunately, he just doesn't answer me.
Image
Scooter — 12/05/2025, 14:51
I can get my agent to respond to users with @username but under the hood it i snot passing the actual discord user id so the @mention isnt highlighted blue and user's don't get a notification.  Doesn't eliza do this out of the box if it has the discord plugin?
sayonara — 12/05/2025, 14:55
use this (for test purposes)
plugins: [
  '@elizaos/plugin-sql',
  '@elizaos/plugin-anthropic',
  '@elizaos/plugin-local-ai',
  '@elizaos/plugin-discord',
  '@elizaos/plugin-twitter',
  '@elizaos/plugin-telegram',
  '@elizaos/plugin-bootstrap',
],
sayonara — 12/05/2025, 14:56
I am not able to understand, can you share screenshot? afaik if you use latest version it has been fixed
Scooter — 12/05/2025, 14:57
Image
sayonara — 12/05/2025, 14:58
what version are you using

can you check that with elizaos --version
Scooter — 12/05/2025, 14:59
.48 for eliza not sure about plugin
bitcryptowski.btc — 12/05/2025, 15:02
still no answer.   i also loaded openai with 5 bucks
Image
sayonara — 12/05/2025, 15:03
using monorepo or quickstart guide? should be working; try another message?
bitcryptowski.btc — 12/05/2025, 15:08
quckstart.   now i have added openai in the sequence. i have now asked something completely different via web ui, unfortunately no answer either.
Image
returning null?  wth
Scooter — 12/05/2025, 15:42
Getting this now
Image
sayonara — 12/05/2025, 15:42
should be using discord user id I will check this in a while
Scooter — 12/05/2025, 15:42
This ID I beleive is an internally assigned ID I'm guessing for storing to the database but I need the actual discord usrid
Ok thanks
sayonara — 12/05/2025, 15:48
yes
Scooter — 12/05/2025, 16:01
Is there a specific Oauth2 perm I need to enable that let's the discord plugin work as intended with respect to @username mentions @sayonara?
Positive it is just something dumb I'm doing per usual
bitcryptowski.btc — 12/05/2025, 16:07
so either i'm stupid or my server/agent is trying to trick me
Image
sayonara — 12/05/2025, 16:29
Is it still using local ai
bitcryptowski.btc — 12/05/2025, 16:30
i need a break.  haha
ripped me  1 cent w/o any answer.
Image
bitcryptowski.btc — 12/05/2025, 16:38
whyyyyy?
Image
sayonara — 12/05/2025, 16:43
gotta replace models on our end
bitcryptowski.btc — 12/05/2025, 16:45
i am a trader. this is all too high for me ❤️
sayonara — 12/05/2025, 16:46
use windsurf/cusror/copilot
it can take you long way with the questions
Thanh — 12/05/2025, 17:39
Same here @sayonara
sayonara — 12/05/2025, 17:40
it didnt work?
Thanh — 12/05/2025, 17:41
It works with string only
Does not work with path or directory
sayonara — 12/05/2025, 17:42
does it work with file upload?
Thanh — 12/05/2025, 17:42
Yes. File upload works
sayonara — 12/05/2025, 17:42
okay will check that
bitcryptowski.btc — 12/05/2025, 18:27
The issue was that your plugin.ts defined static return values in the models: section for TEXT_SMALL and TEXT_LARGE. This prevented ElizaOS from using real models like OpenAI or Claude — the agent never generated proper responses and either replied with hardcoded text or failed entirely for complex prompts.
sayonara — 12/05/2025, 18:28
oh yeah lol; sample plugin
need to disable that
Fenil Modi — 12/05/2025, 19:57
hey i tried with 1.0.49
it works fine
Julien — 12/05/2025, 21:12
What do you recommend for hosting a xAI agent? VPS or dedicated Video Card?
[ai16z] <OpenRouter #announcemen
APP
 — 12/05/2025, 21:32
Note: Google AI Studio rolled out new much lower rate limits for Gemini 2.5 Pro Experimental ( AKA google/gemini-2.5-pro-exp-03-25 ) - This model is going to experience much more 429s. We are checking in with the AI Studio team to see if there is anything we can do. This does NOT affect the preview model, google/gemini-2.5-pro-preview.

Reminder: Experimental models are likely to experience downtime like this and will be deprecated sooner and without notice than other models from Google.
Hidden Forces — 13/05/2025, 00:08
Is  "@elizaos/plugin-direct"  deprecated??  Can't understand why it's stopping character from loading.
Hidden Forces — 13/05/2025, 00:17
I really need help with this
0xbbjoker — 13/05/2025, 00:18
if you can elaborate for the start which version of elizaos you are using?
Hidden Forces — 13/05/2025, 00:27
Moved to v2.  Fresh install
0xbbjoker — 13/05/2025, 00:27
we don't have plugin-direct on v2
you don't need that
Hidden Forces — 13/05/2025, 00:28
nvrmnd, i just deleted it from my characterJSON.  I'm on another prblem now
Hidden Forces — 13/05/2025, 00:34
thanks for your help
TernaryBash — 13/05/2025, 00:42
[2025-05-12 19:11:51] WARN: OpenAI API key validation failed: Unauthorized
 I use nanoGPT. Is there an easy way to override this?
TernaryBash — 13/05/2025, 01:38
Found root cause
 Attempting to install package: @elizaos/plugin-local-ai using npm

When I add my ollama endpoint it trys to install node-llama-cpp. Why would it do this when I added a remote resource? Default .env examples shows no flag to turn this off.
ai16z-bridge-odi
APP
 — 13/05/2025, 01:40
[ai16z] <some_68286> i can’t find where to change those settings either. please tag me if you figure it out — really appreciate it in advance!
0xbbjoker — 13/05/2025, 01:51
how does your character file looks like?
TernaryBash — 13/05/2025, 01:57
Not edited, aven't touched it. Ollama settings
# Ollama Configuration (required if using the OLLAMA plugin)
OLLAMA_API_ENDPOINT=http://100.111.48.23:3008
OLLAMA_MODEL=qwen3:30b-a3b
USE_OLLAMA_EMBEDDING=BGE-M3:latest
OLLAMA_EMBEDDING_MODEL=BGE-M3:latest
OLLAMA_SMALL_MODEL=qwen3:30b-a3b
OLLAMA_MEDIUM_MODEL=qwen3:30b-a3b
OLLAMA_LARGE_MODEL=qwen3:30b-a3b

I am stumped, is there an ollama plugin? Looked everywhere, doesn't seem to be one.
0xbbjoker — 13/05/2025, 01:57
yea there is ollama plugin, that' why I am asking how does you character looks like? how are you setting up?
you gonna need to edit the character - add plugins you wanna use.

right now default is using plugin-local-ai that's why it's installing node-llama-cpp.

you gonna need to add @elizaos/plugins-ollama to character file as well as this configuration you sent to the .env
TernaryBash — 13/05/2025, 02:04
Oh ok, that's a big help thank you! I thought it was plug and play. I'll look around now since I know what to look for. Thank you @0xbbjoker !
[ai16z] <wizards4btc>
APP
 — 13/05/2025, 03:15
Anyone know how to build a thread of tweets using the agent-twitter-client repo?
[ai16z] <thescoho>
APP
 — 13/05/2025, 09:02
hey guys, trying to use the farcaster plugin but im getting these errors:

[2025-05-13 03:28:39] INFO: Successfully installed @Eliza#3900os/plugin-farcaster from npm registry.
[2025-05-13 03:28:39] INFO: Installation successful for @Eliza#3900os/plugin-farcaster, verifying import...
[2025-05-13 03:28:39] WARN: Failed to load plugin module '@Eliza#3900os/plugin-farcaster' using all available strategies.
[2025-05-13 03:28:39] WARN: Plugin @Eliza#3900os/plugin-farcaster installed : but could not be loaded/verified.
[2025-05-13 03:28:39] ERROR: All installation attempts failed for plugin @Eliza#3900os/plugin-farcaster
[2025-05-13 03:28:39] WARN: Failed to load plugin module '@Eliza#3900os/plugin-farcaster' using all available strategies.
[2025-05-13 03:28:39] ERROR: Failed to load plugin @Eliza#3900os/plugin-farcaster even after installation.
[2025-05-13 03:28:39] WARN: Failed to load or prepare plugin specified by name: @Eliza#3900os/plugin-farcaster

anyone face any similar issues while trying to get setup with the farcaster plugin?
im using the ^1.0.0-beta.8 version
Scooter — 13/05/2025, 11:38
How do i fix this?  User 54589a88-97da-00fd-aca3-31f44f53d71c has no name or username, skipping

Can't get entities working.
sayonara — 13/05/2025, 11:48
@Eliza#3900os/ whats that should be @elizaos
sayonara — 13/05/2025, 13:29
https://github.com/elizaOS/eliza/blob/v2-develop/packages/docs/blog/openai-plugin-envs.md
GitHub
eliza/packages/docs/blog/openai-plugin-envs.md at v2-develop · eli...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
Scooter — 13/05/2025, 17:33
How would I got about parsing a UUID eliza assigns a memory such that I get the original discord message ID?  How does eliza generate its UUIDs?
0xbbjoker — 13/05/2025, 17:51
you would need to store a mapping

discord message id to memory id
Scooter — 13/05/2025, 18:14
Ended up changing my approach. I am now trying to format the responses to discord messages as replies.  I start by storing the actual discord message id to the metadata field stored to the memory.  Then later retrieve it by memory UUID and use it in the reply.   For some reason though this is failing.  Here are the logs.
[2025-05-13 12:39:25] INFO: Using server ID: 1368647738123751444
[2025-05-13 12:39:25] INFO: No settings state found for server 1368647738123751444
[2025-05-13 12:39:25] INFO: Found 1 roles
[2025-05-13 12:39:27] INFO: [fe7fbf16-6a80-0402-88d8-0ffb95a3a48b] Retrieved 25 sources from Graphlit
[2025-05-13 12:39:27] INFO: [fe7fbf16-6a80-0402-88d8-0ffb95a3a48b] Truncated source #1 from 2960 to 400 chars
[2025-05-13 12:39:27] INFO: [fe7fbf16-6a80-0402-88d8-0ffb95a3a48b] Truncated source #2 from 979 to 400 chars
Expand
message.txt
5 KB
Might just be easier to create my own mapping with the memory UUID to discord message ID?
0xbbjoker — 13/05/2025, 18:16
one of the entites being mapped to relationship is not stored before that
Scooter — 13/05/2025, 18:17
Could you explain a bit more?  I'm creating entities for users in the room (dicord channel).
0xbbjoker — 13/05/2025, 18:19
see constraint here: https://github.com/elizaOS/eliza/blob/v2-develop/packages/plugin-sql/src/schema/relationship.ts

notice one of your entites target or source is not present in entity table
Scooter — 13/05/2025, 18:21
Might be better off just ripping the relationship stuff out?
0xbbjoker — 13/05/2025, 18:23
why not just storing the entity which you are forced to do with constraint?

if you do this relationships.ts provider won't work for you
Scooter — 13/05/2025, 18:26
I just dont understand why the entities aren't being created in the first place so reltionships wont fail
0xbbjoker — 13/05/2025, 20:14
not sure what's you setup would need to take a look into the code
Rascar — 13/05/2025, 21:47
I am creating a DeepSeek plugin for ElizaOS v2 to communicate with the model through API. I followed the guide here https://eliza.how/docs/core/plugins for the initial steps. Therefore, I did the following:
npx @elizaos/cli@beta create -> Okay,
elizaos test:,

First error:
The bootstrap plugin is not loaded and when I send message to the Eliza Agent there is no log for feeback.
[2025-05-13 16:15:26] INFO: Successfully installed @elizaos/plugin-bootstrap from npm registry.
[2025-05-13 16:15:26] INFO: Initializing character
[2025-05-13 16:15:26] INFO: Installation successful for @elizaos/plugin-bootstrap, verifying import...
[2025-05-13 16:15:26] WARN: Failed to load plugin module '@elizaos/plugin-bootstrap' using all available strategies.
[2025-05-13 16:15:26] WARN: Plugin @elizaos/plugin-bootstrap installed : but could not be loaded/verified.
[2025-05-13 16:15:26] ERROR: All installation attempts failed for plugin @elizaos/plugin-bootstrap

Why could this be happening and how to fix it?
[ai16z] <nibby0809>
APP
 — 13/05/2025, 21:56
I am a fullstack blockchain developer
Do you need a developer by any chance?
ThunderRonin — 13/05/2025, 22:20
my agent is not responding to twitter post comments, even when mentioned. no errors. whats the matter?
Scooter — 13/05/2025, 22:21
werid, I can easily use discord.js to format responses as a reply on my own in a test script but cannot for the life of me get eliza to do it.  Seems like the discord plugin itself is overridng my code?
0xbbjoker — 13/05/2025, 22:21
hummm try running tests with bun please also make sure you have bun installed

does the elizaos start works fine in your case?
0xbbjoker — 13/05/2025, 22:21
would need a bit more information like which version do you use and what's .env defined for X?
ThunderRonin — 13/05/2025, 22:23
v1.0.0 beta 49 cli on phala cloud and uh, i provided twitter auth credentials via eliza's agent specific env provider.
2025-05-13T16:43:48.109492205Z [2025-05-13 16:43:48] INFO: [36m📊 Instrumentation Service configured as disabled.[39m
2025-05-13T16:43:48.791880090Z [2025-05-13 16:43:48] INFO: [36mCreating default Twitter client from character settings[39m
2025-05-13T16:43:48.860871853Z [2025-05-13 16:43:48] INFO: [36mUsing cached cookies[39m
2025-05-13T16:43:49.051486919Z [2025-05-13 16:43:49] INFO: [36mSuccessfully logged in.[39m
2025-05-13T16:44:03.539544688Z [2025-05-13 16:44:03] INFO: [36mEmitted WORLD_JOINED event for Twitter account grkashani[39m
2025-05-13T16:44:03.547709048Z [32m✓ Agent Twitter Agent started successfully![0m
Expand
twitter.txt
2 KB
here are the logs
ThunderRonin — 13/05/2025, 22:26
Image
it successfully tweets
but no response to mentions
0xbbjoker — 13/05/2025, 22:28
could you try tagging the agent and see if you get the response?
ThunderRonin — 13/05/2025, 22:30
in a seperate tweet?
0xbbjoker — 13/05/2025, 22:30
hmm tbh I am not sure what you trying to do?

probably some overriding invloved yea but I would need to debug or at least see the code
0xbbjoker — 13/05/2025, 22:30
try commenting some of agents posts or tagging agent on some post
ThunderRonin — 13/05/2025, 22:32
no response
not even log
Scooter — 13/05/2025, 22:34
okay i can commit and let you take a look.  Would greatly appreciate it. Rightnow focuse don just creating my own plugin for discord so eliza has no choice but to use my reply to formatting of responses.
0xbbjoker — 13/05/2025, 22:41
I'll have a look. Point me to code.
0xbbjoker — 13/05/2025, 22:42
I would need a bit more info how did you setup. What which CMDs you are using for starting?

do you have plugin-bootstrap enabled?
ThunderRonin — 13/05/2025, 22:45
phala cloud dstack v0.3.5
deployed via compose file, private docker image barebone ElizaOS cli v1.0.0-beta.49
and yes i do
version: "3.9"

services:
  eliza:
    image: navidalvand/eliza:1.0.4
    ports: ["3000:3000"]
Expand
docker-compose.yml
1 KB
0xbbjoker — 13/05/2025, 22:53
I’ll have to check this haven’t had a setup for phala tbh
Agent Joshua ₱ — 14/05/2025, 00:09
Phala setup is the same for v1.0.0-beta.49 as the tagged release. Based on Dockerfile to publish image and docker-compose.yaml for deployment to the cloud. I've not used the Twitter plugin much for v1.0.0. Do you know what special configurations you need? Does it require the auto plugin to check mentions?
bitcryptowski.btc — 14/05/2025, 00:49
hello ppl, do i have to adapt the “plugin.ts” so that my agent posts on twitter and do the variables from the old .env now also apply to the new version? e.g. “TWITTER_DRY_RUN”?
0xbbjoker — 14/05/2025, 00:51
https://eliza.how/blog/twitter-agent-guide

The TWITTER_DRY_RUN setting is a configuration flag used in both interactions.ts and post.ts. When TWITTER_DRY_RUN is enabled (set to true), the system will log the actions it would normally take, like sending tweets or replies, but it won't actually perform these actions on Twitter.
Setting Up Your Own Twitter Agent with ElizaOS | eliza
Deploy a customized AI agent on Twitter
bitcryptowski.btc — 14/05/2025, 00:57
okay. thanks!  is it necessary to change the plugin.ts at all or is everything regulated in the index.ts and .env?
0xbbjoker — 14/05/2025, 00:58
you can just follow the instructions in the blog post.

if any issues on that road lmk.
aith — 14/05/2025, 00:58
Can anyone help me with understanding how tweet scheduling works? For instance, I want to set it so that my agent makes a tweet every 30 minutes? I set the POST_INTERNVAL_MIN but that doesn't seem to do it and I've als set TWITTER_ENABLE_POST_GENERATION=true
bitcryptowski.btc — 14/05/2025, 01:01
yes, i'm already busy. i'm asking for the future. i want my agent to be able to operate my homeassist server, for example, and i'm collecting all the necessary information here in my note.  thanks for your time! i appreciate it
0xbbjoker — 14/05/2025, 01:02
nice I am interested very much into homeassist lmk if you need some help
0xbbjoker — 14/05/2025, 01:02
TWITTER_POST_INTERVAL_MIN=30
TWITTER_POST_INTERVAL_MAX=30
aith — 14/05/2025, 01:03
I've tried that. And when I restart my server it just gives me the CLI prompt for typing an input...
Like it just says:
You:
bitcryptowski.btc — 14/05/2025, 01:07
thanks dude!
0xbbjoker — 14/05/2025, 01:13
okay I've investigated the problem and what you'll need to add in .env:

TWITTER_INTERACTION_ENABLE=true


this goes with your existing X configuration. Lmk if any further issues encountered.
aith — 14/05/2025, 01:13
Okay that's weird... it is working but the timing is off. I set it to 2 mins to test but it's generating it after 4 minutes
Regardless, post scheduling is working. Thank you
0xbbjoker — 14/05/2025, 01:14
if you wanna 2 min then:
TWITTER_POST_INTERVAL_MIN=2
TWITTER_POST_INTERVAL_MAX=2


what's your setup?
aith — 14/05/2025, 01:14
That's exactly what I have
Also, was wondering is there a way to make it so that it does not use threads and just uses one tweet for replies specifically?
0xbbjoker — 14/05/2025, 01:16
testing this
aith — 14/05/2025, 01:18
Image
generates after 4 mins
0xbbjoker — 14/05/2025, 01:21
okay I have it working each 2 minutes but prob we have some diff so let's investigate this further:
could you give me the exact steps on how you run your setup?,
I wanna replicate it on my local so I can help you,
aith — 14/05/2025, 01:21
One min let me try cleaning my node_modules and dist up and trying again
Just to see
0xbbjoker — 14/05/2025, 01:22
I think the .env setup is the problem we need to make sure which one is being read for you and does it have proper configuration
aith — 14/05/2025, 01:24
btw why does this happen? when I restart my project, it gives me this prompt... on what basis does the agent proceed with the next steps? just curious how we're doing this
Image
0xbbjoker — 14/05/2025, 01:25
ohhh I see now you are using 0.x version of elizaos..
haven't done setup with twitter client for a while now on 0.x version
https://eliza.how/blog/twitter-agent-guide
Setting Up Your Own Twitter Agent with ElizaOS | eliza
Deploy a customized AI agent on Twitter
aith — 14/05/2025, 01:26
Ohh
Let me try again with this
aith — 14/05/2025, 01:27
What of this? Is this a system prompt or can this be handled by env variables
0xbbjoker — 14/05/2025, 01:28
have it a try, should not use threads

if you want longer posts your agent gonna need verification (blue checkmark)
aith — 14/05/2025, 01:30
I was testing it with 0.x and for one reply where I @ my account, it created a thread with 3 tweets
I was trying to make it so that generating standalone tweets like that is fine but for replies it should be just one tweet
0xbbjoker — 14/05/2025, 01:31
have it a try with 1.x pls
ThunderRonin — 14/05/2025, 01:40
Thanks man, also another thing, some of the rest api endpoints appear to be broken. For example when i call send message to agent endpoint, the program crashes with an undefined entityId error. I want to connect my agents to my website for chatting. But other issues also arise regarding worlds and rooms. Since the api docs are limited and a little vague, can you provide the user flow of third party website api Integrations?
Rascar — 14/05/2025, 02:00
When I change to ElizaOs v2-develop branch, how can I create a character file that will show up in the frontend? And why when do I create a new character in the frontend and add plugins from there, they do not show in the repository?
aith — 14/05/2025, 02:06
Okay not sure what's going on here. I have the character definitions and the name changed but it still shows up as Eliza. And, it doesn't proceed further. Followed the instructions for v2 as they were here https://eliza.how/blog/twitter-agent-guide
Image
Setting Up Your Own Twitter Agent with ElizaOS | eliza
Deploy a customized AI agent on Twitter
0xbbjoker — 14/05/2025, 02:21
elizaos dev after changes instead of elizaos start
0xbbjoker — 14/05/2025, 02:22
the docs needs some update I am checking this end-point now

as far as I know the chat/messages feature in our client is using websockets

I would suggest similar if not same logic.
ThunderRonin — 14/05/2025, 02:25
Can you tell me the default websocket server address or the files for this configuration?
0xbbjoker — 14/05/2025, 02:29
end-point should be the same you just use wss

client: https://github.com/elizaOS/eliza/blob/v2-develop/packages/client/src/lib/socketio-manager.ts

server: https://github.com/elizaOS/eliza/blob/v2-develop/packages/cli/src/server/socketio/index.ts
0xbbjoker — 14/05/2025, 02:37
using the CLI:

Install the ElizaOS CLI tool:
npm install -g @elizaos/cli@beta

Create a new ElizaOS application:
elizaos create my-app

Navigate to your project directory:
cd my-app

Edit your character in the index.ts file according to your needs lmk if you need some guidance here
Start the development server:
elizaos dev
[ai16z] <dankvr>
APP
 — 14/05/2025, 04:13
Image
https://elizaos.github.io/
ElizaOS Leaderboard
Stats for GitHub contributors to Eliza
so good, daily / weekly / monthly  github repo updates
[ai16z] <.starlord0>
APP
 — 14/05/2025, 05:02
hi im getting issues on being stuck here
2025-05-13 23:05:57] INFO: Using local AI configuration:
    LOCAL_SMALL_MODEL: "DeepHermes-3-Llama-3-3B-Preview-q4.gguf"
    LOCAL_LARGE_MODEL: "DeepHermes-3-Llama-3-8B-q4.gguf"
    LOCAL_EMBEDDING_MODEL: "bge-small-en-v1.5.Q4_K_M.gguf"
    LOCAL_EMBEDDING_DIMENSIONS: 384
[2025-05-13 23:05:57] INFO: MODELS_DIR environment variable not set, using default models directory: /Users/david/.eliza/models
[2025-05-13 23:05:57] INFO: Using small model path: DeepHermes-3-Llama-3-3B-Preview-q4.gguf
[2025-05-13 23:05:57] INFO: Using medium model path: DeepHermes-3-Llama-3-8B-q4.gguf
[2025-05-13 23:05:57] INFO: Using embedding model path: bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-13 23:05:57] INFO: Environment configuration validated and model paths set"

or here for dev
elizaos] Resolved .env file from: /workspace/elizasales/.env
[2025-05-13 23:25:17] INFO: 📊 Instrumentation Service configured as disabled.
[2025-05-13 23:25:17] INFO: Initializing character
Warning: Example plugin variable is not provided
INFO: Name:  Eliza
 INFO: Initializing environment configuration...
INFO: Using local AI configuration:
    LOCAL_SMALL_MODEL: "DeepHermes-3-Llama-3-3B-Preview-q4.gguf"
    LOCAL_LARGE_MODEL: "DeepHermes-3-Llama-3-8B-q4.gguf"
    LOCAL_EMBEDDING_MODEL: "bge-small-en-v1.5.Q4_K_M.gguf"
    LOCAL_EMBEDDING_DIMENSIONS: 384
[2025-05-13 23:25:17] INFO: MODELS_DIR environment variable not set, using default models directory: /root/.eliza/models
[2025-05-13 23:25:17] INFO: Using small model path: DeepHermes-3-Llama-3-3B-Preview-q4.gguf
[2025-05-13 23:25:17] INFO: Using medium model path: DeepHermes-3-Llama-3-8B-q4.gguf
[2025-05-13 23:25:17] INFO: Using embedding model path: bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-13 23:25:17] INFO: Environment configuration validated and model paths set

[2025-05-13 23:25:17] INFO:  Initializing starter plugin
[2025-05 <clipped message>
it just gets tuck and nothing happens at all.
0xbbjoker — 14/05/2025, 05:17
could you please elaborate which steps did you take?
npm i -g @elizaos/cli@beta  try udpate the CLI,
check version: elizaos --version,
make sure you are at latest: 1.0.0-beta.49,

if you wanna see debug logs: LOG_LEVEL=debug elizaos start
jonas — 14/05/2025, 05:20
It might be that the model doesn't run on your architecture; I think I've had that as well at some point. If you just want to get running and don't need a local model, provide an OpenAI or Anthropic API key, then it won't try to use a local model.
Hey, I'm trying to set up a X/Twitter monitor that simply forwards all matching tweets to a discord channel. Is that something that should work out of the box?
I can get my agent to reply on X if I post something there, and on Discord if I post something there, but it seems like the cross-posting doesn't work. If I ask it in the ElizaOS chat interface it says it can't access latest tweets, and it can't post anything on discord either.
So, individually all channels work, but transferring info doesn't 😕
(currently I'm still on the beta, but I've also tried with alpha and I think it has the same issue...)
0xbbjoker — 14/05/2025, 05:37
doesn't work out of the box

you'll need custom code to bridge them
Hidden Forces — 14/05/2025, 06:13
any have more info on setting up Supabase besides the Github page?  Running into problems setting up the tables.
0xbbjoker — 14/05/2025, 06:28
what's your issue with tables setup?
Hidden Forces — 14/05/2025, 06:38
My issue is I have no idea how to set up the tables for interaction with the agent in Supabase.


[2025-05-14 01:03:03] ERROR: Failed to initialize: insert or update on table "rooms" violates foreign key constraint "rooms_agentId_agents_id_fk"
    agentName: "Eliza Lead"
    agentId: "c574b6d6-5f5a-0e80-b02c-9c2b08ae4429"
[2025-05-14 01:03:03] ERROR: An error occurred:
    message: "(error) insert or update on table \"rooms\" violates foreign key constraint \"rooms_agentId_agents_id_fk\""
    stack: [
      "error: insert or update on table \"rooms\" violates foreign key constraint \"rooms_agentId_agents_id_fk\"",
      "at new E (C:\eliza\node_modules\@electric-sql\pglite\dist\chunk-EADU5A67.js)",
      "at Ve (C:\eliza\node_modules\@electric-sql\pglite\dist\chunk-EADU5A67.js)",
      "at parse (C:\eliza\node_modules\@electric-sql\pglite\dist\chunk-EADU5A67.js)",
      "at <anonymous> (C:\eliza\node_modules\@electric-sql\pglite\dist\index.js:3:239489)",
      "at processTicksAndRejections (native:7:39)"
    ]
[2025-05-14 01:03:03] ERROR: Error details: insert or update on table "rooms" violates foreign key constraint "rooms_agentId_agents_id_fk"
[2025-05-14 01:03:03] ERROR: Stack trace: error: insert or update on table "rooms" violates foreign key constraint "rooms_agentId_agents_id_fk"
    at new E (C:\eliza\node_modules\@electric-sql\pglite\dist\chunk-EADU5A67.js)
    at Ve (C:\eliza\node_modules\@electric-sql\pglite\dist\chunk-EADU5A67.js)
    at parse (C:\eliza\node_modules\@electric-sql\pglite\dist\chunk-EADU5A67.js)
    at <anonymous> (C:\eliza\node_modules\@electric-sql\pglite\dist\index.js:3:239489)
    at processTicksAndRejections (native:7:39)
error: script "start" exited with code 1
error: script "start" exited with code 1

0xbbjoker — 14/05/2025, 06:42
this using pglite and it's by default ig

tables are setup correctly the error is constraint on table

what's the version you are running? you have some custom code?
Hidden Forces — 14/05/2025, 06:50
"this using pglite and it's by default ig"

I don't understand that statement.

"tables are setup correctly the error is constraint on table"

This error was before any tables were set up on the Supabase project.

These are the SQL commands I used to create an agent table and a room table after:

CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);


CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agentId UUID REFERENCES agents(id) ON DELETE CASCADE,
  room_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);


"what's the version you are running? you have some custom code?"

I'm literally just trying to set up the most basic agent on v2 with the most basic character file.  Haven't added any code at all.  All I want is to get an agent up and running before I start adding anything.
Maybe I should skip Supabase altogether but I just don't know how to set up a permanent database for chunks I want the agent to have access to, using the default data management system of Eliza
0xbbjoker — 14/05/2025, 06:58
let's see if this can help you: https://www.youtube.com/watch?v=-4sp4ZncMWc

skip the setup for twitter if you don't need it

try adding knowledge from GUI, when you spin up the agent
Hidden Forces — 14/05/2025, 07:03
Not sure about the GUI - I've only seen the default GUI at localhost:3000 but that interface doesn't function correctly for me.  I'll check out the Youtube video and come back with any questions.  Thanks for your help!!!
Scooter — 14/05/2025, 07:24
Do you need to register your custom plugins for the runtime to use them?
I created a cusom one with actions but the runtime doesn't seem to see them at all.
0xbbjoker — 14/05/2025, 07:28
example:

https://github.com/elizaOS/eliza/blob/v2-develop/packages/the-org/src/investmentManager/index.ts#L246
Scooter — 14/05/2025, 07:31
I have my cutom plugin imported to the index.ts
0xbbjoker — 14/05/2025, 07:36
do you see anything in logs, you can try starting with: LOG_LEVEL=debug elizaos start
0xbbjoker — 14/05/2025, 07:37
Image
Scooter — 14/05/2025, 07:38
Image
0xbbjoker — 14/05/2025, 07:42
that doesn't tell a lot I would search for Registering Action in terminal
LemonS — 14/05/2025, 08:22
is the open router plugin working?
if I add it to my character it says All installation attempts failed for plugin @elizaos/plugin-openrouter
https://github.com/elizaos-plugins/plugin-openrouter
GitHub
GitHub - elizaos-plugins/plugin-openrouter
Contribute to elizaos-plugins/plugin-openrouter development by creating an account on GitHub.
Contribute to elizaos-plugins/plugin-openrouter development by creating an account on GitHub.
[ai16z] <.starlord0>
APP
 — 14/05/2025, 09:31
hi im getting issues on being stuck here
2025-05-13 23:05:57] INFO: Using local AI configuration:
    LOCAL_SMALL_MODEL: "DeepHermes-3-Llama-3-3B-Preview-q4.gguf"
    LOCAL_LARGE_MODEL: "DeepHermes-3-Llama-3-8B-q4.gguf"
    LOCAL_EMBEDDING_MODEL: "bge-small-en-v1.5.Q4_K_M.gguf"
    LOCAL_EMBEDDING_DIMENSIONS: 384
[2025-05-13 23:05:57] INFO: MODELS_DIR environment variable not set, using default models directory: /Users/david/.eliza/models
[2025-05-13 23:05:57] INFO: Using small model path: DeepHermes-3-Llama-3-3B-Preview-q4.gguf
[2025-05-13 23:05:57] INFO: Using medium model path: DeepHermes-3-Llama-3-8B-q4.gguf
[2025-05-13 23:05:57] INFO: Using embedding model path: bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-13 23:05:57] INFO: Environment configuration validated and model paths set"

or here for dev
elizaos] Resolved .env file from: /workspace/elizasales/.env
[2025-05-13 23:25:17] INFO: 📊 Instrumentation Service configured as disabled.
[2025-05-13 23:25:17] INFO: Initializing character
Warning: Example plugin variable is not provided
INFO: Name:  Eliza
 INFO: Initializing environment configuration...
INFO: Using local AI configuration:
    LOCAL_SMALL_MODEL: "DeepHermes-3-Llama-3-3B-Preview-q4.gguf"
    LOCAL_LARGE_MODEL: "DeepHermes-3-Llama-3-8B-q4.gguf"
    LOCAL_EMBEDDING_MODEL: "bge-small-en-v1.5.Q4_K_M.gguf"
    LOCAL_EMBEDDING_DIMENSIONS: 384
[2025-05-13 23:25:17] INFO: MODELS_DIR environment variable not set, using default models directory: /root/.eliza/models
[2025-05-13 23:25:17] INFO: Using small model path: DeepHermes-3-Llama-3-3B-Preview-q4.gguf
[2025-05-13 23:25:17] INFO: Using medium model path: DeepHermes-3-Llama-3-8B-q4.gguf
[2025-05-13 23:25:17] INFO: Using embedding model path: bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-13 23:25:17] INFO: Environment configuration validated and model paths set

[2025-05-13 23:25:17] INFO:  Initializing starter plugin
[2025-05 <clipped message>
Scooter — 14/05/2025, 11:24
How can you import a custom plugin sitting in your project directory in place of an eliza core plugin?
sayonara — 14/05/2025, 12:18
https://github.com/elizaOS/eliza/blob/6485dab28782e44912485cfbe41ffc289a1c8e77/packages/project-starter/src/index.ts#L351


like this
GitHub
eliza/packages/project-starter/src/index.ts at 6485dab28782e4491248...
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
Autonomous agents for everyone. Contribute to elizaOS/eliza development by creating an account on GitHub.
[ai16z] <fatevcg>
APP
 — 14/05/2025, 12:43
[2025-05-14 07:11:31] INFO: Installation successful for @elizaos/plugin-local-ai, verifying import...
[2025-05-14 07:11:31] WARN: Failed to load plugin module '@elizaos/plugin-local-ai' using all available strategies.
[2025-05-14 07:11:31] WARN: Plugin @elizaos/plugin-local-ai installed : but could not be loaded/verified.
[2025-05-14 07:11:31] ERROR: All installation attempts failed for plugin @elizaos/plugin-local-ai

I think I've followed the instructions clearly. why is it not installing the plugins even if I install them manually?
sayonara — 14/05/2025, 13:06
elizaos --version
share that plz
[ai16z] <bilal55_>
APP
 — 14/05/2025, 13:26
I try to install eliza os packages it give me these error, how can i fix that error:
client#build: command (E:\optimum\eliza\client) E:\optimum\eliza\node_modules\.bin\pnpm.CMD run build exited (2)

 Tasks:    2 successful, 6 total
Cached:    2 cached, 6 total
  Time:    17.414s
Failed:    client#build

 ERROR  run failed: command  exited (2)
ai16z-bridge-odi
APP
 — 14/05/2025, 13:27
[ai16z] <crazyaltaccount3176> Have you been able to rectify this issue?
[ai16z] <bilal55_>
APP
 — 14/05/2025, 13:27
yes i can
I run the pnpm build command and on last it through this
client:build
 error
ai16z-bridge-odi
APP
 — 14/05/2025, 13:29
[ai16z] <crazyaltaccount3176> Check your dm have send you the guideline to help you and fix this issue
[ai16z] <bilal55_>
APP
 — 14/05/2025, 13:35
Hi @crazyaltaccount3176 i can't receive your message for guideline  related
@crazyaltaccount3176 ??
bitcryptowski.btc — 14/05/2025, 13:48
gm frens.  is style:post still valid?
oder just style:all and style:chat?
sayonara — 14/05/2025, 14:21
might be scam
bitcryptowski.btc — 14/05/2025, 18:00
if i change my index.ts, the agent settings at http://localhost:3001/ remain unchanged. is this normal?
0xbbjoker — 14/05/2025, 18:01
probably build needs to be exectued try running with elizaos dev
bitcryptowski.btc — 14/05/2025, 18:03
shouldn't it then also be the case that if I make changes in the dashboard, these also appear in index.ts?
Acul — 14/05/2025, 18:05
Does routing to a static page work in v2? I've created the simple html page, create a route with correct location of html file, but when I go to the URL ,, it does says page not found
Scooter — 14/05/2025, 19:20
what about the plugin itself.  How to export?
sayonara — 14/05/2025, 19:21
https://github.com/elizaOS/eliza/blob/6485dab28782e44912485cfbe41ffc289a1c8e77/packages/project-starter/src/plugin.ts#L253
you a dev?
Jz — 14/05/2025, 19:25
For V2, how would I extend plugin-bootstrap, specifically customizing provider behavior such as anxiety.
With plugin-bootstrap for example, is the agent gauranteed to use all of the providers. I remember from the only V2 dev school video, with Shaw mentioning how the agent could make its own decisions about which providers to use.
Scooter — 14/05/2025, 19:26
thsi doesnt help lol
0xbbjoker — 14/05/2025, 19:26
look here: https://github.com/elizaOS/eliza/blob/v2-develop/packages/plugin-bootstrap/src/index.ts#L356

this is where the selected providers are being filtered by agent selection
0xbbjoker — 14/05/2025, 19:28
look into the composeState https://github.com/elizaOS/eliza/blob/v2-develop/packages/core/src/runtime.ts#L1630

here you'll see diff for example how can you have dynamic provider good example is knowledge: https://github.com/elizaOS/eliza/blob/v2-develop/packages/plugin-bootstrap/src/providers/knowledge.ts
Scooter — 14/05/2025, 19:59
[2025-05-14 14:25:43] ERROR: Error importing module: SyntaxError: The requested module '@Elizaos/core' does not provide an export named 'ModelClass'


Getting this during cli update
aith — 14/05/2025, 20:14
I have done that but whenever I run the project it says:
Using default Eliza character with all plugins

And defaults to the Eliza agent even though I have changed it to my own. I changed the character config in the index.ts
Scooter — 14/05/2025, 20:17
Should custom plugin being imported from a local folder in my project directory should I have anything representing that in dependencies in the package.json?
0xbbjoker — 14/05/2025, 20:17
could you pls share your code so I can help you? it's not clear to me what's happening on your side without seeing the code.
Scooter — 14/05/2025, 20:18
you can jump on a quick call?
aith — 14/05/2025, 20:20
Image
It keeps defaulting to the "Eliza" agent and not the one that I updated it to. I've even changed the name of the agent in the index.ts
Scooter — 14/05/2025, 20:25
would be super sick if you updated the discord plugin to format responses as mentions
that's  why I needed to customize it and I did but for some reason not working locally and trying to be imported as an NPM package
0xbbjoker — 14/05/2025, 20:31
show me the code and also start with:
LOG_LEVEL=debug elizaos dev ,
send me the output logs,
0xbbjoker — 14/05/2025, 20:33
It's really not clear to me what's going on your side. Would be much better if you can share the code.

If you wanna keep it private you can add my handle or share the snippet as doc here?
aith — 14/05/2025, 20:33
export const character: Character = {
  name: 'OrbitAgent',
  plugins: [
    '@elizaos/plugin-sql',
    ...(process.env.OPENAI_API_KEY ? ['@elizaos/plugin-openai'] : []),
    ...(process.env.ANTHROPIC_API_KEY ? ['@elizaos/plugin-anthropic'] : []),
    ...(!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY
      ? ['@elizaos/plugin-local-ai']
      : []),
    ...(process.env.DISCORD_API_TOKEN ? ['@elizaos/plugin-discord'] : []),
    ...(process.env.TWITTER_USERNAME ? ['@elizaos/plugin-twitter'] : []),
    ...(process.env.TELEGRAM_BOT_TOKEN ? ['@elizaos/plugin-telegram'] : []),
    ...(!process.env.IGNORE_BOOTSTRAP ? ['@elizaos/plugin-bootstrap'] : []),
  ],


I have it like this and the config continues further with everything changed. This was working fine in 0.x version (although I was specifying it via the orbitagent.character.json file when starting the project pnpm start --character="characters/orbitagent.character.json"
0xbbjoker — 14/05/2025, 20:34
show me the logs
full logs for the LOG_LEVEL=debug elizaos dev
aith — 14/05/2025, 21:00
Can I dm you the logs?
Scooter — 14/05/2025, 21:02
Can you import the discord plugin from core then extend it in src/plugin.ts?
0xbbjoker — 14/05/2025, 21:18
sure
Scooter — 14/05/2025, 21:33
Also is it better to install all of Eliza instead of using cli when extending plugins?
Or does it matter?
Scooter — 14/05/2025, 21:50
Apparently you can flag --plugin at start
Odilitime — 14/05/2025, 22:54
I like cloning the v2-develop, just gives me access to all the code, so I can console log any process to understand it better
But the plugins are being moved out, so I still have to install all the plugins
Scooter — 14/05/2025, 23:31
thank you this is helpful.    Do you reocommend NPX or NPM install for using the CLI if you are doing a fari bit of custom code?
Odilitime — 14/05/2025, 23:32
bun
Er npx for the CLI I guess
Scooter — 14/05/2025, 23:48
So the elizaOS/eliza repo on github is V2? Or is only the CLI using V2?
Odilitime — 15/05/2025, 00:21
main is 0.x (v1)
and v2-develop is 1.x (v2)
I think npx elizaos is 1.x
[ai16z] <.starlord0>
APP
 — 15/05/2025, 00:23
hi im getting issues on being stuck here
2025-05-13 23:05:57] INFO: Using local AI configuration:
    LOCAL_SMALL_MODEL: "DeepHermes-3-Llama-3-3B-Preview-q4.gguf"
    LOCAL_LARGE_MODEL: "DeepHermes-3-Llama-3-8B-q4.gguf"
    LOCAL_EMBEDDING_MODEL: "bge-small-en-v1.5.Q4_K_M.gguf"
    LOCAL_EMBEDDING_DIMENSIONS: 384
[2025-05-13 23:05:57] INFO: MODELS_DIR environment variable not set, using default models directory: /Users/david/.eliza/models
[2025-05-13 23:05:57] INFO: Using small model path: DeepHermes-3-Llama-3-3B-Preview-q4.gguf
[2025-05-13 23:05:57] INFO: Using medium model path: DeepHermes-3-Llama-3-8B-q4.gguf
[2025-05-13 23:05:57] INFO: Using embedding model path: bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-13 23:05:57] INFO: Environment configuration validated and model paths set"

or here for dev
elizaos] Resolved .env file from: /workspace/elizasales/.env
[2025-05-13 23:25:17] INFO: 📊 Instrumentation Service configured as disabled.
[2025-05-13 23:25:17] INFO: Initializing character
Warning: Example plugin variable is not provided
INFO: Name:  Eliza
 INFO: Initializing environment configuration...
INFO: Using local AI configuration:
    LOCAL_SMALL_MODEL: "DeepHermes-3-Llama-3-3B-Preview-q4.gguf"
    LOCAL_LARGE_MODEL: "DeepHermes-3-Llama-3-8B-q4.gguf"
    LOCAL_EMBEDDING_MODEL: "bge-small-en-v1.5.Q4_K_M.gguf"
    LOCAL_EMBEDDING_DIMENSIONS: 384
[2025-05-13 23:25:17] INFO: MODELS_DIR environment variable not set, using default models directory: /root/.eliza/models
[2025-05-13 23:25:17] INFO: Using small model path: DeepHermes-3-Llama-3-3B-Preview-q4.gguf
[2025-05-13 23:25:17] INFO: Using medium model path: DeepHermes-3-Llama-3-8B-q4.gguf
[2025-05-13 23:25:17] INFO: Using embedding model path: bge-small-en-v1.5.Q4_K_M.gguf
[2025-05-13 23:25:17] INFO: Environment configuration validated and model paths set

[2025-05-13 23:25:17] INFO:  Initializing starter plugin
[2025-05 <clipped message>
[ai16z] <odilitime>
APP
 — 15/05/2025, 00:24
so 1.x
what do you mean stuck? no more output? because that's correct
[ai16z] <.starlord0>
APP
 — 15/05/2025, 00:25
no more output is correct? but the plugins connected don’t start?
Scooter — 15/05/2025, 00:39
If you need to add functionality to the existing Discord plugin do you extend it in index.ts while NPXing the plugin?  Or do you bring in the entire plugin code, modify it then run  eliza like this  start --plugins=./path/to/plugin?
cjft — 15/05/2025, 00:50
I think this not latest version, Instrumentation Service configured as disabled. should not be showing anymore
plz pull latest, beta.51
[ai16z] <.starlord0>
APP
 — 15/05/2025, 01:02
i just do it all via the cli so no ion add functionality just the eliza plugin add xxx then elizaos start
Odilitime — 15/05/2025, 01:23
Bring the whole repo in is what I’d do
ai16z-bridge-odi
APP
 — 15/05/2025, 01:23
[ai16z] <odilitime> Yes unless you’re in debug
Ramiroo — 15/05/2025, 03:35
Hey! I'm trying to get my bot to reply to tweets from certain users (whose handles I already put in the .env) and it's not registering X's activity. I know it can post since I got it to make a post using the client, what could be going wrong?
Odilitime — 15/05/2025, 03:35
is this 1.x or 0.x?
Ramiroo — 15/05/2025, 03:36
How could I check that? I'm a noob
If you are talking ab the model it should be the last one that was updated, I cloned the github today
Odilitime — 15/05/2025, 03:38
are you using the main branch?
Ramiroo — 15/05/2025, 03:38
I think so

I used git clone https://github.com/elizaos/eliza.git
Odilitime — 15/05/2025, 03:41
git branch -v should tell you main
Ramiroo — 15/05/2025, 03:41
Yep I'm on main
Odilitime — 15/05/2025, 03:41
ok so that's 0.x
you installed the client-twitter plugin?
Ramiroo — 15/05/2025, 03:42
I think so, chat gpt helped me with that part so I'm kinda sketchy about that, I did manage to post from the localhost client
Odilitime — 15/05/2025, 03:42
https://github.com/elizaos-plugins/client-twitter/blob/main/src/environment.ts has some information about the available settings
GitHub
client-twitter/src/environment.ts at main · elizaos-plugins/client...
This package integrates Twitter/X with the Eliza AI agent, enabling post generation, interaction handling, search functionality, Twitter Spaces support, and an optional approval workflow via Discor...
client-twitter/src/environment.ts at main · elizaos-plugins/client...
https://github.com/elizaOS-plugins/client-twitter has a README too
GitHub
GitHub - elizaos-plugins/client-twitter: This package integrates Tw...
This package integrates Twitter/X with the Eliza AI agent, enabling post generation, interaction handling, search functionality, Twitter Spaces support, and an optional approval workflow via Discor...
This package integrates Twitter/X with the Eliza AI agent, enabling post generation, interaction handling, search functionality, Twitter Spaces support, and an optional approval workflow via Discor...
Ramiroo — 15/05/2025, 03:43
If I managed to get a post it should be working right?
Odilitime — 15/05/2025, 03:43
https://eliza.how/docs/0.25.9/faq#twitterx-integration has some stuff too
Frequently Asked Questions | eliza
What is Eliza?
Odilitime — 15/05/2025, 03:43
means it's logged in
ENABLE_ACTION_PROCESSING is off by default
I think it was getting people banned
I think if it's making posts, it should reply to people that reply to posts

LemonS — 15/05/2025, 06:01
im using 1.0.0-beta.51 for everything
Odilitime — 15/05/2025, 06:01
plugin-twitter just adds some twitter functionality but is not how you get it to post
[ai16z] <tragicboyjay>
APP
 — 15/05/2025, 06:02
I will add the plugin and let oyou know but this seems to be what i might need cause tweets are working but the othe rfunctionality isn't
Odilitime — 15/05/2025, 06:02
well your cli or core, you're launch isnt beta.51
Ramiroo — 15/05/2025, 06:15
Is this ok?
Image
ai16z-bridge-odi
APP
 — 15/05/2025, 06:15
[ai16z] <tragicboyjay> the tweeting works but the added variables don't seem to be effecting the agent fpr example ENABLE_TWITTER_POST_GENERATION=false  but it still tweets. i've added the "@elizaos-plugins/client-twitter" to tyhe pluggins array
Odilitime — 15/05/2025, 06:19
yes, I think so
Ramiroo — 15/05/2025, 06:20
I already installed the client-twitter plugin, but it's still not showing any logs or signs that it's working when I build and start my character
ai16z-bridge-odi
APP
 — 15/05/2025, 06:21
[ai16z] <.starlord0> bump @Odilitime
ai16z-bridge-odi
APP
 — 15/05/2025, 06:21
[ai16z] <odilitime> hrm https://github.com/elizaos-plugins/client-twitter/blob/5f5d86c358929cebf884a8a5711386d5c54ccd11/src/post.ts#L767
GitHub
client-twitter/src/post.ts at 5f5d86c358929cebf884a8a5711386d5c54cc...
This package integrates Twitter/X with the Eliza AI agent, enabling post generation, interaction handling, search functionality, Twitter Spaces support, and an optional approval workflow via Discor...
This package integrates Twitter/X with the Eliza AI agent, enabling post generation, interaction handling, search functionality, Twitter Spaces support, and an optional approval workflow via Discor...
[ai16z] <odilitime>
APP
 — 15/05/2025, 06:21
parseBooleanFromText is called on it, so false should turn it off
many your POST_INTERVAL_MIN is just low
because once that timer fires, it will make a post
LemonS — 15/05/2025, 06:22
ty, reinstalled dependencies and now it works
[ai16z] <odilitime>
APP
 — 15/05/2025, 06:22
n/m, ENABLE_TWITTER_POST_GENERATION controls the loop, so MIN is not in play
however if you have POST_IMMEDIATELY on, it will make a post on start up, even if ENABLE_TWITTER_POST_GENERATION is disabled
might want to consider DRY_RUN if you don't want to make posts
ai16z-bridge-odi
APP
 — 15/05/2025, 06:24
[ai16z] <odilitime> what's your character plugins say?
ai16z-bridge-odi
APP
 — 15/05/2025, 06:25
[ai16z] <.starlord0> via elizaos add plugin? all the base ones +plugin-discord(if thats not included) confirmed via the CLI and bun
ai16z-bridge-odi
APP
 — 15/05/2025, 06:26
[ai16z] <tragicboyjay> I do want to make posts i was just saying the tweeting works the otehr env variables don't seem to be wokring I could be wrong but like if i put post genration off that should stop it from posting right but it doesn't leading me to belive it is not weorking ciorrectly
ai16z-bridge-odi
APP
 — 15/05/2025, 06:27
[ai16z] <odilitime> are you on 0.x or 1.x? because plugin-discord is 1.x and all these other guys are 0.x
[ai16z] <.starlord0>
APP
 — 15/05/2025, 06:28
im on 1.x
all the core plugins are 0.x?
ai16z-bridge-odi
APP
 — 15/05/2025, 06:28
[ai16z] <tragicboyjay> here are my env variables on the main repo
TWITTER_POLL_INTERVAL=120   # How often (in seconds) the bot should check for interactions
TWITTER_SEARCH_ENABLE=FALSE # Enable timeline search, WARNING this greatly increases your chance of getting banned
TWITTER_TARGET_USERS=       # Comma separated list of Twitter user names to interact with
TWITTER_RETRY_LIMIT=        # Maximum retry attempts for Twitter login
TWITTER_SPACES_ENABLE=false # Enable or disable Twitter Spaces logic
ENABLE_TWITTER_POST_GENERATION=true # Set to true to enable automatic tweet generation. If false, the bot will not generate or post tweets.
Post Interval Settings (in minutes),
POST_INTERVAL_MIN=1 # Default: 90
POST_INTERVAL_MAX=3 # Default: 180
POST_IMMEDIATELY=true  # Default: false
Twitter action processing configuration,
ACTION_INTERVAL=               # Interval in minutes between action processing runs (default: 5 minutes)
ENABLE_ACTION_PROCESSING=false # Set to true to enable the action processing loop
MAX_ACTIONS_PROCESSING=1       # Maximum number of actions (e.g., retweets, likes) to process in a single cycle. Helps prevent excessive or uncontrolled actions.
ACTION_TIMELINE_TYPE=foryou    # Type of timeline to interact with. Options: "foryou" or "following". Default: "foryou" and i sttill don't see posts should iu just leave itr ofr night and see if it posts?
ai16z-bridge-odi
APP
 — 15/05/2025, 06:28
[ai16z] <odilitime> no
[ai16z] <.starlord0>
APP
 — 15/05/2025, 06:29
ok well, these are all the plugins I got from the CLI │  === Available plugins
@elizaos/plugin-anthropic
@elizaos/plugin-bootstrap
@elizaos/plugin-browser
@elizaos/plugin-discord
@elizaos/plugin-evm
@elizaos/plugin-farcaster
@elizaos/plugin-groq
@elizaos/plugin-local-ai
@elizaos/plugin-openai
@elizaos/plugin-pdf
@elizaos/plugin-redpill
@elizaos/plugin-s3-storage
@elizaos/plugin-solana
@elizaos/plugin-sql
@elizaos/plugin-telegram
@elizaos/plugin-twitter
@elizaos/plugin-venice
@elizaos/plugin-video-understanding
ai16z-bridge-odi
APP
 — 15/05/2025, 06:30
[ai16z] <odilitime> and you problem is you're expecting the output to say more?
ai16z-bridge-odi
APP
 — 15/05/2025, 06:31
[ai16z] <odilitime> those all look like 1.x plugins to me
ai16z-bridge-odi
APP
 — 15/05/2025, 06:31
[ai16z] <.starlord0> well yes, because as it is it doesnt seem the bot loaded up fully and or the plugins themselves arnt loading up
[ai16z] <odilitime>
APP
 — 15/05/2025, 06:32
is the web interface up and working?
[ai16z] <.starlord0>
APP
 — 15/05/2025, 06:32
well i cant really check that because I run it on a virtual linux machine with a GPU on it. Thats why Im tryin to connect via Discord
[ai16z] <odilitime>
APP
 — 15/05/2025, 06:33
and it's not connecting to discord
[ai16z] <.starlord0>
APP
 — 15/05/2025, 06:33
no
local envs and everythin is set. really dont understand what the issue is
jin — 15/05/2025, 06:34
those PRs that bundle an update to docs but also add in package.json updates kinda weird
[ai16z] <odilitime>
APP
 — 15/05/2025, 06:34
what plugins do you have in your character file?
jin — 15/05/2025, 06:34
if sending a PR, just focus on the main PR topic
ai16z-bridge-odi
APP
 — 15/05/2025, 06:35
[ai16z] <odilitime> ok you do say you have plugin-discord enabled
[ai16z] <odilitime>
APP
 — 15/05/2025, 06:35
hrm just needs DISCORD_API_TOKEN
[ai16z] <.starlord0>
APP
 — 15/05/2025, 06:36
defined enabled? its not in the character file but in index so should spin up on every load
export const character: Character = {
  name: 'Eliza',
  plugins: [
    '@elizaos/plugin-sql',
    ...(process.env.OPENAI_API_KEY ? ['@elizaos/plugin-openai'] : []),
    ...(process.env.ANTHROPIC_API_KEY ? ['@elizaos/plugin-anthropic'] : []),
    ...(!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY
      ? ['@elizaos/plugin-local-ai']
      : []),
    ...(process.env.DISCORD_API_TOKEN ? ['@elizaos/plugin-discord'] : []),
ai16z-bridge-odi
APP
 — 15/05/2025, 06:36
[ai16z] <.starlord0> which is properly set
[ai16z] <.starlord0>
APP
 — 15/05/2025, 06:36
confirmed via cli
[ai16z] <odilitime>
APP
 — 15/05/2025, 06:37
if you run it with LOG_LEVEL=debug, you should get a final loaded plugins which can confirm:

[2025-05-15 00:58:04] DEBUG: Final loaded plugins (16): mysql, anthropic, openai, discord, telegram, twitter, pdf, video-understanding, bootstrap, solana, plugin-birdeye, coinmarketcap, coingecko, AppDev, spartanOS, Multitenant custodial wallet services is what mine says
[ai16z] <.starlord0>
APP
 — 15/05/2025, 06:37
ok ill rerun with that and update
[ai16z] <tragicboyjay>
APP
 — 15/05/2025, 06:45
I belive this is why main isn't sending tweetes Failed to import plugin: @elizaos-plugins/client-twitter Error: Cannot find package '@elizaos-plugins/client-twitter' imported from
ai16z-bridge-odi
APP
 — 15/05/2025, 06:46
[ai16z] <odilitime> npx elizaos plugins install @elizaos-plugins/client-twitter
[ai16z] <b0nes5733>
APP
 — 15/05/2025, 06:48
What’s the cheapest place to host I’m hosting on digital ocean it’s like 45 bucks a month curious if there are cheaper options
ai16z-bridge-odi
APP
 — 15/05/2025, 06:51
[ai16z] <tragicboyjay> you're a saviour thank you
ai16z-bridge-odi
APP
 — 15/05/2025, 06:56
[ai16z] <odilitime> check out ovh and hetzner
and there's also https://lowendbox.com/
LowEndBox
LowEndBox
Cheap VPS Hosting, Dedicated Servers & Web Hosting Providers Listing & Reviews. Discussions on how to host websites on bare minimum VPS.
LowEndBox
ai16z-bridge-odi
APP
 — 15/05/2025, 06:56
[ai16z] <b0nes5733> Awesome thanks!
[ai16z] <tragicboyjay>
APP
 — 15/05/2025, 07:04
what env variable controls the amount of times it will answer i notice after like 3 tweets back and forth it will stop answering and how do i get the loop of it looking for mentions to be faster? @Odilitime
[ai16z] <odilitime>
APP
 — 15/05/2025, 07:04
never seen that, maybe your IGNORE action is firing
I think ACTION_INTERVAL controls how fast it replies for client-twitter
ai16z-bridge-odi
APP
 — 15/05/2025, 07:05
[ai16z] <tragicboyjay> found it thank you
ai16z-bridge-odi
APP
 — 15/05/2025, 07:40
[ai16z] <.starlord0> seems the issue was the started service, it just paused once it got to that step, have to check out what it’s used for exactly but upon removing it on init everything bc works so thanks
[ai16z] <odilitime>
APP
 — 15/05/2025, 07:51
started service?
[ai16z] <tragicboyjay>
APP
 — 15/05/2025, 08:18
where do you guys host your eliza agents?
ai16z-bridge-odi
APP
 — 15/05/2025, 08:19
[ai16z] <.starlord0> yes this export class StarterService extends Service {
  static serviceType = 'starter';
  capabilityDescription =
    'This is a starter service which is attached to the agent through the starter plugin.';
  constructor(protected runtime: IAgentRuntime) {
    super(runtime);
  }

  static async start(runtime: IAgentRuntime) {
    logger.info(' Starting starter service ');
    const service = new StarterService(runtime);
    return service;
  }

  static async stop(runtime: IAgentRuntime) {
    logger.info(' Stopping starter service ');
    // get the service from the runtime
    const service = runtime.getService(StarterService.serviceType);
    if (!service) {
      throw new Error('Starter service not found');
    }
    service.stop();
  }

  async stop() {
    logger.info(' Stopping starter service instance ');
  }
}
[ai16z] <odilitime>
APP
 — 15/05/2025, 08:22
ah default project
aith — 15/05/2025, 09:04
Are there any examples on how to fine tune a character for Twitter agent? The custom instructions for the character file are good but I saw that we can tune it further as well however, I am not sure how that would work. An example to see it in action would really be helpful.
LemonS — 15/05/2025, 09:18
Can I get some help understanding how I can make this work? Im trying to add knoledge to an agent to answer about magic the gathering rules, looking in debug mode, it looks like its getting at some point some good answers like when asked

what happens if I lightning bolt a blood moon

DEBUG: [Bootstrap] *** Raw LLM Response ***
 <response>
    <thought>The user is asking what happens if they cast Lightning Bolt targeting Blood Moon. Lightning Bolt can only target a creature or player. Blood Moon is an enchantment. Therefore, Lightning Bolt cannot target Blood Moon. I will state this. I need to consult my knowledge of card types and targeting rules.</thought>
    <actions>REPLY</actions>
    <providers>KNOWLEDGE</providers>
    <text>Lightning Bolt cannot target Blood Moon. Lightning Bolt may only target a creature or a player. Blood Moon is an enchantment.</text>
    <simple>false</simple>
</response>

DEBUG: [useModel] TEXT_LARGE output: "<response>\n    <thought>The user is asking what happens if they cast Lightning Bolt targeting Blood Moon. Lightning Bolt can only target a creature or player. Blood Moon is an enchantment. Therefore, Lightning Bolt cannot target Blood Moon. I will state this. I need to consult my knowledge of card types and targeting rules.</thought>\n    <actions>REPLY</actions>\n    <providers>KNOWLEDGE</providers>\n    <text>Lightning Bolt cannot target Blood Moon. Lightning Bolt may only target a creature or a player. Blood Moon is an enchantment.</text>\n    <simple>false</simple>\n</response>"

which would be correct,

but then the answer is
When you cast Lightning Bolt targeting Blood Moon, Lightning Bolt is placed on the stack.  Assuming no other actions are taken, Lightning Bolt will resolve and deal 3 damage to Blood Moon.  If Blood Moon's toughness is 3 or less, it will be destroyed as a state-based action.


Am I missing something to actualy make use of  that knowledge? this is not hitting any custom action
[ai16z] <nicedreamsmaybe>
APP
 — 15/05/2025, 09:53
Why should I use Elizaos over just building a barebones infrastructure for the ai work I need ? I am working on a project and it could be done with Eliza I would think
[ai16z] <demx3702>
APP
 — 15/05/2025, 11:27
so you dont have to build any infra duh
sam-developer — 15/05/2025, 12:00
you can finetune your agent further. can you take a look this repository

https://github.com/elizaOS/twitter-scraper-finetune
GitHub
GitHub - elizaOS/twitter-scraper-finetune: Scrape twitter accounts ...
Scrape twitter accounts for fine tuning. Contribute to elizaOS/twitter-scraper-finetune development by creating an account on GitHub.
Scrape twitter accounts for fine tuning. Contribute to elizaOS/twitter-scraper-finetune development by creating an account on GitHub.
sam-developer — 15/05/2025, 12:09
how are you passing knowledge in your character @LemonS
[ai16z] <dankvr>
APP
 — 15/05/2025, 12:30
https://eliza.how/
eliza | eliza
Flexible, scalable AI agents for everyone
updated the docs a bit
Image
[ai16z] <tragicboyjay>
APP
 — 15/05/2025, 15:40
I am trying to host my agent using render the docker container works well as soon as it runs i get that my twitter crerdentials are not working, same env i have in local i have passed tor ender and i echoed the credentials through docker and they are there does anyone have any idea?
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 15:45
Hello I'm trying to learn building with elizaos
I'm proficient with typescript and love to build new things
If anyone can just point at some tutorial or guide
With which i can start
I looked up on yt but there's not much
ai16z-bridge-odi
APP
 — 15/05/2025, 15:52
[ai16z] <tragicboyjay> https://www.youtube.com/watch?v=_GH3sVL1wFM
YouTube
Create & Play Games
Eliza OS AI Agent Framework v0.1.9 - Initial Setup
Image
sam-developer — 15/05/2025, 16:07
Looking into it
ai16z-bridge-odi
APP
 — 15/05/2025, 16:59
[ai16z] <kingslayer1645> Thanks so much
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 16:59
Any playbook we have?
sam-developer — 15/05/2025, 17:04
https://eliza.how/blog/twitter-agent-guide

https://fleek.xyz/troubleshooting/eliza/eliza-deployment-troubleshooting/#what-should-i-do-if-i-encounter-twitter-login-issues-or-failures-during-deployment

Can you check these out
[ai16z] <alotth>
APP
 — 15/05/2025, 18:46
I almost finished my agent on v1 lts, and had to do a client that send messages to my server... I saw that the client concept doesnt exist in v2
[ai16z] <alotth>
APP
 — 15/05/2025, 18:57
From Clients to Services
V2 swaps Clients for Services, standardizing platform integration while centralizing message routing—agents now think once, act anywhere (Discord, Twitter, SMS, even phone calls).

https://eliza.how/blog/v1-v2
ElizaOS V2 - What's New | eliza
A comprehensive guide to the changes and improvements in ElizaOS V2 compared to V1
ElizaOS V2 - What's New | eliza
adrianodelvoux — 15/05/2025, 19:03
Hey guys,
I'm using the endpoint to send a text message to my agent, but I'm encountering an issue:
(Error) Cannot set headers after they are sent to the client.

It seems that the agent successfully builds and sends the reply message to the client, but there's still some processing happening afterward that tries to modify the headers, which causes the application to crash.

I'm currently using version 1.0.0-beta.45.

Here’s my request:

POST /api/agents/370793a4-cf80-06b1-9b3b-e05ca5a49930/message HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Content-Length: 210

{
  "entityId": "0e5850c9-7c54-0c51-a8ed-b83ae351b696",
  "roomId": "6e4a2c15-4e1a-0057-875c-9ee753582a71",
  "text": "Give me more information about it",
  "source": "client_chat:user",
  "channelType": "dm"
}
LemonS — 15/05/2025, 19:27
in the character:

knowledge: [{ directory: 'src/judgePlugin/knowledge', shared: false }],
  settings: {
    ragKnowledge: true
  }


I tried many directory paths but it always works the same, I also tried loading it manually by loading the files and adding it with runtime.addKnowledge(), but same result

the character is at src/judgePlugin/characters/the-magic-judge.character.ts
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 19:38
I am trying to run a twitter agent. I have done configurations i.e added username, password in the env file.
I am using the trump character file for testing, and have already included clients=["twitter"] in the character file.
sam-developer — 15/05/2025, 19:38
so your knowledge files are not correctly loading in your agent right or you are getting in accurate answers
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 19:39
But running the character file using  pnpm start --characters="characters/trump.character.json" but i dont see it connecting to my twitter of making any posts
Any idea what i may be missing?
sam-developer — 15/05/2025, 19:40
this is scam
sam-developer — 15/05/2025, 19:42
can you try it with v2
sam-developer — 15/05/2025, 19:43
https://eliza.how/blog/twitter-agent-guide
[ai16z] <todescovitch_08219>
APP
 — 15/05/2025, 19:43
i need to do something with eliza. May be i m asking to much, i would like to create an ai agent from her that would be  to be able to call 100 numbers per hour and have a sales type of convo with clients from a speech and data that i will share with her ; is it possible or am i crazy to think about it ?
sam-developer — 15/05/2025, 19:45
it's definately possible,

please take a look at our docs https://eliza.how/
eliza | eliza
Flexible, scalable AI agents for everyone
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 19:54
My conversation just abruptly ended.
with the person trying to resolve my issue
sam-developer — 15/05/2025, 19:56
try putting
 source: 'client_chat',
 type: 'dm',


make sure your entity id and room id are accurate

can you share me what's the error you are getting
would be helpful for me to debug
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 19:57
I even lost the conversation I found assistable. Is this how it is supposed to happen?
sam-developer — 15/05/2025, 19:57
can you tell me your issue,
Also might be a scam if someone dmed you
ai16z-bridge-odi
APP
 — 15/05/2025, 19:58
[ai16z] <kingslayer1645> I can help maybe.
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 19:58
I have built a similar agent that does outbound calls
for insurance companies.
But its just to automate the first layer of lead qualification
No to have an entire lengthy conversation.
ai16z-bridge-odi
APP
 — 15/05/2025, 20:04
[ai16z] <todescovitch_08219> Thats impressive, thanks you for the info! Do you think it would be possible to push this kind of agent further? Like, not just to qualify leads, but to actually handle more complex interactions - answer nuanced/tricky questions, argue or clarify doubts and eventually guide the prospect to book a physical apppointment?
ai16z-bridge-odi
APP
 — 15/05/2025, 20:08
[ai16z] <kingslayer1645> It is entirely possible but currently llms hallucinate alot and they can just get stuck in loops and a turmoil of misinformation making you end up lose clients more than actually gain. Its better to use llms for context categorization and then using agentic context either call the llm to create a response or just simply play the an audio to save costs.
[ai16z] <budyn0>
APP
 — 15/05/2025, 20:11
Hey, I would have a question for those more experienced with Eliza. Is it possible to create a bot that posts tweets using an API such as serpAPI but retaining the ability to edit the character, etc.? I'm having trouble to fully understand the flow and libraries I could use to create something like this.
I would be grateful for your help guys because I am losing my strength on how to configure such a project
sam-developer — 15/05/2025, 20:17
yes it's definately possible,
you need to define your plugin and few actions that first fetches information from serp api and then post tweets using our plugin-twitter
sam-developer — 15/05/2025, 20:19
https://eliza.how/blog/twitter-agent-guide

this is the guide to setup your twitter agent and then you can read more on https://eliza.how/ about creating your own plugin and actions
Setting Up Your Own Twitter Agent with ElizaOS | eliza
Deploy a customized AI agent on Twitter
Setting Up Your Own Twitter Agent with ElizaOS | eliza
eliza | eliza
Flexible, scalable AI agents for everyone
ai16z-bridge-odi
APP
 — 15/05/2025, 20:19
[ai16z] <kingslayer1645> If you already know a set of basic queries and can configure a system that can categorize and output an answer.
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 20:21
It could be sent over the call but llm responses will be far costlier and slower ruining the experience and actually making your customers realize they're talking to a bot.
and nobody likes that.
Plus inbound calls are a totally different game. What i have build is based on outbound calling.
@Odilitime  why was the guy handling my ticket asking for a defi wallet?
ai16z-bridge-odi
APP
 — 15/05/2025, 20:25
[ai16z] <odilitime> Scammer
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 20:25
bro i thought this was safe.
He was showing as the MOD
Scary
ai16z-bridge-odi
APP
 — 15/05/2025, 20:26
[ai16z] <todescovitch_08219> Alright, that's extremely interesting - because if we consider todays lead costs, the real question is: could running an Ai agent that calls clients randomly -without leads- in a completly non-human way, thanks to its speed and ability to make multiple calls at once, actually brings cost below that of traditional lead generation? thats the core issue here, ultimately. Also, if the AI agent has the ability not only to replace the lead, but also the teleprospector who usually calls after the lead is generated, then the cost drops even further. So the real question becomes: is the operational cost of running and maintaining the LLM higher tha those combined costs, which can easily reach thousands of euros per day for large call center-type companies? Well, you mostly answered to it, while i was writing but still really interesting improvment we could find ahead
ai16z-bridge-odi
APP
 — 15/05/2025, 20:26
[ai16z] <kingslayer1645> dm bro
ai16z-bridge-odi
APP
 — 15/05/2025, 20:27
[ai16z] <kingslayer1645> not just that, you also avoid employee training.
[ai16z] <kingslayer1645>
APP
 — 15/05/2025, 20:27
which saves time
which saves cost

budyn — 15/05/2025, 22:36
Hey, I'm trying to write and create a twitter bot that using a custom character will generate news using an API such as newsAPI or tavily.  Unfortunately I'm having nothing but problems would anyone have a moment of their time to help me? I initialized the project using eliza-starter 😦
aith — 15/05/2025, 22:42
It's only making new posts for me. I've set TWITTER_INTERACTION_ENABLE=true and TWITTER_ENABLE_POST_GENERATION=false. Now even if I @ that account, it doesn't post a reply
0.x just works out the box for me but with 1.x I'm having some issues every now and then 😔
Image
0xCardiE — 15/05/2025, 22:59
which way to go there as my exp is just to use local pvt key for agent, is there some specific part of elizaos to use for bankr like func?
0xbbjoker — 15/05/2025, 23:05
could be that agent just ignores the interaction

LOG_LEVEL=debug elizaos dev  -> start in debug mode to see full logs and prompts/responses
sayonara — 15/05/2025, 23:18
sure
Ramiroo — 16/05/2025, 01:13
Hey, just making sure of something, do I need access to a twitter dev account in order to get my agent to check on replies and feed activity?
aith — 16/05/2025, 01:16
Okay I got this just now:
025-05-15 19:44:45] DEBUG: [Bootstrap] Response type: string
[2025-05-15 19:44:45] DEBUG (OrbitAgent): [Bootstrap] Parsed response:
    reasoning: "The message is a direct question asking for guidance on automating analysis posts on X, which aligns with my expertise in helping indie hackers and solo founders. I can provide actionable advice to help them automate their posting process effectively."
    action: "REPLY"
[2025-05-15 19:44:45] DEBUG: [Bootstrap] Agent decided not to respond (shouldRespond is false).
[2025-05-15 19:44:45] WARN: No text content in response, skipping tweet reply
[2025-05-15 19:44:45] DEBUG: [Bootstrap] Saved ignore response to memory
    memoryId: "87a0acfe-29d9-4431-ae45-a80244842b63"

Not sure why it chose not to respond...
That user is not added in the TWITTER_TARGET_USERS though
But as I come to understand it, leaving it blank would make the agent reply to any tweet
0xbbjoker — 16/05/2025, 01:22
TWITTER_TARGET_USERS not necessary on v2

look why shouldRespond is false

probably need to adjust character if you using default eliza remove message examples that include IGNORE action

tho I have eliza responding without any issues but in case when questions/prompt directed to community manager as it's tuned like community manager
aith — 16/05/2025, 01:23
I am using the configurations that I sent you in the dms yesterday not the default eliza configs
Ramiroo — 16/05/2025, 01:34
Hey! Is it 100% necessary to have a Twitter API key in order to track live events?
prek — 16/05/2025, 01:42
Hello, i have an issue with v0 using client-twitter.
All setup is pretty vanilla, 1:1 from documentation.
When agent is replying to a mention or whatever that contain image i get this:

[2025-05-15 20:03:50] ERROR: Service image_description not found
[2025-05-15 20:03:50] ERROR: Error Occured during describing image

Then it proceeds with a response, just without the image description. What could be the issue
Ramiroo — 16/05/2025, 01:44
hey,  did you manage to get your bot to check on twitter activity? I'm stuck and can't get my bot to reply to mentions and stuff
0xbbjoker — 16/05/2025, 01:45
not sure wdym by track live events?
prek — 16/05/2025, 01:45
Yah, it interacts with certain profiles and reply to mentions. Only stuff thats missing is image handling
Ramiroo — 16/05/2025, 01:45
reply to mentions and twitter target users
0xbbjoker — 16/05/2025, 01:45
something with your .env setup or API keys that u use so model not available
0xbbjoker — 16/05/2025, 01:45
elizaos --version for you is?
prek — 16/05/2025, 01:46
I tried it with fresh install and fresh .env. Set up only openai key and twitter config. Still had the same issue
Ramiroo — 16/05/2025, 01:49
"0.25.9"
[ai16z] <_sthx>
APP
 — 16/05/2025, 01:50
where do i clone plugin github repo's and then npm them with install and build?
Ramiroo — 16/05/2025, 01:53
Do you mind if I dm you with some basic-knowledge questions on how to make it work? I've been stuck for days and can't find a complete vid on how to make it work
0xbbjoker — 16/05/2025, 01:54
https://eliza.how/blog/twitter-agent-guide
[ai16z] <_sthx>
APP
 — 16/05/2025, 01:56
i got a error that it could not find dependancy elizaos-core
Ramiroo — 16/05/2025, 01:57
Is it 100% necessary to have a Twitter api key?
prek — 16/05/2025, 01:59
have you tried this? https://github.com/elizaOS/eliza/issues/3693
GitHub
Twitter Agent won't post / respond as it should · Issue #3693 · e...
I&#39;m trying to run the X agent and have configured the openai api and the X login in the env files. The agent seems to be online but it won&#39;t post or comment like it should be doing. I&#39;m...
I'm trying to run the X agent and have configured the openai api and the X login in the env files. The agent seems to be online but it won't post or comment like it should be doing. I'm able to tal...
0xbbjoker — 16/05/2025, 02:01
no where do you see twitter API key? read the blog.
0xbbjoker — 16/05/2025, 02:02
as I shared with you long time since I tried X with v0
prek — 16/05/2025, 02:03
Yah, just sharing with Ramiroo. This helped in my case: npx elizaos plugins add @Elizaos-plugins/client-twitter
Ramiroo — 16/05/2025, 02:04
the bot in the other chat was telling me that I needed a twitter API key, sounded weird but I trusted it lmao
Ramiroo — 16/05/2025, 02:04
I will try this
0xbbjoker — 16/05/2025, 02:04
which chat?
Ramiroo — 16/05/2025, 02:04
plug your projects
0xbbjoker — 16/05/2025, 02:04
okay no need for API key
Ramiroo — 16/05/2025, 02:06
are you using these 2 items?
Image
prek — 16/05/2025, 02:07
"plugins": ["@Elizaos-plugins/client-twitter"],
  "clients": ["twitter"],
Yah
prek — 16/05/2025, 02:17
Doing with this tuto and agent post tweets, but doesnt interact with people when tagged etc. Character is pretty much set up "respond to everything"
[2025-05-15 20:43:34] INFO:  Starting starter service
[2025-05-15 20:44:37] INFO: [Bootstrap] Generating new post...
[2025-05-15 20:44:37] INFO: No settings state found for server 1593646954503806976
[2025-05-15 20:44:37] WARN: [getTracer] Service instrumentation not found in runtime.
[2025-05-15 20:44:42] INFO: No settings state found for server 1593646954503806976
[2025-05-15 20:44:42] WARN: [getTracer] Service instrumentation not found in runtime.
and then loops
Ramiroo — 16/05/2025, 02:24
Managed to make it work, thank you so much @prek @0xbbjoker
YungYoda — 16/05/2025, 09:06
how do we control auth on our message endpoint?
tell me here xD
sayonara — 16/05/2025, 09:10
Scam
[ai16z] <spec_everest>
APP
 — 16/05/2025, 09:19
hello
@everyone how can i add telegram plugin to eliza os?
YungYoda — 16/05/2025, 09:20
how do we control auth on our message endpoint?
[ai16z] <gtham4769>
APP
 — 16/05/2025, 10:45
hi guys
ai16z-bridge-odi
APP
 — 16/05/2025, 10:45
[ai16z] <gtham4769> i can show you how
[ai16z] <gtham4769>
APP
 — 16/05/2025, 10:46
https://github.com/elizaos-plugins/client-telegram @spec_everest i used this in setting up
GitHub
GitHub - elizaos-plugins/client-telegram: Integrates a Telegram cli...
Integrates a Telegram client with ElizaOS, enabling characters to interact via Telegram with easy setup and basic lifecycle management. - elizaos-plugins/client-telegram
Integrates a Telegram client with ElizaOS, enabling characters to interact via Telegram with easy setup and basic lifecycle management. - elizaos-plugins/client-telegram
Scooter — 16/05/2025, 13:23
How can I import the discord plugin?
import { DiscordClientInterface } from '@Elizaos/client-discord';    Is not working
get an error that the module cannot be found
Scooter — 16/05/2025, 13:37
So is there even a discord plugin that works?
sayonara — 16/05/2025, 14:28
scam @Kenk
ban in the other server
bitcryptowski.btc — 16/05/2025, 14:54
hello ppls.  I have this in my .env and yet my agent has only posted once in the last 2 hours (right after elizao started).

he also does not react to other users.

TWITTER_POST_INTERVAL_MIN=15
TWITTER_POST_INTERVAL_MAX=60
TWITTER_TARGET_USERS=saylor,BitcoinMagazine
0xbbjoker — 16/05/2025, 15:54
add this: TWITTER_INTERACTION_ENABLE=true
JD — 16/05/2025, 15:59
figured it out:

// Assuming PRIVATE_KEY_BOT1 is a base58 encoded 32-byte private key
const decodedSeed = bs58.decode(process.env.PRIVATE_KEY_BOT1.trim()); // Add .trim() for safety
if (decodedSeed.length !== 32) {
  throw new Error(Decoded private key is not 32 bytes long. Actual length: ${decodedSeed.length});
}
const wallet = Keypair.fromSeed(decodedSeed);
bitcryptowski.btc — 16/05/2025, 17:50
unfortunately no reposts, no replies to other users and only one post directly after the start, otherwise no further actions.
ai16z-bridge-odi
APP
 — 16/05/2025, 18:36
[ai16z] <maheepatel09> hey i am trying the same thing, but its not working i am using heurist API. but when i try to run i can intercat only on Browser nothing happens on twitter.

ADMINS can any one help me out. "I am stuck."
ai16z-bridge-odi
APP
 — 16/05/2025, 18:36
[ai16z] <maheepatel09> how did you manage to run and post on twitter. Mine only works on browser.
ai16z-bridge-odi
APP
 — 16/05/2025, 18:37
[ai16z] <kingslayer1645> Same.
[ai16z] <maheepatel09>
APP
 — 16/05/2025, 18:38
how do we move forward. I am trying out different things. I will need some help from some one who managed to do it.
0xCardiE — 16/05/2025, 18:39
@jin  great work on dashboard
 have some update question 🙂 (sorry for intrusion)
I changed my github profile name recently. Commits and all are still there but I see dashboard is anchored to old profile name
https://elizaos.github.io/profile/0xCardinalError and new one is
https://github.com/0xCardiE
So is there a way for this to be updated?
0xCardinalError
0xCardinalError: Merged a significant feature PR #3170 "feat: coingecko advanced - various pools by network" that added 3,757 lines and removed 518 lines across 16 files. The contribution was focused on feature development (67%) with modifications primarily to code files (86%), completed in a single day of activity this week.
GitHub
0xCardiE - Overview
Solidity and AI Wizardry. 0xCardiE has 56 repositories available. Follow their code on GitHub.
Image
0xbbjoker — 16/05/2025, 18:51
elizaos --version and send me the output?
0xCardiE — 16/05/2025, 19:18
had the same problem, life saver 🙂
Redd — 16/05/2025, 19:20
@Nisita hi, i'm from reveel. i'm having this weird issue where the username is cached or something, this is inside the handler in the action. i'm sending different usernames, but on eliza's side, i'm getting the same one that's probably cached.

i'm using the direct client.
Image
0xCardiE — 16/05/2025, 19:23
crucial step missing if someone is just starting, before start you need "bun run build"
jin — 16/05/2025, 19:33
Wanna make an issue?
Hans — 16/05/2025, 19:33
In action handler, how to access agent 's previous message ?
Image
jin — 16/05/2025, 19:33
I’ll get to it after I’m caffeinated
0xCardiE — 16/05/2025, 19:57
ok i will
[ai16z] <OpenRouter #announcemen
APP
 — 16/05/2025, 20:25
looking for feedback:  should we ship per-app model rankings?

is there anything that app devs would want to highlight or explicitly hide publicly?
image.png
Image
Redd — 16/05/2025, 20:37
@Nisita my goal here is to have an identifier for who sent the request. and receive that identifier in the action's handler. through the state or something.
my question is: is there any way i can send an id or extra data in the payload of the direct-client api and receive that in the action's handler?
Scooter — 16/05/2025, 20:58
Guys I'm having a problewm with conflicting exports or something.  Project will not run at all as in does not come online as if it does not exist.
sayonara — 16/05/2025, 21:02
are you using 0.x or 1,x
Redd — 16/05/2025, 21:03
0.x, we implimented this a while ago
@sayonara
and now we're adding more actions
0.1.9
sayonara — 16/05/2025, 21:09
have you tried logging the payload before / after this?
Redd — 16/05/2025, 21:11
yes. i logged the payload before sending the request and logged again in eliza's side after receiving it from state.actorsData[0].username. and they are different usernames.
the one that is received is cached from a while ago. and static
though, i did clear the db. and now it's working fine.
but i don't wanna push this to production, cuz it can happen again.
Redd — 16/05/2025, 21:13
my main question is this.
yup. that would be great. my discord username is @Redd
@langouts
[ai16z] <OpenRouter #announcemen
APP
 — 16/05/2025, 21:17
Security feature: Passkeys are now live! Highly recommended for helping you secure your account and not forget your password.

Visit https://openrouter.ai/settings/preferences and then click Manage Account to add one.
Screenshot_2025-05-16_at_10.43.59_AM.png
Image
Redd — 16/05/2025, 21:19
yes
i sent u a fr
Redd — 16/05/2025, 21:38
@sammie409 is being sketchy in dms, fyi.
sayonara — 16/05/2025, 21:48
@Kenk ban
It redd but guy mentioned
Hidden Forces — 16/05/2025, 22:30
I'm getting really depressed trying to get a simple custom agent online - been trying for weeks and v2 is just fucked.

CAN SOMEONE POINT ME TO A TUTORIAL ON MANUAL INSTALL FOR A CUSTOM CHARACTER?  Ruby the Bot gave me terrible info and the original tutorials made by Shaw no longer apply with v2.  Between the CLI, The Org, and manual install - it's a bloody mess.

PLEASE HELP.
bitcryptowski.btc — 16/05/2025, 22:31
eliza hates me
Image
bitcryptowski.btc — 16/05/2025, 22:32
check this blog post

https://eliza.how/blog/twitter-agent-guide
Setting Up Your Own Twitter Agent with ElizaOS | eliza
Deploy a customized AI agent on Twitter
Setting Up Your Own Twitter Agent with ElizaOS | eliza
bitcryptowski.btc — 16/05/2025, 22:33
Image
bitcryptowski.btc — 16/05/2025, 22:33
👆
started 6 hours ago and only one post 😦 i was in the garden and then got a lot of crap in the cli where you can see in the picture above.
Image
[ai16z] <OpenRouter #announcemen
APP
 — 16/05/2025, 22:54
Google & OpenAI climbing the tokenshare leaderboard https://x.com/OpenRouterAI/status/1923429107234202101
OpenRouter (@OpenRouterAI) on X
Google &amp; OpenAI climbing the tokenshare leaderboard 👀
OpenRouter (@OpenRouterAI) on X

X•16/05/2025, 22:53
0xbbjoker — 16/05/2025, 22:54
could you updated to the latest pls?
[ai16z] <OpenRouter #announcemen
APP
 — 17/05/2025, 00:01
Looks like Gemini 2.5 Pro Experimental is now at even lower rate limits, including from Vertex. Checking in with our representatives but the model may be getting deprecated.
Scooter — 17/05/2025, 00:42
Any idea why my agent is succesfully launched but not registering so unavailable in the interface?
Scooter — 17/05/2025, 00:56
About agent name: Is a "name" property required in the agent configuration? I noticed our agent configuration doesn't have a name field at the agent level (though it does have other properties like system, bio, etc.).
bitcryptowski.btc — 17/05/2025, 00:58
okay
Image
Image
sayonara — 17/05/2025, 01:15
@beta not latest
bitcryptowski.btc — 17/05/2025, 01:18
Image
bitcryptowski.btc — 17/05/2025, 01:19
nothing has changed.
0xbbjoker — 17/05/2025, 01:22
how about npm i -g @elizaos/cli@1.0.0-beta.52

which OS using btw?
Scooter — 17/05/2025, 01:45
How would you guys choose to format this?

import { CustomDiscordPlugin } from './customDiscord';
import { logger, type Character, type IAgentRuntime, type Project, type ProjectAgent } from '@Elizaos/core';

// Export the character configuration
export const character: Character = {
  name: 'infiniGuy',
  plugins: [
    new CustomDiscordPlugin(),
    '@Elizaos/plugin-sql',
    '@fleek-platform/eliza-plugin-mcp',

The discord plugin is my extension of the elizacore discord plugin I am importing from a separate file.  Getting a "is not assignable to type 'string' error.

What is the method for getting a custom plugin or plugin extension into your agent's plugin array?
Here are my logs

Version: 1.0.0-beta.51

A new version of elizaOS CLI is available: 1.0.0-beta.52 (current: 1.0.0-beta.51)
Update with: elizaos update

BYPASS: Using postgres URL from environment variable
[2025-05-16 20:17:38] INFO: Found project by description in package.json
[2025-05-16 20:17:40] WARN: Server authentication is disabled. Set ELIZA_SERVER_AUTH_TOKEN environment variable to enable.
[2025-05-16 20:17:40] WARN: Skipping non-string plugin specifier found in character.plugins: {"name":"custom-discord","description":"Custom Discord plugin with Graphlit integration"}
Startup successful!
Go to the dashboard at http://localhost:3000/
AgentServer is listening on port 3000
[elizaos] Resolved .env file from: /home/tayter502/elizafi/infinifi-discord/.env
[2025-05-16 20:17:41] INFO: Initializing infiniGuy character
[2025-05-16 20:17:41] INFO: Initializing MCP plugin...
[2025-05-16 20:17:41] INFO: Name:  infiniGuy
[2025-05-16 20:17:41] INFO: Using available LLM providers based on API keys
[2025-05-16 20:17:42] INFO: Fetched 64 tools for graphlit
0xbbjoker — 17/05/2025, 01:55
https://github.com/elizaOS/eliza/blob/v2-develop/packages/project-starter/src/index.ts#L360
Scooter — 17/05/2025, 02:21
Thank you that was helpful.  Looking at this though looks like I need to work this starterPlugin type into my extension of the discord plugin?
// Configure memory before imports
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || '--max-old-space-size=8192';

// Make sure gc is available
if (process.env.NODE_OPTIONS?.indexOf('--expose-gc') === -1)
{
Expand
message.txt
14 KB
import {IAgentRuntime, Memory, Service, Plugin} from '@elizaos/core';
import discordPlugin from '@elizaos/plugin-discord';

interface ExtendedMemory extends Memory {
  context?: Record<string, any>;
  source?: string;
Expand
message.txt
3 KB
Appreciate any help with this
ai16z-bridge-odi
APP
 — 17/05/2025, 02:21
[ai16z] <gr_bcp> Reminds me to when I started in November. It took a PhD to run it. I've been trying to install v2 tonight but like you say it's a mess. Gonna revert to 0.25.9 until it's sorted out
Scooter — 17/05/2025, 02:22
I am extending Plugin but I need to be extending starterPlugin instead?
0xbbjoker — 17/05/2025, 02:22
no no, this is where you should add your plugin
Scooter — 17/05/2025, 02:23
So not extending the discord plugin at all but my own plugin essentially?
0xbbjoker — 17/05/2025, 02:24
could you post your issue?
Scooter — 17/05/2025, 02:25
plugins: [new CustomDiscordPlugin(),],     Like this?
0xbbjoker — 17/05/2025, 02:29
yea

Scooter — 17/05/2025, 02:31
testing now thank you.  Didn't know there was a separate plugin array outside the agent plugin array that expects strings
bitcryptowski.btc — 17/05/2025, 03:08
loading......


ubuntu
YungYoda — 17/05/2025, 03:08
how do we control auth or IP traffic on our message endpoint from our deployed Eliza instances? rn anyone can ping the endpoint right?
thanks. but my question remains. i've deployed eliza on railway but i need to control inbound ip traffic are there mechanisms for this built into eliza?
Ramiroo — 17/05/2025, 03:58
I'm trying to limit the amount of tokens my agent uses per share but I'm not getting it to work.

I already added RESPONSE_LENGTH=512 and MAX_TOKENS=512 in the .env

And I also added in the json "modelSettings": {
 "max_tokens": 512
 },
[ai16z] <msg4peace>
APP
 — 17/05/2025, 05:21
gm gm!
any ideas why when I  init a repo and start it, the start agents never answer  messages in the conversation and also others agents test?
Working around the new version just now, huge
0xbbjoker — 17/05/2025, 05:48
did you checked the logs? how did you started?
Thanh — 17/05/2025, 07:15
I belive there is an API key for accessing Eliza Server and also could be configured from frontend. But also dont know how to enable that API key. Do you have any guide about that @sayonara @0xbbjoker  thanks
Thanh — 17/05/2025, 08:40
I also got this issue @sayonara
Image
Thanh — 17/05/2025, 08:47
This is the agent created from UI localhost:3000, uploaded .env file. I am using Openrouter api
Default agent works with openrouter, same configs
Seem it work only with default openai api url
Used real openai key instead of openrouter then it worked
[ai16z] <OpenRouter #announcemen
APP
 — 17/05/2025, 09:11
Update on Gemini 2.5 Pro Experimental ( google/gemini-2.5-pro-exp-03-25 ) - Google is deprecating this model in favor of the paid Preview endpoint (google/gemini-2.5-pro-preview). The model will be deprecated on OpenRouter shortly.
Scooter — 17/05/2025, 09:49
Do I need to start the agent with any flags so the extension of the plugin is run?
ai16z-bridge-odi
APP
 — 17/05/2025, 12:51
[ai16z] <.starlord0> lowkey couldn’t find documentation either but after some digging I found that if you have a character config just place that in your root folder and on do elizaos start —char “./character.json and then u can edit its plugins configs or wtv via the elizaos agent part of the CLI. I have seen some wierd bugs with my character config and i have to manually readd plugins via CLI. Dk the reason but atleast there’s a workaround
bitcryptowski.btc — 17/05/2025, 14:07
okay, now my agent seems to be tweeting in loop. now he just has to like and retweet and i'm happy for today. does anyone have any tips?
Image
Girinath — 17/05/2025, 18:52
Hi, i have built a custom plugin by forking develop branch from https://github.com/elizaos/eliza/, need help on how to contribute/add my plugin to the eliza offical repo, do i have to create a npm package for my plugin or just creating pr will do the trick?
bitcryptowski.btc — 17/05/2025, 19:18
where can i find detailed instructions or examples for the plugin.ts? changes there are also crucial, aren't they?
and through all the MCP servers out there. better elizaos/plugin-browser or an MCP server that can do these tasks? pros and cons. thanks guys!
Scooter — 17/05/2025, 20:13
So the docs on the website are outdated right?
Need to only use what is in the repo?
ThunderRonin — 17/05/2025, 20:19
@0xbbjoker is the TWITTER_TARGET_USERS env variable obsolete in the beta build 48?
Its hasn't been used anywhere except the tests
0xbbjoker — 17/05/2025, 20:21
yea
0xbbjoker — 17/05/2025, 20:23
@elizaos/plugin-openrouter add to plugins

https://github.com/elizaos-plugins/plugin-openrouter docs here
Scooter — 17/05/2025, 20:33
export async function createRelationship({
    runtime,
    userA,
    userB,
}: {
    runtime: IAgentRuntime;
    userA: UUID;
    userB: UUID;
}): Promise<boolean> {
    return runtime.databaseAdapter.createRelationship({
        userA,
        userB,
    });
}


Does this still work or have the types changed?
[2025-05-17 15:06:23] WARN: User 54589a88-97da-00fd-aca3-31f44f53d71c has no name or username, skipping
keep getting this
Scooter — 17/05/2025, 20:42
userA: UUID;
    userB: UUID;
Specifically this
is this no longer target entity and source entity?
ThunderRonin — 17/05/2025, 20:44
What about the latest build? Is this feature even developed or should i start working onit?
0xbbjoker — 17/05/2025, 20:48
https://github.com/elizaOS/eliza/blob/v2-develop/packages/plugin-sql/__tests__/integration/relationship.test.ts
0xbbjoker — 17/05/2025, 20:48
wdym?
[ai16z] <tragicboyjay>
APP
 — 17/05/2025, 21:15
I was wondering if someone could tell me how to enable image generation, or give me a good reosurce for that please.
Hidden Forces — 17/05/2025, 21:42
wtf is a character config?  The character info is stored in a JSON file - why all the confusing jargon?  Also, '"in my root folder"?? That makes no fucking sense - why would I store all my characters in the root folder??  v1 had a character folder - now Ruby the bot is telling me it should be in \eliza\packages\standalone\src\characters.  Which also seems stupid but maybe it's correct.  Sure isn't "just throw it in the root folder".  So tired of piecemeal advice from bots that conflicts constantly.
0xbbjoker — 17/05/2025, 21:47
what you trying to do? can you explain?
Ramiroo — 17/05/2025, 21:55
Hey! I've got this in my .env but my Agent keeps posting when initialized

ENABLE_TWITTER_POST_GENERATION=false
POST_IMMEDIATELY=false

I was thinking that maybe I'm running an old .env

Any idea of why this could happen?
0xbbjoker — 17/05/2025, 21:55
remove those keys from .env
Ramiroo — 17/05/2025, 21:57
Just tried but it posted again
0xbbjoker — 17/05/2025, 21:58
maybe you have few .env and some of them have precedence
Hidden Forces — 17/05/2025, 22:03
The same thing I've been trying to do for weeks now - load a custom character json from a manual install.
Ramiroo — 17/05/2025, 22:03
I'm following the log path and it seems like it's on the right one

another problem I'm having (not if they are related) is that I can't get it to respond to all tweets, even though I specified that it should respond to everything in the character json
[ai16z] <lucidreamerx>
APP
 — 17/05/2025, 22:20
@ThunderRonin
0xbbjoker — 17/05/2025, 22:28
read this: https://github.com/elizaOS/eliza/blob/v2-develop/packages/cli/__test_scripts__/test_agent.bats

you'll figure out how to load it

probably best ref now is to look into tests if you wanna do smth like this
0xbbjoker — 17/05/2025, 22:31
really hard for me to tell what's going on with your setup

but generally it should work if you have the proper .env setup

the character configuration should tune the shouldRespond -> which can be tricky sometimes https://github.com/elizaOS/eliza/blob/v2-develop/packages/plugin-bootstrap/src/index.ts#L255
Hidden Forces — 17/05/2025, 22:41
I appreciate your help but this is sooo complicated.  It's literally the most basic functionality ask - load a user-created character.  Just can't understand why it's so fucking complicated.  All these tutorials make it sound like it should take 15 minutes..
0xbbjoker — 17/05/2025, 22:56
ELIZA_SERVER_AUTH_TOKEN=your-api-key

should prompt you for the X-API-KEY on the client side

but only if you set this in .env
0xbbjoker — 17/05/2025, 22:56
look at the tests as an example

I still can't say what's your exact issue. Are you a dev? or?
Hidden Forces — 17/05/2025, 23:28
Am I a dev?  I'm here working, so yes.  Am I deeply qualified and trained?  No, I'm not.

Going back to the CLI and starting over..
0xbbjoker — 17/05/2025, 23:30
try the other way when having issue:
send the logs,
explain how did you started,
what did you tried,

it's hard for me to tell and help you without seeing what's the actual issue you are facing
Hidden Forces — 17/05/2025, 23:35
it's such a fucking mess, I'm flying from one list of errors to another.  Now that I've tried manual, The Org, and the CLI, my installation is fucked.  Going to try to wipe the installation and start from scratch again.

thanks for your help tho
Scooter — Yesterday at 00:56
[2025-05-17 19:23:57] WARN: User 54589a88-97da-00fd-aca3-31f44f53d71c has no name or username, skipping

This is the bane of my existence
YungYoda — Yesterday at 01:19
how do we setup API access to our agent
0xCardiE — Yesterday at 01:20
made and issue as requested. 🙂
https://github.com/elizaOS/eliza/issues/4632
GitHub
Leaderboard - update username changes · Issue #4632 · elizaOS/eliza
I changed my github profile name recently. Commits and all are still there but I see dashboard is anchored to old profile name https://elizaos.github.io/profile/0xCardinalError and new one is https...
I changed my github profile name recently. Commits and all are still there but I see dashboard is anchored to old profile name https://elizaos.github.io/profile/0xCardinalError and new one is https...
0xCardiE — Yesterday at 02:36
isnt channelType obsolete? as I see in docs it says just to use 4 of params?
Image
Thanh — Yesterday at 04:37
i just followed @0xbbjoker guide
ELIZA_SERVER_AUTH_TOKEN=your-api-key

should prompt you for the X-API-KEY on the client side

but only if you set this in .env
YungYoda — Yesterday at 05:20
Thanks!
That should be clearer somewhere in the docs
ai16z-bridge-odi
APP
 — Yesterday at 10:38
[ai16z] <maheepatel09> how did you managed it to tweet. I am trying for few days now, I am using heurist for model and with that it only works on browser. but it doesn't tweet nor it gives any error.

"I am stuck can you please help me."
ai16z-bridge-odi
APP
 — Yesterday at 10:42
[ai16z] <andreaspablo007> Did you got it solve yet?.
ai16z-bridge-odi
APP
 — Yesterday at 10:46
[ai16z] <maheepatel09> no still figuring out.  first i was not able to get a model which gives free credit to test, then i got that (heurist which is free) but now the twitter integration doesn't work.

Are you trying to build one or have built one. I need help
Void — Yesterday at 11:15
I added this on global env and got plugin
Image
still not working what can i do?
ollama is running, gemma:2b, my env be like
System Information:
  Platform: darwin (24.4.0)
  Architecture: arm64
  CLI Version: 1.0.0-beta.52
  Package Manager: pnpm v10.11.0

Global Environment Variables:
Path: /Users/dogekim/.eliza/.env
  OLLAMA_API_ENDPOINT: http.../api
  OLLAMA_SMALL_MODEL: gemma:2b
  OLLAMA_MEDIUM_MODEL: gemma:2b
  OLLAMA_LARGE_MODEL: gemma:2b
  OLLAMA_EMBEDDING_MODEL: gemma:2b

Local Environment Variables:
Path: /Users/dogekim/.env
  USE_OLLAMA_TEXT_MODELS: true
  OLLAMA_SERVER_URL: http...1434
  OLLAMA_MODEL: gemma:2b
camdengrieh — Yesterday at 11:20
how do i resolve this?
Image
Void — Yesterday at 11:20
I feel so close to establishing my own agent, but I’m still grappling with various challenges.
Thanh — Yesterday at 11:21
I find team have done a lot of thing, but dont have time to build a complete docs. We could ask admin & mods here and also be beta testers for this project
Thanh — Yesterday at 11:36
If a agent is created on web UI, how can we add plugin-openrouter to the agent? I did the bun install @Elizaos/plugin-openrouter already but dont know how to add it to be an option on webUI
bitcryptowski.btc — Yesterday at 14:06
good morning nerds! has anyone managed to get their agent to retweet, like and reply yet?
bitcryptowski.btc — Yesterday at 14:32
this is the first time i have seen this error. i use “supabase”.
Image
random — Yesterday at 16:43
Hi guys, im building an agent for twitter and im using the eliza main repo and the version 0.25.9 in particular. However, my problem is I already added the twitter on my plugins and setup my credentials but when i tried to run it it doesn't post any tweet unless I chat or instruct on the browser. I first tried to use the eliza-starter and works fine on me and automatically post a tweet then i decided to move on the eliza main repo im having similar experience with this https://github.com/orgs/elizaOS/discussions/4585 but no response yet that's why i decided to ask help here . Does anyone encountered exact issue with mine and how did you resolve it? 🙏
Image
Image
GitHub
Tweets Not Sending in Main Repo, but Working in Starter Repo · eli...
Hello, I&#39;m new to Eliza and currently trying to use the main repository because, based on the .env file, it appears to offer more features than the starter repo. When I use the starter repo, ev...
Hello, I'm new to Eliza and currently trying to use the main repository because, based on the .env file, it appears to offer more features than the starter repo. When I use the starter repo, everyt...
Scooter — Yesterday at 16:56
Hooked up to a fresh DB branch and tables aren't being configured automatically when starting agent up.  IS that normal?  What is the command to configure the fresh DB?
Scooter — Yesterday at 16:57
Are you sure you are running your own project or character and not the default?
random — Yesterday at 17:01
Hi scooter, thanks for asking yup i'm pretty sure im calling the character I created and not the defaultCharacter on eliza
command I used: pnpm start --characters="characters/bobby.character.json"
Image
I also noticed this on env, however even if it is set to true it doesn't automatically post tweet

ENABLE_TWITTER_POST_GENERATION=true # Set to true to enable automatic tweet generation. If false, the bot will not generate or post tweets.
Scooter — Yesterday at 17:03
Is there an interval variable?
random — Yesterday at 17:07
ah yeah, here are they

TWITTER_POLL_INTERVAL=120
Post Interval Settings (in minutes),
POST_INTERVAL_MIN=3
POST_INTERVAL_MAX=5
POST_IMMEDIATELY=true
Twitter action processing configuration,
ACTION_INTERVAL=1
Scooter — Yesterday at 17:24
Not sure what the issue is then.  Wish I could help you more!
Do you have the twitter plugin in your character's plugin array?
random — Yesterday at 17:28
yup yup, I did I grabbed this on the eliza docs
Image
actually, both plugins works but problem I needed to instruct it first especially the tweet posting it's not automatically generated compared on the eliza-starter
Image
Image
Scooter — Yesterday at 17:47
Might need to compose an action to do so
Benquik — Yesterday at 18:00
hi guys! im trying to import my character with this command
elizaos character import --file Character.json
 But i get this in return
error: unknown command 'character'
what did i do wrong
im on v2
camdengrieh — Yesterday at 21:02
what if you use npx elizaos…
Also does anyone know if it’s possible to use the client-twitter from V1 in V2.

I want to be able to take an action when my agent is mentioned on Twitter - like bankrbot for example
elizaos/plugin-twitter doesn’t currently support anything beyond posting tweets
0xbbjoker — Yesterday at 22:17
that's not ready yet

openrouter has to be added from character obj or project
[ai16z] <pepehacker>
APP
 — Yesterday at 22:37
V2 looks nice but having trouble setting up ollama
aith — Yesterday at 22:40
Guys, what's the best solution to hydrate a X account so that it doesn't get flagged as spam? I made a new account for my agent however, it got flagged and shadow banned.
0xbisbis — Yesterday at 22:42
hi, is anyone managing to use the supabase plugin? i keep getting an error when trying to install https://eliza.how/packages/adapters/supabase
ElizaOS Supabase Adapter | eliza
This adapter enables ElizaOS to integrate with Supabase for data persistence and real-time capabilities.
0xbbjoker — Yesterday at 22:42
probably rate limits hit but I am not 100% sure try research grok is very much aware
0xbisbis — Yesterday at 22:43
i am using https://github.com/elizaOS/eliza-starter and i am trying to connect the agent to data i have stored in a supabase table so that he can use manually created tools to manipulate data (Readonly) and answer user queries (through discord/tg chats)
GitHub
GitHub - elizaOS/eliza-starter
Contribute to elizaOS/eliza-starter development by creating an account on GitHub.
Contribute to elizaOS/eliza-starter development by creating an account on GitHub.
recently caved in (havent used eliza in months) because it looked like iw as recreating a framework from scratch doing it on my own but i am struggling to try and set up the initial character for my agent and actually get it plugged to the data in the database on supabase
[ai16z] <.starlord0>
APP
 — Yesterday at 22:51
how does one use, other plugins inside custom plugins? i cant seem to find any docs on that
0xbisbis — Yesterday at 23:18
is supabase deprecated or something?
https://github.com/elizaos-plugins/adapter-supabase
GitHub
GitHub - elizaos-plugins/adapter-supabase: Enables ElizaOS integrat...
Enables ElizaOS integration with Supabase for data persistence and real-time capabilities. - elizaos-plugins/adapter-supabase
Enables ElizaOS integration with Supabase for data persistence and real-time capabilities. - elizaos-plugins/adapter-supabase
last update was 3 months ago and when trying to install i get

 (base)  eliza % npm install github:elizaos-plugins/adapter-supabase
(node:98380) ExperimentalWarning: CommonJS module /Users/bisbis/.nvm/versions/node/v23.3.0/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /Users/bisbis/.nvm/versions/node/v23.3.0/lib/node_modules/npm/node_modules/supports-color/index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use node --trace-warnings ... to show where the warning was created)
npm error Cannot read properties of null (reading 'matches')
npm error A complete log of this run can be found in: /Users/bisbis/.npm/_logs/2025-05-18T17_46_10_416Z-debug-0.log
i set up supabase config in env variables but if i understand correctly i need to put it into the character file?
0xbbjoker — Yesterday at 23:20
you can use supabase with adapter-postgres
POSTGRES_URL=your_supabase_uri
0xbisbis — Yesterday at 23:21
https://eliza.how/packages/adapters/postgres this one? thanks for answewring btw
ElizaOS PostgreSQL Adapter | eliza
A database adapter plugin for ElizaOS that provides PostgreSQL connectivity with vector embedding support for semantic search capabilities.
0xbbjoker — Yesterday at 23:21
yea
0xbisbis — Yesterday at 23:21
ok so the supabase thing is a known issue of some kind?
0xbbjoker — Yesterday at 23:23
I know postgres is working but haven't checked supabase adapter for a while now.

adapter-postgres should handle any postgres instance, it does not matter who is the cloud service provider as long as it's postgres instance.
0xbisbis — Yesterday at 23:23
could be i just have something wrong in my setup?
Image
tried bun just in case but neither seem to complete succesfully
gonna try some other way and see ifi can make it work
0xbbjoker — Yesterday at 23:35
okay, do you wanna use 0.x elizaos or 1.x elizaos?

adapter you trying to use is for 0.x version.

I would suggest trying new version. It's easy to setup postgres. You don't need to install the adapter.

https://eliza.how/docs/quickstart

when you create a project you'll get the prompt to select database, go with postgres and provide the supabase connection uri.
ai16z-bridge-odi
APP
 — Yesterday at 23:55
[ai16z] <.starlord0> https://eliza.how/docs/cli/agent heres what ur lookin for. Theres no command characters as said in your error log. Also there is no import command either for the agent subcommand. so take a look at the docs to figure out whatchu need
Agent Command | eliza
Managing ElizaOS agents through the CLI - list, configure, start, stop, and update agents

0xbisbis — 00:01
oh i see, this seems a lot simpler
has been a battle trying to set this thing up to do basic read-only on a table so far. going to try with the easy way
[ai16z] <.starlord0>
APP
 — 00:13
haha i get you, I thought starting up and using this framework would be lightwork. I feel like im learning Astrophysics or sum trying to understand and make everythign work.
0xCardiE — 02:07
need some help,  looking from API perspective I can create agents but how do I create world and how do I get world id, also the same question for serverId?

what I want to achieve is create 5 agents, each of them in its own room (I guess group as API has only group creation), created by API and then to send messages to each of these agents?
0xbisbis — 03:26
worked!
been going at it for a bit, managed to feed it data as rag correctly. working on some custom stuff but the base works!
trying to set up discord, the new way i am not familiar with since apparently the plugin discord isnt working
0xbbjoker — 03:32
https://github.com/elizaOS/eliza/blob/v2-develop/packages/the-org/src/communityManager/index.ts example how to setup discord ig u just miss .env and/or adding them to secrets?
0xbisbis — 03:34
ive added to env and uncommented the plugin discord but when i launch the agent it gives me [2025-05-18 22:01:47] ERROR: Failed to load plugin @Elizaos/plugin-discord even after installation.
Image
ahh yes
ok looking at what you sent me now, i understand what you mean by secrets and this looks like its what i am missing
going to look at it now
0xbbjoker — 03:35
also if changing the character start with elizaos dev
0xbisbis — 03:36
ok will that leave a trail of logs or something?
0xbbjoker — 03:37
for now you could pull the latest v2-develop and build CLI from it you'll have the worldId: https://github.com/elizaOS/eliza/blob/v2-develop/packages/cli/src/server/api/agent.ts#L132
0xbbjoker — 03:37
LOG_LEVEL=debug elizaos dev -> to enable debug logs
0xbisbis — 03:38
thanks for the support!!
0xbisbis — 04:11
Image
for some reason even this is not launching my bot on discord
it should directly connect right?
0xbbjoker — 04:12
you need to create the bot, setup proper permissions and invite the bot to server
0xbisbis — 04:13
yep so thats done, i was running it earlier through my own server
its already in a discord server + i have chatted to it earlier so it should work
0xbbjoker — 04:14
any error logs?
0xbisbis — 04:14
i am getting some weird opus error when trying to launch the agent from looking online i see its related to discord voice?
Image
found this https://github.com/elizaOS/eliza/issues/278
GitHub
Linux dependency issues - discord voice client · Issue #278 · eli...
Describe the bug when starting the discord client, the bot fails To Reproduce add discord client to character.json, pnpm start --character Expected behavior character initializes successfully Scree...
Describe the bug when starting the discord client, the bot fails To Reproduce add discord client to character.json, pnpm start --character Expected behavior character initializes successfully Scree...
going to try and do what has "fixed" it for that person and see
ok fixed it!
:PU_PeepoCornFilm:
0xCardiE — 04:40
ok but If I create just and Agent, there is no world so far as I need to create one first? or is there a default one when I run bun run start?
I am thinking in line that I need to create agent, then create world where he is admin, then I can lets say create 4 more agents that belong to this world and create rooms for each of them where I could talk to them. Is this correct way of thinking about this?
Scooter — 08:57
How to shudown all instances of eliza?
Surely there is a script for this
[ai16z] <remedy_david_0221>
APP
 — 10:35
Is it normal for AI's to be removed from the agent list when Linux is restarted? Every time I quit and reenter, they're completely gone from my OS front-end and I have to reimport their .json's. Not even the default Eliza agent portrait gets updated. Everything seems to revert to default.
Scooter — 11:58
[2025-05-19 06:15:57] WARN: User 54589a88-97da-00fd-aca3-31f44f53d71c has no name or username, skipping

Keep getting this
```
