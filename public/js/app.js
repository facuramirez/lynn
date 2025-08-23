// ===== IMPORTS =====
import { state } from "./global.js";

// ===== SELECCION DE ETIQUETAS =====
const dashboard1 = document.getElementById("dashboard-1");
const dashboard2 = document.getElementById("dashboard-2");
const closeDashboard2 = document.getElementById("close-dashboard-2");
const checkboxAll = document.getElementById("all");
const monitoring = document.getElementById("monitoring");
const interactions = document.getElementById("interactions");
const gridCards = document.querySelectorAll("#grid-cards>div");
const monitoringList = document.querySelectorAll("#monitoring-list>li");
const interactionsList = document.querySelectorAll("#interactions-list>li");
const buttonOkMonitoring = document.getElementById("button-ok-monitoring");
const buttonOkInteractions = document.getElementById("button-ok-interactions");
const workGroupsContainer = document.getElementById("work-groups-container");
const editWorkGroups = document.getElementById("edit-work-groups");
const searchGroupCardsInput = document.getElementById("group-search-input");
const searchMonitoringInput = document.getElementById(
  "search-monitoring-input"
);
const searchInteractionsInput = document.getElementById(
  "search-interactions-input"
);
const dashboardInteractionsByAgent = document.getElementById(
  "dashboard-interactions-by-agent"
);

document.addEventListener("DOMContentLoaded", () => {
  // ===== Buscador "dashboard-1" (cards, monitoring e interactions) =====

  searchGroupCardsInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    gridCards.forEach((div) => {
      const text = div.querySelector("h3")?.textContent.toLowerCase() || "";

      if (text.includes(term)) {
        div.style.display = "flex"; // restaurar visibilidad
      } else {
        div.style.display = "none"; // ocultar si no coincide
      }
    });
  });

  searchMonitoringInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    monitoringList.forEach((li) => {
      const text = li.querySelector("span")?.textContent.toLowerCase() || "";

      if (text.includes(term)) {
        li.style.display = "flex"; // restaurar visibilidad
      } else {
        li.style.display = "none"; // ocultar si no coincide
      }
    });
  });

  searchInteractionsInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    interactionsList.forEach((li) => {
      const text = li.querySelector("span")?.textContent.toLowerCase() || "";

      if (text.includes(term)) {
        li.style.display = "flex"; // restaurar visibilidad
      } else {
        li.style.display = "none"; // ocultar si no coincide
      }
    });
  });

  // ===== Boton de editar "work-groups" =====
  editWorkGroups.addEventListener("click", () => {
    if (state.workGroups.length === interactionsList.length)
      checkboxAll.checked = true;
    else checkboxAll.checked = false;

    let modal =
      state.mode === "monitoring"
        ? monitoring
        : state.mode === "interactions"
        ? interactions
        : null;

    const list =
      state.mode === "monitoring"
        ? monitoringList
        : state.mode === "interactions"
        ? interactionsList
        : null;

    const targetId = modal.getAttribute("commandfor");
    const dialog = document.getElementById(targetId);

    list.forEach((li) => {
      li.style.display = "flex"; // restaurar visibilidad

      const isIncluded = state.workGroups.some((item) => item === li.id);
      const svg = li.querySelector("svg");
      if (isIncluded) {
        svg.classList.remove("hidden");
      } else {
        svg.classList.add("hidden");
      }

      state.prevWorkGroups = [...state.workGroups];
      state.workGroups.forEach((item) => {
        state.checkboxList[item] = true;
      });
    });

    if (dialog && typeof dialog.showModal === "function") {
      if (state.workGroups.length > 0) {
        buttonOkMonitoring.disabled = false;
        buttonOkMonitoring.style.opacity = "1";
        buttonOkMonitoring.style.cursor = "pointer";

        buttonOkInteractions.disabled = false;
        buttonOkInteractions.style.opacity = "1";
        buttonOkInteractions.style.cursor = "pointer";
      }
      dialog.showModal();
    }
  });

  // ===== Click en "X" del dashboard2 =====
  closeDashboard2.addEventListener("click", () => {
    dashboard2.classList.add("get-animation-dashboard-out");
    dashboard2.classList.remove("get-animation-dashboard");
    dashboard2.classList.remove("get-animation-dashboard-fast");
    setTimeout(() => {
      workGroupsContainer.innerHTML = "";
      state.mode = null;
    }, 300);
  });

  // ===== Apretar "ESC" en dashboard2 =====
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (state.mode === "agent-interactions") {
        dashboard1.classList.remove("hidden");
        dashboard2.classList.add("get-animation-dashboard-fast");
        dashboardInteractionsByAgent.classList.remove(
          "get-animation-dashboard"
        );
        dashboardInteractionsByAgent.classList.add(
          "get-animation-dashboard-out"
        );
        setTimeout(() => {
          state.mode = "interactions";
        }, 100);
      } else {
        dashboard2.classList.add("get-animation-dashboard-out");
        dashboard2.classList.remove("get-animation-dashboard");
        dashboard2.classList.remove("get-animation-dashboard-fast");
        setTimeout(() => {
          workGroupsContainer.innerHTML = "";
          state.mode = null;
        }, 300);
      }
    }
  });
});
