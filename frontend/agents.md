# Codex Agents Guide for Dream-Catcher 

This document specifies usages and api patterns for code-generating agents that support the design intend of "Reno Dream Catcher".

This project uses GOP and OpenAI's DALLE-3 models for image rendering with a layer of in-depth control via canvas and an agent who guides the user through optimizing the prompt.

# Features

- Complete prompts using assistant-ui chat front
- Preview user images and eddits via bento view
- Mask areas using touch and mouse support
- Refine DrA prompts using ai chat with logical steps
- Store staging edits with timestamp, room, revision info
```
{
  "src": "images/befrore.jpg",
  "mask": "user marked over the window to replace with bay window",
  "prompt": "a moder looking bay window with white frame and wide view of the garden",
  "room": "living room"
}
```

These schema can be used to build natural language prompts, resolve room type, and visualize their progress via a single user flow.


## Prompt Assistant API Call

Use the custom endpoint from the frontend: 

/api/ai-assistant
- Posts json with the current prompt and light context
- Returns a completion from OpenAI Turbo model

```json
{
  "prompt": "Replace the kitchen with a moder marble countertop",
  "past_context": "The user selected the kitchen area and wants something modern"
}
```

This supports an explorative text wizard flow where the ai engages the user with follow-up questions to optimize the prompt.
