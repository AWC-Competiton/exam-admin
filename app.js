javascript
let allRows = [];

// ===============================
// LOGIN
// ===============================
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("loginMsg");

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    msg.textContent = "Login មិនជោគជ័យ: " + error.message;
    return;
  }

  showDash();
  loadResults();
}


// ===============================
// LOGOUT
// ===============================
async function logout() {
  await supabaseClient.auth.signOut();
  location.reload();
}


// ===============================
// SHOW DASHBOARD
// ===============================
function showDash() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("dash").classList.remove("hidden");
}


// ===============================
// LOAD RESULTS
// ===============================
async function loadResults() {
  const { data, error } = await supabaseClient
    .from("exam_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    alert("មិនអាចទាញទិន្នន័យ: " + error.message);
    return;
  }

  allRows = data || [];

  renderRows(allRows);
  stats(allRows);
}


// ===============================
// STATISTICS
// ===============================
function stats(rows) {
  const total = rows.length;

  document.getElementById("total").textContent = total;

  const average = total
    ? rows.reduce(function (sum, row) {
        return sum + Number(row.score || 0);
      }, 0) / total
    : 0;

  document.getElementById("avg").textContent = average.toFixed(2);

  const highest = total
    ? Math.max.apply(
        null,
        rows.map(function (row) {
          return Number(row.score || 0);
        })
      )
    : 0;

  document.getElementById("top").textContent = highest;
}


// ===============================
// RENDER TABLE
// ===============================
javascript
function renderRows(rows) {
  const tbody = document.getElementById("rows");

  tbody.innerHTML = rows.map(function (r, i) {
    return 
      <tr>
        <td>${i + 1}</td>
        <td>${esc(r.seat_number)}</td>
        <td>${esc(r.student_name)}</td>
        <td>${esc(r.gender)}</td>
        <td>${esc(r.grade_level)}</td>
        <td>${esc(r.school_name)}</td>
        <td>${esc(r.subject)}</td>
        <td>${esc(r.score)}/${esc(r.total_questions)}</td>
        <td>${formatDate(r.submitted_at)}</td>
      </tr>
    ;
  }).join("");
}




// ===============================
// SEARCH
// ===============================
function filterRows() {
  const input = document.getElementById("search");

  const q = input.value.trim().toLowerCase();

  const filtered = allRows.filter(function (r) {
    return [
      r.seat_number,
      r.student_name,
      r.gender,
      r.grade_level,
      r.school_name,
      r.subject
    ].some(function (value) {
      return String(value || "")
        .toLowerCase()
        .includes(q);
    });
  });

  renderRows(filtered);
}


// ===============================
// FORMAT DATE
// ===============================
function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}


// ===============================
// EXPORT DATA
// ===============================
function exportRows() {
  return allRows.map(function (r, i) {
    return {
      "#": i + 1,
      "លេខតុ": r.seat_number,
      "ឈ្មោះ": r.student_name,
      "ភេទ": r.gender,
      "កម្រិតថ្នាក់": r.grade_level,
      "សាលា": r.school_name,
      "វិញ្ញាសា": r.subject,
      "ពិន្ទុ": r.score,
      "សំណួរសរុប": r.total_questions,
      "Submit Time": formatDate(r.submitted_at)
    };
  });
}


// ===============================
// EXPORT CSV
// ===============================
function exportCSV() {
  const rows = exportRows();

  if (!rows.length) {
    alert("គ្មានទិន្នន័យ");
    return;
  }

  const keys = Object.keys(rows[0]);

  const csvRows = [];

  csvRows.push(keys);

  rows.forEach(function (row) {
    csvRows.push(
      keys.map(function (key) {
        return '"' +
          String(row[key] ?? "")
            .replace(/"/g, '""') +
          '"';
      })
    );
  });

  const csv =
    "\ufeff" +
    csvRows
      .map(function (row) {
        return row.join(",");
      })
      .join("\n");

  download(
    new Blob([csv], {
      type: "text/csv;charset=utf-8"
    }),
    "exam-results.csv"
  );
}


// ===============================
// EXPORT EXCEL
// ===============================
function exportExcel() {
  const rows = exportRows();

  if (!rows.length) {
    alert("គ្មានទិន្នន័យ");
    return;
  }

  if (typeof XLSX === "undefined") {
    alert("Excel library មិនទាន់ Load!");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Results"
  );

  XLSX.writeFile(
    workbook,
    "exam-results.xlsx"
  );
}


// ===============================
// DOWNLOAD FILE
// ===============================
function download(blob, filename) {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}


// ===============================
// ESCAPE HTML
// ===============================
function esc(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    function (character) {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return map[character];
    }
  );
}


// ===============================
// CHECK LOGIN SESSION
// ===============================
(async function () {
  const result =
    await supabaseClient.auth.getSession();

  const session = result.data.session;

  if (session) {
    showDash();
    loadResults();
  }
})();
document.getElementById("loginMsg").addEventListener("click", login);
