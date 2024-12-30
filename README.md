# ChatBot Web Application

This repository contains a chatbot web application built with **React** for the frontend, **Flask** as the backend, and **Ollama** for chatbot interaction. The system allows users to choose between different AI models for generating responses.

## Features

- **React Frontend**: Provides an interactive and responsive interface to select AI models and chat.
- **Flask Backend**: Handles requests and integrates with Ollama for generating AI responses.
- **Ollama API**: Utilized for chatting with different AI models.
- **JSON Configuration**: Manages request and response testing.
![](https://utfs.io/f/VjzBOjvt3gYi4qHhxd5Gb05RX2lAZ6ap3C9gYOFejTQVnsuL)

## Project Structure

### Backend

The Flask server (`app.py`) provides an endpoint to generate responses based on user inputs:
- Validates input data from the frontend.
- Sends chat requests to Ollama with selected AI models.
- Supports responses with and without image input.

### Frontend

React components for the interface include:
- **ModelChoice.jsx**: Displays a grid to select an AI model.
- **Model.jsx**: Represents an individual AI model card with interactivity.
  ![](https://utfs.io/f/VjzBOjvt3gYiBxDMWeGtRE0fLH3YcpqjJvekhwGrXWMO1I8o)

### Data Configuration

The `request.json` file includes:
- Example user inputs for testing.
- A list of available chat histories (if applicable).


