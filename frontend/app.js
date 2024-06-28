//Виртуальная апи
const API_URL = "https://rest-api-main-645g.onrender.com/api/item";
//POST запрос
document
  .getElementById("dataForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("name").value;
    const subtitle = document.getElementById("position").value;

    if (title && subtitle) {
      const newItem = { title, subtitle };
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        if (response.ok) {
          await fetchData();
          document.getElementById("dataForm").reset();
        }
      } catch (error) {
        console.log("Error");
      }
    }
  });
//GET запрос (по дефолту используется GET)
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.log("Error");
  }
}
//Вывод текста
function renderData(data) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  data.forEach((item, _id) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.innerHTML = `
             <div class="card-body">
                <h5 class="card-title">Имя: ${item.title}</h5>
                <p class="card-text">Должность: ${item.subtitle}</p>
                <button class="btn btn-success mr-2" onclick="markItem(${_id})" ${
      item.completed ? "disabled" : ""
    }>Отметить</button>
                <button class="btn btn-danger" onclick="deleteItem(${_id})">Удалить</button>
            </div>
        `;
    resultDiv.appendChild(cardDiv);
  });
}

async function deleteItem(_id) {
  try {
    const response = await fetch(`${API_URL}/${_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      await fetchData();
    } else {
      alert("Ошибка в удалении");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function markItem(_id) {
  try {
    const response = await fetch(`${API_URL}/${_id}`, {
      method: "PUT",
    });

    if (response.ok) {
      await fetchData();
    } else {
      alert("Ошибка в изменении");
    }
  } catch (error) {}
}

fetchData();
