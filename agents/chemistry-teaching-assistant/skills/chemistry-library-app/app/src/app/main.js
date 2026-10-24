import { createApp } from "vue";
import App from "./App.vue";
import "../folien/folien.css";
import "../folien/vortrag.css";
import "./app.css";
import * as store from "./store.js";

window.addEventListener("error", (e) => (window.__chemFehler = window.__chemFehler || []).push(String(e.message)));
window.addEventListener("unhandledrejection", (e) => (window.__chemFehler = window.__chemFehler || []).push(String(e.reason && e.reason.message || e.reason)));
createApp(App).mount("#app");
// Hooks for the automated check (pruefen); harmless in normal use.
window.__chemTest = { store, downloads: store.testDownloads };
