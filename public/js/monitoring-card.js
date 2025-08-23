// ===== IMPORTS =====
import { state } from "./global.js";

// ===== SELECCION DE ETIQUETAS =====

const dashboard2 = document.getElementById("dashboard-2");
const monitoring = document.getElementById("monitoring");
const closeMonitoring = document.getElementById("close-monitoring");
const monitoringList = document.querySelectorAll("#monitoring-list>li");
const buttonOkMonitoring = document.getElementById("button-ok-monitoring");
const buttonOkInteractions = document.getElementById("button-ok-interactions");
const workGroupsContainer = document.getElementById("work-groups-container");
const searchMonitoringInput = document.getElementById(
  "search-monitoring-input"
);
const workGroupTitle = document.getElementById("work-group-title");

document.addEventListener("DOMContentLoaded", () => {
  // ===== Abrir el modal "monitoreo" =====
  monitoring.addEventListener("click", () => {
    cleanMonitoring();
    const targetId = monitoring.getAttribute("commandfor");
    const dialog = document.getElementById(targetId);
    if (dialog && typeof dialog.showModal === "function") {
      if (state.workGroups.length > 0) {
        buttonOkMonitoring.disabled = false;
        buttonOkMonitoring.style.opacity = "1";
        buttonOkMonitoring.style.cursor = "pointer";
      } else {
        buttonOkInteractions.disabled = true;
        buttonOkInteractions.style.opacity = "0.5";
        buttonOkInteractions.style.cursor = "not-allowed";
      }

      monitoringList.forEach((li) => {
        if (!state.mode) {
          const svg = li.querySelector("svg");
          svg.classList.add("hidden");
          state.checkboxList = {};
        }
        state.workGroups = [];
      });

      // Esperar al siguiente frame para que el DOM esté renderizado
      requestAnimationFrame(() => {
        const div = dialog.querySelector("#container-monitoring"); // seleccioná el div que te interesa
        if (div) {
          const height = div.offsetHeight;
          div.style.height = `${height}px`;
        }
      });

      dialog.showModal();
    }
  });

  // ===== Boton "OK" de tarjeta monitoring =====
  buttonOkMonitoring.addEventListener("click", () => {
    workGroupTitle.classList.add("hidden");
    setTimeout(() => {
      $("#gauge").resize();
    }, 0);
    state.mode = "monitoring";
    const targetId = monitoring.getAttribute("commandfor");
    const dialog = document.getElementById(targetId);
    dialog.close();
    searchMonitoringInput.value = "";

    searchMonitoringInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();

      monitoringItems.forEach((li) => {
        const text = li.querySelector("span")?.textContent.toLowerCase() || "";
        //const notes = li.querySelector('p')?.textContent.toLowerCase() || '';
        // || notes.includes(term)
        if (text.includes(term)) {
          li.style.display = "flex"; // restaurar visibilidad
        } else {
          li.style.display = "none"; // ocultar si no coincide
        }
      });
    });

    buttonOkMonitoring.disabled = true;
    buttonOkMonitoring.style.opacity = "0.5";
    buttonOkMonitoring.style.cursor = "not-allowed";
    dashboard2.classList.add("get-animation-dashboard");
    dashboard2.classList.remove("get-animation-dashboard-out");

    workGroupsContainer.innerHTML = "";

    state.workGroups = [...state.prevWorkGroups];

    state.workGroups.forEach((workGroup) => {
      const span = document.createElement("span");
      span.classList.add(
        "workGroup",
        "text-black",
        "translate-y-1",
        "text-[clamp(2rem,2vw,2vw)]"
      );
      span.textContent = workGroup;
      workGroupsContainer.appendChild(span);
    });
  });

  // ===== Cerrar el modal Monitoring =====
  closeMonitoring.addEventListener("click", () => {
    cleanMonitoring();
  });

  // ===== Recorrer la lista de "monitoreo" =====
  monitoringList.forEach((li) => {
    const svg = li.querySelector("svg");
    const optionId = li.id;

    li.addEventListener("click", (e) => {
      monitoringList.forEach((otherLi) => {
        const otherSvg = otherLi.querySelector("svg");
        if (!otherSvg.classList.contains("hidden"))
          otherSvg.classList.add("hidden");
      });
      svg.classList.remove("hidden");
      state.prevWorkGroups = [optionId];
      state.checkboxList[optionId] = true;

      // Click en LI
      if (state.prevWorkGroups.length === 0) {
        buttonOkMonitoring.disabled = true;
        buttonOkMonitoring.style.opacity = "0.5";
        buttonOkMonitoring.style.cursor = "not-allowed";
      } else {
        buttonOkMonitoring.disabled = false;
        buttonOkMonitoring.style.opacity = "1";
        buttonOkMonitoring.style.cursor = "pointer";
      }
    });
  });

  // ===== Limpiar seleccionados del "monitoring" =====
  const cleanMonitoring = () => {
    const targetId = monitoring.getAttribute("commandfor");
    const dialog = document.getElementById(targetId);
    if (dialog && typeof dialog.close === "function") {
      // Limpiar checkboxes (desmarcar todos)
      monitoringList.forEach((li) => {
        const isIncluded = state.prevWorkGroups.some((item) => item === li.id);
        const svg = li.querySelector("svg");
        if (isIncluded) {
          svg.classList.remove("hidden");
        } else {
          svg.classList.add("hidden");
        }

        state.prevWorkGroups.forEach((item) => {
          state.checkboxList[item] = true;
        });
      });

      if (!state.mode) {
        state.workGroups = [];
        state.prevWorkGroups = [];
        workGroupsContainer.innerHTML = "";
        buttonOkMonitoring.disabled = true;
        buttonOkMonitoring.style.opacity = "0.5";
        buttonOkMonitoring.style.cursor = "not-allowed";
      }

      dialog.close();

      searchMonitoringInput.value = "";
    }
  };
});
