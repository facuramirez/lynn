// ===== IMPORTS =====
import { state } from "./global.js";

// ===== SELECCION DE ETIQUETAS =====
const dashboard2 = document.getElementById("dashboard-2");
const checkboxAll = document.getElementById("all");
const interactions = document.getElementById("interactions");
const closeInteractions = document.getElementById("close-interactions");
const interactionsList = document.querySelectorAll("#interactions-list>li");
const buttonOkInteractions = document.getElementById("button-ok-interactions");
const workGroupsContainer = document.getElementById("work-groups-container");
const searchInteractionsInput = document.getElementById(
  "search-interactions-input"
);
const workGroupTitle = document.getElementById("work-group-title");

// ===== Abrir el modal "interacciones" =====
interactions.addEventListener("click", () => {
  cleanInteractions();
  const targetId = interactions.getAttribute("commandfor");
  const dialog = document.getElementById(targetId);

  if (dialog && typeof dialog.showModal === "function") {
    if (state.workGroups.length > 0) {
      buttonOkInteractions.disabled = false;
      buttonOkInteractions.style.opacity = "1";
      buttonOkInteractions.style.cursor = "pointer";
    } else {
      buttonOkInteractions.disabled = true;
      buttonOkInteractions.style.opacity = "0.5";
      buttonOkInteractions.style.cursor = "not-allowed";
    }

    interactionsList.forEach((li) => {
      if (!state.mode) {
        const svg = li.querySelector("svg");
        svg.classList.add("hidden");
        state.checkboxList = {};
      }
      state.workGroups = [...state.prevWorkGroups];
      checkboxAll.checked = false;
    });

    dialog.showModal();
    // Esperar al siguiente frame para que el DOM esté renderizado
    requestAnimationFrame(() => {
      const div = dialog.querySelector("#container-interactions"); // seleccioná el div que te interesa
      if (div) {
        const height = div.offsetHeight;
        div.style.height = `${height}px`;
      }
    });
  }
});

