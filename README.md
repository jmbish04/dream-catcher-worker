# Dream Catcher Worker

This repository contains a simple scaffold for a DALL·E powered inpainting application. It includes a Vite + React frontend and a FastAPI backend. The Cloudflare Worker scripts in the root are used to route requests and interact with R2 storage.

The frontend shows a gallery of images, allows masking regions for editing, and communicates with the `/generate` backend endpoint. The backend stub defines the API shape but does not yet call the actual DALL·E API.

Use this as a starting point for building out the full renovation inpainting workflow.
