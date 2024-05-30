document.addEventListener("DOMContentLoaded", function () {
  localStorage.removeItem("editUser");
  fetch("http://localhost:4000/users/get-users")
    .then((response) => response.json())
    .then((users) => {
      const userTableBody = document
        .getElementById("userTable")
        .getElementsByTagName("tbody")[0];

      users?.data?.forEach((user) => {
        const row = userTableBody.insertRow();

        const firstNameCell = row.insertCell(0);
        firstNameCell.textContent = user?.firstName;

        const lastNameCell = row.insertCell(1);
        lastNameCell.textContent = user?.lastName;

        const genderCell = row.insertCell(2);
        genderCell.textContent = user?.gender;

        const emailCell = row.insertCell(3);
        emailCell.textContent = user?.email;

        const phoneCell = row.insertCell(4);
        phoneCell.textContent = user?.phoneNo;

        const dobCell = row.insertCell(5);
        dobCell.textContent = user?.dateOfBirth;

        const addressCell = row.insertCell(6);
        addressCell.textContent = user?.address;

        const actionsCell = row.insertCell(7);
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.addEventListener("click", () => {
          localStorage.setItem("editUser", JSON.stringify(user));
          window.location.href = "./create-user.html";
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", () => {
          fetch(`http://localhost:4000/users/delete-user?id=${user.id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                row.remove();
                alert("User deleted successfully");
              } else {
                alert("Error deleting user");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error deleting user");
            });
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
      });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});