// ===== Boton "OK" de tarjeta interactions =====
buttonOkInteractions.addEventListener("click", () => {
  workGroupTitle.classList.remove("hidden");
  setTimeout(() => {
    $("#gauge").resize();
    $("##horizontal-bar-chart").resize();
  }, 0);
  state.mode = "interactions";
  const targetId = interactions.getAttribute("commandfor");
  const dialog = document.getElementById(targetId);
  dialog.close();
  searchInteractionsInput.value = "";

  searchInteractionsInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    interactionsItems.forEach((li) => {
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

  buttonOkInteractions.disabled = true;
  buttonOkInteractions.style.opacity = "0.5";
  buttonOkInteractions.style.cursor = "not-allowed";
  dashboard2.classList.add("get-animation-dashboard");
  dashboard2.classList.remove("get-animation-dashboard-out");

  workGroupsContainer.innerHTML = "";
  state.workGroups = [...state.prevWorkGroups];

  state.workGroups.forEach((workGroup) => {
    const span = document.createElement("span");
    span.classList.add(
      "workGroup",
      "text-white",
      "bg-[gray]",
      "rounded-xl",
      "py-1",
      "pr-2",
      "pl-3",
      "translate-y-1",
      "cursor-default",
      "select-none"
    );
    span.id = `${workGroup}-span`;
    span.textContent = workGroup;
    workGroupsContainer.appendChild(span);
    // Agregá el SVG
    span.insertAdjacentHTML(
      "beforeend",
      `<svg data-id=${workGroup} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"      
        class="cursor-pointer inline-block ml-1" viewBox="0 0 24 24" stroke="#fff">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>`
    );

    if (state.workGroups.length === 1) {
      const uniqueSvg = document.querySelector("svg[data-id]");
      uniqueSvg.style.display = "none";
    }
  });

  const svgs = document.querySelectorAll("svg[data-id]");

  svgs.forEach((svg) => {
    svg.addEventListener("click", () => {
      const id = svg.dataset.id; // obtenemos el valor de data-id

      if (state.workGroups.length === 1) {
        return;
      }
      if (state.prevWorkGroups.length === 1) return;

      state.workGroups = state.workGroups.filter(
        (workGroup) => workGroup !== id
      );
      state.prevWorkGroups = state.prevWorkGroups.filter(
        (prevWorkGroup) => prevWorkGroup !== id
      );
      const span = document.getElementById(`${id}-span`);
      if (span) {
        span.remove();
        if (state.workGroups.length === 1) {
          const uniqueSvg = document.querySelector("svg[data-id]");
          uniqueSvg.style.display = "none";
        }
      }

      //uniqueWorkGroup.querySelector("svg").style.display = "none";
    });
  });
});

// ===== Cerrar el modal Interactions =====
closeInteractions.addEventListener("click", () => {
  cleanInteractions();
});

// ===== Recorrer la lista de "interacciones" =====
interactionsList.forEach((li) => {
  const optionId = li.id;

  const svg = li.querySelector("svg");
  // Click en el LI → alternar el checkbox
  li.addEventListener("click", (e) => {
    const isSelected = svg.classList.contains("hidden");
    svg.classList.toggle("hidden");

    if (isSelected) {
      state.prevWorkGroups.push(optionId);
    } else {
      state.prevWorkGroups = state.prevWorkGroups.filter(
        (workGroup) => workGroup !== optionId
      );
    }

    if (state.prevWorkGroups.length === interactionsList.length)
      checkboxAll.checked = true;
    else checkboxAll.checked = false;

    // Click en LI
    if (state.prevWorkGroups.length === 0) {
      buttonOkInteractions.disabled = true;
      buttonOkInteractions.style.opacity = "0.5";
      buttonOkInteractions.style.cursor = "not-allowed";
    } else {
      buttonOkInteractions.disabled = false;
      buttonOkInteractions.style.opacity = "1";
      buttonOkInteractions.style.cursor = "pointer";
    }
  });
});

// ===== Checkbox para seleccionar/desseleccionar "todas las interacciones" =====
checkboxAll.addEventListener("change", (e) => {
  interactionsList.forEach((li) => {
    const svg = li.querySelector("svg");
    const optionId = li.id;

    if (checkboxAll.checked) {
      const foundedOption = state.prevWorkGroups.find(
        (item) => item === optionId
      );
      if (!foundedOption) state.prevWorkGroups.push(optionId);
      svg.classList.remove("hidden");
      state.checkboxList[optionId] = true;
    } else {
      state.prevWorkGroups = state.prevWorkGroups.filter(
        (workGroup) => workGroup !== optionId
      );
      if (!svg.classList.contains("hidden")) svg.classList.add("hidden");
      state.checkboxList = {};
    }

    if (state.prevWorkGroups.length === 0) {
      buttonOkInteractions.disabled = true;
      buttonOkInteractions.style.opacity = "0.5";
      buttonOkInteractions.style.cursor = "not-allowed";
    } else {
      buttonOkInteractions.disabled = false;
      buttonOkInteractions.style.opacity = "1";
      buttonOkInteractions.style.cursor = "pointer";
    }
  });
});

// ===== Limpiar seleccionados del "interacciones" =====
const cleanInteractions = () => {
  const targetId = interactions.getAttribute("commandfor");
  const dialog = document.getElementById(targetId);
  if (dialog && typeof dialog.close === "function") {
    interactionsList.forEach((li) => {
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

    if (state.workGroups.length === interactionsList.length)
      checkboxAll.checked = true;
    else checkboxAll.checked = false;

    if (!state.mode) {
      state.workGroups = [];
      state.prevWorkGroups = [];
      workGroupsContainer.innerHTML = "";
      buttonOkInteractions.disabled = true;
      buttonOkInteractions.style.opacity = "0.5";
      buttonOkInteractions.style.cursor = "not-allowed";
    }

    dialog.close();

    searchInteractionsInput.value = "";
  }
};
