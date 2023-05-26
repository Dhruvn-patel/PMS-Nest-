/* eslint-disable prettier/prettier */
async function fetchUserData() {
    const response = await fetch('/users/getUsers');
    const userRecord = await response.json();
    console.log(userRecord);
    if (userRecord.status === 200) {
        let userArray = []
        userArray = userRecord.data

        let htmldata = '';
        userArray.map((element, i) => {
            let tabledata = `<tr>
                    <td>${i + 1}</td>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
            `
            let tdroles = '';
            if (element.rolesId == 1) {
                tdroles = ` <td>Admin</td>`
            }
            else {
                tdroles = `<td>User</td > `
            }
            let rolesData =
                ` <td> <a id="${element.userId}" class="nav-link bg-danger text-center " onClick="DeleteAction(this)">
                 delete
                </a></>
            </tr> `
            tdroles += rolesData;
            tabledata += tdroles;
            i++;
            htmldata += tabledata;
        });
        let resultdata = document.querySelector('.userData');
        resultdata.innerHTML = htmldata;

    }
}
