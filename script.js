let records =
JSON.parse(localStorage.getItem("milkRecords")) || [];

function saveRecord(){

    const record = {

        date: document.getElementById("date").value,

        customer: document.getElementById("customer").value,

        liters: Number(
            document.getElementById("liters").value
        ),

        fat: Number(
            document.getElementById("fat").value
        ),

        cost: Number(
            document.getElementById("cost").value
        ),

        sale: Number(
            document.getElementById("sale").value
        )
    };

    records.push(record);

    localStorage.setItem(
        "milkRecords",
        JSON.stringify(records)
    );

    clearForm();

    renderTable();
}

function renderTable(){

    const tbody =
    document.getElementById("tableBody");

    tbody.innerHTML = "";

    let totalCost = 0;
    let totalSale = 0;
    let totalLiters = 0;

    records.forEach((r,index)=>{

        const profit =
        r.sale - r.cost;

        totalCost += r.cost;
        totalSale += r.sale;
        totalLiters += r.liters;

        tbody.innerHTML += `
        <tr>
            <td>${r.date}</td>
            <td>${r.customer}</td>
            <td>${r.liters}</td>
            <td>${r.fat}%</td>
            <td>₹${r.cost}</td>
            <td>₹${r.sale}</td>
            <td>₹${profit}</td>
            <td>
                <button class="delete-btn"
                onclick="deleteRecord(${index})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });

    const netProfit =
    totalSale - totalCost;

    document.getElementById("summary")
    .innerHTML = `
        <b>Total Liters:</b> ${totalLiters} L <br>
        <b>Total Cost:</b> ₹${totalCost} <br>
        <b>Total Sale:</b> ₹${totalSale} <br>
        <b>Profit/Loss:</b> ₹${netProfit}
    `;
}

function deleteRecord(index){

    if(confirm("Delete record?")){

        records.splice(index,1);

        localStorage.setItem(
            "milkRecords",
            JSON.stringify(records)
        );

        renderTable();
    }
}

function clearForm(){

    document.getElementById("customer").value="";
    document.getElementById("liters").value="";
    document.getElementById("fat").value="";
    document.getElementById("cost").value="";
    document.getElementById("sale").value="";
}

renderTable();