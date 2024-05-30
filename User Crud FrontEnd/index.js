document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  const editUser = JSON.parse(localStorage.getItem("editUser"));
  if (editUser) {
    console.log(document.getElementById("userId"));
    document.getElementById("userId").value = editUser?.id;
    console.log(document.getElementById("userId"));
    document.getElementById("firstName").value = editUser?.firstName;
    document.getElementById("lastName").value = editUser?.lastName;
    document.getElementById("email").value = editUser?.email;
    document.getElementById("phoneNo").value = editUser?.phoneNo;
    document.getElementById("dateOfBirth").value = editUser?.dateOfBirth;
    document.getElementById("address").value = editUser?.address;
    document.getElementById("password").value = editUser?.password;
    document.getElementById("password").disabled = true;
    document.querySelector(
      `input[name="gender"][value="${editUser.gender}"]`
    ).checked = true;
  }

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const userData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      email: document.getElementById("email").value,
      phoneNo: document.getElementById("phoneNo").value,
      dateOfBirth: document.getElementById("dateOfBirth").value,
      address: document.getElementById("address").value,
      password: editUser ? editUser.password :document.getElementById("password").value
    };
    const requestUrl = userId
      ? `http://localhost:4000/users/edit-user?id=${userId}`
      : "http://localhost:4000/users/create-user";
    const requestMethod = userId ? "PATCH" : "POST";
    if (requestMethod === "PATCH") {
      delete userData.password
    }
    fetch(requestUrl, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("editUser");
          alert(
            userId
              ? "User updated successfully"
              : "User registered successfully"
          );
          window.location.href = "./index.html";
        } else {
          alert("Error saving user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error saving user data");
      });
  });
});
