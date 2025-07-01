# DALL-E Inpainting App Blueprint

```md
# Project Overview
Complete Web App for HOME REMODELING
  - Canvas with masking
  - AI agent to generate ineds via DALL-E
  - Gallery to view past renders

```


## Technology Stack
* Frontend: Vite + React + Shadcn + Tailwind + Canvas
* Backend: Partial on FastAPI, part through Cloudflare Worker

# Codex Prompt: DALL-E Inpainting App for Renovation

1. User clicks an image from the BentoGrid gallery
2. Opens it in a <fullscreen> <Dialog> view with the image
3. A masking canvas accepts mouse/touch to highlight areas
4. An AI agent <Sheet> appears in right panel to help write prompts
  - User provides basic description
  - AI agent asks follow-up questions
   - Suggests a final, optimized prompt
  - Triggers the DALL api with image + mask + final prompt
5. Shows a 'Generating...' Sonner toast, with <Loading> and then <Success> toast
6. Renders a responsive before/after comparison slider in the dialog
7. Saves the result to R2 using /dalle/room/name_timestamp.jpg
8. Inserts a new row in the dalle_creations table with the prompt, revision, timestamp, image keys