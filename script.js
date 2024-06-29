function navigateToRanking(category) {
  window.location.href = `ranking.html?category=${category}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  if (category) {
    const apiUrl =
      category === "projetos"
        ? "https://decide-now-backend.onrender.com/ranking/project"
        : "https://decide-now-backend.onrender.com/ranking/exhibitor";

    document.getElementById("category-title").textContent = `Ranking de ${
      category.charAt(0).toUpperCase() + category.slice(1)
    }`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => b.votes - a.votes);

        const tableBody = document.querySelector("#ranking-table tbody");

        data.forEach((entry, index) => {
          const row = document.createElement("tr");

          const posicaoCell = document.createElement("td");
          posicaoCell.textContent = index + 1;
          row.appendChild(posicaoCell);

          const nomeCell = document.createElement("td");
          nomeCell.textContent = entry.name;
          row.appendChild(nomeCell);

          const votosCell = document.createElement("td");
          votosCell.textContent = entry.votes;
          row.appendChild(votosCell);

          const cursoCell = document.createElement("td");
          cursoCell.textContent = entry.course;
          row.appendChild(cursoCell);

          // Adiciona a coluna "Projeto" apenas para expositores
          if (category === "expositores") {
            const projetoCell = document.createElement("td");
            projetoCell.textContent = entry.name_project;
            row.appendChild(projetoCell);
          }

          tableBody.appendChild(row);
        });

        // Exibe a coluna "Projeto" apenas para expositores
        if (category === "expositores") {
          document.getElementById("project-header").style.display =
            "table-cell";
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});
