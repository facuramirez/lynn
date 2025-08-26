import { state } from "./global.js";

document.addEventListener("DOMContentLoaded", () => {
  const dashboard1 = document.getElementById("dashboard-1");
  const dashboard2 = document.getElementById("dashboard-2");

  const dashboardInteractionsByAgent = document.getElementById(
    "dashboard-interactions-by-agent"
  );

  const closeDashboardInteractionsByAgent = document.getElementById(
    "close-dashboard-interactions-by-agent"
  );

  $(document).ready(function () {
    $("#donut-chart-1").kendoChart({
      title: {
        text: "Calls Waiting (Now)",
      },
      legend: {
        visible: false,
      },
      seriesDefaults: {
        type: "donut",
        labels: {
          visible: false,
        },
      },
      series: [
        {
          name: "Tareas",
          data: [
            { category: "Completadas", value: 70, color: "#10B981" }, // verde
            { category: "Restantes", value: 30, color: "#E5E7EB" }, // gris claro
          ],
          holeSize: 85, // controla el grosor del anillo
        },
      ],
      tooltip: {
        visible: false,
      },
      render: function () {
        this.resize(); // Asegura que el gráfico se ajuste
      },
    });

    $("#donut-chart-2").kendoChart({
      title: {
        text: "Longest Wait (Now)",
      },
      legend: {
        visible: false,
      },
      seriesDefaults: {
        type: "donut",
        labels: {
          visible: false,
        },
      },
      series: [
        {
          name: "Tareas",
          data: [
            { category: "Completadas", value: 70, color: "#10B981" }, // verde
            { category: "Restantes", value: 30, color: "#E5E7EB" }, // gris claro
          ],
          holeSize: 85, // controla el grosor del anillo
        },
      ],
      tooltip: {
        visible: false,
      },
      render: function () {
        this.resize(); // Asegura que el gráfico se ajuste
      },
    });

    $(window).on("resize", function () {
      $("#donut-chart-1").data("kendoChart").resize();
    });

    $(window).on("resize", function () {
      $("#donut-chart-2").data("kendoChart").resize();
    });
  });

  $(document).ready(function () {
    $("#horizontal-bar-chart").kendoChart({
      title: {
        text: "Leaderboard - By Calls Mandled (Today)",
      },
      legend: {
        visible: false,
      },
      seriesDefaults: {
        type: "bar",
        labels: {
          visible: true,
          position: "center", // 👈 Esto coloca el número dentro de la barra
          format: "{0}%",
          color: "black", // 👈 Contraste para que se vea el número
          font: "bold 14px sans-serif",
        },
      },
      series: [
        {
          name: "Progreso",
          data: [
            { category: "Diseño", value: 65, color: "#EF4444" }, // rojo
            { category: "Backend", value: 25, color: "#F59E0B" }, // amarillo
            { category: "Frontend", value: 45, color: "#3B82F6" }, // azul
            { category: "QA", value: 85, color: "#10B981" }, // verde
          ],
        },
      ],
      categoryAxis: {
        field: "category",
        labels: {
          padding: { left: 5 },
        },
      },
      valueAxis: {
        max: 100,
        labels: {
          format: "{0}%",
        },
      },
      tooltip: {
        visible: true,
        template: "#= category #: #= value#%",
      },
    });

    $(window).on("resize", function () {
      $("#horizontal-bar-chart").data("kendoChart").resize();
    });
  });

  $(document).ready(function () {
    $("#mi-tabla-kendo").kendoGrid({
      dataSource: {
        data: [
          {
            name: "Juan",
            state: "Logged In",
            stateDuration: "Buenos Aires",
            voiceState: "NOT_READY",
            skillID: '["270740"]',
            reasonCode: "Break",
            reasonCodeDuration: 9283,
            oneCallDuration: "",
          },
          {
            name: "Ana",
            state: "Logged In",
            stateDuration: "Córdoba",
            voiceState: "NOT_READY",
            skillID: '["220441"]',
            reasonCode: "Break",
            reasonCodeDuration: 9172,
            oneCallDuration: "",
          },
          {
            name: "Pedro",
            state: "Logged In",
            stateDuration: "Mendoza",
            voiceState: "NOT_READY",
            skillID: '["270730"]',
            reasonCode: "Break",
            reasonCodeDuration: 8759,
            oneCallDuration: "",
          },
        ],
        pageSize: 5,
      },
      toolbar: [
        {
          template: `
      <div>
        <button class="k-button k-primary" id="boton-1">Opción 1</button>
        <button class="k-button k-primary" id="boton-1">Opción 2</button>
        <button class="k-button k-primary" id="boton-1">Opción 3</button>
      </div>
    `,
        },
      ],
      height: 300,
      scrollable: true,
      sortable: true,
      filterable: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5,
      },
      dataBound: function () {
        this.tbody.find("tr").css("cursor", "pointer");
      },
      selectable: "row", // << habilita seleccionar fila
      change: function (e) {
        const grid = this;
        const selectedRow = grid.select(); // fila seleccionada
        const dataItem = grid.dataItem(selectedRow); // objeto de datos de esa fila

        // 🔥 tu función
        console.log("Fila clickeada:", dataItem);

        // ejemplo: llamar a tu función personalizada
        viewInteractionsDetailByAgent();
      },
      columns: [
        { field: "name", title: "Nombre" },
        { field: "state", title: "State" },
        { field: "stateDuration", title: "State Duration" },
        { field: "voiceState", title: "Voice State" },
        { field: "skillId", title: "Skill ID" },
        { field: "reasonCode", title: "Reason Code" },
        { field: "reasonCodeDuration", title: "Reason Code Duration" },
        { field: "oneCallDuration", title: "One Call Duration" },
      ],
    });
  });

  $(document).ready(function () {
    $("#mi-tabla-kendo-interactions").kendoGrid({
      dataSource: {
        data: [
          {
            name: "Juan",
            state: "Logged In",
            stateDuration: "Buenos Aires",
            voiceState: "NOT_READY",
            skillID: '["270740"]',
            reasonCode: "Break",
            reasonCodeDuration: 9283,
            oneCallDuration: "",
          },
          {
            name: "Ana",
            state: "Logged In",
            stateDuration: "Córdoba",
            voiceState: "NOT_READY",
            skillID: '["220441"]',
            reasonCode: "Break",
            reasonCodeDuration: 9172,
            oneCallDuration: "",
          },
          {
            name: "Pedro",
            state: "Logged In",
            stateDuration: "Mendoza",
            voiceState: "NOT_READY",
            skillID: '["270730"]',
            reasonCode: "Break",
            reasonCodeDuration: 8759,
            oneCallDuration: "",
          },
          {
            name: "Juan",
            state: "Logged In",
            stateDuration: "Buenos Aires",
            voiceState: "NOT_READY",
            skillID: '["270740"]',
            reasonCode: "Break",
            reasonCodeDuration: 9283,
            oneCallDuration: "",
          },
          {
            name: "Ana",
            state: "Logged In",
            stateDuration: "Córdoba",
            voiceState: "NOT_READY",
            skillID: '["220441"]',
            reasonCode: "Break",
            reasonCodeDuration: 9172,
            oneCallDuration: "",
          },
          {
            name: "Pedro",
            state: "Logged In",
            stateDuration: "Mendoza",
            voiceState: "NOT_READY",
            skillID: '["270730"]',
            reasonCode: "Break",
            reasonCodeDuration: 8759,
            oneCallDuration: "",
          },
          {
            name: "Juan",
            state: "Logged In",
            stateDuration: "Buenos Aires",
            voiceState: "NOT_READY",
            skillID: '["270740"]',
            reasonCode: "Break",
            reasonCodeDuration: 9283,
            oneCallDuration: "",
          },
          {
            name: "Ana",
            state: "Logged In",
            stateDuration: "Córdoba",
            voiceState: "NOT_READY",
            skillID: '["220441"]',
            reasonCode: "Break",
            reasonCodeDuration: 9172,
            oneCallDuration: "",
          },
          {
            name: "Pedro",
            state: "Logged In",
            stateDuration: "Mendoza",
            voiceState: "NOT_READY",
            skillID: '["270730"]',
            reasonCode: "Break",
            reasonCodeDuration: 8759,
            oneCallDuration: "",
          },
          {
            name: "Juan",
            state: "Logged In",
            stateDuration: "Buenos Aires",
            voiceState: "NOT_READY",
            skillID: '["270740"]',
            reasonCode: "Break",
            reasonCodeDuration: 9283,
            oneCallDuration: "",
          },
          {
            name: "Ana",
            state: "Logged In",
            stateDuration: "Córdoba",
            voiceState: "NOT_READY",
            skillID: '["220441"]',
            reasonCode: "Break",
            reasonCodeDuration: 9172,
            oneCallDuration: "",
          },
          {
            name: "Pedro",
            state: "Logged In",
            stateDuration: "Mendoza",
            voiceState: "NOT_READY",
            skillID: '["270730"]',
            reasonCode: "Break",
            reasonCodeDuration: 8759,
            oneCallDuration: "",
          },
        ],
        pageSize: 20,
      },
      toolbar: [
        {
          template: `
      <div>
        <button class="k-button k-primary" id="boton-1">Opción 1</button>
        <button class="k-button k-primary" id="boton-1">Opción 2</button>
        <button class="k-button k-primary" id="boton-1">Opción 3</button>
      </div>
    `,
        },
      ],
      height: 300,
      scrollable: true,
      sortable: true,
      filterable: true,
      pageable: {
        refresh: true,
        pageSizes: true,
        buttonCount: 5,
      },
      dataBound: function () {
        this.tbody.find("tr").css("cursor", "pointer");
      },
      selectable: "row", // << habilita seleccionar fila
      change: function (e) {
        const grid = this;
        const selectedRow = grid.select(); // fila seleccionada
        const dataItem = grid.dataItem(selectedRow); // objeto de datos de esa fila

        // 🔥 tu función
        console.log("Fila clickeada:", dataItem);

        // ejemplo: llamar a tu función personalizada
        // miFuncionAlClick(dataItem);
      },
      columns: [
        { field: "name", title: "Nombre" },
        { field: "state", title: "State" },
        { field: "stateDuration", title: "State Duration" },
        { field: "voiceState", title: "Voice State" },
        { field: "skillId", title: "Skill ID" },
        { field: "reasonCode", title: "Reason Code" },
        { field: "reasonCodeDuration", title: "Reason Code Duration" },
        { field: "oneCallDuration", title: "One Call Duration" },
      ],
    });
  });

  $("#linearProgress").kendoProgressBar({
    change: function (e) {
      const wrapper = this.progressWrapper;
      if (e.value <= 20) {
        wrapper.css({ "background-color": "#EF4444" });
      } else if (e.value <= 90) {
        wrapper.css({ "background-color": "#F59E0B" });
      } else {
        wrapper.css({ "background-color": "#10B981" });
      }
    },
  });

  $(document).ready(function () {
    $("#pie-chart").kendoChart({
      // chartArea: {
      //   width: 240,
      //   height: 240,
      // },
      title: {
        text: "Distribución de Categorías",
      },
      legend: {
        position: "bottom",
      },
      seriesDefaults: {
        labels: {
          visible: true,
          format: "{0}%",
          position: "outsideEnd",
        },
      },
      series: [
        {
          type: "pie",
          data: [
            { category: "Tareas", value: 45 },
            { category: "Notas", value: 30 },
            { category: "Ideas", value: 25 },
          ],
        },
      ],
      tooltip: {
        visible: true,
        template: "#= category #: #= value#%",
      },
    });

    $(window).on("resize", function () {
      $("#pie-chart").data("kendoChart").resize();
    });
  });

  // Inicialización del gauge (PRIMERA TARJETA)
  $(document).ready(function () {
    var gauge = $("#gauge")
      .kendoLinearGauge({
        pointer: {
          value: 50, // valor inicial (%)
          shape: "arrow", // 🔺 indicador en forma de flecha/triángulo
          color: "#000", // color del triángulo
        },
        scale: {
          min: 0,
          max: 100,
          majorUnit: 25,
          vertical: false, // horizontal
          rangeSize: 20,
          ranges: [
            { from: 0, to: 20, color: "#ff0000" }, // rojo
            { from: 20, to: 80, color: "#ffff00" }, // amarillo
            { from: 80, to: 100, color: "#00ff00" }, // verde
          ],
        },
      })
      .data("kendoLinearGauge");
    // 🔥 Para que se redibuje correctamente al 100% del ancho
    $(window).on("resize", function () {
      gauge.resize();
    });

    // 🔥 Función para actualizar valor desde afuera
    function actualizarGauge(valor) {
      gauge.value(valor);
    }

    // Ejemplo: cambiar a 80% después de 2s
    setTimeout(() => {
      actualizarGauge(80);
    }, 2000);
  });

  function viewInteractionsDetailByAgent() {
    dashboardInteractionsByAgent.classList.add("get-animation-dashboard");
    dashboardInteractionsByAgent.classList.remove(
      "get-animation-dashboard-out"
    );
    state.mode = "agent-interactions";
    dashboard1.classList.add("hidden");

    // Escuchar cuando termina la animación
    dashboardInteractionsByAgent.addEventListener(
      "animationend",
      function handler() {
        // Quitar la clase inicial del otro dashboard
        dashboard2.classList.remove("get-animation-dashboard");
        dashboard2.classList.remove("get-animation-dashboard-fast");

        // Importante: quitar el listener para que no se ejecute cada vez
        dashboardInteractionsByAgent.removeEventListener(
          "animationend",
          handler
        );
      }
    );
  }
});
