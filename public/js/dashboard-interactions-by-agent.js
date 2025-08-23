import { state } from "./global.js";

const dashboard1 = document.getElementById("dashboard-1");
const dashboard2 = document.getElementById("dashboard-2");

const dashboardInteractionsByAgent = document.getElementById(
  "dashboard-interactions-by-agent"
);

const closeDashboardInteractionsByAgent = document.getElementById(
  "close-dashboard-interactions-by-agent"
);

closeDashboardInteractionsByAgent.addEventListener("click", () => {
  dashboard1.classList.remove("hidden");
  dashboard2.classList.add("get-animation-dashboard-fast");
  dashboardInteractionsByAgent.classList.remove("get-animation-dashboard");
  dashboardInteractionsByAgent.classList.add("get-animation-dashboard-out");
  setTimeout(() => {
    state.mode = "interactions";
  }, 100);
});
