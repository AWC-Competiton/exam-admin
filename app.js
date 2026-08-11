let allRows = [];

// ===============================
// CHECK SUPABASE
// ===============================
function checkSupabase() {
  if (typeof window.supabase === "undefined") {
    throw new Error(
      "Supabase library មិនទាន់ Load។ សូមពិនិត្យ Internet និង script CDN ក្នុង index.html។"
    );
  }

  if (typeof supabaseClient === "undefined") {
    throw new Error(
      "រកមិនឃើញ supabaseClient។ សូមពិនិត្យ config.js។"
    );
  }
}


// ===============================
// LOGIN
// ===============================
async function login() {

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const msg = document.getElementById("loginMsg");
  const button = document.getElementById("loginBtn");

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  msg.textContent = "";

  // Check empty
  if (!email) {
    msg.textContent = "សូមបញ្ចូល Email";
    emailInput.focus();
    return;
  }

  if (!password) {
    msg.textContent = "សូមបញ្ចូល Password";
    passwordInput.focus();
    return;
  }

  try {

    checkSupabase();

    button.disabled = true;
    button.textContent = "Logging in...";

    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
      });

    if (error) {
      console.error("Supabase Login Error:", error);

      msg.textContent =
        "Login មិនជោគជ័យ: " + error.message;

      button.disabled = false;
      button.textContent = "Login";

      return;
    }

    if (!data || !data.session) {

      msg.textContent =
        "Login មិនបានបង្កើត Session។ សូមពិនិត្យ Email និង Password។";

      button.disabled = false;
      button.textContent = "Login";

      return;
    }

    // Login success
    msg.textContent = "";

    showDash();

    button.disabled = false;
    button.textContent = "Login";

    await loadResults();

  } catch (error) {

    console.error("Login Error:", error);

    msg.textContent =
      "មានបញ្ហា: " + error.message;

    button.disabled = false;
    button.textContent = "Login";
  }
}


// ===============================
// LOGOUT
// ===============================
async function logout() {

  try {

    await supabaseClient.auth.signOut();

    location.reload();

  } catch (error) {

    console.error("Logout Error:", error);

    alert("Logout មិនជោគជ័យ: " + error.message);
  }
}


// ===============================
// SHOW DASHBOARD
// ===============================
function showDash() {

  const loginSection =
    document.getElementById("login");

  const dashSection =
    document.getElementById("dash");

  if (loginSection) {
    loginSection.classList.add("hidden");
  }

  if (dashSection) {
    dashSection.classList.remove("hidden");
  }
}


// ===============================
// SHOW LOGIN
// ===============================
function showLogin() {

  const loginSection =
    document.getElementById("login");

  const dashSection =
    document.getElementById("dash");

  if (loginSection) {
    loginSection.classList.remove("hidden");
  }

  if (dashSection) {
    dashSection.classList.add("hidden");
  }
}


// ===============================
// LOAD RESULTS
// ===============================
async function loadResults() {

  try {

    const { data, error } =
      await supabaseClient
        .from("exam_submissions")
        .select("*")
        .order("submitted_at", {
          ascending: false
        });

    if (error) {

      console.error(
        "Load Results Error:",
        error
      );

      alert(
        "Login បានជោគជ័យ ប៉ុន្តែមិនអាចទាញលទ្ធផលបាន:\n\n" +
        error.message
      );

      return;
    }

    allRows = data || [];

    renderRows(allRows);

    stats(allRows);

  } catch (error) {

    console.error(
      "Unexpected Load Error:",
      error
    );

    alert(
      "មានបញ្ហាក្នុងការទាញទិន្នន័យ:\n\n" +
      error.message
    );
  }
}


// ===============================
// STATISTICS
// ===============================
function stats(rows) {

  const total = rows.length;

  const totalElement =
    document.getElementById("total");

  const avgElement =
    document.getElementById("avg");

  const topElement =
    document.getElementById("top");

  if (totalElement) {
    totalElement.textContent = total;
  }

  const average = total
    ? rows.reduce(function (sum, row) {
        return sum + Number(row.score || 0);
      }, 0) / total
    : 0;

  if (avgElement) {
    avgElement.textContent =
      average.toFixed(2);
  }

  const highest = total
    ? Math.max.apply(
        null,
        rows.map(function (row) {
          return Number(row.score || 0);
        })
      )
    : 0;

  if (topElement) {
    topElement.textContent = highest;
  }
}


// ===============================
// RENDER TABLE
// ===============================
function renderRows(rows) {

  const tbody =
    document.getElementById("rows");

  if (!tbody) return;

  tbody.innerHTML =
    rows.map(function (r, i) {

      return `
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
      `;

    }).join("");
}


// ===============================
// SEARCH
// ===============================
function filterRows() {

  const input =
    document.getElementById("search");

  if (!input) return;

  const q =
    input.value.trim().toLowerCase();

  const filtered =
    allRows.filter(function (r) {

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

  const keys =
    Object.keys(rows[0]);

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
    new Blob(
      [csv],
      {
        type:
          "text/csv;charset=utf-8"
      }
    ),
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

    alert(
      "Excel library មិនទាន់ Load!"
    );

    return;
  }

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  const workbook =
    XLSX.utils.book_new();

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

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

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
async function checkSession() {

  try {

    checkSupabase();

    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();

    if (error) {

      console.error(
        "Session Error:",
        error
      );

      showLogin();

      return;
    }

    if (data && data.session) {

      showDash();

      await loadResults();

    } else {

      showLogin();
    }

  } catch (error) {

    console.error(
      "Session Check Error:",
      error
    );

    showLogin();
  }
}


// ===============================
// START APP
// ===============================
document.addEventListener(
  "DOMContentLoaded",
  function () {

    checkSession();

  }
);
