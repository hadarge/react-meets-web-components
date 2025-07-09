# 🧪 React Meets Web Components

A hands-on example repository from the **React IL Meetup** talk — exploring how **React** and **Web Components** can work together, what challenges arise, and how to solve them.

## 🎯 Purpose

This repo demonstrates real-world patterns for exposing  **React Components** as **Custom Elements**, showcasing:

- 📦 Importing and rendering custom elements
- 🔁 Data binding
- ⚡  Event communication between React and Web Components
- 🔄 Dynamic loading
- 🧩 Micro frontends using Web Components

## 🚀 Quick Start

1. **Clone the repo:**
   ```bash
   git clone https://github.com/hadarge/react-meets-web-components
   cd react-meets-webcomponents
   ```

2. **Install dependencies:**
   ```bash
   cd reactApp
   npm i
   
   cd ..
  
   cd vueApp
   npm i
   
   cd ..
   
   cd angularApp
   npm i
   ```

3. **Start the react server:**
   ```bash
   cd reactApp
   npm i
   npm run watch 
   ```

4. **Start the vue app:**
   ```bash
   cd vueApp
   npm run dev
   ```
Or 

4. **Start the angular app:**
   ```bash
   cd angularApp
   npm run start
   ```

5. **Open in browser:**  
- Navigate to [The React App](http://localhost:2222)
- Navigate to [The Vue App](http://localhost:3333)
- Navigate to [The Angular App](http://localhost:4200)

---

## 📁 Structure

```
/react-app         → React host application & WC components exposer module
/vueApp            → Vue host application
/angularApp        → Angular host application
```

---

## 🧠 Topics Covered

- ✅ Defining and registering custom elements
- 🔗 Passing props and attributes to React
- 🔗 Passing props and attributes from Vue
- 🔗 Passing props and attributes from Angular
- 📡 Listening to events
- 📥 Dynamic import and lazy loading Web Components

---

## 💡 Why Web Components?

Web Components offer framework-agnostic, encapsulated UI building blocks. 
When combined with React, they unlock powerful micro frontend possibilities and long-term maintainability across diverse codebases.

---

## 🎤 Talk Info

**React IL Meetup – July 2025**  
_Speaker: Hadar Geva_  
Topic: **"React Meets Web Components"**

---

## 🛠️ Tech Stack

- Node 22
- React 19
- Vite
- Vanilla Web Components (no framework-specific WC library)
- TypeScript

---

## 🤝 Contributing

Feel free to fork, explore, and share your experiments!  
Pull requests are welcome if you’d like to extend this further.

---

## 📄 License

MIT – use freely, build boldly.
